import { describe, it, before } from 'node:test';
import assert from 'node:assert';

const API = process.env.API_URL || 'http://localhost:8000';

describe('otp-init API', () => {
  it('health check', async () => {
    const res = await fetch(`${API}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'ok');
  });

  it('list channels', async () => {
    const res = await fetch(`${API}/api/channels`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
  });

  it('request verification + verify', async () => {
    const res = await fetch(`${API}/api/verification/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '+19999999999', channel: 'telegram' }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.verification_id);
    assert.ok(data.deep_link);
    assert.ok(data.expires_at);

    const verifyRes = await fetch(`${API}/api/verification/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verification_id: data.verification_id, code: '000000' }),
    });
    assert.strictEqual(verifyRes.status, 200);
    const verifyData = await verifyRes.json();
    assert.strictEqual(verifyData.verified, false);
  });

  it('recent verifications', async () => {
    const res = await fetch(`${API}/api/verification/recent`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
  });

  it('dashboard stats', async () => {
    const res = await fetch(`${API}/api/dashboard/stats`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok('total_verifications' in data);
    assert.ok('active_channels' in data);
    assert.ok('success_rate' in data);
    assert.ok('avg_response_time' in data);
  });

  it('logs', async () => {
    const res = await fetch(`${API}/api/logs`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
  });
});
