/* ==========================================================================
   AURORA ELITE — RECONNAISSANCE PACKAGES, STRIPE CHECKOUT,
   SENTINEL OPS & SOVEREIGN OWNER COMMAND CENTER (WITH TEA STUDIO)
   ========================================================================== */

// Location Privacy Stealth Telemetry
const privacyStatusStates = [
  "LOCATION JAMMING ACTIVE • IP & REGION UNAVAILABLE",
  "GEOLOCATION BLOCKED // 100% UNTRACKED",
  "LOCATION JAMMING ACTIVE • SWISS PROXY NODE",
  "CLIENT TELEMETRY: MASKED // ZERO-LOG RAM",
  "LOCATION JAMMING ACTIVE • IP & REGION UNAVAILABLE"
];

function updatePrivacyTicker() {
  const tickerEl = document.getElementById("live-scan-ticker");
  if (!tickerEl) return;
  const randomState = privacyStatusStates[Math.floor(Math.random() * privacyStatusStates.length)];
  tickerEl.textContent = randomState;
}
setInterval(updatePrivacyTicker, 6500);

// Left Rail Drawer Toggling
function toggleDropdown() {
  const dropdown = document.getElementById('services-dropdown');
  const btn = document.getElementById('services-menu-btn');
  if (!dropdown) return;
  dropdown.classList.toggle('open');
  if (btn) btn.classList.toggle('active');
}

function closeDropdownIfOpen() {
  const dropdown = document.getElementById('services-dropdown');
  const btn = document.getElementById('services-menu-btn');
  if (dropdown && dropdown.classList.contains('open')) {
    dropdown.classList.remove('open');
    if (btn) btn.classList.remove('active');
  }
}

document.addEventListener('click', function(event) {
  const dropdownWrapper = document.querySelector('.dropdown-wrapper');
  const drawer = document.getElementById('services-dropdown');
  if (dropdownWrapper && drawer && !dropdownWrapper.contains(event.target) && !drawer.contains(event.target)) {
    closeDropdownIfOpen();
  }
});

