const { applyCors, requireAdmin, parseBody } = require('./_lib/security');
const store = require('./_lib/store');

// Owner-only notes attached to a paid order. No sample/fake data.
module.exports = async function handler(req, res) {
  if (!applyCors(req, res, 'GET,POST,OPTIONS')) return;
  if (!requireAdmin(req, res)) return;

  if (req.method === 'GET') {
    const findings = await store.listFindings(req.query && req.query.clientRef);
    return res.status(200).json({ success: true, persistent: store.isPersistent, findings });
  }

  if (req.method === 'POST') {
    const { clientRef, summary } = parseBody(req);
    if (!clientRef || !summary) {
      return res.status(400).json({ success: false, error: 'clientRef and summary are required' });
    }
    const finding = {
      id: 'NOTE-' + Date.now(),
      clientRef: String(clientRef).slice(0, 40),
      summary: String(summary).slice(0, 2000),
      createdAt: new Date().toISOString(),
    };
    await store.addFinding(finding);
    return res.status(200).json({ success: true, finding });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
