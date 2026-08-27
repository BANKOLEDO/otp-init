import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Chat from '@mui/icons-material/Chat';
import Send from '@mui/icons-material/Send';
import Lock from '@mui/icons-material/Lock';
import { adminApi, type ChannelOverview } from '../services/api';
import { useToast } from '../components/Toast';
import { slideUp } from '../utils/animations';

const channelMeta: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  whatsapp: { icon: <Chat sx={{ fontSize: 22 }} />, label: 'WhatsApp', color: '#25d366' },
  telegram: { icon: <Send sx={{ fontSize: 22 }} />, label: 'Telegram', color: '#0088cc' },
  signal: { icon: <Lock sx={{ fontSize: 22 }} />, label: 'Signal', color: '#3a76f0' },
};

export function Channels() {
  const { toast } = useToast();
  const [channels, setChannels] = useState<ChannelOverview>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        setChannels(await adminApi.channels());
      } catch (err: any) {
        toast(err.message || 'Failed to fetch channel data');
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto', animation: `${slideUp} 0.5s ease-out both` }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>Channels</Typography>

      <Grid container spacing={2.5}>
        {Object.entries(channels).map(([name, data], i) => {
          const meta = channelMeta[name] || { icon: null, label: name, color: '#666' };
          return (
            <Grid xs={12} sm={6} md={4} key={name}>
              <Card sx={{ height: '100%', animation: `${slideUp} 0.5s ease-out ${i * 80}ms both` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{
                      width: 44, height: 44, borderRadius: 2.5,
                      bgcolor: `${meta.color}14`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', color: meta.color,
                    }}>
                      {meta.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{meta.label}</Typography>
                      <Box component="span" sx={{
                        fontWeight: 500, fontSize: '0.7rem', px: 1, py: 0.25,
                        borderRadius: 999,
                        bgcolor: data.status === 'active' ? 'success.light' : 'error.light',
                        color: data.status === 'active' ? 'success.main' : 'error.main',
                      }}>
                        {data.status || 'unknown'}
                      </Box>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    {[
                      { label: 'Instances', value: (data.instances ?? 0).toLocaleString() },
                      { label: 'Messages Today', value: (data.messages_today ?? 0).toLocaleString() },
                      { label: 'Success Rate', value: `${data.success_rate ?? 0}%` },
                      { label: 'Avg Latency', value: `${data.avg_latency ?? 0}ms` },
                    ].map((stat) => (
                      <Grid xs={6} sm={6} key={stat.label}>
                        <Box sx={{ py: 1 }}>
                          <Typography variant="caption" color="text.disabled">{stat.label}</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>{stat.value}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        {Object.keys(channels).length === 0 && (
          <Grid xs={12}>
            <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: 4 }}>No channel data</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
