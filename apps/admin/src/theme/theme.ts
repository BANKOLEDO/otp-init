import createTheme from '@mui/material/styles/createTheme';
import type { ThemeOptions } from '@mui/material/styles';

const shared: ThemeOptions = {
  typography: {
    fontFamily: '"DM Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h2: { fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.12 },
    h3: { fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2 },
    h4: { fontWeight: 500, letterSpacing: '-0.01em' },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    subtitle1: { fontWeight: 500 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.55 },
    button: { fontWeight: 500, letterSpacing: '0.01em' },
    caption: { lineHeight: 1.5 },
    overline: { letterSpacing: '0.06em', fontWeight: 500, textTransform: 'uppercase' as const },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 500,
          borderRadius: 999,
          padding: '10px 24px',
          minHeight: 44,
          fontSize: 15,
          transition: 'all 120ms ease',
          '&:active': { transform: 'translateY(1px)' },
        },
        contained: { '&:hover': { boxShadow: 'none' } },
        outlined: { borderWidth: 1, '&:hover': { borderWidth: 1 } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid var(--hairline, rgba(26,24,22,0.10))',
          boxShadow: '0 8px 24px rgba(26,24,22,0.04)',
          transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 14px 32px rgba(26,24,22,0.08)',
            borderColor: 'rgba(232,89,12,0.25)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 20 },
        elevation0: { boxShadow: 'none' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(26,24,22,0.03)',
            '& fieldset': { borderColor: 'rgba(26,24,22,0.10)', borderWidth: 1 },
            '&:hover fieldset': { borderColor: 'rgba(26,24,22,0.18)' },
            '&.Mui-focused fieldset': { borderColor: '#e8590c', borderWidth: 1 },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: { paddingTop: 14, paddingBottom: 14 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 500, fontSize: 12, height: 28 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: 'rgba(26,24,22,0.08)' },
        head: {
          fontWeight: 500, fontSize: 12,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.06em', color: '#8a8680',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...shared,
  palette: {
    mode: 'light',
    primary: { main: '#e8590c', light: '#ff6b2b', dark: '#d9480f', contrastText: '#ffffff' },
    secondary: { main: '#5a5652', light: '#8a8680', dark: '#1a1816' },
    background: { default: '#f5f5f0', paper: '#ffffff' },
    text: { primary: '#1a1816', secondary: '#5a5652', disabled: '#8a8680' },
    success: { main: '#2b8a3e', light: '#ebfbee', dark: '#1b6d2f' },
    warning: { main: '#e67700', light: '#fff9db', dark: '#b35c00' },
    error: { main: '#c92a2a', light: '#fff5f5', dark: '#a01d1d' },
    divider: 'rgba(26,24,22,0.10)',
    action: { hover: 'rgba(26,24,22,0.04)', selected: 'rgba(232,89,12,0.06)' },
  },
});

export const darkTheme = createTheme({
  ...shared,
  palette: {
    mode: 'dark',
    primary: { main: '#ff6b2b', light: '#ff8a50', dark: '#e8590c', contrastText: '#111110' },
    secondary: { main: '#a09a92', light: '#c4bfb8', dark: '#5a5652' },
    background: { default: '#111110', paper: '#1c1b1a' },
    text: { primary: '#eeede8', secondary: '#a09a92', disabled: '#5a5652' },
    success: { main: '#51cf66', light: '#1b3d22', dark: '#2b8a3e' },
    warning: { main: '#fcc419', light: '#3d3200', dark: '#e67700' },
    error: { main: '#ff6b6b', light: '#3d1515', dark: '#c92a2a' },
    divider: 'rgba(238,237,232,0.08)',
    action: { hover: 'rgba(238,237,232,0.04)', selected: 'rgba(255,107,43,0.08)' },
  },
});
