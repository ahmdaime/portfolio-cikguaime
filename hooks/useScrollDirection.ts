import { useState, useEffect, useRef } from 'react';

type ScrollDirection = 'up' | 'down' | null;

interface UseScrollDirectionOptions {
  threshold?: number;
  throttleMs?: number;
}

/**
 * Hook to detect scroll direction with throttling for performance
 */
export const useScrollDirection = (options: UseScrollDirectionOptions = {}) => {
  const { threshold = 20, throttleMs = 150 } = options;
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  const lastScrollY = useRef(0);
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();

      // Throttle updates
      if (now - lastUpdateTime.current < throttleMs) return;

      const scrollY = window.scrollY;
      const atTop = scrollY < 50;

      // Only update if changed
      if (atTop !== isAtTop) setIsAtTop(atTop);

      // Only update direction if scroll exceeds threshold
      const diff = scrollY - lastScrollY.current;
      if (Math.abs(diff) > threshold) {
        const newDirection = diff > 0 ? 'down' : 'up';
        if (newDirection !== direction) setDirection(newDirection);
        lastScrollY.current = scrollY;
        lastUpdateTime.current = now;
      }
    };

    lastScrollY.current = window.scrollY;
    setIsAtTop(window.scrollY < 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, throttleMs, direction, isAtTop]);

  return { direction, isAtTop };
};

export default useScrollDirection;
