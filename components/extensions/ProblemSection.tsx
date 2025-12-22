import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, MousePointer2, FileText, CheckCircle2 } from 'lucide-react';

const ProblemSection = () => {
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

                {/* Before vs After Timeline */}
                <div className="bg-gray-900/50 rounded-3xl border border-white/10 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Before */}
                        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
                            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                                <AlertTriangle size={20} />
                                Tanpa Extension
                            </h3>
                            <ul className="space-y-6 relative border-l border-white/10 ml-3 pl-8">
                                {[
                                    "Buka sistem MOIES/IDME",
                                    "Cari kelas dan senarai murid",
                                    "Klik satu-satu untuk setiap murid",
                                    "Pilih sebab/kategori dari dropdown",
                                    "Tunggu loading setiap kali",
                                    "Ulang untuk semua murid",
                                    "Semak semula jika ada silap"
                                ].map((step, i) => (
                                    <li key={i} className="text-gray-400 text-sm relative">
                                        <span className="absolute -left-[39px] w-5 h-5 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-[10px] text-gray-500">
                                            {i + 1}
                                        </span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                                <p className="text-red-400 font-semibold text-sm">10-15 minit setiap sesi</p>
                            </div>
                        </div>

                        {/* After */}
                        <div className="p-8 md:p-12 relative bg-primary/5">
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>
                            <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                                <CheckCircle2 size={20} />
                                Dengan Extension
                            </h3>
                            <ul className="space-y-6 relative border-l border-green-500/30 ml-3 pl-8">
                                {[
                                    "Buka sistem seperti biasa",
                                    "Klik ikon extension",
                                    "Pilih tetapan sekali",
                                    "Tekan butang 'Mula'",
                                    "Siap! Extension buat semua."
                                ].map((step, i) => (
                                    <li key={i} className={`text-sm relative ${i === 4 ? 'text-white font-bold text-lg' : 'text-gray-300'}`}>
                                        <span className={`absolute -left-[39px] w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${i === 4 ? 'bg-green-500 text-black' : 'bg-green-900/50 border border-green-500/50 text-green-400'}`}>
                                            {i + 1}
                                        </span>
                                        {step}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                <p className="text-green-400 font-bold text-center">
                                    Kurang dari 1 minit!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProblemSection;
