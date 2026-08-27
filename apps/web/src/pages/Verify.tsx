import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import { ChannelIcon } from '../assets/ChannelIcons';
import SendIcon from '@mui/icons-material/Send';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useTheme from '@mui/material/styles/useTheme';
import { useThemeMode } from '../theme';
import { api, type VerificationResponse } from '../services/api';
import { useToast } from '../components/Toast';
import { COUNTRIES } from '../data/countries';

const STEPS = ['Phone', 'Channel', 'Send', 'Verified'];
const COUNTDOWN_SECONDS = 300;

const CHANNELS = [
  {
    id: 'whatsapp' as const,
    label: 'WhatsApp',
    color: '#25d366',
    hoverBg: 'rgba(37,211,102,0.06)',
    desc: 'Instant delivery',
  },
  {
    id: 'telegram' as const,
    label: 'Telegram',
    color: '#0088cc',
    hoverBg: 'rgba(0,136,204,0.06)',
    desc: 'Fast & reliable',
  },
  {
    id: 'signal' as const,
    label: 'Signal',
    color: '#3a76f0',
    hoverBg: 'rgba(58,118,240,0.06)',
    desc: 'End-to-end encrypted',
  },
];

export function Verify() {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [countryAnchor, setCountryAnchor] = useState<null | HTMLElement>(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [country, setCountry] = useState(COUNTRIES.find(c => c.iso === 'NG') || COUNTRIES[0]);
  const [phone, setPhone] = useState('');
  const [channel, setChannel] = useState<'whatsapp' | 'telegram' | 'signal' | ''>('');
  const [verification, setVerification] = useState<VerificationResponse | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [channelStatus, setChannelStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    api.channels().then((chs) => {
      const map: Record<string, boolean> = {};
      chs.forEach((c) => { map[c.channel.toLowerCase()] = c.connected; });
      setChannelStatus(map);
    }).catch(() => {});
  }, []);

  const [countryPage, setCountryPage] = useState(0);
  const PAGE_SIZE = 30;

  const filteredCountries = useMemo(() => {
    if (countrySearch) {
      const q = countrySearch.toLowerCase();
      return COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.code.includes(q) || c.iso.toLowerCase().includes(q));
    }
    return COUNTRIES;
  }, [countrySearch]);

  const pagedCountries = useMemo(() => {
    return filteredCountries.slice(countryPage * PAGE_SIZE, (countryPage + 1) * PAGE_SIZE);
  }, [filteredCountries, countryPage]);

  const totalCountryPages = Math.ceil(filteredCountries.length / PAGE_SIZE);

  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const borderColor = mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const surfaceBg = mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const subtleText = mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';

  const clearTimers = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (step !== 2 || !verification) return;

    setCountdown(COUNTDOWN_SECONDS);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimers();
  }, [step, verification, clearTimers]);

  const handlePhoneContinue = useCallback(() => {
    const digits = phone.replace(/\D/g, '');
    if (!digits || digits.length < 4) {
      toast('Please enter a valid phone number (at least 4 digits)');
      return;
    }
    setStep(1);
  }, [phone]);

  const handleChannelSelect = useCallback(async () => {
    if (!channel || !phone) return;
    setLoading(true);
    try {
      const fullPhone = country.code + phone.replace(/\D/g, '');
      const res = await api.requestVerification(fullPhone, channel as 'whatsapp' | 'telegram' | 'signal');
      setVerification(res);
      setStep(2);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send verification';
      toast(msg);
    } finally {
      setLoading(false);
    }
  }, [channel, phone]);

  const handleVerifyCode = useCallback(async () => {
    if (!verification || !code) return;
    setVerifying(true);
    try {
      const res = await api.verifyCode(verification.verification_id, code);
      if (res.verified) {
        clearTimers();
        setVerified(true);
        setStep(3);
      } else {
        toast('Invalid code. Please try again.');
      }
    } catch {
      toast('Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  }, [verification, code, clearTimers, toast]);

  const handleBack = useCallback(() => {
    if (step > 0 && step < 3) setStep(step - 1);
  }, [step]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isDark = mode === 'dark';

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: isDark
        ? 'radial-gradient(circle, rgba(238,237,232,0.15) 1px, transparent 1px)'
        : 'radial-gradient(circle, rgba(26,24,22,0.15) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      bgcolor: isDark ? '#0e0e0e' : '#ffffff',
    }}>
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            border: `1px solid ${borderColor}`,
            background: surfaceBg,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <VerifiedUserIcon sx={{ color: '#e8590c', fontSize: 28 }} />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: '1.65rem',
            color: theme.palette.text.primary,
          }}
        >
          Test Verification
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            color: subtleText,
            mt: 0.5,
          }}
        >
          Test the otp-Init verification system with your phone number.
          <br />
          Receive an OTP via WhatsApp, Telegram, or Signal.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: '20px',
          p: 3,
          mb: 3,
          background: 'transparent',
        }}
      >
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{
            mb: 4,
            '& .MuiStepLabel-label': {
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: '0.78rem',
              color: subtleText,
            },
            '& .MuiStepLabel-label.Mui-active': {
              color: '#e8590c',
              fontWeight: 500,
            },
            '& .MuiStepLabel-label.Mui-completed': {
              color: '#25d366',
            },
            '& .MuiStepConnector-line': {
              minWidth: 32,
            },
            '& .MuiStepConnector-root': {
              top: 12,
            },
            '& .MuiStep-root': {
              px: 0,
            },
          }}
        >
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Fade in timeout={300}>
          <Box>
            {step === 0 && (
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    mb: 2,
                    color: theme.palette.text.primary,
                  }}
                >
                  Enter your phone number
                </Typography>
                <Box sx={{ mb: 3, display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={(e) => setCountryAnchor(e.currentTarget)}
                    endIcon={<ExpandMoreIcon />}
                    sx={{
                      borderRadius: '999px',
                      height: 48,
                      borderColor,
                      color: theme.palette.text.primary,
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      px: 2,
                      flexShrink: 0,
                      justifyContent: 'space-between',
                      bgcolor: surfaceBg,
                      '&:hover': { borderColor: '#e8590c', bgcolor: 'transparent' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Typography sx={{ fontSize: '1.15rem', lineHeight: 1 }}>{country.flag}</Typography>
                      <Typography sx={{ fontSize: '0.85rem' }}>{country.code}</Typography>
                    </Box>
                  </Button>
                  <Menu
                    anchorEl={countryAnchor}
                    open={Boolean(countryAnchor)}
                    onClose={() => { setCountryAnchor(null); setCountrySearch(''); }}
                    MenuListProps={{ dense: true }}
                    PaperProps={{
                      sx: {
                        maxHeight: 320, width: 280, mt: 1, borderRadius: 3,
                        border: `1px solid ${borderColor}`, bgcolor: 'background.paper',
                      },
                    }}
                  >
                    <Box sx={{ px: 1.5, pb: 1, pt: 0.5, position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }} onClick={(e) => e.stopPropagation()}>
                      <TextField
                        fullWidth
                        size="small"
                        autoFocus
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => { setCountrySearch(e.target.value); setCountryPage(0); }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ fontSize: 18, color: subtleText }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '999px', fontSize: 13,
                            bgcolor: surfaceBg,
                            '& fieldset': { border: 'none' },
                          },
                        }}
                      />
                    </Box>
                    {pagedCountries.map((c) => (
                      <MenuItem
                        key={c.iso + c.code}
                        selected={c.iso === country.iso && c.code === country.code}
                        onClick={() => { setCountry(c); setCountryAnchor(null); setCountrySearch(''); }}
                        sx={{ fontSize: 13, py: 1, display: 'flex', alignItems: 'center' }}
                      >
                        <Typography sx={{ mr: 1.5, fontSize: '1.1rem', lineHeight: 1 }}>{c.flag}</Typography>
                        <ListItemText
                          primary={c.name}
                          primaryTypographyProps={{ fontSize: 13, sx: { display: 'inline', verticalAlign: 'middle' } }}
                          sx={{ my: 0, flex: 'none' }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto', fontSize: 12 }}>{c.code}</Typography>
                      </MenuItem>
                    ))}
                    {pagedCountries.length === 0 && (
                      <Box sx={{ px: 2, py: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>No countries found</Typography>
                      </Box>
                    )}
                    {totalCountryPages > 1 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1.5, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Button
                          size="small"
                          disabled={countryPage === 0}
                          onClick={(e) => { e.stopPropagation(); setCountryPage(p => p - 1); }}
                          sx={{ fontSize: 11, textTransform: 'none', minWidth: 0, px: 1 }}
                        >
                          Prev
                        </Button>
                        <Typography variant="caption" color="text.disabled" sx={{ fontSize: 11 }}>
                          {countryPage + 1}/{totalCountryPages}
                        </Typography>
                        <Button
                          size="small"
                          disabled={countryPage >= totalCountryPages - 1}
                          onClick={(e) => { e.stopPropagation(); setCountryPage(p => p + 1); }}
                          sx={{ fontSize: 11, textTransform: 'none', minWidth: 0, px: 1 }}
                        >
                          Next
                        </Button>
                      </Box>
                    )}
                  </Menu>
                  <TextField
                    fullWidth
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/[^0-9]/g, '')); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') handlePhoneContinue(); }}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '999px',
                        height: 48,
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: '0.95rem',
                        bgcolor: surfaceBg,
                        '& fieldset': { border: `1px solid ${borderColor}` },
                        '&:hover fieldset': { borderColor: '#e8590c' },
                        '&.Mui-focused fieldset': { borderColor: '#e8590c' },
                      },
                    }}
                  />
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handlePhoneContinue}
                  disabled={!phone.trim() || phone.replace(/\D/g, '').length < 4}
                  sx={{
                    borderRadius: '999px',
                    py: 1.3,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    background: '#e8590c',
                    color: '#fff',
                    '&:hover': {
                      background: '#d4500a',
                    },
                    '&:disabled': {
                      background: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                      color: subtleText,
                    },
                  }}
                >
                  Continue
                  <ArrowForward sx={{ ml: 0.5, fontSize: 18 }} />
                </Button>
              </Box>
            )}

            {step === 1 && (
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    mb: 0.5,
                    color: theme.palette.text.primary,
                  }}
                >
                  Choose a channel
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.82rem',
                    color: subtleText,
                    mb: 2.5,
                  }}
                >
                  We'll send a verification code to your selected app
                </Typography>

                <Stack spacing={1.5} sx={{ mb: 3 }}>
                  {CHANNELS.map((ch) => (
                    <Card
                      key={ch.id}
                      elevation={0}
                      onClick={() => { if (channelStatus[ch.id] !== false) setChannel(ch.id); }}
                      sx={{
                        cursor: channelStatus[ch.id] === false ? 'not-allowed' : 'pointer',
                        borderRadius: '16px',
                        border: `1px solid ${channel === ch.id ? ch.color : borderColor}`,
                        background:
                          channel === ch.id ? ch.hoverBg : 'transparent',
                        opacity: channelStatus[ch.id] === false ? 0.4 : 1,
                        transition: 'all 0.15s ease',
                        '&:hover': channelStatus[ch.id] === false ? {} : {
                          borderColor: ch.color,
                          background: ch.hoverBg,
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          py: 2,
                          px: 2.5,
                          '&:last-child': { pb: 2 },
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background:
                              channel === ch.id
                                ? ch.color
                                : mode === 'dark'
                                ? 'rgba(255,255,255,0.06)'
                                : 'rgba(0,0,0,0.04)',
                            flexShrink: 0,
                          }}
                        >
                          <ChannelIcon channel={ch.id} size={20} color={channel === ch.id ? '#fff' : ch.color} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontFamily: '"DM Sans", sans-serif',
                              fontWeight: 500,
                              fontSize: '0.9rem',
                              color:
                                channel === ch.id
                                  ? ch.color
                                  : theme.palette.text.primary,
                            }}
                          >
                            {ch.label}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: '"DM Sans", sans-serif',
                              fontWeight: 400,
                              fontSize: '0.78rem',
                              color: channelStatus[ch.id] === false ? 'error.main' : subtleText,
                            }}
                          >
                            {channelStatus[ch.id] === false
                              ? 'Not configured'
                              : ch.id === 'whatsapp'
                              ? 'Instant delivery'
                              : ch.id === 'telegram'
                              ? 'Fast & reliable'
                              : 'End-to-end encrypted'}
                          </Typography>
                        </Box>
                        {channel === ch.id && (
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              background: ch.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <CheckCircle sx={{ fontSize: 14, color: '#fff' }} />
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Stack>

                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{
                      borderRadius: '999px',
                      py: 1.2,
                      px: 3,
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: '0.88rem',
                      textTransform: 'none',
                      borderColor: borderColor,
                      color: subtleText,
                      '&:hover': {
                        borderColor: 'rgba(255,255,255,0.15)',
                      },
                    }}
                  >
                    <ArrowBack sx={{ mr: 0.5, fontSize: 18 }} />
                    Back
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleChannelSelect}
                    disabled={!channel || loading || channelStatus[channel] === false}
                    startIcon={
                      loading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <SendIcon sx={{ fontSize: 18 }} />
                      )
                    }
                    sx={{
                      borderRadius: '999px',
                      py: 1.2,
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: '0.88rem',
                      textTransform: 'none',
                      background: '#e8590c',
                      color: '#fff',
                      '&:hover': { background: '#d4500a' },
                      '&:disabled': {
                        background: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                        color: subtleText,
                      },
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Code'}
                  </Button>
                </Stack>
              </Box>
            )}

            {step === 2 && verification && (
              <Box>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '20px',
                      border: `1px solid ${borderColor}`,
                      background: surfaceBg,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <SendIcon sx={{ color: '#e8590c', fontSize: 30 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {verification.delivery_status === 'sent'
                      ? 'Your verification code was sent'
                      : `Open ${CHANNELS.find((c) => c.id === channel)?.label} to get your code`}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 400,
                      color: subtleText,
                      mt: 0.5,
                    }}
                  >
                    {verification.delivery_status === 'sent'
                      ? 'Check your Signal messages for the code.'
                      : 'Use the link below to continue manually.'}
                  </Typography>
                </Box>

                {verification.delivery_status !== 'sent' && <Button
                  fullWidth
                  variant="contained"
                  onClick={() => window.open(verification.deep_link, '_blank')}
                  sx={{
                    borderRadius: '999px',
                    py: 1.3,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    background:
                      channel === 'whatsapp'
                        ? '#25d366'
                        : channel === 'telegram'
                        ? '#0088cc'
                        : '#3a76f0',
                    color: '#fff',
                    '&:hover': {
                      opacity: 0.9,
                    },
                    mb: 2,
                  }}
                >
                  Open{' '}
                  {CHANNELS.find((c) => c.id === channel)?.label}
                </Button>}

                <TextField
                  fullWidth
                  placeholder="Enter the code you received"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '999px',
                      height: 48,
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      letterSpacing: '0.15em',
                      fontWeight: 500,
                      bgcolor: surfaceBg,
                      '& fieldset': { border: `1px solid ${borderColor}` },
                      '&:hover fieldset': { borderColor: '#e8590c' },
                      '&.Mui-focused fieldset': { borderColor: '#e8590c' },
                    },
                    '& .MuiInputBase-input': { textAlign: 'center' },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  disabled={!code || code.length < 4 || verifying}
                  onClick={handleVerifyCode}
                  sx={{
                    borderRadius: '999px',
                    py: 1.3,
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    bgcolor: '#e8590c',
                    color: '#fff',
                    mb: 2,
                    '&:hover': { bgcolor: '#d14f08' },
                    '&.Mui-disabled': {
                      bgcolor: 'action.disabledBackground',
                      color: 'action.disabled',
                    },
                  }}
                >
                  {verifying ? 'Verifying...' : 'Verify Code'}
                </Button>

                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 400,
                      fontSize: '0.85rem',
                      color: subtleText,
                    }}
                  >
                    Waiting for verification...{' '}
                    <Box
                      component="span"
                      sx={{
                        color: countdown > 60 ? '#e8590c' : 'error.main',
                        fontWeight: 500,
                      }}
                    >
                      {formatCountdown(countdown)}
                    </Box>
                  </Typography>
                </Box>

                {countdown === 0 && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      onClick={() => {
                        setCountdown(COUNTDOWN_SECONDS);
                        handleChannelSelect();
                      }}
                      sx={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 400,
                        fontSize: '0.82rem',
                        textTransform: 'none',
                        color: '#e8590c',
                        '&:hover': { background: 'transparent' },
                      }}
                    >
                      Resend code
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            {step === 3 && (
              <Grow in timeout={500}>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'rgba(37,211,102,0.1)',
                      border: '1px solid rgba(37,211,102,0.2)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      animation: 'pulse-green 2s infinite',
                      '@keyframes pulse-green': {
                        '0%': {
                          boxShadow: '0 0 0 0 rgba(37,211,102,0.2)',
                        },
                        '70%': {
                          boxShadow: '0 0 0 16px rgba(37,211,102,0)',
                        },
                        '100%': {
                          boxShadow: '0 0 0 0 rgba(37,211,102,0)',
                        },
                      },
                    }}
                  >
                    <CheckCircle
                      sx={{
                        color: '#25d366',
                        fontSize: 44,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: '1.3rem',
                      color: theme.palette.text.primary,
                      mb: 1,
                    }}
                  >
                    You're Verified!
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 400,
                      color: subtleText,
                      mb: 3,
                    }}
                  >
                    Your phone number has been successfully verified.
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setStep(0);
                      setPhone('');
                      setChannel('');
                      setVerification(null);
                      setCode('');
                      setVerified(false);
                      setCountdown(COUNTDOWN_SECONDS);
                    }}
                    sx={{
                      borderRadius: '999px',
                      py: 1.3,
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      textTransform: 'none',
                      background: '#25d366',
                      color: '#fff',
                      '&:hover': { background: '#1fb85a' },
                    }}
                  >
                    Start New Verification
                  </Button>
                </Box>
              </Grow>
            )}
          </Box>
        </Fade>
      </Paper>

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="caption"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            color: subtleText,
            fontSize: '0.72rem',
          }}
        >
          Your phone number is used only for verification and is never shared.
        </Typography>
      </Box>
    </Container>
    </Box>
  );
}
