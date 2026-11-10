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
