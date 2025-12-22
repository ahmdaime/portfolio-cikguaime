import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';
import ScrollIndicator from './ScrollIndicator';

const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-24 bg-premium bg-noise relative overflow-hidden border-t border-white/5">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-blue w-[600px] h-[600px] -top-48 -left-48 opacity-35" />
      <div className="gradient-orb gradient-orb-indigo w-[450px] h-[450px] bottom-1/4 -right-48 opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-20">
          <span className="text-blue-500 font-medium tracking-wider text-sm uppercase mb-4 block">Perjalanan</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 md:mb-6">
            4 Tahun Mengajar
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl font-light">
            Dari cikgu baru masa COVID sampai jadi developer tools pendidikan. Ini cerita saya.
          </p>
        </div>

        {/* Timeline using Grid instead of absolute positioning for better responsiveness */}
        <div className="grid gap-6 md:gap-12 relative">
          <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-white/10 hidden md:block"></div>

          {ACHIEVEMENTS.map((achievement, index) => (
            <motion.div
              key={achievement.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-[60px_1fr] gap-4 md:gap-8"
            >
              {/* Year Bubble */}
              <div className="hidden md:flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white font-bold z-10">
                  {achievement.year}
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-surface border border-white/10 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-white/20 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                  <div>
                    <div className="md:hidden inline-block px-2.5 py-1 bg-white/5 rounded-full text-[10px] sm:text-xs font-bold text-gray-300 mb-2 sm:mb-3 border border-white/10">
                      {achievement.year}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{achievement.title}</h3>
                  </div>
                  <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    Baca Refleksi <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                </div>

                <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {achievement.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 md:gap-3 text-gray-400 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator href="#testimonials" className="mt-12 md:mt-16" />
      </div>
    </section>
  );
};

export default Journey;
