import { useState, useEffect } from 'react';

interface UseScrollPositionOptions {
    threshold?: number;
}

/**
 * Hook to detect if page has scrolled past a threshold
 * @param options.threshold - Scroll position threshold (default: 20px)
 * @returns isScrolled - Boolean indicating if scrolled past threshold
 */
export const useScrollPosition = (options: UseScrollPositionOptions = {}) => {
    const { threshold = 20 } = options;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        // Check initial position
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
};

export default useScrollPosition;
