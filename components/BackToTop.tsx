import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';

const BackToTop: React.FC = () => {
    const isVisible = useScrollPosition({ threshold: 500 });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed left-4 z-40 p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black ${
                isVisible
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
            }`}
            style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
            aria-label="Kembali ke atas"
            aria-hidden={!isVisible}
        >
            <ArrowUp size={20} />
        </button>
    );
};

export default BackToTop;
