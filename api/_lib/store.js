// Persistence layer.
// TODO(persistence): No Vercel KV / Upstash Redis / Blob store is connected to this
// project yet, so this falls back to per-instance memory, which is wiped on every cold
// start and is NOT shared between function instances. Before relying on the admin
// roster, connect a store (e.g. Upstash Redis via the Vercel Marketplace, free tier)
// and implement the three functions below against it. Stripe remains the source of
// truth for paid orders in the meantime (see Stripe Dashboard > Payments).
const memory = { orders: [], findings: [] };

async function saveOrder(order) {
  // TODO(persistence): replace with KV write, e.g. redis.hset(`order:${order.sessionId}`, order)
  if (!memory.orders.find(o => o.sessionId === order.sessionId)) memory.orders.unshift(order);
  return order;
}

async function listOrders() {
  // TODO(persistence): replace with KV read
  return memory.orders;
}

async function listFindings(clientRef) {
  // TODO(persistence): replace with KV read
  return clientRef ? memory.findings.filter(f => f.clientRef === clientRef) : memory.findings;
}

async function addFinding(finding) {
  // TODO(persistence): replace with KV write
  memory.findings.unshift(finding);
  return finding;
}

module.exports = { saveOrder, listOrders, listFindings, addFinding, isPersistent: false };
