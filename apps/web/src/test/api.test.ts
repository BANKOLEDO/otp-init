import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/api';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockReset();
});

function mockJsonResponse(data: unknown, status = 200) {
  return Promise.resolve({
    ok: true,
    status,
    json: () => Promise.resolve(data),
    statusText: 'OK',
  });
}

function mockErrorResponse(detail: string, status = 400) {
  return Promise.resolve({
    ok: false,
    status,
    json: () => Promise.resolve({ detail }),
    statusText: 'Bad Request',
  });
}

describe('api service', () => {
  it('health returns status ok', async () => {
    mockFetch.mockReturnValue(mockJsonResponse({ status: 'ok' }));
    const result = await api.health();
    expect(result).toEqual({ status: 'ok' });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/health'),
      expect.any(Object)
    );
  });

  it('channels returns channel list', async () => {
    const channels = [
      { channel: 'WhatsApp', connected: true, status: 'active', last_seen: null },
    ];
    mockFetch.mockReturnValue(mockJsonResponse(channels));
    const result = await api.channels();
    expect(result).toEqual(channels);
  });

  it('connectChannel sends POST', async () => {
    mockFetch.mockReturnValue(mockJsonResponse({ channel: 'telegram', connected: true }));
    const result = await api.connectChannel('telegram');
    expect(result.connected).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/channels/telegram/connect'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('requestVerification sends correct body', async () => {
    mockFetch.mockReturnValue(mockJsonResponse({
      verification_id: 'abc',
      deep_link: 'https://wa.me/123',
      message_preview: 'VERIFY ABCDEF',
      expires_at: '2026-01-01T00:00:00Z',
    }));
    const result = await api.requestVerification('+1234567890', 'whatsapp', 300);
    expect(result.verification_id).toBe('abc');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.phone).toBe('+1234567890');
    expect(body.channel).toBe('whatsapp');
  });

  it('verifyCode sends correct body', async () => {
    mockFetch.mockReturnValue(mockJsonResponse({ verified: true, message: 'Verified' }));
    const result = await api.verifyCode('abc', '123456');
    expect(result.verified).toBe(true);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.verification_id).toBe('abc');
    expect(body.code).toBe('123456');
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockReturnValue(mockErrorResponse('Invalid', 400));
    await expect(api.health()).rejects.toThrow('Invalid');
  });
});
