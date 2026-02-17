'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineXMark, 
    HiOutlineBanknotes, 
    HiOutlineCheckCircle,
    HiOutlineInformationCircle,
    HiOutlineBuildingLibrary
} from 'react-icons/hi2';
import { toast } from 'react-toastify';

interface AddBankAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (account: any) => void;
}

const NIGERIAN_BANKS = [
    "Access Bank", "Citibank Nigeria", "Ecobank Nigeria", "Fidelity Bank", 
    "First Bank of Nigeria", "First City Monument Bank", "Guaranty Trust Bank", 
    "Heritage Bank", "Keystone Bank", "Polaris Bank", "Providus Bank", 
    "Stanbic IBTC Bank", "Standard Chartered", "Sterling Bank", "SunTrust Bank", 
    "Union Bank of Nigeria", "United Bank for Africa", "Unity Bank", 
    "Wema Bank", "Zenith Bank", "OPay", "Kuda Bank", "Moniepoint"
].sort();

export default function AddBankAccountModal({ isOpen, onClose, onAdd }: AddBankAccountModalProps) {
    const [step, setStep] = useState(1);
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setBankName('');
                setAccountNumber('');
                setAccountName('');
            }, 300);
        }
    }, [isOpen]);

    // Simulate account name lookup
    useEffect(() => {
        if (accountNumber.length === 10 && bankName) {
            setIsVerifying(true);
            const timer = setTimeout(() => {
                setAccountName('FRANK EMESINWA'); // Mocked resolved name
                setIsVerifying(false);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setAccountName('');
        }
    }, [accountNumber, bankName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bankName || accountNumber.length !== 10 || !accountName) return;

        setIsSaving(true);
        setTimeout(() => {
            const newAccount = {
                id: `ba-${Date.now()}`,
                bankName,
                accountNumber: `****${accountNumber.slice(-4)}`,
                accountHolder: accountName,
                type: 'Current',
                country: 'Nigeria',
                isPrimary: false,
                status: 'verified'
            };
            onAdd(newAccount);
            setIsSaving(false);
            toast.success('Bank account linked successfully');
            onClose();
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 bg-brand-green relative">
                            <button 
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                            >
                                <HiOutlineXMark size={24} />
                            </button>
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 mb-4">
                                <HiOutlineBuildingLibrary className="text-white" size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-white leading-tight">Link Bank Account</h2>
                            <p className="text-green-50/80 text-xs font-medium mt-1">Add a verified account to receive your rental payouts.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Bank Selection */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Select Bank</label>
                                <select 
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900 cursor-pointer appearance-none"
                                    required
                                >
                                    <option value="">Choose a bank...</option>
                                    {NIGERIAN_BANKS.map(bank => (
                                        <option key={bank} value={bank}>{bank}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Account Number */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Account Number</label>
                                <div className="relative">
                                    <input 
                                        type="text"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="0123456789"
                                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-mono font-bold text-lg tracking-widest text-gray-900 placeholder:text-gray-200"
                                        required
                                    />
                                    {isVerifying && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <div className="w-5 h-5 border-2 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Account Name (Resolved) */}
                            <AnimatePresence>
                                {accountName && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex items-center gap-3">
                                            <HiOutlineCheckCircle className="text-green-600" size={20} />
                                            <div>
                                                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Account Name Found</p>
                                                <p className="font-bold text-gray-900">{accountName}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Safety info */}
                            <div className="flex gap-2 p-4 rounded-2xl bg-blue-50/50 text-blue-600 border border-blue-100">
                                <HiOutlineInformationCircle size={20} className="shrink-0" />
                                <p className="text-[10px] font-medium leading-relaxed">
                                    We verify your bank details to ensure that payouts are sent to the correct recipient. Your data is encrypted and secure.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSaving || !accountName || accountNumber.length !== 10}
                                className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-95 ${
                                    isSaving || !accountName || accountNumber.length !== 10
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-brand-green text-white hover:bg-green-700 shadow-xl shadow-green-900/20'
                                }`}
                            >
                                {isSaving ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <HiOutlineCheckCircle size={20} />
                                        Confirm & Add Account
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
