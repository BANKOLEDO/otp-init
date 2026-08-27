import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import useTheme from '@mui/material/styles/useTheme';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useThemeMode } from '../../theme';

const nav = [
  { label: 'Home', path: '/', icon: <HomeIcon sx={{ fontSize: 18 }} /> },
  { label: 'Verify', path: '/verify', icon: <VerifiedUserIcon sx={{ fontSize: 18 }} /> },
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
  { label: 'Docs', path: '/docs', icon: <MenuBookIcon sx={{ fontSize: 18 }} /> },
];

const dot = (dark: boolean) => dark
  ? 'radial-gradient(circle, rgba(238,237,232,0.15) 1px, transparent 1px)'
  : 'radial-gradient(circle, rgba(26,24,22,0.15) 1px, transparent 1px)';

export function Header() {
  const { mode, toggle } = useThemeMode();
  const theme = useTheme();
  const isDark = mode === 'dark';
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
        px: { xs: 1.5, sm: 2.5 },
        pt: { xs: 1.5, sm: 2 },
        pb: open ? 0 : undefined,
        backgroundImage: dot(isDark),
        backgroundSize: '20px 20px',
        bgcolor: isDark ? '#0e0e0e' : '#ffffff',
      }}
    >
      <Box
        sx={{
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          height: 48,
          maxWidth: 1100,
          gap: 0.5,
          borderRadius: 999,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(12px)',
          px: { xs: 1.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            textDecoration: 'none',
            color: 'inherit',
            flexShrink: 0,
            mr: 0.5,
          }}
          component={RouterLink}
          to="/"
        >
          <Box
            sx={{
              width: 20, height: 20, borderRadius: '5px',
              bgcolor: 'primary.main', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <VerifiedUserIcon sx={{ fontSize: 12, color: '#fff' }} />
          </Box>
          <Typography
            variant="body2"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 500, letterSpacing: '-0.01em', fontSize: 12 }}
          >
            otp-Init
          </Typography>
        </Box>

        {/* Desktop links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5, flex: 1 }}>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.25 }} />
          {nav.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              size="small"
              startIcon={item.icon}
              sx={{
                color: loc.pathname === item.path ? 'primary.main' : 'text.secondary',
                fontSize: 13,
                px: loc.pathname === item.path ? 1.25 : 1.5,
                minHeight: 30,
                borderRadius: 999,
                bgcolor: loc.pathname === item.path
                  ? (t) => alpha(t.palette.primary.main, 0.08)
                  : 'transparent',
                '&:hover': { bgcolor: (t) => alpha(t.palette.primary.main, 0.04) },
                '& .MuiButton-startIcon': { '& > *': { fontSize: 16 } },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
          <IconButton onClick={toggle} size="small">
            {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
          <IconButton
            onClick={() => setOpen((o) => !o)}
            size="small"
            sx={{ display: { md: 'none' } }}
          >
            {open ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </IconButton>
        </Box>
      </Box>

      {/* Mobile slide-down sheet */}
      <Collapse in={open} timeout={200}>
        <Box
          sx={{
            mx: 'auto',
            mt: 1,
            maxWidth: 1100,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            p: 1.5,
            backdropFilter: 'blur(12px)',
          }}
        >
          {nav.map((item) => {
            const active = loc.pathname === item.path;
            return (
              <Box
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={() => setOpen(false)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textDecoration: 'none',
                  color: active ? 'primary.main' : 'text.primary',
                  bgcolor: active ? (t) => alpha(t.palette.primary.main, 0.06) : 'transparent',
                  fontWeight: 500,
                  fontSize: 14,
                  '&:hover': { bgcolor: (t) => alpha(t.palette.primary.main, 0.04) },
                }}
              >
                <Box sx={{ color: 'inherit', display: 'flex' }}>{item.icon}</Box>
                {item.label}
                <ChevronRightIcon sx={{ ml: 'auto', fontSize: 16, color: 'text.disabled' }} />
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}
