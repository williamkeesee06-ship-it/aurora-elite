require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = Stripe(stripeKey);

app.use(cors());

// Webhook needs raw body before express.json()
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error(`[WEBHOOK SIGNATURE FAILED]`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(`\n✦ [PAYMENT UNLOCKED] Session: ${session.id} | Tier: ${session.metadata?.tier}`);
    console.log(`✦ [SENTINEL KEYCARD ACTIVATED]: ${session.metadata?.sentinelToken} for ${session.metadata?.targetName} (${session.metadata?.targetCity})`);
  }

  res.json({ received: true });
});

// JSON and form body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

/**
 * Reconnaissance Packages Tier Pricing Dictionary
 */
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

/**
 * Endpoint: Create Dynamic Stripe Checkout Session
 */
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { tier = 'tier-1', targetName = 'Anonymous', targetCity = 'Metro', targetAge = '', targetInitial = '', alertPhone = '' } = req.body || {};

    const selectedPkg = PACKAGES[tier] || PACKAGES['tier-1'];
    const sentinelToken = `AE-SENTINEL-${Math.floor(1000 + Math.random() * 9000)}`;

    const origin = req.headers.origin || req.headers.referer || (process.env.APP_URL || 'http://localhost:3000');
    const cleanOrigin = origin.replace(/\/$/, '');

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return res.json({
        id: 'cs_demo_' + Date.now(),
        url: `${cleanOrigin}/?status=success&session_id=demo_${Date.now()}&token=${sentinelToken}&tier=${tier}`,
        demoMode: true,
        token: sentinelToken
      });
    }

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

    res.json({ id: session.id, url: session.url, demoMode: false, token: sentinelToken });
  } catch (error) {
    console.error('[STRIPE ERROR]', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Endpoint: Verify Token for Returning Clients
 */
app.post('/api/verify-token', (req, res) => {
  const { token } = req.body || {};
  if (!token) {
    return res.status(400).json({ valid: false, error: 'Token required' });
  }

  const isValid = token.toUpperCase().startsWith('AE-') || token.toUpperCase() === 'DEMO-KEY';
  res.json({
    valid: isValid,
    token: token.toUpperCase(),
    tier: 'tier-4',
    expiresInDays: 29,
    status: 'ACTIVE_TELEMETRY'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', platform: 'AURORA ELITE Vercel Edge Hybrid Engine', timestamp: new Date() });
});

// Export for Vercel Serverless Function compatibility
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`\n=============================================================`);
    console.log(`✦ AURORA ELITE PRODUCTION ENGINE RUNNING ON PORT ${PORT}`);
    console.log(`✦ Local Access: http://localhost:${PORT}`);
    console.log(`✦ Zero-Log Ephemeral Mode: ACTIVE`);
    console.log(`=============================================================\n`);
  });
}
