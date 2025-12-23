
import React from 'react';
import { Coffee } from 'lucide-react';

const BuyMeCoffee: React.FC = () => {
  return (
    <a
      href="https://buymeacoffee.com/cikguaime"
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50 group animate-fade-in-up"
      style={{ animationDelay: '1s', animationFillMode: 'both' }}
    >
      <div className="absolute inset-0 bg-[#FFDD00] rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>

      <div className="relative flex items-center gap-2 bg-[#FFDD00] text-black px-5 py-3 rounded-full shadow-lg hover:shadow-[#FFDD00]/50 sm:hover:-translate-y-1 transition-all duration-300 font-display font-bold border-2 border-yellow-400">
        <Coffee className="w-5 h-5 animate-bounce-slow" fill="black" />
        <span className="hidden sm:inline">Belanja Kopi</span>
        <span className="sm:hidden">Sokong</span>
      </div>
    </a>
  );
};

export default BuyMeCoffee;
