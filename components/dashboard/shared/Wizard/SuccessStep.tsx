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
                    Listing Published Successfully!
                </h2>

                <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-16">
                    Your property is now live on the marketplace! It is currently marked as
                    <span className="text-amber-600 font-bold mx-1">Unverified</span>.
                    Verified listings receive 5x more engagement. You can request official verification from your dashboard at any time.
                </p>

                {/* Verification Badge Info */}
                <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 mb-12 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="size-20 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                            <HiOutlineShieldCheck size={40} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-bold text-amber-900 mb-2 uppercase tracking-tight">Trust & Verification</h3>
                            <p className="text-sm text-amber-800 leading-relaxed font-medium">
                                To ensure a safe marketplace, we encourage all listers to verify their property.
                                Providing ownership proof or landlord confirmation will add a <span className="font-bold">Verified Badge</span> to your listing.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                    <Link
                        href={activeRole === 'landlord' ? '/marketplace' : `/dashboard/${activeRole}/properties`}
                        className="w-full h-14 bg-brand-green text-white rounded-2xl font-black text-sm shadow-xl shadow-brand-green/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {activeRole === 'landlord' ? (
                            <>GO TO MARKETPLACE</>
                        ) : (
                            <>
                                <HiOutlineClock className="text-xl" />
                                VIEW SUBMISSION STATUS
                            </>
                        )}
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full h-14 bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-900 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2"
                    >
                        {activeRole === 'landlord' ? 'ADD ANOTHER LISTING' : 'ADD ANOTHER PROPERTY'}
                    </button>
                </div>

                <p className="mt-12 text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black">
                    Your listing is now being processed for the public marketplace
                </p>
            </div>
        </div>
    );
}
