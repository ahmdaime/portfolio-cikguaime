import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';
import ScrollIndicator from './ScrollIndicator';
import Journey2025Modal from './Journey2025Modal';

const Journey: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="journey" className="min-h-[100svh] flex flex-col bg-premium bg-noise relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center py-12 md:py-16">
        {/* Header */}
        <div className="mb-10 md:mb-20">
          <span className="text-blue-500 font-medium tracking-wider text-sm uppercase mb-4 block">Perjalanan</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 md:mb-6">
            5 Tahun Mengajar
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl font-light">
            Dari cikgu baru masa COVID sampai jadi developer tools pendidikan. Ini cerita saya.
          </p>
        </div>

        {/* Timeline using Grid instead of absolute positioning for better responsiveness */}
        <div className="grid gap-6 md:gap-12 relative">
          <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-white/10 hidden md:block"></div>

          {ACHIEVEMENTS.map((achievement, index) => {
            const isLatest = achievement.year === '2025';

            return (
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
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold z-10 ${
                  isLatest
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/30'
                    : 'bg-surface border border-white/10 text-white'
                }`}>
                  {achievement.year}
                </div>
              </div>

              {/* Content Card */}
              <div className={`rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 transition-all group relative ${
                isLatest
                  ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 hover:border-yellow-500/70 shadow-lg shadow-yellow-500/10'
                  : 'bg-surface border border-white/10 hover:border-white/20'
              }`}>
                {/* TERBARU Badge for 2025 */}
                {isLatest && (
                  <div className="absolute -top-3 right-4 md:right-6 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-[10px] font-bold text-black uppercase tracking-wider shadow-lg">
                    Terbaru
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                  <div>
                    <div className={`md:hidden inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold mb-2 sm:mb-3 ${
                      isLatest
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}>
                      {achievement.year}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold ${isLatest ? 'text-yellow-400' : 'text-white'}`}>{achievement.title}</h3>
                  </div>
                  {achievement.link === 'modal' ? (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 text-xs md:text-sm font-medium text-yellow-400 group-hover:text-yellow-300 transition-colors"
                    >
                      Lihat Refleksi <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  ) : (
                    <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                      Baca Refleksi <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </a>
                  )}
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
          );
          })}
        </div>

      </div>

      {/* Scroll Indicator - Fixed at bottom */}
      <div className="pb-6 md:pb-8 relative z-10">
        <ScrollIndicator href="#testimonials" />
      </div>

      {/* 2025 Modal */}
      <Journey2025Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Journey;