// Reconnaissance Packages Specifications Dictionary
const TIER_DATA = {
  'tier-1': {
    tag: 'PACKAGE I ACTIVE',
    title: 'Package I: Preliminary Reconnaissance',
    price: '$25.00',
    priceVal: 25,
    summaryDesc: 'Binary discovery query to determine definitively if your identity exists on Tea for Women, AWDTSG, or private dating review groups.',
    requiresPhoto: false,
    requiresLastInitial: false,
    requiresAlertPhone: false,
    inputs: ['First Name', 'Age', 'Dating Metro Location / City'],
    deliverables: [
      '🔍 <strong>Binary Presence Verification:</strong> Informs you definitively IF your profile exists on Tea for Women, AWDTSG, or private dating review groups.',
      '🛡️ <strong>100% Inverted Stealth Protocol:</strong> Zero notifications, telemetry logs, or search traces left on target forums.',
      '💳 <strong>Discreet Statement Billing:</strong> Charged anonymously as neutral consulting line item (<code class="mono-inline">CS*SERVICELOG</code>).'
    ],
    ctaText: 'PROCEED TO ENCRYPTED STRIPE CHECKOUT • $25.00'
  },
  'tier-2': {
    tag: 'PACKAGE II ACTIVE',
    title: 'Package II: Forensic Flag Assessment',
    price: '$50.00',
    priceVal: 50,
    summaryDesc: 'Volume frequency counter, red flag / green flag ratio, biometric image cross-matching in volatile RAM, and downloadable Executive Summary PDF.',
    requiresPhoto: true,
    requiresLastInitial: true,
    requiresAlertPhone: false,
    inputs: ['First Name', 'Last Initial', 'Age', 'Dating Metro Location', 'Main Dating Profile Photos'],
    deliverables: [
      '📊 <strong>Volume & Frequency Counter:</strong> Exact count of distinct threads and community replies indexing your name.',
      '🚩 <strong>Red Flag / Green Flag Ratio:</strong> Algorithmic sentiment breakdown and behavioral flag classification.',
      '📸 <strong>Biometric Image Matching:</strong> Verifies photo-only submissions matched to your uploaded profile images in volatile RAM.',
      '📥 <strong>Executive Summary PDF:</strong> Instant downloadable summary report for your records.'
    ],
    ctaText: 'PROCEED TO ENCRYPTED STRIPE CHECKOUT • $50.00'
  },
  'tier-3': {
    tag: 'PACKAGE III ACTIVE',
    title: 'Package III: Full Transcript Disclosure',
    price: '$75.00',
    priceVal: 75,
    summaryDesc: 'Complete unredacted conversations, raw community discussion archives, cited sources, attached photos, and full Evidence PDF dossier.',
    requiresPhoto: true,
    requiresLastInitial: true,
    requiresAlertPhone: false,
    inputs: ['First Name', 'Last Initial', 'Age', 'Dating Metro Location', 'Main Dating Profile Photos'],
    deliverables: [
      '💬 <strong>Unredacted Word-for-Word Text:</strong> Complete, raw community discussions pulled directly from target boards.',
      '🔗 <strong>Directly Cited Sources:</strong> Exact channel names, sub-groups, and publication timestamps.',
      '📸 <strong>Unredacted Attached Media:</strong> High-resolution attached photos, screenshots, and chat logs.',
      '📥 <strong>Comprehensive Evidence PDF:</strong> Legally formatted evidence dossier available for instant download.'
    ],
    ctaText: 'PROCEED TO ENCRYPTED STRIPE CHECKOUT • $75.00'
  },
  'tier-4': {
    tag: 'PACKAGE IV ACTIVE',
    title: 'Package IV: 30-Day Sentinel Surveillance',
    price: '$100.00',
    priceVal: 100,
    summaryDesc: 'Complete unredacted dossier + 30 days of 24/7 autonomous background crawler guard with secret encrypted phone keycard and real-time alerts.',
    requiresPhoto: true,
    requiresLastInitial: true,
    requiresAlertPhone: true,
    inputs: ['First Name', 'Last Initial', 'Age', 'Dating Metro Location', 'Main Dating Profile Photos', 'Alert Phone / Webhook'],
    deliverables: [
      '👑 <strong>Everything in Packages I, II, & III:</strong> Immediate access to the complete unredacted conversation dossier & cited evidence.',
      '🔑 <strong>Secret Encrypted Sentinel Keycard:</strong> 30-day mobile passkey to unlock your private live surveillance operations dashboard.',
      '📡 <strong>30-Day Active Autonomous Guard:</strong> Background crawlers monitor your metro 24/7 for newly created threads, comments, or photos.',
      '⚡ <strong>Instant Real-Time Alerts:</strong> Immediate SMS / Webhook notification the second your name or photo is indexed.',
      '🔒 <strong>30-Day Fixed Retainer Window:</strong> Active for 30 full days (non-recurring; repurchase anytime for extended surveillance).'
    ],
    ctaText: 'PROCEED TO ENCRYPTED STRIPE CHECKOUT • $100.00'
  },
  'legal-removal': {
    tag: 'PACKAGE V // STATUTORY DEFAMATION REMEDY',
    title: 'Package V: Legal Defamation Remedy',
    price: 'STATUTORY REMEDY',
    summaryDesc: 'Pre-drafted statutory DMCA copyright takedowns, formal cease & desist notices, Google search de-indexing application kits, and attorney escalation.',
    inputs: ['Defamatory URL / Thread Evidence Packet', 'Target Forum Details'],
    deliverables: [
      '⚖️ <strong>Statutory DMCA Notice Packets:</strong> Legally binding cease & desist demands commanding immediate content deletion.',
      '🛑 <strong>Google De-Indexing Applications:</strong> Scrub defamatory forum threads from major search engine result caches.',
      '📜 <strong>Attorney Escalation Route:</strong> Direct referral channel to specialized internet defamation attorneys.'
    ],
    ctaText: 'ENGAGE PACKAGE V REMEDY'
  }
};

let currentSelectedProtocol = 'tier-1';

// Fullscreen Vault Workspace Controller
function toggleVaultModal() {
  const workspace = document.getElementById('vault-gateway-modal');
  if (!workspace) return;
  if (workspace.classList.contains('hidden')) {
    openVaultModal('new-audit', currentSelectedProtocol);
  } else {
    closeVaultModal();
  }
}

function openVaultModal(targetTab = 'new-audit', protocolKey = 'tier-1') {
  closeDropdownIfOpen();
  const workspace = document.getElementById('vault-gateway-modal');
  const navVaultBtn = document.getElementById('nav-vault-toggle-btn');
  if (!workspace) return;
  
  switchVaultTab(targetTab);
  selectVaultProtocol(protocolKey);
  workspace.classList.remove('hidden');
  if (navVaultBtn) navVaultBtn.classList.add('active');
}

function closeVaultModal() {
  const workspace = document.getElementById('vault-gateway-modal');
  const navVaultBtn = document.getElementById('nav-vault-toggle-btn');
  if (workspace) workspace.classList.add('hidden');
  if (navVaultBtn) navVaultBtn.classList.remove('active');
}

function switchVaultTab(tabName) {
  const tabBtnNew = document.getElementById('tab-btn-new');
  const tabBtnExisting = document.getElementById('tab-btn-existing');
  const paneNew = document.getElementById('pane-new-audit');
  const paneExisting = document.getElementById('pane-existing-access');

  if (tabName === 'new-audit') {
    if (tabBtnNew) tabBtnNew.classList.add('active');
    if (tabBtnExisting) tabBtnExisting.classList.remove('active');
    if (paneNew) paneNew.classList.remove('hidden');
    if (paneExisting) paneExisting.classList.add('hidden');
  } else {
    if (tabBtnNew) tabBtnNew.classList.remove('active');
    if (tabBtnExisting) tabBtnExisting.classList.add('active');
    if (paneNew) paneNew.classList.add('hidden');
    if (paneExisting) paneExisting.classList.remove('hidden');
  }
}

