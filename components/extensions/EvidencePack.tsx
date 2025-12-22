import React from 'react';
import { ExternalLink, Star, Users, UserCheck, ClipboardList, FileOutput } from 'lucide-react';

const EvidencePack = () => {
    const extensions = [
        {
            name: 'PBD OnePage',
            users: '4,485',
            rating: '5.0',
            icon: <FileOutput className="w-8 h-8 text-purple-400" />,
            desc: 'Tukar laporan PBD banyak mukasurat kepada satu mukasurat.',
            link: 'https://chromewebstore.google.com/detail/pbd-onepage-laporan-satu/lbefimcackfpdklimoiclkklookickjl',
            color: 'bg-purple-500/10 border-purple-500/20'
        },
        {
            name: 'MOIES Kehadiran Helper',
            users: '3,427',
            rating: '5.0',
            icon: <UserCheck className="w-8 h-8 text-blue-400" />,
            desc: 'Automasi pengisian kehadiran dalam sistem MOIES.',
            link: 'https://chromewebstore.google.com/detail/moeis-kehadiran-helper/aopjilfeegfaadfalilcnjgehpilnenm',
            color: 'bg-blue-500/10 border-blue-500/20'
        },
        {
            name: 'IDME PBD Helper',
            users: '2,852',
            rating: '5.0',
            icon: <ClipboardList className="w-8 h-8 text-green-400" />,
            desc: 'Memudahkan pengisian PBD dan markah dalam sistem IDME.',
            link: 'https://chromewebstore.google.com/detail/idme-pbd-helper/ljbhcdaienegobdeoamibnnfihlnipkc',
            color: 'bg-green-500/10 border-green-500/20'
        }
    ];

    return (
        <section id="evidence-pack" className="py-24 bg-[#111] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Lihat Sendiri di Chrome Web Store</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Semua extension boleh dilihat dan dimuat turun terus dari Chrome Web Store. Lihat rating dan ulasan sebenar dari guru-guru Malaysia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {extensions.map((ext, index) => (
                        <a
                            key={index}
                            href={ext.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group p-6 rounded-xl border ${ext.color} hover:bg-white/5 transition-all`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-black/30 rounded-lg group-hover:scale-110 transition-transform">
                                    {ext.icon}
                                </div>
                                <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                            </div>

                            <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">{ext.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{ext.desc}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-1 text-sm">
                                    <Users size={14} className="text-gray-500" />
                                    <span className="text-gray-400">{ext.users}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                                    <span className="text-yellow-400 font-bold">{ext.rating}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-center sm:text-left">
                            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Jumlah Keseluruhan</p>
                            <p className="text-xl sm:text-2xl font-bold text-white">10,764+ Pengguna</p>
                        </div>
                        <div className="w-full h-px sm:w-px sm:h-12 bg-white/10"></div>
                        <div className="text-center sm:text-left">
                            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Rating Purata</p>
                            <div className="flex items-center justify-center sm:justify-start gap-1">
                                <Star size={18} className="text-yellow-400" fill="currentColor" />
                                <span className="text-xl sm:text-2xl font-bold text-white">5.0</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default EvidencePack;
