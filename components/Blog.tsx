import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Rss } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-24 bg-dark relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-400">
              <Rss size={18} />
              <span className="text-sm font-semibold tracking-wider uppercase">Blog Terkini</span>
            </div>
            <h2 className="text-4xl font-display font-bold">
              Perkongsian <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Pendidikan</span>
            </h2>
          </div>
          <a
            href="https://www.cikguaime.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors mt-4 md:mt-0"
          >
            Lihat Semua Artikel <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors h-full flex flex-col"
            >
              <span className="text-xs text-indigo-400 mb-3 block">{post.date}</span>
              <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm font-medium text-indigo-400 mt-auto">
                Baca Selanjutnya <ExternalLink className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="https://www.cikguaime.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Lihat Semua Artikel <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
