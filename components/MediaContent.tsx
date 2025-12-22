import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Video } from 'lucide-react';
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

const MediaContent: React.FC = () => {
  return (
    <section id="media" className="py-24 bg-black relative">
      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="mb-16">
          <span className="text-red-500 font-medium tracking-wider text-sm uppercase mb-4 block">Content Creation</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Digital Creator
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl font-light">
            Creating educational content and tutorials for the Malaysian teacher community across multiple platforms.
          </p>
        </div>

        {/* Media Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {MEDIA_CHANNELS.map((channel, index) => (
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
              <div className="relative h-full bg-surface border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:-translate-y-1">

                {/* Minimal Header with Icon */}
                <div className="p-8 pb-0 flex justify-between items-start">
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${channel.platform === 'youtube' ? 'text-red-500' : 'text-white'}`}>
                    {channel.platform === 'youtube' ? <YouTubeIcon className="w-8 h-8" /> : <TikTokIcon className="w-8 h-8" />}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>

                <div className="p-8">
                  {/* Stats Badge */}
                  {channel.stats && (
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-4">
                      {channel.stats}
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                    {channel.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {channel.handle}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed font-light">
                    {channel.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator href="#journey" className="mt-12 md:mt-16" />
      </div>
    </section>
  );
};

export default MediaContent;
