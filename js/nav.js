// ============================================================
// nav.js — Shared sidebar + topbar for all TransportPro pages
// Usage: include this script, then call: renderNav('dashboard')
// ============================================================

const NAV_ITEMS = [
  { section: 'Main' },
  { id: 'dashboard',     label: 'Dashboard',         href: 'dashboard.html',     icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },

  { section: 'Documents' },
  { id: 'lr-booking',    label: 'LR Booking',         href: 'lr-booking.html',    icon: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z' },
  { id: 'lr-list',       label: 'LR Register',        href: 'lr-list.html',       icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
  { id: 'eway-bill',     label: 'Eway Bill',          href: 'eway-bill.html',     icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z', badge: 'ewb' },
  { id: 'gate-pass',     label: 'Gate Pass',          href: 'gate-pass.html',     icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z' },
  { id: 'manifest',      label: 'Trip Manifest',      href: 'manifest.html',      icon: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z' },

  { section: 'Operations' },
  { id: 'loading',       label: 'Loading / Unloading',href: 'loading.html',       icon: 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.72V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.72c.57-.38 1-.99 1-1.71V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4l16-.01V7z' },
  { id: 'transhipment',  label: 'Transhipment',       href: 'transhipment.html',  icon: 'M17 17H7V7h10m0-2H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z' },
  { id: 'pod',           label: 'POD',                href: 'pod.html',           icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
  { id: 'claims',        label: 'Claims & Damage',    href: 'claims.html',        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' },

  { section: 'Finance' },
  { id: 'daybook',       label: 'Daybook',            href: 'daybook.html',       icon: 'M7 11h2v2H7v-2zm0 4h2v2H7v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zM5 22h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2zm0-16h14v2H5V6z' },
  { id: 'lorry-hire',    label: 'Lorry Hire',         href: 'lorry-hire.html',    icon: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' },
  { id: 'trip-costing',  label: 'Trip Costing',       href: 'trip-costing.html',  icon: 'M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5V2.05z' },
  { id: 'invoice',       label: 'Freight Invoice',    href: 'invoice.html',       icon: 'M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z' },
  { id: 'receipt',       label: 'Money Receipt',      href: 'receipt.html',       icon: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' },
  { id: 'party-ledger',  label: 'Party Ledger',       href: 'party-ledger.html',  icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
  { id: 'tbb-billing',   label: 'TBB Monthly Bill',   href: 'tbb-billing.html',   icon: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z' },
  { id: 'credit-debit',  label: 'Credit / Debit Note',href: 'credit-debit.html',  icon: 'M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.51 15.5 0 12.35 0c-1.7 0-3.23.76-4.29 1.97L7 3 5.94 1.97C4.88.76 3.35 0 1.65 0h-.01C-1.5 0-4 2.51-4 5.65c0 .47.11.91.18 1.35H-4v2h24V6z' },

  { section: 'Fleet' },
  { id: 'vehicles',      label: 'Vehicles',           href: 'vehicles.html',      icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z', badge: 'doc' },
  { id: 'drivers',       label: 'Drivers',            href: 'drivers.html',       icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { id: 'maintenance',   label: 'Maintenance',        href: 'maintenance.html',   icon: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
  { id: 'fuel',          label: 'Fuel Log',           href: 'fuel.html',          icon: 'M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77z' },
  { id: 'fastag',        label: 'FASTag / Toll',      href: 'fastag.html',        icon: 'M3 17h18v2H3zm0-7h18v2H3zm0-7h18v2H3z' },

  { section: 'Reports' },
  { id: 'reports-daily', label: 'Daily Reports',      href: 'reports-daily.html', icon: 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z' },
  { id: 'reports-mis',   label: 'MIS Reports',        href: 'reports-mis.html',   icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z' },
  { id: 'reports-gst',   label: 'GST Reports',        href: 'reports-gst.html',   icon: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2z' },
  { id: 'reports-pl',    label: 'P&L / Branch',       href: 'reports-pl.html',    icon: 'M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z' },

  { section: 'Master & Setup' },
  { id: 'parties',       label: 'Parties',            href: 'parties.html',       icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { id: 'settings',      label: 'Settings',           href: 'settings.html',      icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58z' },
];

function renderNav(activeId, companyName, branchName, userName, userRole, fyLabel) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  let html = `
  <div class="sb-brand">
    <div class="sb-icon"><svg viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg></div>
    <div class="sb-brand-text"><h2>TransportPro</h2><p id="sb-co">${companyName||'Loading...'}</p></div>
  </div>`;

  NAV_ITEMS.forEach(item => {
    if (item.section) {
      html += `<div class="sb-section">${item.section}</div>`;
      return;
    }
    const isActive = item.id === activeId;
    html += `<a class="sb-item${isActive?' active':''}" href="${item.href}">
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="${item.icon}"/></svg>
      <span>${item.label}</span>
      ${item.badge ? `<span class="sb-badge" id="badge-${item.badge}" style="display:none">0</span>` : ''}
    </a>`;
  });

  html += `
  <div class="sb-footer">
    <div class="sb-user" onclick="signOut()">
      <div class="sb-avatar">${(userName||'U')[0].toUpperCase()}</div>
      <div class="sb-user-info"><p>${userName||'—'}</p><span>${(userRole||'').replace(/_/g,' ').toUpperCase()}</span></div>
    </div>
  </div>`;

  sidebar.innerHTML = html;

  // Topbar badges
  const tb = document.getElementById('tb-fy');
  const tb2 = document.getElementById('tb-branch');
  if (tb && fyLabel) tb.textContent = 'FY ' + fyLabel;
  if (tb2 && branchName) tb2.textContent = branchName;
}

// Shared CSS injected once
(function injectNavCSS() {
  if (document.getElementById('nav-css')) return;
  const s = document.createElement('style');
  s.id = 'nav-css';
  s.textContent = `
  #sidebar{width:220px;background:var(--navy-mid);border-right:1px solid var(--border);position:fixed;top:0;left:0;bottom:0;overflow-y:auto;z-index:100;display:flex;flex-direction:column;font-family:'DM Sans',sans-serif}
  .sb-brand{padding:16px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;flex-shrink:0}
  .sb-icon{width:32px;height:32px;background:var(--saffron);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .sb-brand-text h2{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:var(--text)}
  .sb-brand-text p{font-size:10px;color:var(--text-muted);margin-top:1px}
  .sb-section{padding:12px 12px 2px;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:1.1px;color:var(--text-dim)}
  .sb-item{display:flex;align-items:center;gap:9px;padding:7px 10px;margin:1px 6px;border-radius:7px;font-size:12.5px;color:var(--text-muted);cursor:pointer;text-decoration:none;transition:all .14s;white-space:nowrap;overflow:hidden}
  .sb-item:hover{background:var(--navy-hover);color:var(--text)}
  .sb-item.active{background:var(--saffron-light);color:var(--saffron)}
  .sb-item svg{flex-shrink:0}
  .sb-item span:first-of-type{flex:1;overflow:hidden;text-overflow:ellipsis}
  .sb-badge{margin-left:auto;background:var(--danger);color:white;font-size:9px;font-weight:700;padding:1px 5px;border-radius:10px;flex-shrink:0}
  .sb-footer{margin-top:auto;padding:10px;border-top:1px solid var(--border);flex-shrink:0}
  .sb-user{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:7px;cursor:pointer;transition:background .14s}
  .sb-user:hover{background:var(--navy-hover)}
  .sb-avatar{width:28px;height:28px;background:var(--saffron);border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;color:white;flex-shrink:0}
  .sb-user-info p{font-size:12px;font-weight:500;color:var(--text)}
  .sb-user-info span{font-size:10px;color:var(--text-muted)}
  `;
  document.head.appendChild(s);
})();