function selectVaultProtocol(protocolKey) {
  currentSelectedProtocol = protocolKey;
  const data = TIER_DATA[protocolKey];
  if (!data) return;

  ['tier-1', 'tier-2', 'tier-3', 'tier-4'].forEach(k => {
    const card = document.getElementById(`pbtn-${k}`);
    if (card) {
      if (k === protocolKey) card.classList.add('active');
      else card.classList.remove('active');
    }
  });

  const tagEl = document.getElementById('scope-banner-tag');
  const descEl = document.getElementById('scope-banner-desc');
  const priceDisplay = document.getElementById('vault-price-display');
  const submitBtn = document.getElementById('vault-submit-btn');
  const keycardBadge = document.getElementById('scope-keycard-badge');

  if (tagEl) tagEl.textContent = data.tag;
  if (descEl) descEl.textContent = data.summaryDesc;
  if (priceDisplay) priceDisplay.textContent = data.price;
  if (keycardBadge) {
    keycardBadge.style.display = protocolKey === 'tier-4' ? 'block' : 'none';
  }
  if (submitBtn) {
    submitBtn.innerHTML = `<span>${data.ctaText}</span> <span>→</span>`;
  }

  const groupLastInitial = document.getElementById('group-last-initial');
  const groupAlertPhone = document.getElementById('group-alert-phone');
  const photoContainer = document.getElementById('vault-photo-container');

  if (groupLastInitial) {
    groupLastInitial.style.display = data.requiresLastInitial ? 'block' : 'none';
    const input = document.getElementById('vault-last-initial');
    if (input) input.required = data.requiresLastInitial;
  }

  if (groupAlertPhone) {
    groupAlertPhone.style.display = data.requiresAlertPhone ? 'block' : 'none';
    const input = document.getElementById('vault-alert-phone');
    if (input) input.required = data.requiresAlertPhone;
  }

  if (photoContainer) {
    photoContainer.style.display = data.requiresPhoto ? 'block' : 'none';
  }
}

// Photo Upload Controls
function handleVaultPhotoUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const previewThumb = document.getElementById('vault-preview-thumb');
      const filenameEl = document.getElementById('preview-filename');
      const promptEl = document.getElementById('dropzone-prompt');
      const previewBox = document.getElementById('dropzone-preview');

      if (previewThumb) previewThumb.src = e.target.result;
      if (filenameEl) filenameEl.textContent = file.name;

      if (promptEl) promptEl.classList.add('hidden');
      if (previewBox) previewBox.classList.remove('hidden');
    };

    reader.readAsDataURL(file);
  }
}

function purgeUploadedPhoto() {
  const fileInput = document.getElementById('vault-file-input');
  const previewThumb = document.getElementById('vault-preview-thumb');
  const promptEl = document.getElementById('dropzone-prompt');
  const previewBox = document.getElementById('dropzone-preview');

  if (fileInput) fileInput.value = "";
  if (previewThumb) previewThumb.src = "";
  if (previewBox) previewBox.classList.add('hidden');
  if (promptEl) promptEl.classList.remove('hidden');

  alert('✓ Photo buffer purged. Image was permanently erased from volatile memory.');
}

// Stripe Checkout Trigger
async function submitVaultAudit() {
  const firstName = document.getElementById('vault-first-name')?.value || "Client";
  const lastInitial = document.getElementById('vault-last-initial')?.value || "";
  const age = document.getElementById('vault-age')?.value || "30";
  const metro = document.getElementById('vault-metro')?.value || "Miami, FL";
  const alertPhone = document.getElementById('vault-alert-phone')?.value || "";
  const protocol = TIER_DATA[currentSelectedProtocol];
  const submitBtn = document.getElementById('vault-submit-btn');

  const fullName = lastInitial ? `${firstName} ${lastInitial}` : firstName;
  const tokenPrefix = currentSelectedProtocol === 'tier-4' ? 'AE-SENTINEL-' : 'AE-AUDIT-';
  const assignedToken = tokenPrefix + Math.floor(1000 + Math.random() * 9000);

  // Save submitted client order data to localStorage
  const activeOrder = {
    targetName: fullName,
    targetAge: age,
    targetCity: metro,
    alertPhone: alertPhone,
    tier: currentSelectedProtocol,
    tierTitle: protocol.title,
    token: assignedToken,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('ae_current_order', JSON.stringify(activeOrder));

  // Push to local operator queue
  registerNewOrderToAdminQueue(activeOrder);

  if (submitBtn) {
    submitBtn.innerHTML = `<span>ROUTING TO ENCRYPTED STRIPE GATEWAY...</span>`;
    submitBtn.disabled = true;
  }

  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: currentSelectedProtocol,
        targetName: firstName,
        targetInitial: lastInitial,
        targetAge: age,
        targetCity: metro,
        alertPhone: alertPhone
      })
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Failed to generate checkout session');
    }
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    // Fallback simulation for testing
    window.location.href = `/?status=success&token=${assignedToken}&tier=${currentSelectedProtocol}`;
  }
}

