module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'active',
    platform: 'AURORA ELITE Vercel Native Edge Serverless Engine',
    timestamp: new Date().toISOString()
  });
};
