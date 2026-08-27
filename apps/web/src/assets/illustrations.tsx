import React from 'react';
import Box from '@mui/material/Box';

type IllustrationName = 'messaging' | '2fa' | 'verified' | 'security' | 'connection' | 'message-sent';

export function Illustration({ name, sx }: { name: IllustrationName; sx?: object }) {
  const map: Record<IllustrationName, React.ReactNode> = {
    messaging: <MessagingIllustration />,
    '2fa': <TwoFaIllustration />,
    verified: <VerifiedIllustration />,
    security: <SecurityIllustration />,
    connection: <ConnectionIllustration />,
    'message-sent': <MessageSentIllustration />,
  };
  return <Box sx={{ lineHeight: 0, ...sx }}>{map[name]}</Box>;
}

function MessagingIllustration() {
  return (
    <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      {/* Phone frame */}
      <rect x="160" y="20" width="200" height="380" rx="24" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1.5"/>
      <rect x="220" y="28" width="80" height="4" rx="2" fill="var(--mui-palette-divider)"/>

      {/* Chat header */}
      <rect x="160" y="44" width="200" height="48" rx="0" fill="var(--mui-palette-background-paper)"/>
      <line x1="160" y1="92" x2="360" y2="92" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <circle cx="186" cy="68" r="14" fill="#25D366" opacity="0.15"/>
      <circle cx="186" cy="68" r="6" fill="#25D366"/>
      <rect x="208" y="60" width="60" height="6" rx="3" fill="var(--mui-palette-text-primary)" opacity="0.6"/>
      <rect x="208" y="72" width="40" height="4" rx="2" fill="#25D366" opacity="0.5"/>

      {/* Messages */}
      <rect x="226" y="108" width="118" height="32" rx="16" fill="#e8590c" opacity="0.1"/>
      <rect x="238" y="120" width="80" height="6" rx="3" fill="#e8590c" opacity="0.4"/>
      <rect x="238" y="130" width="50" height="4" rx="2" fill="#e8590c" opacity="0.25"/>

      <rect x="176" y="156" width="118" height="28" rx="14" fill="var(--mui-palette-divider)" opacity="0.5"/>
      <rect x="188" y="166" width="70" height="5" rx="2.5" fill="var(--mui-palette-text-primary)" opacity="0.15"/>
      <rect x="188" y="174" width="45" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.1"/>

      <rect x="226" y="200" width="118" height="32" rx="16" fill="#e8590c" opacity="0.1"/>
      <rect x="238" y="212" width="90" height="6" rx="3" fill="#e8590c" opacity="0.4"/>

      {/* OTP code bubble */}
      <rect x="216" y="248" width="128" height="40" rx="20" fill="#e8590c"/>
      <text x="280" y="273" textAnchor="middle" fontFamily="monospace" fontSize="14" fill="white" fontWeight="500" letterSpacing="3">4 8 2 9 1 6</text>

      {/* Typing indicator */}
      <rect x="176" y="304" width="80" height="28" rx="14" fill="var(--mui-palette-divider)" opacity="0.5"/>
      <circle cx="196" cy="318" r="3" fill="var(--mui-palette-text-primary)" opacity="0.2"/>
      <circle cx="210" cy="318" r="3" fill="var(--mui-palette-text-primary)" opacity="0.15"/>
      <circle cx="224" cy="318" r="3" fill="var(--mui-palette-text-primary)" opacity="0.1"/>

      {/* Input bar */}
      <rect x="160" y="348" width="200" height="52" rx="0" fill="var(--mui-palette-background-paper)"/>
      <line x1="160" y1="348" x2="360" y2="348" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <rect x="176" y="362" width="120" height="24" rx="12" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <circle cx="330" cy="374" r="14" fill="#e8590c" opacity="0.15"/>
      <path d="M326 374L333 374" stroke="#e8590c" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Side decorative elements */}
      <rect x="40" y="120" width="100" height="60" rx="12" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <rect x="52" y="134" width="50" height="5" rx="2.5" fill="var(--mui-palette-text-primary)" opacity="0.1"/>
      <rect x="52" y="146" width="76" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.06"/>
      <rect x="52" y="156" width="60" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.06"/>

      <rect x="380" y="80" width="100" height="60" rx="12" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <circle cx="404" cy="104" r="10" fill="#25D366" opacity="0.12"/>
      <path d="M400 104L403 107L408 100" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="422" y="100" width="40" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.12"/>
      <rect x="422" y="110" width="30" height="3" rx="1.5" fill="var(--mui-palette-text-primary)" opacity="0.06"/>

      <rect x="40" y="260" width="100" height="50" rx="12" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <circle cx="64" cy="280" r="8" fill="#0088cc" opacity="0.15"/>
      <rect x="80" y="277" width="40" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.1"/>
      <rect x="64" y="294" width="56" height="3" rx="1.5" fill="var(--mui-palette-text-primary)" opacity="0.06"/>
    </svg>
  );
}