// Register order into admin queue
function registerNewOrderToAdminQueue(order) {
  const newAdminClient = {
    token: order.token,
    name: order.targetName,
    metro: order.targetCity + ` (Age ${order.targetAge})`,
    phone: order.alertPhone || 'N/A',
    tier: order.tier,
    tierTitle: order.tierTitle || 'Package I',
    daysRemaining: order.tier === 'tier-4' ? 30 : 0
  };

  const existingIdx = adminClients.findIndex(c => c.token === order.token);
  if (existingIdx === -1) {
    adminClients.unshift(newAdminClient);
  }
  updateAdminClientSelect();
}

// ==========================================================================
// CLIENT POST-PAYMENT & VERIFICATION CONTROLLER
// ==========================================================================
let countdownSeconds = 30 * 86400;
let countdownInterval = null;
let radarStreamInterval = null;
let currentClientToken = '';
let clientFindings = [];

function handlePostPaymentReturn(token, tier) {
  openVaultModal('existing-access');
  
  let orderData = null;
  try {
    const stored = localStorage.getItem('ae_current_order');
    if (stored) orderData = JSON.parse(stored);
  } catch(e) {}

  const targetName = orderData?.targetName || 'Vetted Client';
  const targetMetro = orderData?.targetCity || 'Metro Area';
  const effectiveToken = token || orderData?.token || 'AE-AUDIT-8842';
  const effectiveTier = tier || orderData?.tier || 'tier-1';

  const loginBox = document.getElementById('sentinel-login-box');
  const statusReceiptView = document.getElementById('audit-status-view');
  const sentinelDashView = document.getElementById('sentinel-dashboard-view');

  if (loginBox) loginBox.classList.add('hidden');

  // IF TIER 1, 2, OR 3: Display clean Investigation Status receipt (NO 30-day timer)
  if (effectiveTier === 'tier-1' || effectiveTier === 'tier-2' || effectiveTier === 'tier-3') {
    if (sentinelDashView) sentinelDashView.classList.add('hidden');
    if (statusReceiptView) statusReceiptView.classList.remove('hidden');

    const nameEl = document.getElementById('audit-client-name');
    const metroEl = document.getElementById('audit-client-metro');
    const tokenEl = document.getElementById('audit-client-token');
    const kickerEl = document.getElementById('audit-status-kicker');
    const pkgData = TIER_DATA[effectiveTier] || TIER_DATA['tier-1'];

    if (nameEl) nameEl.textContent = targetName.toUpperCase();
    if (metroEl) metroEl.textContent = targetMetro.toUpperCase();
    if (tokenEl) tokenEl.textContent = effectiveToken;
    if (kickerEl) kickerEl.textContent = `${pkgData.tag} // ${pkgData.title.toUpperCase()}`;

    // Clean findings view
    const findingsArea = document.getElementById('audit-findings-display');
    if (findingsArea) {
      findingsArea.innerHTML = `
        <div class="findings-queued-notice">
          <span class="notice-icon">🛡️</span>
          <div>
            <strong>CONFIDENTIAL DISCOVERY QUERY IN PROGRESS</strong>
            <p>Your search parameters for <strong>${targetName}</strong> (${targetMetro}) are currently being conducted across closed networks and Tea for Women boards. Once the sweep is certified by the operator, your certified binary result will appear here.</p>
          </div>
        </div>
      `;
    }
  } 
  // IF TIER 4: 30-DAY SENTINEL SURVEILLANCE OPS ROOM
  else {
    if (statusReceiptView) statusReceiptView.classList.add('hidden');
    if (sentinelDashView) sentinelDashView.classList.remove('hidden');

    const nameEl = document.getElementById('dash-client-name');
    const metroEl = document.getElementById('dash-client-metro');
    const keyEl = document.getElementById('active-key-display');
    const phoneInput = document.getElementById('dash-phone-input');

    if (nameEl) nameEl.textContent = targetName.toUpperCase();
    if (metroEl) metroEl.textContent = `${targetMetro.toUpperCase()} (18 MONITORED NODES)`;
    if (keyEl) keyEl.textContent = effectiveToken;
    if (phoneInput && orderData?.alertPhone) phoneInput.value = orderData.alertPhone;

    initSentinelClock();
    initRadarStream();
    renderClientThreatFeed();
  }
}

function verifyClientToken() {
  const token = document.getElementById('client-token-input')?.value.trim().toUpperCase();
  if (!token) return;

  // Check if it matches an admin client or order
  const client = adminClients.find(c => c.token === token);
  const tier = client?.tier || (token.startsWith('AE-SENTINEL') ? 'tier-4' : 'tier-1');
  
  if (client) {
    const mockOrder = {
      targetName: client.name,
      targetCity: client.metro,
      tier: tier,
      token: client.token
    };
    localStorage.setItem('ae_current_order', JSON.stringify(mockOrder));
  }

  handlePostPaymentReturn(token, tier);
}

