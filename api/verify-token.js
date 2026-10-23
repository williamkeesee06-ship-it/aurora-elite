const Stripe = require('stripe');
const { applyCors, parseBody, signToken, verifyToken, CLIENT_TOKEN_TTL_SEC } = require('./_lib/security');

// Two ways in, both requiring proof of a real payment:
//  1. { session_id }  -> looked up with Stripe; must be payment_status === 'paid'.
//     Returns a signed client access token.
//  2. { token }       -> a signed client token previously issued by (1).
module.exports = async function handler(req, res) {
  if (!applyCors(req, res, 'POST,OPTIONS')) return;
  if (req.method !== 'POST') return res.status(405).json({ valid: false, error: 'Method not allowed' });

  const body = parseBody(req);

  if (body.token) {
    const p = verifyToken(String(body.token), 'client');
    if (!p) return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
    return res.status(200).json({ valid: true, clientRef: p.ref, tier: p.tier, expiresAt: new Date(p.exp * 1000).toISOString() });
  }

  const sessionId = String(body.session_id || '');
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) {
    return res.status(400).json({ valid: false, error: 'session_id or token required' });
  }
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('placeholder')) return res.status(503).json({ valid: false, error: 'Payments not configured' });

  try {
    const session = await Stripe(key).checkout.sessions.retrieve(sessionId);
    if (!session || session.payment_status !== 'paid') {
      return res.status(402).json({ valid: false, error: 'Payment not completed' });
    }
    const md = session.metadata || {};
    const token = signToken({ typ: 'client', ref: md.clientRef || session.id, tier: md.tier, sid: session.id }, CLIENT_TOKEN_TTL_SEC);
    return res.status(200).json({ valid: true, token, clientRef: md.clientRef, tier: md.tier });
  } catch (e) {
    console.error('[VERIFY TOKEN]', e && e.message);
    return res.status(400).json({ valid: false, error: 'Could not verify payment' });
  }
};
