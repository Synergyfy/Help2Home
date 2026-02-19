'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineXMark,
    HiOutlineUser,
    HiOutlineHome,
    HiOutlineCalendarDays,
    HiOutlineClock,
    HiOutlinePhone,
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlineCheckCircle
} from 'react-icons/hi2';
import { toast } from 'react-toastify';

export interface Inspection {
    id: string | number;
    name: string;
    prop: string;
    time: string;
    day: string;
    month: string;
    type?: string;
    email?: string;
    phone?: string;
    location?: string;
    status?: 'Confirmed' | 'Pending' | 'Cancelled';
}

interface InspectionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    inspection: Inspection | null;
}

export default function InspectionDetailsModal({ isOpen, onClose, inspection }: InspectionDetailsModalProps) {
    if (!inspection) return null;

    const handleConfirm = () => {
        toast.success(`Inspection for ${inspection.name} confirmed!`);
        onClose();
    };

    const handleContact = (type: 'phone' | 'email') => {
        if (type === 'phone') {
            window.location.href = `tel:${inspection.phone || '+2348000000000'}`;
        } else {
            window.location.href = `mailto:${inspection.email || 'client@example.com'}`;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 bg-blue-600 relative shrink-0">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                            >
                                <HiOutlineXMark size={24} />
                            </button>
                            <div className="flex items-center gap-6">
                                <div className="size-20 rounded-3xl bg-white/20 backdrop-blur-md flex flex-col items-center justify-center border border-white/30 text-white shadow-inner">
                                    <span className="text-[10px] font-semibold uppercase tracking-widest leading-none mb-1">{inspection.month}</span>
                                    <span className="text-3xl font-semibold leading-none">{inspection.day}</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-white leading-tight">Inspection Details</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-semibold bg-white/20 px-3 py-1 rounded-full text-white uppercase tracking-[0.2em]">
                                            ID: INS-{inspection.id}
                                        </span>
                                        <span className="text-[10px] font-semibold bg-white/20 px-3 py-1 rounded-full text-white uppercase tracking-[0.2em]">
                                            {inspection.status || 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                            {/* Client Info */}
                            <section>
                                <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">Client Information</h3>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <HiOutlineUser size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{inspection.name}</p>
                                        <p className="text-xs text-gray-500 font-medium">{inspection.type || 'Prospective Buyer'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleContact('phone')}
                                            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:text-brand-green hover:border-brand-green transition-all shadow-sm"
                                        >
                                            <HiOutlinePhone size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleContact('email')}
                                            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"
                                        >
                                            <HiOutlineEnvelope size={18} />
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Property & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100">
                                    <HiOutlineHome className="text-brand-green mb-3" size={24} />
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Property</p>
                                    <p className="text-sm font-semibold text-gray-900 leading-tight">{inspection.prop}</p>
                                </div>
                                <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100">
                                    <HiOutlineClock className="text-blue-600 mb-3" size={24} />
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Time Slot</p>
                                    <p className="text-sm font-semibold text-gray-900 leading-tight">{inspection.time}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <section>
                                <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm text-red-500">
                                        <HiOutlineMapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Meeting Point</p>
                                        <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                                            {inspection.location || '123 Admiralty Way, Lekki Phase 1, Lagos'}
                                        </p>
                                        <button className="text-xs font-semibold text-brand-green mt-2 hover:underline">Get Directions →</button>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Actions */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4 shrink-0">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 px-6 border-2 border-gray-200 text-gray-500 font-semibold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-[2] py-4 px-6 bg-brand-green text-white font-semibold rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2 active:scale-95"
                            >
                                <HiOutlineCheckCircle size={20} strokeWidth={2.5} />
                                Confirm Arrival
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
