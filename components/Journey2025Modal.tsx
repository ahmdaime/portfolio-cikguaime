import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Eye, Trophy, Award, Star, Video, Medal, Sparkles, Camera, Laptop, Users, Crown, MapPin, Flag } from 'lucide-react';

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

    // Major Awards
    const majorAwards = [
        {
            image: 'https://i.imgur.com/MUB64Fo.jpeg',
            title: 'Anugerah Perkhidmatan Cemerlang & Pencipta Kandungan Digital',
            description: 'Menerima APC dan Anugerah Pencipta Kandungan Digital WP Putrajaya',
            awards: ['APC', 'Pencipta Kandungan Digital WP'],
            link: 'https://www.tiktok.com/@ahmdaime/video/7546515182516833544',
            linkType: 'tiktok'
        },
        {
            image: 'https://i.imgur.com/ZmKLHQH.jpeg',
            title: 'SAS International Techno Drama',
            description: 'Menyertai pertandingan drama teknologi peringkat antarabangsa',
            awards: ['Best Poster', 'Best Actress - Adik Ilhan', 'Platinum Award', '3rd Place'],
            link: null,
            linkType: null
        }
    ];

    // Video & Creative
    const videoAchievements = [
        {
            image: 'https://i.imgur.com/aS6cBGI.jpeg',
            title: 'Festival Lakon Layar WP Putrajaya',
            description: 'Pertandingan filem pendek peringkat WP',
            awards: ['Poster Terbaik', 'Pelakon Wanita Terbaik', 'Suntingan Terbaik', 'Tempat Ke-3'],
            stats: '63K',
            link: 'https://youtu.be/lGY8KsHjkWI',
        },
        {
            image: 'https://i.imgur.com/gBLBxfj.jpeg',
            title: 'Video Kreatif TVPSS Kebangsaan',
            description: 'Pertandingan peringkat kebangsaan',
            awards: ['Naib Johan'],
            stats: null,
            link: 'https://youtu.be/LeEWyrMck1c',
        },
        {
            image: 'https://i.imgur.com/1PZeNd6.jpeg',
            title: 'Video Pendek "Lewat"',
            description: 'Video viral di YouTube',
            awards: ['Viral'],
            stats: '136K',
            link: 'https://youtu.be/1BOLlif3eog',
        },
        {
            image: 'https://i.imgur.com/aj4K5Kk.png',
            title: 'Montaj PETAH KPM 2025',
            description: 'Program PETAH peringkat KPM',
            awards: ['Penglibatan'],
            stats: null,
            link: 'https://youtu.be/QbVaKL7tPoc',
        },
        {
            image: 'https://i.imgur.com/6VsYKN3.jpeg',
            title: 'Video SEA-PLM 2024',
            description: 'Pelancaran Main Regional Report',
            awards: ['Antarabangsa'],
            stats: null,
            link: null,
        },
        {
            image: 'https://i.imgur.com/mM6gwwb.jpeg',
            title: 'Hakim TVPSS SM',
            description: 'Hakim jemputan peringkat SM',
            awards: ['Hakim Jemputan'],
            stats: null,
            link: null,
        },
        {
            image: 'https://i.imgur.com/jPNcBKi.jpeg',
            title: 'TikTok Keselamatan Jalan Raya',
            description: 'Pertandingan peringkat kebangsaan',
            awards: ['Anugerah Khas Juri'],
            stats: null,
            link: 'https://www.tiktok.com/@tvpssfiveone/video/7568811694596623624',
        }
    ];

    // Content Creation Stats (Featured)
    const contentStats = {
        image: 'https://i.imgur.com/gQo8dNh.jpeg',
        title: 'Peneraju Media Sosial Sekolah',
        stats: [
            { value: '24', label: 'Episod YouTube' },
            { value: '66', label: 'Konten TikTok' },
            { value: '95', label: 'Post Facebook' }
        ]
    };

    // Representation & Leadership
    const representationAchievements = [
        {
            image: 'https://i.imgur.com/T51rGqr.jpeg',
            title: 'Pempamer Festival TVPSS Kebangsaan',
            description: 'Dikunjungi Permaisuri Selangor',
            badge: 'VIP',
            link: 'https://www.tiktok.com/@ahmdaime/video/7559732196454550792'
        },
        {
            image: 'https://i.imgur.com/0ulFFWw.jpeg',
            title: "World's Best School Prizes 2025",
            description: 'Majlis pengumuman antarabangsa',
            badge: 'Antarabangsa',
            link: null
        },
        {
            image: 'https://i.imgur.com/E8q6Sav.jpeg',
            title: 'Kolokium Guru Cemerlang',
            description: 'Jemputan Pegawai Pendidikan Muda',
            badge: 'Jemputan',
            link: null
        },
        {
            image: 'https://i.imgur.com/zsFE0AN.jpeg',
            title: 'Lawatan Penanda Aras TVPSS',
            description: 'SMK Cheras, PPD Pasir Puteh, SK Ismail Petra',
            badge: 'Penanda Aras',
            link: null
        },
        {
            image: 'https://i.imgur.com/4C7ZVZl.jpeg',
            title: 'Bengkel Pemerkasaan TVPSS',
            description: 'Peringkat WP Putrajaya',
            badge: 'Fasilitator',
            link: null
        },
        {
            image: 'https://i.imgur.com/IjW0MoL.jpeg',
            title: 'Kem Komandan Perkhemahan',
            description: 'Mengetuai Unit Uniform',
            badge: 'Kepimpinan',
            link: null
        },
        {
            image: 'https://i.imgur.com/ByTWACP.jpeg',
            title: 'Penyelaras Bulan Kebangsaan',
            description: 'Sambutan Hari Malaysia 2025',
            badge: 'Penyelaras',
            link: null
        },
        {
            image: 'https://i.imgur.com/dx1k1sy.jpeg',
            title: 'Lawatan ke Parlimen Malaysia',
            description: 'Bersama murid-murid sekolah',
            badge: 'Lawatan',
            link: null
        }
    ];

    // Sports & Committee
    const sportsAchievements = [
        {
            image: 'https://i.imgur.com/GD4ViC4.jpeg',
            title: 'Jurulatih Olahraga MSSWP',
            description: '3 Emas, 1 Perak, Pecah Rekod',
            role: 'Jurulatih',
            featured: true
        },
        {
            image: 'https://i.imgur.com/kia3Rw1.jpeg',
            title: 'JK Tenpin Boling MSSM',
            description: 'Jurugambar rasmi kejohanan',
            role: 'Jawatankuasa',
            featured: false
        },
        {
            image: 'https://i.imgur.com/M7G0rD2.jpeg',
            title: 'JK Sofbol MSSWP',
            description: 'Peringkat WP Putrajaya',
            role: 'Jawatankuasa',
            featured: false
        },
        {
            image: 'https://i.imgur.com/XM1CcwQ.jpeg',
            title: 'JK FNKSS Kebangsaan',
            description: 'Jurugambar rasmi kejohanan',
            role: 'Jawatankuasa',
            featured: false
        },
        {
            image: 'https://i.imgur.com/ioxe9O9.jpeg',
            title: 'JK Sepak Takraw MSSM',
            description: 'Peringkat kebangsaan',
            role: 'Jawatankuasa',
            featured: false
        },
        {
            image: 'https://i.imgur.com/RKmu201.jpeg',
            title: 'JK PETAH Bicara Berirama',
            description: 'Peringkat kebangsaan',
            role: 'Jawatankuasa',
            featured: false
        },
        {
            image: 'https://i.imgur.com/UDdneaR.jpeg',
            title: 'JK Siaran Langsung Genta Suara',
            description: 'Generasi Madani Kebangsaan',
            role: 'Jawatankuasa',
            featured: false
        }
    ];

    // Innovation & Recognition
    const otherAchievements = [
        {
            image: 'https://i.imgur.com/oqLOyG8.jpeg',
            title: 'Inovasi Digital dalam PdPc',
            description: 'Murid menghasilkan slaid menggunakan Canva',
            type: 'Inovasi'
        },
        {
            image: 'https://i.imgur.com/l4RdtAr.jpeg',
            title: 'Liputan Majlis oleh KRU TVPSS',
            description: 'Memberi peluang murid membuat liputan',
            type: 'Inovasi'
        },
        {
            image: 'https://i.imgur.com/2AIlxy4.jpeg',
            title: 'Penggambaran Graduasi Tahun 6',
            description: 'Dihasilkan sendiri oleh guru-guru',
            type: 'Inovasi'
        },
        {
            image: 'https://i.imgur.com/ycR4xfP.jpeg',
            title: 'Ikon Guru Fashionista',
            description: 'Terpilih peringkat sekolah',
            type: 'Pengiktirafan'
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
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
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-[10px] sm:text-xs font-semibold mb-2">
                                    <Star className="w-3 h-3" fill="currentColor" />
                                    REFLEKSI 2025
                                </div>
                                <h2 className="text-lg sm:text-2xl font-bold text-white">Tahun Kreativiti & Pencapaian</h2>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-5 gap-1 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b border-white/5">
                            {[
                                { value: '200K+', label: 'Tontonan' },
                                { value: '11+', label: 'Anugerah' },
                                { value: '4', label: 'Pingat' },
                                { value: '8', label: 'JK/Sukan' },
                                { value: '29', label: 'Pencapaian' }
                            ].map((stat, i) => (
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
                                                            <span key={i} className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-[8px] sm:text-[10px]">
                                                                {award}
                                                            </span>
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
                                                    <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 text-[8px] sm:text-[9px] text-white backdrop-blur-sm">
                                                        <Eye className="w-3 h-3" />
                                                        {item.stats}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-2 sm:p-2.5">
                                                <h4 className="text-[10px] sm:text-xs font-medium text-white mb-0.5">{item.title}</h4>
                                                <p className="text-[8px] sm:text-[9px] text-gray-500 mb-1.5">{item.description}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {item.awards.slice(0, 2).map((award, i) => (
                                                        <span key={i} className="px-1.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 text-[7px] sm:text-[8px]">
                                                            {award}
                                                        </span>
                                                    ))}
                                                    {item.awards.length > 2 && (
                                                        <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-gray-400 text-[7px]">+{item.awards.length - 2}</span>
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
                                                    <span className={`px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-medium ${
                                                        item.badge === 'VIP' ? 'bg-purple-500/90 text-white' :
                                                        item.badge === 'Antarabangsa' ? 'bg-blue-500/90 text-white' :
                                                        'bg-white/30 text-white backdrop-blur-sm'
                                                    }`}>
                                                        {item.badge}
                                                    </span>
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
                                            {['3 Emas', '1 Perak', 'Pecah Rekod Negeri'].map((item, i) => (
                                                <span key={i} className="px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-[9px] sm:text-[11px] font-medium">
                                                    {item}
                                                </span>
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
                                                    <span className="px-1.5 py-0.5 rounded-full bg-blue-500/50 text-blue-200 text-[7px] sm:text-[8px] font-medium backdrop-blur-sm">
                                                        JK
                                                    </span>
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
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-medium ${
                                                        item.type === 'Inovasi' ? 'bg-purple-500/80 text-white' : 'bg-pink-500/80 text-white'
                                                    }`}>
                                                        {item.type === 'Inovasi' ? <Laptop className="w-2.5 h-2.5" /> : <Star className="w-2.5 h-2.5" />}
                                                        {item.type}
                                                    </span>
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
