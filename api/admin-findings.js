// In-memory findings registry with cloud sync fallback
let FINDINGS_STORE = [
  {
    id: 'FND-1082',
    token: 'AE-SENTINEL-DEMO',
    clientName: 'Alexander K.',
    source: 'AWDTSG Miami — South Beach Sub-Group',
    timestamp: 'Today, 2:45 PM',
    severity: 'RED_FLAG',
    severityLabel: '🔴 HIGH SEVERITY RED FLAG',
    transcript: '"Has anyone gone out with Alex from Brickell? Met him on Hinge, seemed super charming but heard weird rumors from his ex. Need the tea before our date tonight!"',
    commentsCount: 7,
    commentsSummary: '3 users replied saying he was polite and normal; 1 user made unverified speculation.',
    imageUrl: '',
    status: 'ACTIVE_INTERCEPTION',
    dmcaGenerated: false
  },
  {
    id: 'FND-1049',
    token: 'AE-SENTINEL-DEMO',
    clientName: 'Alexander K.',
    source: 'Tea for Women — Miami Private Salon',
    timestamp: 'Yesterday, 11:20 AM',
    severity: 'GREEN_FLAG',
    severityLabel: '🟢 POSITIVE ENDORSEMENT',
    transcript: '"Alex K. is 100% vetted! Went to dinner at Carbone with him last month. Total gentleman, paid the bill, drove me home safely. Green flag."',
    commentsCount: 12,
    commentsSummary: 'Overwhelmingly positive feedback.',
    imageUrl: '',
    status: 'VETTED_CLEAN',
    dmcaGenerated: false
  }
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Fetch findings for admin or specific token
  if (req.method === 'GET') {
    const token = req.query.token;
    if (token) {
      const filtered = FINDINGS_STORE.filter(f => f.token.toUpperCase() === token.toUpperCase());
      return res.status(200).json({ success: true, findings: filtered });
    }
    return res.status(200).json({ success: true, findings: FINDINGS_STORE });
  }

  // POST: Publish new finding from Admin Portal
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }
    body = body || {};

    const {
      token = 'AE-SENTINEL-DEMO',
      clientName = 'Alexander K.',
      source = 'AWDTSG Miami',
      severity = 'RED_FLAG',
      transcript = '',
      commentsSummary = '',
      imageUrl = ''
    } = body;

    if (!transcript) {
      return res.status(400).json({ success: false, error: 'Transcript content is required' });
    }

    const newFinding = {
      id: 'FND-' + Math.floor(1000 + Math.random() * 9000),
      token: token.toUpperCase(),
      clientName,
      source,
      timestamp: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
      severity,
      severityLabel: severity === 'RED_FLAG' ? '🔴 HIGH SEVERITY RED FLAG' : severity === 'GREEN_FLAG' ? '🟢 POSITIVE ENDORSEMENT' : '🟡 MODERATE CAUTION',
      transcript,
      commentsCount: 1,
      commentsSummary: commentsSummary || 'Single post intercepted by regional telemetry crawler.',
      imageUrl: imageUrl || '',
      status: 'ACTIVE_INTERCEPTION',
      dmcaGenerated: false
    };

    FINDINGS_STORE.unshift(newFinding);

    return res.status(200).json({
      success: true,
      message: 'Finding published to client dossier and SMS alert dispatched.',
      finding: newFinding
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
