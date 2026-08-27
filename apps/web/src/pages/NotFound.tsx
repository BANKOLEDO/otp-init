import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export function NotFound() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', px: 3, textAlign: 'center' }}>
      <Box>
        <Box sx={{
          width: 64, height: 64, borderRadius: '16px', bgcolor: 'action.hover',
          display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4,
        }}>
          <VerifiedUserIcon sx={{ fontSize: 32, color: 'text.disabled' }} />
        </Box>
        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' }, fontWeight: 500, letterSpacing: '-0.04em', mb: 1 }}>
          404
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 360, mx: 'auto' }}>
          This page doesn&apos;t exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ borderRadius: 999, px: 4, py: 1.25, fontWeight: 500, fontSize: 14 }}
        >
          Back to home
        </Button>
      </Box>
    </Box>
  );
}
