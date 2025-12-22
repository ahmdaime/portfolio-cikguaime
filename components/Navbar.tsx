
import React, { useState, useEffect } from 'react';
import { Menu, X, Coffee, ArrowRight } from 'lucide-react';
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
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#projects' },
    { name: 'Process', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main menu"
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div
          className={`
            flex items-center justify-between px-6 py-3 rounded-full 
            transition-all duration-300 w-[95%] max-w-5xl
            ${isScrolled
              ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20'
              : 'bg-transparent border border-transparent'
            }
          `}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group" aria-label="Cikgu Aime - Halaman utama">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold font-display text-sm group-hover:scale-110 transition-transform">
              C
            </div>
            <span className="font-display font-bold text-white tracking-tight hidden sm:block group-hover:text-gray-300 transition-colors">
              Cikgu Aime
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Buy Me A Coffee (Icon only on desktop for minimalism) */}
            <a
              href="https://buymeacoffee.com/cikguaime"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all border border-yellow-500/20"
              aria-label="Support me"
            >
              <Coffee size={18} />
            </a>

            {/* Contact Button */}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all text-xs font-bold uppercase tracking-wide flex items-center gap-2"
            >
              Hubungi
            </a>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-display font-bold text-white border-b border-white/10 pb-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://buymeacoffee.com/cikguaime"
              target="_blank"
              rel="noreferrer"
              className="text-lg text-yellow-500 font-medium pt-2 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Coffee size={20} /> Support My Work
            </a>
          </div>

          <div className="mt-8 flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
