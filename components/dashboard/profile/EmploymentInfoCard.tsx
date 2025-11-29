import React, { useState } from 'react';
import { EmploymentData } from './types';

interface EmploymentInfoCardProps {
    data: EmploymentData;
    onSave: (data: EmploymentData) => void;
}

export default function EmploymentInfoCard({ data, onSave }: EmploymentInfoCardProps) {
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
            if (!formData.employerName.trim()) newErrors.employerName = "This field is required.";
            if (!formData.salary.trim()) newErrors.salary = "Enter your monthly salary.";
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Employment information</h2>
                <p className="text-gray-500 mt-1">Tell us about your job so we can assess your repayment ability.</p>
            </div>

            <div className="space-y-6">
                {/* Employment Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all bg-white"
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
                    <>
                        {/* Employer Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {isSelfEmployed ? 'Business name' : 'Employer name'}
                            </label>
                            <input
                                type="text"
                                name="employerName"
                                value={formData.employerName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.employerName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#6D28D9] focus:border-[#6D28D9]'} focus:ring-2 outline-none transition-all`}
                            />
                            {errors.employerName && <p className="mt-1 text-sm text-red-500">{errors.employerName}</p>}
                        </div>

                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {isSelfEmployed ? 'Role' : 'Job title'}
                            </label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all"
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="₦ 150,000"
                                className={`w-full px-4 py-3 rounded-lg border ${errors.salary ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#6D28D9] focus:border-[#6D28D9]'} focus:ring-2 outline-none transition-all`}
                            />
                            {errors.salary && <p className="mt-1 text-sm text-red-500">{errors.salary}</p>}
                        </div>

                        {/* Employment Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Employment type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all bg-white"
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Employment start date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.startDate ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#6D28D9] focus:border-[#6D28D9]'} focus:ring-2 outline-none transition-all`}
                            />
                            {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
                        </div>

                        {/* Employer Contact */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Employer contact (Phone or Email)</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all"
                            />
                        </div>

                        {/* Payslip Note */}
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-sm text-gray-600">
                                {isSelfEmployed
                                    ? "If you're self-employed, upload bank statements for the last 6 months instead of payslips."
                                    : "Please upload your latest 3 months payslips in the documents section."}
                            </p>
                        </div>
                    </>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={handleSubmit}
                        disabled={!isEditing}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${isEditing
                            ? 'bg-[#6D28D9] text-white hover:bg-purple-700 shadow-md'
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
                            Info updated
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
