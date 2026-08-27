import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import ContentCopy from '@mui/icons-material/ContentCopy';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ArrowForward from '@mui/icons-material/ArrowForward';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import { Link as RouterLink } from 'react-router-dom';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'quickstart', label: 'Quick Start' },
  { id: 'api', label: 'API Reference' },
  { id: 'channels', label: 'Channels' },
  { id: 'sdk', label: 'SDK' },
  { id: 'config', label: 'Configuration' },
];

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', mb: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, py: 1.25, bgcolor: '#1e1e2e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ff5f57' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#febc2e' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#28c840' }} />
          {filename && <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500, fontFamily: 'monospace', ml: 1 }}>{filename}</Typography>}
        </Box>
        <IconButton size="small" onClick={handleCopy} sx={{ color: 'rgba(255,255,255,0.3)' }}>
          {copied ? <CheckCircle sx={{ fontSize: 14, color: '#28c840' }} /> : <ContentCopy sx={{ fontSize: 14 }} />}
        </IconButton>
      </Stack>
      <Box sx={{ bgcolor: '#1e1e2e', px: 3, py: 2, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '0.82rem', lineHeight: 1.9, overflowX: 'auto', color: '#abb2bf', whiteSpace: 'pre' }}>
        {code}
      </Box>
    </Box>
  );
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    GET: { bg: 'rgba(37,211,102,0.1)', color: '#25d366' },
    POST: { bg: 'rgba(232,89,12,0.1)', color: '#e8590c' },
  };
  const c = colors[method] || colors.GET;
  return (
    <Chip label={method} size="small" sx={{ bgcolor: c.bg, color: c.color, fontWeight: 600, fontSize: 10, height: 22, fontFamily: 'monospace', borderRadius: 1 }} />
  );
}

