
import React from 'react';
import { createPortal } from 'react-dom';
import { Coffee } from 'lucide-react';

const BuyMeCoffee: React.FC = () => {
  // Render via portal to isolate from parent layout shifts
  return createPortal(
    <div
      className="fixed right-0 bottom-0 z-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      style={{ pointerEvents: 'none' }}
    >
      <a
        href="https://buymeacoffee.com/cikguaime"
        target="_blank"
        rel="noreferrer"
        className="group block animate-fade-in-up"
        style={{
          animationDelay: '1s',
          animationFillMode: 'both',
          pointerEvents: 'auto'
        }}
      >
        {/* Glow effect - only on desktop */}
        <div className="absolute inset-0 bg-[#FFDD00] rounded-full blur opacity-0 sm:opacity-40 sm:group-hover:opacity-60 transition-opacity duration-300" />

        <div className="relative flex items-center gap-2 bg-[#FFDD00] text-black px-5 py-3 rounded-full shadow-lg hover:shadow-[#FFDD00]/50 sm:hover:-translate-y-1 transition-all duration-300 font-display font-bold border-2 border-yellow-400">
          {/* Coffee icon - no animation on mobile */}
          <Coffee className="w-5 h-5 sm:animate-bounce-slow" fill="black" />
          <span className="hidden sm:inline">Belanja Kopi</span>
          <span className="sm:hidden">Sokong</span>
        </div>
      </a>
    </div>,
    document.body
  );
};

export default BuyMeCoffee;
