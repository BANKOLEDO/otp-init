import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Phone from '@mui/icons-material/Phone';
import Chat from '@mui/icons-material/Chat';
import Forum from '@mui/icons-material/Forum';
import Verified from '@mui/icons-material/Verified';
import Code from '@mui/icons-material/Code';
import Security from '@mui/icons-material/Security';
import Speed from '@mui/icons-material/Speed';
import Shield from '@mui/icons-material/Shield';
import Paid from '@mui/icons-material/Paid';
import OpenInNew from '@mui/icons-material/OpenInNew';
import ArrowForward from '@mui/icons-material/ArrowForward';
import useTheme from '@mui/material/styles/useTheme';
import { ChannelIcon } from '../assets/ChannelIcons';
import { Link as RouterLink } from 'react-router-dom';
import { Illustration } from '../assets/illustrations';
import { useScrollReveal, revealSx } from '../hooks/useScrollReveal';

const dot = (dark: boolean) => dark
  ? 'radial-gradient(circle, rgba(238,237,232,0.15) 1px, transparent 1px)'
  : 'radial-gradient(circle, rgba(26,24,22,0.15) 1px, transparent 1px)';
const dotBg = (dark: boolean) => ({
  backgroundImage: dot(dark),
  backgroundSize: '20px 20px',
  bgcolor: dark ? '#0e0e0e' : '#ffffff',
});
const dotBgAlt = (dark: boolean) => ({
  backgroundImage: dot(dark),
  backgroundSize: '20px 20px',
  bgcolor: dark ? '#141414' : '#f6f5f3',
});

const steps = [
  { num: '01', title: 'Enter phone', desc: 'Simple input field — no app download, no friction. The user submits their number.' },
  { num: '02', title: 'Generate OTP', desc: 'Your server creates a time-limited code. Configurable length, expiry, and retry policy.' },
  { num: '03', title: 'Deliver', desc: 'Send through WhatsApp, Telegram, SMS, or any custom integration you connect.' },
  { num: '04', title: 'Verify', desc: 'They enter the code. You get a cryptographically signed JWT confirming identity.' },
];

const featureItems = [
  { icon: <Paid />, title: 'Zero cost', desc: 'Self-hosted means no per-message fees. WhatsApp Business API and Telegram are free. You pay nothing.' },
  { icon: <Speed />, title: 'Instant delivery', desc: 'Messages arrive in under a second. No carrier delays, no grey routes, no throttling.' },
  { icon: <Security />, title: 'Multi-channel', desc: 'WhatsApp, Telegram, SMS, email — route intelligently based on availability and cost.' },
  { icon: <Shield />, title: 'Full control', desc: 'All verification logic lives on your infrastructure. No third-party sees your user data.' },
  { icon: <Code />, title: 'Developer-first', desc: 'REST API with SDKs for Node, Python, and Go. Three lines of code to integrate.' },
  { icon: <RocketLaunch />, title: 'Open source', desc: 'MIT-licensed. Read every line. Contribute features. Never worry about vendor lock-in.' },
];

const comparisonRows = [
  { feature: 'Cost per message', sms: '$0.005 – $0.10', otp: 'Free (self-hosted)' },
  { feature: 'Global delivery', sms: 'Varies by carrier', otp: 'Consistent via API' },
  { feature: 'Setup time', sms: 'Days (carrier contracts)', otp: '< 30 minutes' },
  { feature: 'Data ownership', sms: 'Third-party servers', otp: 'Your infrastructure' },
  { feature: 'Customization', sms: 'Limited templates', otp: 'Full control' },
  { feature: 'Reliability', sms: 'Grey routes, drops', otp: 'Direct API delivery' },
  { feature: 'Open source', sms: 'No', otp: 'Yes — MIT license' },
];

