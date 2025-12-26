import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Chrome, CheckCircle2, Puzzle } from 'lucide-react';
import { EXTENSIONS, STUDENT_INNOVATIONS } from '../constants';
import ScrollIndicator from './ScrollIndicator';
import ExtensionCard from './showcase/ExtensionCard';
import AutoErphCard from './showcase/AutoErphCard';
import TvpssBookingCard from './showcase/TvpssBookingCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

const Showcase: React.FC = () => {
  return (
    <section id="projects" className="py-16 sm:py-24 relative bg-premium bg-noise overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-medium uppercase tracking-wider mb-4">
            <Puzzle className="w-3.5 h-3.5" />
            Projek & Tools
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 sm:mb-4 px-2">
            Bukan Sekadar Projek,{' '}
            <span className="text-gray-400">Tapi Penyelesaian.</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Tools yang dibina dari pengalaman sebenar mengajar. Setiap satu menyelesaikan masalah yang saya sendiri hadapi.
          </p>
        </motion.div>

        {/* Auto eRPH - Featured Hero Card */}
        <div className="mb-12 sm:mb-20">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 text-[10px] sm:text-xs font-bold uppercase rounded-full border border-purple-500/30">
              Featured
            </span>
            <span className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-400 text-[10px] sm:text-xs font-bold uppercase rounded-full border border-green-500/30">
              Terbaru
            </span>
          </div>

          <AutoErphCard />
          <TvpssBookingCard />
        </div>

        {/* Chrome Web Store Section */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8ab4f8]/20 flex items-center justify-center shrink-0">
              <Chrome className="w-4 h-4 sm:w-5 sm:h-5 text-[#8ab4f8]" />
            </div>
            <div>
              <p className="text-[#8ab4f8] text-xs sm:text-sm font-medium">Chrome Web Store</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                Extensions Untuk Guru
              </h3>
            </div>
          </div>
          <p className="text-[#9aa0a6] text-sm sm:text-base max-w-2xl mb-6 sm:mb-8">
            Koleksi extension Chrome yang dibina khas untuk memudahkan kerja-kerja guru. Pasang percuma, guna terus.
          </p>

          {/* Stats Bar */}
          <StaggerContainer className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#3c4043]" staggerDelay={0.1}>
            <StaggerItem direction="up">
              <div className="flex flex-col items-center sm:items-start gap-1 p-3 sm:p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 text-[#8ab4f8]">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">10,000+</span>
                </div>
                <span className="text-[#9aa0a6] text-[10px] sm:text-xs md:text-sm font-medium">Jumlah Pemasangan</span>
              </div>
            </StaggerItem>
            <StaggerItem direction="up">
              <div className="flex flex-col items-center sm:items-start gap-1 p-3 sm:p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">5.0</span>
                </div>
                <span className="text-[#9aa0a6] text-[10px] sm:text-xs md:text-sm font-medium">Purata Rating</span>
              </div>
            </StaggerItem>
            <StaggerItem direction="up">
              <div className="flex flex-col items-center sm:items-start gap-1 p-3 sm:p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">100%</span>
                </div>
                <span className="text-[#9aa0a6] text-[10px] sm:text-xs md:text-sm font-medium">Percuma Selamanya</span>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Extensions Grid - Chrome Store Style */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-16 sm:mb-24" staggerDelay={0.15}>
          {EXTENSIONS.map((ext) => (
            <StaggerItem key={ext.id} direction="up" distance={30}>
              <ExtensionCard ext={ext} index={0} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Student Innovations Section */}
        <div className="border-t border-[#3c4043] pt-12 sm:pt-24">
          <div className="mb-8 sm:mb-12">
            <span className="text-blue-500 font-medium tracking-wider text-xs sm:text-sm uppercase mb-3 sm:mb-4 block">Untuk Murid</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3">Bahan Pembelajaran</h3>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl">
              Bukan sekadar bina tools untuk guru, saya juga cipta bahan untuk murid. Sebab itulah tugas sebenar seorang guru.
            </p>
          </div>

          {/* SVG Filters for Repo Card */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter id="unopaq" y="-100%" height="300%" x="-100%" width="300%">
              <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 5 0"></feColorMatrix>
            </filter>
            <filter id="unopaq2" y="-100%" height="300%" x="-100%" width="300%">
              <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 10 0"></feColorMatrix>
            </filter>
            <filter id="unopaq3" y="-100%" height="300%" x="-100%" width="300%">
              <feColorMatrix values="1 0 0 1 0 0 1 0 1 0 0 0 1 1 0 0 0 0 2 0"></feColorMatrix>
            </filter>
          </svg>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rc-container group w-full"
            >
              <div className="rc-spin rc-spin-blur"></div>
              <div className="rc-spin rc-spin-intense"></div>
              <div className="rc-backdrop"></div>
              <div className="rc-card-border">
                <div className="rc-spin rc-spin-inside"></div>
              </div>

              <div className="rc-card">
                {/* Header */}
                <div className="rc-header">
                  <div className="rc-top-header">
                    <div className="rc-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-4 h-4 text-gray-400"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9Zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8ZM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.25.25 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25Z" /></svg>
                    </div>
                    <span className="rc-gh-icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                      </svg>
                    </span>
                    <div className="rc-repo">
                      <span className="rc-repo-owner">cikguaime</span>
                      <span className="rc-repo-slash">/</span>
                      <span className="rc-repo-name">learning-ecosystem</span>
                    </div>
                    <div className="rc-space"></div>
                  </div>

                  <div className="rc-btm-header">
                    <div className="rc-tab">
                      <div className="rc-tab-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z" /></svg></div>
                      <div className="rc-tab-text">Code</div>
                    </div>
                    <div className="rc-tab">
                      <div className="rc-tab-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" /><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" /></svg></div>
                      <div className="rc-tab-text">Issues</div>
                    </div>
                    <div className="rc-tab active">
                      <div className="rc-tab-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" /></svg></div>
                      <div className="rc-tab-text">Pull Requests <span className="ml-1 bg-white/20 text-white rounded-full px-1.5 py-0.5 text-[10px]">{STUDENT_INNOVATIONS.length}</span></div>
                    </div>
                  </div>
                </div>

                {/* Content (PR List) */}
                <div className="rc-content">
                  <div className="rc-prs">
                    {STUDENT_INNOVATIONS.map((item, index) => (
                      <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rc-pr group/item hover:bg-[#161b22] transition-colors cursor-pointer"
                      >
                        <div className="rc-checkbox group-hover/item:border-gray-500"></div>
                        <div className="rc-pr-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" /></svg>
                        </div>
                        <div className="rc-pr-text flex-1">
                          <div className="flex justify-between items-baseline">
                            <div className="rc-pr-title group-hover/item:text-blue-400 transition-colors">{item.title}</div>
                            <span className="text-xs text-gray-600 font-mono hidden sm:inline-block">#{1024 + index}</span>
                          </div>
                          <div className="rc-pr-desc">
                            {item.description}
                          </div>
                          <div className="flex gap-2 mt-3">
                            {item.tags?.map((tag, t) => (
                              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10">
          <ScrollIndicator href="#blog" className="mt-16" />
        </div>
      </div>
    </section>
  );
};

export default Showcase;
