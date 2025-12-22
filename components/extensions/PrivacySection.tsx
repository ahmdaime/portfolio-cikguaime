import React from 'react';
import { Lock, EyeOff, Server, HardDrive } from 'lucide-react';

const PrivacySection = () => {
    return (
        <section id="keselamatan" className="py-24 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Data Murid Kekal Milik Sekolah</h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Kami faham sensitiviti data kerajaan. Oleh itu, arkitektur extension ini direka supaya
                            <span className="text-white font-bold"> tiada sebarang data peribadi murid dihantar ke server kami.</span>
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-3 bg-green-500/10 rounded-lg h-fit">
                                    <HardDrive className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Local Processing</h3>
                                    <p className="text-gray-400 text-sm">Semua pemprosesan Excel ke Portal berlaku dalam komputer anda sendiri (Client-side).</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg h-fit">
                                    <EyeOff className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Tiada Tracking</h3>
                                    <p className="text-gray-400 text-sm">Kami tidak menjejak aktiviti, nama murid, atau ID sekolah anda.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-sm text-yellow-200">
                                <strong>Nota Kebenaran:</strong> Chrome akan minta izin "Read and change all your data on websites you visit". Ini standard untuk extension berfungsi mengisi borang (DOM Manipulation), bukan untuk mencuri data.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-20"></div>

                        <div className="relative bg-[#111] border border-white/10 rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <Server className="w-5 h-5 text-gray-500" />
                                Aliran Data
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-gray-300 text-xs sm:text-sm">Komputer Cikgu</span>
                                    <div className="h-0.5 flex-1 mx-2 sm:mx-4 bg-green-500/50"></div>
                                    <span className="text-green-400 font-bold text-xs sm:text-sm">Extension</span>
                                </div>

                                <div className="flex justify-center -my-2 z-10 relative">
                                    <div className="bg-[#111] p-1">
                                        <Lock className="w-4 h-4 text-green-400" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg border border-white/5">
                                    <span className="text-green-400 font-bold text-xs sm:text-sm">Extension</span>
                                    <div className="h-0.5 flex-1 mx-2 sm:mx-4 bg-green-500/50"></div>
                                    <span className="text-gray-300 text-xs sm:text-sm">Portal KPM</span>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-mono flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    BLOCKED: Server Pihak Ketiga
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PrivacySection;
