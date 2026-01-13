'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { formatNumber } from '@/utils/helpers';
import {
    HiOutlineBanknotes,
    HiOutlineCalculator,
    HiOutlineShieldCheck,
    HiOutlineReceiptPercent
} from 'react-icons/hi2';

interface FinancialsStepProps {
    role?: 'landlord' | 'agent' | 'caretaker';
}

export default function FinancialsStep({ role }: FinancialsStepProps = {}) {
    const { register, setValue, watch, formState: { errors } } = useFormContext<PropertySchema>();

    // Watch values for live calculations
    const price = useWatch({ name: 'price' });
    const installments = useWatch({ name: 'installments' });
    const listingType = useWatch({ name: 'listingType' });
    const amenities = useWatch({ name: 'amenities' }) || [];

    // Calculate dynamic values for the summary
    const propertyPrice = price?.amount || 0;
    const amenitiesTotal = amenities.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);

    // Deposit calculation
    const depositPercent = installments?.depositPercent || 0;
    const upfrontDeposit = propertyPrice * (depositPercent / 100);

    const totalInitialOutlay = propertyPrice + (price?.serviceCharge || 0) + amenitiesTotal;

    const handleTenureToggle = (month: number) => {
        const currentTenures = installments?.tenures || [];
        const newTenures = currentTenures.includes(month)
            ? currentTenures.filter((m: number) => m !== month)
            : [...currentTenures, month];
        setValue('installments.tenures', newTenures);
    };

    const sectionClasses = "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8";
    const labelClasses = "block text-xs font-black uppercase tracking-widest text-gray-400 mb-2";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 pb-12">
            <div className="lg:col-span-2 space-y-2">
                {/* Base Property Pricing */}
                <section className={sectionClasses}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                            <HiOutlineBanknotes size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Base Property Pricing</h3>
                            <p className="text-sm text-gray-500">Set the fundamental cost for this listing.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group">
                            <label className={labelClasses}>
                                {listingType === 'Sale' ? 'Purchase Price (₦)' : listingType === 'Service-Apartment' ? 'Daily Rate (₦)' : 'Rent Amount (₦)'}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -tranbrand-green-y-1/2 text-2xl font-bold text-gray-900">₦</span>
                                <input
                                    type="text"
                                    placeholder="0.00"
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/,/g, '');
                                        if (!isNaN(Number(val))) {
                                            setValue('price.amount', Number(val));
                                        }
                                    }}
                                    value={price?.amount ? formatNumber(price.amount) : ''}
                                    className={`w-full h-16 pl-12 pr-4 rounded-2xl border-2 ${errors.price?.amount ? 'border-red-500' : 'border-gray-100 group-hover:border-brand-green/30'} bg-gray-50 text-gray-900 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all font-black text-2xl`}
                                />
                            </div>
                            {errors.price?.amount && <p className="text-xs text-red-500 mt-2 font-medium">{errors.price.amount.message}</p>}
                        </div>

                        <div>
                            <label className={labelClasses}>Billing Cycle</label>
                            <select
                                {...register('price.period')}
                                className="w-full h-16 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:border-brand-green focus:bg-white outline-none font-bold text-lg transition-all"
                            >
                                <option value="month">Per Month</option>
                                <option value="year">Per Annum</option>
                                {listingType === 'Service-Apartment' && <option value="day">Daily</option>}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Additional Information Banner */}
                <section className={`${sectionClasses} border-l-4 border-l-brand-green`}>
                    <div className="flex gap-6">
                        <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                            <HiOutlineShieldCheck size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Pricing & Fees Notice</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                All additional charges (Service Charges, Legal Fees, Tenancy Agreement, etc.) are managed in the <strong>Specifications & Amenities</strong> step.
                                These itemized charges will be added to the total initial outlay below.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Installment Configuration */}
                {(listingType === 'Rent' || listingType === 'Rent-to-Own') && (
                    <section className={sectionClasses}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-2xl bg-green-50 flex items-center justify-center text-brand-green">
                                    <HiOutlineCalculator size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Installment Strategy</h3>
                                    <p className="text-sm text-gray-500">Flexible payment options for tenants.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer scale-110">
                                <input
                                    type="checkbox"
                                    {...register('installments.enabled')}
                                    className="sr-only peer"
                                />
                                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:tranbrand-green-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green shadow-inner"></div>
                            </label>
                        </div>

                        {installments?.enabled && (
                            <div className="space-y-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 rounded-2xl border-2 border-brand-green/10 bg-brand-green/5">
                                        <label className="block text-[10px] font-black uppercase text-gray-500 mb-3 tracking-widest">
                                            Minimum Deposit (%)
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                {...register('installments.depositPercent', { valueAsNumber: true })}
                                                className="w-32 h-14 px-4 rounded-xl border-2 border-white bg-white text-2xl font-black text-brand-green focus:border-brand-green outline-none shadow-sm"
                                            />
                                            <span className="text-xl font-bold text-brand-green">%</span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-3 font-medium italic">Requirement: {upfrontDeposit ? `₦${formatNumber(upfrontDeposit)}` : '₦0.00'} min. deposit</p>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Available Tenures</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[6, 12, 18, 24].map(months => (
                                                <button
                                                    key={months}
                                                    type="button"
                                                    onClick={() => handleTenureToggle(months)}
                                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${installments.tenures?.includes(months) ? 'border-brand-green bg-green-50 text-brand-green' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}
                                                >
                                                    <span className="text-sm font-black">{months}</span>
                                                    <span className="text-[9px] uppercase font-bold tracking-tighter">Months</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>

            {/* Right Column: Dynamic Outlay Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-24 overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-2 bg-brand-green"></div>

                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
                        <HiOutlineCalculator className="text-brand-green" />
                        Initial Outlay Summary
                    </h3>

                    <div className="space-y-4 mb-10">
                        <div className="flex justify-between items-center group">
                            <span className="text-sm font-bold text-gray-500">Base {listingType === 'Sale' ? 'Price' : 'Rent'}</span>
                            <span className="font-black text-gray-900">₦{formatNumber(propertyPrice)}</span>
                        </div>

                        {amenities.length > 0 && (
                            <div className="space-y-3 pt-4 border-t border-gray-100 border-dashed">
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Itemized Charges</p>
                                {amenities.map((amn: any, idx: number) => (
                                    amn.price > 0 && (
                                        <div key={idx} className="flex justify-between text-xs font-bold text-blue-600">
                                            <span>{amn.name}</span>
                                            <span>₦{formatNumber(amn.price)}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}

                        <div className="pt-8 border-t-2 border-gray-100 relative">
                            <div className="absolute -top-3 left-1/2 -tranbrand-green-x-1/2 bg-white px-3">
                                <div className="size-6 rounded-full bg-brand-green/10 flex items-center justify-center">
                                    <div className="size-2 rounded-full bg-brand-green"></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-green text-center">Total Upfront Payment</p>
                                <p className="text-3xl font-black text-gray-900 text-center tracking-tight">₦{formatNumber(totalInitialOutlay)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex gap-3">
                            <div className="size-8 rounded-full bg-white flex items-center justify-center text-brand-green shadow-sm shrink-0 mt-1">
                                <HiOutlineBanknotes size={14} />
                            </div>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                This total represents the amount the tenant/buyer must pay to finalize the agreement.
                                Itemized extras are included in this calculation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
