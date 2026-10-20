const { applyCors, verifyToken, bearer } = require('./_lib/security');

// Returns only what the signed (post-payment) client token says. No mock data.
module.exports = async function handler(req, res) {
  if (!applyCors(req, res, 'GET,OPTIONS')) return;
  const payload = verifyToken(bearer(req), 'client');
  if (!payload) return res.status(401).json({ success: false, error: 'Valid access token required' });
  return res.status(200).json({
    success: true,
    client: { clientRef: payload.ref, tier: payload.tier, expiresAt: new Date(payload.exp * 1000).toISOString() },
  });
};
