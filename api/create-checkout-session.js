require('dotenv').config();
const Stripe = require('stripe');

const crypto = require('crypto');
const { APP_URL, applyCors, parseBody } = require('./_lib/security');

const PACKAGES = {
  'tier-1': {
    name: 'Aurora Elite — Preliminary Reconnaissance',
    desc: 'Confidential discovery query across closed dating networks & registries.',
    priceInCents: 2500, // $25.00
  },
  'tier-2': {
    name: 'Aurora Elite — Forensic Flag Assessment',
    desc: 'Volume verification, red/green flag ratio, photo cross-match & PDF report.',
    priceInCents: 5000, // $50.00
  },
  'tier-3': {
    name: 'Aurora Elite — Full Transcript Disclosure',
    desc: 'Unredacted word-for-word community discussions, cited sources & media dossier.',
    priceInCents: 7500, // $75.00
  },
  'tier-4': {
    name: 'Aurora Elite — 30-Day Sentinel Surveillance',
    desc: 'Complete unredacted dossier + 30 days of 24/7 autonomous alert guard & keycard.',
    priceInCents: 10000, // $100.00
  }
};

const str = (v, max = 80) => String(v == null ? '' : v).slice(0, max);

module.exports = async function handler(req, res) {
  if (!applyCors(req, res, 'POST,OPTIONS')) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Never fake a successful payment. If Stripe isn't configured, fail loudly.
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('placeholder') || key.includes('replace_with')) {
    console.error('[CHECKOUT] STRIPE_SECRET_KEY is not configured; refusing to create a session.');
    return res.status(503).json({ error: 'Payments are temporarily unavailable. Please try again later.' });
  }
  const stripe = Stripe(key);

  try {
    const body = parseBody(req);
    const tier = PACKAGES[body.tier] ? body.tier : null;
    if (!tier) return res.status(400).json({ error: 'Invalid package' });
    const selectedPkg = PACKAGES[tier];

    // Opaque client reference; the customer's access token is only issued after Stripe confirms payment.
    const clientRef = 'AE-' + crypto.randomBytes(6).toString('hex').toUpperCase();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: selectedPkg.name, description: selectedPkg.desc },
          unit_amount: selectedPkg.priceInCents,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${APP_URL}/?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/?status=cancelled`,
      metadata: {
        tier,
        clientRef,
        targetName: str(body.targetName),
        targetInitial: str(body.targetInitial, 4),
        targetAge: str(body.targetAge, 4),
        targetCity: str(body.targetCity),
        alertPhone: str(body.alertPhone, 32),
        createdAt: new Date().toISOString(),
      },
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('[CHECKOUT ERROR]', error && error.message);
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
};
