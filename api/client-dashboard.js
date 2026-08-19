const findingsHandler = require('./admin-findings');
const clientsHandler = require('./admin-clients');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let token = req.query.token || (req.body && req.body.token) || 'AE-SENTINEL-DEMO';
  token = token.toUpperCase();

  // Return mock dashboard state
  return res.status(200).json({
    success: true,
    token,
    client: {
      name: token === 'AE-SENTINEL-DEMO' ? 'Alexander K.' : 'Client Protected',
      metro: 'Miami, FL (18 Monitored Nodes)',
      tier: 'Package IV: 30-Day Sentinel Surveillance',
      daysRemaining: 29,
      phone: '+1 (555) 019-8821',
      status: 'ACTIVE_GUARD',
      seedPhotosCount: 3,
      monitoredGroupsCount: 18
    }
  });
};