const useCaseItems = [
  { icon: <ChannelIcon channel="whatsapp" size={24} />, title: 'WhatsApp OTP', desc: 'Reach users where they already are. Free delivery via the WhatsApp Business API with read receipts.', iconColor: '#25D366' },
  { icon: <ChannelIcon channel="telegram" size={24} />, title: 'Telegram Bot', desc: 'Instant delivery through Telegram. Works globally with no SMS costs and no carrier dependencies.', iconColor: '#26A5E4' },
  { icon: <ChannelIcon channel="signal" size={24} />, title: 'Signal Encrypted', desc: 'End-to-end encrypted delivery. Most secure channel for privacy-sensitive verifications.', iconColor: '#3A76F0' },
  { icon: <Verified />, title: 'Passwordless Auth', desc: 'Replace passwords entirely. OTP-based login is faster and more secure than traditional credentials.', iconColor: 'primary' as const },
];

const codeLines = [
  { indent: 0, parts: [
    { text: 'import', color: '#c678dd' },
    { text: ' { OtpClient } ', color: '#e06c75' },
    { text: 'from', color: '#c678dd' },
    { text: " '@otp-init/sdk'", color: '#98c379' },
    { text: ';', color: '#abb2bf' },
  ]},
  { indent: 0, parts: [] },
  { indent: 0, parts: [
    { text: 'const', color: '#c678dd' },
    { text: ' client ', color: '#e06c75' },
    { text: '= ', color: '#56b6c2' },
    { text: 'new', color: '#c678dd' },
    { text: ' OtpClient', color: '#e5c07b' },
    { text: '({', color: '#abb2bf' },
  ]},
  { indent: 1, parts: [
    { text: 'baseUrl', color: '#e06c75' },
    { text: ': ', color: '#abb2bf' },
    { text: "'https://auth.yourapp.com'", color: '#98c379' },
    { text: ',', color: '#abb2bf' },
  ]},
  { indent: 0, parts: [{ text: '});', color: '#abb2bf' }] },
  { indent: 0, parts: [] },
  { indent: 0, parts: [
    { text: 'await', color: '#c678dd' },
    { text: ' client.', color: '#abb2bf' },
    { text: 'send', color: '#61afef' },
    { text: '({', color: '#abb2bf' },
  ]},
  { indent: 1, parts: [
    { text: 'phone', color: '#e06c75' },
    { text: ': ', color: '#abb2bf' },
    { text: "'+14155550123'", color: '#98c379' },
    { text: ',', color: '#abb2bf' },
    { text: '  ', color: '#abb2bf' },
    { text: 'channel', color: '#e06c75' },
    { text: ': ', color: '#abb2bf' },
    { text: "'whatsapp'", color: '#98c379' },
    { text: ',', color: '#abb2bf' },
  ]},
  { indent: 0, parts: [{ text: '});', color: '#abb2bf' }] },
];

