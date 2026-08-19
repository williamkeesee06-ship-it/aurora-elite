require('dotenv').config();
const Stripe = require('stripe');

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = Stripe(stripeKey);

const PACKAGES = {
  'tier-1': {
    name: 'AURORA ELITE // Package I: Preliminary Reconnaissance',
    desc: 'Binary presence discovery query across private datelines & review boards.',
    priceInCents: 2500, // $25.00
  },
  'tier-2': {
    name: 'AURORA ELITE // Package II: Forensic Flag Assessment',
    desc: 'Volume mention counts, red/green flag classification, biometric cross-match & PDF report.',
    priceInCents: 5000, // $50.00
  },
  'tier-3': {
    name: 'AURORA ELITE // Package III: Full Transcript Disclosure',
    desc: 'Complete unredacted conversations, cited source links, screenshots & 24-page evidence dossier.',
    priceInCents: 7500, // $75.00
  },
  'tier-4': {
    name: 'AURORA ELITE // Package IV: 30-Day Sentinel Surveillance',
    desc: 'Full unredacted dossier + 30 days of 24/7 autonomous telemetry guard and encrypted mobile keycard.',
    priceInCents: 10000, // $100.00
  }
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) {}
    }
    body = body || {};

    const { tier = 'tier-1', targetName = 'Anonymous', targetCity = 'Metro', targetAge = '', targetInitial = '', alertPhone = '' } = body;

    const selectedPkg = PACKAGES[tier] || PACKAGES['tier-1'];
    const sentinelToken = `AE-SENTINEL-${Math.floor(1000 + Math.random() * 9000)}`;

    const origin = req.headers.origin || req.headers.referer || process.env.APP_URL || 'https://aurora-elite-three.vercel.app';
    const cleanOrigin = origin.replace(/\/$/, '');

    // If Stripe Secret Key is not configured yet, return instant demo fallback
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return res.status(200).json({
        id: 'cs_demo_' + Date.now(),
        url: `${cleanOrigin}/?status=success&session_id=demo_${Date.now()}&token=${sentinelToken}&tier=${tier}`,
        demoMode: true,
        token: sentinelToken
      });
    }

    // Live Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPkg.name,
              description: selectedPkg.desc,
            },
            unit_amount: selectedPkg.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        statement_descriptor_suffix: 'SERVICELOG',
      },
      success_url: `${cleanOrigin}/?status=success&session_id={CHECKOUT_SESSION_ID}&token=${sentinelToken}&tier=${tier}`,
      cancel_url: `${cleanOrigin}/?status=cancelled`,
      metadata: {
        targetName,
        targetCity,
        targetAge,
        targetInitial,
        alertPhone,
        tier,
        sentinelToken,
        createdAt: new Date().toISOString()
      },
    });

    return res.status(200).json({ id: session.id, url: session.url, demoMode: false, token: sentinelToken });
  } catch (error) {
    console.error('[STRIPE SERVERLESS ERROR]', error);
    return res.status(500).json({ error: error.message });
  }
};
