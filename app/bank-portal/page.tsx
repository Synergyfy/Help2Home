'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function BankPortalContent() {
    const searchParams = useSearchParams();
    const applicationId = searchParams.get('applicationId');
    const [step, setStep] = useState<'login' | 'approval' | 'success'>('login');
    const [isLoading, setIsLoading] = useState(false);

    // Login Form State
    const [userId, setUserId] = useState('user123');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep('approval');
        }, 1000);
    };

    const handleApprove = () => {
        setIsLoading(true);
        // Simulate API call and update shared state
        setTimeout(() => {
            if (applicationId) {
                // Update shared state via localStorage for the other tab to pick up
                const bankStatus = JSON.parse(localStorage.getItem('mockBankStatus') || '{}');
                bankStatus[applicationId] = 'success';
                localStorage.setItem('mockBankStatus', JSON.stringify(bankStatus));
            }
            setIsLoading(false);
            setStep('success');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            {/* Bank Header */}
            <header className="bg-[#003366] text-white p-4 shadow-md">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center font-bold text-white">
                            A
                        </div>
                        <span className="text-xl font-bold tracking-tight">Access Bank</span>
                    </div>
                    <div className="text-sm opacity-80">Secure Portal</div>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
                    {step === 'login' && (
                        <div className="p-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                                    <input
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#003366] text-white py-3 rounded-md font-bold hover:bg-[#002244] transition-colors disabled:opacity-50 flex justify-center"
                                >
                                    {isLoading ? (
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </form>
                            <div className="mt-4 text-center text-xs text-gray-500">
                                <p>Secured by 256-bit encryption</p>
                            </div>
                        </div>
                    )}

                    {step === 'approval' && (
                        <div className="p-8 animate-fade-in">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Authorize Direct Debit</h2>

                            <div className="bg-blue-50 p-4 rounded-md mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Merchant:</span>
                                    <span className="font-bold text-gray-900">Help2Home Ltd</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Amount:</span>
                                    <span className="font-bold text-gray-900">₦291,666.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Frequency:</span>
                                    <span className="font-bold text-gray-900">Monthly</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-6">
                                By clicking Approve, you authorize Help2Home to debit your account ending in **8821 for the specified amount.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep('login')}
                                    className="flex-1 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApprove}
                                    disabled={isLoading}
                                    className="flex-1 bg-orange-500 text-white py-3 rounded-md font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 flex justify-center"
                                >
                                    {isLoading ? (
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        'Approve'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="p-8 text-center animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authorization Successful</h2>
                            <p className="text-gray-600 mb-6">
                                You have successfully set up your payment plan. You can now close this window and return to Help2Home.
                            </p>
                            <button
                                onClick={() => window.close()}
                                className="w-full bg-[#003366] text-white py-3 rounded-md font-bold hover:bg-[#002244] transition-colors"
                            >
                                Close Window
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="p-4 text-center text-xs text-gray-500">
                &copy; 2026 Access Bank Plc. All rights reserved.
            </footer>
        </div>
    );
}

export default function BankPortalPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BankPortalContent />
        </Suspense>
    );
}
