'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useFormContext, useWatch } from 'react-hook-form';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useUserStore } from '@/store/userStore';
import { PROPERTY_CATEGORIES } from '@/config/propertyConfig';

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

const PropertyMap = dynamic(() => import('./PropertyMap'), {
    ssr: false,
    loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Loading Map...</div>
});

export default function BasicsStep() {
    const { register, setValue, control } = useFormContext<PropertySchema>();
    const { activeRole, setActiveRole } = useUserStore();
    const { draftData, roleOnboardingCompleted } = useOnboardingStore();

    const [showModal, setShowModal] = useState(false);
    const [pendingRole, setPendingRole] = useState<'landlord' | 'agent' | 'caretaker' | null>(null);

    const selectedListingType = useWatch({ control, name: 'listingType' });
    const street = useWatch({ control, name: 'address.street' });
    const city = useWatch({ control, name: 'address.city' });
    const state = useWatch({ control, name: 'address.state' });

    const [coords, setCoords] = useState<[number, number]>([6.5244, 3.3792]);

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

    // 2. Logic: Geocoding
    useEffect(() => {
        const fullAddress = `${street || ''} ${city || ''} ${state || ''}`.trim();
        if (fullAddress.length < 5) return;

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`);
                const data = await res.json();
                if (data && data[0]) {
                    setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                }
            } catch (error) {
                console.error("Geocoding failed", error);
            }
        }, 1200);
        return () => clearTimeout(timer);
    }, [street, city, state]);

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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left duration-300">
                                <div>
                                    <label className={labelClasses}>Agency Name</label>
                                    <input {...register('agencyName')} className={inputClasses} placeholder="e.g. Prime Realty Ltd" />
                                </div>
                                <div>
                                    <label className={labelClasses}>Agent License No.</label>
                                    <input {...register('agentLicense')} className={inputClasses} placeholder="Optional for verification" />
                                </div>
                            </div>
                        ) : activeRole === 'caretaker' ? (
                            <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 animate-in slide-in-from-right duration-300">
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <MdOutlineAssignmentInd className="text-brand-green" size={20} />
                                    You are submitting a property update/request on behalf of the owner. This will be sent for review.
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 animate-in slide-in-from-right duration-300">
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <HiOutlineShieldCheck className="text-brand-green" />
                                    Listing as the primary owner. Ensure you have ownership documents ready.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* PROPERTY TYPE */}
                    <section className={cardClasses}>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-[#111811]">Listing Details</h3>
                            <p className="text-sm text-gray-500">Categorize your property.</p>
                        </div>

                        {/* Property Category - DYNAMIC */}
                        <div className="mb-8">
                            <label className={labelClasses}>Property Category</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {PROPERTY_CATEGORIES.map((cat) => (
                                    <label key={cat.id} className="relative cursor-pointer group">
                                        <input {...register('propertyCategory')} type="radio" value={cat.label} className="peer sr-only" />
                                        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-200 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50 text-sm font-medium text-gray-700 peer-checked:text-brand-green h-full">
                                            <span>{cat.label}</span>
                                            <span className="text-[10px] text-gray-400 font-normal mt-1 text-center hidden sm:block">{cat.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="mb-8">
                            <label className={labelClasses}>Property Type</label>
                            <input {...register('propertyType')} className={inputClasses} placeholder="e.g. Apartment, Office Space, Detached House" />
                        </div>

                        <div className="mb-4">
                            <label className={labelClasses}>Listing Type</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                {[
                                    { id: 'Rent', label: 'For Rent', icon: HiOutlineHome },
                                    { id: 'Sale', label: 'For Sale', icon: MdOutlineBusinessCenter },
                                    { id: 'Service-Apt', label: 'Short Let', icon: MdOutlineHotel },
                                    { id: 'Rent-to-Own', label: 'Rent to Own', icon: MdOutlineKey },
                                ].map((type) => (
                                    <label key={type.id} className="relative cursor-pointer">
                                        <input {...register('listingType')} type="radio" value={type.id} className="peer sr-only" />
                                        <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-2 border-gray-50 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50/30 peer-checked:shadow-sm">
                                            <type.icon className={`text-2xl sm:text-3xl mb-2 transition-colors ${selectedListingType === type.id ? 'text-brand-green' : 'text-gray-400'}`} />
                                            <span className={`font-bold text-[10px] sm:text-sm whitespace-nowrap ${selectedListingType === type.id ? 'text-brand-green' : 'text-gray-500'}`}>{type.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* LOCATION & MAP */}
                    <section className={cardClasses}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="size-8 rounded-lg bg-brand-green flex items-center justify-center text-white">
                                <HiOutlineMapPin />
                            </div>
                            <h3 className="text-xl font-bold text-[#111811]">Address Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Property Title</label>
                                <input {...register('title')} className={inputClasses} placeholder="e.g. Luxury 4 Bedroom Semi-Detached Duplex" />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Street Address</label>
                                <input {...register('address.street')} className={inputClasses} placeholder="123 Real Estate Ave" />
                            </div>
                            <div>
                                <label className={labelClasses}>City</label>
                                <input {...register('address.city')} className={inputClasses} placeholder="Lekki" />
                            </div>
                            <div>
                                <label className={labelClasses}>State</label>
                                <input {...register('address.state')} className={inputClasses} placeholder="Lagos" />
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-inner h-64 sm:h-80 w-full relative z-0">
                            <PropertyMap position={coords} />
                        </div>
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
            </div>
        </>
    );
}