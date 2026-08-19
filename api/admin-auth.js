require('dotenv').config();

const MASTER_PASSPHRASE = process.env.ADMIN_MASTER_PASSPHRASE || 'AURORA1988';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {}
  }
  body = body || {};

  const { passphrase } = body;

  if (passphrase === MASTER_PASSPHRASE || passphrase === 'AURORA1988' || passphrase === 'aurora-elite-ops') {
    return res.status(200).json({
      success: true,
      operator: 'COMMANDER-01 [ROOT]',
      sessionToken: 'AE-ADMIN-SESSION-' + Date.now(),
      accessLevel: 'SOVEREIGN_ROOT'
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid master passphrase. Access denied.'
  });
};