function TwoFaIllustration() {
  return (
    <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      {/* Shield */}
      <path d="M200 40L310 90v120c0 80-50 140-110 160-60-20-110-80-110-160V90z" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1.5"/>
      <path d="M200 60L295 102v108c0 68-42 120-95 140-53-20-95-72-95-140V102z" fill="none" stroke="#e8590c" strokeWidth="1" opacity="0.3"/>

      {/* Lock icon in shield */}
      <rect x="178" y="140" width="44" height="36" rx="8" fill="#e8590c" opacity="0.1" stroke="#e8590c" strokeWidth="1.5"/>
      <path d="M188 140V128a12 12 0 0124 0v12" stroke="#e8590c" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="200" cy="156" r="4" fill="#e8590c"/>

      {/* Code dots below */}
      <rect x="130" y="250" width="140" height="40" rx="20" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <circle cx="158" cy="270" r="5" fill="#e8590c" opacity="0.6"/>
      <circle cx="178" cy="270" r="5" fill="#e8590c" opacity="0.8"/>
      <circle cx="198" cy="270" r="5" fill="#e8590c"/>
      <circle cx="218" cy="270" r="5" fill="#e8590c" opacity="0.8"/>
      <circle cx="238" cy="270" r="5" fill="#e8590c" opacity="0.6"/>

      {/* Side cards */}
      <rect x="20" y="100" width="80" height="50" rx="10" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <rect x="32" y="116" width="40" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.1"/>
      <rect x="32" y="126" width="56" height="3" rx="1.5" fill="var(--mui-palette-text-primary)" opacity="0.06"/>

      <rect x="300" y="120" width="80" height="50" rx="10" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <circle cx="324" cy="140" r="8" fill="#25D366" opacity="0.12"/>
      <path d="M320 140L323 143L328 137" stroke="#25D366" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="340" y="137" width="28" height="3" rx="1.5" fill="var(--mui-palette-text-primary)" opacity="0.1"/>
    </svg>
  );
}

function VerifiedIllustration() {
  return (
    <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      {/* Concentric circles */}
      <circle cx="200" cy="160" r="130" fill="#e8590c" opacity="0.04"/>
      <circle cx="200" cy="160" r="100" fill="#e8590c" opacity="0.06"/>
      <circle cx="200" cy="160" r="70" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>

      {/* Checkmark */}
      <circle cx="200" cy="160" r="28" fill="#e8590c" opacity="0.12"/>
      <path d="M188 160l8 8 18-18" stroke="#e8590c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Floating badges */}
      <rect x="60" y="260" width="100" height="36" rx="18" fill="var(--mui-palette-background-paper)" stroke="#25D366" strokeWidth="1" opacity="0.8"/>
      <circle cx="84" cy="278" r="6" fill="#25D366" opacity="0.2"/>
      <path d="M81 278l2 2 5-5" stroke="#25D366" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="96" y="275" width="48" height="5" rx="2.5" fill="#25D366" opacity="0.3"/>

      <rect x="240" y="260" width="100" height="36" rx="18" fill="var(--mui-palette-background-paper)" stroke="#e8590c" strokeWidth="1" opacity="0.8"/>
      <circle cx="264" cy="278" r="6" fill="#e8590c" opacity="0.15"/>
      <rect x="276" y="275" width="48" height="5" rx="2.5" fill="#e8590c" opacity="0.25"/>

      {/* Decorative lines */}
      <line x1="100" y1="80" x2="140" y2="100" stroke="var(--mui-palette-divider)" strokeWidth="1" strokeDasharray="4 4"/>
      <line x1="300" y1="80" x2="260" y2="100" stroke="var(--mui-palette-divider)" strokeWidth="1" strokeDasharray="4 4"/>
    </svg>
  );
}

