import React from 'react';
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

const MockIcon = (props: any) => React.createElement('span', props);

vi.mock('@mui/icons-material/Menu', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Close', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/DarkMode', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/LightMode', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/VerifiedUser', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Home', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Dashboard', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/MenuBook', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/ChevronRight', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/RocketLaunch', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/OpenInNew', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/CheckCircle', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Cancel', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/ContentCopy', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Phone', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Chat', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Forum', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Verified', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Code', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Security', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Speed', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Shield', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Paid', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/ArrowForward', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/TrendingUp', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Timer', () => ({ default: MockIcon }));
vi.mock('@mui/icons-material/Refresh', () => ({ default: MockIcon }));

(globalThis as any).afterAll(() => {
  vi.restoreAllMocks();
});
