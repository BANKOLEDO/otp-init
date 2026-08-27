import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
`;

export const fadeInUp = (delay = '0ms') => ({
  animation: `${slideUp} 0.5s ease-out ${delay} both`,
});

export const fadeInAnimation = (delay = '0ms') => ({
  animation: `${fadeIn} 0.4s ease-out ${delay} both`,
});
