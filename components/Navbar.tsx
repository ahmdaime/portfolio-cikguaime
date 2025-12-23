
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Utama', href: '#home' },
    { name: 'Inovasi', href: '/extensions' },
    { name: 'Projek', href: '#projects' },
    { name: 'Proses Kerja', href: '#services' },
    { name: 'Tentang Saya', href: '#about' },
    { name: 'Penulisan', href: '#blog' },
  ];

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main menu"
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? 'py-4' : 'py-4 md:py-6'
          }`}
      >
        <div
          className={`
            flex items-center justify-between px-4 sm:px-6 py-3 rounded-full
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
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Buy Me A Coffee (Icon only on desktop for minimalism) */}
            <a
              href="https://buymeacoffee.com/cikguaime"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all border border-yellow-500/20"
              aria-label="Belanja saya kopi"
            >
              <Coffee size={18} />
            </a>

            {/* Contact Button */}
            <a
              href="#contact"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black hover:bg-gray-200 transition-all text-xs font-bold uppercase tracking-wide flex items-center gap-2"
            >
              Hubungi
            </a>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-black border-l border-white/10 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Tutup menu"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-6">
                  {navLinks.map((link, index) => {
                    const isInternal = link.href.startsWith('/');
                    const linkClass = "group flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors";
                    const content = (
                      <>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-gray-600">0{index + 1}</span>
                          <span className="text-lg font-display font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {link.name}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </>
                    );

                    return isInternal ? (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          className={linkClass}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {content}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={linkClass}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {content}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 space-y-6">
                  {/* Buy Me Coffee */}
                  <motion.a
                    href="https://buymeacoffee.com/cikguaime"
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Coffee size={20} className="text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-500">Belanja Saya Kopi</span>
                  </motion.a>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex gap-3"
                  >
                    {SOCIALS.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 p-3 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
