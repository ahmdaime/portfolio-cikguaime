import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 text-indigo-400 p-3 bg-indigo-500/10 rounded-full">
                {stat.icon}
              </div>
              <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                {stat.prefix}{stat.value}<span className="text-indigo-500 text-3xl align-top">{stat.suffix}</span>
              </h3>
              <p className="text-gray-400 uppercase tracking-widest text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;