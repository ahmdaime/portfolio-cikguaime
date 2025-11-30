
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Video } from 'lucide-react';
import { MEDIA_CHANNELS } from '../constants';

// YouTube Icon Component
const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// TikTok Icon Component
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const MediaContent: React.FC = () => {
  return (
    <section id="media" className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-medium mb-4 backdrop-blur-sm">
              <Video className="w-4 h-4" />
              Video & Content
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Kreator <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400">Media Digital</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Menghasilkan kandungan video berkualiti untuk pendidikan dan komuniti sekolah melalui pelbagai platform digital.
            </p>
          </motion.div>
        </div>

        {/* Media Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {MEDIA_CHANNELS.map((channel, index) => (
            <motion.a
              key={channel.id}
              href={channel.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative block"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-red-500/10">

                {/* Gradient Header */}
                <div className={`relative h-32 bg-gradient-to-br ${channel.gradient} flex items-center justify-center overflow-hidden`}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
                  </div>

                  {/* Platform Icon */}
                  <div className="relative z-10 flex flex-col items-center">
                    {channel.platform === 'youtube' ? (
                      <YouTubeIcon className="w-16 h-16 text-white drop-shadow-lg" />
                    ) : (
                      <TikTokIcon className="w-14 h-14 text-white drop-shadow-lg" />
                    )}
                  </div>

                  {/* Play button overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Play className="w-6 h-6 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Badge */}
                  {channel.stats && (
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-gradient-to-r ${channel.gradient} text-white`}>
                      {channel.stats}
                    </span>
                  )}

                  {/* Title & Handle */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-pink-400 transition-all duration-300">
                        {channel.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-0.5">{channel.handle}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {channel.description}
                  </p>

                  {/* Platform Label */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {channel.platform === 'youtube' ? (
                        <>
                          <YouTubeIcon className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-gray-500 uppercase tracking-wider">YouTube</span>
                        </>
                      ) : (
                        <>
                          <TikTokIcon className="w-4 h-4 text-white" />
                          <span className="text-xs text-gray-500 uppercase tracking-wider">TikTok</span>
                        </>
                      )}
                    </div>
                    <span className="text-xs font-medium text-red-400 group-hover:text-red-300 flex items-center gap-1">
                      Lawati <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Ikuti untuk kandungan pendidikan terkini dan inspirasi digital
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaContent;
