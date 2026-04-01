'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import {
    HiOutlineSquare2Stack,
    HiOutlineMoon,
    HiOutlineCheckCircle,
    HiOutlineSparkles,
    HiOutlineShieldCheck
} from 'react-icons/hi2';
import {
    MdOutlineBathtub,
    MdOutlineChair,
    MdOutlineFormatListBulleted
} from 'react-icons/md';

const STANDARD_FEES = [
    'Service Charge',
    'Legal Fees (Standard)',
    'Tenancy Agreement'
];

const AMENITIES_LIST = [
    'Water Supply', 'Electricity (24/7)', 'Security', 'Gated Estate',
    'Swimming Pool', 'Gym', 'WiFi / Internet', 'Parking Space',
    'Elevator', 'Generator', 'Air Conditioning', 'Balcony',
    'Garden', 'Boys Quarters (BQ)', 'CCTV', 'Waste Disposal'
];

interface DetailsAmenitiesStepProps {
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

export default function DetailsAmenitiesStep({ role, navigation }: DetailsAmenitiesStepProps = {}) {
    const { register, setValue, watch, formState: { errors } } = useFormContext<PropertySchema>();
    const amenities = useWatch({ name: 'amenities' }) || [];
    const [customName, setCustomName] = React.useState('');
    const [customPrice, setCustomPrice] = React.useState<number>(0);

    const toggleAmenity = (amenityName: string) => {
        const index = amenities.findIndex((a: any) => a.name === amenityName);
        if (index > -1) {
            const updated = [...amenities];
            updated.splice(index, 1);
            setValue('amenities', updated, { shouldDirty: true, shouldValidate: true });
        } else {
            setValue('amenities', [...amenities, { name: amenityName, price: 0 }], { shouldDirty: true, shouldValidate: true });
        }
    };

    const updateAmenityPrice = (amenityName: string, price: number) => {
        const updated = amenities.map((a: any) =>
            a.name === amenityName ? { ...a, price: Number(price) } : a
        );
        setValue('amenities', updated, { shouldDirty: true, shouldValidate: true });
    };

    const addCustomCharge = () => {
        if (!customName.trim()) return;
        if (amenities.some((a: any) => a.name === customName)) return;
        setValue('amenities', [...amenities, { name: customName, price: customPrice }], { shouldDirty: true, shouldValidate: true });
        setCustomName('');
        setCustomPrice(0);
    };

    const removeAmenity = (name: string) => {
        const updated = amenities.filter((a: any) => a.name !== name);
        setValue('amenities', updated, { shouldDirty: true, shouldValidate: true });
    };

    const isAmenitySelected = (name: string) => amenities.some((a: any) => a.name === name);
    const getAmenityPrice = (name: string) => amenities.find((a: any) => a.name === name)?.price || 0;

    const cardClasses = "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8";
    const labelClasses = "block text-xs font-black uppercase tracking-widest text-gray-500 mb-2";
    const inputClasses = "w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:border-brand-green outline-none transition-all font-bold";

    return (
        <div className="max-w-4xl mx-auto pt-4 pb-12">
            {/* PROPERTY SPECIFICATIONS */}
            <section className={cardClasses}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="size-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <HiOutlineSparkles size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Property Specifications</h3>
                        <p className="text-sm text-gray-500">Define the internal metrics of the property.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Sections for Bedrooms, Bathrooms, Area Size, Furnishing */}
                    <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                        <div className="flex items-center gap-2 mb-3">
                            <HiOutlineMoon className="text-gray-400 group-hover:text-brand-green transition-colors" />
                            <label className={labelClasses}>Bedrooms (Optional)</label>
                        </div>
                        <input
                            type="number"
                            min="0"
                            {...register('specs.bedrooms', { valueAsNumber: true })}
                            className={`${inputClasses} ${errors.specs?.bedrooms ? 'border-red-500 ring-red-500' : ''}`}
                            placeholder="0"
                        />
                        {errors.specs?.bedrooms && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.specs.bedrooms.message}</p>}
                    </div>
                    <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                        <div className="flex items-center gap-2 mb-3">
                            <MdOutlineBathtub className="text-gray-400 group-hover:text-brand-green transition-colors" />
                            <label className={labelClasses}>Bathrooms (Optional)</label>
                        </div>
                        <input
                            type="number"
                            min="0"
                            step="0.5"
                            {...register('specs.bathrooms', { valueAsNumber: true })}
                            className={`${inputClasses} ${errors.specs?.bathrooms ? 'border-red-500 ring-red-500' : ''}`}
                            placeholder="0"
                        />
                        {errors.specs?.bathrooms && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.specs.bathrooms.message}</p>}
                    </div>
                    <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                        <div className="flex items-center gap-2 mb-3">
                            <HiOutlineSquare2Stack className="text-gray-400 group-hover:text-brand-green transition-colors" />
                            <label className={labelClasses}>Area Size (Optional)</label>
                        </div>
                        <div className="flex">
                            <input
                                type="number"
                                min="0"
                                {...register('specs.area', { valueAsNumber: true })}
                                className={`w-full h-12 pl-4 pr-1 rounded-l-xl border-y border-l ${errors.specs?.area ? 'border-red-500 ring-red-500' : 'border-gray-200'} bg-gray-50 text-gray-900 focus:border-brand-green outline-none font-bold`}
                                placeholder="0"
                            />
                            <select
                                {...register('specs.areaUnit')}
                                className={`h-12 border ${errors.specs?.areaUnit ? 'border-red-500 ring-red-500' : 'border-gray-200'} rounded-r-xl px-2 bg-gray-100 text-[10px] font-black uppercase text-gray-500 focus:outline-none`}
                            >
                                <option value="sqm">sqm</option>
                                <option value="sqft">sqft</option>
                            </select>
                        </div>
                        {errors.specs?.area && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.specs.area.message}</p>}
                        {errors.specs?.areaUnit && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.specs.areaUnit.message}</p>}
                    </div>
                    <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                        <div className="flex items-center gap-2 mb-3">
                            <MdOutlineChair className="text-gray-400 group-hover:text-brand-green transition-colors" />
                            <label className={labelClasses}>Furnishing (Optional)</label>
                        </div>
                        <select
                            {...register('specs.furnishing')}
                            className={`${inputClasses} ${errors.specs?.furnishing ? 'border-red-500 ring-red-500' : ''}`}
                        >
                            <option value="">Select...</option>
                            <option value="Furnished">Furnished</option>
                            <option value="Partly Furnished">Partly Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                        </select>
                        {errors.specs?.furnishing && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.specs.furnishing.message}</p>}
                    </div>
                </div>
            </section>

            {/* UNIFIED CHARGES & AMENITIES */}
            <section className={cardClasses}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="size-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <HiOutlineShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Unified Charges & Amenities</h3>
                        <p className="text-sm text-gray-500">Legal fees, service charges, and optional amenities.</p>
                    </div>
                </div>

                {/* Standard Nigeria Fees */}
                <div className="mb-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                        <span className="w-8 h-px bg-gray-200"></span>
                        Legal & Agreement Fees
                        <span className="grow h-px bg-gray-200"></span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {STANDARD_FEES.map(fee => {
                            const selected = isAmenitySelected(fee);
                            return (
                                <div key={fee} className={`p-4 rounded-2xl border-2 transition-all ${selected ? 'border-brand-green bg-green-50/30 shadow-md' : 'border-gray-50 bg-white hover:border-gray-200'}`}>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 shrink-0">
                                            <button type="button" onClick={() => toggleAmenity(fee)} className={`size-6 rounded-lg flex items-center justify-center border-2 transition-all ${selected ? 'bg-brand-green border-brand-green text-white' : 'bg-white border-gray-200 text-transparent'}`}>
                                                <HiOutlineCheckCircle size={16} />
                                            </button>
                                            <span className={`text-sm font-bold ${selected ? 'text-brand-green' : 'text-gray-700'}`}>{fee}</span>
                                        </div>
                                        {selected && (
                                            <div className="relative grow max-w-[140px]">
                                                <span className="absolute left-2.5 inset-y-0 flex items-center text-[10px] font-bold text-brand-green/50">₦</span>
                                                <input
                                                    type="text"
                                                    value={getAmenityPrice(fee) ? getAmenityPrice(fee).toLocaleString() : ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                                        updateAmenityPrice(fee, Number(val));
                                                    }}
                                                    className="w-full h-9 pl-6 pr-2 rounded-lg border border-brand-green/20 bg-white text-xs font-bold text-brand-green outline-none"
                                                    placeholder="Amount"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* General Amenities */}
                <div className="mb-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                        <span className="w-8 h-px bg-gray-200"></span>
                        Facility Amenities
                        <span className="grow h-px bg-gray-200"></span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {AMENITIES_LIST.map(amenity => {
                            const selected = isAmenitySelected(amenity);
                            return (
                                <div key={amenity} className={`p-4 rounded-2xl border-2 transition-all ${selected ? 'border-brand-green bg-green-50/30' : 'border-gray-50 bg-white hover:border-gray-200'}`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <button type="button" onClick={() => toggleAmenity(amenity)} className={`size-6 rounded-lg flex items-center justify-center border-2 transition-all ${selected ? 'bg-brand-green border-brand-green text-white' : 'bg-white border-gray-200 text-transparent'}`}>
                                                <HiOutlineCheckCircle size={16} />
                                            </button>
                                            <span className={`text-sm font-bold ${selected ? 'text-brand-green' : 'text-gray-700'}`}>{amenity}</span>
                                        </div>
                                        {selected && (
                                            <span className="text-[10px] font-black uppercase text-brand-green bg-white px-2 py-1 rounded-full shadow-sm">
                                                {getAmenityPrice(amenity) > 0 ? `+₦${getAmenityPrice(amenity).toLocaleString()}` : 'Included'}
                                            </span>
                                        )}
                                    </div>
                                    {selected && (
                                        <div className="mt-4 pt-4 border-t border-brand-green/10">
                                            <label className="block text-[10px] font-black uppercase tracking-tighter text-gray-400 mb-1.5">Optional Upfront Charge (₦)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 inset-y-0 flex items-center text-sm font-bold text-gray-400">₦</span>
                                                <input
                                                    type="text"
                                                    value={getAmenityPrice(amenity) ? getAmenityPrice(amenity).toLocaleString() : ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                                        updateAmenityPrice(amenity, Number(val));
                                                    }}
                                                    className="w-full h-10 pl-8 pr-3 rounded-xl border border-brand-green/20 bg-white text-sm font-bold text-brand-green focus:ring-1 focus:ring-brand-green outline-none"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Custom Itemized Charges */}
                <div className="pt-8 border-t border-gray-100">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Custom Itemized Charges</h4>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className={labelClasses}>Charge Name (Optional)</label>
                                <input
                                    type="text"
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    className={inputClasses}
                                    placeholder="e.g. Caution Deposit"
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Amount (₦) (Optional)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₦</span>
                                    <input
                                        type="text"
                                        value={customPrice ? customPrice.toLocaleString() : ''}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                            setCustomPrice(Number(val));
                                        }}
                                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-brand-green outline-none font-bold"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={addCustomCharge}
                            className="w-full py-3 bg-white border-2 border-dashed border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:border-brand-green hover:text-brand-green transition-all"
                        >
                            + Add Custom Charge
                        </button>

                        {/* Display Added Custom Charges */}
                        <div className="mt-6 space-y-2 mb-10">
                            {amenities.filter((a: any) => !STANDARD_FEES.includes(a.name) && !AMENITIES_LIST.includes(a.name)).map((custom: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 animate-in slide-in-from-right-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                                        <span className="text-sm font-bold text-gray-700">{custom.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-black text-brand-green">₦{custom.price?.toLocaleString()}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeAmenity(custom.name)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <HiOutlineCheckCircle className="rotate-45" size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* IN-PAGE NAVIGATION BUTTONS */}
                        {navigation && (
                            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={navigation.onBack}
                                    disabled={navigation.isFirstStep}
                                    className={`px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 ${
                                        navigation.isFirstStep 
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
                                        navigation.isLastStep ? navigation.submitLabel : 'Continue to Media'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
