'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useUserStore, InvestmentCondition } from '@/store/userStore';
import { toast } from 'react-toastify';
import { MdSave } from 'react-icons/md';

export default function InvestmentSettings() {
    const { roleData, updateRoleProfileData } = useUserStore();
    const developerData = roleData.developer; // Assumes developer data exists or init handles it

    // Map first condition if exists, else defaults
    const defaultCondition = developerData?.investmentConditions?.[0] || {
        minAmount: 500000,
        expectedReturn: '15-25%',
        timeline: '12-24 months',
        riskLevel: 'medium'
    };

    const { register, handleSubmit, formState: { isDirty, isSubmitting } } = useForm<InvestmentCondition>({
        defaultValues: defaultCondition
    });

    const onSubmit = (data: InvestmentCondition) => {
        // We override the array with this single standard condition for now (MVP)
        updateRoleProfileData('developer', {
            investmentConditions: [data]
        });
        toast.success('Standard investment conditions updated!');
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Standard Investment Conditions</h3>
                <p className="text-sm text-gray-500">Define the default terms for investors looking at your profile.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Investment Amount (₦)</label>
                        <input
                            type="number"
                            {...register('minAmount', { required: true, min: 1 })}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-green outline-none font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Risk Level</label>
                        <select
                            {...register('riskLevel')}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-green outline-none font-medium bg-white"
                        >
                            <option value="low">Low (Conservative)</option>
                            <option value="medium">Medium (Balanced)</option>
                            <option value="high">High (Aggressive)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Typical Expected Return</label>
                        <input
                            type="text"
                            {...register('expectedReturn')}
                            placeholder="e.g. 15-20% per annum"
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-green outline-none font-medium"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Typical Timeline</label>
                        <input
                            type="text"
                            {...register('timeline')}
                            placeholder="e.g. 12-24 Months"
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-green outline-none font-medium"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={!isDirty || isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <MdSave size={20} />
                        Save Conditions
                    </button>
                </div>
            </form>
        </div>
    );
}
