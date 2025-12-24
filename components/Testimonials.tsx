import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

// Testimonial Card Component
const TestimonialCard: React.FC<{
  text: string;
  name: string;
  role: string;
  avatar: string;
  index: number;
}> = ({ text, name, role, avatar, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="bg-[#1e1e1e] border-[1.5px] border-[#2a2a2a] p-6 sm:p-8 rounded-2xl hover:border-primary/50 transition-all duration-200 relative"
  >
    <Quote className="w-8 h-8 text-primary/20 mb-4" />

    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
      "{text}"
    </p>

    <div className="flex items-center pt-4 border-t border-white/5">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/20 mr-3 sm:mr-4 object-cover"
        loading="lazy"
      />
      <div>
        <h3 className="font-bold text-white text-sm sm:text-base">{name}</h3>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-premium bg-noise relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
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

        {/* Static Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, index) => (
            <TestimonialCard
              key={t.id}
              text={t.text}
              name={t.name}
              role={t.role}
              avatar={t.avatar}
              index={index}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator href="#contact" className="mt-10 md:mt-16" />
      </div>
    </section>
  );
};

export default Testimonials;