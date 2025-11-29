'use client';

import React from 'react';

interface BankInterstitialProps {
    bankName: string;
    onManualCheck: () => void;
    onReopenBank: () => void;
    onContactSupport: () => void;
}

export default function BankInterstitial({ bankName, onManualCheck, onReopenBank, onContactSupport }: BankInterstitialProps) {
    return (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <svg className="w-10 h-10 text-[#6D28D9] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div className="absolute -right-1 -top-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">Waiting for bank confirmation</h2>
                <p className="text-gray-600 mb-8">
                    We've opened <span className="font-semibold">{bankName}</span> in a new tab. Complete the bank's steps there.
                    We'll update this page when we get confirmation.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={onManualCheck}
                        className="w-full px-6 py-3 bg-[#6D28D9] text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                    >
                        I finished — check status
                    </button>

                    <button
                        onClick={onReopenBank}
                        className="w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                        Open bank page again
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </button>

                    <button
                        onClick={onContactSupport}
                        className="w-full px-6 py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors text-sm"
                    >
                        Contact support
                    </button>
                </div>
            </div>
        </div>
    );
}
