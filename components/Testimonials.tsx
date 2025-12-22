import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

// Card width + padding constants for animation calculation
// Card widths match Tailwind classes: w-[320px] sm:w-[380px] md:w-[420px]
// Padding (px-2=8px, px-3=12px, px-4=16px) x2 for both sides
const CARD_SLOT_MD = 420 + 32; // card + padding (16px * 2)
const CARD_SLOT_SM = 380 + 24; // card + padding (12px * 2)
const CARD_SLOT_MOBILE = 320 + 16; // card + padding (8px * 2)

// Testimonial Card Component
const TestimonialCard: React.FC<{
  text: string;
  name: string;
  role: string;
  avatar: string;
}> = ({ text, name, role, avatar }) => (
  <div className="flex-shrink-0 w-[320px] sm:w-[380px] md:w-[420px] bg-surface border border-white/10 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl hover:border-white/20 transition-all relative">
    <div className="absolute -top-4 left-6 sm:left-10 text-5xl sm:text-6xl text-white/5 font-serif">"</div>

    <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed font-light relative z-10 line-clamp-5">
      {text}
    </p>

    <div className="flex items-center pt-6 sm:pt-8 border-t border-white/5">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 mr-3 sm:mr-4 object-cover"
        loading="lazy"
      />
      <div>
        <h3 className="font-bold text-white text-sm sm:text-base">{name}</h3>
        <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  // Calculate total width of one set for seamless animation
  const count = TESTIMONIALS.length;
  const scrollWidth = CARD_SLOT_MD * count;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-premium bg-noise relative overflow-hidden border-t border-white/5">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-pink w-[500px] h-[500px] top-1/4 -left-48 opacity-35" />
      <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-1/3 -right-32 opacity-30" />

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <Quote className="w-10 h-10 md:w-12 md:h-12 text-white/20 mx-auto mb-4 md:mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 md:mb-6">Apa Kata Mereka</h2>
            <p className="text-gray-400 text-base md:text-lg">Feedback dari guru-guru yang dah guna tools ni.</p>
          </motion.div>
        </div>

        {/* Infinite Scroll Carousel */}
        <div className="relative">
          {/* Gradient Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />

          {/* Gradient Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="overflow-hidden py-4">
            <div
              className="flex hover:[animation-play-state:paused]"
              style={{
                animation: `scroll-testimonials 25s linear infinite`,
                ['--scroll-width' as string]: `${scrollWidth}px`,
              }}
            >
              {/* First Set */}
              {TESTIMONIALS.map((t) => (
                <div key={`first-${t.id}`} className="shrink-0 px-2 sm:px-3 md:px-4">
                  <TestimonialCard
                    text={t.text}
                    name={t.name}
                    role={t.role}
                    avatar={t.avatar}
                  />
                </div>
              ))}
              {/* Duplicate Set for Seamless Loop */}
              {TESTIMONIALS.map((t) => (
                <div key={`second-${t.id}`} className="shrink-0 px-2 sm:px-3 md:px-4">
                  <TestimonialCard
                    text={t.text}
                    name={t.name}
                    role={t.role}
                    avatar={t.avatar}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="container mx-auto px-6">
          <ScrollIndicator href="#contact" className="mt-10 md:mt-16" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;