'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoCheckmarkCircle, IoLockClosedOutline } from 'react-icons/io5';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';

interface AddCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: { last4: string; expiry: string; cardholderName: string; brand: 'visa' | 'mastercard' | 'verve' }) => void;
}

export default function AddCardModal({ isOpen, onClose, onAdd }: AddCardModalProps) {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardholderName: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleSave = () => {
        setIsSaving(true);
        // Simulate bank/provider verification
        setTimeout(() => {
            const brand = formData.cardNumber.startsWith('4') ? 'visa' : 'mastercard';
            onAdd({
                last4: formData.cardNumber.slice(-4),
                expiry: formData.expiry,
                cardholderName: formData.cardholderName,
                brand: brand as any
            });
            setIsSaving(false);
            setStep('success');
        }, 2000);
    };

    const getCardBrandIcon = () => {
        if (formData.cardNumber.startsWith('4')) return <FaCcVisa className="text-white text-4xl" />;
        if (formData.cardNumber.startsWith('5')) return <FaCcMastercard className="text-white text-4xl" />;
        return <div className="w-10 h-6 bg-white/20 rounded" />;
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-gray-900">Add New Card</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <IoCloseOutline size={24} />
                        </button>
                    </div>

                    {step === 'form' && (
                        <div className="space-y-8">
                            {/* Card Visualization */}
                            <div className="relative h-48 w-full bg-linear-to-br from-gray-900 to-slate-800 rounded-3xl p-6 text-white shadow-2xl overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 transition-opacity">
                                    {getCardBrandIcon()}
                                </div>
                                <div className="mt-12">
                                    <p className="text-xl font-mono tracking-[0.2em] mb-4">
                                        {formData.cardNumber.padEnd(16, '•').replace(/(.{4})/g, '$1 ')}
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[8px] uppercase tracking-widest opacity-50 mb-1">Card Holder</p>
                                            <p className="text-sm font-bold tracking-wider uppercase">{formData.cardholderName || 'Your Name'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] uppercase tracking-widest opacity-50 mb-1">Expires</p>
                                            <p className="text-sm font-bold">{formData.expiry || 'MM/YY'}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        maxLength={16}
                                        placeholder="4242 4242 4242 4242"
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                                        value={formData.cardNumber}
                                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '') })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="JOHN DOE"
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-gray-900 uppercase"
                                        value={formData.cardholderName}
                                        onChange={e => setFormData({ ...formData, cardholderName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                                        value={formData.expiry}
                                        onChange={e => {
                                            let val = e.target.value.replace(/\D/g, '');
                                            if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
                                            setFormData({ ...formData, expiry: val });
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">CVV</label>
                                    <input
                                        type="password"
                                        maxLength={3}
                                        placeholder="•••"
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                                        value={formData.cvv}
                                        onChange={e => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-400">
                                <IoLockClosedOutline size={16} />
                                <p className="text-[10px] font-bold uppercase tracking-wider">Secure 256-bit encrypted connection</p>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={!formData.cardNumber || !formData.expiry || !formData.cvv || isSaving}
                                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl ${
                                    !formData.cardNumber || !formData.expiry || !formData.cvv || isSaving
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-brand-green text-white hover:bg-green-700 shadow-green-100 scale-[1.02] active:scale-[0.98]'
                                }`}
                            >
                                {isSaving ? 'Verifying Card...' : 'Save Card Information'}
                            </button>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-12 animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-brand-green mx-auto mb-8 shadow-inner">
                                <IoCheckmarkCircle size={56} />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-3">Card Saved!</h3>
                            <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                Your payment method has been securely saved for future transactions.
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl active:scale-[0.98]"
                            >
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
