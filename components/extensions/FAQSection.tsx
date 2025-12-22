import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
    const faqs = [
        {
            q: "Adakah extension ini selamat digunakan?",
            a: "Ya. Semua extension hanya beroperasi secara lokal di komputer anda. Tiada data murid yang dihantar keluar ke mana-mana server. Setiap extension mematuhi standard keselamatan Chrome Web Store dan mendapat rating 5 bintang."
        },
        {
            q: "Adakah ia melanggar polisi KPM?",
            a: "Tidak. Extension ini bertindak sebagai alat bantu 'autofill' sahaja, sama seperti fungsi autofill browser biasa. Ia tidak menceroboh database KPM - hanya membantu mengisi borang di antaramuka pengguna (frontend) dengan lebih pantas."
        },
        {
            q: "Bagaimana jika sistem MOIES/IDME berubah?",
            a: "Extension akan dikemaskini secara berkala selari dengan perubahan sistem KPM. Update akan dihantar automatik melalui Chrome Web Store. Anda hanya perlu pastikan extension sentiasa dikemaskini."
        },
        {
            q: "Perlu bayar ke?",
            a: "TIDAK. Semua extension adalah 100% PERCUMA selama-lamanya. Tiada yuran langganan, tiada caj tersembunyi. Ini adalah inisiatif persendirian untuk membantu rakan guru di Malaysia."
        },
        {
            q: "Boleh guna di telefon?",
            a: "Buat masa ini, extension hanya boleh digunakan di komputer/laptop dengan browser Chrome atau Edge. Versi smartphone dalam perancangan untuk masa hadapan."
        },
        {
            q: "Bagaimana nak pasang extension?",
            a: "Sangat mudah! Klik butang 'Pasang Percuma' di bahagian atas, anda akan dibawa ke Chrome Web Store. Klik 'Add to Chrome' dan extension akan dipasang automatik. Selepas itu, buka sistem MOIES/IDME seperti biasa dan anda akan nampak ikon extension di sebelah bar alamat."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-black">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Soalan Lazim</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <span className="font-semibold text-white pr-4">{faq.q}</span>
                                {openIndex === index ? <ChevronUp className="text-gray-400 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
