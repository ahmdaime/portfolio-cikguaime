import React, { Suspense, lazy } from 'react';
import { ArrowRight, Download, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

// Lazy load Three.js component to reduce initial bundle size
const FloatingShapes = lazy(() => import('./FloatingShapes'));

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Background - Lazy loaded */}
      <Suspense fallback={<div className="absolute inset-0 z-0" aria-hidden="true" />}>
        <FloatingShapes />
      </Suspense>
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
            🚀 Memperkasa Guru Malaysia
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Inovasi Pendidikan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Digital Masa Depan
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Saya Cikgu Aime, pendidik yang membangunkan solusi teknologi untuk memudahkan tugas guru-guru di Malaysia. Jimat masa, kurangkan beban.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-semibold shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left" />
              <span className="relative flex items-center">
                <Chrome className="mr-2 w-5 h-5" /> Pasang Percuma <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="https://www.cikguaime.com/"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-semibold hover:bg-white/10 transition-all backdrop-blur-sm flex items-center"
            >
              Baca Blog <span className="ml-2">📖</span>
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-dark flex items-center justify-center text-xs font-bold">G</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-dark flex items-center justify-center text-xs font-bold">S</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-dark flex items-center justify-center text-xs font-bold">A</div>
              </div>
              <span><strong className="text-white">2,400+</strong> guru aktif</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20"></div>
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-yellow-400">★★★★★</span>
              <span>Dipercayai guru seluruh Malaysia</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
      </motion.div>
    </section>
  );
};

export default Hero;