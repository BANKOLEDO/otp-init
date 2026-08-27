import { useState, createContext, useContext, useCallback, type ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Severity = 'error' | 'success' | 'warning' | 'info';
interface Toast { id: number; msg: string; sev: Severity }
interface ToastCtx { toast: (msg: string, sev?: Severity) => void }
const Ctx = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(Ctx);

let _next = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((msg: string, sev: Severity = 'error') => {
    const id = _next++;
    setToasts((p) => [...p, { id, msg, sev }]);
  }, []);

  const close = (_: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setToasts((p) => p.slice(1));
  };

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      {toasts.map((t, i) => (
        <Snackbar
          key={t.id}
          open
          autoHideDuration={4000}
          onClose={close}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ top: `${72 + i * 60}px !important` }}
        >
          <Alert severity={t.sev} sx={{ borderRadius: 3, minWidth: 280 }}>
            {t.msg}
          </Alert>
        </Snackbar>
      ))}
    </Ctx.Provider>
  );
}
