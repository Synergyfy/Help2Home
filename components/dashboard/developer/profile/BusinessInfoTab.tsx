'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/hooks/useProfile';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function BusinessInfoTab({ profile: initialProfile }: { profile: any }) {
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateProfile, isPending } = useUpdateProfile('developer');

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialProfile
    });

    const onSubmit = (data: any) => {
        updateProfile(data, {
            onSuccess: () => setIsEditing(false)
        });
    };

    const handleCancel = () => {
        reset(initialProfile);
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Business Details</h3>
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
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                        type="text"
                        {...register('companyName', { required: 'Company name is required' })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors ${errors.companyName ? 'border-red-500' : 'border-gray-200'}`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number (CAC)</label>
                    <input
                        type="text"
                        {...register('registrationNumber')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <input
                        type="number"
                        {...register('yearsExperience')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                    <textarea
                        {...register('address')}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                    />
                </div>
            </form>
        </div>
    );
}
