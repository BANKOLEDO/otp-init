import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export const revealSx = (visible: boolean, delay = '0ms') => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(24px)',
  transition: `opacity 0.6s ease-out ${delay}, transform 0.6s ease-out ${delay}`,
});
