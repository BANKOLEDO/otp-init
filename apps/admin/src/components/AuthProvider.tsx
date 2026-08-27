import { useState, createContext, useContext, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { setApiKey as setApiServiceKey } from '../services/api';

interface AuthCtx {
  apiKey: string;
  setApiKey: (k: string) => void;
}
const Ctx = createContext<AuthCtx>({ apiKey: '', setApiKey: () => {} });
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState(() => {
    const k = localStorage.getItem('otp-admin-key') || '';
    if (k) setApiServiceKey(k);
    return k;
  });
  const [input, setInput] = useState(apiKey);
  const [error, setError] = useState('');

  const setApiKey = (k: string) => {
    setApiKeyState(k);
    setApiServiceKey(k);
    localStorage.setItem('otp-admin-key', k);
  };

  const handleConnect = () => {
    if (!input.trim()) {
      setError('API key is required');
      return;
    }
    setApiKey(input.trim());
  };

  if (!apiKey) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 400, px: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, justifyContent: 'center' }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              bgcolor: 'primary.main', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <VerifiedUserIcon sx={{ fontSize: 20, color: '#fff' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: '-0.02em' }}>
              otp-Init
            </Typography>
            <Chip label="Admin" size="small" sx={{ height: 20, fontSize: 10, fontWeight: 500 }} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Enter your API key to access the admin dashboard.
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            placeholder="Enter API key"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 999,
                fontSize: 14,
                bgcolor: 'background.paper',
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleConnect}
            sx={{ borderRadius: 999, py: 1.5, fontWeight: 500, fontSize: 14 }}
          >
            Connect
          </Button>
        </Box>
      </Box>
    );
  }

  return <Ctx.Provider value={{ apiKey, setApiKey }}>{children}</Ctx.Provider>;
}
