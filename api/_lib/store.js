// Persistence via REDIS_URL (Vercel Marketplace Redis / Upstash TCP).
// Only REDIS_URL is provisioned on this project (not UPSTASH_REDIS_REST_* / KV_REST_*).
// ioredis + per-operation connect/quit keeps serverless connection usage low.
const crypto = require('crypto');
const Redis = require('ioredis');

const ORDERS_ZSET = 'ae:orders';
const ORDER_KEY = (sessionId) => `ae:order:${sessionId}`;
const TOKEN_KEY = (tokenId) => `ae:token:${tokenId}`;
const FINDINGS_LIST = 'ae:findings';
const FINDINGS_BY_REF = (ref) => `ae:findings:${ref}`;

const memory = { orders: [], findings: [], tokens: new Map() };
const hasRedisUrl = Boolean(process.env.REDIS_URL && String(process.env.REDIS_URL).trim());

if (!hasRedisUrl) {
  console.warn('[store] REDIS_URL is not set — using in-memory fallback (local/dev only; data is lost on cold start).');
}

function createClient() {
  // maxRetriesPerRequest: 1 fails fast in serverless; lazyConnect waits until first command.
  return new Redis(process.env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableReadyCheck: false,
    connectTimeout: 5000,
  });
}

async function withRedis(fn) {
  if (!hasRedisUrl) {
    const err = new Error('REDIS_URL is not configured');
    err.code = 'NO_REDIS';
    throw err;
  }
  const client = createClient();
  try {
    await client.connect();
    return await fn(client);
  } finally {
    try { await client.quit(); } catch (_) { try { client.disconnect(); } catch (__) {} }
  }
}

async function saveOrder(order) {
  if (!order || !order.sessionId) throw new Error('order.sessionId is required');
  if (!hasRedisUrl) {
    if (!memory.orders.find((o) => o.sessionId === order.sessionId)) memory.orders.unshift(order);
    return order;
  }
  await withRedis(async (redis) => {
    const key = ORDER_KEY(order.sessionId);
    const payload = JSON.stringify(order);
    const score = Date.parse(order.paidAt || '') || Date.now();
    const multi = redis.multi();
    multi.set(key, payload);
    multi.zadd(ORDERS_ZSET, score, order.sessionId);
    await multi.exec();
  });
  return order;
}

async function listOrders() {
  if (!hasRedisUrl) return memory.orders.slice();
  return withRedis(async (redis) => {
    // Newest first
    const ids = await redis.zrevrange(ORDERS_ZSET, 0, 499);
    if (!ids.length) return [];
    const keys = ids.map(ORDER_KEY);
    const rows = await redis.mget(...keys);
    return rows
      .map((raw) => { try { return raw ? JSON.parse(raw) : null; } catch { return null; } })
      .filter(Boolean);
  });
}

async function getOrderBySessionId(sessionId) {
  if (!sessionId) return null;
  if (!hasRedisUrl) return memory.orders.find((o) => o.sessionId === sessionId) || null;
  return withRedis(async (redis) => {
    const raw = await redis.get(ORDER_KEY(sessionId));
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  });
}

/**
 * Persist an issued client access token (HMAC string) after verified Stripe payment.
 * tokenId is a stable id (e.g. session id or clientRef); token is the signed JWT-like value.
 */
async function saveAccessToken({ tokenId, token, clientRef, tier, sessionId, expiresAt }) {
  if (!tokenId || !token) throw new Error('tokenId and token are required');
  const record = {
    tokenId,
    token,
    clientRef: clientRef || null,
    tier: tier || null,
    sessionId: sessionId || null,
    issuedAt: new Date().toISOString(),
    expiresAt: expiresAt || null,
  };
  if (!hasRedisUrl) {
    memory.tokens.set(tokenId, record);
    memory.tokens.set(token, record);
    return record;
  }
  await withRedis(async (redis) => {
    const payload = JSON.stringify(record);
    const ttlSec = expiresAt
      ? Math.max(60, Math.floor((Date.parse(expiresAt) - Date.now()) / 1000))
      : 60 * 60 * 24 * 31;
    const multi = redis.multi();
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    multi.set(TOKEN_KEY(tokenId), payload, 'EX', ttlSec);
    // Index by hash of the opaque token so verify-by-token can look it up.
    multi.set(TOKEN_KEY('h:' + tokenHash), payload, 'EX', ttlSec);
    await multi.exec();
  });
  return record;
}

async function getAccessToken(tokenOrId) {
  if (!tokenOrId) return null;
  if (!hasRedisUrl) {
    return memory.tokens.get(tokenOrId) || null;
  }
  return withRedis(async (redis) => {
    let raw = await redis.get(TOKEN_KEY(tokenOrId));
    if (!raw) {
      const tokenHash = crypto.createHash('sha256').update(String(tokenOrId)).digest('hex');
      raw = await redis.get(TOKEN_KEY('h:' + tokenHash));
    }
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  });
}

async function listFindings(clientRef) {
  if (!hasRedisUrl) {
    return clientRef ? memory.findings.filter((f) => f.clientRef === clientRef) : memory.findings.slice();
  }
  return withRedis(async (redis) => {
    const key = clientRef ? FINDINGS_BY_REF(clientRef) : FINDINGS_LIST;
    const rows = await redis.lrange(key, 0, 199);
    return rows.map((raw) => { try { return JSON.parse(raw); } catch { return null; } }).filter(Boolean);
  });
}

async function addFinding(finding) {
  if (!hasRedisUrl) {
    memory.findings.unshift(finding);
    return finding;
  }
  await withRedis(async (redis) => {
    const payload = JSON.stringify(finding);
    const multi = redis.multi();
    multi.lpush(FINDINGS_LIST, payload);
    multi.ltrim(FINDINGS_LIST, 0, 999);
    if (finding.clientRef) {
      multi.lpush(FINDINGS_BY_REF(finding.clientRef), payload);
      multi.ltrim(FINDINGS_BY_REF(finding.clientRef), 0, 199);
    }
    await multi.exec();
  });
  return finding;
}

module.exports = {
  saveOrder,
  listOrders,
  getOrderBySessionId,
  saveAccessToken,
  getAccessToken,
  listFindings,
  addFinding,
  isPersistent: hasRedisUrl,
  hasRedisUrl,
};
