'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

function BankSSOLaunchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'handshake' | 'prefilled' | 'error'>('handshake');
    
    const type = searchParams.get('type') || 'rent';
    const amountParam = searchParams.get('amount');
    const propertyId = searchParams.get('propertyId');
    
    const amount = amountParam ? parseInt(amountParam).toLocaleString() : '3,500,000';
    const loanType = type === 'mortgage' ? 'Mortgage Loan' : 'Rent Financing';

    // Simulating the SSO handshake and token validation
    useEffect(() => {
        const token = searchParams.get('sso_token');
        if (!token) {
            setStatus('error');
            return;
        }

        const timer = setTimeout(() => {
            setStatus('prefilled');
        }, 2500);

        return () => clearTimeout(timer);
    }, [searchParams]);

    const handleStart = () => {
        router.push(`/bank-portal/verification?type=${type}&amount=${amountParam}&propertyId=${propertyId}`); // Redirect to the tenant verification journey
    };

    if (status === 'error') {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Invalid SSO Token</h1>
                <p className="text-gray-500 max-w-sm">We couldn't verify your session from Help2Home. Please try launching the portal again from your dashboard.</p>
                <button 
                    onClick={() => router.push('/')}
                    className="mt-8 px-8 py-3 bg-[#003366] text-white rounded-xl font-semibold"
                >
                    Return to Help2Home
                </button>
            </div>
        );
    }

    if (status === 'handshake') {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="w-4 h-[2px] bg-gray-200 animate-pulse"></div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg animate-pulse"></div>
                </div>
                <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-[#003366] w-1/2 animate-[shimmer_2s_infinite]"></div>
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Secure Handshake in Progress</h1>
                <p className="text-gray-500 text-sm font-medium">Verifying your identity with Access Bank...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-[#003366] p-10 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center font-semibold text-2xl">A</div>
                        <h2 className="text-2xl font-semibold tracking-tight">Access Bank PLC</h2>
                    </div>
                    <h1 className="text-4xl font-semibold leading-tight relative z-10">Welcome to your <br/> Loan Portal</h1>
                </div>

                <div className="p-10 space-y-8">
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                        <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest mb-4">Pre-filled Data from Help2Home</p>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-1">Full Name</p>
                                <p className="font-semibold text-gray-900">Oluwaseun Adeyemi</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-1">Application Type</p>
                                <p className="font-semibold text-gray-900">{loanType}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-1">Requested Amount</p>
                                <p className="font-semibold text-gray-900">₦{amount}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium mb-1">Property</p>
                                <p className="font-semibold text-gray-900">Luxury 3 Bed Flat</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            To proceed with your financing application, we need to verify your details and perform a credit check. By clicking the button below, you agree to our <span className="text-[#003366] font-semibold underline">Terms of Service</span>.
                        </p>
                        <button 
                            onClick={handleStart}
                            className="w-full py-5 bg-orange-500 text-white rounded-2xl font-semibold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20 active:scale-[0.98]"
                        >
                            Start Verification Journey
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BankSSOLaunch() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-[#003366] w-1/2 animate-[shimmer_2s_infinite]"></div>
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Initializing Portal...</h1>
            </div>
        }>
            <BankSSOLaunchContent />
        </Suspense>
    );
}
