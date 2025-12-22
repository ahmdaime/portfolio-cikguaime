import React, { useState } from 'react';
import { extensions, ExtensionCategory } from '../../data/extensions';
import { Download, ExternalLink, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExtensionLibrary = () => {
    const [filter, setFilter] = useState<ExtensionCategory | 'Semua'>('Semua');

    const categories: (ExtensionCategory | 'Semua')[] = ['Semua', 'Kehadiran', 'PBD', 'Utiliti'];

    const filteredExtensions = filter === 'Semua'
        ? extensions
        : extensions.filter(ext => ext.category === filter);

    return (
        <section id="extension" className="py-24 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Muat Turun Extension</h2>
                        <p className="text-gray-400">Semua extension adalah PERCUMA. Pilih yang anda perlukan.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                        ? 'bg-white text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredExtensions.map((ext) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={ext.id}
                                className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400">
                                                {ext.status}
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star size={12} fill="currentColor" />
                                                <span className="text-xs font-medium">{ext.rating}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">{ext.category}</span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{ext.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4 h-12 line-clamp-2">{ext.description}</p>

                                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-300 bg-white/5 p-2 rounded-lg">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                        {ext.benefit}
                                    </div>

                                    <div className="flex items-center justify-between mb-6 text-sm">
                                        <span className="text-gray-500">{ext.stats}</span>
                                    </div>

                                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                        <a
                                            href={ext.installLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-colors"
                                        >
                                            <Download size={16} />
                                            Pasang Percuma
                                        </a>
                                        <a
                                            href={ext.installLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                                            title="Lihat di Chrome Store"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredExtensions.length === 0 && (
                    <div className="py-20 text-center text-gray-500">
                        Tiada extension dijumpai untuk kategori ini.
                    </div>
                )}

            </div>
        </section>
    );
};

export default ExtensionLibrary;
