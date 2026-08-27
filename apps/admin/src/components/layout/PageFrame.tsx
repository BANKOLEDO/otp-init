import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { slideUp } from '../../utils/animations';

interface PageFrameProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  maxWidth?: number;
  children: React.ReactNode;
}

export function PageFrame({ eyebrow = 'Control center', title, description, actions, maxWidth = 1200, children }: PageFrameProps) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth,
        mx: 'auto',
        px: { xs: 2, sm: 3, lg: 4 },
        py: { xs: 3, sm: 4, lg: 5 },
        animation: `${slideUp} 0.5s ease-out both`,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
        spacing={2}
        sx={{ mb: { xs: 3, sm: 4.5 } }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', display: 'block', mb: 0.75 }}>
            {eyebrow}
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '1.9rem', sm: '2.35rem' }, fontWeight: 500, mb: 0.75 }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560 }}>
            {description}
          </Typography>
        </Box>
        {actions && <Box sx={{ flexShrink: 0 }}>{actions}</Box>}
      </Stack>
      {children}
    </Box>
  );
}

interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

export function MetricCard({ label, value, icon, color, delay = 0 }: MetricCardProps) {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 132,
        p: { xs: 2.25, sm: 2.75 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        bgcolor: 'background.paper',
        boxShadow: '0 8px 24px rgba(26,24,22,0.04)',
        animation: `${slideUp} 0.5s ease-out ${delay}ms both`,
        transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
        '&:hover': { transform: 'translateY(-3px)', borderColor: color, boxShadow: '0 14px 30px rgba(26,24,22,0.08)' },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ height: '100%' }}>
        <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: `${color}14`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{label}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 500, lineHeight: 1.2, overflowWrap: 'anywhere' }}>{value}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
