'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/store/userStore';

export default function NextOfKinCard() {
    const { roleData, updateRoleProfileData } = useUserStore();
    const nokData = roleData.tenant?.nextOfKin || { name: '', relationship: '', phone: '', email: '' };

    const [formData, setFormData] = useState(nokData);
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsEditing(true);
    };

    const handleSubmit = () => {
        updateRoleProfileData('tenant', { nextOfKin: formData });
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900">Next of Kin</h2>
                <p className="text-gray-500 mt-1 font-medium">Someone we can contact in case of an emergency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Jane Doe"
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Relationship</label>
                    <select
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                    >
                        <option value="">Select Relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Child">Child</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 ..."
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                    />
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4">
                <button
                    onClick={handleSubmit}
                    disabled={!isEditing}
                    className={`px-10 py-4 rounded-2xl font-black transition-all ${isEditing
                        ? 'bg-brand-green text-white hover:bg-green-700 shadow-xl shadow-green-100 scale-[1.02] active:scale-[0.98]'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Save Next of Kin
                </button>
                {showSuccess && (
                    <div className="flex items-center gap-2 text-green-600 font-black animate-in fade-in slide-in-from-left-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        Saved
                    </div>
                )}
            </div>
        </div>
    );
}
