import React from 'react';
import { comparisons, impactStats, testimonials } from '../../data/evidence';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const EvidenceSection = () => {
    return (
        <section id="bukti" className="py-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Bukti Keberkesanan</h2>
                    <p className="text-gray-400">Ulasan sebenar dari guru-guru yang menggunakan extension ini.</p>
                </div>

                {/* Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
                    {impactStats.map((stat, index) => (
                        <div key={index} className="p-8 rounded-2xl bg-white/5 border border-white/5">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                {stat.value}
                            </div>
                            <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                            <div className="text-sm text-gray-500">{stat.description}</div>
                        </div>
                    ))}
                </div>

                {/* Comparison Table - Mobile Cards / Desktop Table */}
                <div className="mb-20">
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-black/50 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-12 gap-0 border-b border-white/10 bg-white/5 text-gray-400 text-sm font-semibold uppercase tracking-wider text-left">
                            <div className="col-span-6 p-6">Metrik</div>
                            <div className="col-span-3 p-6 text-red-400">Sebelum</div>
                            <div className="col-span-3 p-6 text-green-400">Selepas</div>
                        </div>
                        {comparisons.map((comp, index) => (
                            <div key={index} className="grid grid-cols-12 gap-0 border-b border-white/5 hover:bg-white/5 transition-colors">
                                <div className="col-span-6 p-6 font-medium text-white">{comp.metric}</div>
                                <div className="col-span-3 p-6 text-gray-500">{comp.before}</div>
                                <div className="col-span-3 p-6 text-green-400 font-bold">{comp.after}</div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {comparisons.map((comp, index) => (
                            <div key={index} className="bg-black/50 rounded-xl border border-white/10 p-4">
                                <p className="text-white font-medium mb-3 text-sm">{comp.metric}</p>
                                <div className="flex justify-between items-center">
                                    <div className="text-center">
                                        <p className="text-[10px] text-red-400 uppercase mb-1">Sebelum</p>
                                        <p className="text-gray-400 text-sm">{comp.before}</p>
                                    </div>
                                    <div className="text-2xl text-gray-600">→</div>
                                    <div className="text-center">
                                        <p className="text-[10px] text-green-400 uppercase mb-1">Selepas</p>
                                        <p className="text-green-400 font-bold text-sm">{comp.after}</p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/5 text-center">
                                    <span className="text-xs text-primary font-semibold">{comp.improvement}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-center mb-8">Ulasan Dari Chrome Web Store</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testi) => (
                        <motion.div
                            key={testi.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-[#111] border border-white/5 relative"
                        >
                            <Quote className="absolute top-4 right-4 w-6 h-6 text-white/10" />

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testi.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-300 text-sm mb-6 leading-relaxed">"{testi.quote}"</p>

                            <div className="pt-4 border-t border-white/5">
                                <div className="font-bold text-white text-sm">{testi.name}</div>
                                <div className="text-xs text-gray-500">{testi.role}</div>
                                <div className="text-xs text-primary mt-1">{testi.extension}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm mb-4">
                        Lihat lebih banyak ulasan di Chrome Web Store
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href="https://chromewebstore.google.com/detail/pbd-onepage-laporan-satu/lbefimcackfpdklimoiclkklookickjl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                        >
                            PBD OnePage
                        </a>
                        <a
                            href="https://chromewebstore.google.com/detail/moeis-kehadiran-helper/aopjilfeegfaadfalilcnjgehpilnenm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                        >
                            MOIES Helper
                        </a>
                        <a
                            href="https://chromewebstore.google.com/detail/idme-pbd-helper/ljbhcdaienegobdeoamibnnfihlnipkc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors"
                        >
                            IDME Helper
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default EvidenceSection;
