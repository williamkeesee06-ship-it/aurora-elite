const Stripe = require('stripe');

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = Stripe(stripeKey);

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const handler = async function(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const buf = await buffer(req);
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      event = JSON.parse(buf.toString());
    }
  } catch (err) {
    console.error(`[WEBHOOK VERIFICATION FAILED]`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log(`\n✦ [PAYMENT UNLOCKED] Session: ${session.id} | Tier: ${session.metadata?.tier}`);
    console.log(`✦ [SENTINEL KEYCARD ACTIVATED]: ${session.metadata?.sentinelToken} for ${session.metadata?.targetName} (${session.metadata?.targetCity})`);
  }

  return res.status(200).json({ received: true });
};

handler.config = {
  api: {
    bodyParser: false,
  },
};

module.exports = handler;
