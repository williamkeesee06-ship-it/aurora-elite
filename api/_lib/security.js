// Shared security helpers for AURORA ELITE serverless functions.
// Files under api/_lib are not exposed as routes by Vercel.
const crypto = require('crypto');

const APP_URL = (process.env.APP_URL || 'https://aurora-elite-three.vercel.app').replace(/\/$/, '');
const ADMIN_TOKEN_TTL_SEC = 60 * 60 * 8; // 8 hours
const CLIENT_TOKEN_TTL_SEC = 60 * 60 * 24 * 31; // 31 days

function allowedOrigins() {
  const extra = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim().replace(/\/$/, '')).filter(Boolean);
  return [APP_URL, ...extra];
}

// Restrict CORS to the site's own origin. Returns false if the request should stop (preflight handled).
function applyCors(req, res, methods = 'GET,POST,OPTIONS') {
  const origin = (req.headers.origin || '').replace(/\/$/, '');
  if (origin && allowedOrigins().includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(origin && !allowedOrigins().includes(origin) ? 403 : 204).end();
    return false;
  }
  if (origin && !allowedOrigins().includes(origin)) {
    res.status(403).json({ error: 'Origin not allowed' });
    return false;
  }
  return true;
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  // Hash first so lengths match and timingSafeEqual never throws / leaks length.
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb) && a.length === b.length;
}

function getSigningSecret() {
  const s = process.env.SESSION_SIGNING_SECRET;
  if (!s || s.length < 32) return null;
  return s;
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function signToken(payload, ttlSec) {
  const secret = getSigningSecret();
  if (!secret) throw new Error('SESSION_SIGNING_SECRET is not configured (min 32 chars)');
  const body = { ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + ttlSec };
  const encoded = b64url(JSON.stringify(body));
  const sig = b64url(crypto.createHmac('sha256', secret).update(encoded).digest());
  return `${encoded}.${sig}`;
}

function verifyToken(token, expectedType) {
  const secret = getSigningSecret();
  if (!secret || typeof token !== 'string' || !token.includes('.')) return null;
  const [encoded, sig] = token.split('.');
  const expected = b64url(crypto.createHmac('sha256', secret).update(encoded).digest());
  if (!safeEqual(sig, expected)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(encoded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
  } catch (e) { return null; }
  if (!payload || typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null;
  if (expectedType && payload.typ !== expectedType) return null;
  return payload;
}

function bearer(req) {
  const h = req.headers.authorization || '';
  return h.startsWith('Bearer ') ? h.slice(7).trim() : '';
}

// Returns admin payload or sends 401 and returns null.
function requireAdmin(req, res) {
  const payload = verifyToken(bearer(req), 'admin');
  if (!payload) {
    res.status(401).json({ success: false, error: 'Admin authentication required' });
    return null;
  }
  return payload;
}

function parseBody(req) {
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  return body || {};
}

module.exports = {
  APP_URL, ADMIN_TOKEN_TTL_SEC, CLIENT_TOKEN_TTL_SEC,
  applyCors, safeEqual, signToken, verifyToken, requireAdmin, parseBody, bearer,
};
