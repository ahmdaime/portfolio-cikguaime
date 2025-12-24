import React from 'react';
import { SOCIALS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl font-display font-bold text-white mb-3">Nak tools baru?</h2>
            <p className="text-gray-400 text-lg font-light">Kalau ada idea, boleh share. Mana tahu jadi projek seterusnya.</p>
          </div>
          <a
            href="#contact"
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Hubungi Saya
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 font-medium">
            © {new Date().getFullYear()} Cikgu Aime. Dibina untuk guru Malaysia.
          </p>
          <div className="flex space-x-2">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;