import React from 'react';
import { Check, DollarSign, Wrench, Rocket, Smartphone, Target } from 'lucide-react';

const CostSection = () => {
    return (
        <section className="py-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Cost & Maintenance */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Kos & Kebolehaksanaan</h2>

                        <div className="space-y-6">
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-green-500/10 rounded-lg">
                                        <DollarSign className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white mb-2">100% Percuma</h3>
                                        <p className="text-gray-400 text-sm">Semua extension adalah PERCUMA sepenuhnya. Tiada yuran langganan, tiada caj tersembunyi. Percuma selama-lamanya.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-lg">
                                        <Wrench className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white mb-2">Sentiasa Dikemaskini</h3>
                                        <p className="text-gray-400 text-sm">Extension dikemaskini secara berkala selari dengan perubahan sistem KPM. Update automatik melalui Chrome Web Store.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
                            <p className="text-gray-300 text-sm flex items-center gap-2">
                                <Check className="text-primary" size={18} />
                                <span>Dibangunkan oleh guru, untuk guru.</span>
                            </p>
                        </div>
                    </div>

                    {/* Roadmap */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8">Hala Tuju</h2>
                        <div className="relative border-l border-white/10 ml-3 space-y-8 pl-8">

                            {/* Fasa 1 - Sekarang */}
                            <div className="relative">
                                <span className="absolute -left-[41px] w-6 h-6 rounded-full bg-green-500 border-4 border-black flex items-center justify-center">
                                    <Check className="w-3 h-3 text-black" />
                                </span>
                                <div className="flex items-center gap-2 mb-2">
                                    <Rocket className="w-4 h-4 text-green-400" />
                                    <h3 className="font-bold text-lg text-green-400">Fasa 1: Siap Sepenuhnya</h3>
                                </div>
                                <ul className="mt-2 space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-gray-400">
                                        <Check size={14} className="text-green-400" />
                                        3 extension aktif di Chrome Web Store
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-400">
                                        <Check size={14} className="text-green-400" />
                                        10,700+ guru menggunakan
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-400">
                                        <Check size={14} className="text-green-400" />
                                        Rating 5 bintang semua extension
                                    </li>
                                </ul>
                            </div>

                            {/* Fasa 2 */}
                            <div className="relative">
                                <span className="absolute -left-[41px] w-6 h-6 rounded-full bg-blue-500/20 border-4 border-black flex items-center justify-center">
                                    <Smartphone className="w-3 h-3 text-blue-400" />
                                </span>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-lg text-blue-400">Fasa 2: Akan Datang</h3>
                                </div>
                                <ul className="mt-2 space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="w-3.5 h-3.5 rounded-full border border-gray-600"></div>
                                        Boleh digunakan di smartphone
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="w-3.5 h-3.5 rounded-full border border-gray-600"></div>
                                        Dikemaskini selari dengan sistem KPM
                                    </li>
                                </ul>
                            </div>

                            {/* Fasa 3 */}
                            <div className="relative">
                                <span className="absolute -left-[41px] w-6 h-6 rounded-full bg-purple-500/20 border-4 border-black flex items-center justify-center">
                                    <Target className="w-3 h-3 text-purple-400" />
                                </span>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-lg text-purple-400">Fasa 3: Sasaran</h3>
                                </div>
                                <p className="text-gray-500 text-sm mt-1">Digunakan oleh 50,000 guru di seluruh Malaysia.</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CostSection;
