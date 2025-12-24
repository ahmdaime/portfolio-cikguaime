import { useState, useEffect } from 'react';

/**
 * Hook to detect which section is currently active based on scroll position
 * @param sectionIds - Array of section IDs to track (without #)
 * @param offset - Offset from top of viewport to trigger active state (default: 100px)
 * @returns The ID of the currently active section
 */
export const useActiveSection = (
    sectionIds: string[] = ['home', 'about', 'services', 'projects', 'blog', 'contact'],
    offset: number = 100
): string => {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            // Find the section that is currently in view
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const section = document.getElementById(sectionIds[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sectionIds[i]);
                    return;
                }
            }

            // Default to first section if at top
            setActiveSection(sectionIds[0] || '');
        };

        // Check initial position
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeSection;
};

export default useActiveSection;
