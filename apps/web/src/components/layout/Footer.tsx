import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GitHubIcon from '@mui/icons-material/GitHub';

const dot = (dark: boolean) => dark
  ? 'radial-gradient(circle, rgba(238,237,232,0.15) 1px, transparent 1px)'
  : 'radial-gradient(circle, rgba(26,24,22,0.15) 1px, transparent 1px)';

export function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box component="footer" sx={{
      borderTop: '1px solid', borderColor: 'divider',
      py: 5, mt: 'auto',
      backgroundImage: dot(isDark),
      backgroundSize: '20px 20px',
      bgcolor: isDark ? '#0e0e0e' : '#ffffff',
    }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 24, height: 24, borderRadius: '6px', bgcolor: '#e8590c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <VerifiedUserIcon sx={{ fontSize: 14, color: '#fff' }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                otp-Init
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: 'block', fontSize: 11 }}>
              Zero-cost, self-hosted OTP verification via messaging apps.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link
              href="https://github.com/BANKOLEDO/otp-init"
              target="_blank"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: 13, '&:hover': { color: 'text.primary' } }}
            >
              <GitHubIcon sx={{ fontSize: 16 }} />
              GitHub
            </Link>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
              built by{' '}
              <Link
                href="https://devolabanks.xyz"
                target="_blank"
                color="inherit"
                sx={{ color: 'text.secondary', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
              >
                dev_olabanks
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
