import React from 'react';
import { ShieldCheck, RefreshCw, HeartHandshake, Lock } from 'lucide-react';

const UniquenessSection = () => {
    const features = [
        {
            icon: <ShieldCheck className="w-6 h-6 text-primary" />,
            title: 'Kualiti Enterprise',
            desc: 'Dibina menggunakan teknologi moden (React + TypeScript) yang stabil dan pantas, bukan skrip tampalan.'
        },
        {
            icon: <RefreshCw className="w-6 h-6 text-primary" />,
            title: 'Kemas Kini Berkala',
            desc: 'Sistem sentiasa dikemaskini mengikut perubahan portal KPM. Tiada lagi isu "extension tak jalan".'
        },
        {
            icon: <HeartHandshake className="w-6 h-6 text-primary" />,
            title: 'Sokongan Terus',
            desc: 'Saluran Telegram khas untuk bantuan teknikal dan cadangan penambahbaikan terus kepada pembangun.'
        },
        {
            icon: <Lock className="w-6 h-6 text-primary" />,
            title: 'Privasi Terjamin',
            desc: 'Tiada data murid disimpan di server luar. Semua pemprosesan berlaku dalam browser anda.'
        }
    ];

    return (
        <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Mengapa Pilih Extension Ini?</h2>
                        <p className="text-gray-400">Perbezaan ketara berbanding kaedah manual atau tool lain.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UniquenessSection;
