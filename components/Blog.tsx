import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, FileText } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import ScrollIndicator from './ScrollIndicator';

// Reusable button component to follow DRY principle
const ViewAllButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a
    href="https://www.cikguaime.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Lihat semua artikel di blog Cikgu Aime"
    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black transition-all font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black ${className}`}
  >
    Semua Artikel <ArrowRight className="w-4 h-4" />
  </a>
);

// Empty state component
const EmptyState: React.FC = () => (
  <div className="text-center py-16">
    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
      <FileText className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">Tiada Artikel</h3>
    <p className="text-gray-400 mb-6">Artikel akan dikemaskini tidak lama lagi.</p>
    <ViewAllButton />
  </div>
);

const Blog: React.FC = () => {
  // Handle empty state
  if (!BLOG_POSTS || BLOG_POSTS.length === 0) {
    return (
      <section id="blog" className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <span className="text-purple-500 font-medium tracking-wider text-sm uppercase mb-4 block">
              Penulisan & Perkongsian
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-xl">
              Insights EdTech & Pendidikan
            </h2>
          </div>
          <EmptyState />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 bg-premium bg-noise relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] -top-32 -right-32 opacity-40" />
      <div className="gradient-orb gradient-orb-indigo w-[400px] h-[400px] bottom-1/4 -left-48 opacity-30" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-purple-500 font-medium tracking-wider text-sm uppercase mb-4 block">
              Penulisan & Perkongsian
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-xl">
              Insights EdTech & Pendidikan
            </h2>
          </div>
          <div className="hidden md:block">
            <ViewAllButton />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Baca artikel: ${post.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.3) }}
              className="group flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-3xl"
            >
              <article className="flex-1 p-8 rounded-3xl bg-surface border border-white/10 group-hover:border-white/20 group-focus:border-purple-500 transition-all duration-500 relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <time className="text-xs font-semibold tracking-wider text-gray-400 uppercase" dateTime={post.date}>
                      {post.date}
                    </time>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center -mr-2 group-hover:bg-white group-hover:text-black transition-colors text-white" aria-hidden="true">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed font-light line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5">
                    <span className="text-sm font-medium text-purple-400 group-hover:text-purple-300">
                      Baca Artikel
                    </span>
                  </div>
                </div>
              </article>
            </motion.a>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <ViewAllButton />
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator href="#media" className="mt-12 md:mt-16" />
      </div>
    </section>
  );
};

export default Blog;
