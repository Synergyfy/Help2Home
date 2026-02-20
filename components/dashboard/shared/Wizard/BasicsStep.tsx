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
    HiOutlineShieldCheck,
    HiOutlineCalendar,
    HiOutlineSparkles
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
    role?: 'landlord' | 'agent' | 'caretaker' | 'developer';
    navigation?: {
        onNext: () => void;
        onBack: () => void;
        isPending: boolean;
        isFirstStep: boolean;
        isLastStep: boolean;
        submitLabel: string;
    };
}

export default function BasicsStep({ role, navigation }: BasicsStepProps = {}) {
    const { register, setValue, control, formState: { errors }, getValues } = useFormContext<PropertySchema>();
    const { activeRole, setActiveRole } = useUserStore();
    const { draftData, roleOnboardingCompleted } = useOnboardingStore();

    const [showModal, setShowModal] = useState(false);
    const [pendingRole, setPendingRole] = useState<'landlord' | 'agent' | 'caretaker' | null>(null);

    // Toggle states for optional assignments
    const [hasLandlord, setHasLandlord] = useState(false);
    const [hasCaretaker, setHasCaretaker] = useState(false);

    const selectedListingType = useWatch({ control, name: 'listingType' });
    const selectedCategory = useWatch({ control, name: 'propertyCategory' });
    const availabilityStatus = useWatch({ control, name: 'terms.availabilityStatus' });

    const [isGeneratingAi, setIsGeneratingAi] = useState(false);

    const generateAiDescription = async () => {
        const title = getValues('title');
        const type = getValues('propertyType');
        const category = getValues('propertyCategory');

        if (!title || title.length < 5) {
            // Primitive alert since we don't have toast imported here yet, usually handled higher up
            alert("Please enter a valid property title first.");
            return;
        }

        setIsGeneratingAi(true);
        // Simulate AI delay
        setTimeout(() => {
            const desc = `Experience luxury living in this stunning ${type || 'property'} located in a prime area. This ${category || 'exclusive'} residence, titled "${title}", offers a perfect blend of comfort and style. Ideal for those seeking a premium lifestyle with easy access to local amenities. Don't miss this opportunity to secure your dream space.`;
            setValue('description.long', desc, { shouldDirty: true, shouldValidate: true });
            setIsGeneratingAi(false);
        }, 1500);
    };

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

                        {activeRole === 'agent' || activeRole === 'developer' ? (
                            <div className="space-y-6 animate-in slide-in-from-left duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>{activeRole === 'developer' ? 'Company Name *' : 'Agency Name *'}</label>
                                        <input {...register('agencyName')} className={`${inputClasses} ${errors.agencyName ? 'border-red-500 ring-red-500' : ''}`} placeholder={activeRole === 'developer' ? "e.g. Zenith Developments" : "e.g. Prime Realty Ltd"} />
                                        {errors.agencyName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.agencyName.message}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClasses}>{activeRole === 'developer' ? 'Registration Number (Optional)' : 'Agent License No. (Optional)'}</label>
                                        <input {...register('agentLicense')} className={`${inputClasses} ${errors.agentLicense ? 'border-red-500 ring-red-500' : ''}`} placeholder="Optional for verification" />
                                        {errors.agentLicense && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.agentLicense.message}</p>}
                                    </div>
                                </div>

                                {/* Optional Landlord info for Agents/Developers - Maybe less relevant for developers as they own it, but keeping structure for now */}
                                {activeRole === 'agent' && (
                                    <div className="p-5 bg-green-50/50 rounded-2xl border border-brand-green/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-start gap-3">
                                                <div className="size-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                                                    <HiOutlineShieldCheck size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">Owner Verification</h4>
                                                    <p className="text-xs text-gray-500">Provide the landlord's contact to request verification.</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setHasLandlord(!hasLandlord)}
                                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${hasLandlord ? 'bg-brand-green' : 'bg-gray-200'}`}
                                            >
                                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hasLandlord ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                        </div>

                                        {hasLandlord && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div>
                                                    <input {...register('landlord.firstName')} className={`${inputClasses} ${errors.landlord?.firstName ? 'border-red-500 ring-red-500' : ''}`} placeholder="Landlord First Name (Optional)" />
                                                    {errors.landlord?.firstName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.landlord.firstName.message}</p>}
                                                </div>
                                                <div>
                                                    <input {...register('landlord.lastName')} className={`${inputClasses} ${errors.landlord?.lastName ? 'border-red-500 ring-red-500' : ''}`} placeholder="Landlord Last Name (Optional)" />
                                                    {errors.landlord?.lastName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.landlord.lastName.message}</p>}
                                                </div>
                                                <div>
                                                    <input {...register('landlord.email')} className={`${inputClasses} ${errors.landlord?.email ? 'border-red-500 ring-red-500' : ''}`} placeholder="Landlord Email (Optional)" />
                                                    {errors.landlord?.email && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.landlord.email.message}</p>}
                                                </div>
                                                <div>
                                                    <input {...register('landlord.phone')} className={`${inputClasses} ${errors.landlord?.phone ? 'border-red-500 ring-red-500' : ''}`} placeholder="Landlord Phone (Optional)" />
                                                    {errors.landlord?.phone && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.landlord.phone.message}</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}


                                {/* Caretaker Assignment for Agents */}
                                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-500/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                                <MdOutlineAssignmentInd size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">Assign Caretaker</h4>
                                                <p className="text-xs text-gray-500">Assign a management representative for daily operations.</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setHasCaretaker(!hasCaretaker)}
                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${hasCaretaker ? 'bg-brand-green' : 'bg-gray-200'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hasCaretaker ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>

                                    {hasCaretaker && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div>
                                                <input {...register('caretaker.firstName')} className={`${inputClasses} ${errors.caretaker?.firstName ? 'border-red-500 ring-red-500' : ''}`} placeholder="Caretaker First Name (Optional)" />
                                                {errors.caretaker?.firstName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.caretaker.firstName.message}</p>}
                                            </div>
                                            <div>
                                                <input {...register('caretaker.lastName')} className={`${inputClasses} ${errors.caretaker?.lastName ? 'border-red-500 ring-red-500' : ''}`} placeholder="Caretaker Last Name (Optional)" />
                                                {errors.caretaker?.lastName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.caretaker.lastName.message}</p>}
                                            </div>
                                            <div>
                                                <input {...register('caretaker.email')} className={`${inputClasses} ${errors.caretaker?.email ? 'border-red-500 ring-red-500' : ''}`} placeholder="Caretaker Email (Optional)" />
                                                {errors.caretaker?.email && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.caretaker.email.message}</p>}
                                            </div>
                                            <div>
                                                <input {...register('caretaker.phone')} className={`${inputClasses} ${errors.caretaker?.phone ? 'border-red-500 ring-red-500' : ''}`} placeholder="Caretaker Phone (Optional)" />
                                                {errors.caretaker?.phone && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.caretaker.phone.message}</p>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        ) : activeRole === 'caretaker' ? (
                            <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 animate-in slide-in-from-right duration-300">
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <MdOutlineAssignmentInd className="text-brand-green" size={20} />
                                    You are submitting a property update/request on behalf of the owner. This will be sent for review.
                                </p>

                                <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="text-sm font-bold text-brand-green uppercase tracking-wider mb-1">Landlord Information</h4>
                                            <p className="text-xs text-gray-500">Owner details are required for caretaker listings.</p>
                                        </div>
                                        {/* For caretakers, this is mandatory, so we don't show a toggle to disable it */}
                                        <div className="size-6 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                                            <HiOutlineShieldCheck size={16} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div>
                                            <label className={labelClasses}>Landlord First Name *</label>
                                            <input {...register('landlord.firstName')} className={`${inputClasses} ${errors.landlord?.firstName ? 'border-red-500 ring-red-500' : ''}`} placeholder="e.g. John" />
                                            {errors.landlord?.firstName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.landlord.firstName.message}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Landlord Last Name *</label>
                                            <input {...register('landlord.lastName')} className={`${inputClasses} ${errors.landlord?.lastName ? 'border-red-500 ring-red-500' : ''}`} placeholder="e.g. Doe" />
                                            {errors.landlord?.lastName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.landlord.lastName.message}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Landlord Email *</label>
                                            <input {...register('landlord.email')} className={`${inputClasses} ${errors.landlord?.email ? 'border-red-500 ring-red-500' : ''}`} placeholder="landlord@example.com" />
                                            {errors.landlord?.email && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.landlord.email.message}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Landlord Phone (Optional)</label>
                                            <input {...register('landlord.phone')} className={`${inputClasses} ${errors.landlord?.phone ? 'border-red-500 ring-red-500' : ''}`} placeholder="+234 ..." />
                                            {errors.landlord?.phone && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.landlord.phone.message}</p>}
                                        </div>
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
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                                <MdOutlineAssignmentInd size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">Invite & Assign Caretaker</h4>
                                                <p className="text-xs text-gray-500">Invite a representative to help manage this property.</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setHasCaretaker(!hasCaretaker)}
                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${hasCaretaker ? 'bg-brand-green' : 'bg-gray-200'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hasCaretaker ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>

                                    {hasCaretaker && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div>
                                                <label className={labelClasses}>Caretaker First Name (Optional)</label>
                                                <input {...register('caretaker.firstName')} className={`${inputClasses} ${errors.caretaker?.firstName ? 'border-red-500 ring-red-500' : ''}`} placeholder="Caretaker First Name" />
                                                {errors.caretaker?.firstName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.caretaker.firstName.message}</p>}
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Caretaker Last Name (Optional)</label>
                                                <input {...register('caretaker.lastName')} className={`${inputClasses} ${errors.caretaker?.lastName ? 'border-red-500 ring-red-500' : ''}`} placeholder="Caretaker Last Name" />
                                                {errors.caretaker?.lastName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.caretaker.lastName.message}</p>}
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Caretaker Email (Optional)</label>
                                                <input {...register('caretaker.email')} className={`${inputClasses} ${errors.caretaker?.email ? 'border-red-500 ring-red-500' : ''}`} placeholder="Caretaker Email" />
                                                {errors.caretaker?.email && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.caretaker.email.message}</p>}
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Caretaker Phone (Optional)</label>
                                                <input {...register('caretaker.phone')} className={`${inputClasses} ${errors.caretaker?.phone ? 'border-red-500 ring-red-500' : ''}`} placeholder="Caretaker Phone" />
                                                {errors.caretaker?.phone && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.caretaker.phone.message}</p>}
                                            </div>
                                        </div>
                                    )}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                                <label className={labelClasses}>Property Title *</label>
                                <input {...register('title')} className={`${inputClasses} ${errors.title ? 'border-red-500 ring-red-500' : ''}`} placeholder="e.g. Luxury 4 Bedroom Semi-Detached Duplex" />
                                {errors.title && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className={labelClasses}>Community / Contact Link (Optional)</label>
                                <input {...register('communityLink')} className={`${inputClasses} ${errors.communityLink ? 'border-red-500 ring-red-500' : ''}`} placeholder="e.g. WhatsApp group, personal link" />
                                {errors.communityLink && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.communityLink.message}</p>}
                            </div>
                        </div>

                        {/* Description Section - Especially for Developers */}
                        {/* AVAILABILITY CALENDAR FEATURE */}
                        <div className="mb-10 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                                    <HiOutlineCalendar size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#111811]">Availability & Occupancy</h3>
                                    <p className="text-sm text-gray-500">When will this property be ready for occupants?</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {['Now', 'Specific Date'].map((status) => (
                                        <label key={status} className="relative cursor-pointer group">
                                            <input
                                                {...register('terms.availabilityStatus')}
                                                type="radio"
                                                value={status}
                                                className="peer sr-only"
                                            />
                                            <div className="flex items-center justify-center p-4 rounded-xl border border-gray-200 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50 peer-checked:font-bold hover:bg-gray-50 peer-checked:text-brand-green">
                                                <span className="text-sm">
                                                    {status === 'Now' ? 'Available Now' : 'Specific Date'}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {availabilityStatus === 'Specific Date' && (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <label className={labelClasses}>Select Move-in Date *</label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            {...register('terms.availableFrom')}
                                            className={inputClasses}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description Section with AI */}
                        <div className="mb-10 animate-in fade-in slide-in-from-top-2 duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-[#111811]">Description</h3>
                                <button
                                    type="button"
                                    onClick={generateAiDescription}
                                    disabled={isGeneratingAi}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-green/10 text-brand-green text-xs font-bold hover:bg-brand-green hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {isGeneratingAi ? (
                                        <div className="size-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <HiOutlineSparkles size={14} />
                                    )}
                                    {isGeneratingAi ? 'Generating...' : 'Auto-Generate with AI'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className={labelClasses}>{activeRole === 'developer' ? 'Project Tagline (Short) (Optional)' : 'Short Description (Catchy headline) (Optional)'}</label>
                                    <input
                                        {...register('description.short')}
                                        className={`${inputClasses} ${errors.description?.short ? 'border-red-500 ring-red-500' : ''}`}
                                        placeholder={activeRole === 'developer' ? "e.g. Modern Living Reimagined in Lekki" : "e.g. Cozy 2-bed apartment in city center"}
                                    />
                                    {errors.description?.short && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.description.short.message}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses}>{activeRole === 'developer' ? 'Project Full Explanation (Optional)' : 'Full Property Description (Optional)'}</label>
                                    <textarea
                                        {...register('description.long')}
                                        className={`w-full p-4 rounded-xl border ${errors.description?.long ? 'border-red-500 ring-red-500' : 'border-gray-200'} bg-white text-[#111811] focus:border-brand-green focus:ring-1 focus:ring-[brand-green] outline-none transition-all placeholder:text-gray-400 shadow-sm min-h-[120px]`}
                                        placeholder={activeRole === 'developer' ? "Describe the vision, amenities, and lifestyle..." : "Describe the key features, neighborhood, etc..."}
                                    />
                                    {errors.description?.long && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.description.long.message}</p>}
                                </div>
                            </div>
                        </div>


                        {/* MARKETPLACE FEATURES / BUYING SCHEMES */}
                        <div className="mb-10 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Property Features & Schemes</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'isNewBuild', label: 'New Build' },
                                    { id: 'isSharedOwnership', label: 'Shared Ownership' },
                                    { id: 'isRetirementHome', label: 'Retirement Home' },
                                    { id: 'isAuction', label: 'Auction Property' },
                                    { id: 'isOffPlan', label: 'Off-plan / Pre-construction' },
                                    { id: 'isVerified', label: 'Request Physical Verification' },
                                ].map((item) => (
                                    <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                {...register(item.id as any)}
                                                type="checkbox"
                                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white transition-all checked:bg-brand-green checked:border-brand-green focus:outline-none"
                                            />
                                            <svg className="absolute w-3.5 h-3.5 mt-0.5 ml-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors">{item.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Listing Type First - Logic: Property Types depend on this */}
                        <div className="mb-10">
                            <label className={labelClasses}>Listing Type *</label>
                            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${errors.listingType ? 'border-red-500 ring-1 ring-red-500 rounded-lg p-2' : ''}`}>
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
                            {errors.listingType && <p className="text-[10px] text-red-500 mt-2 font-bold">{errors.listingType.message}</p>}
                        </div>

                        {/* Property Category */}
                        <div className="mb-10">
                            <label className={labelClasses}>Property Category *</label>
                            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${errors.propertyCategory ? 'border-red-500 ring-1 ring-red-500 rounded-lg p-2' : ''}`}>
                                {PROPERTY_CATEGORIES.map((cat) => (
                                    <label key={cat.id} className="relative cursor-pointer group">
                                        <input
                                            {...register('propertyCategory')}
                                            type="radio"
                                            value={cat.label}
                                            className="peer sr-only"
                                            onChange={(e) => {
                                                setValue('propertyCategory', e.target.value as any);
                                                setValue('propertyType', ''); // Reset type when category changes
                                            }}
                                        />
                                        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50 peer-checked:shadow-sm hover:border-brand-green/50 min-h-[80px]">
                                            <span className="text-sm font-bold text-gray-700 peer-checked:text-brand-green">{cat.label}</span>
                                            <span className="text-[10px] text-gray-400 font-normal mt-1 text-center hidden sm:block">{cat.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.propertyCategory && <p className="text-[10px] text-red-500 mt-2 font-bold">{errors.propertyCategory.message}</p>}
                        </div>

                        {/* Property Type - CATEGORY DRIVEN */}
                        {selectedCategory && (
                            <div className={`animate-in fade-in slide-in-from-top-4 duration-500 mb-10 ${errors.propertyType ? 'border-red-500 ring-1 ring-red-500 rounded-lg p-2' : ''}`}>
                                <label className={labelClasses}>Property Type *</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {(PROPERTY_CATEGORIES.find(c => c.label === selectedCategory)?.types || []).map((type) => (
                                        <label key={type} className="relative cursor-pointer group">
                                            <input {...register('propertyType')} type="radio" value={type} className="peer sr-only" />
                                            <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50 peer-checked:ring-1 peer-checked:ring-brand-green hover:bg-gray-50">
                                                <div className="size-2 rounded-full bg-gray-300 peer-checked:bg-brand-green transition-colors"></div>
                                                <span className="text-xs font-bold text-gray-700 peer-checked:text-brand-green">{type}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.propertyType && <p className="text-[10px] text-red-500 mt-2 font-bold">{errors.propertyType.message}</p>}
                            </div>
                        )}


                        {/* IN-PAGE NAVIGATION BUTTONS */}
                        {navigation && (
                            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={navigation.onBack}
                                    disabled={navigation.isFirstStep}
                                    className={`px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 ${navigation.isFirstStep
                                        ? 'opacity-0 pointer-events-none'
                                        : 'text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100'
                                        }`}
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={navigation.onNext}
                                    disabled={navigation.isPending}
                                    className="px-12 py-4 bg-brand-green text-white rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 active:scale-95 disabled:opacity-50"
                                >
                                    {navigation.isPending ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        navigation.isLastStep ? navigation.submitLabel : 'Continue to Location'
                                    )}
                                </button>
                            </div>
                        )}
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1 space-y-6 animate-in slide-in-from-right duration-500 delay-150">
                    <div className="bg-[#00421F] text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden sticky top-8">
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
                    </div >
                </div >
            </div >
        </>
    );
}
