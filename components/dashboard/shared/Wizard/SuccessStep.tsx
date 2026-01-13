'use client';

import React from 'react';
import Link from 'next/link';
import { useWatch, useFormContext } from 'react-hook-form';
import { useUserStore } from '@/store/userStore';
import { HiCheck, HiOutlineEnvelope, HiOutlineShieldCheck, HiOutlineClock } from 'react-icons/hi2';

export default function SuccessStep() {
    const { activeRole } = useUserStore();
    const { control } = useFormContext();
    const landlordName = useWatch({ control, name: 'landlord.fullName' }) || '[Landlord Name]';
    const landlordEmail = useWatch({ control, name: 'landlord.email' }) || '[Landlord Email]';

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center">
                {/* Status Hero */}
                <div className="mb-10 relative inline-block">
                    <div className="size-28 bg-brand-green/10 rounded-full flex items-center justify-center">
                        <div className="size-16 bg-brand-green rounded-full flex items-center justify-center shadow-2xl shadow-brand-green/30">
                            <HiCheck className="text-white text-4xl" />
                        </div>
                    </div>
                    <div className="absolute -top-1 -right-1 size-8 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white">
                        <span className="text-white text-xs font-black">★</span>
                    </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-6">
                    Listing Submitted for Verification!
                </h2>

                <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-16">
                    Great job! Your property has been listed. Help2Home is now contacting the landlord
                    <span className="text-gray-900 font-bold mx-1">[{landlordName}]</span>
                    at <span className="text-gray-900 font-bold mx-1">[{landlordEmail}]</span> for official authorization.
                    Once approved, your listing will be automatically verified by the system.
                </p>

                {/* Timeline Visualization */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm mb-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50">
                        <div className="h-full bg-brand-green w-1/3"></div>
                    </div>

                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-10 text-left">Progress Status</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Step 1 */}
                        <div className="flex flex-row md:flex-col items-center gap-4 text-center">
                            <div className="size-12 rounded-full bg-brand-green flex items-center justify-center text-white shadow-lg shadow-brand-green/20">
                                <HiCheck size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-brand-green uppercase tracking-widest">Listing Submitted</p>
                                <p className="text-[10px] text-gray-400 mt-1 hidden md:block">Real-time update</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-row md:flex-col items-center gap-4 text-center">
                            <div className="size-12 rounded-full bg-white border-2 border-brand-green flex items-center justify-center text-brand-green ring-8 ring-brand-green/5">
                                <HiOutlineEnvelope size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">Awaiting Landlord</p>
                                <p className="text-[10px] text-gray-400 mt-1 hidden md:block">Verification link sent</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-row md:flex-col items-center gap-4 text-center opacity-40">
                            <div className="size-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-300">
                                <HiOutlineShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Auto-Verification</p>
                                <p className="text-[10px] text-gray-400 mt-1 hidden md:block">Final marketplace live</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                    <Link
                        href={`/dashboard/${activeRole}/properties`}
                        className="w-full h-14 bg-brand-green text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-green/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <HiOutlineClock className="text-xl" />
                        VIEW SUBMISSION STATUS
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full h-14 bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-900 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2"
                    >
                        ADD ANOTHER PROPERTY
                    </button>
                </div>

                <p className="mt-12 text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black">
                    You will be notified via email once the landlord responds
                </p>
            </div>
        </div>
    );
}
