/**
 * Owner paid-order alert via Resend (free tier).
 * Uses fetch/https only — no Resend npm package.
 * Never throws: webhook must still return 200 to Stripe.
 */

async function postResend(apiKey, payload) {
  if (typeof fetch === 'function') {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (_) { data = { raw: text }; }
    return { ok: res.ok, status: res.status, data };
  }

  // Fallback for older Node runtimes without global fetch
  const https = require('https');
  const body = JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + apiKey,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8');
          let data = null;
          try { data = text ? JSON.parse(text) : null; } catch (_) { data = { raw: text }; }
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data });
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function notifyOwnerPaid(order) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[NOTIFY] skipped: RESEND_API_KEY not set');
    return;
  }

  try {
    const tier = order && order.tier != null ? String(order.tier) : 'unknown';
    const amountCents = Number(order && order.amountTotal) || 0;
    const amount = (amountCents / 100).toFixed(2);
    const currency = (order && order.currency) || 'usd';
    const to = process.env.OWNER_NOTIFY_EMAIL || 'williamkeesee06@gmail.com';
    const from = process.env.OWNER_NOTIFY_FROM || 'Aurora Elite <onboarding@resend.dev>';

    const lines = [
      'New paid Aurora Elite order.',
      '',
      'paidAt: ' + (order && order.paidAt ? order.paidAt : ''),
      'tier: ' + tier,
      'amount: $' + amount + ' ' + String(currency).toUpperCase(),
      'customerEmail: ' + ((order && order.customerEmail) || ''),
      'name: ' + ((order && order.name) || ''),
      'city: ' + ((order && order.city) || ''),
      'age: ' + ((order && order.age) || ''),
      'phone (alert): ' + ((order && order.phone) || ''),
      'sessionId: ' + ((order && order.sessionId) || ''),
      'clientRef: ' + ((order && order.clientRef) || ''),
      '',
      'Admin: https://aurora-elite-three.vercel.app — open admin to fulfill.',
    ];

    const result = await postResend(apiKey, {
      from,
      to: [to],
      subject: 'New Aurora Elite order — ' + tier + ' — $' + amount,
      text: lines.join('\n'),
    });

    if (!result.ok) {
      console.error('[NOTIFY] Resend failed', result.status, result.data);
      return;
    }

    const emailId = result.data && (result.data.id || result.data.email_id);
    console.log('AE_OWNER_NOTIFIED ' + JSON.stringify({
      id: emailId || null,
      to,
      tier,
      amount: Number(amount),
      sessionId: order && order.sessionId,
    }));
  } catch (err) {
    console.error('[NOTIFY] error (non-fatal):', err && err.message ? err.message : err);
  }
}

module.exports = { notifyOwnerPaid };
