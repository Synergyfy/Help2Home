'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineXCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';

interface RejectionReasonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    isLoading: boolean;
}

export default function RejectionReasonModal({ isOpen, onClose, onConfirm, isLoading }: RejectionReasonModalProps) {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) {
            setError('Please provide a reason for rejection.');
            return;
        }
        setError('');
        onConfirm(reason);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Modal Header */}
                <div className="p-8 bg-red-500 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-all"
                        disabled={isLoading}
                    >
                        <HiOutlineXCircle size={24} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <HiOutlineExclamationTriangle size={24} className="text-white" />
                        <h2 className="text-2xl font-black text-white leading-tight">Reject Request</h2>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-6">
                    <div>
                        <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
                            Why are you rejecting this request?
                        </label>
                        <textarea
                            id="rejectionReason"
                            rows={4}
                            value={reason}
                            onChange={(e) => {
                                setReason(e.target.value);
                                setError('');
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                            placeholder="e.g., Not covered by tenancy agreement, tenant responsible, too expensive..."
                            disabled={isLoading}
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-6 border-2 border-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-50 transition-all"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-6 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Rejecting...
                                </>
                            ) : (
                                'Confirm Rejection'
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
