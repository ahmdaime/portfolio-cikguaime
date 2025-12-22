import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Clock, Eye, TrendingUp, BookOpen, Chrome, Lightbulb, PenTool, Sparkles, GraduationCap } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import ScrollIndicator from './ScrollIndicator';

// Category color mapping with gradient backgrounds
const categoryStyles: Record<string, { bg: string; text: string; border: string; gradient: string; icon: React.ReactNode }> = {
  Extension: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    gradient: 'from-blue-600/30 via-cyan-500/20 to-indigo-600/30',
    icon: <Chrome className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400/50" />
  },
  Tips: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
    gradient: 'from-green-600/30 via-emerald-500/20 to-teal-600/30',
    icon: <Lightbulb className="w-12 h-12 sm:w-16 sm:h-16 text-green-400/50" />
  },
  Inovasi: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    gradient: 'from-purple-600/30 via-violet-500/20 to-fuchsia-600/30',
    icon: <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400/50" />
  },
  Tutorial: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/20',
    gradient: 'from-orange-600/30 via-amber-500/20 to-yellow-600/30',
    icon: <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400/50" />
  },
  Perkongsian: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/20',
    gradient: 'from-pink-600/30 via-rose-500/20 to-red-600/30',
    icon: <PenTool className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400/50" />
  },
};

// Author info
const AUTHOR = {
  name: 'Cikgu Aime',
  avatar: 'https://i.imgur.com/NCiizgG.png',
};

// Reusable button component
const ViewAllButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a
    href="https://www.cikguaime.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Lihat semua artikel di blog Cikgu Aime"
    className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black transition-all font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black ${className}`}
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

// Featured Article Card (Large)
const FeaturedCard: React.FC<{ post: typeof BLOG_POSTS[0] }> = ({ post }) => {
  const styles = categoryStyles[post.category] || categoryStyles.Perkongsian;

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group block h-full"
    >
      <article className="relative h-full bg-surface border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500">
        {/* Thumbnail / Gradient Background */}
        <div className={`relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br ${styles.gradient}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Category Icon as Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            {styles.icon}
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-[5]"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}

          {/* Popular Badge */}
          {post.isPopular && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] sm:text-xs font-bold shadow-lg">
              <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Popular
            </div>
          )}

          {/* Category Badge */}
          <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${styles.bg} ${styles.text} ${styles.border} border text-[10px] sm:text-xs font-semibold backdrop-blur-sm`}>
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 text-[10px] sm:text-xs md:text-sm text-gray-400">
            <time dateTime={post.date} className="font-medium">
              {post.date}
            </time>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {post.readTime}
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {post.views}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight group-hover:text-purple-300 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
            {post.excerpt}
          </p>

          {/* Author & CTA */}
          <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-white/5">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={AUTHOR.avatar}
                alt={AUTHOR.name}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-white/10 object-cover"
              />
              <div>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-white">{AUTHOR.name}</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">Penulis</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Baca Artikel</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 transition-all">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </motion.a>
  );
};

// Regular Article Card (Compact)
const ArticleCard: React.FC<{ post: typeof BLOG_POSTS[0]; index: number }> = ({ post, index }) => {
  const styles = categoryStyles[post.category] || categoryStyles.Perkongsian;

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group block h-full"
    >
      <article className="relative h-full bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 flex flex-col">
        {/* Thumbnail / Gradient Background */}
        <div className={`relative h-32 sm:h-36 overflow-hidden bg-gradient-to-br ${styles.gradient} shrink-0`}>
          {/* Category Icon as Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="scale-75">{styles.icon}</div>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }} />

          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-[5]"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}

          {/* Popular Badge */}
          {post.isPopular && (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] font-bold">
              <TrendingUp className="w-2.5 h-2.5" />
              Popular
            </div>
          )}

          {/* Category Badge */}
          <div className={`absolute top-3 left-3 z-10 px-2 py-1 rounded-full ${styles.bg} ${styles.text} ${styles.border} border text-[10px] font-semibold backdrop-blur-sm`}>
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          {/* Meta Info */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 text-[10px] sm:text-xs text-gray-400">
            <time dateTime={post.date}>{post.date}</time>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Views */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-auto">
            <Eye className="w-3.5 h-3.5" />
            {post.views} views
          </div>
        </div>
      </article>
    </motion.a>
  );
};

const Blog: React.FC = () => {
  // Handle empty state
  if (!BLOG_POSTS || BLOG_POSTS.length === 0) {
    return (
      <section id="blog" className="py-16 md:py-24 bg-black relative">
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

  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  return (
    <section id="blog" className="py-16 md:py-24 bg-premium bg-noise relative overflow-hidden border-t border-white/5">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] -top-32 -right-32 opacity-40" />
      <div className="gradient-orb gradient-orb-indigo w-[400px] h-[400px] bottom-1/4 -left-48 opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 sm:mb-4">
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
              <span className="text-[10px] sm:text-xs font-medium text-purple-400 uppercase tracking-wider">Penulisan & Perkongsian</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              Insights EdTech & Pendidikan
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl font-light">
              Perkongsian pengalaman, tips dan tutorial untuk guru-guru Malaysia yang ingin maju ke hadapan dalam bidang pendidikan digital.
            </p>
          </motion.div>
          <div className="hidden md:block shrink-0">
            <ViewAllButton />
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Featured Article - Spans 2 columns on lg */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <FeaturedCard post={featuredPost} />
          </div>

          {/* Other Articles */}
          {otherPosts.map((post, index) => (
            <div key={post.id}>
              <ArticleCard post={post} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 sm:mt-12 text-center md:hidden">
          <ViewAllButton />
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator href="#media" className="mt-10 md:mt-16" />
      </div>
    </section>
  );
};

export default Blog;
