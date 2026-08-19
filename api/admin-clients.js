// Client Roster Store
let CLIENTS_STORE = [
  {
    token: 'AE-SENTINEL-DEMO',
    name: 'Alexander K.',
    age: 29,
    metro: 'Miami, FL (Brickell / South Beach)',
    tier: 'tier-4',
    tierName: 'Package IV: 30-Day Sentinel Surveillance',
    phone: '+1 (555) 019-8821',
    daysRemaining: 29,
    status: 'ACTIVE_GUARD',
    findingsCount: 2
  },
  {
    token: 'AE-SENTINEL-8842',
    name: 'Marcus V.',
    age: 34,
    metro: 'New York, NY (Manhattan / Brooklyn)',
    tier: 'tier-4',
    tierName: 'Package IV: 30-Day Sentinel Surveillance',
    phone: '+1 (555) 349-1120',
    daysRemaining: 18,
    status: 'ACTIVE_GUARD',
    findingsCount: 0
  },
  {
    token: 'AE-SENTINEL-7719',
    name: 'Julian B.',
    age: 31,
    metro: 'Los Angeles, CA (Beverly Hills / West Hollywood)',
    tier: 'tier-4',
    tierName: 'Package IV: 30-Day Sentinel Surveillance',
    phone: '+1 (555) 872-9903',
    daysRemaining: 24,
    status: 'ACTIVE_GUARD',
    findingsCount: 1
  }
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, clients: CLIENTS_STORE });
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }
    body = body || {};

    const { token, action, newPhone, extendDays } = body;
    const client = CLIENTS_STORE.find(c => c.token === token);

    if (!client) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }

    if (action === 'update-phone' && newPhone) {
      client.phone = newPhone;
    }
    if (action === 'extend' && extendDays) {
      client.daysRemaining += Number(extendDays);
    }

    return res.status(200).json({ success: true, client });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
