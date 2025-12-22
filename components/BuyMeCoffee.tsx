
import React from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

const BuyMeCoffee: React.FC = () => {
  return (
    <motion.a
      href="https://buymeacoffee.com/cikguaime"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="absolute inset-0 bg-[#FFDD00] rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>
      
      <div className="relative flex items-center gap-2 bg-[#FFDD00] text-black px-5 py-3 rounded-full shadow-lg hover:shadow-[#FFDD00]/50 hover:-translate-y-1 transition-all duration-300 font-display font-bold border-2 border-yellow-400">
        <Coffee className="w-5 h-5 animate-bounce-slow" fill="black" />
        <span className="hidden sm:inline">Belanja Kopi</span>
        <span className="sm:hidden">Sokong</span>
      </div>
    </motion.a>
  );
};

export default BuyMeCoffee;
