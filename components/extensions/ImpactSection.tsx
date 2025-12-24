import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, MousePointerClick, FileText, TrendingUp, Calculator, Users, Zap } from 'lucide-react';

// Animated counter hook
const useCounter = (end: number, duration: number = 2000, startCounting: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, startCounting]);

    return count;
};

// Counter component
const AnimatedCounter = ({ value, suffix = '', prefix = '', label, icon, color }: {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon: React.ReactNode;
    color: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useCounter(value, 2500, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
        >
            <div className={`w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-xl ${color} flex items-center justify-center`}>
                {icon}
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                {prefix}{count.toLocaleString()}{suffix}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">{label}</div>
        </motion.div>
    );
};

const ImpactSection = () => {
    // Impact calculations based on real usage
    const impactData = {
        totalUsers: 10764,
        dailyHoursSaved: 1522, // (3427 × 10min + 2852 × 20min) / 60
        dailyClicksSaved: 1951090, // 3427 × 70 + 2852 × 600
        annualPapersSaved: 1076400, // 4485 × 30 × 4 × 2
        annualMoneySaved: 53820, // Paper cost estimate in RM
    };

    const impactCards = [
        {
            value: impactData.dailyHoursSaved,
            suffix: ' jam',
            label: 'Dijimatkan Setiap Hari',
            icon: <Clock className="w-7 h-7 text-blue-400" />,
            color: 'bg-blue-500/20'
        },
        {
            value: Math.round(impactData.dailyClicksSaved / 1000),
            suffix: 'K klik',
            prefix: '~',
            label: 'Dielakkan Setiap Hari',
            icon: <MousePointerClick className="w-7 h-7 text-orange-400" />,
            color: 'bg-orange-500/20'
        },
        {
            value: Math.round(impactData.annualPapersSaved / 1000),
            suffix: 'K helai',
            prefix: '~',
            label: 'Kertas Dijimat Setahun',
            icon: <FileText className="w-7 h-7 text-green-400" />,
            color: 'bg-green-500/20'
        },
        {
            value: impactData.annualMoneySaved,
            prefix: 'RM ',
            suffix: '+',
            label: 'Nilai Penjimatan Setahun',
            icon: <TrendingUp className="w-7 h-7 text-yellow-400" />,
            color: 'bg-yellow-500/20'
        }
    ];

    // Calculation breakdown
    const calculations = [
        {
            extension: 'MOIES Kehadiran Helper',
            users: '3,427',
            timeSaved: '10 minit',
            formula: '3,427 guru × 10 minit = 571 jam/hari',
            color: 'blue'
        },
        {
            extension: 'IDME PBD Helper',
            users: '2,852',
            timeSaved: '20 minit',
            formula: '2,852 guru × 20 minit = 951 jam/hari',
            color: 'purple'
        },
        {
            extension: 'PBD OnePage',
            users: '4,485',
            timeSaved: '4 helai/murid',
            formula: '4,485 guru × 30 murid × 4 helai = 538K helai/cetakan',
            color: 'green'
        }
    ];

    // Visual bar comparison
    const barComparison = [
        { label: 'Masa Isi Kehadiran', before: 15, after: 1, unit: 'minit', reduction: '93%' },
        { label: 'Klik Isi PBD', before: 100, after: 5, unit: 'klik', reduction: '95%' },
        { label: 'Mukasurat Laporan', before: 6, after: 1, unit: 'helai', reduction: '83%' }
    ];

    return (
        <section id="impak" className="py-16 sm:py-24 bg-gradient-to-b from-black to-[#050505] relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                        <Calculator className="w-3 h-3 sm:w-4 sm:h-4" />
                        DATA IMPAK SEBENAR
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
                        Impak Yang <span className="text-primary">Boleh Diukur</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto px-2">
                        Bukan sekadar dakwaan - ini adalah pengiraan sebenar berdasarkan jumlah pengguna dan penjimatan masa.
                    </p>
                </motion.div>

                {/* Animated Counters */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-20">
                    {impactCards.map((card, index) => (
                        <AnimatedCounter
                            key={index}
                            value={card.value}
                            suffix={card.suffix}
                            prefix={card.prefix || ''}
                            label={card.label}
                            icon={card.icon}
                            color={card.color}
                        />
                    ))}
                </div>

                {/* Calculation Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-20"
                >
                    <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                        Bagaimana Kami Kira?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {calculations.map((calc, index) => (
                            <div
                                key={index}
                                className="p-4 sm:p-6 rounded-2xl"
                                style={{
                                    backgroundColor: calc.color === 'blue' ? 'rgba(59, 130, 246, 0.05)' :
                                        calc.color === 'purple' ? 'rgba(168, 85, 247, 0.05)' :
                                            'rgba(34, 197, 94, 0.05)',
                                    borderColor: calc.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                                        calc.color === 'purple' ? 'rgba(168, 85, 247, 0.2)' :
                                            'rgba(34, 197, 94, 0.2)',
                                    borderWidth: '1px',
                                    borderStyle: 'solid'
                                }}
                            >
                                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                    <Users className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${calc.color === 'blue' ? 'text-blue-400' :
                                            calc.color === 'purple' ? 'text-purple-400' : 'text-green-400'
                                        }`} />
                                    <span className="font-semibold text-white text-sm sm:text-base">{calc.extension}</span>
                                </div>
                                <div className="space-y-2 text-xs sm:text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Pengguna:</span>
                                        <span className="text-white font-medium">{calc.users}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Jimat setiap guna:</span>
                                        <span className="text-white font-medium">{calc.timeSaved}</span>
                                    </div>
                                </div>
                                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                                    <p className="text-[10px] sm:text-xs text-gray-400 font-mono bg-black/30 p-2 rounded break-all">
                                        {calc.formula}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Visual Bar Comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-900/50 rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 md:p-10"
                >
                    <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-10">
                        Perbandingan Visual
                    </h3>

                    <div className="space-y-6 sm:space-y-8">
                        {barComparison.map((item, index) => (
                            <div key={index} className="space-y-2 sm:space-y-3">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                    <span className="text-white font-medium text-sm sm:text-base">{item.label}</span>
                                    <span className="text-green-400 text-xs sm:text-sm font-semibold bg-green-500/10 px-2 sm:px-3 py-1 rounded-full w-fit">
                                        {item.reduction} kurang
                                    </span>
                                </div>

                                {/* Before bar */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className="text-[10px] sm:text-xs text-red-400 w-14 sm:w-16">Sebelum</span>
                                        <div className="flex-1 h-7 sm:h-8 bg-white/5 rounded-lg overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '100%' }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.2 }}
                                                className="h-full bg-gradient-to-r from-red-500/80 to-red-600/80 rounded-lg flex items-center justify-end pr-2 sm:pr-3"
                                            >
                                                <span className="text-[10px] sm:text-xs font-bold text-white">{item.before} {item.unit}</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* After bar */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className="text-[10px] sm:text-xs text-green-400 w-14 sm:w-16">Selepas</span>
                                        <div className="flex-1 h-7 sm:h-8 bg-white/5 rounded-lg overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(item.after / item.before) * 100}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-end pr-2 sm:pr-3"
                                                style={{ minWidth: '50px' }}
                                            >
                                                <span className="text-[10px] sm:text-xs font-bold text-white">{item.after} {item.unit}</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 sm:mt-12 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <div className="text-center sm:text-left">
                            <p className="text-white font-semibold text-sm sm:text-base">Jumlah Keseluruhan</p>
                            <p className="text-gray-400 text-xs sm:text-sm">
                                <span className="text-primary font-bold">10,764+ guru</span> menjimatkan{' '}
                                <span className="text-green-400 font-bold">1,500+ jam/hari</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default ImpactSection;
