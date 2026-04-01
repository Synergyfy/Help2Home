'use client';

import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlineShieldCheck, 
    HiOutlineIdentification, 
    HiOutlineCloudArrowUp, 
    HiOutlineCheckCircle,
    HiOutlineArrowRight,
    HiOutlineDocumentText,
    HiOutlineLockClosed
} from 'react-icons/hi2';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const STEPS = [
    { id: 1, title: 'Identity Verification', description: 'Upload a government-issued ID', icon: HiOutlineIdentification },
    { id: 2, title: 'Document Upload', description: 'Proof of income and address', icon: HiOutlineCloudArrowUp },
    { id: 3, title: 'Credit Consent', description: 'Authorize credit bureau check', icon: HiOutlineShieldCheck },
    { id: 4, title: 'Review & Submit', description: 'Finalize your application', icon: HiOutlineDocumentText },
];

function TenantVerificationJourneyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const amountParam = searchParams.get('amount');
    const type = searchParams.get('type');

    const amount = amountParam ? parseInt(amountParam).toLocaleString() : '3,500,000';
    const monthly = amountParam ? Math.round(parseInt(amountParam) / 12).toLocaleString() : '291,666';

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsCompleted(true);
            toast.success("Verification data submitted successfully!");
        }, 3000);
    };

    if (isCompleted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white max-w-md w-full rounded-[2.5rem] shadow-2xl p-10 text-center space-y-8"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <HiOutlineCheckCircle className="text-green-600 size-16" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">Verification Complete</h1>
                        <p className="text-gray-500 font-medium">
                            Your details have been submitted to Access Bank for final review. You will be notified via Help2Home once approved.
                        </p>
                    </div>
                    <button 
                        onClick={() => router.push('/dashboard/tenant/applications')}
                        className="w-full py-5 bg-[#003366] text-white rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20"
                    >
                        Return to Help2Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 p-6 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white text-xl">A</div>
                        <h2 className="text-lg font-bold text-[#003366]">Access Bank Verification</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-400">Step {currentStep} of {STEPS.length}</span>
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-orange-500 transition-all duration-500" 
                                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 flex items-start justify-center">
                <div className="max-w-2xl w-full space-y-8 mt-10">
                    {/* Step Content */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-10"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-orange-50 rounded-2xl">
                                        {React.createElement(STEPS[currentStep - 1].icon, { className: 'text-orange-500 size-8' })}
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">{STEPS[currentStep - 1].title}</h1>
                                        <p className="text-gray-500 font-medium">{STEPS[currentStep - 1].description}</p>
                                    </div>
                                </div>

                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 gap-4">
                                            <button className="flex items-center justify-between p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl hover:bg-white hover:border-orange-500 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                                        <HiOutlineCloudArrowUp className="text-gray-400 group-hover:text-orange-500" size={24} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-bold text-gray-900">Upload Front Page</p>
                                                        <p className="text-xs text-gray-400">JPG, PNG or PDF (Max 5MB)</p>
                                                    </div>
                                                </div>
                                                <HiOutlineArrowRight className="text-gray-300 group-hover:text-orange-500" />
                                            </button>
                                            <button className="flex items-center justify-between p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl hover:bg-white hover:border-orange-500 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                                        <HiOutlineCloudArrowUp className="text-gray-400 group-hover:text-orange-500" size={24} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-bold text-gray-900">Upload Back Page</p>
                                                        <p className="text-xs text-gray-400">JPG, PNG or PDF (Max 5MB)</p>
                                                    </div>
                                                </div>
                                                <HiOutlineArrowRight className="text-gray-300 group-hover:text-orange-500" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                                            <div className="flex gap-4">
                                                <HiOutlineLockClosed className="text-blue-600 shrink-0" size={24} />
                                                <p className="text-sm text-blue-700 font-medium leading-relaxed">
                                                    Your financial documents are encrypted and only accessible by authorized loan officers.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-xl">
                                                        <HiOutlineCheckCircle className="text-green-500" size={24} />
                                                    </div>
                                                    <p className="font-bold text-gray-900">3 Months Bank Statement</p>
                                                </div>
                                                <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-1 rounded-md">Linked via Mono</span>
                                            </div>
                                            <button className="flex items-center justify-between p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl hover:bg-white hover:border-orange-500 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                                        <HiOutlineCloudArrowUp className="text-gray-400 group-hover:text-orange-500" size={24} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-bold text-gray-900">Recent Utility Bill</p>
                                                        <p className="text-xs text-gray-400">Proof of residence required</p>
                                                    </div>
                                                </div>
                                                <HiOutlineArrowRight className="text-gray-300 group-hover:text-orange-500" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-8">
                                        <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6">
                                            <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Bureau Authorization</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                I hereby authorize Access Bank PLC to request my credit report from CRC Credit Bureau and FirstCentral Credit Bureau to process this rental financing application.
                                            </p>
                                            <label className="flex items-start gap-4 cursor-pointer group">
                                                <input type="checkbox" className="mt-1 size-5 rounded-md border-gray-300 text-orange-500 focus:ring-orange-500" />
                                                <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors">I understand that this check may affect my credit score.</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-6 bg-gray-50 rounded-3xl">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Loan</p>
                                                <p className="text-xl font-black text-gray-900">₦{amount}</p>
                                            </div>
                                            <div className="p-6 bg-gray-50 rounded-3xl">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Monthly</p>
                                                <p className="text-xl font-black text-gray-900">₦{monthly}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-green-50 border border-green-100 rounded-3xl">
                                            <p className="text-xs text-green-700 font-medium leading-relaxed">
                                                By submitting, you confirm that all provided information is accurate. False information may lead to immediate rejection.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
                                    <button 
                                        disabled={currentStep === 1 || isSubmitting}
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="px-8 py-4 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-0"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        disabled={isSubmitting}
                                        onClick={handleNext}
                                        className="px-12 py-4 bg-orange-500 text-white rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20 flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Submitting...
                                            </>
                                        ) : currentStep === STEPS.length ? (
                                            'Submit Verification'
                                        ) : (
                                            <>
                                                Continue
                                                <HiOutlineArrowRight />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Support Link */}
                    <p className="text-center text-xs font-bold text-gray-400">
                        Need help? <a href="#" className="text-orange-500 hover:underline">Contact Access Bank Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function TenantVerificationJourney() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-orange-500 w-1/2 animate-[shimmer_2s_infinite]"></div>
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Loading Verification...</h1>
            </div>
        }>
            <TenantVerificationJourneyContent />
        </Suspense>
    );
}
