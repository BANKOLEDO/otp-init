let _apiKey = '';
export const setApiKey = (k: string) => { _apiKey = k; };

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };
  if (_apiKey) headers['X-API-Key'] = _apiKey;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

export interface AdminStats {
  total_tenants: number;
  monthly_revenue: number;
  total_verifications: number;
  system_uptime_hours: number;
  verified_count: number;
}

export interface Tenant {
  id: string;
  name: string;
  plan: string;
  verifications: number;
  status: string;
  joined: string;
  revenue: number;
}

export interface BillingData {
  mrr: number;
  arr: number;
  avg_revenue_per_tenant: number;
  churn_rate: number;
  plan_distribution: { free: number; pro: number; enterprise: number };
  transactions: Array<{ id: string; tenant: string; amount: number; date: string; status: string }>;
}

export interface ChannelOverview {
  [key: string]: { instances: number; messages_today: number; success_rate: number; avg_latency: number; status: string };
}

export interface LogEntry {
  id: string;
  level: string;
  source: string;
  message: string;
  timestamp: string;
}

export interface PlatformSettings {
  platform_name: string;
  admin_email: string;
  default_ttl: number;
  max_rate_limit: number;
  webhook_secret_set: boolean;
  api_key_rotation_days: number;
  default_channel: string;
  max_concurrent: number;
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
}

export const adminApi = {
  stats: () => request<AdminStats>('/api/admin/stats'),
  tenants: () => request<Tenant[]>('/api/admin/tenants'),
  billing: () => request<BillingData>('/api/admin/billing'),
  channels: () => request<ChannelOverview>('/api/admin/channels'),
  logs: () => request<LogEntry[]>('/api/admin/logs'),
  settings: () => request<PlatformSettings>('/api/admin/settings'),
  updateSettings: (s: Partial<PlatformSettings>) => request('/api/admin/settings', { method: 'PUT', body: JSON.stringify(s) }),
  systemHealth: () => request<SystemHealth>('/api/admin/system-health'),
};
