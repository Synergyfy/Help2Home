import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileData } from '@/lib/mockLandlordData';
import { useUpdateProfile } from '@/hooks/useProfile';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function BasicInfoTab({ profile: initialProfile }: { profile: ProfileData }) {
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateProfile, isPending } = useUpdateProfile('landlord');

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
                <h3 className="text-lg font-bold text-gray-900">Basic Info</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <input
                        type="text"
                        {...register('displayName', { required: 'Display name is required' })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors ${errors.displayName ? 'border-red-500' : 'border-gray-200'}`}
                    />
                    {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName.message as string}</p>}
                    <p className="text-xs text-gray-500 mt-1">This is how you'll appear to tenants.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        {...register('firstName')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        {...register('lastName')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                        <input
                            type="email"
                            {...register('email')}
                            disabled={initialProfile.verificationStatus === 'verified'} // Always strictly locked if verified
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 pr-10"
                        />
                        {initialProfile.verificationStatus === 'verified' && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-green" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        {...register('phone')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                        <label className="block text-sm font-medium text-gray-700">Business / Agency Name</label>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md uppercase tracking-wider">(Optional)</span>
                    </div>
                    <input
                        type="text"
                        {...register('businessName')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Payout Frequency</label>
                    <select
                        {...register('payoutFrequency')}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="Instant">Instant</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                        {...register('currency')}
                        disabled={true}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent bg-gray-50 text-gray-500 cursor-not-allowed"
                    >
                        <option value="NGN">NGN (Nigerian Naira)</option>
                    </select>
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
