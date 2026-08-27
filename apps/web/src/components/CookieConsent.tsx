import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const COOKIE_KEY = 'otp-init-cookies-accepted';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <Box sx={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1400,
      bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider',
      px: { xs: 2, sm: 4 }, py: 2.5,
      display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' },
      flexDirection: { xs: 'column', sm: 'row' }, gap: 2,
    }}>
      <Typography variant="body2" sx={{ flex: 1, color: 'text.secondary', lineHeight: 1.6 }}>
        We use cookies to ensure you get the best experience. otp-Init verifies users via WhatsApp, Telegram, and Signal — no SMS needed.
      </Typography>
      <Button
        variant="contained"
        onClick={() => { localStorage.setItem(COOKIE_KEY, '1'); setShow(false); }}
        sx={{ borderRadius: 999, px: 3, fontWeight: 500, fontSize: 13, flexShrink: 0 }}
      >
        Accept
      </Button>
    </Box>
  );
}
