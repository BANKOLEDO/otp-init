import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Save from '@mui/icons-material/Save';
import Shield from '@mui/icons-material/Shield';
import Webhook from '@mui/icons-material/Webhook';
import Tune from '@mui/icons-material/Tune';
import { adminApi, type PlatformSettings } from '../services/api';
import { useToast } from '../components/Toast';
import { slideUp } from '../utils/animations';
import { PageFrame } from '../components/layout/PageFrame';

export function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<PlatformSettings>({
    platform_name: '',
    admin_email: '',
    default_ttl: 300,
    max_rate_limit: 10,
    webhook_secret_set: false,
    api_key_rotation_days: 90,
    default_channel: 'whatsapp',
    max_concurrent: 50,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setSettings(await adminApi.settings());
      } catch (err: any) {
        toast(err.message || 'Failed to fetch settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (field: keyof PlatformSettings, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await adminApi.updateSettings(settings);
      toast('Settings saved successfully', 'success');
    } catch (err: any) {
      toast(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  const sections = [
    {
      title: 'General',
      icon: <Tune sx={{ fontSize: 20 }} />,
      fields: [
        { key: 'platform_name' as const, label: 'Platform Name', type: 'text' as const, options: undefined },
        { key: 'admin_email' as const, label: 'Admin Email', type: 'email' as const, options: undefined },
        { key: 'default_channel' as const, label: 'Default Channel', type: 'select' as const, options: ['whatsapp', 'telegram', 'signal'] },
      ],
    },
    {
      title: 'Verification',
      icon: <Shield sx={{ fontSize: 20 }} />,
      fields: [
        { key: 'default_ttl' as const, label: 'OTP TTL (seconds)', type: 'number' as const, options: undefined },
        { key: 'max_rate_limit' as const, label: 'Rate Limit (per minute)', type: 'number' as const, options: undefined },
        { key: 'max_concurrent' as const, label: 'Max Concurrent Requests', type: 'number' as const, options: undefined },
      ],
    },
    {
      title: 'Security',
      icon: <Webhook sx={{ fontSize: 20 }} />,
      fields: [
        { key: 'api_key_rotation_days' as const, label: 'API Key Rotation (days)', type: 'number' as const, options: undefined },
      ],
    },
  ];

  return (
    <PageFrame eyebrow="Configuration" title="Settings" description="Shape the platform defaults that govern verification, security, and channel behavior." maxWidth={1000} actions={
        <Button
          variant="contained"
          startIcon={saving ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <Save />}
          onClick={handleSave}
          disabled={saving}
          sx={{ borderRadius: 999, fontWeight: 500, px: 3 }}
        >
          Save Changes
        </Button>
      }>

      {sections.map((section, si) => (
        <Card key={section.title} sx={{ mb: si < sections.length - 1 ? 2.5 : 0, animation: `${slideUp} 0.5s ease-out ${si * 100 + 80}ms both` }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
              <Box sx={{
                width: 32, height: 32, borderRadius: 1.5,
                bgcolor: 'action.selected', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: 'primary.main',
              }}>
                {section.icon}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{section.title}</Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2, sm: 2.5 } }}>
              {section.fields.map((field) => (
                <Box key={field.key}>
                  {field.type === 'select' ? (
                    <FormControl fullWidth>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        value={settings[field.key] as string}
                        label={field.label}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        {field.options.map((opt: string) => (
                          <MenuItem key={opt} value={opt} sx={{ textTransform: 'capitalize' }}>{opt}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      fullWidth
                      label={field.label}
                      type={field.type}
                      value={settings[field.key]}
                      onChange={(e) => handleChange(field.key, field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </PageFrame>
  );
}
