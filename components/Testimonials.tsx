import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';
import LazyImage from './LazyImage';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-premium bg-noise relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-pink w-[500px] h-[500px] top-1/4 -left-48 opacity-35" />
      <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-1/3 -right-32 opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Quote className="w-12 h-12 text-white/20 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Apa Kata Mereka</h2>
          <p className="text-gray-400 text-lg">Feedback dari guru-guru yang dah guna tools ni.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-surface border border-white/10 p-10 rounded-3xl hover:border-white/20 transition-all relative"
            >
              <div className="absolute -top-4 left-10 text-6xl text-white/5 font-serif">"</div>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light relative z-10">
                {t.text}
              </p>

              <div className="flex items-center pt-8 border-t border-white/5">
                <LazyImage
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-white/10 mr-4 object-cover"
                  width={48}
                  height={48}
                />
                <div>
                  <h3 className="font-bold text-white text-base">{t.name}</h3>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;