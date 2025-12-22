import React from 'react';
import { UserCheck, ClipboardList, FileOutput } from 'lucide-react';

const EcosystemOverview = () => {
    const ecosystems = [
        {
            title: 'MOIES Kehadiran Helper',
            desc: 'Automasi pengisian kehadiran dalam sistem MOIES. Isi sebab dan kategori ketidakhadiran secara pukal.',
            icon: <UserCheck className="w-8 h-8 text-blue-400" />,
            color: 'bg-blue-500/10 border-blue-500/20',
            users: '3,427'
        },
        {
            title: 'IDME PBD Helper',
            desc: 'Mudahkan pengisian PBD dan markah dalam IDME untuk guru yang mengajar banyak kelas.',
            icon: <ClipboardList className="w-8 h-8 text-green-400" />,
            color: 'bg-green-500/10 border-green-500/20',
            users: '2,852'
        },
        {
            title: 'PBD OnePage',
            desc: 'Tukar laporan PBD yang banyak mukasurat kepada satu mukasurat sahaja. Jimat kertas dan dakwat.',
            icon: <FileOutput className="w-8 h-8 text-purple-400" />,
            color: 'bg-purple-500/10 border-purple-500/20',
            users: '4,485'
        }
    ];

    return (
        <section className="py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider text-sm">3 EXTENSION PERCUMA</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">Satu Untuk Setiap Masalah</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Setiap extension direka khas untuk menyelesaikan satu masalah spesifik. Pilih yang anda perlukan, atau gunakan kesemuanya.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ecosystems.map((item, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl border ${item.color} hover:bg-white/5 transition-all duration-300 group cursor-default`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-xl bg-black/50 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-white">{item.users}</p>
                                    <p className="text-xs text-gray-500">pengguna</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Jumlah keseluruhan: <span className="text-white font-bold">10,764+ guru</span> dari seluruh Malaysia
                    </p>
                </div>
            </div>
        </section>
    );
};

export default EcosystemOverview;
