import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import AttachMoney from '@mui/icons-material/AttachMoney';
import TrendingUp from '@mui/icons-material/TrendingUp';
import BarChart from '@mui/icons-material/BarChart';
import Cancel from '@mui/icons-material/Cancel';
import { adminApi, type BillingData } from '../services/api';
import { useToast } from '../components/Toast';
import { slideUp } from '../utils/animations';
import { MetricCard, PageFrame } from '../components/layout/PageFrame';

export function Billing() {
  const { toast } = useToast();
  const [billing, setBilling] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        setLoading(true);
        setBilling(await adminApi.billing());
      } catch (err: any) {
        toast(err.message || 'Failed to fetch billing data');
      } finally {
        setLoading(false);
      }
    };
    fetchBilling();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  const kpiCards = billing
    ? [
        { icon: <AttachMoney sx={{ fontSize: 22 }} />, label: 'MRR', value: `$${(billing.mrr ?? 0).toLocaleString()}` },
        { icon: <TrendingUp sx={{ fontSize: 22 }} />, label: 'ARR', value: `$${(billing.arr ?? 0).toLocaleString()}` },
        { icon: <BarChart sx={{ fontSize: 22 }} />, label: 'Avg Revenue', value: `$${(billing.avg_revenue_per_tenant ?? 0).toLocaleString()}` },
        { icon: <Cancel sx={{ fontSize: 22 }} />, label: 'Churn Rate', value: `${billing.churn_rate ?? 0}%` },
      ]
    : [];

  const planDist = billing?.plan_distribution;
  const planEntries = planDist ? Object.entries(planDist) as [string, number][] : [];
  const totalTenants = planEntries.reduce((s, [, c]) => s + c, 0);
  const transactions = billing?.transactions ?? [];

  return (
    <PageFrame eyebrow="Revenue" title="Billing" description="Track recurring revenue, plan mix, and the latest payment activity in one clear view.">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' }, gap: { xs: 2, sm: 2.5 } }}>
        {kpiCards.map((kpi, i) => (
          <Box key={kpi.label}>
            <MetricCard label={kpi.label} value={kpi.value} icon={kpi.icon} color={['#e8590c', '#25d366', '#0088cc', '#ef4444'][i]} delay={i * 80} />
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 2, sm: 2.5 }, mt: { xs: 2, sm: 2.5 } }}>
        <Box>
            <Card sx={{ height: '100%', animation: `${slideUp} 0.5s ease-out 320ms both` }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>Plan Distribution</Typography>
              {planEntries.map(([plan, count]) => {
                const pct = totalTenants > 0 ? (count / totalTenants) * 100 : 0;
                return (
                  <Box key={plan} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>{plan}</Typography>
                      <Typography variant="body2" color="text.secondary">{count} tenants</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      sx={{
                        height: 8, borderRadius: 4, bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: 'primary.main' },
                      }}
                    />
                  </Box>
                );
              })}
              {planEntries.length === 0 && (
                <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', py: 2 }}>No plan data</Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box>
            <Card sx={{ height: '100%', animation: `${slideUp} 0.5s ease-out 400ms both` }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>Recent Transactions</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {['Tenant', 'Amount', 'Date', 'Status'].map((h) => (
                        <TableCell key={h}>{h}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((tx, i: number) => (
                      <TableRow key={i} sx={{ '&:last-child td': { borderBottom: 'none' }, animation: `${slideUp} 0.4s ease-out ${480 + i * 40}ms both` }}>
                        <TableCell sx={{ fontWeight: 500 }}>{tx.tenant}</TableCell>
                        <TableCell>${tx.amount.toLocaleString()}</TableCell>
                        <TableCell color="text.secondary">{new Date(tx.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Box component="span" sx={{
                            fontWeight: 500, fontSize: '0.75rem', px: 1.5, py: 0.25,
                            borderRadius: 999,
                            bgcolor: tx.status === 'paid' ? 'success.light' : 'error.light',
                            color: tx.status === 'paid' ? 'success.main' : 'error.main',
                            textTransform: 'capitalize',
                          }}>
                            {tx.status}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {transactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} sx={{ textAlign: 'center', py: 3 }}>
                          <Typography variant="body2" color="text.disabled">No transactions yet</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </PageFrame>
  );
}
