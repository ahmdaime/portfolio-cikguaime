
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Rss, AlertCircle, Loader2 } from 'lucide-react';
import { FALLBACK_BLOG_POSTS } from '../constants';

interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  thumbnail?: string;
}

// Skeleton Loader Component
const BlogSkeleton: React.FC = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full animate-pulse">
    <div className="h-3 w-20 bg-white/10 rounded mb-3"></div>
    <div className="h-6 bg-white/10 rounded mb-3"></div>
    <div className="h-4 bg-white/10 rounded mb-2"></div>
    <div className="h-4 bg-white/10 rounded mb-2 w-3/4"></div>
    <div className="h-4 bg-white/10 rounded w-1/2"></div>
    <div className="h-4 w-24 bg-white/10 rounded mt-6"></div>
  </div>
);

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Attempt to fetch RSS feed converted to JSON
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const feedUrl = 'https://www.cikguaime.com/feeds/posts/default?alt=rss';
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`, {
          signal: AbortSignal.timeout(10000) // 10s timeout
        });

        if (!res.ok) {
          throw new Error('Gagal mengambil artikel terkini');
        }

        const data = await res.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const formattedPosts = data.items.slice(0, 3).map((item: any) => ({
            id: item.guid,
            title: item.title,
            excerpt: item.description.replace(/<[^>]+>/g, '').substring(0, 100) + '...',
            date: new Date(item.pubDate).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }),
            link: item.link
          }));
          setPosts(formattedPosts);
          setError(null);
        } else {
          // Use fallback if API returns no items
          setPosts(FALLBACK_BLOG_POSTS);
          setError('Menggunakan artikel contoh');
        }
      } catch (err) {
        console.error('Blog fetch error:', err);
        setPosts(FALLBACK_BLOG_POSTS);
        setError('Menggunakan artikel contoh');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

        {/* Error Message Banner */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-200 text-sm font-medium">
                Tidak dapat mengambil artikel terkini dari blog
              </p>
              <p className="text-yellow-300/70 text-xs mt-1">
                {error}. Artikel di bawah mungkin tidak yang terbaru.
              </p>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : (
          /* Blog Posts */
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
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
        )}
        
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
