import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Clock, MousePointerClick, Chrome, Puzzle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <section className="relative py-20 bg-black overflow-hidden border-y border-white/5">
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            INOVASI TERBARU
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Extension Hub:</span> Koleksi Extension Yang Memudahkan Kerja Guru
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
                                    <div className="text-xs text-gray-500">Pengguna Aktif</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">1,500+</div>
                                    <div className="text-xs text-gray-500">Jam Dijimat/Hari</div>
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

                    {/* Right - Extension Mockup */}
                    <div className="w-full lg:w-1/2">
                        <Link to="/extensions" className="block relative group cursor-pointer">
                            {/* Glow Effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Browser Extension Mockup */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Browser Window */}
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a] shadow-2xl">
                                    {/* Browser Header */}
                                    <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d0d] border-b border-white/5">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                        </div>
                                        <div className="flex-1 flex items-center justify-center">
                                            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-lg">
                                                <Puzzle className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs text-gray-400 font-medium">Extension Hub</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Extension Content */}
                                    <div className="p-4 sm:p-6">
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
                                                    className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                                                >
                                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${ext.color} flex items-center justify-center text-2xl mb-2 shadow-lg`}>
                                                        {ext.icon}
                                                    </div>
                                                    <span className="text-[10px] sm:text-xs text-white font-medium text-center">{ext.name}</span>
                                                    <span className="text-[9px] sm:text-[10px] text-gray-500">{ext.users} users</span>
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

                                {/* Floating Stats Badges - Hidden on very small screens, shown on sm+ */}
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
        </section>
    );
};

export default FeaturedInnovation;
