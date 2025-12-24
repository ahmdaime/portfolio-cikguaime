import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../constants';
import Magnetic from './Magnetic';
import ScrollIndicator from './ScrollIndicator';

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: string; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}<span className="text-secondary">{suffix}</span>
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black text-white py-20">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Badge / Loader - No opacity animation for faster LCP */}
          <div
            className="mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3 animate-fade-in"
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white/20 shadow-lg shadow-primary/20">
                <img
                  src="/images/cikguaime-hero.webp"
                  alt="Cikgu Aime"
                  className="w-full h-full object-cover"
                  width={44}
                  height={44}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>

            <div className="card-loader">
              <div className="loader">
                <p>building</p>
                <div className="words">
                  <span className="word">solutions</span>
                  <span className="word">trust</span>
                  <span className="word">value</span>
                  <span className="word">future</span>
                  <span className="word">solutions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Heading - Static text for optimal LCP */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            <span className="block">Solution-Oriented,</span>
            <span className="block text-gray-400">Not Award-Oriented.</span>
          </h1>

          {/* Subheading - CSS animation for faster LCP */}
          <p
            className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light px-2 sm:px-0 animate-fade-in-delayed"
          >
            Saya <span className="text-shine text-base sm:text-lg md:text-xl lg:text-2xl align-middle mx-1">Cikgu Aime</span>, saya bina inovasi pendidikan yang berguna untuk murid dan tools yang memudahkan kerja cikgu. Cikgu pening kepala? Carilah <span className="line-through text-gray-400">panadol</span> <span className="text-white font-medium">Cikgu Aime</span>.
          </p>

          {/* CTAs - CSS animation for faster LCP */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto animate-fade-in-delayed-2"
          >
            <Magnetic strength={0.4}>
              <a
                href="#projects"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/25 text-sm sm:text-base"
              >
                Lihat Tools
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                href="https://www.cikguaime.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                Baca Blog
              </a>
            </Magnetic>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-2xl"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-0.5 sm:mb-1 tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Marquee - States */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/5"
        >
          <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest text-center mb-3 sm:mb-4">
            Dipercayai guru-guru dari <span className="text-white font-semibold">16 negeri</span>
          </p>
          <div
            className="marquee-container relative"
            style={{ '--duration': '25s', '--gap': '0.75rem' } as React.CSSProperties}
          >
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            <div className="marquee-track flex gap-[var(--gap)]">
              {['Selangor', 'Terengganu', 'Kuala Lumpur', 'Labuan', 'Putrajaya', 'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 'Sarawak'].map((state, i) => (
                <span key={`a-${i}`} className="flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-gray-400 whitespace-nowrap hover:bg-white/10 hover:text-white transition-colors">
                  {state}
                </span>
              ))}
              {['Selangor', 'Terengganu', 'Kuala Lumpur', 'Labuan', 'Putrajaya', 'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 'Sarawak'].map((state, i) => (
                <span key={`b-${i}`} className="flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-gray-400 whitespace-nowrap hover:bg-white/10 hover:text-white transition-colors" aria-hidden="true">
                  {state}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-10">
        <ScrollIndicator href="#about" />
      </div>
    </section>
  );
};

export default Hero;
