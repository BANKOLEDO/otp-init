export interface OtpClientOptions {
  baseUrl: string;
  apiKey?: string;
}

export interface VerificationResponse {
  verification_id: string;
  deep_link: string;
  message_preview: string;
  expires_at: string;
}

export interface VerifyCodeResponse {
  verified: boolean;
  message: string;
}

export class OtpClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(options: OtpClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.apiKey = options.apiKey;
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options?.headers as Record<string, string>) || {}),
    };
    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || `API error ${res.status}`);
    }
    return res.json();
  }

  async sendOtp(phone: string, channel: 'whatsapp' | 'telegram' | 'signal', ttl = 300): Promise<VerificationResponse> {
    return this.request<VerificationResponse>('/api/verification/request', {
      method: 'POST',
      body: JSON.stringify({ phone, channel, ttl }),
    });
  }

  async verifyCode(verificationId: string, code: string): Promise<VerifyCodeResponse> {
    return this.request<VerifyCodeResponse>('/api/verification/verify', {
      method: 'POST',
      body: JSON.stringify({ verification_id: verificationId, code }),
    });
  }

  async channels(): Promise<Array<{ channel: string; connected: boolean; status: string }>> {
    return this.request('/api/channels');
  }

  async health(): Promise<{ status: string }> {
    return this.request('/api/health');
  }

  async recentVerifications(): Promise<Array<{
    id: string;
    phone: string;
    channel: string;
    verified: boolean;
    attempts: number;
    created_at: string;
  }>> {
    return this.request('/api/verification/recent');
  }

  async dashboardStats(): Promise<{
    total_verifications: number;
    active_channels: number;
    success_rate: number;
    avg_response_time: number;
  }> {
    return this.request('/api/dashboard/stats');
  }

  async logs(): Promise<Array<{
    id: string;
    level: string;
    source: string;
    message: string;
    timestamp: string;
  }>> {
    return this.request('/api/logs');
  }

  async connectChannel(channel: string): Promise<{ channel: string; connected: boolean }> {
    return this.request(`/api/channels/${channel}/connect`, { method: 'POST' });
  }
}
