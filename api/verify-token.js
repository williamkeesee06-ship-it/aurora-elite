module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {}
  }
  body = body || {};

  const token = (body.token || req.query.token || '').trim();

  if (!token) {
    return res.status(400).json({ valid: false, error: 'Token required' });
  }

  const isValid = token.toUpperCase().startsWith('AE-') || token.toUpperCase() === 'DEMO-KEY';
  return res.status(200).json({
    valid: isValid,
    token: token.toUpperCase(),
    tier: 'tier-4',
    expiresInDays: 29,
    status: 'ACTIVE_TELEMETRY'
  });
};
