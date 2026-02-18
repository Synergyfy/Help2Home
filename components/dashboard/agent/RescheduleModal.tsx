'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineXMark, 
    HiOutlineCalendarDays, 
    HiOutlineClock,
    HiOutlineCheckCircle
} from 'react-icons/hi2';
import { toast } from 'react-toastify';

interface RescheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: any;
    onConfirm: (newDate: string, newTime: string) => void;
}

export default function RescheduleModal({ isOpen, onClose, appointment, onConfirm }: RescheduleModalProps) {
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    if (!appointment) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDate || !newTime) {
            toast.error('Please select both date and time');
            return;
        }
        onConfirm(newDate, newTime);
        toast.success(`Rescheduled ${appointment.client} successfully!`);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                                    <HiOutlineCalendarDays size={32} />
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <HiOutlineXMark size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-black text-gray-900 mb-2">Reschedule Viewing</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                Change the date and time for <span className="text-gray-900 font-bold">{appointment.client}'s</span> inspection of <span className="text-gray-900 font-bold">{appointment.property || appointment.prop}</span>.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">New Date</label>
                                    <div className="relative">
                                        <HiOutlineCalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input 
                                            type="date" 
                                            value={newDate}
                                            onChange={(e) => setNewDate(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">New Time Slot</label>
                                    <div className="relative">
                                        <HiOutlineClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input 
                                            type="time" 
                                            value={newTime}
                                            onChange={(e) => setNewTime(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button 
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 py-4 text-sm font-black text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-[2] py-4 bg-brand-green text-white text-sm font-black rounded-2xl hover:bg-green-700 shadow-xl shadow-green-900/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <HiOutlineCheckCircle size={18} strokeWidth={2.5} />
                                        Update Schedule
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
