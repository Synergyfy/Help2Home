'use client';

import React from 'react';

interface FinancialsStepProps {
    data: any;
    updateData: (data: any) => void;
}

export default function FinancialsStep({ data, updateData }: FinancialsStepProps) {
    const handleInstallmentToggle = (checked: boolean) => {
        updateData({
            installments: {
                ...data.installments,
                enabled: checked
            }
        });
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing & Currency</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">₦</span>
                            <input
                                type="number"
                                value={data.price?.amount || ''}
                                onChange={(e) => updateData({ price: { ...data.price, amount: Number(e.target.value) } })}
                                placeholder="0.00"
                                className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Currency
                        </label>
                        <select
                            value={data.price?.currency || 'NGN'}
                            onChange={(e) => updateData({ price: { ...data.price, currency: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E] bg-white"
                        >
                            <option value="NGN">Nigerian Naira (NGN)</option>
                            <option value="USD">US Dollar (USD)</option>
                        </select>
                    </div>

                    {data.listingType === 'Rent' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Period
                            </label>
                            <select
                                value={data.price?.period || 'year'}
                                onChange={(e) => updateData({ price: { ...data.price, period: e.target.value } })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E] bg-white"
                            >
                                <option value="year">Per Year</option>
                                <option value="month">Per Month</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

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
                            className="sr-only peer"
                            checked={data.installments?.enabled || false}
                            onChange={(e) => handleInstallmentToggle(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00853E]"></div>
                    </label>
                </div>

                {data.installments?.enabled && (
                    <div className="space-y-4 pt-4 border-t border-gray-100 animate-fadeIn">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimum Deposit (%)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={data.installments?.depositPercent || ''}
                                onChange={(e) => updateData({ installments: { ...data.installments, depositPercent: Number(e.target.value) } })}
                                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853E] focus:border-[#00853E]"
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
                                            checked={data.installments?.tenures?.includes(months) || false}
                                            onChange={(e) => {
                                                const current = data.installments?.tenures || [];
                                                const updated = e.target.checked
                                                    ? [...current, months]
                                                    : current.filter((m: number) => m !== months);
                                                updateData({ installments: { ...data.installments, tenures: updated } });
                                            }}
                                            className="text-[#00853E] focus:ring-[#00853E]"
                                        />
                                        <span>{months} Months</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Example Calculation */}
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                            <strong>Example:</strong> For a property of ₦1,200,000 with 25% deposit over 12 months:
                            <ul className="list-disc list-inside mt-1 ml-2">
                                <li>Upfront Deposit: ₦300,000</li>
                                <li>Monthly Payment: ~₦75,000 (plus fees)</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
