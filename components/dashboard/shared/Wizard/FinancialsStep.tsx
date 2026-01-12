'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { formatNumber } from '@/utils/helpers';

interface FinancialsStepProps {
    role?: 'landlord' | 'agent' | 'caretaker';
}

export default function FinancialsStep({ role }: FinancialsStepProps = {}) {
    const { register, setValue, formState: { errors } } = useFormContext<PropertySchema>();

    // Watch values for live calculations
    const price = useWatch({ name: 'price' });
    const installments = useWatch({ name: 'installments' });
    const listingType = useWatch({ name: 'listingType' });

    // Calculate dynamic values for the summary
    const propertyPrice = price?.amount || 0;
    const depositPercent = installments?.depositPercent || 0;
    const upfrontDeposit = propertyPrice * (depositPercent / 100);
    const selectedTenure = installments?.tenures?.[0] || 12;
    const monthlyPayment = propertyPrice > 0 ? (propertyPrice - upfrontDeposit) / selectedTenure : 0;

    // Mock additional charges (these could be form fields too)
    const cautionDeposit = 150000;
    const legalFee = propertyPrice * 0.1;
    const agencyFee = propertyPrice * 0.1;
    const serviceCharge = 50000;
    const totalInitialOutlay = propertyPrice + cautionDeposit + legalFee + agencyFee + serviceCharge;

    const handleTenureToggle = (month: number) => {
        const currentTenures = installments?.tenures || [];
        const newTenures = currentTenures.includes(month)
            ? currentTenures.filter((m: number) => m !== month)
            : [...currentTenures, month];
        setValue('installments.tenures', newTenures);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
            <div className="lg:col-span-2 space-y-6">
                {/* Base Rental Price */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-brand-green/10 text-brand-green">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Base Rental Price</h3>
                            <p className="text-xs text-gray-500">The core monthly or annual cost</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                {listingType === 'Sale' ? 'Purchase Price (₦)' : listingType === 'Service-Apt' ? 'Daily Rate (₦)' : 'Rent Amount (₦)'}
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-900">₦</span>
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
                                    className={`w-full h-14 pl-10 pr-4 rounded-xl border-2 ${errors.price?.amount ? 'border-red-500' : 'border-gray-100'} bg-gray-50 text-gray-900 focus:border-brand-green focus:ring-0 outline-none transition-all font-bold text-xl`}
                                />
                            </div>
                            {errors.price?.amount && <p className="text-xs text-red-500 mt-1">{errors.price.amount.message}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Billing Cycle</label>
                            <select
                                {...register('price.period')}
                                className="w-full h-14 px-4 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-900 focus:border-brand-green outline-none font-medium"
                            >
                                <option value="month">Per Month</option>
                                <option value="year">Per Annum</option>
                                {listingType === 'Service-Apt' && <option value="day">Daily (Service Apt)</option>}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Additional Upfront Charges */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-10 rounded-xl bg-brand-green/10 text-brand-green">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Additional Upfront Charges</h3>
                                <p className="text-xs text-gray-500">Mandatory one-time payments for new tenants</p>
                            </div>
                        </div>
                        <span className="px-2 py-1 rounded text-[10px] font-black bg-blue-50 text-blue-600 uppercase tracking-tighter">One-time Only</span>
                    </div>

                    {listingType === 'Rent' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                    <label className="block text-xs font-bold text-gray-900 mb-2">Service Charge (Annual)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">₦</span>
                                        <input
                                            type="number"
                                            {...register('price.serviceCharge', { valueAsNumber: true })}
                                            className="w-full h-10 pl-8 pr-3 rounded-lg border border-gray-200 bg-white text-sm focus:ring-brand-green focus:border-brand-green"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 p-4 bg-brand-green/5 rounded-xl border border-brand-green/20">
                                <div className="flex gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        <strong>Note:</strong> These additional charges are calculated as one-time upfront payments required for the initial lease. Subsequent renewals will only involve the base rent and periodic service charges.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {listingType === 'Service-Apt' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                <label className="block text-xs font-bold text-gray-900 mb-2">Security Deposit</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">₦</span>
                                    <input
                                        type="number"
                                        {...register('shortLetDetails.securityDeposit', { valueAsNumber: true })}
                                        className="w-full h-10 pl-8 pr-3 rounded-lg border border-gray-200 bg-white text-sm focus:ring-brand-green focus:border-brand-green"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                <label className="block text-xs font-bold text-gray-900 mb-2">Cleaning Fee</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">₦</span>
                                    <input
                                        type="number"
                                        {...register('shortLetDetails.cleaningFee', { valueAsNumber: true })}
                                        className="w-full h-10 pl-8 pr-3 rounded-lg border border-gray-200 bg-white text-sm focus:ring-brand-green focus:border-brand-green"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {listingType === 'Sale' && (
                        <div className="flex items-center gap-2">
                            <input type="checkbox" {...register('isMortgageAvailable')} id="mortgage" className="rounded text-brand-green focus:ring-brand-green" />
                            <label htmlFor="mortgage" className="text-sm font-medium text-gray-700">Mortgage Available</label>
                        </div>
                    )}
                </section>

                {/* Installment Configuration */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Installment Payment</h3>
                            <p className="text-xs text-gray-500">Allow tenants to pay in monthly installments.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('installments.enabled')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                        </label>
                    </div>

                    {installments?.enabled && (
                        <div className="space-y-4 pt-4 border-t border-gray-100 animate-fadeIn">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2">
                                    Minimum Deposit (%)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    {...register('installments.depositPercent', { valueAsNumber: true })}
                                    className="w-full md:w-1/3 h-12 px-4 rounded-lg border-2 border-gray-100 bg-gray-50 focus:ring-brand-green focus:border-brand-green"
                                />
                                <p className="text-xs text-gray-500 mt-1">Percentage of total rent required upfront.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-2">
                                    Available Tenures (Months)
                                </label>
                                <div className="flex gap-4">
                                    {[6, 12, 18, 24].map(months => (
                                        <label key={months} className="flex items-center gap-2 cursor-pointer border-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={installments.tenures?.includes(months) || false}
                                                onChange={() => handleTenureToggle(months)}
                                                className="text-brand-green focus:ring-brand-green rounded"
                                            />
                                            <span className="text-sm font-medium">{months} Months</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Initial Outlay Summary</h3>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Base Rent</span>
                            <span className="font-bold text-gray-900">₦{formatNumber(propertyPrice)}</span>
                        </div>
                        {listingType === 'Rent' && (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Service Charge</span>
                                    <span className="font-bold text-gray-900">₦{formatNumber(price?.serviceCharge || 0)}</span>
                                </div>
                            </>
                        )}
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-wider text-brand-green">Total Amount</p>
                                    <p className="text-2xl font-black text-gray-900">₦{formatNumber(propertyPrice + (price?.serviceCharge || 0))}</p>
                                </div>
                                <div className="text-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}