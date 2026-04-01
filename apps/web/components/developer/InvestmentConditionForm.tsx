'use client';

import React, { useState, useEffect } from 'react';
import { calculateRepaymentSchedule, formatCurrency } from '@/types/developer';
import type { InvestmentCondition } from '@/types/developer';
import {
    HiOutlineCalculator,
    HiOutlineInformationCircle
} from 'react-icons/hi2';

interface InvestmentConditionFormProps {
    propertyId?: string;
    initialData?: Partial<InvestmentCondition>;
    onSave: (data: Partial<InvestmentCondition>) => void;
    onCancel: () => void;
}

export default function InvestmentConditionForm({
    propertyId,
    initialData,
    onSave,
    onCancel
}: InvestmentConditionFormProps) {
    const [formData, setFormData] = useState({
        minAmount: initialData?.minAmount || 1000000,
        maxAmount: initialData?.maxAmount || 50000000,
        expectedROI: initialData?.expectedROI || 15,
        timeline: initialData?.timeline || 12,
        riskLevel: initialData?.riskLevel || 'medium' as 'low' | 'medium' | 'high',
        paymentSchedule: initialData?.paymentSchedule || 'monthly' as 'monthly' | 'quarterly' | 'bi-annual' | 'annual',
        totalInvestmentTarget: initialData?.totalInvestmentTarget || 100000000,
        isActive: initialData?.isActive ?? true
    });

    const [calculatedReturn, setCalculatedReturn] = useState(0);
    const [previewSchedule, setPreviewSchedule] = useState<any>(null);

    // Calculate return whenever relevant values change
    useEffect(() => {
        const avgInvestment = (formData.minAmount + formData.maxAmount) / 2;
        const returnAmount = avgInvestment * (1 + formData.expectedROI / 100);
        setCalculatedReturn(returnAmount);

        // Generate preview schedule
        const schedule = calculateRepaymentSchedule(
            avgInvestment,
            formData.expectedROI,
            formData.timeline,
            formData.paymentSchedule
        );
        setPreviewSchedule(schedule);
    }, [formData.minAmount, formData.maxAmount, formData.expectedROI, formData.timeline, formData.paymentSchedule]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const timelinePresets = [
        { label: '6 Months', months: 6 },
        { label: '1 Year', months: 12 },
        { label: '2 Years', months: 24 },
        { label: '3 Years', months: 36 },
        { label: '5 Years', months: 60 }
    ];

    const roiPresets = [
        { label: 'Conservative', value: 8 },
        { label: 'Moderate', value: 15 },
        { label: 'Aggressive', value: 25 }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Investment Amount Range */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    <HiOutlineCalculator className="text-brand-green" />
                    Investment Range
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Minimum Investment (₦)
                        </label>
                        <input
                            type="number"
                            value={formData.minAmount}
                            onChange={(e) => setFormData(prev => ({ ...prev, minAmount: Number(e.target.value) }))}
                            min={100000}
                            step={100000}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {formatCurrency(formData.minAmount)}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Maximum Investment (₦)
                        </label>
                        <input
                            type="number"
                            value={formData.maxAmount}
                            onChange={(e) => setFormData(prev => ({ ...prev, maxAmount: Number(e.target.value) }))}
                            min={formData.minAmount}
                            step={100000}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {formatCurrency(formData.maxAmount)}
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Total Investment Target (₦)
                    </label>
                    <input
                        type="number"
                        value={formData.totalInvestmentTarget}
                        onChange={(e) => setFormData(prev => ({ ...prev, totalInvestmentTarget: Number(e.target.value) }))}
                        min={formData.maxAmount}
                        step={1000000}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {formatCurrency(formData.totalInvestmentTarget)}
                    </p>
                </div>
            </div>

            {/* ROI & Timeline */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">Returns & Timeline</h3>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Expected ROI (%)
                        </label>
                        <div className="flex gap-2 mb-3">
                            {roiPresets.map((preset) => (
                                <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, expectedROI: preset.value }))}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${formData.expectedROI === preset.value
                                        ? 'bg-brand-green text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {preset.label} ({preset.value}%)
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            value={formData.expectedROI}
                            onChange={(e) => setFormData(prev => ({ ...prev, expectedROI: Number(e.target.value) }))}
                            min={1}
                            max={100}
                            step={0.5}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Investment Timeline
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {timelinePresets.map((preset) => (
                                <button
                                    key={preset.label}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, timeline: preset.months }))}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${formData.timeline === preset.months
                                        ? 'bg-brand-green text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            value={formData.timeline}
                            onChange={(e) => setFormData(prev => ({ ...prev, timeline: Number(e.target.value) }))}
                            min={1}
                            max={120}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {formData.timeline} months ({(formData.timeline / 12).toFixed(1)} years)
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Payment Schedule
                            </label>
                            <select
                                value={formData.paymentSchedule}
                                onChange={(e) => setFormData(prev => ({ ...prev, paymentSchedule: e.target.value as any }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:outline-none transition-colors"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="bi-annual">Bi-Annual</option>
                                <option value="annual">Annual</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Risk Level
                            </label>
                            <select
                                value={formData.riskLevel}
                                onChange={(e) => setFormData(prev => ({ ...prev, riskLevel: e.target.value as any }))}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:outline-none transition-colors"
                            >
                                <option value="low">Low Risk</option>
                                <option value="medium">Medium Risk</option>
                                <option value="high">High Risk</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculation Preview */}
            <div className="bg-linear-to-br from-brand-green to-green-700 rounded-3xl p-8 text-white">
                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                    <HiOutlineInformationCircle />
                    Estimated Returns Preview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Avg Investment</p>
                        <p className="text-2xl font-black italic">
                            {formatCurrency((formData.minAmount + formData.maxAmount) / 2)}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Total Return</p>
                        <p className="text-2xl font-black italic">
                            {formatCurrency(calculatedReturn)}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Profit</p>
                        <p className="text-2xl font-black italic text-green-200">
                            +{formatCurrency(calculatedReturn - (formData.minAmount + formData.maxAmount) / 2)}
                        </p>
                    </div>
                </div>

                {previewSchedule && (
                    <div className="mt-6 pt-6 border-t border-white/20">
                        <p className="text-sm font-bold mb-2">Payment Breakdown:</p>
                        <p className="text-xs text-white/80">
                            {previewSchedule.schedule.length} payments of approximately{' '}
                            <span className="font-black">
                                {formatCurrency(previewSchedule.schedule[0]?.amount || 0)}
                            </span>
                            {' '}{formData.paymentSchedule}
                        </p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-brand-green text-white rounded-2xl font-black hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                >
                    Save Investment Conditions
                </button>
            </div>
        </form>
    );
}
