import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';
import LazyImage from './LazyImage';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Suara Guru Malaysia</h2>
          <p className="text-gray-400">Apa kata rakan seperjuangan tentang extension ini.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <Quote className="w-10 h-10 text-indigo-500/30 mb-6" />
              <p className="text-gray-300 text-lg mb-6 italic">"{t.text}"</p>
              <div className="flex items-center">
                <LazyImage
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-500/50 mr-4 object-cover"
                  width={48}
                  height={48}
                />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;