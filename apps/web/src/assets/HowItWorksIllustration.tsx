import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

export function HowItWorksIllustration() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const stroke = isDark ? 'rgba(238,237,232,0.15)' : 'rgba(26,24,22,0.1)';
  const fill = isDark ? 'rgba(238,237,232,0.04)' : 'rgba(26,24,22,0.03)';
  const accent = '#e8590c';
  const accentLight = isDark ? 'rgba(232,89,12,0.15)' : 'rgba(232,89,12,0.1)';
  const textCol = isDark ? 'rgba(238,237,232,0.6)' : 'rgba(26,24,22,0.5)';
  const msgBg = isDark ? 'rgba(37,211,102,0.12)' : 'rgba(37,211,102,0.08)';

  return (
    <Box sx={{ width: '100%', maxWidth: 440, mx: 'auto' }}>
      <svg viewBox="0 0 440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
        {/* Phone */}
        <rect x="10" y="60" width="100" height="180" rx="16" stroke={stroke} fill={fill} strokeWidth="1.5" />
        <rect x="22" y="80" width="76" height="12" rx="6" fill={stroke} opacity="0.5" />
        <rect x="22" y="102" width="76" height="56" rx="8" fill={stroke} opacity="0.3" />
        <rect x="32" y="170" width="56" height="10" rx="5" fill={accent} opacity="0.8" />
        <text x="60" y="178" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="500" fontFamily="DM Sans, sans-serif">+234****</text>

        {/* Dots connecting phone to server */}
        <line x1="116" y1="150" x2="174" y2="150" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="130" cy="150" r="3" fill={accent} opacity="0.6" />
        <circle cx="146" cy="150" r="3" fill={accent} opacity="0.4" />
        <circle cx="162" cy="150" r="3" fill={accent} opacity="0.2" />

        {/* Server */}
        <rect x="180" y="90" width="80" height="120" rx="12" stroke={stroke} fill={fill} strokeWidth="1.5" />
        <rect x="196" y="110" width="48" height="8" rx="4" fill={accent} opacity="0.6" />
        <rect x="196" y="126" width="48" height="8" rx="4" fill={stroke} opacity="0.4" />
        <rect x="196" y="142" width="48" height="8" rx="4" fill={stroke} opacity="0.4" />
        <circle cx="220" cy="170" r="14" stroke={accent} strokeWidth="1.5" fill={accentLight} />
        <path d="M215 170 L218 173 L226 165" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots connecting server to bot */}
        <line x1="266" y1="150" x2="324" y2="150" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="280" cy="150" r="3" fill={accent} opacity="0.6" />
        <circle cx="296" cy="150" r="3" fill={accent} opacity="0.4" />
        <circle cx="312" cy="150" r="3" fill={accent} opacity="0.2" />

        {/* Telegram bot */}
        <rect x="330" y="60" width="100" height="180" rx="16" stroke={stroke} fill={fill} strokeWidth="1.5" />
        <circle cx="380" cy="100" r="20" fill={accentLight} stroke={accent} strokeWidth="1.2" />
        <path d="M373 108 L380 90 L387 108" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="380" y1="90" x2="380" y2="112" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />

        {/* Message bubble */}
        <rect x="346" y="140" width="68" height="36" rx="8" fill={msgBg} stroke="rgba(37,211,102,0.3)" strokeWidth="1" />
        <text x="380" y="155" textAnchor="middle" fill={textCol} fontSize="7" fontFamily="DM Sans, sans-serif">OTP sent</text>
        <text x="380" y="167" textAnchor="middle" fill="#25d366" fontSize="9" fontWeight="600" fontFamily="monospace">B40FF5</text>

        {/* Labels */}
        <text x="60" y="265" textAnchor="middle" fill={textCol} fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="500">User</text>
        <text x="220" y="230" textAnchor="middle" fill={textCol} fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="500">Server</text>
        <text x="380" y="265" textAnchor="middle" fill={textCol} fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="500">Bot</text>

        {/* Arrow labels */}
        <text x="145" y="140" textAnchor="middle" fill={accent} fontSize="7" fontFamily="DM Sans, sans-serif" opacity="0.7">request</text>
        <text x="295" y="140" textAnchor="middle" fill={accent} fontSize="7" fontFamily="DM Sans, sans-serif" opacity="0.7">send OTP</text>

        {/* Decorative dots */}
        <circle cx="40" cy="40" r="2" fill={accent} opacity="0.15" />
        <circle cx="420" cy="40" r="2" fill={accent} opacity="0.15" />
        <circle cx="220" cy="290" r="2" fill={accent} opacity="0.15" />
      </svg>
    </Box>
  );
}
