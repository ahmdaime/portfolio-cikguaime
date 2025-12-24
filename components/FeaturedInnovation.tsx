import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Clock, MousePointerClick, Chrome, Puzzle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollIndicator from './ScrollIndicator';
import Badge from './ui/Badge';

const FeaturedInnovation = () => {
    // Extension data
    const extensions = [
        {
            name: 'MOIES Helper',
            icon: '🎯',
            color: 'from-blue-500 to-cyan-500',
            users: '3,427'
        },
        {
            name: 'IDME PBD',
            icon: '📊',
            color: 'from-purple-500 to-pink-500',
            users: '2,852'
        },
        {
            name: 'PBD OnePage',
            icon: '📄',
            color: 'from-green-500 to-emerald-500',
            users: '4,485'
        }
    ];

    return (
        <section id="featured" className="min-h-[100svh] flex flex-col bg-black overflow-hidden border-y border-white/5">
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center py-12 md:py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <Badge variant="primary" size="md" pulse className="tracking-wide">
                            INOVASI TERBARU
                        </Badge>

                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            <span className="text-primary">Extension Hub:</span> Koleksi Extension Yang Memudahkan Kerja Guru
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            Satu solusi automasi lengkap untuk guru Malaysia. Jimat masa mengisi kehadiran, PBD, dan pengurusan data dengan satu klik.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-4 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">10,000+</div>
                                    <div className="text-xs text-gray-400">Pengguna Aktif</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">1,500+</div>
                                    <div className="text-xs text-gray-400">Jam Dijimat/Hari</div>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/extensions"
                            className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-black bg-white rounded-lg hover:bg-gray-200 transition-all group"
                        >
                            Lihat Inovasi Penuh
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Right - Extension Mockup - Chrome-style Browser */}
                    <div className="w-full lg:w-1/2 px-2 sm:px-0">
                        <Link to="/extensions" className="block relative group cursor-pointer">
                            {/* Glow Effect - Hidden on mobile to prevent overflow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block"></div>

                            {/* Chrome Browser Mockup */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="browser-mockup relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 max-w-full">
                                    {/* Chrome Tabs Header */}
                                    <div className="bg-[#202124] h-10 flex justify-between items-end pl-2 sm:pl-4">
                                        {/* Tab */}
                                        <div className="relative">
                                            <div className="tab-active bg-[#35363a] h-8 px-3 sm:px-4 rounded-t-lg flex items-center gap-2 relative">
                                                {/* Left curve */}
                                                <div className="absolute -left-2 bottom-0 w-2 h-2 bg-[#35363a]">
                                                    <div className="w-full h-full bg-[#202124] rounded-br-lg"></div>
                                                </div>
                                                <Chrome className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                <span className="text-[11px] sm:text-xs text-gray-300 font-medium truncate max-w-[80px] sm:max-w-[120px]">Extension Hub</span>
                                                <button className="text-gray-500 hover:text-gray-300 hover:bg-white/10 rounded text-xs px-1 transition-colors flex-shrink-0">✕</button>
                                                {/* Right curve */}
                                                <div className="absolute -right-2 bottom-0 w-2 h-2 bg-[#35363a]">
                                                    <div className="w-full h-full bg-[#202124] rounded-bl-lg"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Window Controls */}
                                        <div className="flex mb-2 mr-1">
                                            <button className="w-8 h-6 text-gray-400 hover:bg-white/10 text-xs transition-colors">─</button>
                                            <button className="w-8 h-6 text-gray-400 hover:bg-white/10 text-xs transition-colors">□</button>
                                            <button className="w-8 h-6 text-gray-400 hover:bg-red-500 hover:text-white text-xs transition-colors rounded-tr-lg">✕</button>
                                        </div>
                                    </div>

                                    {/* Chrome Address Bar */}
                                    <div className="bg-[#35363a] h-11 px-2 sm:px-3 flex items-center gap-1 sm:gap-2">
                                        <button className="text-gray-400 hover:bg-white/10 p-1 sm:p-1.5 rounded-full transition-colors hidden sm:block">
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                        </button>
                                        <button className="text-gray-500 p-1.5 opacity-50 cursor-not-allowed hidden sm:block">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        {/* URL Bar */}
                                        <div className="flex-1 min-w-0 flex items-center bg-[#202124] rounded-full px-3 sm:px-4 py-1.5 border border-transparent hover:border-white/10 focus-within:border-primary/50 transition-colors overflow-hidden">
                                            <Puzzle className="w-3.5 h-3.5 text-gray-500 mr-2 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm text-gray-300 truncate">chrome://extensions</span>
                                        </div>
                                        <button className="text-gray-400 hover:bg-white/10 p-1.5 rounded-full transition-colors hidden sm:block">
                                            <span className="text-lg">⋮</span>
                                        </button>
                                    </div>

                                    {/* Browser Content - Extensions */}
                                    <div className="bg-[#1a1a1a] p-4 sm:p-6">
                                        {/* Extension Grid */}
                                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                                            {extensions.map((ext, index) => (
                                                <motion.div
                                                    key={ext.name}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                    whileHover={{ scale: 1.05, y: -5 }}
                                                    className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
                                                >
                                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${ext.color} flex items-center justify-center text-2xl mb-2 shadow-lg`}>
                                                        {ext.icon}
                                                    </div>
                                                    <span className="text-[10px] sm:text-xs text-white font-medium text-center">{ext.name}</span>
                                                    <span className="text-[9px] sm:text-[10px] text-gray-400">{ext.users} users</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Chrome Web Store Badge */}
                                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                                            <Chrome className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                            <span className="text-[10px] sm:text-xs text-white font-semibold">Chrome Web Store</span>
                                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Stats Badges */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="hidden sm:block absolute top-4 -right-4 lg:-right-6 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-green-500/90 backdrop-blur rounded-lg shadow-lg"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                        <span className="text-[10px] sm:text-xs font-bold text-white">10,764 Users</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                                    className="hidden sm:block absolute bottom-8 -left-4 lg:-left-6 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-blue-500/90 backdrop-blur rounded-lg shadow-lg"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                        <span className="text-[10px] sm:text-xs font-bold text-white">1,522 jam/hari</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
                                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                                    className="hidden lg:block absolute top-1/2 -right-6 px-3 py-2 bg-orange-500/90 backdrop-blur rounded-lg shadow-lg"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <MousePointerClick className="w-3.5 h-3.5 text-white" />
                                        <span className="text-xs font-bold text-white">~2M klik dijimat</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator - Fixed at bottom */}
            <div className="pb-6 md:pb-8 relative z-10">
                <ScrollIndicator href="#projects" />
            </div>
        </section>
    );
};

export default FeaturedInnovation;