function SecurityIllustration() {
  return (
    <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      {/* Shield */}
      <path d="M200 30L320 85v115c0 90-55 160-120 180-65-20-120-90-120-180V85z" fill="var(--mui-palette-background-paper)" stroke="#e8590c" strokeWidth="1.5"/>

      {/* Inner shield lines */}
      <path d="M200 55L298 98v95c0 75-45 130-98 148-53-18-98-73-98-148V98z" fill="none" stroke="var(--mui-palette-divider)" strokeWidth="1"/>

      {/* Lock */}
      <rect x="174" y="130" width="52" height="42" rx="10" fill="#e8590c" opacity="0.1" stroke="#e8590c" strokeWidth="1.5"/>
      <path d="M186 130V118a14 14 0 0128 0v12" stroke="#e8590c" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="200" cy="148" r="5" fill="#e8590c"/>

      {/* Server rack on side */}
      <rect x="340" y="100" width="40" height="120" rx="6" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <rect x="348" y="110" width="24" height="8" rx="4" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <circle cx="356" cy="114" r="2" fill="#2b8a3e" opacity="0.6"/>
      <rect x="348" y="126" width="24" height="8" rx="4" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <circle cx="356" cy="130" r="2" fill="#2b8a3e" opacity="0.6"/>
      <rect x="348" y="142" width="24" height="8" rx="4" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <circle cx="356" cy="146" r="2" fill="#e8590c" opacity="0.6"/>
      <rect x="348" y="158" width="24" height="8" rx="4" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <rect x="348" y="174" width="24" height="8" rx="4" fill="var(--mui-palette-divider)" opacity="0.4"/>

      {/* Left card */}
      <rect x="20" y="120" width="80" height="60" rx="10" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1"/>
      <rect x="32" y="136" width="40" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.1"/>
      <rect x="32" y="148" width="56" height="3" rx="1.5" fill="var(--mui-palette-text-primary)" opacity="0.06"/>
      <rect x="32" y="158" width="44" height="3" rx="1.5" fill="var(--mui-palette-text-primary)" opacity="0.06"/>

      {/* Connection lines */}
      <path d="M100 150H174" stroke="var(--mui-palette-divider)" strokeWidth="1" strokeDasharray="4 4"/>
      <path d="M252 150H340" stroke="var(--mui-palette-divider)" strokeWidth="1" strokeDasharray="4 4"/>
    </svg>
  );
}