export function Docs() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const subtleText = theme.palette.text.secondary;

  const dot = isDark
    ? 'radial-gradient(circle, rgba(238,237,232,0.15) 1px, transparent 1px)'
    : 'radial-gradient(circle, rgba(26,24,22,0.15) 1px, transparent 1px)';

  return (
    <Box sx={{ backgroundImage: dot, backgroundSize: '20px 20px', bgcolor: isDark ? '#0e0e0e' : '#ffffff', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Sidebar */}
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 88 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 2, fontSize: 13 }}>Documentation</Typography>
              {sections.map((s) => (
                <Box key={s.id} component="a" href={`#${s.id}`} sx={{ display: 'block', py: 0.75, fontSize: 13, color: subtleText, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  {s.label}
                </Box>
              ))}
              <Box sx={{ mt: 4, p: 2.5, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 500, fontSize: 13, mb: 1 }}>Ready to build?</Typography>
                <Typography sx={{ fontSize: 12, color: subtleText, mb: 2, lineHeight: 1.6 }}>Deploy otp-Init in under 30 minutes.</Typography>
                <Box component={RouterLink} to="/verify" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 13, fontWeight: 500, color: 'primary.main', textDecoration: 'none' }}>
                  Get started <ArrowForward sx={{ fontSize: 14 }} />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Content */}
          <Grid item xs={12} md={9}>
            {/* Overview */}
            <Box id="overview" sx={{ mb: 8 }}>
              <Chip label="Docs" size="small" sx={{ mb: 2, borderRadius: 999, border: '1px solid', borderColor: 'divider', fontWeight: 500, fontSize: 11, bgcolor: 'transparent' }} />
              <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.1, mb: 2 }}>
                otp-Init Documentation
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', color: subtleText, lineHeight: 1.7, maxWidth: 580, mb: 4 }}>
                Self-hosted OTP verification over WhatsApp, Telegram, and more. Zero per-message fees. Full data ownership.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Box component={RouterLink} to="/verify" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 3, py: 1.25, borderRadius: 999, bgcolor: 'primary.main', color: '#fff', fontSize: 14, fontWeight: 500, textDecoration: 'none', '&:hover': { opacity: 0.9 } }}>
                  <RocketLaunch sx={{ fontSize: 16 }} /> Try it live
                </Box>
                <Box component="a" href="#quickstart" sx={{ display: 'inline-flex', alignItems: 'center', px: 3, py: 1.25, borderRadius: 999, border: '1px solid', borderColor: 'divider', fontSize: 14, fontWeight: 500, textDecoration: 'none', color: 'text.primary', '&:hover': { borderColor: 'primary.main' } }}>
                  Quick start
                </Box>
              </Stack>
            </Box>

            {/* Quick Start */}
            <Box id="quickstart" sx={{ mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.025em', mb: 1 }}>Quick Start</Typography>
              <Typography sx={{ fontSize: '0.95rem', color: subtleText, lineHeight: 1.7, mb: 3 }}>Deploy and integrate in under 30 minutes.</Typography>

              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1 }}>1. Clone and run</Typography>
              <Typography sx={{ fontSize: '0.88rem', color: subtleText, lineHeight: 1.6, mb: 1.5 }}>The setup script installs Node.js, Python, and all dependencies. Your API key is generated automatically.</Typography>
              <CodeBlock filename="terminal" code={`git clone https://github.com/BANKOLEDO/otp-init.git
cd otp-init
./setup.sh     # Windows: setup.bat`} />

              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1 }}>2. Connect a channel</Typography>
              <Typography sx={{ fontSize: '0.88rem', color: subtleText, lineHeight: 1.6, mb: 1.5 }}>Add your messaging token to <Box component="code" sx={{ px: 0.5, py: 0.25, borderRadius: 1, bgcolor: 'action.hover', fontSize: 12 }}>apps/api/.env</Box>. At least one channel is required.</Typography>
              <CodeBlock filename=".env" code={`# Pick one:
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
WHATSAPP_TOKEN=your-whatsapp-business-token
SIGNAL_PHONE=+2348012345678
SIGNAL_CLI_PATH=signal-cli
SIGNAL_CLI_TIMEOUT=30`} />

              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1 }}>3. Install the SDK in your app</Typography>
              <CodeBlock filename="terminal" code="npm install @otp-init/sdk" />

              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1 }}>4. Initialize and send</Typography>
              <CodeBlock filename="index.ts" code={`import { OtpClient } from '@otp-init/sdk';

const otp = new OtpClient({
  baseUrl: 'http://localhost:8000',
  apiKey: 'your-api-key',  // from .env
});

// Request a verification
const { verification_id } = await otp.sendOtp('+14155550123', 'whatsapp');

// Verify the code
const result = await otp.verifyCode(verification_id, '482916');

if (result.verified) {
  // Proceed with authenticated session
}`} />
            </Box>

            {/* API Reference */}
            <Box id="api" sx={{ mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.025em', mb: 1 }}>API Reference</Typography>
              <Typography sx={{ fontSize: '0.95rem', color: subtleText, lineHeight: 1.7, mb: 3 }}>REST API endpoints. Base URL: <Box component="code" sx={{ px: 0.75, py: 0.25, borderRadius: 1, bgcolor: 'action.hover', fontSize: 13 }}>https://your-domain.com/api</Box></Typography>

              {/* Health */}
              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MethodBadge method="GET" /> /health
              </Typography>
              <Typography sx={{ fontSize: 13, color: subtleText, mb: 3, lineHeight: 1.6 }}>Health check endpoint. Returns server status.</Typography>
              <CodeBlock filename="response.json" code={`{ "status": "ok" }`} />

              {/* Request Verification */}
              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MethodBadge method="POST" /> /verification/request
              </Typography>
              <Typography sx={{ fontSize: 13, color: subtleText, mb: 1.5, lineHeight: 1.6 }}>Request a verification code. Sends OTP via the selected channel.</Typography>
              <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Parameter</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Required</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { param: 'phone', type: 'string', required: 'Yes', desc: 'Phone number with country code (e.g. +14155550123)' },
                      { param: 'channel', type: 'string', required: 'Yes', desc: '"whatsapp", "telegram", or "signal"' },
                      { param: 'ttl', type: 'number', required: 'No', desc: 'Time to live in seconds (default: 300)' },
                      { param: 'callback_url', type: 'string', required: 'No', desc: 'URL for webhook verification status' },
                    ].map((r) => (
                      <TableRow key={r.param} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, fontFamily: 'monospace' }}>{r.param}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.type}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: r.required === 'Yes' ? 'error.main' : subtleText }}>{r.required}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <CodeBlock filename="response.json" code={`{
  "verification_id": "uuid",
  "deep_link": "https://t.me/bot?start=uuid",
  "message_preview": "",
  "expires_at": "2026-08-27T23:00:00Z",
  "delivery_status": "sent"
}`} />

              {/* Verify Code */}
              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1.5, mt: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MethodBadge method="POST" /> /verification/verify
              </Typography>
              <Typography sx={{ fontSize: 13, color: subtleText, mb: 1.5, lineHeight: 1.6 }}>Verify a submitted code. Returns verification status.</Typography>
              <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Parameter</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { param: 'verification_id', type: 'string', desc: 'ID from the request response' },
                      { param: 'code', type: 'string', desc: 'The OTP code the user entered' },
                    ].map((r) => (
                      <TableRow key={r.param} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, fontFamily: 'monospace' }}>{r.param}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.type}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <CodeBlock filename="response.json" code={`{
  "verified": true,
  "message": "Verification successful"
}`} />

              {/* Other endpoints */}
              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1.5, mt: 4 }}>Other Endpoints</Typography>
              <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}></TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Endpoint</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { method: 'GET', path: '/channels', desc: 'List channel status and configuration' },
                      { method: 'POST', path: '/channels/{channel}/connect', desc: 'Connect a messaging channel' },
                      { method: 'GET', path: '/verification/recent', desc: 'List recent verifications' },
                      { method: 'GET', path: '/dashboard/stats', desc: 'Dashboard statistics and metrics' },
                      { method: 'GET', path: '/logs', desc: 'Recent audit log entries' },
                      { method: 'POST', path: '/webhook/telegram', desc: 'Telegram webhook (auto-configured, no manual call needed)' },
                    ].map((r) => (
                      <TableRow key={r.path} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ py: 1.5, px: 2 }}><MethodBadge method={r.method} /></TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, fontFamily: 'monospace' }}>{r.path}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Channels */}
            <Box id="channels" sx={{ mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.025em', mb: 1 }}>Channels</Typography>
              <Typography sx={{ fontSize: '0.95rem', color: subtleText, lineHeight: 1.7, mb: 3 }}>otp-Init supports multiple delivery channels. Each has its own setup process.</Typography>

              {[
                { name: 'WhatsApp', color: '#25d366', desc: 'Free delivery via the WhatsApp Business API. Requires a Meta Business account and phone number.', setup: ['Create a Meta Business account at business.facebook.com', 'Set up a WhatsApp Business API instance', 'Configure the phone number for verification', 'Connect via POST /channels/whatsapp/connect'] },
                { name: 'Telegram', color: '#0088cc', desc: 'Instant delivery through a Telegram bot. No SMS costs or carrier dependencies.', setup: ['Create a bot via @BotFather on Telegram', 'Copy the bot token', 'Configure in your otp-Init settings', 'Connect via POST /channels/telegram/connect'] },
                { name: 'Signal', color: '#3a76f0', desc: 'Encrypted delivery from one Signal CLI sender account to many recipient numbers.', setup: ['Install the latest Signal CLI and Java 25', 'Link a dedicated Signal number with signal-cli link -n "otp-init"', 'Set SIGNAL_PHONE to the sender account in international format', 'Test with signal-cli ... send, then call POST /channels/signal/connect'] },
              ].map((ch) => (
                <Box key={ch.name} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3, mb: 2, '&:hover': { borderColor: ch.color } }}>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: ch.color }} />
                    <Typography sx={{ fontWeight: 500, fontSize: 14 }}>{ch.name}</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 13, color: subtleText, lineHeight: 1.6, mb: 2 }}>{ch.desc}</Typography>
                  <Stack spacing={0.75}>
                    {ch.setup.map((step, i) => (
                      <Typography key={i} sx={{ fontSize: 13, color: subtleText, display: 'flex', gap: 1 }}>
                        <Box component="span" sx={{ color: 'primary.main', fontFamily: 'monospace', fontSize: 12 }}>{i + 1}.</Box>
                        {step}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>

            {/* SDK */}
            <Box id="sdk" sx={{ mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.025em', mb: 1 }}>SDK Reference</Typography>
              <Typography sx={{ fontSize: '0.95rem', color: subtleText, lineHeight: 1.7, mb: 3 }}>JavaScript/TypeScript SDK for integrating otp-Init into your app.</Typography>

              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1 }}>OtpClient Constructor</Typography>
              <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Option</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { opt: 'baseUrl', type: 'string', desc: 'Your otp-Init server URL' },
                      { opt: 'apiKey', type: 'string', desc: 'API key for authentication' },
                      { opt: 'timeout', type: 'number', desc: 'Request timeout in ms (default: 10000)' },
                    ].map((r) => (
                      <TableRow key={r.opt} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, fontFamily: 'monospace' }}>{r.opt}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.type}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1 }}>client.sendOtp(phone, channel, ttl?)</Typography>
              <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Parameter</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { param: 'phone', type: 'string', desc: 'Phone number with country code' },
                      { param: 'channel', type: 'ChannelType', desc: '"whatsapp" | "telegram" | "signal"' },
                      { param: 'ttl', type: 'number', desc: 'Code expiry in seconds (default: 300)' },
                    ].map((r) => (
                      <TableRow key={r.param} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, fontFamily: 'monospace' }}>{r.param}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.type}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1 }}>client.verifyCode(verificationId, code)</Typography>
              <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Parameter</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { param: 'verificationId', type: 'string', desc: 'ID from the sendOtp response' },
                      { param: 'code', type: 'string', desc: 'The OTP code entered by the user' },
                    ].map((r) => (
                      <TableRow key={r.param} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, fontFamily: 'monospace' }}>{r.param}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.type}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Configuration */}
            <Box id="config" sx={{ mb: 8 }}>
              <Typography variant="h2" sx={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.025em', mb: 1 }}>Configuration</Typography>
              <Typography sx={{ fontSize: '0.95rem', color: subtleText, lineHeight: 1.7, mb: 3 }}>Environment variables and configuration options for your otp-Init instance.</Typography>

              <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Variable</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Default</TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 12, py: 1.5, px: 2 }}>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { variable: 'DATABASE_URL', def: 'sqlite:///otp_init.db', desc: 'Database connection string' },
                      { variable: 'API_KEY', def: 'none', desc: 'API key for client authentication' },
                      { variable: 'OTP_LENGTH', def: '6', desc: 'Length of generated OTP codes' },
                      { variable: 'OTP_TTL', def: '300', desc: 'Default code expiry in seconds' },
                      { variable: 'MAX_ATTEMPTS', def: '5', desc: 'Max verification attempts before lockout' },
                      { variable: 'WHATSAPP_TOKEN', def: 'none', desc: 'WhatsApp Business API token' },
                      { variable: 'TELEGRAM_BOT_TOKEN', def: 'none', desc: 'Telegram bot token from @BotFather' },
                      { variable: 'SIGNAL_PHONE', def: 'none', desc: 'Signal CLI sender account; recipient numbers are supplied per request' },
                      { variable: 'SIGNAL_CLI_PATH', def: 'signal-cli', desc: 'Signal CLI executable name or full path' },
                      { variable: 'SIGNAL_CLI_TIMEOUT', def: '30', desc: 'Seconds before a Signal send is treated as failed' },
                      { variable: 'SECRET_KEY', def: 'change-me-in-production', desc: 'Secret key for signing and internal auth' },
                      { variable: 'WEBHOOK_SECRET', def: 'change-me-webhook-secret', desc: 'Secret for validating incoming webhooks' },
                      { variable: 'TELEGRAM_WEBHOOK_URL', def: '(empty)', desc: 'Public URL for Telegram webhook (e.g. https://your-domain.ngrok-free.dev)' },
                      { variable: 'MAX_RATE_LIMIT', def: '5', desc: 'Max requests per minute per API key' },
                      { variable: 'DEFAULT_TTL', def: '300', desc: 'Default OTP expiry in seconds' },
                      { variable: 'CORS_ORIGINS', def: '["http://localhost:3000", "http://localhost:3001"]', desc: 'Allowed CORS origins (JSON array)' },
                    ].map((r) => (
                      <TableRow key={r.variable} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, fontFamily: 'monospace' }}>{r.variable}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText, fontFamily: 'monospace' }}>{r.def}</TableCell>
                        <TableCell sx={{ fontSize: 13, py: 1.5, px: 2, color: subtleText }}>{r.desc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 1 }}>Example .env file</Typography>
              <CodeBlock filename=".env" code={`DATABASE_URL=postgresql://user:pass@localhost/otp_init
API_KEY=your-secret-key-here
OTP_LENGTH=6
OTP_TTL=300
MAX_ATTEMPTS=5

# WhatsApp
WHATSAPP_TOKEN=your-whatsapp-business-token

# Telegram
TELEGRAM_BOT_TOKEN=your-bot-token

# Signal
SIGNAL_PHONE=+2348012345678
SIGNAL_CLI_PATH=signal-cli
SIGNAL_CLI_TIMEOUT=30`} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
