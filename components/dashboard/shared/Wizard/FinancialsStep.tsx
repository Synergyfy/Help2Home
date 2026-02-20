'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { formatNumber } from '@/utils/helpers';
import {
    HiOutlineBanknotes,
    HiOutlineCalculator,
    HiOutlineShieldCheck,
    HiOutlineReceiptPercent,
    HiOutlineClock,
    HiOutlineInformationCircle,
    HiOutlineExclamationTriangle
} from 'react-icons/hi2';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

interface FinancialsStepProps {
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

export default function FinancialsStep({ role, navigation }: FinancialsStepProps = {}) {
    const { register, setValue, watch, formState: { errors } } = useFormContext<PropertySchema>();

    // Watch values for live calculations
    const price = useWatch({ name: 'price' });
    const installments = useWatch({ name: 'installments' });
    const listingType = useWatch({ name: 'listingType' });
    const availabilityDuration = useWatch({ name: 'availabilityDuration' });
    const amenities = useWatch({ name: 'amenities' }) || [];

    // Local state for UI interactions
    const [showInstallmentModal, setShowInstallmentModal] = useState(false);
    const [policyAgreed, setPolicyAgreed] = useState(false);
    const [tempPolicyAgreed, setTempPolicyAgreed] = useState(false);
    const [periodWarning, setPeriodWarning] = useState(false);
    const [depositError, setDepositError] = useState<string | null>(null);

    // Constants
    const ADMIN_MONTHLY_INTEREST = 2; // 2% per month

    // Calculate dynamic values for the summary
    const propertyPrice = price?.amount || 0;
    const serviceCharge = price?.serviceCharge || 0;
    const amenitiesTotal = amenities.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);

    const totalPropertyCost = propertyPrice + serviceCharge + amenitiesTotal;

    // Deposit calculation
    const depositType = installments?.depositType || 'percentage';
    const depositValue = installments?.depositValue || 0;

    const upfrontDeposit = depositType === 'percentage'
        ? (propertyPrice * (depositValue / 100))
        : depositValue;

    const remainingBalance = totalPropertyCost - upfrontDeposit;

    // Updated calculations with Interest
    const interestRate = ADMIN_MONTHLY_INTEREST; // Fixed by Admin
    const selectedTenure = (installments?.tenures && installments.tenures[0]) || 1;

    // Calculate Monthly Repayment with Interest
    // Formula: (Principal + (Principal * Rate * Months)) / Months
    // OR: (Principal / Months) + (Principal * Rate)
    const principal = remainingBalance;
    const totalInterest = principal * (interestRate / 100) * selectedTenure;
    const totalRepayable = principal + totalInterest;
    const monthlyRepayment = selectedTenure > 0 ? totalRepayable / selectedTenure : 0;

    // Effects
    useEffect(() => {
        // Enforce Interest Rate safely
        if (installments?.enabled && installments?.interestRate !== ADMIN_MONTHLY_INTEREST) {
            setValue('installments.interestRate', ADMIN_MONTHLY_INTEREST);
        }
    }, [installments?.enabled, installments?.interestRate, setValue]);

    const handleTenureChange = (val: number) => {
        setValue('installments.tenures', [val]);
    };

    const handleDepositValueChange = (val: string) => {
        const numVal = Number(val.replace(/,/g, ''));
        if (isNaN(numVal)) return;

        // Validation 90%
        if (depositType === 'percentage') {
            if (numVal > 90) {
                setValue('installments.depositValue', 90);
                setDepositError("Maximum down payment is 90%");
                setTimeout(() => setDepositError(null), 3000);
                return; // Cap at 90
            }
        } else {
            const maxFixed = propertyPrice * 0.9;
            if (numVal > maxFixed) {
                setValue('installments.depositValue', maxFixed);
                setDepositError(`Maximum down payment is ₦${formatNumber(maxFixed)} (90%)`);
                setTimeout(() => setDepositError(null), 3000);
                return;
            }
        }
        setDepositError(null);
        setValue('installments.depositValue', numVal);
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriodWarning(true);
        setTimeout(() => setPeriodWarning(false), 5000); // clear after 5s
        register('price.period').onChange(e);
    };

