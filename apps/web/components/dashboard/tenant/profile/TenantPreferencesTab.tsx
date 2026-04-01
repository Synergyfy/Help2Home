import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/hooks/useProfile';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function TenantPreferencesTab({ profile }: { profile: any }) {
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateProfile, isPending } = useUpdateProfile('tenant');

    // Fallback defaults if profile is empty
    const defaultPreferences = {
        budgetRange: profile?.budgetRange || '',
        preferredLocation: profile?.preferredLocation || '',
        propertyType: profile?.propertyType || '',
        bedrooms: profile?.bedrooms || '',
        moveInDate: profile?.moveInDate || '',
        amenities: profile?.amenities || []
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: defaultPreferences
    });

    const onSubmit = (data: any) => {
        updateProfile(data, {
            onSuccess: () => setIsEditing(false)
        });
    };

    const handleCancel = () => {
        reset(defaultPreferences);
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Search Preferences</h3>
                    <p className="text-sm text-gray-500">Customize your home search criteria.</p>
                </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range (Annual)</label>
                    <select
                        {...register('budgetRange')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="">Select Range</option>
                        <option value="500k-1m">₦500k - ₦1m</option>
                        <option value="1m-5m">₦1m - ₦5m</option>
                        <option value="5m-10m">₦5m - ₦10m</option>
                        <option value="10m+">₦10m+</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
                    <input
                        type="text"
                        {...register('preferredLocation')}
                        disabled={!isEditing}
                        placeholder="e.g. Yaba, Lekki"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                        {...register('propertyType')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="">Select Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Studio">Studio</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <select
                        {...register('bedrooms')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Move-in Date</label>
                    <input
                        type="date"
                        {...register('moveInDate')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>
            </form>
        </div>
    );
}
