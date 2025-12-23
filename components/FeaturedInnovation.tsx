import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedInnovation = () => {
    return (
        <section className="relative py-20 bg-black overflow-hidden border-y border-white/5">
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <div className="w-full md:w-1/2 space-y-6">
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

                        <Link
                            to="/extensions"
                            className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-black bg-white rounded-lg hover:bg-gray-200 transition-all group"
                        >
                            Lihat Inovasi Penuh
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="w-full md:w-1/2">
                        <Link to="/extensions" className="block relative group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 aspect-video flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-20 h-20 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                        <Zap className="w-10 h-10 text-yellow-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 w-32 bg-white/10 rounded mx-auto"></div>
                                        <div className="h-2 w-48 bg-white/10 rounded mx-auto"></div>
                                    </div>
                                </div>

                                {/* Floating Badges */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="absolute top-6 right-6 px-3 py-1 bg-black/80 backdrop-blur border border-white/20 rounded-lg text-xs font-mono text-green-400"
                                >
                                    Active: 1,500+ Users
                                </motion.div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedInnovation;
