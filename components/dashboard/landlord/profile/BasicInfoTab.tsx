'use client';

import { useState } from 'react';
import { ProfileData } from '@/lib/mockLandlordData';

export default function BasicInfoTab({ profile }: { profile: ProfileData }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(profile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Basic Info</h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-[#00853E] text-sm font-medium hover:underline"
                    >
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-gray-500 text-sm font-medium hover:text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-[#00853E] text-sm font-bold hover:underline"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">This is how you'll appear to tenants.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={profile.verificationStatus === 'verified'} // Read-only if verified
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 pr-10"
                        />
                        {profile.verificationStatus === 'verified' && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business / Agency Name</label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Payout Frequency</label>
                    <select
                        name="payoutFrequency"
                        value={formData.payoutFrequency}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="Instant">Instant</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        <option value="NGN">NGN (Nigerian Naira)</option>
                        <option value="USD">USD (US Dollar)</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                    />
                </div>
            </div>
        </div>
    );
}
