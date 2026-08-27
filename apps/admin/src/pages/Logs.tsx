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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Search from '@mui/icons-material/Search';
import { adminApi, type LogEntry } from '../services/api';
import { useToast } from '../components/Toast';
import { slideUp } from '../utils/animations';

const levelColor: Record<string, { bg: string; fg: string }> = {
  error: { bg: 'error.light', fg: 'error.main' },
  warn: { bg: 'warning.light', fg: 'warning.main' },
  info: { bg: 'action.hover', fg: 'text.secondary' },
  debug: { bg: 'action.hover', fg: 'text.disabled' },
};

export function Logs() {
  const { toast } = useToast();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        setLogs(await adminApi.logs());
      } catch (err: any) {
        toast(err.message || 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filtered = logs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || log.source?.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1200, mx: 'auto', animation: `${slideUp} 0.5s ease-out both` }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>Logs</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', animation: `${slideUp} 0.5s ease-out 80ms both` }}>
        <TextField
          fullWidth
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.disabled' }} /></InputAdornment>,
            },
          }}
          sx={{ flex: 1, minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 999 } }}
        />
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Level</InputLabel>
          <Select
            value={levelFilter}
            label="Level"
            onChange={(e) => setLevelFilter(e.target.value)}
            sx={{ borderRadius: 999 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="error">Error</MenuItem>
            <MenuItem value="warn">Warn</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="debug">Debug</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer sx={{ borderRadius: 3, animation: `${slideUp} 0.5s ease-out 160ms both` }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Level', 'Message', 'Source', 'Timestamp'].map((h) => (
                <TableCell key={h}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((log, i) => {
              const colors = levelColor[log.level] || levelColor.info;
              return (
                <TableRow key={i} sx={{ '&:last-child td': { borderBottom: 'none' }, animation: `${slideUp} 0.4s ease-out ${240 + i * 40}ms both` }}>
                  <TableCell>
                    <Chip
                      label={log.level}
                      size="small"
                      sx={{ height: 22, fontWeight: 500, fontSize: '0.7rem', bgcolor: colors.bg, color: colors.fg, textTransform: 'uppercase' }}
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 400 }}>
                    <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.message}</Typography>
                  </TableCell>
                  <TableCell color="text.secondary">{log.source || '\u2014'}</TableCell>
                  <TableCell color="text.disabled" sx={{ whiteSpace: 'nowrap' }}>{log.timestamp}</TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.disabled">No logs found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
