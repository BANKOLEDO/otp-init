import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import People from '@mui/icons-material/People';
import AttachMoney from '@mui/icons-material/AttachMoney';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import Speed from '@mui/icons-material/Speed';
import { adminApi, type AdminStats, type SystemHealth, type LogEntry } from '../services/api';
import { useToast } from '../components/Toast';
import { slideUp } from '../utils/animations';
import { MetricCard, PageFrame } from '../components/layout/PageFrame';

const statsIcons: Record<string, React.ReactNode> = {
  total_tenants: <People sx={{ fontSize: 22 }} />,
  monthly_revenue: <AttachMoney sx={{ fontSize: 22 }} />,
  total_verifications: <VerifiedUser sx={{ fontSize: 22 }} />,
  system_uptime_hours: <Speed sx={{ fontSize: 22 }} />,
};

export function Overview() {
  const { toast } = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [s, h, l] = await Promise.all([adminApi.stats(), adminApi.systemHealth(), adminApi.logs()]);
        setStats(s);
        setHealth(h);
        setLogs(l);
      } catch (err: any) {
        toast(err.message || 'Failed to fetch overview data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  const statCards = stats
    ? [
        { key: 'total_tenants', label: 'Tenants', value: stats.total_tenants ?? 0 },
        { key: 'monthly_revenue', label: 'Revenue', value: `$${(stats.monthly_revenue ?? 0).toLocaleString()}` },
        { key: 'total_verifications', label: 'Verifications', value: (stats.total_verifications ?? 0).toLocaleString() },
        { key: 'system_uptime_hours', label: 'Uptime', value: `${stats.system_uptime_hours ?? 0}h` },
      ]
    : [];

  return (
    <PageFrame title="Overview" description="A live read on tenants, delivery health, and verification activity across your platform.">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: { xs: 2, sm: 2.5 } }}>
        {statCards.map((s, i) => (
          <Box key={s.key}>
            <MetricCard label={s.label} value={s.value} icon={statsIcons[s.key]} color={['#e8590c', '#25d366', '#0088cc', '#3a76f0'][i]} delay={i * 80} />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2, sm: 2.5 }, mt: { xs: 2, sm: 2.5 } }}>
        <Box>
          <Card sx={{ height: '100%', animation: `${slideUp} 0.5s ease-out 320ms both` }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>System Health</Typography>
              {health &&
                [{ label: 'CPU', value: health.cpu }, { label: 'Memory', value: health.memory }, { label: 'Disk', value: health.disk }].map((item) => (
                  <Box key={item.label} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{item.label}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.value}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 6, borderRadius: 3,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: 'primary.main' },
                      }}
                    />
                  </Box>
                ))}
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card sx={{ height: '100%', animation: `${slideUp} 0.5s ease-out 400ms both` }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>Recent Logs</Typography>
              <List disablePadding>
                {logs.map((log, i) => (
                  <ListItem key={i} disablePadding sx={{ py: 1, borderBottom: i < logs.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={log.level}
                            size="small"
                            sx={{
                              height: 20, fontSize: '0.7rem', fontWeight: 500,
                              bgcolor: log.level === 'error' ? 'error.light' : log.level === 'warn' ? 'warning.light' : 'action.hover',
                              color: log.level === 'error' ? 'error.main' : log.level === 'warn' ? 'warning.main' : 'text.secondary',
                            }}
                          />
                          <Typography variant="body2">{log.message}</Typography>
                        </Box>
                      }
                      secondary={<Typography variant="caption" color="text.disabled">{log.timestamp}</Typography>}
                    />
                  </ListItem>
                ))}
                {logs.length === 0 && (
                  <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: 2 }}>No recent logs</Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </PageFrame>
  );
}
