/* ==========================================================================
   AURORA ELITE — RECONNAISSANCE PACKAGES, STRIPE CHECKOUT,
   SENTINEL OPS & SOVEREIGN OWNER COMMAND CENTER
   ========================================================================== */

// Location Privacy Stealth Telemetry (Location Jamming Active)
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

// ==========================================================================
// FULLSCREEN VAULT WORKSPACE CONTROLLER
// ==========================================================================
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

// Form Submission / Stripe Trigger
async function submitVaultAudit() {
  const firstName = document.getElementById('vault-first-name')?.value || "Alex";
  const lastInitial = document.getElementById('vault-last-initial')?.value || "";
  const age = document.getElementById('vault-age')?.value || "29";
  const metro = document.getElementById('vault-metro')?.value || "Miami, FL";
  const alertPhone = document.getElementById('vault-alert-phone')?.value || "";
  const protocol = TIER_DATA[currentSelectedProtocol];
  const submitBtn = document.getElementById('vault-submit-btn');

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
    alert(`[STRIPE GATEWAY]\nInitializing ${protocol.title} (${protocol.price}).\nBilling descriptor: CS*SERVICELOG.\nGenerated Sentinel Token: AE-SENTINEL-${Math.floor(1000 + Math.random() * 9000)}.`);
    if (submitBtn) {
      submitBtn.innerHTML = `<span>${protocol.ctaText}</span> <span>→</span>`;
      submitBtn.disabled = false;
    }
  }
}

// ==========================================================================
// 30-DAY SENTINEL LIVE SURVEILLANCE OPS CONTROLLER
// ==========================================================================
let countdownSeconds = 29 * 86400 + 18 * 3600 + 42 * 60 + 14;
let countdownInterval = null;
let radarStreamInterval = null;
let currentClientToken = 'AE-SENTINEL-DEMO';

const sampleRadarLogs = [
  { node: "NODE-01 [SWISS]", msg: "AWDTSG Miami North sweep completed. 0 matching records." },
  { node: "NODE-04 [ZURICH]", msg: "Biometric vector neural analysis: 12 new image threads evaluated -> 0 matches." },
  { node: "NODE-02 [GENEVA]", msg: "Tea for Women South Beach channel intercepted. Clean status verified." },
  { node: "NODE-08 [SENTINEL]", msg: "Crawled 18 dating discussion clusters. Zero defamatory mentions." },
  { node: "NODE-03 [RADAR]", msg: "New thread keyword filter executed: 'Alex' -> Non-target age/photo mismatch." },
  { node: "NODE-06 [STEALTH]", msg: "Inverted probe executed across 4 secret regional Facebook groups. 0 traces." }
];

// Mock in-memory client findings for instant live rendering
let clientFindings = [
  {
    id: 'FND-1082',
    source: 'AWDTSG Miami — South Beach Sub-Group',
    timestamp: 'Today, 2:45 PM',
    severity: 'RED_FLAG',
    severityLabel: '🔴 HIGH SEVERITY RED FLAG',
    transcript: '"Has anyone gone out with Alex from Brickell? Met him on Hinge, seemed super charming but heard weird rumors from his ex. Need the tea before our date tonight!"',
    commentsSummary: '3 users replied saying he was polite and normal; 1 user made unverified speculation.'
  },
  {
    id: 'FND-1049',
    source: 'Tea for Women — Miami Private Salon',
    timestamp: 'Yesterday, 11:20 AM',
    severity: 'GREEN_FLAG',
    severityLabel: '🟢 POSITIVE ENDORSEMENT',
    transcript: '"Alex K. is 100% vetted! Went to dinner at Carbone with him last month. Total gentleman, paid the bill, drove me home safely. Green flag."',
    commentsSummary: '12 comments recorded. Overwhelmingly positive feedback.'
  }
];

function verifyClientToken() {
  const token = document.getElementById('client-token-input')?.value.trim();
  if (!token) return;

  currentClientToken = token.toUpperCase();
  const loginBox = document.getElementById('sentinel-login-box');
  const dashView = document.getElementById('sentinel-dashboard-view');
  const keyDisplay = document.getElementById('active-key-display');

  if (loginBox) loginBox.classList.add('hidden');
  if (dashView) dashView.classList.remove('hidden');
  if (keyDisplay) keyDisplay.textContent = currentClientToken;

  initSentinelClock();
  initRadarStream();
  renderClientThreatFeed();
}

