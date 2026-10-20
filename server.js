// Local development server. Production runs the same handlers as Vercel functions in /api.
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// Vercel-style helpers so the /api handlers run unchanged.
app.use((req, res, next) => {
  res.status = res.status.bind(res);
  next();
});

// Webhook must receive the raw body for Stripe signature verification (handler reads the stream).
app.post('/api/webhook', (req, res) => require('./api/webhook')(req, res));

app.use(express.json());
const routes = ['admin-auth', 'admin-clients', 'admin-findings', 'client-dashboard', 'create-checkout-session', 'health', 'verify-token'];
for (const r of routes) {
  app.all(`/api/${r}`, (req, res) => require(`./api/${r}`)(req, res));
}

app.use(express.static(__dirname, { extensions: ['html'], dotfiles: 'deny' }));

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`AURORA ELITE dev server on http://localhost:${PORT}`));
}
