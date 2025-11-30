import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';

const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-24 bg-dark relative overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Calendar className="w-4 h-4" />
            Perjalanan Profesional
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Pencapaian <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">2021 - 2024</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dari permulaan kerjaya hingga kepimpinan komuniti - perjalanan 4 tahun sebagai pendidik yang berinovasi.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden sm:block"></div>

            {/* Achievement cards */}
            <div className="space-y-12">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.div
                  key={achievement.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Year badge (center on desktop) */}
                  <div className="flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${achievement.color} shadow-lg`}>
                      <span className="text-white font-bold text-lg">{achievement.year}</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:border-white/20">
                      {/* Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`flex-1 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                          <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                            {achievement.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Award className="w-4 h-4" />
                            <span>Tahun {achievement.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className={`space-y-3 mb-6 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                        {achievement.highlights.map((highlight, idx) => (
                          <li key={idx} className={`flex items-start gap-3 text-gray-300 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 text-gradient bg-gradient-to-r ${achievement.color} bg-clip-text`} style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }} />
                            <span className="text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Read more link */}
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
                      >
                        Baca Refleksi Penuh
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Empty space for alignment on desktop */}
                  <div className="hidden md:block flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg mb-6">
            Ingin tahu lebih lanjut tentang perjalanan saya?
          </p>
          <a
            href="https://www.cikguaime.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            Kunjungi Blog Saya
            <ExternalLink className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
