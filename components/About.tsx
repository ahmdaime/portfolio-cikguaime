import React from 'react';
import { motion } from 'framer-motion';
import { Code, Award, CheckCircle, Sparkles, Zap, GraduationCap, Chrome, Lightbulb } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

// Floating badge data - positions adjusted for mobile
const floatingBadges = [
  { icon: Chrome, label: '3+ Extensions', position: '-top-2 left-4 sm:left-0 sm:-translate-x-1/4', delay: 0 },
  { icon: Lightbulb, label: '10+ Inovasi', position: '-top-2 right-4 sm:right-0 sm:translate-x-1/4', delay: 0.1 },
  { icon: Code, label: 'Full-Stack', position: 'top-1/4 -left-2 sm:-left-4 md:-left-8', delay: 0.2 },
  { icon: Zap, label: '10K+ Users', position: 'top-1/4 -right-2 sm:-right-4 md:-right-8', delay: 0.3 },
  { icon: Sparkles, label: 'TOP 150 CJD', position: 'bottom-1/4 -left-2 sm:-left-4 md:-left-8', delay: 0.4 },
  { icon: GraduationCap, label: 'Edufluencer', position: 'bottom-1/4 -right-2 sm:-right-4 md:-right-8', delay: 0.5 },
];

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-[100svh] flex flex-col bg-premium bg-noise relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-indigo w-[500px] h-[500px] top-1/4 -right-32 opacity-40" />
      <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-1/4 -left-32 opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[340px] md:h-[340px] lg:w-[400px] lg:h-[400px]">
              {/* Floating Badges */}
              {floatingBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: badge.delay + 0.3 }}
                    className={`absolute ${badge.position} z-20`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-black/80 border border-white/10 backdrop-blur-sm shadow-lg hover:border-white/20 hover:scale-105 transition-all cursor-default">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
                      <span className="text-[10px] sm:text-xs font-medium text-white whitespace-nowrap">{badge.label}</span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-[spin_30s_linear_infinite]"></div>

              {/* Outer glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20 blur-2xl"></div>

              {/* Main image container */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/10 bg-gradient-to-br from-white/10 to-transparent p-1.5 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/images/cikguaime-about.webp"
                    alt="Cikgu Aime"
                    className="w-full h-full object-cover object-top scale-105"
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/90 border border-white/10 shadow-xl backdrop-blur-sm">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">Available for Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text & Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center md:text-left"
          >
            {/* Section badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tentang Saya</span>
            </div>

            {/* Main heading */}
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-5 leading-tight">
              Cikgu Siang Hari,{' '}
              <span className="text-gray-500 line-through decoration-2">Developer</span>{' '}
              <span className="text-primary">Vibe Coder</span>
              <span className="text-gray-500"> Malam Hari.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed font-light max-w-lg mx-auto md:mx-0">
              Lepas balik sekolah, saya spend masa bina tools yang saya sendiri perlukan. Kalau saya pening isi PBD, mesti cikgu lain pun sama. Jadi saya buat penyelesaiannya.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="group p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl sm:rounded-2xl hover:border-indigo-500/30 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-1">Builder</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">Dah bina 7+ extension & tools untuk guru.</p>
              </div>

              <div className="group p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl sm:rounded-2xl hover:border-purple-500/30 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-1">Pendidik</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">Guru sekolah rendah sejak 2021.</p>
              </div>
            </div>

            {/* Achievement badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-full">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <span className="font-medium text-white">TOP 150 CJD</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-600"></span>
                <span className="text-gray-400">Putrajaya</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll Indicator - Fixed at bottom */}
      <div className="pb-6 md:pb-8 relative z-10">
        <ScrollIndicator href="#services" />
      </div>
    </section>
  );
};

export default About;
