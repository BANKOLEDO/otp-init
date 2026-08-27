import { useState, useMemo, useEffect, createContext, useContext, type ReactNode } from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';

type Mode = 'light' | 'dark';
interface ThemeCtx { mode: Mode; toggle: () => void; }
const ThemeContext = createContext<ThemeCtx>({ mode: 'light', toggle: () => {} });
export const useThemeMode = () => useContext(ThemeContext);

function getSystemMode(): Mode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem('otp-admin-theme') as Mode) || getSystemMode());
  const toggle = () => setMode((p) => { const n = p === 'light' ? 'dark' : 'light'; localStorage.setItem('otp-admin-theme', n); return n; });
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);
  useEffect(() => { document.body.setAttribute('data-theme', mode); }, [mode]);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('otp-admin-theme')) setMode(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
