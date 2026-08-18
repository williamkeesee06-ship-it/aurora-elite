# AURA VAULT — Edge Hybrid Cloud Deployment & Production Architecture

---

## 1. Production Architecture Overview

```
                                  INTERNET TRAFFIC
                                         │
                                         ▼
                     ┌───────────────────────────────────────┐
                     │            CLOUDFLARE WAF             │
                     │  (DDoS Protection, SSL, Bot Shield)   │
                     └───────────────────┬───────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
                 ▼                                               ▼
   ┌───────────────────────────┐                   ┌───────────────────────────┐
   │      VERCEL / PAGES       │                   │      RAILWAY / RENDER     │
   │      (Static Frontend)    │                   │      (Node.js API Engine) │
   │  • HTML / CSS / JS        │                   │  • Stripe Checkout Routes │
   │  • Global Edge CDN (<50ms)│                   │  • Ephemeral Redis Queue  │
   └─────────────┬─────────────┘                   └─────────────┬─────────────┘
                 │                                               │
                 │                                               ▼
                 │                                 ┌───────────────────────────┐
                 │                                 │      UPSTASH REDIS        │
                 │                                 │   (Zero-Log TTL 24h Auto) │
                 │                                 └─────────────┬─────────────┘
                 │                                               │
                 ▼                                               ▼
   ┌───────────────────────────────────────────────────────────────────────────┐
   │                               STRIPE API                                  │
   │         (Apple Pay, Google Pay, 3D Secure 2, Webhook Event Stream)        │
   └───────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Infrastructure Stack Breakdown

1. **Edge CDN (Frontend)**: **Vercel** or **Cloudflare Pages**
   - Serves static assets with sub-50ms latency worldwide.
   - Zero server maintenance, automated SSL certificates.
2. **Backend API & Scraper Gateway**: **Railway.app** or **Render.com**
   - Runs `server.js` (Express + Stripe SDK).
   - Auto-scales memory and CPU based on traffic spikes from TikTok ads.
3. **Ephemeral State & Cache**: **Upstash Serverless Redis**
   - Stores encrypted query hashes with strict `EXPIRE 86400` (24-hour auto-purge).
   - Zero customer search records or uploaded images are permanently stored on disk.
4. **Payments & Billing**: **Stripe Live Elements**
   - Statement Descriptor: `CS*SERVICELOG`
   - Handles Apple Pay, Google Pay, Link, Visa, Mastercard, AMEX.

---

## 3. Production Environment Variables (`.env`)

Create a `.env` file in the root of your Railway / Vercel project:

```env
# Server Configuration
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

# Stripe Live Keys (From your Stripe Dashboard)
STRIPE_SECRET_KEY=sk_live_51Pxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx
STRIPE_STATEMENT_DESCRIPTOR=CS*SERVICELOG

# Ephemeral Redis Cache (Upstash)
REDIS_URL=rediss://default:xxxxxx@xxxxxx.upstash.io:6379

# Scraper & Proxy Nodes (Optional)
SWISS_PROXY_GATEWAY=http://user:pass@proxy.swissnode.net:8080
```

---

## 4. Step-by-Step 10-Minute Deployment Guide

### Step 1: Push Code to GitHub
```bash
cd D:\TEA_CHECKER
git init
git add .
git commit -m "Deploy AURA Vault production build"
git remote add origin https://github.com/yourusername/tea-checker-vault.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Railway
1. Go to [Railway.app](https://railway.app) $\rightarrow$ Click **New Project** $\rightarrow$ **Deploy from GitHub repo**.
2. Select your repository.
3. In **Variables**, add your `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
4. Railway will automatically detect Node.js, run `npm install`, and generate a live backend URL (e.g., `https://aura-backend.up.railway.app`).

### Step 3: Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com) $\rightarrow$ Click **Add New Project** $\rightarrow$ Import your repo.
2. Under **Root Directory**, keep as `./`.
3. Set your production domain (e.g., `auravault.io`).
4. In Cloudflare, point DNS A/CNAME records to Vercel with Cloudflare Proxy (Orange Cloud) enabled for DDoS/WAF protection.

### Step 4: Configure Stripe Webhook
1. Go to **Stripe Dashboard** $\rightarrow$ **Developers** $\rightarrow$ **Webhooks**.
2. Add endpoint: `https://aura-backend.up.railway.app/api/webhook`.
3. Select event: `checkout.session.completed`.
4. Copy the signing secret into your Railway `STRIPE_WEBHOOK_SECRET` variable.
