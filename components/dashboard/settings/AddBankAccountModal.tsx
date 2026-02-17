'use client';

import React, { useState } from 'react';
import { IoCloseOutline, IoCheckmarkCircle, IoInformationCircleOutline } from 'react-icons/io5';

interface AddBankAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: { bankName: string; accountNumber: string; accountHolder: string }) => void;
}

const NIGERIAN_BANKS = [
    "Access Bank", "Citibank Nigeria", "Ecobank Nigeria", "Fidelity Bank",
    "First Bank of Nigeria", "First City Monument Bank", "Globus Bank",
    "Guaranty Trust Bank (GTB)", "Heritage Bank", "Keystone Bank",
    "Lotus Bank", "Parallex Bank", "Polaris Bank", "Providus Bank",
    "Stanbic IBTC Bank", "Standard Chartered Bank", "Sterling Bank",
    "SunTrust Bank", "Titan Trust Bank", "Union Bank of Nigeria",
    "United Bank for Africa (UBA)", "Unity Bank", "Wema Bank", "Zenith Bank"
];

export default function AddBankAccountModal({ isOpen, onClose, onAdd }: AddBankAccountModalProps) {
    const [step, setView] = useState<'form' | 'verifying' | 'success'>('form');
    const [formData, setFormData] = useState({
        bankName: '',
        accountNumber: '',
        accountHolder: ''
    });
    const [isVerifying, setIsVerifying] = useState(false);

    if (!isOpen) return null;

    const handleVerify = () => {
        if (!formData.bankName || formData.accountNumber.length !== 10) return;
        
        setIsVerifying(true);
        // Simulate bank verification
        setTimeout(() => {
            setIsVerifying(false);
            setFormData(prev => ({ ...prev, accountHolder: 'JOHN DOE' })); // Mocked name resolution
            setView('verifying');
        }, 1500);
    };

    const handleConfirm = () => {
        setIsVerifying(true);
        setTimeout(() => {
            onAdd(formData);
            setView('success');
            setIsVerifying(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-gray-900">Add Bank Account</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <IoCloseOutline size={24} />
                        </button>
                    </div>

                    {step === 'form' && (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Select Bank</label>
                                <select
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                                    value={formData.bankName}
                                    onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                                >
                                    <option value="">Choose your bank</option>
                                    {NIGERIAN_BANKS.map(bank => (
                                        <option key={bank} value={bank}>{bank}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Account Number</label>
                                <input
                                    type="text"
                                    maxLength={10}
                                    placeholder="0123456789"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                                    value={formData.accountNumber}
                                    onChange={e => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '') })}
                                />
                            </div>

                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                                <IoInformationCircleOutline className="text-amber-500 shrink-0" size={20} />
                                <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                                    Your bank details are only used for payouts and verification. We never store your full PIN or login credentials.
                                </p>
                            </div>

                            <button
                                onClick={handleVerify}
                                disabled={!formData.bankName || formData.accountNumber.length !== 10 || isVerifying}
                                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl ${
                                    !formData.bankName || formData.accountNumber.length !== 10 || isVerifying
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-brand-green text-white hover:bg-green-700 shadow-green-100 scale-[1.02] active:scale-[0.98]'
                                }`}
                            >
                                {isVerifying ? 'Verifying Account...' : 'Verify Account'}
                            </button>
                        </div>
                    )}

                    {step === 'verifying' && (
                        <div className="text-center py-4 animate-in slide-in-from-right-4 duration-500">
                            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-brand-green mx-auto mb-6">
                                <IoCheckmarkCircle size={40} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">Account Verified</h3>
                            <p className="text-gray-500 font-medium mb-8 uppercase tracking-widest text-xs">Is this your account name?</p>
                            
                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-8">
                                <p className="text-2xl font-black text-brand-green">{formData.accountHolder}</p>
                                <p className="text-sm font-bold text-gray-400 mt-1">{formData.bankName} • {formData.accountNumber}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setView('form')}
                                    className="py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                >
                                    No, go back
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={isVerifying}
                                    className="py-4 bg-brand-green text-white rounded-2xl font-black hover:bg-green-700 shadow-xl shadow-green-100 transition-all"
                                >
                                    {isVerifying ? 'Saving...' : 'Yes, Confirm'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8 animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-brand-green mx-auto mb-8 shadow-inner">
                                <IoCheckmarkCircle size={56} />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-3">Linked!</h3>
                            <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                Your bank account has been successfully linked to your Help2Home profile.
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl active:scale-[0.98]"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
