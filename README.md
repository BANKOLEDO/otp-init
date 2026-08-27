# otp-Init

Zero-cost, self-hosted OTP verification via WhatsApp, Telegram, and Signal. No per-message fees. Full data ownership.

## Quick Start

**Windows:**
```
git clone https://github.com/BANKOLEDO/otp-init.git
cd otp-init
setup.bat
```

**Mac / Linux:**
```
git clone https://github.com/BANKOLEDO/otp-init.git
cd otp-init
chmod +x setup.sh
./setup.sh
```

The setup script installs everything and starts the app. Your API key is printed on first run — save it somewhere safe.

## Architecture

```
otp-init/
├── apps/
│   ├── api/          # FastAPI backend (Python)
│   │   └── src/
│   │       ├── core/          # Config, database, auth, models
│   │       ├── api/           # Routes, webhooks, admin
│   │       ├── services/      # Business logic
│   │       └── adapters/      # Channel integrations
│   ├── web/          # Public web app (React + MUI)
│   └── admin/        # Admin dashboard (React + MUI)
├── packages/
│   └── sdk/          # JavaScript/TypeScript SDK
├── DESIGN.md         # Design system specification
├── setup.bat         # Windows one-click setup
└── setup.sh          # Mac/Linux one-click setup
```

### How It Works

1. **User enters phone number** on your frontend
2. **Your backend calls otp-Init API** to request a verification
3. **otp-Init generates a code** and sends it via the configured channel (WhatsApp/Telegram/Signal)
4. **User receives the code** in their messaging app and enters it
5. **Your backend verifies** the code and confirms identity

### Database

Uses SQLite by default — zero configuration, no separate database server needed. For production, swap `DATABASE_URL` to PostgreSQL:

```
DATABASE_URL=postgresql+asyncpg://user:pass@localhost/otp_init
```

## Using otp-Init in Your App

### 1. Install the SDK

```bash
npm install @otp-init/sdk
```

### 2. Initialize

```typescript
import { OtpClient } from '@otp-init/sdk';

const otp = new OtpClient({
  baseUrl: 'https://your-otp-init-server.com',
  apiKey: 'your-api-key',  // optional for public endpoints
});
```

### 3. Send a Verification

```typescript
const result = await otp.sendOtp('+14155550123', 'whatsapp');
// result.verification_id — store this
// result.deep_link — link to open Telegram/WhatsApp
// result.expires_at — when the code expires
```

### 4. Verify the Code

```typescript
const result = await otp.verifyCode(verificationId, '482916');

if (result.verified) {
  // User is confirmed
}
```

### REST API Directly

If you prefer not to use the SDK:

**Request a code:**
```bash
curl -X POST https://your-server.com/api/verification/request \
  -H "Content-Type: application/json" \
  -d '{"phone": "+14155550123", "channel": "whatsapp"}'
```

**Verify a code:**
```bash
curl -X POST https://your-server.com/api/verification/verify \
  -H "Content-Type: application/json" \
  -d '{"verification_id": "abc-123", "code": "482916"}'
```

### SDK Methods

| Method | Description |
|--------|-------------|
| `sendOtp(phone, channel, ttl?)` | Request a verification code |
| `verifyCode(verificationId, code)` | Verify submitted code |
| `channels()` | List channel status |
| `health()` | Health check |
| `recentVerifications()` | Recent verification attempts |
| `dashboardStats()` | Dashboard statistics |
| `logs()` | Audit log entries |
| `connectChannel(channel)` | Connect a messaging channel |

## API Endpoints

### Public (no auth required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/channels` | List channel status |
| POST | `/api/verification/request` | Request verification code |
| POST | `/api/verification/verify` | Verify submitted code |
### Public Dashboard (for testing/demo)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/verification/recent` | Recent verifications (masked phone numbers) |
| GET | `/api/dashboard/stats` | Live dashboard statistics |
| GET | `/api/logs` | Audit log entries |

These power the public dashboard at `/dashboard` — anyone can view live stats.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhook/telegram` | Telegram webhook (auto-configured) |

### Protected (API key required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/channels/{channel}/connect` | Connect a messaging channel |
| GET | `/api/admin/stats` | Admin statistics |
| GET | `/api/admin/channels` | Admin channel details |
| GET | `/api/admin/logs` | Admin audit logs |
| GET | `/api/admin/settings` | Get platform settings |
| PUT | `/api/admin/settings` | Update platform settings |
| GET | `/api/admin/system-health` | System health metrics |

## Configuration

Copy `apps/api/.env.example` to `apps/api/.env` and fill in:

| Variable | Description | Default |
|----------|-------------|---------|
| `API_KEY` | Your secret API key | Optional (enables auth when set) |
| `SECRET_KEY` | Application secret key | `change-me-in-production` |
| `DATABASE_URL` | Database connection string | `sqlite+aiosqlite:///./otp_init.db` |
| `OTP_LENGTH` | Code length in characters | `6` |
| `OTP_TTL` | Code expiry in seconds | `300` |
| `MAX_ATTEMPTS` | Max retries before lockout | `5` |
| `MAX_RATE_LIMIT` | Max requests per minute per IP | `5` |
| `DEFAULT_TTL` | Default verification TTL | `300` |
| `WHATSAPP_TOKEN` | WhatsApp Business API token | Optional |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token from @BotFather | Optional |
| `TELEGRAM_WEBHOOK_URL` | Public URL for Telegram webhook (e.g. ngrok URL) | Optional |
| `SIGNAL_PHONE` | Signal CLI phone number | Optional |
| `CORS_ORIGINS` | Allowed CORS origins (JSON array) | `["http://localhost:3000", "http://localhost:3001"]` |
| `WEBHOOK_SECRET` | Secret for validating incoming webhooks | `change-me-webhook-secret` |

## Channels

| Channel | Setup | Cost |
|---------|-------|------|
| **WhatsApp** | Create a Meta Business account, set up WhatsApp Business API | Free |
| **Telegram** | Create a bot via @BotFather, copy the token | Free |
| **Signal** | Install Signal CLI on your server, register an account | Free |

## Security

- Phone numbers are masked in all public responses (e.g. `+234****13824`)
- Rate limiting: 5 requests per minute per IP on `/api/verification/request`
- Webhook HMAC verification via `WEBHOOK_SECRET` for Telegram
- API key authentication on protected endpoints (`X-API-Key` header)
- OTP codes expire after configurable TTL (default 5 minutes)
- Max attempts enforced (default 5) before code is invalidated

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **Frontend:** React 19, MUI 6, Vite 6, TypeScript
- **SDK:** TypeScript, ESM + CJS
- **Monorepo:** pnpm workspaces

## License

MIT
