
import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee } from 'lucide-react';
import { SOCIALS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Utama', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Projek', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Media', href: '#media' },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Menu utama"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/80 backdrop-blur-lg border-b border-white/10 py-3 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Cikgu Aime<span className="text-white">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center gap-3 ml-4">
             <a
              href="https://buymeacoffee.com/cikguaime"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-[#FFDD00]/10 text-[#FFDD00] hover:bg-[#FFDD00] hover:text-black transition-all border border-[#FFDD00]/50 focus:outline-none focus:ring-2 focus:ring-[#FFDD00]"
              aria-label="Sokong saya di Buy Me a Coffee"
            >
              <Coffee size={18} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm font-semibold"
            >
              Hubungi
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-dark/95 backdrop-blur-xl border-b border-white/10 py-8 px-6 flex flex-col space-y-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg text-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://buymeacoffee.com/cikguaime"
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-[#FFDD00] font-semibold"
          >
            <Coffee className="mr-2" size={18} /> Sokong Saya
          </a>
          <div className="flex space-x-4 pt-4 border-t border-white/10">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
