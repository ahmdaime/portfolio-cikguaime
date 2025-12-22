import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  href: string;
  className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ href, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <motion.a
        href={href}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll ke bawah"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      </motion.a>
    </div>
  );
};

export default ScrollIndicator;
