const { applyCors } = require('./_lib/security');
module.exports = function handler(req, res) {
  if (!applyCors(req, res, 'GET,OPTIONS')) return;
  res.status(200).json({ status: 'active', timestamp: new Date().toISOString() });
};
