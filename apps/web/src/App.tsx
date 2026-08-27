import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ToastProvider } from './components/Toast';
import { CookieConsent } from './components/CookieConsent';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Landing } from './pages/Landing';
import { Verify } from './pages/Verify';
import { Dashboard } from './pages/Dashboard';
import { Docs } from './pages/Docs';

export default function App() {
  return (
    <ToastProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ScrollToTop />
        <Header />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </Box>
        <Footer />
        <CookieConsent />
      </Box>
    </ToastProvider>
  );
}
