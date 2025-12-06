
import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, CheckCircle } from 'lucide-react';
import LazyImage from './LazyImage';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-900/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-md">
              {/* Glowing Background Blob behind image */}
              <div className="absolute top-10 left-10 right-10 bottom-0 bg-gradient-to-t from-purple-600 via-indigo-600 to-blue-600 blur-[80px] opacity-50 rounded-full"></div>
              
              {/* The Image */}
              <LazyImage
                src="https://i.imgur.com/9zglLn9.png"
                alt="Cikgu Aime - EdTech Innovator & Pendidik Digital Malaysia"
                className="relative z-10 w-full drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-in-out"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-10 -left-4 md:-left-10 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-2">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Disahkan</p>
                  <p className="text-gray-300 text-xs">Pembangun EdTech</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text & Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
              Siapa Cikgu Aime?
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Misi Saya: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Membina Inovasi Efektif
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-6 italic border-l-4 border-purple-500 pl-4">
              "Saya percaya bahawa teknologi tidak seharusnya membebankan, tetapi memudahkan jika digunakan dengan betul"
            </p>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Saya seorang guru Sejarah sekolah rendah yang meminati teknologi. Dalam masa satu bulan, saya berjaya membangunkan 3 Chrome Extension yang kini digunakan oleh ribuan guru di seluruh Malaysia.
            </p>

            {/* Feature Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mt-1">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Inovasi Guru</h4>
                  <p className="text-sm text-gray-400">Automasi kerja perkeranian & data.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400 mt-1">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Pembelajaran Murid</h4>
                  <p className="text-sm text-gray-400">Kuiz interaktif & menyeronokkan.</p>
                </div>
              </div>
            </div>

            {/* Stats Mini Row */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/10">
               <div>
                 <span className="block text-3xl font-bold text-white">3+</span>
                 <span className="text-sm text-gray-500 uppercase tracking-wider">Produk</span>
               </div>
               <div>
                 <span className="block text-3xl font-bold text-white">2025</span>
                 <span className="text-sm text-gray-500 uppercase tracking-wider">Wawasan</span>
               </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;