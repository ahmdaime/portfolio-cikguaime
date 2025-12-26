import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  href: string;
  className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ href, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <a
        href={href}
        className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors cursor-pointer px-4 py-2 min-h-[44px] min-w-[44px] animate-fade-in"
        aria-label="Scroll ke bawah"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-widest">Scroll</span>
        <div className="animate-bounce-slow">
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </a>
    </div>
  );
};

export default ScrollIndicator;