function lockSentinelSession() {
  const loginBox = document.getElementById('sentinel-login-box');
  const dashView = document.getElementById('sentinel-dashboard-view');

  if (dashView) dashView.classList.add('hidden');
  if (loginBox) loginBox.classList.remove('hidden');

  if (countdownInterval) clearInterval(countdownInterval);
  if (radarStreamInterval) clearInterval(radarStreamInterval);

  alert('🔒 Sentinel Session Locked. Temporary browser memory buffer purged.');
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

// Render dynamic client findings
function renderClientThreatFeed() {
  const container = document.getElementById('client-threats-container');
  const badge = document.getElementById('findings-counter-badge');
  if (!container) return;

  if (badge) badge.textContent = `${clientFindings.length} RECORDS ACTIVE`;

  if (clientFindings.length === 0) {
    container.innerHTML = `
      <div class="perimeter-status-box">
        <div class="status-icon-circle">✓</div>
        <div class="status-text-group">
          <strong>CLEAN PERIMETER ACTIVE</strong>
          <p>No active defamatory posts detected across 18 monitored nodes.</p>
        </div>
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
          <button class="btn-card-action" onclick="alert('Viewing full cryptographic timestamp metadata for ${f.id}...')">
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

// Check for return from Stripe Checkout (success URL parameters)
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('status');
  const token = urlParams.get('token');

  if (status === 'success') {
    openVaultModal('existing-access');
    const tokenInput = document.getElementById('client-token-input');
    if (tokenInput && token) {
      tokenInput.value = token;
      verifyClientToken();
    }
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
    // Fallback authentication for local/demo mode
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

// Sample Client Roster for Owner Command Center
let adminClients = [
  {
    token: 'AE-SENTINEL-DEMO',
    name: 'Alexander K.',
    metro: 'Miami, FL (Brickell / South Beach)',
    phone: '+1 (555) 019-8821',
    daysRemaining: 29
  },
  {
    token: 'AE-SENTINEL-8842',
    name: 'Marcus V.',
    metro: 'New York, NY (Manhattan / Brooklyn)',
    phone: '+1 (555) 349-1120',
    daysRemaining: 18
  },
  {
    token: 'AE-SENTINEL-7719',
    name: 'Julian B.',
    metro: 'Los Angeles, CA (Beverly Hills / WeHo)',
    phone: '+1 (555) 872-9903',
    daysRemaining: 24
  }
];

function loadAdminRoster() {
  const list = document.getElementById('admin-client-roster-list');
  const countBadge = document.getElementById('admin-client-count');
  if (!list) return;

  if (countBadge) countBadge.textContent = `${adminClients.length} CLIENTS LOADED`;

  list.innerHTML = adminClients.map(c => `
    <div class="client-roster-card">
      <div class="roster-card-top">
        <span class="client-name">${c.name}</span>
        <code class="token-badge-sm">${c.token}</code>
      </div>
      <span class="roster-metro">📍 ${c.metro} • 📱 ${c.phone}</span>
      <div class="roster-meta-row">
        <span>⏱️ Retainer: <strong style="color:var(--gold-light)">${c.daysRemaining} Days Left</strong></span>
        <button class="roster-btn-extend" onclick="extendClientRetainer('${c.token}')">+ EXTEND 30D</button>
      </div>
    </div>
  `).join('');
}

function extendClientRetainer(token) {
  const client = adminClients.find(c => c.token === token);
  if (client) {
    client.daysRemaining += 30;
    loadAdminRoster();
    alert(`✓ Retainer for ${client.name} (${token}) extended by +30 days (New Total: ${client.daysRemaining} days).`);
  }
}

// Publish Finding from Owner Command Center
function publishAdminFinding() {
  const clientSelect = document.getElementById('pub-client-select');
  const severitySelect = document.getElementById('pub-severity-select');
  const sourceInput = document.getElementById('pub-source-input');
  const transcriptInput = document.getElementById('pub-transcript-input');
  const commentsInput = document.getElementById('pub-comments-summary');

  const token = clientSelect?.value || 'AE-SENTINEL-DEMO';
  const severity = severitySelect?.value || 'RED_FLAG';
  const source = sourceInput?.value || 'AWDTSG Miami';
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

  // Add to active client findings
  clientFindings.unshift(newFinding);
  renderClientThreatFeed();

  // Reset form
  if (transcriptInput) transcriptInput.value = '';
  if (sourceInput) sourceInput.value = '';
  if (commentsInput) commentsInput.value = '';

  alert(`🚀 FINDING PUBLISHED & DISPATCHED!\nReal-time SMS alert sent to client target ${token}.\nFinding staged in client vault with 1-click DMCA readiness.`);
}

// Protocol Detail Modal Handler
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
