import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Sparkles, ArrowRight } from 'lucide-react';
import { MEDIA_CHANNELS } from '../constants';
import ScrollIndicator from './ScrollIndicator';

// YouTube/TikTok Icons - Simplified
const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Get the personal account (Cikgu Aime) and other channels
const personalChannel = MEDIA_CHANNELS.find(c => c.id === 'ahmdaime-tiktok');
const otherChannels = MEDIA_CHANNELS.filter(c => c.id !== 'ahmdaime-tiktok');

const MediaContent: React.FC = () => {
  return (
    <section id="media" className="py-20 md:py-28 bg-premium bg-noise relative overflow-hidden border-t border-white/5">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-pink w-[500px] h-[500px] -top-32 -right-48 opacity-40" />
      <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-1/4 -left-32 opacity-30" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <span className="text-pink-500 font-medium tracking-wider text-sm uppercase mb-4 block">Kreator Digital</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 md:mb-6">
            Bukan Sekadar Mengajar
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl font-light">
            Selain mengajar di sekolah, saya juga aktif mencipta kandungan pendidikan dan tutorial untuk komuniti guru Malaysia.
          </p>
        </div>

        {/* Featured Personal Channel */}
        {personalChannel && (
          <motion.a
            href={personalChannel.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group block mb-6 md:mb-8"
          >
            <div className="relative bg-surface border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all duration-500">
              {/* TikTok Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center">
                  {/* Profile Image */}
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-pink-500/50 transition-colors">
                      <img
                        src="https://i.imgur.com/n8jx8DY.png"
                        alt="Cikgu Aime"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Platform Badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-black border border-white/20 flex items-center justify-center">
                      <TikTokIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-pink-500/30 text-[10px] sm:text-xs font-bold text-pink-400 uppercase tracking-wider">
                        Personal
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-medium text-gray-300">
                        {personalChannel.stats}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                      {personalChannel.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 md:mb-4">
                      {personalChannel.handle}
                    </p>

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-xl mb-4 md:mb-6">
                      {personalChannel.description}
                    </p>

                    <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-pink-400 transition-colors">
                      Ikuti di TikTok <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Play Button Overlay - Desktop */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pink-500 group-hover:border-pink-500 transition-all">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        )}

        {/* Other Channels Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {otherChannels.map((channel, index) => (
            <motion.a
              key={channel.id}
              href={channel.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block"
            >
              <div className={`relative h-full bg-surface border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1 ${
                channel.platform === 'youtube'
                  ? 'hover:border-red-500/30'
                  : 'hover:border-pink-500/30'
              }`}>
                {/* Platform-specific Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  channel.platform === 'youtube'
                    ? 'bg-gradient-to-br from-red-500/10 via-transparent to-transparent'
                    : 'bg-gradient-to-br from-cyan-500/10 via-pink-500/10 to-purple-500/10'
                }`} />

                <div className="relative z-10 p-5 sm:p-6 md:p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl border transition-colors ${
                      channel.platform === 'youtube'
                        ? 'bg-red-500/10 border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white'
                        : 'bg-white/5 border-white/10 text-white group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-pink-500'
                    }`}>
                      {channel.platform === 'youtube' ? <YouTubeIcon className="w-5 h-5 md:w-7 md:h-7" /> : <TikTokIcon className="w-5 h-5 md:w-7 md:h-7" />}
                    </div>

                    {/* Stats Badge */}
                    {channel.stats && (
                      <div className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border text-[10px] md:text-xs font-semibold ${
                        channel.platform === 'youtube'
                          ? 'bg-red-500/10 border-red-500/20 text-red-400'
                          : 'bg-white/5 border-white/10 text-gray-300'
                      }`}>
                        <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {channel.stats}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:text-gray-200 transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                    {channel.handle}
                  </p>

                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-4 md:mb-6">
                    {channel.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/5">
                    <span className={`text-xs md:text-sm font-medium transition-colors ${
                      channel.platform === 'youtube'
                        ? 'text-red-400 group-hover:text-red-300'
                        : 'text-pink-400 group-hover:text-pink-300'
                    }`}>
                      {channel.platform === 'youtube' ? 'Tonton Video' : 'Lihat Kandungan'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10">
          <ScrollIndicator href="#journey" className="mt-16 md:mt-20" />
        </div>
      </div>
    </section>
  );
};

export default MediaContent;
