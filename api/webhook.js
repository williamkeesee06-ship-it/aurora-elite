const Stripe = require('stripe');
const store = require('./_lib/store');
const { notifyOwnerPaid } = require('./_lib/notify');

async function rawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}

const handler = async function (req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  const sig = req.headers['stripe-signature'];
  if (!secret || !key) {
    console.error('[WEBHOOK] STRIPE_WEBHOOK_SECRET / STRIPE_SECRET_KEY not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }
  if (!sig) return res.status(400).json({ error: 'Missing Stripe signature' });

  let event;
  try {
    const buf = await rawBody(req);
    event = Stripe(key).webhooks.constructEvent(buf, sig, secret);
  } catch (err) {
    console.error('[WEBHOOK] Signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object || {};
    const md = s.metadata || {};
    const order = {
      sessionId: s.id,
      clientRef: md.clientRef,
      tier: md.tier,
      amountTotal: s.amount_total,
      currency: s.currency,
      paymentStatus: s.payment_status,
      customerEmail: (s.customer_details && s.customer_details.email) || null,
      name: [md.targetName, md.targetInitial].filter(Boolean).join(' '),
      city: md.targetCity,
      age: md.targetAge,
      phone: md.alertPhone,
      paidAt: new Date((event.created || Date.now() / 1000) * 1000).toISOString(),
    };
    await store.saveOrder(order);
    // ORDER NOTIFICATION: one structured line per paid order. View it in
    // Vercel > aurora-elite > Logs (filter: "AE_ORDER_PAID").
    console.log('AE_ORDER_PAID ' + JSON.stringify({
      sessionId: order.sessionId, clientRef: order.clientRef, tier: order.tier,
      amount: (order.amountTotal || 0) / 100, currency: order.currency,
      email: order.customerEmail, paidAt: order.paidAt,
    }));
    await notifyOwnerPaid(order);
  }

  return res.status(200).json({ received: true });
};

handler.config = { api: { bodyParser: false } };
module.exports = handler;
module.exports.config = handler.config;