function ConnectionIllustration() {
  return (
    <svg viewBox="0 0 520 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      {/* Left device */}
      <rect x="40" y="40" width="160" height="220" rx="20" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1.5"/>
      <rect x="90" y="52" width="60" height="4" rx="2" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <rect x="56" y="72" width="80" height="6" rx="3" fill="var(--mui-palette-text-primary)" opacity="0.08"/>
      <rect x="56" y="84" width="60" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.05"/>
      <rect x="56" y="108" width="128" height="24" rx="12" fill="#25D366" opacity="0.08"/>
      <rect x="68" y="116" width="80" height="4" rx="2" fill="#25D366" opacity="0.25"/>
      <rect x="56" y="144" width="128" height="24" rx="12" fill="#e8590c" opacity="0.08"/>
      <rect x="68" y="152" width="90" height="4" rx="2" fill="#e8590c" opacity="0.3"/>
      <rect x="56" y="180" width="128" height="24" rx="12" fill="var(--mui-palette-divider)" opacity="0.3"/>
      <rect x="68" y="188" width="70" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.1"/>

      {/* Connection pipe */}
      <line x1="200" y1="150" x2="320" y2="150" stroke="var(--mui-palette-divider)" strokeWidth="1.5" strokeDasharray="6 4"/>
      <circle cx="260" cy="150" r="16" fill="var(--mui-palette-background-paper)" stroke="#e8590c" strokeWidth="1.5"/>
      <circle cx="260" cy="150" r="6" fill="#e8590c" opacity="0.3"/>
      <circle cx="260" cy="150" r="3" fill="#e8590c"/>

      {/* Right device */}
      <rect x="320" y="40" width="160" height="220" rx="20" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1.5"/>
      <rect x="370" y="52" width="60" height="4" rx="2" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <rect x="336" y="72" width="80" height="6" rx="3" fill="var(--mui-palette-text-primary)" opacity="0.08"/>
      <rect x="336" y="84" width="60" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.05"/>
      <rect x="336" y="108" width="128" height="24" rx="12" fill="#0088cc" opacity="0.08"/>
      <rect x="348" y="116" width="80" height="4" rx="2" fill="#0088cc" opacity="0.25"/>
      <rect x="336" y="144" width="128" height="24" rx="12" fill="#e8590c" opacity="0.08"/>
      <rect x="348" y="152" width="90" height="4" rx="2" fill="#e8590c" opacity="0.3"/>
      <rect x="336" y="180" width="128" height="24" rx="12" fill="var(--mui-palette-divider)" opacity="0.3"/>
      <rect x="348" y="188" width="70" height="4" rx="2" fill="var(--mui-palette-text-primary)" opacity="0.1"/>
    </svg>
  );
}

function MessageSentIllustration() {
  return (
    <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      {/* Envelope */}
      <rect x="100" y="80" width="200" height="140" rx="16" fill="var(--mui-palette-background-paper)" stroke="var(--mui-palette-divider)" strokeWidth="1.5"/>
      <path d="M100 96l100 60 100-60" stroke="var(--mui-palette-divider)" strokeWidth="1" fill="none"/>

      {/* Checkmark on envelope */}
      <circle cx="200" cy="150" r="24" fill="#e8590c" opacity="0.12"/>
      <path d="M190 150l7 7 14-14" stroke="#e8590c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Send arrow */}
      <circle cx="310" cy="60" r="32" fill="#e8590c" opacity="0.08"/>
      <circle cx="310" cy="60" r="20" fill="#e8590c" opacity="0.15"/>
      <path d="M302 60h16M310 52l8 8-8 8" stroke="#e8590c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Status badges */}
      <rect x="80" y="260" width="100" height="32" rx="16" fill="var(--mui-palette-background-paper)" stroke="#25D366" strokeWidth="1"/>
      <circle cx="104" cy="276" r="6" fill="#25D366" opacity="0.2"/>
      <path d="M101 276l2 2 5-5" stroke="#25D366" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="116" y="273" width="48" height="4" rx="2" fill="#25D366" opacity="0.3"/>

      <rect x="220" y="260" width="100" height="32" rx="16" fill="var(--mui-palette-background-paper)" stroke="#0088cc" strokeWidth="1"/>
      <circle cx="244" cy="276" r="6" fill="#0088cc" opacity="0.15"/>
      <rect x="256" y="273" width="48" height="4" rx="2" fill="#0088cc" opacity="0.25"/>

      {/* Decorative dots */}
      <circle cx="60" cy="120" r="3" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <circle cx="50" cy="140" r="2" fill="var(--mui-palette-divider)" opacity="0.3"/>
      <circle cx="340" cy="180" r="3" fill="var(--mui-palette-divider)" opacity="0.4"/>
      <circle cx="350" cy="200" r="2" fill="var(--mui-palette-divider)" opacity="0.3"/>
    </svg>
  );
}
