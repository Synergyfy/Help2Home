'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineXMark, HiOutlineShieldCheck, HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';
import { MdOutlineVilla, MdStar, MdHandshake } from 'react-icons/md';
import PartnerApplicationModal from '@/components/dashboard/investor/PartnerApplicationModal';

interface ListerProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    listerName: string;
    listerImage?: string;
    listerRole: string;
    listerVerified?: boolean;
}

export default function ListerProfileModal({
    isOpen,
    onClose,
    listerName,
    listerImage,
    listerRole,
    listerVerified
}: ListerProfileModalProps) {
    const [isPartnerModalOpen, setIsPartnerModalOpen] = React.useState(false);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-4xl shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] scrollbar-hide"
                >
                    {/* Header/Banner */}
                    <div className="h-32 bg-brand-green relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all z-10"
                        >
                            <HiOutlineXMark size={24} />
                        </button>
                    </div>

                    {/* Profile Header */}
                    <div className="px-8 pb-8 -mt-16 relative">
                        <div className="flex flex-col md:flex-row items-end md:items-center gap-6 mb-6">
                            <div className="relative size-32 rounded-4xl bg-white p-1 shadow-xl overflow-hidden ring-4 ring-white">
                                {listerImage ? (
                                    <img src={listerImage} alt={listerName} className="size-full object-cover rounded-[1.8rem]" />
                                ) : (
                                    <div className="size-full flex items-center justify-center text-brand-green bg-brand-green/5 rounded-[1.8rem]">
                                        <MdOutlineVilla size={48} />
                                    </div>
                                )}
                                {listerVerified && (
                                    <div className="absolute -bottom-2 -right-2 size-10 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-brand-green">
                                        <HiOutlineShieldCheck className="text-brand-green" size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 mt-4 md:mt-0 pt-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-2xl font-black text-gray-900">{listerName}</h2>
                                    {listerVerified && (
                                        <span className="px-2 py-0.5 rounded-full bg-green-50 text-brand-green text-[10px] font-black uppercase tracking-wider border border-green-100">Verified</span>
                                    )}
                                </div>
                                <p className="text-sm font-bold text-brand-green uppercase tracking-widest flex items-center gap-2">
                                    {listerRole}
                                    <span className="size-1 rounded-full bg-gray-300"></span>
                                    Member since 2024
                                </p>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Listings</p>
                                <p className="text-xl font-black text-gray-900">12</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Rating</p>
                                <div className="flex items-center justify-center gap-1 text-xl font-black text-gray-900">
                                    4.9 <MdStar className="text-amber-400" size={20} />
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Jobs</p>
                                <p className="text-xl font-black text-gray-900">156</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">About</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Professional {listerRole} with extensive experience in the Abuja real estate market.
                                Focused on high-end residential properties and commercial spaces.
                                Committed to providing transparent and efficient service to all clients.
                            </p>
                        </div>

                        {/* Verification Details */}
                        <div className="mb-8 p-4 bg-green-50/50 rounded-2xl border border-green-100">
                            <h4 className="text-xs font-bold text-brand-green uppercase tracking-widest mb-3 flex items-center gap-2">
                                <HiOutlineShieldCheck size={16} /> Trust & Safety
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                    <span className="size-1.5 rounded-full bg-brand-green"></span>
                                    Government Issued ID Verified
                                </li>
                                <li className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                    <span className="size-1.5 rounded-full bg-brand-green"></span>
                                    Business License Verified
                                </li>
                                <li className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                    <span className="size-1.5 rounded-full bg-brand-green"></span>
                                    Email & Phone Confirmed
                                </li>
                            </ul>
                        </div>

                        {/* Contact Options (Placeholder) */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                                <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400">
                                    <HiOutlineEnvelope size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm font-bold text-gray-900">ve******@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                                <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400">
                                    <HiOutlinePhone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                                    <p className="text-sm font-bold text-gray-900">+234 **** *** 890</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-8">
                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-brand-green text-white font-bold rounded-2xl shadow-lg shadow-brand-green/20 hover:bg-green-700 transition-all active:scale-[0.98]"
                            >
                                Connect with Lister
                            </button>

                            {listerRole?.toLowerCase() === 'developer' && (
                                <button
                                    onClick={() => setIsPartnerModalOpen(true)}
                                    className="w-full py-4 bg-[#111811] text-white font-bold rounded-2xl shadow-lg hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <MdHandshake size={20} />
                                    Become a Partner
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            <PartnerApplicationModal
                isOpen={isPartnerModalOpen}
                onClose={() => setIsPartnerModalOpen(false)}
                developerName={listerName}
            />
        </AnimatePresence>
    );
}
