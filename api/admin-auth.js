const { applyCors, safeEqual, signToken, parseBody, ADMIN_TOKEN_TTL_SEC } = require('./_lib/security');

module.exports = async function handler(req, res) {
  if (!applyCors(req, res, 'POST,OPTIONS')) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const master = process.env.ADMIN_MASTER_PASSPHRASE;
  if (!master || master.length < 12 || !process.env.SESSION_SIGNING_SECRET) {
    console.error('[ADMIN AUTH] ADMIN_MASTER_PASSPHRASE (min 12 chars) or SESSION_SIGNING_SECRET not configured.');
    return res.status(503).json({ success: false, error: 'Admin access is not configured.' });
  }

  const { passphrase } = parseBody(req);
  if (!safeEqual(String(passphrase || ''), master)) {
    return res.status(401).json({ success: false, error: 'Invalid passphrase.' });
  }

  const sessionToken = signToken({ typ: 'admin', sub: 'owner' }, ADMIN_TOKEN_TTL_SEC);
  return res.status(200).json({ success: true, sessionToken, expiresInSec: ADMIN_TOKEN_TTL_SEC });
};
