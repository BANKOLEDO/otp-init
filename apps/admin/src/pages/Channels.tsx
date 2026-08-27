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
import { PageFrame } from '../components/layout/PageFrame';

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
    <PageFrame eyebrow="Delivery" title="Channels" description="Monitor delivery capacity and performance across every connected messaging channel.">

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' }, gap: { xs: 2, sm: 2.5 } }}>
        {Object.entries(channels).map(([name, data], i) => {
          const meta = channelMeta[name] || { icon: null, label: name, color: '#666' };
          return (
            <Box key={name}>
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

                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
                    {[
                      { label: 'Instances', value: (data.instances ?? 0).toLocaleString() },
                      { label: 'Messages Today', value: (data.messages_today ?? 0).toLocaleString() },
                      { label: 'Success Rate', value: `${data.success_rate ?? 0}%` },
                      { label: 'Avg Latency', value: `${data.avg_latency ?? 0}ms` },
                    ].map((stat) => (
                      <Box key={stat.label}>
                        <Box sx={{ py: 1 }}>
                          <Typography variant="caption" color="text.disabled">{stat.label}</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>{stat.value}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
        {Object.keys(channels).length === 0 && (
          <Box>
            <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: 4 }}>No channel data</Typography>
          </Box>
        )}
      </Box>
    </PageFrame>
  );
}
