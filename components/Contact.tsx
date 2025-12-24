import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SOCIALS } from '../constants';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdpqryy';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Sila isi semua ruangan.' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Sila masukkan email yang sah.' });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Mesej berjaya dihantar! Saya akan reply secepat mungkin.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Gagal menghantar mesej');
      }
    } catch {
      setStatus({ type: 'error', message: 'Gagal menghantar mesej. Sila cuba lagi atau email terus.' });
    }
  };

  return (
    <section id="contact" className="min-h-[100svh] flex flex-col bg-premium bg-noise relative overflow-hidden border-t border-white/5">
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

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-5 gap-8 mb-12">

            {/* Contact Form - Takes 3 columns */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-surface border border-white/10"
            >
              <div className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama anda"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    disabled={status.type === 'loading'}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    disabled={status.type === 'loading'}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mesej
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis mesej anda di sini..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    disabled={status.type === 'loading'}
                  />
                </div>

                {/* Status Message */}
                <AnimatePresence mode="wait">
                  {status.type !== 'idle' && status.type !== 'loading' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-center gap-2 p-3 rounded-xl ${
                        status.type === 'success'
                          ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                          : 'bg-red-500/10 border border-red-500/20 text-red-400'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span className="text-sm">{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[52px]"
                >
                  {status.type === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Menghantar...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Hantar Mesej</span>
                    </>
                  )}
                </button>
              </div>
            </motion.form>

            {/* Right Column - Email & Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Email Card */}
              <a
                href="mailto:aimansic97@gmail.com"
                className="group block p-6 rounded-2xl bg-surface border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1">Email Terus</h3>
                    <p className="text-gray-400 text-sm truncate">aimansic97@gmail.com</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </a>

              {/* Social Links Card */}
              <div className="p-6 rounded-2xl bg-surface border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Media Sosial</h3>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group min-h-[44px]"
                    >
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        {social.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white truncate">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time Note */}
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                <div className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-sm font-medium">Biasanya reply dalam 24 jam</span>
                </div>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
