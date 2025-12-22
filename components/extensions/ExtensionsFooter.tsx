import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Globe, Facebook } from 'lucide-react';

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const ExtensionsFooter = () => {
    const socialLinks = [
        { name: 'Website', url: 'https://www.cikguaime.com/', icon: <Globe size={20} /> },
        { name: 'Facebook', url: 'https://www.facebook.com/aimansic/', icon: <Facebook size={20} /> },
        { name: 'TikTok', url: 'https://www.tiktok.com/@ahmdaime', icon: <TikTokIcon /> },
        { name: 'Email', url: 'mailto:aimansic97@gmail.com', icon: <Mail size={20} /> }
    ];

    return (
        <footer className="py-12 bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-white mb-2">Cikgu Aiman</h3>
                        <p className="text-gray-500 text-sm mb-4">Membangunkan penyelesaian digital untuk pendidikan Malaysia.</p>
                        <Link to="/" className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors">
                            <ArrowLeft size={16} className="mr-2" />
                            Kembali ke Portfolio Utama
                        </Link>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="flex space-x-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                                    rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Cikgu Aiman. All rights reserved.</p>
                            <p className="text-xs text-gray-700 mt-1">Bukan produk rasmi KPM. Inisiatif persendirian.</p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default ExtensionsFooter;
