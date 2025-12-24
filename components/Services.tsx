import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Rocket, Paperclip, Globe, Send } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

// Terminal Card with Auto-typing
const TerminalCard: React.FC = () => {
    return (
        <div className="w-full mb-4 md:mb-6 h-[100px]">
            <div className="term-card h-full">
                <div className="term-wrap">
                    <div className="term-terminal">
                        <hgroup className="term-head">
                            <p className="term-title">
                                <svg width="16px" height="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none">
                                    <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"></path>
                                </svg>
                                Terminal
                            </p>
                            <button className="term-copy_toggle" tabIndex={-1} type="button" aria-label="Salin kod">
                                <svg width="16px" height="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none">
                                    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                                    <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                                </svg>
                            </button>
                        </hgroup>
                        <div className="term-body">
                            <pre className="term-pre">
                                <code>-&nbsp;</code>
                                <code>npx&nbsp;</code>
                                <code className="term-cmd" data-cmd="create-react-app@latest"></code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Platform Icons Card - Animated floating circles
const PlatformIconsCard: React.FC = () => {
    return (
        <div className="w-full mb-4 md:mb-6 h-[100px]">
            <div className="platform-card h-full">
                <div className="platform-icons-container h-full">
                    <div className="platform-icons-wrapper">
                        {/* Chrome - Center Large */}
                        <div className="platform-circle platform-circle-lg platform-chrome">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 1.229.045c6.627 0 12-5.373 12-12 0-1.386-.236-2.717-.67-3.954H15.273zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
                            </svg>
                        </div>

                        {/* Google Sheets - Medium */}
                        <div className="platform-circle platform-circle-md platform-edge">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z"/>
                            </svg>
                        </div>

                        {/* Globe/Web - Medium */}
                        <div className="platform-circle platform-circle-md platform-safari">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                        </div>

                        {/* Mobile/Phone - Small */}
                        <div className="platform-circle platform-circle-sm platform-android">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                            </svg>
                        </div>

                        {/* Desktop/Monitor - Small */}
                        <div className="platform-circle platform-circle-sm platform-firefox">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/>
                            </svg>
                        </div>
                    </div>

                    {/* Animated scan line */}
                    <div className="platform-scan-line">
                        <div className="platform-scan-glow"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// AI Search Input with Auto-typing
const AISearchInput: React.FC = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = 'saya hadapi masalah ini...';

    useEffect(() => {
        let index = 0;
        let isDeleting = false;
        let timeout: NodeJS.Timeout;

        const type = () => {
            if (!isDeleting) {
                if (index < fullText.length) {
                    setDisplayText(fullText.slice(0, index + 1));
                    index++;
                    timeout = setTimeout(type, 100);
                } else {
                    timeout = setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 2000);
                }
            } else {
                if (index > 0) {
                    setDisplayText(fullText.slice(0, index - 1));
                    index--;
                    timeout = setTimeout(type, 50);
                } else {
                    isDeleting = false;
                    timeout = setTimeout(type, 500);
                }
            }
        };

        timeout = setTimeout(type, 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="w-full mb-4 md:mb-6 h-[100px]">
            <div className="relative w-full h-full flex flex-col">
                <div className="relative flex flex-col bg-black/5 rounded-xl overflow-hidden border border-blue-500/25 group-hover:border-blue-500/50 transition-colors duration-300 flex-1">
                    <div className="flex-1 rounded-t-xl px-4 py-3 bg-black/80 text-white text-sm leading-[1.2] flex items-center">
                        <span>{displayText}</span>
                        <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle"></span>
                    </div>

                    <div className="h-10 bg-black/90 rounded-b-xl relative flex-shrink-0">
                        <div className="absolute left-2 bottom-2 flex items-center gap-1.5">
                            <div className="rounded-lg p-1.5 bg-white/5">
                                <Paperclip className="w-3.5 h-3.5 text-white/40" />
                            </div>
                            <div className="rounded-full flex items-center gap-1.5 px-2 py-1 border h-6 bg-blue-500/15 border-blue-400/50">
                                <Globe className="w-3 h-3 text-blue-400" />
                                <span className="text-[10px] text-blue-400">Search</span>
                            </div>
                        </div>

                        <div className="absolute right-2 bottom-2">
                            <div className="rounded-lg p-1.5 bg-white/5">
                                <Send className="w-3.5 h-3.5 text-white/40" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const services = [
    {
        icon: <Search className="w-5 h-5" />,
        title: "Kenal Pasti Masalah",
        description: "Saya selami apa yang cikgu-cikgu betul-betul perlukan. Bukan ikut trend, tapi selesaikan masalah sebenar.",
        tag: "Kajian",
        step: "01",
        statusColor: "bg-blue-500"
    },
    {
        icon: <Code2 className="w-5 h-5" />,
        title: "Bina Penyelesaian",
        description: "Develop Chrome Extension dan Web App guna teknologi moden seperti React, TypeScript, dan Google Cloud.",
        tag: "Pembangunan",
        step: "02",
        statusColor: "bg-purple-500"
    },
    {
        icon: <Rocket className="w-5 h-5" />,
        title: "Lancar & Impak",
        description: "Pastikan ribuan pengguna boleh guna tanpa masalah. Fokus pada prestasi, aksesibiliti, dan kegunaan sebenar.",
        tag: "Pelancaran",
        step: "03",
        statusColor: "bg-primary"
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="min-h-[100svh] flex flex-col bg-premium bg-noise relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-center py-12 md:py-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Proses Kerja</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 md:mb-6">
                        Cara Saya Bekerja
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed px-4">
                        Dari kenal pasti masalah sampai hasilkan penyelesaian. Proses saya didorong oleh empati dan ketepatan teknikal.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
                            className="group"
                        >
                            {/* New Card Style */}
                            <div className="h-full bg-[#1e1e1e] rounded-2xl cursor-pointer transition-all duration-200 border-[1.5px] border-[#2a2a2a] hover:bg-[#2a2a2a] hover:border-primary shadow-[1em_1em_1em_rgba(0,0,0,0.2),-0.5em_-0.5em_1em_rgba(255,255,255,0.02)]">
                                <div className="p-5 md:p-6 lg:p-8 flex flex-row gap-4">
                                    {/* Left - Status Indicator */}
                                    <div className="flex-shrink-0 pt-1">
                                        <div className={`w-2.5 h-2.5 rounded-full ${item.statusColor}`}></div>
                                    </div>

                                    {/* Right - Content */}
                                    <div className="flex flex-col gap-4 flex-1">
                                        {/* Header */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Langkah {item.step}
                                            </span>
                                            <span className="text-xs font-semibold text-gray-400">
                                                {item.tag}
                                            </span>
                                        </div>

                                        {/* UI Element */}
                                        {item.title === 'Kenal Pasti Masalah' ? (
                                            <AISearchInput />
                                        ) : item.title === 'Bina Penyelesaian' ? (
                                            <TerminalCard />
                                        ) : item.title === 'Lancar & Impak' ? (
                                            <PlatformIconsCard />
                                        ) : null}

                                        {/* Text Content */}
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Scroll Indicator - Fixed at bottom */}
            <div className="pb-6 md:pb-8 relative z-10">
                <ScrollIndicator href="#featured" />
            </div>
        </section>
    );
};

export default Services;