    const switchDepositType = (newType: 'fixed' | 'percentage') => {
        if (newType === depositType) return;

        // Auto-convert
        let newValue = 0;
        if (newType === 'fixed') {
            // % to Fixed
            newValue = propertyPrice * (depositValue / 100);
        } else {
            // Fixed to %
            newValue = propertyPrice > 0 ? (depositValue / propertyPrice) * 100 : 0;
        }

        setValue('installments.depositType', newType);
        setValue('installments.depositValue', Number(newValue.toFixed(2)));
    };

    const toggleInstallments = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            if (!policyAgreed) {
                setShowInstallmentModal(true);
            } else {
                setValue('installments.enabled', true);
                if (!installments?.tenures?.length) setValue('installments.tenures', [1]);
                setValue('installments.interestRate', ADMIN_MONTHLY_INTEREST);
            }
        } else {
            setValue('installments.enabled', false);
        }
    };

    const confirmPolicy = () => {
        setPolicyAgreed(true);
        setValue('installments.enabled', true);
        if (!installments?.tenures?.length) setValue('installments.tenures', [1]);
        setValue('installments.interestRate', ADMIN_MONTHLY_INTEREST);
        setShowInstallmentModal(false);
    };

    // Calculate Slider Range
    // 6-month prop -> 1-4 months
    // 1-year (12) -> 1-10 months
    // 2-year (24) -> 1-20 months
    const maxSliderValue = availabilityDuration === 6 ? 4 : availabilityDuration === 24 ? 20 : 10;

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
                                {listingType === 'Sale' ? 'Purchase Price (₦) *' : listingType === 'Service-Apartment' ? 'Daily Rate (₦) *' : 'Rent Amount (₦) *'}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-900">₦</span>
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
                                    className={`w-full h-16 pl-12 pr-4 rounded-2xl border-2 ${errors.price?.amount ? 'border-red-500 ring-red-500' : 'border-gray-100 group-hover:border-brand-green/30'} bg-gray-50 text-gray-900 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all font-black text-2xl`}
                                />
                            </div>
                            {errors.price?.amount && <p className="text-xs text-red-500 mt-2 font-medium">{errors.price.amount.message}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className={labelClasses + " mb-0"}>Billing Cycle *</label>
                                {periodWarning && (
                                    <span className="text-[10px] font-bold text-orange-600 animate-pulse flex items-center gap-1">
                                        <HiOutlineExclamationTriangle /> Update Amount!
                                    </span>
                                )}
                            </div>
                            <select
                                {...register('price.period')}
                                onChange={handlePeriodChange}
                                className={`w-full h-16 px-6 rounded-2xl border-2 ${errors.price?.period ? 'border-red-500 ring-red-500' : periodWarning ? 'border-orange-300 ring-1 ring-orange-200' : 'border-gray-100'} bg-gray-50 text-gray-900 focus:border-brand-green focus:bg-white outline-none font-bold text-lg transition-all`}
                            >
                                <option value="">Select Period</option>
                                <option value="year">Per Annum</option>
                                <option value="month">Per Month</option>
                                {listingType === 'Service-Apartment' && <option value="day">Daily</option>}
                            </select>
                            {errors.price?.period && <p className="text-xs text-red-500 mt-2 font-medium">{errors.price.period.message}</p>}
                        </div>
                    </div>
                </section>

                {/* Property Availability - NEW */}
                {listingType === 'Rent' && (
                    <section className={sectionClasses}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <HiOutlineClock size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Property Availability (Optional)</h3>
                                <p className="text-sm text-gray-500">How long is this property available for?</p>
                            </div>
                        </div>

                        <div className={`grid grid-cols-3 gap-4 ${errors.availabilityDuration ? 'border-red-500 ring-1 ring-red-500 rounded-lg p-2' : ''}`}>
                            {[6, 12, 24].map((months) => (
                                <label key={months} className="relative cursor-pointer group">
                                    <input
                                        type="radio"
                                        value={months}
                                        {...register('availabilityDuration')}
                                        className="peer sr-only"
                                    />
                                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-gray-100 bg-white transition-all peer-checked:border-brand-green peer-checked:bg-green-50/50 hover:border-gray-300">
                                        <span className="text-lg font-black text-gray-900 peer-checked:text-brand-green">
                                            {months === 12 ? '1 Year' : months === 24 ? '2 Years' : '6 Months'}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.availabilityDuration && <p className="text-[10px] text-red-500 mt-2 font-medium">{errors.availabilityDuration.message}</p>}
                    </section>
                )}

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
                                    <h3 className="text-xl font-bold text-gray-900">Installment Strategy (Optional)</h3>
                                    <p className="text-sm text-gray-500">Flexible payment options for tenants.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer scale-110">
                                <input
                                    type="checkbox"
                                    checked={installments?.enabled || false}
                                    onChange={toggleInstallments}
                                    className="sr-only peer"
                                />
                                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green shadow-inner"></div>
                            </label>
                        </div>

                        {installments?.enabled && (
                            <div className="space-y-8 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 rounded-3xl border-2 border-brand-green/10 bg-brand-green/5">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-1">
                                                Downpayment / Deposit (Optional)
                                                <HiOutlineInformationCircle
                                                    data-tooltip-id="deposit-tooltip"
                                                    data-tooltip-content="Initial amount paid upfront. Reduces monthly repayments."
                                                    className="text-gray-400 cursor-help"
                                                />
                                            </label>
                                            <div className="flex bg-white rounded-lg p-1 border border-gray-100 shadow-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => switchDepositType('percentage')}
                                                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${depositType === 'percentage' ? 'bg-brand-green text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                                >
                                                    Percent
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => switchDepositType('fixed')}
                                                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${depositType === 'fixed' ? 'bg-brand-green text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                                >
                                                    Fixed
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {depositType === 'fixed' && <span className="text-xl font-bold text-brand-green">₦</span>}
                                            <input
                                                type="text"
                                                value={depositValue ? formatNumber(depositValue) : ''}
                                                onChange={(e) => handleDepositValueChange(e.target.value)}
                                                className={`w-full h-14 px-4 rounded-xl border-2 ${errors.installments?.depositValue ? 'border-red-500 ring-red-500' : 'border-white'} bg-white text-2xl font-black text-brand-green focus:border-brand-green outline-none shadow-sm`}
                                                placeholder="0"
                                            />
                                            {depositType === 'percentage' && <span className="text-xl font-bold text-brand-green">%</span>}
                                        </div>
                                        {errors.installments?.depositValue && <p className="text-xs text-red-500 mt-2 font-medium">{errors.installments.depositValue.message}</p>}
                                        {depositError && <p className="text-xs text-red-500 mt-2 font-bold animate-pulse">{depositError}</p>}
                                        {/* Validation Hints */}
                                        <p className="text-[10px] text-gray-400 mt-2 text-right">Max: {depositType === 'percentage' ? '90%' : `₦${formatNumber(propertyPrice * 0.9)}`}</p>

                                        {/* Real-time conversion container */}
                                        <div className="mt-4 p-3 bg-white/50 rounded-xl border border-dashed border-brand-green/20">
                                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                                                <span>Conversion</span>
                                                <HiOutlineCalculator className="text-brand-green" />
                                            </div>
                                            {depositType === 'percentage' ? (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500 font-medium">Fixed Amount</span>
                                                    <span className="text-sm font-black text-brand-green">₦{formatNumber(upfrontDeposit)}</span>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500 font-medium">Percentage of Rent</span>
                                                    <span className="text-sm font-black text-brand-green">{propertyPrice > 0 ? ((depositValue / propertyPrice) * 100).toFixed(1) : 0}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <label className={labelClasses + " mb-0 flex items-center gap-1"}>
                                                Repayment Duration
                                                <HiOutlineInformationCircle
                                                    data-tooltip-id="duration-tooltip"
                                                    data-tooltip-content="Time to repay the remaining balance in monthly installments."
                                                    className="text-gray-400 cursor-help"
                                                />
                                            </label>
                                        </div>

                                        {/* SLIDER COMPONENT */}
                                        <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-2">
                                            <div className="flex justify-between items-end mb-6">
                                                <span className="text-xs font-bold text-gray-400">Duration</span>
                                                <div className="text-right">
                                                    <span className="text-3xl font-black text-brand-green">{selectedTenure}</span>
                                                    <span className="text-xs font-bold text-gray-500 ml-1">Months</span>
                                                </div>
                                            </div>
                                            <input
                                                type="range"
                                                min="1"
                                                max={maxSliderValue}
                                                step="1"
                                                value={selectedTenure}
                                                onChange={(e) => handleTenureChange(Number(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                            />
                                            <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-300 uppercase">
                                                <span>1 Month</span>
                                                <span>{maxSliderValue} Months</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                                            {/* Remaining Balance Breakdown */}
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-500">Remaining Principal</span>
                                                    <span className="text-[10px] text-gray-400">Before interest</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">₦{formatNumber(principal)}</span>
                                            </div>

                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                                                        Total Interest
                                                        <HiOutlineInformationCircle
                                                            data-tooltip-id="interest-tooltip"
                                                            data-tooltip-content={`Calculated at ${ADMIN_MONTHLY_INTEREST}% per month for ${selectedTenure} months`}
                                                            className="text-gray-300"
                                                        />
                                                    </span>
                                                    <span className="text-[10px] text-gray-400">{ADMIN_MONTHLY_INTEREST}% x {selectedTenure} mos</span>
                                                </div>
                                                <span className="text-sm font-bold text-orange-600">+ ₦{formatNumber(totalInterest)}</span>
                                            </div>

                                            <div className="pt-3 border-t border-gray-200 dashed flex justify-between items-center">
                                                <span className="text-xs font-black uppercase text-gray-400 tracking-wider">Net Balance</span>
                                                <span className="text-base font-black text-gray-900">₦{formatNumber(totalRepayable)}</span>
                                            </div>

                                            <div className="pt-3 border-t-2 border-brand-green/10 flex justify-between items-center bg-brand-green/5 -mx-4 -mb-4 p-4 rounded-b-2xl">
                                                <div>
                                                    <span className="block text-[10px] font-bold text-brand-green uppercase tracking-wide">Monthly Payment</span>
                                                    <span className="text-[10px] text-brand-green/60 font-medium">Principal + Interest</span>
                                                </div>
                                                <span className="text-xl font-black text-brand-green">₦{formatNumber(monthlyRepayment)}<span className="text-xs text-brand-green/60 font-medium">/mo</span></span>
                                            </div>
                                        </div>

                                        <p className="mt-6 text-[10px] text-orange-600 font-bold bg-orange-50 p-4 rounded-2xl border border-orange-100 leading-relaxed shadow-sm">
                                            <span className="flex items-center gap-1.5 mb-2 text-orange-700">
                                                <HiOutlineShieldCheck className="size-3.5" />
                                                Lister-Handled Installments
                                            </span>
                                            By enabling this, you (the lister) agree to receive payments directly from the tenant over time. External financing partners will be hidden for this property. Interest set above will be added to the total repayable amount.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* INSTALLMENT POLICY MODAL */}
                {showInstallmentModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                            <div className="size-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-6 mx-auto">
                                <HiOutlineShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Installment Policy Agreement</h3>
                            <p className="text-sm text-center text-gray-500 mb-6 leading-relaxed">
                                By enabling installments, you agree to receive payments directly from tenants over time.
                                Financing partners involve strict adherence to our policies.
                            </p>

                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-6">
                                <p className="text-xs font-bold text-yellow-800 flex items-start gap-2">
                                    <HiOutlineExclamationTriangle className="shrink-0 mt-0.5" />
                                    Interest will be added to the total payable amount automatically based on the monthly rate.
                                </p>
                            </div>

                            <label className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors mb-6">
                                <input
                                    type="checkbox"
                                    checked={tempPolicyAgreed}
                                    onChange={(e) => setTempPolicyAgreed(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                                />
                                <span className="text-xs text-gray-600 leading-relaxed">
                                    I understand the policies. Read full <Link href="#" className="text-brand-green underline font-bold">Installment Policy for Landlord</Link>
                                </span>
                            </label>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setShowInstallmentModal(false)}
                                    className="py-3.5 rounded-xl font-bold text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmPolicy}
                                    disabled={!tempPolicyAgreed}
                                    className="py-3.5 rounded-xl font-bold text-sm text-white bg-brand-green hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-green/20"
                                >
                                    Enable Installments
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <Tooltip id="deposit-tooltip" className="z-50 !bg-gray-900 !text-white !text-xs !rounded-lg !px-3 !py-2 !opacity-100" />
                <Tooltip id="duration-tooltip" className="z-50 !bg-gray-900 !text-white !text-xs !rounded-lg !px-3 !py-2 !opacity-100" />
                <Tooltip id="interest-tooltip" className="z-50 !bg-gray-900 !text-white !text-xs !rounded-lg !px-3 !py-2 !opacity-100" />

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
                                navigation.isLastStep ? navigation.submitLabel : 'Continue to Details'
                            )}
                        </button>
                    </div>
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

                        {(serviceCharge > 0 || amenitiesTotal > 0) && (
                            <div className="space-y-3 pt-4 border-t border-gray-100 border-dashed">
                                <p className="text-[10px] font-black  text-gray-400 tracking-widest uppercase">Itemized Costs & Charges</p>
                                {serviceCharge > 0 && (
                                    <div className="flex justify-between text-xs font-bold text-gray-600">
                                        <span>Service Charge</span>
                                        <span>₦{formatNumber(serviceCharge)}</span>
                                    </div>
                                )}
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

                        <div className="pt-4 border-t border-gray-100 border-dashed">
                            <div className="flex justify-between items-center group mb-2">
                                <span className="text-sm font-bold text-gray-900">Total Project Value</span>
                                <span className="font-black text-gray-900">₦{formatNumber(totalPropertyCost)}</span>
                            </div>
                        </div>

                        {installments?.enabled && (
                            <div className="p-4 bg-brand-green/5 rounded-2xl border border-brand-green/10 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-brand-green uppercase">Initial Downpayment</span>
                                    <span className="text-sm font-black text-brand-green">₦{formatNumber(upfrontDeposit)}</span>
                                </div>

                                {installments.tenures && installments.tenures.length > 0 && (
                                    <div className="pt-2 border-t border-brand-green/10">
                                        <div className="flex items-center gap-1 mb-2">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Sub Payments</span>
                                            <HiOutlineInformationCircle
                                                data-tooltip-id="sub-payment-tooltip"
                                                data-tooltip-content="Estimated periodic payment amount based on selected repayment strategy."
                                                className="text-gray-300 size-3 cursor-help"
                                            />
                                        </div>
                                        <div className="pt-2 border-t border-brand-green/10">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[10px] font-medium text-gray-500">{selectedTenure} Months plan</span>
                                                <span className="text-[10px] font-black text-gray-900">₦{formatNumber(monthlyRepayment)}/mo</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="pt-8 border-t-2 border-gray-100 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3">
                                <div className="size-6 rounded-full bg-brand-green/10 flex items-center justify-center">
                                    <div className="size-2 rounded-full bg-brand-green"></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-green text-center">Required Upfront Payment</p>
                                <p className="text-3xl font-black text-gray-900 text-center tracking-tight">₦{formatNumber(installments?.enabled ? upfrontDeposit : totalPropertyCost)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex gap-3">
                            <div className="size-8 rounded-full bg-white flex items-center justify-center text-brand-green shadow-sm shrink-0 mt-1">
                                <HiOutlineBanknotes size={14} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                    Total Repayable (inc. Interest): <strong>₦{formatNumber(totalRepayable)}</strong>
                                </p>
                                <p className="text-[10px] text-gray-400 font-normal">
                                    Monthly: ₦{formatNumber(monthlyRepayment)}/mo for {selectedTenure} months
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Tooltip id="sub-payment-tooltip" className="z-50 !bg-gray-900 !text-white !text-xs !rounded-lg !px-3 !py-2 !opacity-100" />
        </div>
    );
}

