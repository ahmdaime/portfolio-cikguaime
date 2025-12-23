import React from 'react';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExtensionsComingSoon = () => {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"></div>
                <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-lg w-full text-center"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center"
                >
                    <Construction className="w-12 h-12 text-yellow-400" />
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-6"
                >
                    <Clock className="w-4 h-4" />
                    DALAM PEMBANGUNAN
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                >
                    Halaman Ini Masih Dalam{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        Proses Pembangunan
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed"
                >
                    Halaman Extension Hub akan dibuka untuk{' '}
                    <span className="text-white font-medium">Pertandingan Inovasi</span>.
                    Sila kembali semula nanti.
                </motion.p>

                {/* Coming Soon Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 mb-8"
                >
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Akan Datang</span>
                </motion.div>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Halaman Utama
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ExtensionsComingSoon;
