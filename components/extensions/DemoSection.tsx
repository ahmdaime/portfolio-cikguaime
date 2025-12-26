import React from 'react';
import { Play, UserCheck, ClipboardList, FileOutput } from 'lucide-react';

const DemoSection = () => {
    const demoVideos = [
        {
            id: 1,
            title: 'MOIES Kehadiran Helper',
            desc: 'Isi kehadiran secara pukal',
            icon: <UserCheck size={20} className="text-blue-400" />,
            link: 'https://chromewebstore.google.com/detail/moeis-kehadiran-helper/aopjilfeegfaadfalilcnjgehpilnenm'
        },
        {
            id: 2,
            title: 'IDME PBD Helper',
            desc: 'Isi markah PBD automatik',
            icon: <ClipboardList size={20} className="text-green-400" />,
            link: 'https://chromewebstore.google.com/detail/idme-pbd-helper/ljbhcdaienegobdeoamibnnfihlnipkc'
        },
        {
            id: 3,
            title: 'PBD OnePage',
            desc: 'Cetak satu mukasurat',
            icon: <FileOutput size={20} className="text-purple-400" />,
            link: 'https://chromewebstore.google.com/detail/pbd-onepage-laporan-satu/lbefimcackfpdklimoiclkklookickjl'
        }
    ];

    return (
        <section id="demo" className="py-24 bg-black relative" aria-labelledby="demo-heading">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h2 id="demo-heading" className="text-3xl md:text-4xl font-bold mb-4">Lihat Bagaimana Ia Berfungsi</h2>
                    <p className="text-gray-400">
                        Video demo akan datang tidak lama lagi. Buat masa ini, cuba extension terus dari Chrome Web Store!
                    </p>
                </div>

                {/* Main Video Frame - Placeholder */}
                <div
                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-primary/10"
                    aria-label="Video demo akan datang"
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                        <div className="w-20 h-20 rounded-full bg-white/10 text-white/50 flex items-center justify-center pl-1 mb-4">
                            <Play size={32} fill="currentColor" aria-hidden="true" />
                        </div>
                        <p className="text-gray-400 text-sm">Video Demo</p>
                        <p className="text-gray-600 text-xs mt-1">Akan Datang</p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <h3 className="text-xl font-bold text-white">Cara Guna Guru Extension Hub</h3>
                        <p className="text-sm text-gray-300 mt-1">Demonstrasi lengkap ketiga-tiga extension</p>
                    </div>

                    <div className="absolute inset-0 z-[-1] opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" aria-hidden="true"></div>
                </div>

                {/* Extension Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8" role="list" aria-label="Senarai extension">
                    {demoVideos.map((video) => (
                        <a
                            key={video.id}
                            href={video.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all group"
                            role="listitem"
                        >
                            <div className="p-3 rounded-lg bg-white/10 group-hover:bg-primary/20 transition-colors">
                                {video.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-white text-sm">{video.title}</p>
                                <p className="text-xs text-gray-500">{video.desc}</p>
                            </div>
                            <div className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                Cuba →
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default DemoSection;
