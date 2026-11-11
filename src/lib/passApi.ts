/**
 * Client API for Operation Sindoor Cricket Cup Free Match Passes
 */

export interface PassRegistrationPayload {
  name: string;
  phone: string;
  email: string;
  city?: string;
  institution?: string;
  quantity: number; // 1 or 2
  guest_name?: string;
  source?: string; // e.g. 'Facebook Ad', 'Instagram Ad', 'Direct'
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  fbclid?: string;
  referrer?: string;
}

export interface TournamentPassData {
  id: number;
  pass_code: string;
  name: string;
  phone: string;
  email: string;
  city?: string | null;
  institution?: string | null;
  quantity: number;
  guest_name?: string | null;
  match_access: string;
  gate_allotment: string;
  venue?: string;
  is_checked_in?: boolean;
  checked_in_at?: string | null;
  gate_scanned?: string | null;
  created_at?: string;
  email_sent?: boolean;
}

export interface VerifyResult {
  status: 'success' | 'already_used' | 'invalid' | 'blocked' | 'error';
  message: string;
  admitted?: boolean;
  checked_in_at?: string;
  gate_scanned?: string;
  data?: TournamentPassData;
}

/**
 * Determine the API endpoint base URL.
 * Supports production, standard Laravel artisan serve (port 8000), and local MAMP (port 8888).
 */
export function getApiBaseUrl(): string {
  // If explicitly configured in environment
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }

  // Client-side detection for localhost development
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
      // Point to local MAMP Laravel endpoint
      return 'http://localhost:8888/sarvsewabharat-api/public/index.php/api';
    }
  }

  // Default fallback production endpoint
  return 'https://sarvsewabharat.org/api/api';
}

/**
 * Register for a free digital match pass.
 */
export async function registerPass(payload: PassRegistrationPayload): Promise<TournamentPassData> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/tournament/passes/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json();

  if (!res.ok || json.status === 'error') {
    throw new Error(json.message || 'Failed to generate match pass.');
  }

  return json.data;
}

/**
 * Verify / admit a pass at stadium entry gate.
 */
export async function verifyPass(
  passCode: string,
  pin: string,
  action: 'check' | 'admit' = 'check',
  gateName: string = 'Gate'
): Promise<VerifyResult> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/tournament/passes/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      pass_code: passCode,
      pin,
      action,
      gate_name: gateName,
    }),
  });

  const json = await res.json();
  return json;
}

/**
 * Detect ad attribution from URL search params & referrer.
 * Supports Facebook Ads, Instagram Ads, Meta Ads (fbclid), and custom UTM parameters.
 */
export interface AdAttribution {
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  fbclid?: string;
  referrer?: string;
}

export function detectAdAttribution(): AdAttribution {
  if (typeof window === 'undefined') {
    return { source: 'Direct / Organic' };
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || '';
    const utmMedium = params.get('utm_medium') || '';
    const utmCampaign = params.get('utm_campaign') || '';
    const utmContent = params.get('utm_content') || '';
    const fbclid = params.get('fbclid') || '';
    const referrer = typeof document !== 'undefined' ? document.referrer : '';

    let source = 'Direct / Organic';

    const lowerUtm = utmSource.toLowerCase();
    const lowerRef = referrer.toLowerCase();

    if (lowerUtm.includes('instagram') || lowerUtm === 'ig' || lowerRef.includes('instagram.com')) {
      source = 'Instagram Ad';
    } else if (lowerUtm.includes('facebook') || lowerUtm === 'fb' || lowerRef.includes('facebook.com')) {
      source = 'Facebook Ad';
    } else if (fbclid) {
      // Meta auto-attaches fbclid to clicks from both Facebook & Instagram
      source = lowerRef.includes('instagram') ? 'Instagram Ad' : 'Facebook Ad';
    } else if (utmSource) {
      source = `${utmSource} Ad`;
    }

    const attribution: AdAttribution = {
      source,
      utm_source: utmSource || undefined,
      utm_medium: utmMedium || undefined,
      utm_campaign: utmCampaign || undefined,
      utm_content: utmContent || undefined,
      fbclid: fbclid || undefined,
      referrer: referrer || undefined,
    };

    // Cache in sessionStorage & localStorage so attribution survives reloads/navigation
    if (utmSource || fbclid || referrer) {
      try {
        sessionStorage.setItem('ops_pass_ad_attribution', JSON.stringify(attribution));
        localStorage.setItem('ops_pass_ad_attribution', JSON.stringify(attribution));
      } catch {}
    }

    return attribution;
  } catch {
    return { source: 'Direct / Organic' };
  }
}

/**
 * Retrieve cached ad attribution or re-detect.
 */
export function getSavedAdAttribution(): AdAttribution {
  if (typeof window === 'undefined') return { source: 'Direct / Organic' };
  try {
    const cachedSession = sessionStorage.getItem('ops_pass_ad_attribution');
    if (cachedSession) return JSON.parse(cachedSession);
    const cachedLocal = localStorage.getItem('ops_pass_ad_attribution');
    if (cachedLocal) return JSON.parse(cachedLocal);
  } catch {}
  return detectAdAttribution();
}

/**
 * Record a pass registration in client-side analytics ledger.
 */
export function recordPassRegistrationLocally(pass: TournamentPassData, attribution: AdAttribution) {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem('ops_pass_ad_records') || '[]');
    const record = {
      pass_code: pass.pass_code,
      name: pass.name,
      phone: pass.phone,
      quantity: pass.quantity,
      source: attribution.source || 'Direct / Organic',
      utm_source: attribution.utm_source || '',
      utm_medium: attribution.utm_medium || '',
      utm_campaign: attribution.utm_campaign || '',
      fbclid: attribution.fbclid ? 'present' : '',
      timestamp: new Date().toISOString(),
    };
    existing.unshift(record);
    localStorage.setItem('ops_pass_ad_records', JSON.stringify(existing.slice(0, 500)));
  } catch (err) {
    console.error('Failed to log pass attribution locally:', err);
  }
}

/**
 * Fetch local ad attribution analytics summary.
 */
export function getLocalAdStats(): {
  total: number;
  facebook: number;
  instagram: number;
  direct: number;
  records: Array<any>;
} {
  if (typeof window === 'undefined') {
    return { total: 0, facebook: 0, instagram: 0, direct: 0, records: [] };
  }
  try {
    const records = JSON.parse(localStorage.getItem('ops_pass_ad_records') || '[]');
    let facebook = 0;
    let instagram = 0;
    let direct = 0;

    records.forEach((r: any) => {
      const src = (r.source || '').toLowerCase();
      if (src.includes('facebook') || src.includes('meta')) {
        facebook++;
      } else if (src.includes('instagram')) {
        instagram++;
      } else {
        direct++;
      }
    });

    return {
      total: records.length,
      facebook,
      instagram,
      direct,
      records,
    };
  } catch {
    return { total: 0, facebook: 0, instagram: 0, direct: 0, records: [] };
  }
}

/**
 * Fetch live gate statistics.
 */
export async function getGateStats(): Promise<{
  total_passes: number;
  total_attendees: number;
  admitted_passes: number;
  admitted_attendees: number;
  remaining_attendees: number;
} | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/tournament/passes/stats`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error('Failed to load pass stats', err);
    return null;
  }
}