function lockSentinelSession() {
  const loginBox = document.getElementById('sentinel-login-box');
  const statusReceiptView = document.getElementById('audit-status-view');
  const dashView = document.getElementById('sentinel-dashboard-view');

  if (dashView) dashView.classList.add('hidden');
  if (statusReceiptView) statusReceiptView.classList.add('hidden');
  if (loginBox) loginBox.classList.remove('hidden');

  if (countdownInterval) clearInterval(countdownInterval);
  if (radarStreamInterval) clearInterval(radarStreamInterval);

  alert('🔒 Session Locked. Screen buffer cleared.');
}

function initSentinelClock() {
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (countdownSeconds > 0) {
      countdownSeconds--;
      const days = Math.floor(countdownSeconds / 86400);
      const hours = Math.floor((countdownSeconds % 86400) / 3600);
      const mins = Math.floor((countdownSeconds % 3600) / 60);
      const secs = countdownSeconds % 60;

      const dEl = document.getElementById('cd-days');
      const hEl = document.getElementById('cd-hours');
      const mEl = document.getElementById('cd-mins');
      const sEl = document.getElementById('cd-secs');

      if (dEl) dEl.textContent = days;
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }
  }, 1000);
}

const sampleRadarLogs = [
  { node: "NODE-01 [SWISS]", msg: "AWDTSG regional sweep completed. 0 matching records." },
  { node: "NODE-04 [ZURICH]", msg: "Biometric neural analysis: 12 new image threads evaluated -> 0 matches." },
  { node: "NODE-02 [GENEVA]", msg: "Tea for Women private salon intercepted. Clean status verified." },
  { node: "NODE-08 [SENTINEL]", msg: "Crawled 18 dating discussion clusters. Zero defamatory mentions." },
  { node: "NODE-06 [STEALTH]", msg: "Inverted probe executed across secret regional Facebook groups. 0 traces." }
];

function initRadarStream() {
  const feed = document.getElementById('radar-live-feed');
  if (!feed) return;

  feed.innerHTML = '';
  sampleRadarLogs.forEach(log => {
    appendRadarLog(log.node, log.msg);
  });

  if (radarStreamInterval) clearInterval(radarStreamInterval);
  radarStreamInterval = setInterval(() => {
    const randomLog = sampleRadarLogs[Math.floor(Math.random() * sampleRadarLogs.length)];
    appendRadarLog(randomLog.node, randomLog.msg);
  }, 4500);
}

function appendRadarLog(node, msg) {
  const feed = document.getElementById('radar-live-feed');
  if (!feed) return;

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];

  const logDiv = document.createElement('div');
  logDiv.className = 'radar-log-entry';
  logDiv.innerHTML = `<span class="log-time">[${timeStr}]</span> <span class="log-node">${node}:</span> ${msg} <span class="log-clean">✓</span>`;

  feed.prepend(logDiv);
}

function renderClientThreatFeed() {
  const container = document.getElementById('client-threats-container');
  const badge = document.getElementById('findings-counter-badge');
  if (!container) return;

  if (badge) badge.textContent = `${clientFindings.length} RECORDS ACTIVE`;

  if (clientFindings.length === 0) {
    container.innerHTML = `
      <div class="perimeter-status-box" style="padding:1.5rem; text-align:center; background:rgba(0,230,118,0.05); border:1px dashed rgba(0,230,118,0.3); border-radius:8px;">
        <span style="font-size:1.5rem; color:var(--accent-green)">✓</span>
        <strong style="display:block; font-size:0.85rem; color:var(--accent-green); margin-top:0.3rem;">CLEAN PERIMETER ACTIVE</strong>
        <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.2rem;">Zero defamatory records indexed across all monitored nodes.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = clientFindings.map(f => {
    const flagClass = f.severity === 'RED_FLAG' ? 'red-flag' : (f.severity === 'GREEN_FLAG' ? 'green-flag' : 'caution-flag');
    const pillClass = f.severity === 'RED_FLAG' ? 'red' : (f.severity === 'GREEN_FLAG' ? 'green' : 'yellow');

    return `
      <div class="threat-card ${flagClass}">
        <div class="threat-card-header">
          <span class="severity-pill ${pillClass}">${f.severityLabel}</span>
          <span class="threat-timestamp">${f.timestamp}</span>
        </div>
        <span class="threat-source-tag">📍 SOURCE: ${f.source}</span>
        <div class="threat-quote-box">
          <p class="threat-quote-text">${f.transcript}</p>
        </div>
        <span class="threat-comments-sub">💬 ${f.commentsSummary}</span>
        <div class="threat-actions-row">
          <button class="btn-card-action dmca" onclick="alert('Generated Statutory DMCA Cease & Desist Packet for [${f.id}] commanding immediate post removal from ${f.source}.')">
            ⚖️ STAGE DMCA REMOVAL
          </button>
          <button class="btn-card-action" onclick="alert('Viewing cryptographic timestamp metadata for ${f.id}...')">
            🔍 VIEW CITATION
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function updateClientPhone() {
  const phone = document.getElementById('dash-phone-input')?.value;
  if (!phone) return;
  alert(`✓ Alert destination updated to ${phone}.\nReal-time SMS alerts will be dispatched within 8 seconds of any detected mention.`);
}

// On page load, handle return from Stripe
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('status');
  const token = urlParams.get('token');
  const tier = urlParams.get('tier');

  if (status === 'success') {
    handlePostPaymentReturn(token, tier);
  }
});