export function Landing() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const tc = (light: string, dark: string) => (isDark ? dark : light);

  const hero = useScrollReveal();
  const comparison = useScrollReveal();
  const howItWorks = useScrollReveal();
  const features = useScrollReveal();
  const integration = useScrollReveal();
  const cta = useScrollReveal();

  const hairline = `1px solid ${theme.palette.divider}`;
  const subtleText = theme.palette.text.secondary;
  const mutedText = tc('rgba(26,24,22,0.5)', 'rgba(238,237,232,0.5)');
  const rowBg = tc('rgba(26,24,22,0.03)', 'rgba(238,237,232,0.03)');

  return (
    <Box>
      {/* Hero */}
      <Box ref={hero.ref} sx={{ overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', ...dotBg(isDark) }}>
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 1280,
            px: { xs: 3, sm: 5 },
            pt: { xs: 14, lg: 16 },
            pb: { xs: 12, lg: 16 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.15fr 0.85fr' },
            gap: { xs: 6, lg: 12 },
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <Box sx={{ textAlign: { xs: 'center', lg: 'left' }, ...revealSx(hero.visible) }}>
            <Chip
              label="Open Source"
              size="small"
              sx={{
                mb: 3,
                borderRadius: 999,
                border: hairline,
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: '0.04em',
                bgcolor: 'transparent',
                color: subtleText,
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', sm: '3.75rem', xl: '4.5rem' },
                fontWeight: 500,
                lineHeight: 1.04,
                letterSpacing: '-0.04em',
                mb: 3,
              }}
            >
              Verification that{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>costs</Box>{' '}
              nothing.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.2rem', lineHeight: 1.65, color: subtleText, mb: 5, maxWidth: 480, mx: { xs: 'auto', lg: 0 } }}
            >
              Self-hosted OTP verification over WhatsApp, Telegram, and more.
              Zero per-message fees. Full data ownership. Ship in minutes.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={{ xs: 'center', lg: 'flex-start' }}
              alignItems={{ xs: 'center', sm: 'center' }}
            >
              <Button
                component={RouterLink}
                to="/docs"
                variant="contained"
                endIcon={<RocketLaunch />}
                sx={{ borderRadius: 999, px: 4, py: 1.5, fontSize: '0.95rem', width: { xs: 'auto', sm: 'auto' } }}
              >
                Get started
              </Button>
              <Button
                component="a"
                href="https://github.com/BANKOLEDO/otp-init"
                target="_blank"
                variant="outlined"
                endIcon={<OpenInNew />}
                sx={{ borderRadius: 999, px: 4, py: 1.5, fontSize: '0.95rem', width: { xs: 'auto', sm: 'auto' } }}
              >
                View source
              </Button>
            </Stack>
          </Box>

          {/* Mockup */}
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', ...revealSx(hero.visible, '0.15s') }}>
            {/* Floating badges */}
            <Box sx={{
              position: 'absolute', top: -8, left: { xs: '10%', lg: -12 }, zIndex: 1,
              px: 2, py: 1, borderRadius: 2, bgcolor: 'background.paper',
              border: hairline, boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: 1,
              transform: 'rotate(-6deg)',
            }}>
              <Box component="svg" viewBox="0 0 24 24" sx={{ width: 16, height: 16, fill: '#25d366' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </Box>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>WhatsApp</Typography>
            </Box>
            <Box sx={{
              position: 'absolute', bottom: 16, right: { xs: '5%', lg: -8 }, zIndex: 1,
              px: 2, py: 1, borderRadius: 2, bgcolor: 'background.paper',
              border: hairline, boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: 1,
              transform: 'rotate(4deg)',
            }}>
              <Box component="svg" viewBox="0 0 24 24" sx={{ width: 16, height: 16, fill: '#0088cc' }}>
                <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </Box>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Telegram</Typography>
            </Box>
            <Box sx={{
              position: 'absolute', top: '40%', right: { xs: 0, lg: -20 }, zIndex: 1,
              px: 2, py: 1, borderRadius: 2, bgcolor: 'background.paper',
              border: hairline, boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: 1,
              transform: 'rotate(-3deg)',
            }}>
              <Box component="svg" viewBox="0 0 24 24" sx={{ width: 16, height: 16 }}>
                <path d="M12 2C6.48 2 2 6.04 2 11c0 2.83 1.4 5.35 3.59 7.02L4.5 22l4.38-2.19c1.03.33 2.13.51 3.12.51 5.52 0 10-4.04 10-9S17.52 2 12 2z" fill="#3a76f0"/>
                <circle cx="8.5" cy="11" r="1.5" fill="white"/>
                <circle cx="12" cy="11" r="1.5" fill="white"/>
                <circle cx="15.5" cy="11" r="1.5" fill="white"/>
              </Box>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Signal</Typography>
            </Box>

            <Illustration name="messaging" sx={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 0 }} />
          </Box>
        </Box>
      </Box>

      {/* Comparison */}
      <Box ref={comparison.ref} sx={{ pb: { xs: 10, md: 14 }, borderTop: hairline, ...dotBgAlt(isDark), ...revealSx(comparison.visible) }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ display: 'block', mb: 1, color: 'primary.main' }}>Why not SMS?</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 500, letterSpacing: '-0.03em', mb: 5 }}>
            The old way vs. the only way.
          </Typography>
          <TableContainer sx={{ border: hairline, borderRadius: 3, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: rowBg }}>
                  <TableCell sx={{ fontWeight: 500, fontSize: 13, color: mutedText, py: 2, px: 3 }}>Feature</TableCell>
                  <TableCell sx={{ fontWeight: 500, fontSize: 13, color: mutedText, py: 2, px: 3 }}>SMS</TableCell>
                  <TableCell sx={{ fontWeight: 500, fontSize: 13, color: 'primary.main', py: 2, px: 3 }}>otp-Init</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow key={row.feature} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell sx={{ fontWeight: 500, fontSize: 14, py: 2, px: 3 }}>{row.feature}</TableCell>
                    <TableCell sx={{ py: 2, px: 3 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Cancel sx={{ fontSize: 16, color: 'error.main' }} />
                        <Typography variant="body2" sx={{ fontSize: 14, color: mutedText }}>{row.sms}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 3 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                        <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500 }}>{row.otp}</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* How It Works */}
      <Box ref={howItWorks.ref} sx={{ py: { xs: 6, md: 8 }, borderTop: hairline, ...dotBgAlt(isDark), ...revealSx(howItWorks.visible) }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ display: 'block', mb: 1, color: 'primary.main' }}>How it works</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 500, letterSpacing: '-0.03em', mb: 4 }}>
            Four steps. No magic.
          </Typography>
          <Grid container spacing={3}>
            {steps.map((step, i) => (
              <Grid item xs={12} sm={6} key={step.num}>
                <Stack direction="row" spacing={3} sx={{ py: 2 }}>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.03em', color: 'action.disabled', minWidth: 48 }}>
                    {step.num}
                  </Typography>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 500, mb: 0.5 }}>{step.title}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: subtleText }}>{step.desc}</Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box ref={features.ref} sx={{ py: { xs: 10, md: 14 }, borderTop: hairline, ...dotBg(isDark) }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ display: 'block', mb: 1, color: 'primary.main' }}>Features</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 500, letterSpacing: '-0.03em', mb: 8, maxWidth: 520 }}>
            Built for developers who ship fast and own their stack.
          </Typography>
          <Grid container spacing={3}>
            {featureItems.map((f, i) => (
              <Grid item xs={12} sm={6} md={i < 2 ? 6 : 4} key={f.title}>
                <Box sx={{ border: hairline, borderRadius: 3, p: 4, height: '100%', '&:hover': { borderColor: 'primary.main' }, ...revealSx(features.visible, `${i * 80}ms`) }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontSize: '1.05rem', fontWeight: 500, mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: subtleText }}>{f.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Integration + Get Started side by side */}
      <Box ref={integration.ref} sx={{ py: { xs: 10, md: 14 }, borderTop: hairline, ...dotBg(isDark), ...revealSx(integration.visible) }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ display: 'block', mb: 1, color: 'primary.main' }}>Integration</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 500, letterSpacing: '-0.03em', mb: 6 }}>
            Ship in three lines of code.
          </Typography>
          <Grid container spacing={4}>
            {/* Left — Code snippet */}
            <Grid item xs={12} md={7}>
              <Box sx={{ border: hairline, borderRadius: 3, overflow: 'hidden' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, py: 1.25, bgcolor: '#1e1e2e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f57' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#febc2e' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#28c840' }} />
                  </Box>
                  <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500, fontFamily: 'monospace' }}>index.ts</Typography>
                  <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                    <ContentCopy sx={{ fontSize: 14 }} />
                  </IconButton>
                </Stack>
                <Box sx={{ bgcolor: '#1e1e2e', px: 3, py: 2.5, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '0.85rem', lineHeight: 2, overflowX: 'auto' }}>
                  {codeLines.map((line, li) => (
                    <Box key={li} sx={{ display: 'flex', minHeight: line.parts.length === 0 ? '1.7em' : undefined }}>
                      <Box sx={{ color: 'rgba(255,255,255,0.15)', userSelect: 'none', minWidth: 28, textAlign: 'right', mr: 2, fontSize: '0.8rem' }}>{line.parts.length > 0 ? li + 1 : ''}</Box>
                      <Box sx={{ pl: line.indent * 2 }}>
                        {line.parts.map((p, pi) => (
                          <Box component="span" key={pi} sx={{ color: p.color }}>{p.text}</Box>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Right — Get Started steps */}
            <Grid item xs={12} md={5}>
              <Box sx={{ border: hairline, borderRadius: 3, overflow: 'hidden', height: '100%' }}>
                <Stack direction="row" alignItems="center" gap={1} sx={{ px: 3, py: 2, borderBottom: hairline }}>
                  <RocketLaunch sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Typography sx={{ fontWeight: 500, fontSize: 14 }}>Get Started</Typography>
                </Stack>
                <Box sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    {[
                      { step: '01', title: 'Clone & run', desc: 'One command installs everything and starts the server.', code: 'git clone ... && ./setup.sh' },
                      { step: '02', title: 'Connect a channel', desc: 'Add your WhatsApp/Telegram token to the .env file. That\u2019s the only config.', code: 'TELEGRAM_BOT_TOKEN=...' },
                      { step: '03', title: 'Integrate', desc: 'Install the SDK in your app. Send and verify OTPs in 3 lines.', code: 'npm install @otp-init/sdk' },
                    ].map((s, i) => (
                      <Stack key={s.step} direction="row" spacing={2}>
                        <Box sx={{
                          width: 32, height: 32, borderRadius: 2, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          bgcolor: isDark ? 'rgba(232,89,12,0.1)' : 'rgba(232,89,12,0.06)',
                          color: 'primary.main', fontWeight: 500, fontSize: 12, fontFamily: 'monospace',
                        }}>
                          {s.step}
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.25 }}>{s.title}</Typography>
                          <Typography sx={{ fontSize: '0.82rem', color: subtleText, lineHeight: 1.5, mb: 0.75 }}>{s.desc}</Typography>
                          <Box sx={{
                            display: 'inline-block', px: 1.25, py: 0.5, borderRadius: 1,
                            bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                            fontFamily: 'monospace', fontSize: 11, color: subtleText,
                          }}>
                            {s.code}
                          </Box>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    component={RouterLink}
                    to="/docs"
                    variant="outlined"
                    endIcon={<ArrowForward />}
                    sx={{ mt: 3, borderRadius: 999, px: 3, py: 1, fontSize: 13, fontWeight: 500, textTransform: 'none' }}
                  >
                    Read the docs
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Use Cases */}
      <Box sx={{ py: { xs: 10, md: 14 }, borderTop: hairline, ...dotBgAlt(isDark) }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ display: 'block', mb: 1, color: 'primary.main' }}>Use cases</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 500, letterSpacing: '-0.03em', mb: 8, maxWidth: 480 }}>
            One system. Every verification scenario.
          </Typography>
          <Grid container spacing={3}>
            {useCaseItems.map((uc, i) => (
              <Grid item xs={12} sm={6} md={i % 2 === 0 ? 7 : 5} key={uc.title}>
                <Box sx={{ border: hairline, borderRadius: 3, p: 4, height: '100%' }}>
                  <Box sx={{ color: uc.iconColor === 'primary' ? 'primary.main' : uc.iconColor, mb: 2 }}>{uc.icon}</Box>
                  <Typography variant="h6" sx={{ fontSize: '1.05rem', fontWeight: 500, mb: 1 }}>{uc.title}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: subtleText }}>{uc.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box ref={cta.ref} sx={{ py: { xs: 12, md: 16 }, borderTop: hairline, ...dotBgAlt(isDark), ...revealSx(cta.visible) }}>
        <Container maxWidth="md">
          <Box sx={{ border: hairline, borderRadius: 3, p: { xs: 5, md: 8 }, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.15, mb: 2.5 }}>
              Stop paying for verification.<br />Start owning it.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.05rem', color: subtleText, mb: 5, maxWidth: 420, mx: 'auto', lineHeight: 1.65 }}>
              Deploy otp-Init in under thirty minutes. No credit card, no vendor lock-in, no surprises.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              <Button
                component={RouterLink}
                to="/docs"
                variant="contained"
                endIcon={<RocketLaunch />}
                sx={{ borderRadius: 999, px: 5, py: 1.75, fontSize: '1rem', minWidth: 200 }}
              >
                Get started
              </Button>
              <Button
                component={RouterLink}
                to="/verify"
                variant="outlined"
                sx={{ borderRadius: 999, px: 5, py: 1.75, fontSize: '1rem', minWidth: 200 }}
              >
                Try it live
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
