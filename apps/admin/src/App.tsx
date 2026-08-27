import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ToastProvider } from './components/Toast';
import { AuthProvider } from './components/AuthProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Overview } from './pages/Overview';
import { Tenants } from './pages/Tenants';
import { Billing } from './pages/Billing';
import { Channels } from './pages/Channels';
import { Logs } from './pages/Logs';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </AuthProvider>
    </ToastProvider>
  );
}
