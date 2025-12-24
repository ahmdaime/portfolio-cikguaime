import React, { useState } from 'react';
import { Menu, X, Rocket, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const ExtensionsNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scrolled = useScrollPosition({ threshold: 20 });

    const navLinks = [
        { name: 'Utama', href: '#hero' },
        { name: 'Masalah', href: '#masalah' },
        { name: 'Extension', href: '#extension' },
        { name: 'Bukti', href: '#bukti' },
        { name: 'Keselamatan', href: '#keselamatan' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Cikgu Aiman
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        <a
                            href="#evidence-pack"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/5 transition-all"
                        >
                            <Download size={16} />
                            Evidence Pack
                        </a>
                        <a
                            href="#demo"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                        >
                            <Rocket size={16} />
                            Tonton Demo
                        </a>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="sr-only">{isOpen ? 'Tutup menu' : 'Buka menu utama'}</span>
                            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div id="mobile-menu" className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#demo"
                            className="block w-full text-center mt-4 px-4 py-3 font-medium text-white bg-primary rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Tonton Demo
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default ExtensionsNavbar;
