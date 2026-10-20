const { applyCors, requireAdmin } = require('./_lib/security');
const store = require('./_lib/store');

// Paid-order roster for the owner. Orders are recorded by the verified Stripe webhook.
module.exports = async function handler(req, res) {
  if (!applyCors(req, res, 'GET,OPTIONS')) return;
  if (!requireAdmin(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const clients = await store.listOrders();
  return res.status(200).json({ success: true, persistent: store.isPersistent, clients });
};
