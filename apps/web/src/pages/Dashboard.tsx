import { useState, useEffect, useCallback } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import TrendingUp from '@mui/icons-material/TrendingUp';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Speed from '@mui/icons-material/Speed';
import Timer from '@mui/icons-material/Timer';
import Refresh from '@mui/icons-material/Refresh';
import Phone from '@mui/icons-material/Phone';
import Chat from '@mui/icons-material/Chat';
import Forum from '@mui/icons-material/Forum';
import VpnKey from '@mui/icons-material/VpnKey';

import CheckIcon from '@mui/icons-material/CheckCircle';
import Circle from '@mui/icons-material/Circle';
import Warning from '@mui/icons-material/Warning';
import ArrowForward from '@mui/icons-material/ArrowForward';
import useTheme from '@mui/material/styles/useTheme';
import { useNavigate } from 'react-router-dom';
import { api, type DashboardStats, type ChannelStatus, type RecentVerification } from '../services/api';

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

const FALLBACK_STATS: DashboardStats = {
  total_verifications: 12847,
  active_channels: 2,
  success_rate: 97.3,
  avg_response_time: 1.2,
};

const FALLBACK_CHANNELS: ChannelStatus[] = [
  { channel: 'whatsapp', connected: true, status: 'active', last_seen: new Date().toISOString() },
  { channel: 'telegram', connected: true, status: 'active', last_seen: new Date().toISOString() },
  { channel: 'signal', connected: false, status: 'inactive', last_seen: null },
];

const FALLBACK_RECENT: RecentVerification[] = [
  { id: '1', phone: '+141****5012', channel: 'whatsapp', verified: true, attempts: 1, created_at: new Date(Date.now() - 300000).toISOString() },
  { id: '2', phone: '+447****2345', channel: 'telegram', verified: true, attempts: 1, created_at: new Date(Date.now() - 900000).toISOString() },
  { id: '3', phone: '+234****4567', channel: 'whatsapp', verified: false, attempts: 3, created_at: new Date(Date.now() - 1800000).toISOString() },
  { id: '4', phone: '+551****5432', channel: 'whatsapp', verified: true, attempts: 1, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: '5', phone: '+491****2345', channel: 'telegram', verified: true, attempts: 2, created_at: new Date(Date.now() - 7200000).toISOString() },
];

const getChannelIcon = (ch: string) => {
  switch (ch.toLowerCase()) {
    case 'whatsapp': return <Phone sx={{ fontSize: 20 }} />;
    case 'telegram': return <Chat sx={{ fontSize: 20 }} />;
    case 'signal':  return <Forum sx={{ fontSize: 20 }} />;
    default:        return <VpnKey sx={{ fontSize: 20 }} />;
  }
};

const getChannelColor = (ch: string) => {
  switch (ch.toLowerCase()) {
    case 'whatsapp': return '#25d366';
    case 'telegram': return '#0088cc';
    case 'signal':  return '#3a76f0';
    default:        return '#e8590c';
  }
};

const statCard = (label: string, value: string, icon: React.ReactNode, color: string, isDark: boolean) => (
  <Box sx={{
    border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3,
    bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
    transition: 'border-color 0.2s', '&:hover': { borderColor: color },
  }}>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar sx={{ bgcolor: `${color}12`, color, width: 44, height: 44 }}>{icon}</Avatar>
      <Box>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 500, mb: 0.25 }}>{label}</Typography>
        <Typography sx={{ fontSize: '1.65rem', fontWeight: 500, letterSpacing: '-0.03em' }}>{value}</Typography>
      </Box>
    </Stack>
  </Box>
);

