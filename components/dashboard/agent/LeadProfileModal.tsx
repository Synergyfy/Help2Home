'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineXMark,
    HiOutlinePhone,
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlineBriefcase,
    HiOutlineWallet,
    HiOutlineCalendarDays,
    HiOutlineShieldCheck,
    HiOutlineChatBubbleLeftRight
} from 'react-icons/hi2';

export interface Lead {
    id: string;
    name: string;
    interest: string;
    budget: string;
    status: 'Hot' | 'Warm' | 'Cold';
    joined: string;
    email: string;
    phone: string;
    location: string;
    occupation: string;
    notes?: string;
    verified?: boolean;
}

interface LeadProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: Lead | null;
}

export default function LeadProfileModal({ isOpen, onClose, lead }: LeadProfileModalProps) {
    if (!lead) return null;

    const handleContact = (type: 'phone' | 'email') => {
        if (type === 'phone') {
            window.location.href = `tel:${lead.phone}`;
        } else {
            window.location.href = `mailto:${lead.email}`;
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
                        className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-8 bg-brand-green relative shrink-0">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                            >
                                <HiOutlineXMark size={24} />
                            </button>
                            <div className="flex items-center gap-6">
                                <div className="size-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white text-3xl font-bold shadow-inner uppercase">
                                    {lead.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-white leading-tight flex items-center gap-2">
                                        {lead.name}
                                        {lead.verified && <HiOutlineShieldCheck size={20} className="text-white" />}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-white/30 ${
                                            lead.status === 'Hot' ? 'bg-red-500/20 text-red-100' : 'bg-orange-500/20 text-orange-100'
                                        }`}>
                                            {lead.status} Status
                                        </span>
                                        <span className="text-[10px] font-semibold bg-white/20 px-3 py-1 rounded-full text-white uppercase tracking-[0.2em]">
                                            Joined {lead.joined}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                            {/* Contact Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleContact('phone')}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-green transition-all group"
                                >
                                    <div className="size-10 rounded-xl bg-white flex items-center justify-center text-brand-green shadow-sm group-hover:bg-brand-green group-hover:text-white transition-colors">
                                        <HiOutlinePhone size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Phone Number</p>
                                        <p className="text-sm font-semibold text-gray-900">{lead.phone}</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleContact('email')}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-600 transition-all group"
                                >
                                    <div className="size-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <HiOutlineEnvelope size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Email Address</p>
                                        <p className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">{lead.email}</p>
                                    </div>
                                </button>
                            </div>

                            {/* Details Section */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                            <HiOutlineBriefcase size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Occupation</p>
                                            <p className="text-sm font-semibold text-gray-900">{lead.occupation}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                            <HiOutlineWallet size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Budget Range</p>
                                            <p className="text-sm font-semibold text-gray-900">{lead.budget}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                                            <HiOutlineMapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Current Location</p>
                                            <p className="text-sm font-semibold text-gray-900">{lead.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                            <HiOutlineCalendarDays size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Interested In</p>
                                            <p className="text-sm font-semibold text-gray-900">{lead.interest}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {lead.notes && (
                                <section>
                                    <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">Internal Notes</h3>
                                    <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100">
                                        <p className="text-sm text-gray-600 leading-relaxed italic">"{lead.notes}"</p>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4 shrink-0">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 px-6 border-2 border-gray-200 text-gray-500 font-semibold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    onClose();
                                    window.location.href = `/dashboard/agent/support/inbox?leadId=${lead.id}`;
                                }}
                                className="flex-[2] py-4 px-6 bg-brand-green text-white font-semibold rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2 active:scale-95"
                            >
                                <HiOutlineChatBubbleLeftRight size={20} />
                                Start Conversation
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
