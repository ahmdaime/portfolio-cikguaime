import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, MousePointer2, FileText, CheckCircle2, X, Users, Printer, FileStack, Zap } from 'lucide-react';

const ProblemSection = () => {
    const [activeExtension, setActiveExtension] = useState(0);

    const painPoints = [
        {
            icon: <Clock className="w-6 h-6 text-red-400" />,
            title: 'Kehadiran MOIES Lambat',
            desc: 'Guru perlu klik sebab dan kategori ketidakhadiran satu persatu untuk setiap murid. Kalau 10 murid tak hadir, 20+ klik diperlukan.'
        },
        {
            icon: <MousePointer2 className="w-6 h-6 text-orange-400" />,
            title: 'PBD IDME Memenatkan',
            desc: 'Guru yang mengajar banyak kelas perlu mengisi markah PBD beratus murid. Setiap murid memerlukan beberapa klik.'
        },
        {
            icon: <FileText className="w-6 h-6 text-yellow-400" />,
            title: 'Laporan PBD Banyak Mukasurat',
            desc: 'Laporan PBD standard mengambil 5-6 mukasurat. Bayangkan cetak untuk 30+ murid - beratus helai kertas terbuang.'
        },
        {
            icon: <AlertTriangle className="w-6 h-6 text-pink-400" />,
            title: 'Masa Terbuang Sia-sia',
            desc: 'Kerja perkeranian berulang ini mengambil masa berharga yang sepatutnya digunakan untuk mengajar dan membimbing murid.'
        }
    ];

    const extensionComparisons = [
        {
            name: 'MOIES Kehadiran Helper',
            icon: <Users className="w-5 h-5" />,
            color: 'blue',
            without: {
                title: 'Tanpa Extension',
                steps: [
                    'Buka sistem MOIES',
                    'Pilih kelas dari senarai',
                    'Cari murid yang tidak hadir',
                    'Klik butang "Tidak Hadir"',
                    'Pilih sebab dari dropdown',
                    'Pilih kategori ketidakhadiran',
                    'Tunggu sistem loading',
                    'Ulang langkah 3-7 untuk SETIAP murid'
                ],
                time: '10-15 minit',
                pain: 'Untuk 10 murid tidak hadir = 70+ klik manual'
            },
            with: {
                title: 'Dengan Extension',
                steps: [
                    'Buka sistem MOIES seperti biasa',
                    'Klik ikon extension',
                    'Pilih sebab & kategori (sekali sahaja)',
                    'Tekan butang "Mula"',
                    'Extension isi semua secara automatik!'
                ],
                time: '30 saat',
                benefit: 'Semua murid diisi serentak, tanpa klik berulang'
            },
            savings: '95% lebih pantas'
        },
        {
            name: 'IDME PBD Helper',
            icon: <FileStack className="w-5 h-5" />,
            color: 'purple',
            without: {
                title: 'Tanpa Extension',
                steps: [
                    'Buka sistem IDME',
                    'Pilih subjek dan kelas',
                    'Scroll cari nama murid',
                    'Klik pada nama murid',
                    'Pilih tahap penguasaan (TP)',
                    'Klik butang simpan',
                    'Tunggu loading',
                    'Ulang langkah 3-7 untuk SETIAP murid',
                    'Untuk 5 kelas = ulang 150+ kali'
                ],
                time: '20-30 minit sekelas',
                pain: '5 kelas × 30 murid = 150 murid, 600+ klik!'
            },
            with: {
                title: 'Dengan Extension',
                steps: [
                    'Buka sistem IDME seperti biasa',
                    'Klik ikon extension',
                    'Pilih TP yang dikehendaki',
                    'Tekan "Apply Semua"',
                    'Semua markah terisi automatik!'
                ],
                time: '1-2 minit sekelas',
                benefit: 'Boleh set TP berbeza untuk murid tertentu dengan mudah'
            },
            savings: '90% lebih pantas'
        },
        {
            name: 'PBD OnePage',
            icon: <Printer className="w-5 h-5" />,
            color: 'green',
            without: {
                title: 'Tanpa Extension',
                steps: [
                    'Buka laporan PBD murid',
                    'Laporan memaparkan 5-6 mukasurat',
                    'Tekan Print untuk setiap murid',
                    '30 murid × 5 mukasurat = 150 helai',
                    'Kos kertas & dakwat yang tinggi',
                    'Fail murid jadi tebal',
                    'Susah nak simpan dan susun'
                ],
                time: '150-180 helai kertas',
                pain: 'Kos kertas ~RM15-20 untuk satu kelas sahaja'
            },
            with: {
                title: 'Dengan Extension',
                steps: [
                    'Buka laporan PBD seperti biasa',
                    'Klik ikon extension',
                    'Laporan automatik jadi 1 mukasurat',
                    '30 murid × 1 mukasurat = 30 helai sahaja',
                    'Jimat 80% kertas dan dakwat!'
                ],
                time: '30 helai kertas sahaja',
                benefit: 'Semua maklumat sama, format lebih kemas'
            },
            savings: '80% jimat kertas'
        }
    ];

    const currentExt = extensionComparisons[activeExtension];
    const colorClasses = {
        blue: {
            bg: 'bg-blue-500',
            bgLight: 'bg-blue-500/10',
            border: 'border-blue-500/30',
            text: 'text-blue-400'
        },
        purple: {
            bg: 'bg-purple-500',
            bgLight: 'bg-purple-500/10',
            border: 'border-purple-500/30',
            text: 'text-purple-400'
        },
        green: {
            bg: 'bg-green-500',
            bgLight: 'bg-green-500/10',
            border: 'border-green-500/30',
            text: 'text-green-400'
        }
    };
    const colors = colorClasses[currentExt.color as keyof typeof colorClasses];

    return (
        <section id="masalah" className="py-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Masalah Sebenar Guru Malaysia
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Sistem KPM memerlukan banyak klik manual. Extension ini dicipta untuk menyelesaikan masalah tersebut.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="mb-4 bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center">
                                {point.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{point.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Extension-specific Comparison */}
                <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Lihat Perbezaan Untuk Setiap Extension
                    </h3>

                    {/* Extension Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {extensionComparisons.map((ext, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveExtension(index)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                                    activeExtension === index
                                        ? `${colorClasses[ext.color as keyof typeof colorClasses].bg} text-white shadow-lg`
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {ext.icon}
                                <span className="hidden sm:inline">{ext.name}</span>
                                <span className="sm:hidden">{ext.name.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comparison Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeExtension}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900/50 rounded-3xl border border-white/10 overflow-hidden"
                    >
                        {/* Extension Header */}
                        <div className={`px-6 py-4 ${colors.bgLight} border-b ${colors.border} flex items-center justify-between`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center text-white`}>
                                    {currentExt.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{currentExt.name}</h4>
                                    <p className={`text-sm ${colors.text}`}>Penjimatan: {currentExt.savings}</p>
                                </div>
                            </div>
                            <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full ${colors.bgLight} ${colors.border} border`}>
                                <Zap className={`w-4 h-4 ${colors.text}`} />
                                <span className={`text-sm font-semibold ${colors.text}`}>{currentExt.savings}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Without Extension */}
                            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
                                <h3 className="text-lg font-bold text-red-400 mb-5 flex items-center gap-2">
                                    <X className="w-5 h-5" />
                                    {currentExt.without.title}
                                </h3>
                                <ul className="space-y-4 relative border-l border-white/10 ml-3 pl-6">
                                    {currentExt.without.steps.map((step, i) => (
                                        <li key={i} className="text-gray-400 text-sm relative">
                                            <span className="absolute -left-[30px] w-5 h-5 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-[10px] text-gray-500">
                                                {i + 1}
                                            </span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 space-y-3">
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {currentExt.without.time}
                                        </p>
                                    </div>
                                    <p className="text-red-300/70 text-xs italic">{currentExt.without.pain}</p>
                                </div>
                            </div>

                            {/* With Extension */}
                            <div className="p-6 md:p-8 relative bg-primary/5">
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>
                                <h3 className="text-lg font-bold text-green-400 mb-5 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    {currentExt.with.title}
                                </h3>
                                <ul className="space-y-4 relative border-l border-green-500/30 ml-3 pl-6">
                                    {currentExt.with.steps.map((step, i) => {
                                        const isLast = i === currentExt.with.steps.length - 1;
                                        return (
                                            <li key={i} className={`text-sm relative ${isLast ? 'text-white font-semibold' : 'text-gray-300'}`}>
                                                <span className={`absolute -left-[30px] w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                                                    isLast
                                                        ? 'bg-green-500 text-black font-bold'
                                                        : 'bg-green-900/50 border border-green-500/50 text-green-400'
                                                }`}>
                                                    {isLast ? '✓' : i + 1}
                                                </span>
                                                {step}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="mt-6 space-y-3">
                                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                        <p className="text-green-400 font-bold text-sm flex items-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            {currentExt.with.time}
                                        </p>
                                    </div>
                                    <p className="text-green-300/70 text-xs">{currentExt.with.benefit}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
};

export default ProblemSection;
