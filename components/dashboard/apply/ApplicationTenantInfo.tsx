import React from 'react';
import { ApplicationData } from './types';

interface ApplicationTenantInfoProps {
    data: ApplicationData;
    onChange: (section: 'tenantInfo' | 'guarantor' | 'notes', field: string, value: any) => void;
}

export default function ApplicationTenantInfo({ data, onChange }: ApplicationTenantInfoProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Tenant Information</h3>

            {/* Read-only Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Full Name</label>
                    <p className="font-medium text-gray-900">{data.tenantInfo.firstName} {data.tenantInfo.lastName}</p>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email</label>
                    <p className="font-medium text-gray-900">{data.tenantInfo.email}</p>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Phone</label>
                    <p className="font-medium text-gray-900">{data.tenantInfo.phone}</p>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Employment</label>
                    <p className="font-medium text-gray-900">{data.tenantInfo.employmentStatus} at {data.tenantInfo.employerName}</p>
                </div>
                <div className="md:col-span-2">
                    <p className="text-xs text-[#6D28D9] flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Information pulled from your profile. <a href="/dashboard/tenant/profile" className="underline font-medium">Update Profile</a>
                    </p>
                </div>
            </div>

            {/* Guarantor Details */}
            <h4 className="font-bold text-gray-800 mb-4">Guarantor Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guarantor Name</label>
                    <input
                        type="text"
                        value={data.guarantor.name}
                        onChange={(e) => onChange('guarantor', 'name', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={data.guarantor.phone}
                        onChange={(e) => onChange('guarantor', 'phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <select
                        value={data.guarantor.relationship}
                        onChange={(e) => onChange('guarantor', 'relationship', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all bg-white"
                    >
                        <option value="">Select Relationship</option>
                        <option value="Family">Family</option>
                        <option value="Friend">Friend</option>
                        <option value="Employer">Employer</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                    <input
                        type="email"
                        value={data.guarantor.email}
                        onChange={(e) => onChange('guarantor', 'email', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all"
                    />
                </div>
            </div>

            {/* Optional Notes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                    value={data.notes}
                    onChange={(e) => onChange('notes', 'notes', e.target.value)} // 'notes' section is just a string, but using same handler pattern
                    rows={3}
                    placeholder="Explain any income irregularity or special circumstances..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all resize-none"
                />
            </div>
        </div>
    );
}
