import React from 'react';
import { SOCIALS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold mb-2">Jom Berkolaborasi!</h2>
            <p className="text-gray-400">Ada idea untuk mudahkan kerja guru? Hubungi saya.</p>
          </div>
          <a
            href="mailto:cikguaime@example.com"
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
          >
            Hubungi Saya
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Cikgu Aime. Dibina untuk Guru Malaysia.
          </p>
          <div className="flex space-x-6">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
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