'use client';

import React, { useState } from 'react';

interface BankDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (details: any) => void;
}

export default function BankDetailsModal({ isOpen, onClose, onSave }: BankDetailsModalProps) {
    const [step, setStep] = useState(1);
    const [accountNumber, setAccountNumber] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [accountName, setAccountName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleVerify = () => {
        if (accountNumber.length !== 10) {
            setError('Account number must be 10 digits');
            return;
        }
        setIsLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setAccountName('Lagos Properties Ltd'); // Mock response
            setStep(2);
        }, 1500);
    };

    const handleSave = () => {
        onSave({ accountNumber, bankCode, accountName });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Add Bank Account</h3>
                </div>

                <div className="p-6 space-y-4">
                    {step === 1 ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                    value={bankCode}
                                    onChange={(e) => setBankCode(e.target.value)}
                                >
                                    <option value="">Select Bank</option>
                                    <option value="058">Guaranty Trust Bank</option>
                                    <option value="057">Zenith Bank</option>
                                    <option value="033">United Bank for Africa</option>
                                    <option value="044">Access Bank</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                                <input
                                    type="text"
                                    maxLength={10}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                    placeholder="0123456789"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                            {error && <p className="text-sm text-red-600">{error}</p>}
                        </>
                    ) : (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
                            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-900">Account Verified</h4>
                            <p className="text-gray-600 mt-1">{accountName}</p>
                            <p className="text-sm text-gray-500 mt-1">{bankCode === '058' ? 'Guaranty Trust Bank' : 'Zenith Bank'} - {accountNumber}</p>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    {step === 1 ? (
                        <button
                            onClick={handleVerify}
                            disabled={!bankCode || !accountNumber || isLoading}
                            className="px-4 py-2 bg-[#00853E] text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading && <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                            Verify Account
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-[#00853E] text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Save Account
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
