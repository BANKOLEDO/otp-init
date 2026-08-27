const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

export interface ChannelStatus {
  channel: string;
  connected: boolean;
  status: string;
  last_seen: string | null;
}

export interface DashboardStats {
  total_verifications: number;
  active_channels: number;
  success_rate: number;
  avg_response_time: number;
}

export interface VerificationResponse {
  verification_id: string;
  deep_link: string;
  message_preview: string;
  expires_at: string;
  delivery_status: 'sent' | 'manual_action_required';
}

export interface VerifyCodeResponse {
  verified: boolean;
  message: string;
}

export interface RecentVerification {
  id: string;
  phone: string;
  channel: string;
  verified: boolean;
  attempts: number;
  created_at: string;
}

export interface LogEntry {
  id: string;
  level: string;
  message: string;
  timestamp: string;
}

export const api = {
  health: () => request<{ status: string }>('/api/health'),

  channels: () => request<ChannelStatus[]>('/api/channels'),

  connectChannel: (channel: string) =>
    request<{ channel: string; connected: boolean }>(`/api/channels/${channel}/connect`, { method: 'POST' }),

  requestVerification: (phone: string, channel: string, ttl = 300) =>
    request<VerificationResponse>('/api/verification/request', {
      method: 'POST',
      body: JSON.stringify({ phone, channel, ttl }),
    }),

  verifyCode: (verificationId: string, code: string) =>
    request<VerifyCodeResponse>('/api/verification/verify', {
      method: 'POST',
      body: JSON.stringify({ verification_id: verificationId, code }),
    }),

  recentVerifications: () => request<RecentVerification[]>('/api/verification/recent'),

  dashboardStats: () => request<DashboardStats>('/api/dashboard/stats'),

  logs: () => request<LogEntry[]>('/api/logs'),
};
