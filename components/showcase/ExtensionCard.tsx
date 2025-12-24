import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Chrome, Users, CheckCircle2 } from 'lucide-react';
import { EXTENSIONS } from '../../constants';
import LazyImage from '../LazyImage';
import StarRating from './StarRating';

interface ExtensionCardProps {
    ext: typeof EXTENSIONS[0];
    index: number;
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({ ext, index }) => {
    const CardWrapper = ext.isInternal ? Link : 'a';
    const cardProps = ext.isInternal
        ? { to: ext.link }
        : { href: ext.link, target: '_blank', rel: 'noopener noreferrer' };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <CardWrapper
                {...cardProps as any}
                className="group block bg-[#202124] border border-[#3c4043] rounded-xl overflow-hidden hover:border-[#8ab4f8] hover:bg-[#292a2d] transition-all duration-300"
            >
                {/* Card Header with Screenshot */}
                <div className="relative h-40 bg-[#171717] overflow-hidden">
                    {ext.image ? (
                        <LazyImage
                            src={ext.image}
                            alt={ext.title}
                            width={400}
                            height={160}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${ext.gradient} opacity-30`} />
                    )}

                    {/* Featured Badge */}
                    {ext.isFeatured && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-[#8ab4f8] text-[#202124] text-[10px] font-bold uppercase rounded">
                            Pilihan Editor
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium rounded">
                        {ext.category}
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                    {/* Icon + Title Row */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ext.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                            {ext.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-lg truncate group-hover:text-[#8ab4f8] transition-colors">
                                {ext.title}
                            </h3>
                            <p className="text-[#9aa0a6] text-xs">oleh Cikgu Aime</p>
                        </div>
                    </div>

                    {/* Rating & Users */}
                    <div className="flex items-center gap-4 mb-4">
                        {ext.rating && <StarRating rating={ext.rating} />}
                        <div className="flex items-center gap-1 text-[#9aa0a6] text-sm">
                            <Users className="w-3.5 h-3.5" />
                            <span>{ext.users} pengguna</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#9aa0a6] text-sm leading-relaxed line-clamp-2 mb-4">
                        {ext.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {ext.features.slice(0, 3).map((feature, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-[#3c4043] text-[#9aa0a6] text-[11px] rounded-full"
                            >
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <button className="w-full py-3 px-4 bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-semibold rounded-full flex items-center justify-center gap-2 transition-colors">
                        <Chrome className="w-4 h-4" />
                        Pasang Percuma
                    </button>
                </div>
            </CardWrapper>
        </motion.div>
    );
};

export default ExtensionCard;
