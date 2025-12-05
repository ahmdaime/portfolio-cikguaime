
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { EXTENSIONS, STUDENT_INNOVATIONS } from '../constants';

const Showcase: React.FC = () => {
  // Separate featured and regular extensions
  const featuredExtension = EXTENSIONS.find(ext => ext.isFeatured);
  const regularExtensions = EXTENSIONS.filter(ext => !ext.isFeatured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-dark via-indigo-900/10 to-dark pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Teachers Extensions Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Koleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Inovasi Digital</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Alat bantu digital yang direka khas untuk memudahkan tugas harian guru-guru di Malaysia.
            </p>
          </div>

          {/* Featured Card - Large Horizontal Layout */}
          {featuredExtension && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-colors hover:bg-white/10 hover:border-purple-500/30">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-auto md:min-h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 z-10 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 md:hidden" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${featuredExtension.gradient} opacity-20 mix-blend-overlay z-10`}></div>
                    <img
                      src={featuredExtension.image}
                      alt={featuredExtension.title}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      Terbaru
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${featuredExtension.gradient} shadow-lg`}>
                        {featuredExtension.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold">{featuredExtension.title}</h3>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {featuredExtension.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/10 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {featuredExtension.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {featuredExtension.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${featuredExtension.gradient}`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Impak</span>
                        <span className="font-bold text-xl text-white">{featuredExtension.stats}</span>
                      </div>
                      {featuredExtension.isInternal ? (
                        <Link
                          to={featuredExtension.link}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all duration-300"
                        >
                          Lihat Lanjut <ArrowUpRight className="w-5 h-5" />
                        </Link>
                      ) : (
                        <a
                          href={featuredExtension.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all duration-300"
                        >
                          Pasang Percuma <ArrowUpRight className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Regular Cards - 3 Column Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularExtensions.map((ext, index) => (
              <motion.div
                key={ext.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-full"
              >
                {/* Glass Card */}
                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-colors hover:bg-white/10 hover:border-white/20 flex flex-col">

                  {/* Image Header Area */}
                  {ext.image ? (
                    <div className="relative w-full h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                      <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${ext.gradient} opacity-20 mix-blend-overlay z-10`}></div>
                      <img
                        src={ext.image}
                        alt={ext.title}
                        className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      {/* Floating Icon over Image */}
                      <div className={`absolute bottom-4 left-4 z-20 p-3 rounded-xl bg-gradient-to-br ${ext.gradient} shadow-lg shadow-black/30 backdrop-blur-sm border border-white/10`}>
                        {ext.icon}
                      </div>
                    </div>
                  ) : (
                     // Fallback if no image (kept for safety, though we added images)
                    <div className="relative h-32 flex items-center justify-center">
                        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${ext.gradient} rounded-full blur-3xl opacity-20`}></div>
                         <div className={`p-4 rounded-2xl bg-gradient-to-br ${ext.gradient} shadow-lg relative z-10`}>
                            {ext.icon}
                          </div>
                    </div>
                  )}

                  <div className="p-6 pt-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold">{ext.title}</h3>
                      {ext.isInternal ? (
                        <Link
                          to={ext.link}
                          className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors"
                        >
                          <ArrowUpRight className="w-5 h-5 text-gray-300" />
                        </Link>
                      ) : (
                        <a
                          href={ext.link}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 text-gray-300" />
                        </a>
                      )}
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {ext.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/5 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      {ext.description}
                    </p>

                    <div className="space-y-3 mb-8 flex-grow">
                      {ext.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${ext.gradient}`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Impak</span>
                        <span className="font-semibold text-white">{ext.stats}</span>
                      </div>
                      {ext.isInternal ? (
                        <Link
                          to={ext.link}
                          className="flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                        >
                          Lihat Lanjut <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Link>
                      ) : (
                        <a
                          href={ext.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                        >
                          Pasang Percuma <ArrowUpRight className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Student Innovation Section */}
        <div>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-pink-300 text-sm font-medium mb-4 backdrop-blur-sm">
              Untuk Murid
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Ekosistem <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Pembelajaran Pintar</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dari AI personal hingga bank soalan digital, kami membina masa depan pendidikan yang lebih interaktif dan berkesan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDENT_INNOVATIONS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <a href={item.link} target="_blank" rel="noreferrer" className="block h-full">
                  <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden transition-colors hover:bg-white/10 hover:border-pink-500/30 flex flex-col">

                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                        {item.icon}
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-pink-300 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-xs mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 border border-white/5 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                       <span className="text-xs text-gray-400">{item.stats}</span>
                       <span className="text-xs font-semibold text-pink-400 flex items-center">
                         Akses <ArrowUpRight className="w-3 h-3 ml-1" />
                       </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Showcase;
