'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineXMark,
    HiOutlineUser,
    HiOutlineHome,
    HiOutlineCalendarDays,
    HiOutlineClock,
    HiOutlineCheckCircle
} from 'react-icons/hi2';
import { toast } from 'react-toastify';

interface AgentBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (newBooking: any) => void;
}

export default function AgentBookingModal({ isOpen, onClose, onConfirm }: AgentBookingModalProps) {
    const [formData, setFormData] = useState({
        client: '',
        property: '',
        date: '',
        time: '',
        type: 'Initial Viewing',
        email: '',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.client || !formData.property || !formData.date || !formData.time) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Format date for display (e.g., "Oct 15")
        const dateObj = new Date(formData.date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${months[dateObj.getMonth()]} ${dateObj.getDate()}`;

        // Format time for display (e.g., "10:30 AM")
        const [hours, mins] = formData.time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        const formattedTime = `${h12}:${mins} ${ampm}`;

        onConfirm({
            id: Date.now(),
            ...formData,
            date: formattedDate,
            time: formattedTime,
            fullDate: formData.date // Keep the original for logic
        });
        
        toast.success(`Slot booked for ${formData.client} successfully!`);
        onClose();
        setFormData({
            client: '',
            property: '',
            date: '',
            time: '',
            type: 'Initial Viewing',
            email: '',
            phone: ''
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-start mb-6">
                                <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green border border-brand-green/20">
                                    <HiOutlineCalendarDays size={32} />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <HiOutlineXMark size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Book Inspection Slot</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                Manually schedule a viewing or consultation for a client.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Client Name *</label>
                                        <div className="relative">
                                            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="text"
                                                placeholder="e.g. Princewill Amadi"
                                                value={formData.client}
                                                onChange={(e) => setFormData({...formData, client: e.target.value})}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-semibold text-gray-900"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Property *</label>
                                        <div className="relative">
                                            <HiOutlineHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="text"
                                                placeholder="e.g. Skyline Terrace - Apt 4B"
                                                value={formData.property}
                                                onChange={(e) => setFormData({...formData, property: e.target.value})}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-semibold text-gray-900"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Date *</label>
                                        <div className="relative">
                                            <HiOutlineCalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-semibold text-gray-900 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Time Slot *</label>
                                        <div className="relative">
                                            <HiOutlineClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="time"
                                                value={formData.time}
                                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-semibold text-gray-900 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Inspection Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-semibold text-gray-900 appearance-none"
                                        >
                                            <option>Initial Viewing</option>
                                            <option>Final Inspection</option>
                                            <option>Virtual Consultation</option>
                                            <option>Follow-up Visit</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 py-4 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-4 bg-brand-green text-white text-sm font-semibold rounded-2xl hover:bg-green-700 shadow-xl shadow-green-900/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <HiOutlineCheckCircle size={18} strokeWidth={2.5} />
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
