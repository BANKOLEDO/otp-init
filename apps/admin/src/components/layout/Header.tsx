import { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import useTheme from '@mui/material/styles/useTheme';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import MenuIcon from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Chat from '@mui/icons-material/Chat';
import ListAlt from '@mui/icons-material/ListAlt';
import Settings from '@mui/icons-material/Settings';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import Logout from '@mui/icons-material/Logout';
import { useAuth } from '../AuthProvider';
import { useThemeMode } from '../../theme/ThemeProvider';

const NAV_LINKS = [
  { label: 'Overview', path: '/', icon: <Dashboard sx={{ fontSize: 18 }} /> },
  { label: 'Tenants', path: '/tenants', icon: <People sx={{ fontSize: 18 }} /> },
  { label: 'Billing', path: '/billing', icon: <AttachMoney sx={{ fontSize: 18 }} /> },
  { label: 'Channels', path: '/channels', icon: <Chat sx={{ fontSize: 18 }} /> },
  { label: 'Logs', path: '/logs', icon: <ListAlt sx={{ fontSize: 18 }} /> },
  { label: 'Settings', path: '/settings', icon: <Settings sx={{ fontSize: 18 }} /> },
];

export function Header() {
  const theme = useTheme();
  const { mode, toggle: toggleMode } = useThemeMode();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { setApiKey } = useAuth();

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1100, px: { xs: 1.5, sm: 3 }, pt: 1.5 }}>
      <Box
        sx={{
          maxWidth: 1200, mx: 'auto',
          bgcolor: 'background.paper',
          border: '1px solid', borderColor: 'divider',
          borderRadius: 999,
          px: { xs: 2, sm: 3 }, py: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: '10px', bgcolor: 'primary.main',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <VerifiedUser sx={{ fontSize: 18, color: '#fff' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: '-0.02em', color: 'text.primary', display: { xs: 'none', sm: 'block' } }}>
              otp-Init
            </Typography>
          </RouterLink>
          <Chip label="Admin" size="small" sx={{ height: 20, fontSize: 10, fontWeight: 500, display: { xs: 'none', sm: 'flex' } }} />
        </Box>

        {isDesktop ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 0.75,
                    px: 2, py: 0.75, borderRadius: 999,
                    fontSize: 13, fontWeight: 500, color: isActive ? 'primary.main' : 'text.secondary',
                    bgcolor: isActive ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
            <Box sx={{ width: 1, height: 24, bgcolor: 'divider', mx: 0.75 }} />
            <Button
              onClick={toggleMode}
              sx={{ minWidth: 36, width: 36, height: 36, borderRadius: 999, p: 0, color: 'text.secondary' }}
            >
              {mode === 'dark' ? <LightMode sx={{ fontSize: 18 }} /> : <DarkMode sx={{ fontSize: 18 }} />}
            </Button>
            <Button
              onClick={() => setApiKey('')}
              sx={{ minWidth: 36, width: 36, height: 36, borderRadius: 999, p: 0, color: 'text.secondary' }}
            >
              <Logout sx={{ fontSize: 18 }} />
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Button
              onClick={toggleMode}
              sx={{ minWidth: 36, width: 36, height: 36, borderRadius: 999, p: 0, color: 'text.secondary' }}
            >
              {mode === 'dark' ? <LightMode sx={{ fontSize: 18 }} /> : <DarkMode sx={{ fontSize: 18 }} />}
            </Button>
            <Button
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ minWidth: 36, width: 36, height: 36, borderRadius: 999, p: 0, color: 'text.secondary' }}
            >
              {mobileOpen ? <Close sx={{ fontSize: 18 }} /> : <MenuIcon sx={{ fontSize: 18 }} />}
            </Button>
          </Box>
        )}
      </Box>

      {!isDesktop && (
        <Collapse in={mobileOpen}>
          <Box sx={{
            maxWidth: 1200, mx: 'auto', mt: 1,
            bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
            borderRadius: 4, overflow: 'hidden',
          }}>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    px: 3, py: 2,
                    fontSize: 14, fontWeight: 500, color: isActive ? 'primary.main' : 'text.primary',
                    bgcolor: isActive ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
            <Box sx={{ px: 3, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
              <Button
                fullWidth
                onClick={() => setApiKey('')}
                startIcon={<Logout sx={{ fontSize: 18 }} />}
                sx={{ justifyContent: 'flex-start', borderRadius: 2, color: 'text.secondary', fontSize: 14, fontWeight: 500, py: 1 }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
