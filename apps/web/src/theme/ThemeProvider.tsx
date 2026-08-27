import { useState, useMemo, useEffect, createContext, useContext, type ReactNode } from 'react';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';

type Mode = 'light' | 'dark';
interface ThemeCtx { mode: Mode; toggle: () => void; }
const ThemeContext = createContext<ThemeCtx>({ mode: 'light', toggle: () => {} });
export const useThemeMode = () => useContext(ThemeContext);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => (localStorage.getItem('otp-theme') as Mode) || 'light');
  const toggle = () => setMode((p) => { const n = p === 'light' ? 'dark' : 'light'; localStorage.setItem('otp-theme', n); return n; });
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);
  useEffect(() => { document.body.setAttribute('data-theme', mode); }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
