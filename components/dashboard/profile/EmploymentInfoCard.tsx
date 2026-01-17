import React, { useState } from 'react';
import { EmploymentData } from './types';
import { useUserStore } from '@/store/userStore';

interface EmploymentInfoCardProps {
    data: EmploymentData;
    onSave: (data: EmploymentData) => void;
}

export default function EmploymentInfoCard({ data, onSave }: EmploymentInfoCardProps) {
    const { updateRoleProfileData } = useUserStore();
    const [formData, setFormData] = useState<EmploymentData>(data);
    const [errors, setErrors] = useState<Partial<Record<keyof EmploymentData, string>>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof EmploymentData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        setIsEditing(true);
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof EmploymentData, string>> = {};

        if (formData.status === 'Employed' || formData.status === 'Self-employed') {
            if (!formData.employerName?.trim()) newErrors.employerName = "This field is required.";
            if (!formData.salary?.trim()) newErrors.salary = "Enter your monthly salary.";
        }

        // Start date validation
        if (formData.startDate) {
            const start = new Date(formData.startDate);
            const today = new Date();
            if (start > today) {
                newErrors.startDate = "Start date cannot be in the future.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSave(formData);
            updateRoleProfileData('tenant', {
                employmentStatus: formData.status,
                employerName: formData.employerName,
                companyName: formData.companyName,
                organizationId: formData.organizationId,
                jobTitle: formData.jobTitle,
                monthlySalary: formData.salary,
                employmentType: formData.type,
                startDate: formData.startDate,
                employerContact: formData.contact
            });
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

    const isSelfEmployed = formData.status === 'Self-employed';
    const isUnemployedOrStudent = formData.status === 'Unemployed' || formData.status === 'Student' || formData.status === 'Retired';

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900">Employment Information</h2>
                <p className="text-gray-500 mt-1 font-medium">Provide your work details to verify your income and qualify for financing.</p>
            </div>

            <div className="space-y-8">
                {/* Employment Status */}
                <div>
                    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Employment Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                    >
                        <option value="">Select status</option>
                        <option value="Employed">Employed</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Student">Student</option>
                        <option value="Retired">Retired</option>
                    </select>
                </div>

                {!isUnemployedOrStudent && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        {/* Employer Name */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">
                                {isSelfEmployed ? 'Business name' : 'Organization Name'}
                            </label>
                            <input
                                type="text"
                                name="employerName"
                                value={formData.employerName}
                                onChange={handleChange}
                                placeholder={isSelfEmployed ? 'e.g. Acme Tech Solutions' : 'e.g. Ministry of Education'}
                                className={`w-full px-5 py-4 rounded-2xl border ${errors.employerName ? 'border-red-500 focus:ring-red-50' : 'border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green'} outline-none transition-all font-bold text-gray-900`}
                            />
                            {errors.employerName && <p className="mt-2 text-sm text-red-500 font-bold">{errors.employerName}</p>}
                        </div>

                        {/* Company Name (for verification) */}
                        {!isSelfEmployed && (
                            <div>
                                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName || ''}
                                    onChange={handleChange}
                                    placeholder="Registered Company Name"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                                />
                            </div>
                        )}

                        {/* Organization/Staff ID */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Staff / Org ID</label>
                            <input
                                type="text"
                                name="organizationId"
                                value={formData.organizationId || ''}
                                onChange={handleChange}
                                placeholder="ID Number"
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                            />
                        </div>

                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">
                                {isSelfEmployed ? 'Your Role' : 'Job Title'}
                            </label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                placeholder="e.g. Project Manager"
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Monthly Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="₦ 150,000"
                                className={`w-full px-5 py-4 rounded-2xl border ${errors.salary ? 'border-red-500 focus:ring-red-50' : 'border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green'} outline-none transition-all font-bold text-gray-900`}
                            />
                            {errors.salary && <p className="mt-2 text-sm text-red-500 font-bold">{errors.salary}</p>}
                        </div>

                        {/* Employment Type */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Employment Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                            >
                                <option value="">Select type</option>
                                <option value="Permanent">Permanent</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className={`w-full px-5 py-4 rounded-2xl border ${errors.startDate ? 'border-red-500 focus:ring-red-50' : 'border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green'} outline-none transition-all font-bold text-gray-900`}
                            />
                            {errors.startDate && <p className="mt-2 text-sm text-red-500 font-bold">{errors.startDate}</p>}
                        </div>

                        {/* Employer Contact */}
                        <div>
                            <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wider">Employer Contact</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Phone or HR Email"
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-50 focus:border-brand-green outline-none transition-all font-bold text-gray-900"
                            />
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
                    <button
                        onClick={handleSubmit}
                        disabled={!isEditing}
                        className={`px-10 py-4 rounded-2xl font-black transition-all ${isEditing
                            ? 'bg-brand-green text-white hover:bg-green-700 shadow-xl shadow-green-100 scale-[1.02] active:scale-[0.98]'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Save Employment Details
                    </button>
                    {isEditing && (
                        <button
                            onClick={handleReset}
                            className="px-8 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Reset
                        </button>
                    )}
                    {showSuccess && (
                        <div className="flex items-center gap-2 text-green-600 font-black animate-in fade-in slide-in-from-left-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                            Updated Successfully
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
