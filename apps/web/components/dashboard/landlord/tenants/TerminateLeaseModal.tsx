'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineExclamationTriangle, 
    HiOutlineXMark,
    HiOutlineTrash
} from 'react-icons/hi2';
import { Tenant } from '@/lib/mockLandlordData';
import { toast } from 'react-toastify';

interface TerminateLeaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenant: Tenant | null;
    onConfirm: (tenantId: string) => void;
}

export default function TerminateLeaseModal({ isOpen, onClose, tenant, onConfirm }: TerminateLeaseModalProps) {
    if (!tenant) return null;

    const handleConfirm = () => {
        onConfirm(tenant.id);
        toast.success(`Lease termination initiated for ${tenant.name}`);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="size-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                                    <HiOutlineExclamationTriangle size={32} />
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <HiOutlineXMark size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-black text-gray-900 mb-2">Terminate Lease?</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                Are you sure you want to initiate lease termination for <span className="text-gray-900 font-bold">{tenant.name}</span>? 
                                This action will notify the tenant and start the move-out process.
                            </p>

                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-8">
                                <p className="text-xs text-amber-800 font-bold leading-relaxed">
                                    Note: This does not instantly remove the tenant. It initiates the legal notice period as defined in your agreement.
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
                                    onClick={handleConfirm}
                                    className="flex-1 py-4 bg-red-600 text-white text-sm font-bold rounded-2xl hover:bg-red-700 shadow-xl shadow-red-100 transition-all flex items-center justify-center gap-2"
                                >
                                    <HiOutlineTrash size={18} />
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
