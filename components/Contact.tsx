import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles, ArrowRight } from 'lucide-react';
import { SOCIALS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col bg-premium bg-noise relative overflow-hidden border-t border-white/5">
      {/* Gradient Orbs */}
      <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-1/3 -right-48 opacity-40" />
      <div className="gradient-orb gradient-orb-blue w-[400px] h-[400px] bottom-1/4 -left-32 opacity-30" />

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-center py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full border border-white/10 bg-surface/50 backdrop-blur-sm">
              <span className="text-xs font-semibold tracking-widest text-white uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Hubungi Saya
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Ada idea? <br />
              <span className="text-gray-400">Jom bincang.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
              Nak request feature baru? Atau sekadar nak tanya pasal tools? Boleh je DM atau email.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">

            {/* Email Card */}
            <motion.a
              href="mailto:aimansic97@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-surface border border-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2 group-hover:-translate-y-2">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>

              <div className="flex flex-col h-full justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
                  <p className="text-gray-400 mb-4 text-sm">aimansic97@gmail.com</p>
                  <span className="text-sm font-medium text-white border-b border-white/20 pb-0.5 group-hover:border-white transition-colors">Hantar mesej</span>
                </div>
              </div>
            </motion.a>

            {/* Social Links Card */}
            <div className="relative p-8 rounded-3xl bg-surface border border-white/10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Media Sosial</h3>
                <p className="text-gray-400 text-sm">Ikuti update terkini</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {social.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Response Time Note */}
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium">
              Biasanya reply dalam 24 jam
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
