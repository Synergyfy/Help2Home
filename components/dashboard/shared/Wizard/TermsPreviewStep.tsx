'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { formatNumber } from '@/utils/helpers';
import {
    HiOutlineHome,
    HiOutlineCreditCard,
    HiOutlineUserCircle,
    HiOutlinePhoto,
    HiOutlineCheckBadge,
    HiOutlineExclamationTriangle
} from 'react-icons/hi2';

interface TermsPreviewStepProps {
    role?: 'landlord' | 'agent' | 'caretaker';
    onEditStep?: (step: number) => void;
}

export default function TermsPreviewStep({ role, onEditStep }: TermsPreviewStepProps = {}) {
    const { watch, register } = useFormContext<PropertySchema>();
    const data = watch();

    const sectionClasses = "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6";
    const headerClasses = "border-b border-gray-100 p-4 bg-gray-50/50 flex justify-between items-center";
    const labelClasses = "text-gray-500 text-xs font-bold uppercase tracking-wider mb-1";
    const valueClasses = "text-gray-900 text-base font-semibold leading-relaxed";

    return (
        <div className="max-w-4xl mx-auto pt-4 pb-20">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Review Your Listing</h1>
                <p className="text-gray-500">Almost there! Please review all details before submitting. Once submitted, we will contact the landlord for final verification.</p>
            </div>

            <div className="space-y-6">
                {/* 1. Property Basics */}
                <div className={sectionClasses}>
                    <div className={headerClasses}>
                        <div className="flex items-center gap-2">
                            <HiOutlineHome className="text-brand-green text-xl" />
                            <h2 className="font-bold text-gray-800">1. Property Basics</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => onEditStep?.(0)}
                            className="text-brand-green text-sm font-bold hover:underline"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <p className={labelClasses}>Property Title</p>
                            <p className={valueClasses}>{data.title || 'Untitled Property'}</p>
                        </div>
                        <div>
                            <p className={labelClasses}>Property Type / Listing</p>
                            <p className={valueClasses}>{data.propertyType} ({data.listingType})</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className={labelClasses}>Location</p>
                            <p className={valueClasses}>
                                {data.address?.street}, {data.address?.city}, {data.address?.state}
                            </p>
                        </div>
                        <div>
                            <p className={labelClasses}>Bedrooms / Bathrooms</p>
                            <p className={valueClasses}>{data.specs?.bedrooms} Beds, {data.specs?.bathrooms} Baths</p>
                        </div>
                        <div>
                            <p className={labelClasses}>Space Area</p>
                            <p className={valueClasses}>{data.specs?.area} {data.specs?.areaUnit}</p>
                        </div>
                    </div>
                </div>

                {/* 2. Financials */}
                <div className={sectionClasses}>
                    <div className={headerClasses}>
                        <div className="flex items-center gap-2">
                            <HiOutlineCreditCard className="text-brand-green text-xl" />
                            <h2 className="font-bold text-gray-800">2. Financials</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => onEditStep?.(3)}
                            className="text-brand-green text-sm font-bold hover:underline"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <p className={labelClasses}>Base Rate</p>
                            <p className={`${valueClasses} text-brand-green font-black`}>
                                ₦{formatNumber(data.price?.amount || 0)} / {data.price?.period}
                            </p>
                        </div>
                        <div>
                            <p className={labelClasses}>Installments</p>
                            <p className={valueClasses}>{data.installments?.enabled ? 'Supported' : 'No'}</p>
                        </div>
                        <div>
                            <p className={labelClasses}>Available From</p>
                            <p className={valueClasses}>{data.terms?.availableFrom || 'ASAP'}</p>
                        </div>
                    </div>
                </div>

                {/* 3. Landlord & Access (Conditional for Caretaker/Agent) */}
                <div className={sectionClasses}>
                    <div className={headerClasses}>
                        <div className="flex items-center gap-2">
                            <HiOutlineUserCircle className="text-brand-green text-xl" />
                            <h2 className="font-bold text-gray-800">3. Landlord & Access</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => onEditStep?.(0)} // Landlord info is usually in Basics for Caretakers
                            className="text-brand-green text-sm font-bold hover:underline"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <p className={labelClasses}>Landlord Name</p>
                            <p className={valueClasses}>{data.landlord?.fullName || 'Self'}</p>
                        </div>
                        <div>
                            <p className={labelClasses}>Landlord Contact</p>
                            <p className={valueClasses}>{data.landlord?.email || 'N/A'}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className={labelClasses}>Listing Authority</p>
                            <p className={valueClasses}>Verified {data.posterRole}</p>
                        </div>
                    </div>
                </div>

                {/* 4. Media & Photos */}
                <div className={sectionClasses}>
                    <div className={headerClasses}>
                        <div className="flex items-center gap-2">
                            <HiOutlinePhoto className="text-brand-green text-xl" />
                            <h2 className="font-bold text-gray-800">4. Media & Photos</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => onEditStep?.(4)}
                            className="text-brand-green text-sm font-bold hover:underline"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {data.images?.length > 0 ? (
                                data.images.map((img, idx) => (
                                    <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                        <img src={img.url} className="w-full h-full object-cover" alt="Property" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic text-sm">No images uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Verification Notice */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
                    <HiOutlineExclamationTriangle className="text-blue-600 size-6 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-blue-900 mb-1">Verification Process</p>
                        <p className="text-xs text-blue-700/80 leading-relaxed font-medium">
                            Upon submission, an automated verification request will be sent to the Landlord
                            {data.landlord?.fullName ? ` (${data.landlord.fullName})` : ''}.
                            The listing will remain in "Pending" status until they confirm your authorization.
                        </p>
                    </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="pt-8 flex flex-col items-center gap-6">
                    <label className="flex items-start gap-4 cursor-pointer max-w-2xl group">
                        <input
                            type="checkbox"
                            required
                            className="size-5 mt-1 rounded border-gray-300 text-brand-green focus:ring-brand-green bg-white transition-all cursor-pointer"
                        />
                        <span className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-gray-700">
                            I confirm that all information provided is accurate and I have the legal right to manage this property
                            on behalf of the owner. I agree to the <a href="#" className="text-brand-green font-bold hover:underline">Terms of Service</a>.
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}