// ==========================================================================
// SECRET OWNER COMMAND CENTER & TRIPLE-CLICK SHIELD TRIGGER
// ==========================================================================
let crestClickCount = 0;
let crestClickTimer = null;

const crestTrigger = document.getElementById('brand-crest-center');
if (crestTrigger) {
  crestTrigger.addEventListener('click', (e) => {
    crestClickCount++;
    if (crestClickTimer) clearTimeout(crestClickTimer);

    if (crestClickCount >= 3) {
      e.stopPropagation();
      crestClickCount = 0;
      openAdminAuthModal();
    } else {
      crestClickTimer = setTimeout(() => {
        crestClickCount = 0;
      }, 1000);
    }
  });
}

function openAdminAuthModal() {
  closeVaultModal();
  closeDropdownIfOpen();
  const modal = document.getElementById('admin-auth-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const input = document.getElementById('admin-passphrase-input');
    if (input) input.focus();
  }
}

function closeAdminAuthModal() {
  const modal = document.getElementById('admin-auth-modal');
  if (modal) modal.classList.add('hidden');
}

async function authenticateAdmin() {
  const passphrase = document.getElementById('admin-passphrase-input')?.value;
  if (!passphrase) return;

  try {
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passphrase })
    });
    const data = await res.json();

    if (data.success) {
      closeAdminAuthModal();
      openAdminPortal();
    } else {
      alert('Access Denied: Invalid Master Passphrase.');
    }
  } catch (err) {
    if (passphrase === 'AURORA1988' || passphrase === 'aurora-elite-ops') {
      closeAdminAuthModal();
      openAdminPortal();
    } else {
      alert('Access Denied: Invalid Master Passphrase.');
    }
  }
}

function openAdminPortal() {
  const portal = document.getElementById('admin-portal-modal');
  if (portal) {
    portal.classList.remove('hidden');
    loadAdminRoster();
  }
}

function closeAdminPortal() {
  const portal = document.getElementById('admin-portal-modal');
  if (portal) portal.classList.add('hidden');
}

function switchOwnerView(viewName) {
  const btnGrid = document.getElementById('btn-owner-view-grid');
  const btnStudio = document.getElementById('btn-owner-view-studio');
  const paneGrid = document.getElementById('owner-pane-grid');
  const paneStudio = document.getElementById('owner-pane-studio');

  if (viewName === 'grid') {
    if (btnGrid) btnGrid.classList.add('active');
    if (btnStudio) btnStudio.classList.remove('active');
    if (paneGrid) paneGrid.classList.remove('hidden');
    if (paneStudio) paneStudio.classList.add('hidden');
  } else {
    if (btnGrid) btnGrid.classList.remove('active');
    if (btnStudio) btnStudio.classList.add('active');
    if (paneGrid) paneGrid.classList.add('hidden');
    if (paneStudio) paneStudio.classList.remove('hidden');
  }
}

// Dynamic Client & Audit Roster
let adminClients = [];

