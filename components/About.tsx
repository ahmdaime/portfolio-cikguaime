import React from 'react';
import { motion } from 'framer-motion';
import { Code, Award, CheckCircle, Sparkles } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-premium bg-noise relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-indigo w-[500px] h-[500px] top-1/4 -right-32 opacity-40" />
      <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-1/4 -left-32 opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center max-w-5xl mx-auto">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[340px] md:h-[340px] lg:w-[400px] lg:h-[400px]">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-[spin_30s_linear_infinite]"></div>

              {/* Outer glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20 blur-2xl"></div>

              {/* Main image container */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/10 bg-gradient-to-br from-white/10 to-transparent p-1.5 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="https://i.imgur.com/NCiizgG.png"
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
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-black/90 border border-white/10 shadow-xl backdrop-blur-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm font-medium text-white whitespace-nowrap">Available for Projects</span>
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
              <span className="text-gray-500">Developer Malam Hari.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed font-light max-w-lg mx-auto md:mx-0">
              Lepas balik sekolah, saya spend masa bina tools yang saya sendiri perlukan. Kalau saya pening isi PBD, mesti cikgu lain pun sama. Jadi saya buat penyelesaiannya.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="group p-5 lg:p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">Developer</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Dah bina 7+ extension & tools untuk guru.</p>
              </div>

              <div className="group p-5 lg:p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-1.5">Pendidik</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Guru sekolah rendah sejak 2021.</p>
              </div>
            </div>

            {/* Achievement badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-white">TOP 150 Cikgu Juara Digital</span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <span className="text-gray-400">Putrajaya</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator href="#blog" className="mt-12 md:mt-16" />
      </div>
    </section>
  );
};

export default About;
