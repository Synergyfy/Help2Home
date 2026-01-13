'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useFormContext, useWatch } from 'react-hook-form';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useUserStore } from '@/store/userStore';
import { PROPERTY_CATEGORIES, PROPERTY_TYPES_BY_LISTING } from '@/config/propertyConfig';

// UI Components
import RoleSwitchModal from '@/components/lib/RoleSwitchModal';
import {
    HiOutlineMapPin,
    HiOutlineHome,
    HiOutlineCheckBadge,
    HiOutlineShieldCheck
} from 'react-icons/hi2';
import {
    MdOutlineBusinessCenter,
    MdOutlineHotel,
    MdOutlineKey,
    MdOutlineRealEstateAgent,
    MdOutlineAssignmentInd,
    MdOutlineVilla
} from 'react-icons/md';

import { PropertySchema } from '@/lib/validations/propertySchema';
import 'leaflet/dist/leaflet.css';

const SuccessStep = dynamic(() => import('./SuccessStep'), { ssr: false });

interface BasicsStepProps {
    role?: 'landlord' | 'agent' | 'caretaker';
}

export default function BasicsStep({ role }: BasicsStepProps = {}) {
    const { register, setValue, control } = useFormContext<PropertySchema>();
    const { activeRole, setActiveRole } = useUserStore();
    const { draftData, roleOnboardingCompleted } = useOnboardingStore();

    const [showModal, setShowModal] = useState(false);
    const [pendingRole, setPendingRole] = useState<'landlord' | 'agent' | 'caretaker' | null>(null);

    const selectedListingType = useWatch({ control, name: 'listingType' });

    const inputClasses = "w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-[#111811] focus:border-brand-green focus:ring-1 focus:ring-[brand-green] outline-none transition-all placeholder:text-gray-400 shadow-sm";
    const labelClasses = "block text-sm font-bold text-[#111811] mb-2";
    const cardClasses = "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8";

    // 1. Logic: Syncing Role-Specific Credentials
    useEffect(() => {
        if (activeRole === 'agent' && draftData.agent) {
            setValue('agencyName', draftData.agent.agencyName || '');
            setValue('agentLicense', draftData.agent.licenseNumber || '');
        }
    }, [activeRole, draftData, setValue]);


    const isRoleOnboarded = activeRole ? roleOnboardingCompleted[activeRole] : false;

    return (
        <>
            <RoleSwitchModal
                isOpen={showModal}
                targetRole={pendingRole || ''}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    if (pendingRole) setActiveRole(pendingRole);
                    setShowModal(false);
                }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                <div className="lg:col-span-2">

                    {/* ENHANCED ROLE BANNER */}
                    <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm border-l-4 border-l-brand-green gap-4 mb-8">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="size-12 shrink-0 rounded-full bg-green-50 flex items-center justify-center text-brand-green">
                                {activeRole === 'agent' ? <MdOutlineRealEstateAgent size={28} /> :
                                    activeRole === 'caretaker' ? <MdOutlineAssignmentInd size={28} /> :
                                        <MdOutlineVilla size={28} />}
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Perspective</p>
                                <h3 className="text-[#111811] font-bold text-lg flex items-center gap-2">
                                    Listing as <span className="capitalize text-brand-green">{activeRole}</span>
                                    {isRoleOnboarded && <HiOutlineCheckBadge className="text-brand-green" />}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* ROLE-SPECIFIC QUESTIONS SECTION */}
                    <section className={cardClasses}>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-[#111811]">Professional Context</h3>
                            <p className="text-sm text-gray-500">Details required for <span className="text-brand-green font-medium">{activeRole}</span> listings</p>
                        </div>

                        {activeRole === 'agent' ? (
                            <div className="space-y-6 animate-in slide-in-from-left duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>Agency Name</label>
                                        <input {...register('agencyName')} className={inputClasses} placeholder="e.g. Prime Realty Ltd" />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Agent License No.</label>
                                        <input {...register('agentLicense')} className={inputClasses} placeholder="Optional for verification" />
                                    </div>
                                </div>

                                {/* Optional Landlord info for Agents */}
                                <div className="p-5 bg-green-50/50 rounded-2xl border border-brand-green/10">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="size-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                                            <HiOutlineShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900">Owner Verification (Optional)</h4>
                                            <p className="text-xs text-gray-500">Provide the landlord's contact to automatically request verification. This increases your listing's trust score.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input {...register('landlord.fullName')} className={inputClasses} placeholder="Landlord Full Name" />
                                        <input {...register('landlord.email')} className={inputClasses} placeholder="Landlord Email" />
                                    </div>
                                </div>

                                {/* Caretaker Assignment for Agents */}
                                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-500/10">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                            <MdOutlineAssignmentInd size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900">Assign Caretaker (Optional)</h4>
                                            <p className="text-xs text-gray-500">Assign a management representative to handle this property's daily operations.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input {...register('caretaker.fullName')} className={inputClasses} placeholder="Caretaker Full Name" />
                                        <input {...register('caretaker.email')} className={inputClasses} placeholder="Caretaker Email" />
                                    </div>
                                </div>
                            </div>
                        ) : activeRole === 'caretaker' ? (
                            <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 animate-in slide-in-from-right duration-300">
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <MdOutlineAssignmentInd className="text-brand-green" size={20} />
                                    You are submitting a property update/request on behalf of the owner. This will be sent for review.
                                </p>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
                                    <div className="md:col-span-2">
                                        <h4 className="text-sm font-bold text-brand-green uppercase tracking-wider mb-1">Landlord Information</h4>
                                        <p className="text-xs text-gray-500 mb-4">Provide the owner's details to automatically invite them to the platform.</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClasses}>Landlord Full Name</label>
                                        <input {...register('landlord.fullName')} className={inputClasses} placeholder="e.g. John Doe" />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Landlord Email</label>
                                        <input {...register('landlord.email')} className={inputClasses} placeholder="landlord@example.com" />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Landlord Phone</label>
                                        <input {...register('landlord.phone')} className={inputClasses} placeholder="+234 ..." />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <HiOutlineShieldCheck className="text-brand-green" />
                                        Listing as the primary owner. Ensure you have ownership documents ready.
                                    </p>
                                </div>

                                {/* Caretaker Assignment for Landlords */}
                                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-500/10">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                            <MdOutlineAssignmentInd size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900">Invite & Assign Caretaker (Optional)</h4>
                                            <p className="text-xs text-gray-500">Need someone to manage this property? Invite a caretaker to help with listings and tenants.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input {...register('caretaker.fullName')} className={inputClasses} placeholder="Caretaker Full Name" />
                                        <input {...register('caretaker.email')} className={inputClasses} placeholder="Caretaker Email" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* PROPERTY DETAILS */}
                    <section className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="size-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                                <MdOutlineVilla size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#111811]">Listing Details</h3>
                                <p className="text-sm text-gray-500">Categorize your property and set its basic identity.</p>
                            </div>
                        </div>

                        {/* Title field moved to top of listing details */}
                        <div className="mb-10">
                            <label className={labelClasses}>Property Title</label>
                            <input {...register('title')} className={inputClasses} placeholder="e.g. Luxury 4 Bedroom Semi-Detached Duplex" />
                        </div>

                        {/* Listing Type First - Logic: Property Types depend on this */}
                        <div className="mb-10">
                            <label className={labelClasses}>Listing Type</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { id: 'Rent', label: 'For Rent', icon: HiOutlineHome },
                                    { id: 'Sale', label: 'For Sale', icon: MdOutlineBusinessCenter },
                                    { id: 'Service-Apartment', label: 'Short Let', icon: MdOutlineHotel },
                                    { id: 'Rent-to-Own', label: 'Rent to Own', icon: MdOutlineKey },
                                ].map((type) => (
                                    <label key={type.id} className="relative cursor-pointer group">
                                        <input
                                            {...register('listingType')}
                                            type="radio"
                                            value={type.id}
                                            className="peer sr-only"
                                            onChange={(e) => {
                                                const val = e.target.value as "Rent" | "Sale" | "Service-Apartment" | "Rent-to-Own";
                                                setValue('listingType', val);
                                                setValue('propertyType', ''); // Reset type when listing type changes
                                            }}
                                        />
                                        <div className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-gray-100 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50/50 peer-checked:scale-[1.02] hover:border-gray-300">
                                            <type.icon className={`text-2xl mb-2 transition-colors ${selectedListingType === type.id ? 'text-brand-green' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                            <span className={`font-bold text-xs ${selectedListingType === type.id ? 'text-brand-green' : 'text-gray-500 group-hover:text-gray-700'}`}>{type.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Property Category */}
                        <div className="mb-10">
                            <label className={labelClasses}>Property Category</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {PROPERTY_CATEGORIES.map((cat) => (
                                    <label key={cat.id} className="relative cursor-pointer group">
                                        <input {...register('propertyCategory')} type="radio" value={cat.label} className="peer sr-only" />
                                        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50 peer-checked:shadow-sm hover:border-brand-green/50 min-h-[80px]">
                                            <span className="text-sm font-bold text-gray-700 peer-checked:text-brand-green">{cat.label}</span>
                                            <span className="text-[10px] text-gray-400 font-normal mt-1 text-center hidden sm:block">{cat.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Property Type - DYNAMIC CARDS ENABLED */}
                        {selectedListingType && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                                <label className={labelClasses}>Property Type</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {(PROPERTY_TYPES_BY_LISTING[selectedListingType] || []).map((type) => (
                                        <label key={type} className="relative cursor-pointer group">
                                            <input {...register('propertyType')} type="radio" value={type} className="peer sr-only" />
                                            <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50 peer-checked:ring-1 peer-checked:ring-brand-green hover:bg-gray-50">
                                                <div className="size-2 rounded-full bg-gray-300 peer-checked:bg-brand-green transition-colors"></div>
                                                <span className="text-xs font-bold text-gray-700 peer-checked:text-brand-green">{type}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#00421F] text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 size-32 bg-brand-green opacity-20 rounded-full"></div>

                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                            <span className="w-1.5 h-6 rounded-full bg-brand-green"></span>
                            Onboarding Tip
                        </h4>
                        <ul className="space-y-6 relative z-10">
                            <li className="flex gap-4">
                                <span className="text-sm font-bold text-brand-green">01</span>
                                <p className="text-xs sm:text-sm text-green-50">
                                    You are currently listing as an <strong className="capitalize">{activeRole}</strong>.
                                    {activeRole === 'agent' ? " Your agency name will be displayed to build trust." :
                                        activeRole === 'caretaker' ? " Ensure the property details match your management records." :
                                            " Personal ownership details will be kept private until interest is shown."}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        </>
    );
}