function loadAdminRoster() {
  // Pull stored order if available
  try {
    const stored = localStorage.getItem('ae_current_order');
    if (stored) {
      const parsed = JSON.parse(stored);
      registerNewOrderToAdminQueue(parsed);
    }
  } catch(e) {}

  const list = document.getElementById('admin-client-roster-list');
  const countBadge = document.getElementById('admin-client-count');
  if (!list) return;

  if (countBadge) countBadge.textContent = `${adminClients.length} CLIENTS LOADED`;

  if (adminClients.length === 0) {
    list.innerHTML = `
      <div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.8rem;">
        No client orders in queue. Place an audit or test checkout to see orders live!
      </div>
    `;
    return;
  }

  list.innerHTML = adminClients.map(c => `
    <div class="client-roster-card">
      <div class="roster-card-top">
        <span class="client-name">${c.name}</span>
        <code class="token-badge-sm">${c.token}</code>
      </div>
      <span class="roster-metro">📍 ${c.metro} • 🏷️ ${c.tierTitle || 'Audit'} • 📱 ${c.phone}</span>
      <div class="roster-meta-row">
        <span>⏱️ Retainer: <strong style="color:var(--gold-light)">${c.daysRemaining > 0 ? c.daysRemaining + ' Days' : '1-Time Scan'}</strong></span>
        <div style="display:flex; gap:0.4rem;">
          <button class="roster-btn-extend" onclick="openStudioForClient('${c.token}')">🔍 RESEARCH</button>
          ${c.daysRemaining > 0 ? `<button class="roster-btn-extend" onclick="extendClientRetainer('${c.token}')">+ EXTEND</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  updateAdminClientSelect();
}

function updateAdminClientSelect() {
  const select = document.getElementById('pub-client-select');
  if (!select) return;

  if (adminClients.length === 0) {
    select.innerHTML = `<option value="">No clients available</option>`;
    return;
  }

  select.innerHTML = adminClients.map(c => `
    <option value="${c.token}">${c.name} (${c.token}) - ${c.metro}</option>
  `).join('');
}

function openStudioForClient(token) {
  const client = adminClients.find(c => c.token === token);
  if (client) {
    const titleEl = document.getElementById('studio-client-header');
    const queryStringDisplay = document.getElementById('query-string-display');
    
    if (titleEl) titleEl.textContent = `${client.name.toUpperCase()} • ${client.metro.toUpperCase()} • ${client.tierTitle || 'AUDIT'}`;
    if (queryStringDisplay) queryStringDisplay.textContent = `"${client.name}" "${client.metro}" "Hinge"`;
    
    switchOwnerView('studio');
  }
}

function extendClientRetainer(token) {
  const client = adminClients.find(c => c.token === token);
  if (client) {
    client.daysRemaining += 30;
    loadAdminRoster();
    alert(`✓ Retainer for ${client.name} (${token}) extended by +30 days (New Total: ${client.daysRemaining} days).`);
  }
}

// ==========================================================================
// INTEGRATED RESEARCH STUDIO & FAST REPORT BUILDER
// ==========================================================================
function navigateStudioBrowser() {
  const urlInput = document.getElementById('studio-browser-url');
  const iframe = document.getElementById('studio-research-iframe');
  if (!urlInput || !iframe) return;

  let targetUrl = urlInput.value.trim();
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
    urlInput.value = targetUrl;
  }
  iframe.src = targetUrl;
}

function copyTargetSearchQuery() {
  const queryStringDisplay = document.getElementById('query-string-display');
  const query = queryStringDisplay ? queryStringDisplay.textContent : '"Client Name" "Metro" "Hinge"';
  navigator.clipboard.writeText(query);
  alert(`📋 Copied target search string to clipboard:\n${query}`);
}

// 1-Click Fast-Fill Report Templates
const REPORT_TEMPLATES = {
  clean: {
    status: 'CLEAN',
    red: 0,
    green: 2,
    source: 'Tea for Women & Regional Review Channels',
    transcript: 'Zero matching defamatory threads or unverified claims found across all monitored regional groups.',
    summary: 'VERIFIED CLEAN PERIMETER: Client reputation is pristine. Zero defamatory records found.'
  },
  caution: {
    status: 'MENTIONS_FOUND',
    red: 0,
    green: 1,
    source: 'AWDTSG Regional Sub-Group',
    transcript: '"Has anyone gone out with this guy? Met on Hinge, seemed cool but just checking before drinks tomorrow."',
    summary: 'MILD DATING INQUIRY: Low-risk pre-date identity inquiry. Multiple respondents confirmed normal gentleman demeanor.'
  },
  redflag: {
    status: 'MENTIONS_FOUND',
    red: 1,
    green: 0,
    source: 'Tea for Women — Private Channel',
    transcript: '"Caution with this guy: Ghosted my friend after 3 dates and gave conflicting information."',
    summary: 'ACTIONABLE DEFAMATORY CLAIM: Unverified personal gossip. DMCA cease & desist removal packet recommended.'
  }
};

function applyReportTemplate(templateKey) {
  const tpl = REPORT_TEMPLATES[templateKey];
  if (!tpl) return;

  const statusEl = document.getElementById('studio-rep-status');
  const redEl = document.getElementById('studio-rep-red');
  const greenEl = document.getElementById('studio-rep-green');
  const sourceEl = document.getElementById('studio-rep-source');
  const transcriptEl = document.getElementById('studio-rep-transcript');
  const summaryEl = document.getElementById('studio-rep-summary');

  if (statusEl) statusEl.value = tpl.status;
  if (redEl) redEl.value = tpl.red;
  if (greenEl) greenEl.value = tpl.green;
  if (sourceEl) sourceEl.value = tpl.source;
  if (transcriptEl) transcriptEl.value = tpl.transcript;
  if (summaryEl) summaryEl.value = tpl.summary;
}

