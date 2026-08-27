import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const dotPatternBg = 'radial-gradient(circle, #d4d4d4 1px, transparent 1px)';
const dotPatternBgDark = 'radial-gradient(circle, #333 1px, transparent 1px)';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundImage: { xs: dotPatternBg, dark: dotPatternBgDark },
        backgroundSize: '24px 24px',
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', py: { xs: 3, sm: 4 }, px: { xs: 2, sm: 3 }, textAlign: 'center' }}>
        <Typography variant="body2" color="text.disabled">
          &copy; {new Date().getFullYear()} otp-Init &middot; Open source verification infrastructure
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
          Built by{' '}
          <Link
            href="https://devolabanks.xyz"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ color: 'primary.main', fontWeight: 500 }}
          >
            dev_olabanks
          </Link>
          {' '}&middot;{' '}
          <Link
            href="https://github.com/devolabanks/otp-init"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ color: 'text.secondary', fontWeight: 500 }}
          >
            GitHub
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
