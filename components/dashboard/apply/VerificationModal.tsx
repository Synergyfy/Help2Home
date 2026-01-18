import React from 'react';
import { useRouter } from 'next/navigation';

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VerificationModal({ isOpen, onClose }: VerificationModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transition-all transform animate-in fade-in zoom-in duration-300">
                <div className="relative p-8 text-center">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Icon */}
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-black text-gray-900 mb-2">Complete Verification</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        To apply for rent financing, we need to verify your identity. This helps us ensure security and speed up your approval process.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/dashboard/tenant/profile')}
                            className="w-full py-4 bg-brand-green text-white font-black rounded-2xl shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center justify-center gap-2 group"
                        >
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Verify Identity Now
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all"
                        >
                            I'll do it later
                        </button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-6">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fast</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
