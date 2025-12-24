import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, Tv, Calendar, Video, Mic } from 'lucide-react';
import { TVPSS_BOOKING } from '../../constants';

const timeSlots = [
    { time: '8:00 AM', status: 'available' },
    { time: '9:00 AM', status: 'booked' },
    { time: '10:00 AM', status: 'available' },
    { time: '11:00 AM', status: 'booked' },
];

const TvpssBookingCard: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2"
        >
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent border border-red-500/20 rounded-xl sm:rounded-2xl">
                {/* Left: Info */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded">
                            Web App
                        </span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase rounded">
                            TVPSS
                        </span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 flex items-center justify-center shadow-lg shrink-0">
                            <Tv className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white">{TVPSS_BOOKING.title}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">Studio Management System</p>
                        </div>
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                        {TVPSS_BOOKING.description}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                        {TVPSS_BOOKING.features.map((feature, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs sm:text-sm rounded-full"
                            >
                                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-red-400" />
                            <span className="text-white font-semibold text-sm sm:text-base">{TVPSS_BOOKING.users}</span>
                            <span className="text-gray-400 text-xs sm:text-sm">pengguna</span>
                        </div>
                    </div>

                    <a
                        href={TVPSS_BOOKING.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base rounded-full transition-all w-full sm:w-fit"
                    >
                        <Calendar className="w-4 h-4" />
                        Buka Sistem
                    </a>
                </div>

                {/* Right: Booking Interface Mockup - Hidden on mobile */}
                <div className="hidden md:block">
                    <div className="bg-[#1a1a1a] rounded-xl border border-white/10 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d0d] border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Studio Booking</span>
                            <div className="w-16"></div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* Date Header */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-white font-semibold">Isnin, 23 Dis 2024</span>
                                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">4 slot tersedia</span>
                            </div>

                            {/* Time Slots */}
                            <div className="space-y-2 mb-4">
                                {timeSlots.map((slot, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center justify-between p-3 rounded-lg border ${
                                            slot.status === 'available'
                                                ? 'bg-green-500/5 border-green-500/20'
                                                : 'bg-red-500/5 border-red-500/20'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span className="text-white text-sm">{slot.time}</span>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${
                                                slot.status === 'available'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-red-500/20 text-red-400'
                                            }`}
                                        >
                                            {slot.status === 'available' ? 'Tersedia' : 'Ditempah'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Equipment Icons */}
                            <div className="flex items-center justify-center gap-4 pt-3 border-t border-white/5">
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Video className="w-4 h-4" />
                                    <span className="text-xs">Kamera</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Mic className="w-4 h-4" />
                                    <span className="text-xs">Mikrofon</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Tv className="w-4 h-4" />
                                    <span className="text-xs">Studio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TvpssBookingCard;