export function Dashboard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const subtleText = theme.palette.text.secondary;
  const tc = (l: string, d: string) => (isDark ? d : l);

  const [stats, setStats] = useState<DashboardStats>(FALLBACK_STATS);
  const [channels, setChannels] = useState<ChannelStatus[]>(FALLBACK_CHANNELS);
  const [recent, setRecent] = useState<RecentVerification[]>(FALLBACK_RECENT);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setApiError(false);
      const [s, c, r] = await Promise.all([
        api.dashboardStats(),
        api.channels(),
        api.recentVerifications(),
      ]);
      setStats(s);
      setChannels(c);
      setRecent(r);
    } catch {
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', ...dotBg(isDark) }}>
      {loading && <LinearProgress sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, color: 'primary.main' }} />}

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
          <Box>
            <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 500, letterSpacing: '-0.035em', mb: 0.5 }}>
              Public Dashboard
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', color: subtleText, lineHeight: 1.5 }}>
              Real-time, public monitoring of the otp-Init verification system.
              <br />
              View live stats, channel health, and recent verifications.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {apiError && (
              <Chip
                icon={<Warning sx={{ fontSize: 14 }} />}
                label="Offline — showing sample data"
                size="small"
                sx={{ borderRadius: 999, border: '1px solid', borderColor: 'warning.main', color: 'warning.main', bgcolor: 'transparent', fontSize: 11, fontWeight: 500 }}
              />
            )}
            <IconButton onClick={fetchData} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 999, '&:hover': { bgcolor: 'action.hover' } }}>
              <Refresh sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Stats */}
        <Grid container spacing={2} sx={{ mb: 5 }}>
          <Grid item xs={6} md={3}>
            {statCard('Total OTPs', stats.total_verifications.toLocaleString(), <VpnKey sx={{ fontSize: 20 }} />, '#e8590c', isDark)}
          </Grid>
          <Grid item xs={6} md={3}>
            {statCard('Success Rate', `${stats.success_rate.toFixed(1)}%`, <CheckCircle sx={{ fontSize: 20 }} />, '#25d366', isDark)}
          </Grid>
          <Grid item xs={6} md={3}>
            {statCard('Active Channels', String(stats.active_channels), <Speed sx={{ fontSize: 20 }} />, '#0088cc', isDark)}
          </Grid>
          <Grid item xs={6} md={3}>
            {statCard('Avg Response', `${stats.avg_response_time.toFixed(1)}s`, <Timer sx={{ fontSize: 20 }} />, '#3a76f0', isDark)}
          </Grid>
        </Grid>

        {/* Channels + Quick Actions */}
        <Grid container spacing={2} sx={{ mb: 5 }}>
          <Grid item xs={12} md={8}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 2 }}>Channel Status</Typography>
            <Grid container spacing={2}>
              {channels.map((ch) => (
                <Grid item xs={12} sm={4} key={ch.channel}>
                  <Box sx={{
                    border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2.5,
                    transition: 'border-color 0.2s', '&:hover': { borderColor: getChannelColor(ch.channel) },
                  }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ bgcolor: `${getChannelColor(ch.channel)}12`, color: getChannelColor(ch.channel), width: 36, height: 36 }}>
                        {getChannelIcon(ch.channel)}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 500, textTransform: 'capitalize' }}>{ch.channel}</Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Circle sx={{ fontSize: 7, color: ch.connected ? 'success.main' : 'error.main' }} />
                          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{ch.connected ? 'active' : 'inactive'}</Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 2 }}>Quick Actions</Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Test Verification', desc: 'Send a test OTP to any number', color: '#e8590c', path: '/verify' },
                { label: 'View Docs', desc: 'API reference & guides', color: '#0088cc', path: '/docs' },
              ].map((a) => (
                <Box key={a.label} onClick={() => navigate(a.path)} sx={{
                  display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 2, borderRadius: 3,
                  border: '1px solid', borderColor: 'divider', cursor: 'pointer',
                  transition: 'all 0.15s', '&:hover': { borderColor: a.color, bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' },
                }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: a.color, flexShrink: 0 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{a.label}</Typography>
                    <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{a.desc}</Typography>
                  </Box>
                  <ArrowForward sx={{ fontSize: 14, color: 'text.disabled' }} />
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Recent Verifications */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>Recent Verifications</Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{recent.length} entries</Typography>
          </Stack>
          <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                  {['Phone', 'Channel', 'Status', 'Attempts', 'Time'].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 500, fontSize: 12, color: 'text.secondary', py: 1.5, px: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {recent.map((v) => (
                  <TableRow key={v.id} sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' } }}>
                    <TableCell sx={{ fontSize: 13, py: 2, px: 2.5, borderBottom: '1px solid', borderColor: 'divider', fontFamily: 'monospace' }}>
                      {v.phone}
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ color: getChannelColor(v.channel), display: 'flex' }}>{getChannelIcon(v.channel)}</Box>
                        <Typography sx={{ fontSize: 13, textTransform: 'capitalize' }}>{v.channel}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ py: 2, px: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Chip
                        icon={v.verified ? <CheckIcon sx={{ fontSize: 12 }} /> : <Warning sx={{ fontSize: 12 }} />}
                        label={v.verified ? 'Verified' : 'Failed'}
                        size="small"
                        sx={{
                          borderRadius: 999, fontSize: 11, fontWeight: 500,
                          bgcolor: v.verified ? 'rgba(37,211,102,0.1)' : 'rgba(239,68,68,0.1)',
                          color: v.verified ? '#25d366' : '#ef4444',
                          border: `1px solid ${v.verified ? 'rgba(37,211,102,0.2)' : 'rgba(239,68,68,0.2)'}`,
                          '& .MuiChip-icon': { color: 'inherit' },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, py: 2, px: 2.5, borderBottom: '1px solid', borderColor: 'divider', color: 'text.secondary' }}>
                      {v.attempts}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 2, px: 2.5, borderBottom: '1px solid', borderColor: 'divider', color: 'text.secondary' }}>
                      {new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Success rate bar */}
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3, ...dotBgAlt(isDark) }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>Overall Success Rate</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#25d366' }}>{stats.success_rate.toFixed(1)}%</Typography>
          </Stack>
          <Box sx={{ height: 8, borderRadius: 999, bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: `${stats.success_rate}%`, borderRadius: 999, bgcolor: '#25d366', transition: 'width 1s ease' }} />
          </Box>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 1.5 }}>
            Based on {stats.total_verifications.toLocaleString()} total verifications across all channels.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
