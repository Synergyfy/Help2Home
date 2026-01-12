'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { formatNumber } from '@/utils/helpers';

export default function FinancialsStep() {
    const { register, setValue, formState: { errors } } = useFormContext<PropertySchema>();

    // Watch values for live calculations
    const price = useWatch({ name: 'price' });
    const installments = useWatch({ name: 'installments' });
    const listingType = useWatch({ name: 'listingType' });

    // Calculate dynamic values for the example box
    const propertyPrice = price?.amount || 0;
    const depositPercent = installments?.depositPercent || 0;
    const upfrontDeposit = propertyPrice * (depositPercent / 100);
    const selectedTenure = installments?.tenures?.[0] || 12; // Just picking first for demo
    const monthlyPayment = propertyPrice > 0 ? (propertyPrice - upfrontDeposit) / selectedTenure : 0;

    const handleTenureToggle = (month: number) => {
        const currentTenures = installments?.tenures || [];
        const newTenures = currentTenures.includes(month)
            ? currentTenures.filter((m: number) => m !== month)
            : [...currentTenures, month];
        setValue('installments.tenures', newTenures);
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing & Currency</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {listingType === 'Sale' ? 'Purchase Price' : listingType === 'Service-Apt' ? 'Daily Rate' : 'Rent Amount'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">
                                ₦
                            </span>
                            <input
                                type="text"
                                placeholder="0"
                                onChange={(e) => {
                                    const val = e.target.value.replace(/,/g, '');
                                    if (!isNaN(Number(val))) {
                                        setValue('price.amount', Number(val));
                                    }
                                }}
                                value={price?.amount ? formatNumber(price.amount) : ''}
                                className={`w-full pl-8 px-4 py-2 border rounded-lg focus:ring-brand-green focus:border-brand-green ${errors.price?.amount ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        {errors.price?.amount && <p className="text-xs text-red-500 mt-1">{errors.price.amount.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Currency
                        </label>
                        <select
                            {...register('price.currency')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green bg-white"
                        >
                            <option value="NGN">Nigerian Naira (NGN)</option>
                        </select>
                    </div>

                    {listingType === 'Rent' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Payment Period
                                </label>
                                <select
                                    {...register('price.period')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green bg-white"
                                >
                                    <option value="year">Per Year</option>
                                    <option value="month">Per Month</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Charge (Annual)
                                </label>
                                <input
                                    type="number"
                                    {...register('price.serviceCharge', { valueAsNumber: true })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green"
                                    placeholder="0"
                                />
                            </div>
                        </>
                    )}

                    {listingType === 'Service-Apt' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Security Deposit
                                </label>
                                <input
                                    type="number"
                                    {...register('shortLetDetails.securityDeposit', { valueAsNumber: true })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cleaning Fee
                                </label>
                                <input
                                    type="number"
                                    {...register('shortLetDetails.cleaningFee', { valueAsNumber: true })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green"
                                    placeholder="0"
                                />
                            </div>
                        </>
                    )}
                </div>

                {listingType === 'Sale' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" {...register('isMortgageAvailable')} id="mortgage" className="rounded text-brand-green focus:ring-brand-green" />
                            <label htmlFor="mortgage" className="text-sm font-medium text-gray-700">Mortgage Available</label>
                        </div>
                    </div>
                )}
            </div>

            {listingType === 'Service-Apt' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Check-in / Out</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time</label>
                            <input type="time" {...register('shortLetDetails.checkInTime')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
                            <input type="time" {...register('shortLetDetails.checkOutTime')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green" />
                        </div>
                    </div>
                </div>
            )}

            {/* Installment Configuration */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Installment Payment</h2>
                        <p className="text-sm text-gray-500">Allow tenants to pay in monthly installments.</p>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimum Deposit (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                {...register('installments.depositPercent', { valueAsNumber: true })}
                                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green"
                            />
                            <p className="text-xs text-gray-500 mt-1">Percentage of total rent required upfront.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Available Tenures (Months)
                            </label>
                            <div className="flex gap-4">
                                {[6, 12, 18, 24].map(months => (
                                    <label key={months} className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={installments.tenures?.includes(months) || false}
                                            onChange={() => handleTenureToggle(months)}
                                            className="text-brand-green focus:ring-brand-green"
                                        />
                                        <span>{months} Months</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Updated Dynamic Example Calculation */}
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                            <strong>Live Breakdown:</strong> Based on {price?.currency || 'NGN'} {formatNumber(propertyPrice)}
                            <ul className="list-disc list-inside mt-1 ml-2">
                                <li>Upfront Deposit ({depositPercent}%): ₦{formatNumber(upfrontDeposit)}</li>
                                <li>Monthly Payment ({selectedTenure} months): ₦{formatNumber(Math.round(monthlyPayment))}</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}