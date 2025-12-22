import React from 'react';
import { motion } from 'framer-motion';
import { Download, PlayCircle, Users, Star, Package } from 'lucide-react';

const ExtensionsHero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                            INOVASI GURU MALAYSIA
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                                Guru Extension Hub
                            </h1>
                            <p className="mt-2 text-xl md:text-2xl text-gray-300 font-medium">
                                Penggunaan Extension untuk{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    Memudahkan Kerja Guru
                                </span>
                            </p>
                            <p className="mt-4 text-lg text-gray-400 max-w-xl">
                                3 Chrome Extension percuma yang membantu guru Malaysia mengisi kehadiran MOIES, PBD dalam IDME, dan mencetak laporan dalam satu mukasurat. Digunakan oleh lebih 10,000 guru.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#extension"
                                className="flex items-center justify-center gap-2 px-8 py-3 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 group"
                            >
                                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Muat Turun Percuma
                            </a>
                            <a
                                href="#bukti"
                                className="flex items-center justify-center gap-2 px-8 py-3 text-base font-bold text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                            >
                                <PlayCircle className="w-5 h-5" />
                                Lihat Bukti Keberkesanan
                            </a>
                        </div>

                        {/* Proof Strip */}
                        <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-300 font-semibold text-base sm:text-lg">
                                    <Users className="w-4 h-4 text-blue-400" />
                                    <span>10,700+</span>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-500">Guru Menggunakan</p>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-300 font-semibold text-base sm:text-lg">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span>5.0</span>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-500">Rating</p>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-gray-300 font-semibold text-base sm:text-lg">
                                    <Package className="w-4 h-4 text-green-400" />
                                    <span>3</span>
                                </div>
                                <p className="text-[10px] sm:text-xs text-gray-500">Extension</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-2">
                            Dibangunkan oleh guru SK Putrajaya Presint 5(1)
                        </p>
                    </motion.div>

                    {/* Visual / Screenshot Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900/50 backdrop-blur-sm aspect-video group">
                            <div className="absolute top-0 w-full h-8 bg-black/40 border-b border-white/5 flex items-center px-2 sm:px-4 gap-1.5 sm:gap-2">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
                                <div className="ml-2 sm:ml-4 px-2 sm:px-3 py-1 rounded bg-black/50 text-[8px] sm:text-[10px] text-gray-400 flex-1 max-w-[120px] sm:max-w-[200px] md:max-w-[250px] font-mono truncate">
                                    chrome://extensions
                                </div>
                            </div>
                            {/* Extension Cards Preview */}
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black p-8 pt-12">
                                <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                                    {['MOIES', 'IDME', 'OnePage'].map((name, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
                                            <div className="w-8 h-8 mx-auto bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                                                <span className="text-primary text-xs font-bold">{name[0]}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400 truncate">{name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 p-2 sm:p-4 bg-gradient-to-r from-gray-900 to-black border border-green-500/30 rounded-lg shadow-xl"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-gray-400">Status</p>
                                        <p className="text-xs sm:text-sm font-bold text-green-400">100% Percuma</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ExtensionsHero;
