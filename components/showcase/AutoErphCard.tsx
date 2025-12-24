import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, FileSpreadsheet, Play } from 'lucide-react';
import { AUTO_ERPH } from '../../constants';

const AutoErphCard: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2"
        >
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-purple-500/20 rounded-xl sm:rounded-2xl">
                {/* Left: Info */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase rounded">
                            Apps Script
                        </span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded">
                            Terbaru
                        </span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg shrink-0">
                            <FileSpreadsheet className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white">{AUTO_ERPH.title}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">Google Sheets Automation</p>
                        </div>
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        {AUTO_ERPH.description}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                        {AUTO_ERPH.features.map((feature, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm rounded-full"
                            >
                                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-white font-semibold text-sm sm:text-base">{AUTO_ERPH.users}</span>
                            <span className="text-gray-400 text-xs sm:text-sm">pengguna</span>
                        </div>
                    </div>

                    <Link
                        to={AUTO_ERPH.link}
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-sm sm:text-base rounded-full transition-all w-full sm:w-fit"
                    >
                        <Play className="w-4 h-4" />
                        Lihat Demo
                    </Link>
                </div>

                {/* Right: Code Editor - Hidden on mobile */}
                <div className="code-card hidden md:block">
                    <div className="code-card-top">
                        <span className="code-card-title">autoRPH.gs</span>
                        <div className="code-card-buttons" aria-hidden="true">
                            <span className="code-card-btn close"></span>
                            <span className="code-card-btn minimize"></span>
                            <span className="code-card-btn maximize"></span>
                        </div>
                    </div>
                    <div className="code-card-content">
                        <div className="code-card-line">
                            <span className="code-card-line-num">1</span>
                            <span><span className="keyword">function</span> <span className="function">autoIsiRPH</span><span className="operator">()</span> <span className="operator">{'{'}</span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">2</span>
                            <span>  <span className="keyword">const</span> <span className="variable">sheet</span> <span className="operator">=</span> <span className="function">getActiveSheet</span><span className="operator">();</span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">3</span>
                            <span>  <span className="keyword">const</span> <span className="variable">minggu</span> <span className="operator">=</span> <span className="function">getMingguSemasa</span><span className="operator">();</span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">4</span>
                            <span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">5</span>
                            <span>  <span className="comment">// Auto-fill RPH dalam 5 minit</span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">6</span>
                            <span>  <span className="variable">sheet</span>.<span className="function">isiDataRPH</span><span className="operator">(</span><span className="variable">minggu</span><span className="operator">);</span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">7</span>
                            <span>  <span className="variable">sheet</span>.<span className="function">formatCantik</span><span className="operator">();</span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">8</span>
                            <span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">9</span>
                            <span>  <span className="function">toast</span><span className="operator">(</span><span className="string">"RPH siap! ✨"</span><span className="operator">);</span></span>
                        </div>
                        <div className="code-card-line">
                            <span className="code-card-line-num">10</span>
                            <span><span className="operator">{'}'}</span><span className="code-cursor"></span></span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AutoErphCard;
