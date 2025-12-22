import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Rocket, Paperclip, Globe, Send } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
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

                        {/* Edge - Medium */}
                        <div className="platform-circle platform-circle-md platform-edge">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M21.86 17.86q.14 0 .25.12.1.13.1.25t-.11.33l-.32.46-.43.53-.44.5q-.21.25-.38.42l-.22.23q-.58.53-1.34 1.04-.76.51-1.6.91-.86.4-1.74.64t-1.67.24q-.9 0-1.69-.28-.8-.28-1.48-.78-.68-.5-1.22-1.17-.53-.66-.92-1.44-.38-.77-.58-1.6-.2-.83-.2-1.67 0-1 .32-1.96.33-.97.87-1.8.14.95.55 1.77.41.81 1.02 1.49.6.68 1.38 1.21.78.54 1.64.9.86.36 1.77.56.92.2 1.8.2 1.04 0 2.03-.31.98-.3 1.48-.56.49-.26.49-.26zm-9.5-7.5q0 .65-.23 1.25-.23.6-.65 1.1-.41.49-.97.87-.55.38-1.2.65 0-.16-.01-.34-.02-.18-.02-.32 0-.8.17-1.53.16-.74.49-1.41.32-.68.78-1.27.46-.58 1.05-1.04.37.64.58 1.39.2.74.2 1.51-.02.07-.1.07-.08 0-.08-.07-.01-.07-.01-.14 0-.17.05-.39l.03-.17-.09.05q-.09.07-.16.19t-.06.22q0 .13.09.23.08.1.2.1.12 0 .2-.1.09-.1.09-.23 0-.18-.09-.33-.08-.16-.22-.27l.02-.02.23-.09-.04.19q-.04.18-.04.38l-.01.12z"/>
                            </svg>
                        </div>

                        {/* Safari/iOS - Medium */}
                        <div className="platform-circle platform-circle-md platform-safari">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.276-15.092l6.451-2.633-2.633 6.451-6.451 2.633 2.633-6.451zM12 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                            </svg>
                        </div>

                        {/* Android - Small */}
                        <div className="platform-circle platform-circle-sm platform-android">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M17.523 15.341c-.5 0-.906-.405-.906-.904 0-.5.406-.905.906-.905s.905.405.905.905c0 .5-.405.904-.905.904m-11.046 0c-.5 0-.906-.405-.906-.904 0-.5.406-.905.906-.905s.905.405.905.905c0 .5-.405.904-.905.904M17.808 8.2l1.607-2.778a.334.334 0 00-.122-.456.336.336 0 00-.458.122l-1.627 2.816a9.581 9.581 0 00-4.208-.972c-1.536 0-2.965.352-4.208.972L7.165 5.088a.336.336 0 00-.458-.122.334.334 0 00-.122.456L8.192 8.2C4.679 10.085 2.268 13.62 2 17.785h20c-.268-4.165-2.679-7.7-6.192-9.585"/>
                            </svg>
                        </div>

                        {/* Firefox - Small */}
                        <div className="platform-circle platform-circle-sm platform-firefox">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 5.068a10.04 10.04 0 011.897 3.479c-.453-.263-1.067-.453-1.76-.453-.24 0-.467.027-.693.067.013-.107.02-.213.02-.32 0-1.173-.52-2.227-1.347-2.947.6.067 1.293.107 1.883.174zM12 2.133c1.947 0 3.76.6 5.253 1.613-.987-.16-2.04-.24-2.987-.24-1.28 0-2.453.187-3.4.507a5.644 5.644 0 00-2.427 1.773c-.56.693-.96 1.6-1.08 2.693-.013.12-.02.24-.02.36 0 .293.027.573.08.84a3.74 3.74 0 01-.907-.187c-.16-.053-.32-.12-.467-.187A9.862 9.862 0 0112 2.133zm-8.32 5.76c.24.133.493.253.76.36.347.133.707.24 1.08.307-.013.133-.02.267-.02.4 0 .387.04.76.12 1.12-1.2-.347-2.093-1.04-2.093-1.867 0-.107.053-.213.153-.32zm-.347 4.347c.6.907 1.693 1.587 2.987 1.947.027.293.067.587.12.867-1.48-.213-2.707-.893-3.427-1.827a9.89 9.89 0 01.32-.987zm1.6 5.307a9.867 9.867 0 006.507 4.24c-2.2-.44-4.133-1.653-5.44-3.4a5.31 5.31 0 01-1.067-.84zm8.667 4.32a9.867 9.867 0 005.333-2.613 5.644 5.644 0 01-2.427-1.773c-.56-.693-.96-1.6-1.08-2.693a4.89 4.89 0 01-.02-.36c0-.293.027-.573.08-.84-.307.08-.627.147-.96.187l.027.013c-.187.773-.293 1.587-.293 2.427 0 2.053.587 3.96 1.6 5.573-.08.027-.173.053-.26.08z"/>
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
        color: "blue",
        gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
        borderColor: "border-blue-500/20 group-hover:border-blue-500/40",
        accentColor: "text-blue-400",
        bgAccent: "bg-blue-500/10"
    },
    {
        icon: <Code2 className="w-5 h-5" />,
        title: "Bina Penyelesaian",
        description: "Develop Chrome Extension dan Web App guna teknologi moden seperti React, TypeScript, dan Google Cloud.",
        tag: "Pembangunan",
        step: "02",
        color: "purple",
        gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
        borderColor: "border-purple-500/20 group-hover:border-purple-500/40",
        accentColor: "text-purple-400",
        bgAccent: "bg-purple-500/10"
    },
    {
        icon: <Rocket className="w-5 h-5" />,
        title: "Lancar & Impak",
        description: "Pastikan ribuan pengguna boleh guna tanpa masalah. Fokus pada prestasi, aksesibiliti, dan kegunaan sebenar.",
        tag: "Pelancaran",
        step: "03",
        color: "pink",
        gradient: "from-pink-500/20 via-pink-500/10 to-transparent",
        borderColor: "border-pink-500/20 group-hover:border-pink-500/40",
        accentColor: "text-pink-400",
        bgAccent: "bg-pink-500/10"
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="py-16 md:py-24 bg-premium bg-noise relative overflow-hidden">
            {/* Gradient Orbs */}
            <div className="gradient-orb gradient-orb-blue w-[500px] h-[500px] top-1/4 -left-64 opacity-40" />
            <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] top-1/2 -right-48 opacity-30" />
            <div className="gradient-orb gradient-orb-pink w-[350px] h-[350px] bottom-1/4 left-1/3 opacity-25" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
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
                            <SpotlightCard
                                className={`h-full rounded-2xl md:rounded-3xl border ${item.borderColor} bg-gradient-to-b ${item.gradient} backdrop-blur-sm transition-all duration-500`}
                                spotlightColor={`rgba(${item.color === 'blue' ? '59, 130, 246' : item.color === 'purple' ? '168, 85, 247' : '236, 72, 153'}, 0.1)`}
                            >
                                <div className="p-5 md:p-6 lg:p-8 h-full flex flex-col">
                                    {/* Step number - positioned at top */}
                                    <div className="flex items-center justify-between mb-4 md:mb-6">
                                        <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl ${item.bgAccent} border border-white/5 transition-transform duration-300 group-hover:scale-110`}>
                                            <span className={`text-sm md:text-base font-bold ${item.accentColor}`}>{item.step}</span>
                                        </div>
                                        <span className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider ${item.accentColor} opacity-60`}>
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

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-white/90 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <ScrollIndicator href="#projects" className="mt-12 md:mt-16" />
            </div>
        </section>
    );
};

export default Services;
