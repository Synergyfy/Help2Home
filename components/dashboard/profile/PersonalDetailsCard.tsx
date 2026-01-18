import React, { useState } from 'react';
import { ProfileData } from './types';
import { useUserStore } from '@/store/userStore';

interface PersonalDetailsCardProps {
    data: ProfileData; // Still accepting props for compatibility, but will prioritize store
    onSave: (data: ProfileData) => void;
}

export default function PersonalDetailsCard({ data, onSave }: PersonalDetailsCardProps) {
    const { profile, updateProfile, setUser, email, phone: storePhone } = useUserStore();

    const [formData, setFormData] = useState<ProfileData>({
        ...data,
        firstName: profile.firstName || data.firstName,
        lastName: profile.lastName || data.lastName,
        email: email || data.email,
        phone: storePhone || data.phone,
        dob: profile.dob || data.dob,
        gender: profile.gender || data.gender,
        maritalStatus: profile.maritalStatus || data.maritalStatus,
        address: profile.address || data.address,
        state: profile.state || data.state,
        image: profile.image || data.image
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ProfileData, string>>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: ProfileData) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof ProfileData]) {
            setErrors((prev: Partial<Record<keyof ProfileData, string>>) => ({ ...prev, [name]: undefined }));
        }
        setIsEditing(true);
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof ProfileData, string>> = {};

        if (!formData.firstName.trim()) newErrors.firstName = "This field is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "This field is required.";

        // Phone validation
        const phoneRegex = /^\+?[0-9\s-]{10,}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = "This field is required.";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number including country code.";
        }

        // DOB Validation (18+)
        if (!formData.dob) {
            newErrors.dob = "This field is required.";
        } else {
            const birthDate = new Date(formData.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                newErrors.dob = "Invalid date — you must be at least 18 years old.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSave(formData);
            updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                dob: formData.dob,
                gender: formData.gender,
                maritalStatus: formData.maritalStatus,
                address: formData.address,
                state: formData.state,
                image: formData.image
            });
            setUser({ phone: formData.phone });
            setIsEditing(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    const handleReset = () => {
        setFormData(data);
        setErrors({});
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal details</h2>
                <p className="text-gray-500 mt-1">Your basic information. Keeping this accurate helps speed up verification.</p>
            </div>

            <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-green focus:border-brand-green'} focus:ring-2 outline-none transition-all`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-green focus:border-brand-green'} focus:ring-2 outline-none transition-all`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                </div>

                {/* Email (Read-only) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="flex gap-4">
                        <input
                            type="email"
                            value={formData.email}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <button className="px-4 py-2 text-sm font-medium text-brand-green hover:bg-green-50 rounded-lg transition-colors whitespace-nowrap">
                            Change email
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Changing email will require verification.</p>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 801 234 5678"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-green focus:border-brand-green'} focus:ring-2 outline-none transition-all`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    <p className="mt-1 text-xs text-gray-500">Used for OTP and payment alerts.</p>
                </div>

                {/* DOB & Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.dob ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-brand-green focus:border-brand-green'} focus:ring-2 outline-none transition-all`}
                        />
                        {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white"
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Marital Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marital status</label>
                    <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white"
                    >
                        <option value="">Select status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all resize-none"
                        placeholder="Enter your full address"
                    />
                    <p className="mt-1 text-xs text-gray-500">We may use this to verify your proof of address document.</p>
                </div>

                {/* State */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={handleSubmit}
                        disabled={!isEditing}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${isEditing
                            ? 'bg-brand-green text-white hover:bg-green-700 shadow-md'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Save changes
                    </button>
                    {isEditing && (
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Reset
                        </button>
                    )}
                    {showSuccess && (
                        <span className="text-green-600 font-medium animate-fade-in flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Profile updated
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