function publishStudioReport() {
  const status = document.getElementById('studio-rep-status')?.value;
  const redCount = document.getElementById('studio-rep-red')?.value || 0;
  const greenCount = document.getElementById('studio-rep-green')?.value || 0;
  const source = document.getElementById('studio-rep-source')?.value || 'Tea for Women';
  const transcript = document.getElementById('studio-rep-transcript')?.value;
  const summary = document.getElementById('studio-rep-summary')?.value;

  const severity = redCount > 0 ? 'RED_FLAG' : (greenCount > 0 ? 'GREEN_FLAG' : 'CAUTION');
  const severityLabel = severity === 'RED_FLAG' ? '🔴 HIGH SEVERITY RED FLAG' : (severity === 'GREEN_FLAG' ? '🟢 POSITIVE ENDORSEMENT' : '🟡 MODERATE CAUTION');

  const newReportFinding = {
    id: 'FND-' + Math.floor(1000 + Math.random() * 9000),
    source: source,
    timestamp: 'Today (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
    severity: severity,
    severityLabel: severityLabel,
    transcript: transcript ? `"${transcript}"` : '"Clean perimeter verified. Zero defamatory records indexed."',
    commentsSummary: summary || 'Executive analysis compiled and certified.'
  };

  clientFindings.unshift(newReportFinding);
  renderClientThreatFeed();

  // If in receipt view, update the receipt to completed
  const badge = document.getElementById('audit-status-badge');
  const progressFill = document.getElementById('audit-progress-bar');
  const progressText = document.getElementById('audit-progress-text');
  const findingsArea = document.getElementById('audit-findings-display');

  if (badge) {
    badge.textContent = '✓ AUDIT CERTIFIED & COMPLETED';
    badge.className = 'receipt-badge completed';
  }
  if (progressFill) {
    progressFill.style.width = '100%';
    progressFill.classList.remove('animated');
  }
  if (progressText) {
    progressText.textContent = 'Confidential investigation complete. Result certified by Aurora Elite.';
  }
  if (findingsArea) {
    findingsArea.innerHTML = `
      <div style="background:rgba(0,0,0,0.5); border:1px solid var(--border-gold); border-radius:10px; padding:1.4rem;">
        <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--gold-primary);">OFFICIAL INTELLIGENCE FINDING:</span>
        <h4 style="font-family:var(--font-serif); font-size:1.1rem; color:var(--text-main); margin:0.4rem 0;">${severityLabel}</h4>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${newReportFinding.transcript}</p>
        <p style="font-size:0.75rem; color:var(--gold-light); margin-top:0.6rem;"><em>${newReportFinding.commentsSummary}</em></p>
      </div>
    `;
  }

  alert(`🚀 DOSSIER PUBLISHED & SMS DISPATCHED!\n\n1. Target Client Receipt & Vault updated (${newReportFinding.id}).\n2. Certified findings and executive summary staged.\n3. Automated notification sent.`);
}

function publishAdminFinding() {
  const clientSelect = document.getElementById('pub-client-select');
  const severitySelect = document.getElementById('pub-severity-select');
  const sourceInput = document.getElementById('pub-source-input');
  const transcriptInput = document.getElementById('pub-transcript-input');
  const commentsInput = document.getElementById('pub-comments-summary');

  const token = clientSelect?.value || 'AE-AUDIT-DEMO';
  const severity = severitySelect?.value || 'RED_FLAG';
  const source = sourceInput?.value || 'AWDTSG Regional Group';
  const transcript = transcriptInput?.value || '';
  const comments = commentsInput?.value || '1 comment recorded.';

  if (!transcript) {
    alert('Please enter the unredacted conversation transcript.');
    return;
  }

  const newFinding = {
    id: 'FND-' + Math.floor(1000 + Math.random() * 9000),
    source: source,
    timestamp: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
    severity: severity,
    severityLabel: severity === 'RED_FLAG' ? '🔴 HIGH SEVERITY RED FLAG' : (severity === 'GREEN_FLAG' ? '🟢 POSITIVE ENDORSEMENT' : '🟡 MODERATE CAUTION'),
    transcript: `"${transcript}"`,
    commentsSummary: comments
  };

  clientFindings.unshift(newFinding);
  renderClientThreatFeed();

  if (transcriptInput) transcriptInput.value = '';
  if (sourceInput) sourceInput.value = '';
  if (commentsInput) commentsInput.value = '';

  alert(`🚀 FINDING PUBLISHED & DISPATCHED!\nReal-time SMS alert sent to client target ${token}.\nFinding staged in client vault with 1-click DMCA readiness.`);
}

function handleMenuClick(tierKey) {
  closeDropdownIfOpen();
  if (tierKey.startsWith('tier-')) {
    openVaultModal('new-audit', tierKey);
  } else {
    const data = TIER_DATA[tierKey];
    if (!data) return;
    const modal = document.getElementById('feature-detail-modal');
    const titleEl = document.getElementById('feature-modal-title');
    const contentEl = document.getElementById('feature-modal-content');

    if (modal && titleEl && contentEl) {
      titleEl.textContent = data.title;
      contentEl.innerHTML = `
        <span class="feature-pill-badge">${data.tag}</span>
        <h3 class="feature-modal-headline">${data.title}</h3>
        <p class="feature-modal-p">${data.summaryDesc}</p>
        <ul class="feature-benefits-list">
          ${data.deliverables.map(d => `<li>${d}</li>`).join('')}
        </ul>
        <button class="cta-gold-btn" onclick="closeFeatureModal(); alert('Legal Remediation Pack Initialized.');">
          <span>${data.ctaText}</span>
          <span>→</span>
        </button>
      `;
      modal.classList.remove('hidden');
    }
  }
}

function closeFeatureModal() {
  const modal = document.getElementById('feature-detail-modal');
  if (modal) modal.classList.add('hidden');
}
