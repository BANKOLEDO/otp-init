import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import { adminApi, type Tenant } from '../services/api';
import { useToast } from '../components/Toast';
import { slideUp } from '../utils/animations';

const planColor: Record<string, { bg: string; fg: string }> = {
  free: { bg: 'action.hover', fg: 'text.secondary' },
  pro: { bg: 'action.selected', fg: 'primary.main' },
  enterprise: { bg: 'action.selected', fg: 'text.primary' },
};

const statusColor: Record<string, { bg: string; fg: string }> = {
  active: { bg: 'success.light', fg: 'success.main' },
  suspended: { bg: 'error.light', fg: 'error.main' },
  trial: { bg: 'warning.light', fg: 'warning.main' },
};

export function Tenants() {
  const { toast } = useToast();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        setTenants(await adminApi.tenants());
      } catch (err: any) {
        toast(err.message || 'Failed to fetch tenants');
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  const filtered = tenants.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto', animation: `${slideUp} 0.5s ease-out both` }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>Tenants</Typography>

      <TextField
        fullWidth
        placeholder="Search tenants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.disabled' }} /></InputAdornment>,
          },
        }}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 999 }, animation: `${slideUp} 0.5s ease-out 80ms both` }}
      />

      <TableContainer sx={{ borderRadius: 3, animation: `${slideUp} 0.5s ease-out 160ms both` }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Name', 'Plan', 'Status', 'Joined'].map((h) => (
                <TableCell key={h}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((t, i) => {
              const pc = planColor[t.plan] || planColor.free;
              const sc = statusColor[t.status] || statusColor.active;
              return (
                <TableRow key={t.id} sx={{ '&:last-child td': { borderBottom: 'none' }, animation: `${slideUp} 0.4s ease-out ${240 + i * 40}ms both` }}>
                  <TableCell sx={{ fontWeight: 500 }}>{t.name}</TableCell>
                  <TableCell>
                    <Chip label={t.plan} size="small" sx={{ height: 24, fontWeight: 500, fontSize: '0.75rem', bgcolor: pc.bg, color: pc.fg, textTransform: 'capitalize' }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={t.status} size="small" sx={{ height: 24, fontWeight: 500, fontSize: '0.75rem', bgcolor: sc.bg, color: sc.fg, textTransform: 'capitalize' }} />
                  </TableCell>
                  <TableCell color="text.secondary">{new Date(t.joined).toLocaleDateString()}</TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.disabled">No tenants found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
