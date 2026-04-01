'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineXMark, 
    HiOutlinePlus,
    HiOutlineChatBubbleLeftEllipsis,
    HiOutlineExclamationCircle,
    HiOutlineTag,
    HiOutlineDocumentText,
    HiOutlineCheckCircle
} from 'react-icons/hi2';
import { TicketPriority, TicketStatus } from '@/lib/mockSupportData';
import { toast } from 'react-toastify';

interface CreateTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (ticket: any) => void;
}

const CATEGORIES = ['General', 'Technical', 'Billing', 'Payout', 'Property Listing', 'Tenant Issue'];
const PRIORITIES: TicketPriority[] = ['Low', 'Medium', 'High'];

export default function CreateTicketModal({ isOpen, onClose, onCreate }: CreateTicketModalProps) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');
    const [priority, setPriority] = useState<TicketPriority>('Medium');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim() || !description.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const newTicket = {
                id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
                title,
                category,
                priority,
                description,
                status: 'Open' as TicketStatus,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                slaDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h from now
                createdBy: {
                    id: 'user_1',
                    name: 'You',
                    role: 'landlord'
                }
            };

            onCreate(newTicket);
            setIsSubmitting(false);
            resetForm();
            onClose();
            toast.success('Ticket created successfully');
        }, 1000);
    };

    const resetForm = () => {
        setTitle('');
        setCategory('General');
        setPriority('Medium');
        setDescription('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 bg-[#00853E] relative">
                            <button 
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                            >
                                <HiOutlineXMark size={24} />
                            </button>
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 mb-4">
                                <HiOutlineChatBubbleLeftEllipsis className="text-white" size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-white leading-tight">Create New Support Ticket</h2>
                            <p className="text-green-50/80 font-medium mt-1">Our support team will get back to you within 24 hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                                        <HiOutlineDocumentText className="text-brand-green" size={14} />
                                        Subject / Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Issue with payout processing"
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                                        <HiOutlineTag className="text-brand-green" size={14} />
                                        Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900 cursor-pointer appearance-none"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Priority */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                                        <HiOutlineExclamationCircle className="text-brand-green" size={14} />
                                        Priority
                                    </label>
                                    <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border-2 border-transparent">
                                        {PRIORITIES.map(p => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => setPriority(p)}
                                                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                                                    priority === p 
                                                        ? 'bg-white text-brand-green shadow-sm' 
                                                        : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                                        <HiOutlineChatBubbleLeftEllipsis className="text-brand-green" size={14} />
                                        Detailed Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Please provide as much detail as possible..."
                                        rows={4}
                                        className="w-full px-5 py-4 rounded-3xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-300 resize-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-4 px-6 border-2 border-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] py-4 px-6 bg-[#00853E] text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <HiOutlinePlus size={20} />
                                            Submit Ticket
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
