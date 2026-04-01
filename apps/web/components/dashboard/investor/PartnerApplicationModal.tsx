'use client';

import React, { useState } from 'react';
import { MdClose, MdCheckCircle, MdHandshake, MdVerified } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

interface PartnerApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    developerName?: string;
}

export default function PartnerApplicationModal({ isOpen, onClose, developerName = "Zenith Developments" }: PartnerApplicationModalProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Mock API
        setTimeout(() => {
            setStatus('success');
            toast.success(`Partnership request sent to ${developerName}!`);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
                    >
                        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl pointer-events-auto overflow-hidden">
                            {status === 'success' ? (
                                <div className="p-8 text-center animate-in zoom-in duration-300">
                                    <div className="size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MdCheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Your partnership request has been sent to <strong>{developerName}</strong>. You'll be notified once they approve your access to exclusive deals.
                                    </p>
                                    <button onClick={onClose} className="w-full py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center">
                                                <MdHandshake size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">Become a Partner</h3>
                                                <p className="text-xs text-brand-green font-medium flex items-center gap-1">
                                                    with {developerName} <MdVerified />
                                                </p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                            <MdClose size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Partners get early access to off-market deals, lower minimum investment thresholds, and direct communication lines.
                                        </p>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Why do you want to partner?</label>
                                            <textarea
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-brand-green outline-none min-h-[100px]"
                                                placeholder="Briefly introduce yourself and your investment goals..."
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full py-3 bg-[#111811] text-white font-bold rounded-xl hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {status === 'submitting' ? 'Sending Request...' : 'Send Request'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
