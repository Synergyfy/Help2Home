'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineCheckCircle, 
    HiOutlineXMark,
    HiOutlineInformationCircle
} from 'react-icons/hi2';

interface ResolveTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ResolveTicketModal({ isOpen, onClose, onConfirm }: ResolveTicketModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="size-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                                    <HiOutlineCheckCircle size={32} />
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <HiOutlineXMark size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-black text-gray-900 mb-2">Mark as Resolved?</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                Are you sure this issue has been completely resolved? This will notify the tenant and move the ticket to the archives.
                            </p>

                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mb-8 flex gap-3">
                                <HiOutlineInformationCircle className="text-blue-600 shrink-0" size={20} />
                                <p className="text-xs text-blue-800 font-bold leading-relaxed">
                                    Resolved tickets can be reopened if the issue persists within 48 hours.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    onClick={onClose}
                                    className="flex-1 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className="flex-[2] py-4 bg-brand-green text-white text-sm font-bold rounded-2xl hover:bg-green-700 shadow-xl shadow-green-900/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <HiOutlineCheckCircle size={18} strokeWidth={2.5} />
                                    Yes, Resolved
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
