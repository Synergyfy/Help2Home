import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/hooks/useProfile';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function InvestorStrategyTab({ profile: initialProfile }: { profile: any }) {
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateProfile, isPending } = useUpdateProfile('investor');

    // Fallback defaults
    const defaultData = {
        firstName: initialProfile.firstName || '', // Placeholder for full name
        investmentBudget: initialProfile.investmentBudget || '',
        riskTolerance: initialProfile.riskTolerance || 'Medium',
        roiExpectation: initialProfile.roiExpectation || '',
        preferredPropertyTypes: initialProfile.preferredPropertyTypes || '',
        investmentHorizon: initialProfile.investmentHorizon || ''
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: defaultData
    });

    const onSubmit = (data: any) => {
        updateProfile(data, {
            onSuccess: () => setIsEditing(false)
        });
    };

    const handleCancel = () => {
        reset(defaultData);
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Investment Strategy</h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-brand-green text-sm font-medium hover:underline transition-all"
                    >
                        <FiEdit2 /> Edit
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <FiX /> Cancel
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isPending}
                            className="flex items-center gap-2 bg-brand-green text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? 'Saving...' : <><FiSave /> Save</>}
                        </button>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        {...register('firstName')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Budget (Annual)</label>
                    <select
                        {...register('investmentBudget')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="">Select Range</option>
                        <option value="5m-20m">₦5m - ₦20m</option>
                        <option value="20m-50m">₦20m - ₦50m</option>
                        <option value="50m-100m">₦50m - ₦100m</option>
                        <option value="100m+">₦100m+</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
                    <select
                        {...register('riskTolerance')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="Conservative">Conservative (Low Risk)</option>
                        <option value="Balanced">Balanced (Medium Risk)</option>
                        <option value="Aggressive">Aggressive (High Risk)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target ROI (Annual %)</label>
                    <input
                        type="text"
                        {...register('roiExpectation')}
                        disabled={!isEditing}
                        placeholder="e.g. 15%"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Asset Classes</label>
                    <input
                        type="text"
                        {...register('preferredPropertyTypes')}
                        disabled={!isEditing}
                        placeholder="Residential, Commercial, Land"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Horizon</label>
                    <select
                        {...register('investmentHorizon')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="">Select Duration</option>
                        <option value="Short Term">Short Term (&lt; 2 Years)</option>
                        <option value="Medium Term">Medium Term (2-5 Years)</option>
                        <option value="Long Term">Long Term (5+ Years)</option>
                    </select>
                </div>
            </form>
        </div>
    );
}
