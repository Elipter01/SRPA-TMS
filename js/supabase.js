// ============================================================
// supabase.js — Supabase client + helpers
// Replace SUPABASE_URL and SUPABASE_ANON_KEY with your values
// from: https://supabase.com/dashboard → Project Settings → API
// ============================================================

const SUPABASE_URL = 'https://knpvlfavhyrfrtyviszb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_osMtPX0scnsbBqQObi-Xdw_T4jkqWkL';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Auth helpers ──────────────────────────────────────────

async function getCurrentUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  const { data } = await db.from('user_profiles').select('*, branches(*)').eq('id', user.id).single();
  return data;
}

async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) { window.location.href = '/index.html'; return null; }
  return user;
}

async function signOut() {
  await db.auth.signOut();
  window.location.href = '/index.html';
}

// ── Session / profile cache ───────────────────────────────

let _profile = null;

async function getProfile() {
  if (_profile) return _profile;
  _profile = await getCurrentProfile();
  return _profile;
}

function isSuperAdmin(profile) {
  return profile?.role === 'super_admin';
}

function canAccessBranch(profile, branchId) {
  return isSuperAdmin(profile) || profile?.branch_id === branchId;
}

// ── Active FY helper ──────────────────────────────────────

async function getActiveFY(companyId) {
  const { data } = await db.from('financial_years')
    .select('*')
    .eq('company_id', companyId)
    .eq('is_active', true)
    .single();
  return data;
}

// ── Number generation ─────────────────────────────────────

async function getNextNumber(companyId, fyId, branchId, seriesType) {
  const { data, error } = await db.rpc('get_next_number', {
    p_company_id: companyId,
    p_fy_id: fyId,
    p_branch_id: branchId,
    p_series_type: seriesType
  });
  if (error) throw error;
  return data;
}

// ── EWB Expiry helpers ────────────────────────────────────

function ewbStatus(expiryStr) {
  if (!expiryStr) return null;
  const expiry = new Date(expiryStr);
  const now = new Date();
  const diffHrs = (expiry - now) / 36e5;
  if (diffHrs < 0)   return { label: 'EXPIRED',   color: 'danger',  hrs: diffHrs };
  if (diffHrs < 4)   return { label: '< 4 HRS',   color: 'danger',  hrs: diffHrs };
  if (diffHrs < 24)  return { label: '< 24 HRS',  color: 'warning', hrs: diffHrs };
  if (diffHrs < 72)  return { label: '< 3 DAYS',  color: 'info',    hrs: diffHrs };
  return { label: 'ACTIVE', color: 'success', hrs: diffHrs };
}

function docExpiryStatus(dateStr) {
  if (!dateStr) return null;
  const expiry = new Date(dateStr);
  const now = new Date();
  const diffDays = (expiry - now) / 864e5;
  if (diffDays < 0)   return { label: 'EXPIRED',    color: 'danger'  };
  if (diffDays < 7)   return { label: '< 7 DAYS',   color: 'danger'  };
  if (diffDays < 15)  return { label: '< 15 DAYS',  color: 'warning' };
  if (diffDays < 30)  return { label: '< 30 DAYS',  color: 'info'    };
  return { label: 'VALID', color: 'success' };
}

// ── Format helpers ────────────────────────────────────────

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

function fmtMoney(n) {
  if (n == null) return '—';
  return '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });
}

function fmtWeight(n) {
  if (n == null) return '—';
  return Number(n).toLocaleString('en-IN', { minimumFractionDigits: 3 }) + ' kg';
}

function today() {
  return new Date().toISOString().slice(0,10);
}
