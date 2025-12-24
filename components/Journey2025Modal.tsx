import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Eye, Trophy, Star, Video, Medal, Sparkles, Laptop, Crown, Flag } from 'lucide-react';
import Badge from './ui/Badge';
import {
    majorAwards,
    videoAchievements,
    contentStats,
    representationAchievements,
    sportsAchievements,
    otherAchievements,
    heroStats,
    featuredSportsHighlights
} from '../data/journey2025';

interface Journey2025ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Journey2025Modal: React.FC<Journey2025ModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="sticky top-3 right-3 ml-auto mr-3 z-20 w-8 h-8 rounded-full bg-black/80 backdrop-blur border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                            aria-label="Tutup"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Hero */}
                        <div className="relative -mt-11 overflow-hidden">
                            <div className="relative h-48 sm:h-64">
                                <img src="https://i.imgur.com/aS6cBGI.jpeg" alt="Refleksi 2025" className="w-full h-full object-cover object-top" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                <Badge variant="yellow" size="md" icon={<Star className="w-3 h-3" fill="currentColor" />} className="mb-2">
                                    REFLEKSI 2025
                                </Badge>
                                <h2 className="text-lg sm:text-2xl font-bold text-white">Tahun Kreativiti & Pencapaian</h2>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-5 gap-1 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b border-white/5">
                            {heroStats.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-sm sm:text-xl font-bold text-white">{stat.value}</div>
                                    <div className="text-[8px] sm:text-[10px] text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="p-3 sm:p-6 space-y-6 sm:space-y-8">

                            {/* Major Awards */}
                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3 sm:mb-4">
                                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                                    Anugerah Utama
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {majorAwards.map((item, index) => (
                                        <div key={index} className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 rounded-xl border border-yellow-500/20 overflow-hidden">
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="relative w-full sm:w-44 lg:w-48 aspect-[4/3] sm:aspect-square flex-shrink-0">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                                                    {item.link && (
                                                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                                                           className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                                                            <Play className="w-10 h-10 text-white" />
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-center">
                                                    <h4 className="text-xs sm:text-sm font-semibold text-white mb-1.5 line-clamp-2">{item.title}</h4>
                                                    <p className="text-[10px] sm:text-xs text-gray-400 mb-2">{item.description}</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.awards.map((award, i) => (
                                                            <Badge key={i} variant="yellow" size="xs" rounded="default" border={false}>
                                                                {award}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Video & Creative */}
                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3 sm:mb-4">
                                    <Video className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                                    Video & Kreatif
                                </h3>

                                {/* Featured: Content Stats */}
                                <div className="mb-4 bg-gradient-to-r from-red-500/10 to-pink-500/5 rounded-xl border border-red-500/20 p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <div className="relative w-full sm:w-48 lg:w-56 aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={contentStats.image} alt={contentStats.title} className="w-full h-full object-cover object-center" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h4 className="text-sm sm:text-base font-bold text-white mb-1">{contentStats.title}</h4>
                                        <p className="text-[10px] sm:text-xs text-gray-400 mb-3">TVPSS FiveOne 2025</p>
                                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                            {contentStats.stats.map((stat, i) => (
                                                <div key={i} className="text-center p-2 sm:p-2.5 rounded-lg bg-black/30">
                                                    <div className="text-base sm:text-xl font-bold text-red-400">{stat.value}</div>
                                                    <div className="text-[8px] sm:text-[10px] text-gray-500">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                    {videoAchievements.map((item, index) => (
                                        <div key={index} className="group bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all">
                                            <div className="relative aspect-[4/3]">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer"
                                                       className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                                                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                                                            <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                                                        </div>
                                                    </a>
                                                )}
                                                {item.stats && (
                                                    <Badge variant="dark" size="xs" icon={<Eye className="w-3 h-3" />} className="absolute bottom-1.5 left-1.5">
                                                        {item.stats}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="p-2 sm:p-2.5">
                                                <h4 className="text-[10px] sm:text-xs font-medium text-white mb-0.5">{item.title}</h4>
                                                <p className="text-[8px] sm:text-[9px] text-gray-500 mb-1.5">{item.description}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {item.awards.slice(0, 2).map((award, i) => (
                                                        <Badge key={i} variant="yellow" size="xs" border={false} className="bg-yellow-500/15">
                                                            {award}
                                                        </Badge>
                                                    ))}
                                                    {item.awards.length > 2 && (
                                                        <Badge variant="gray" size="xs" border={false}>+{item.awards.length - 2}</Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Representation */}
                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3 sm:mb-4">
                                    <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                                    Representasi & Kepimpinan
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                    {representationAchievements.map((item, index) => (
                                        <div key={index} className="group bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all">
                                            <div className="relative aspect-[4/3]">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                <div className="absolute top-2 left-2">
                                                    <Badge
                                                        variant={item.badge === 'VIP' ? 'vip' : item.badge === 'Antarabangsa' ? 'international' : 'white'}
                                                        size="xs"
                                                        border={false}
                                                        className={item.badge !== 'VIP' && item.badge !== 'Antarabangsa' ? 'backdrop-blur-sm bg-white/30' : ''}
                                                    >
                                                        {item.badge}
                                                    </Badge>
                                                </div>
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer"
                                                       className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                                                        <Play className="w-8 h-8 text-white" />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="p-2.5 sm:p-3">
                                                <h4 className="text-[10px] sm:text-xs font-medium text-white mb-0.5">{item.title}</h4>
                                                <p className="text-[8px] sm:text-[10px] text-gray-500">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sports */}
                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3 sm:mb-4">
                                    <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                                    Sukan & Jawatankuasa
                                </h3>

                                {/* Featured - Olahraga */}
                                <div className="mb-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/5 rounded-xl border border-yellow-500/20 p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <div className="relative w-full sm:w-48 lg:w-56 aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                                        <img src="https://i.imgur.com/GD4ViC4.jpeg" alt="Jurulatih Olahraga" className="w-full h-full object-cover object-center" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                                            <h4 className="text-sm sm:text-base font-bold text-white">Jurulatih Olahraga MSSWP 2025</h4>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-400 mb-3">SK Putrajaya Presint 5(1) - Kedudukan #3 Putrajaya</p>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {featuredSportsHighlights.map((highlight, i) => (
                                                <Badge key={i} variant="yellow" size="sm" border={false}>
                                                    {highlight}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Other JK */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                                    {sportsAchievements.filter(s => !s.featured).map((item, index) => (
                                        <div key={index} className="bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all">
                                            <div className="relative aspect-[4/3]">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                <div className="absolute bottom-1.5 left-1.5">
                                                    <Badge variant="blue" size="xs" border={false} className="bg-blue-500/50 text-blue-200 backdrop-blur-sm">
                                                        JK
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="p-2 sm:p-2.5">
                                                <h4 className="text-[9px] sm:text-[11px] font-medium text-white mb-0.5">{item.title.replace('JK ', '')}</h4>
                                                <p className="text-[8px] sm:text-[9px] text-gray-500">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Innovation & Recognition */}
                            <div>
                                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3 sm:mb-4">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                                    Inovasi & Pengiktirafan
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                                    {otherAchievements.map((item, index) => (
                                        <div key={index} className="bg-white/5 rounded-xl border border-white/5 hover:border-white/15 transition-all overflow-hidden">
                                            <div className="relative aspect-[4/3]">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                <div className="absolute top-2 left-2">
                                                    <Badge
                                                        variant={item.type === 'Inovasi' ? 'purple' : 'pink'}
                                                        size="xs"
                                                        border={false}
                                                        icon={item.type === 'Inovasi' ? <Laptop className="w-2.5 h-2.5" /> : <Star className="w-2.5 h-2.5" />}
                                                        className={item.type === 'Inovasi' ? 'bg-purple-500/80' : 'bg-pink-500/80'}
                                                    >
                                                        {item.type}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="p-2.5 sm:p-3">
                                                <h4 className="text-[10px] sm:text-xs font-medium text-white mb-0.5">{item.title}</h4>
                                                <p className="text-[8px] sm:text-[10px] text-gray-500">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="px-4 sm:px-6 py-4 border-t border-white/5 bg-white/[0.02]">
                            <p className="text-center text-gray-500 text-[10px] sm:text-xs">
                                Tahun 2025 penuh dengan cabaran dan pencapaian. Alhamdulillah, terima kasih kepada semua yang menyokong.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Journey2025Modal;
