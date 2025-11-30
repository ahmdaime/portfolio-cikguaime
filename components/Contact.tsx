import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';
import { SOCIALS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-white/5">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-indigo-950/20 to-dark pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Mari Berhubung
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Jom <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Berbincang</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ada soalan tentang extension atau nak berkongsi idea? Saya sedia membantu komuniti pendidik Malaysia.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">

            {/* Email Card */}
            <motion.a
              href="mailto:aimansic97@gmail.com"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">Email Saya</h3>
                  <p className="text-gray-400 text-sm mb-3">Untuk pertanyaan atau kerjasama</p>
                  <p className="text-blue-400 font-medium break-all">aimansic97@gmail.com</p>
                </div>
                <Send className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </motion.a>

            {/* Social Links Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <div className="text-left mb-6">
                <h3 className="text-xl font-bold mb-2">Ikuti Saya</h3>
                <p className="text-gray-400 text-sm">Konten pendidikan & tips EdTech</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all"
                    title={social.name}
                  >
                    <div className="text-gray-400 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

          {/* CTA Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
          >
            <p className="text-gray-300 text-lg mb-4">
              💡 <strong className="text-white">Tip:</strong> Untuk sokongan teknikal extension, sila email dengan screenshot masalah yang dihadapi.
            </p>
            <p className="text-gray-400 text-sm">
              Biasanya saya reply dalam masa 24-48 jam. Terima kasih atas kesabaran anda! 🙏
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
