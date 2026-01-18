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

            {/* Editable Personal & Employment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">First Name</label>
                    <input
                        type="text"
                        value={data.tenantInfo.firstName}
                        onChange={(e) => onChange('tenantInfo', 'firstName', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
                    <input
                        type="text"
                        value={data.tenantInfo.lastName}
                        onChange={(e) => onChange('tenantInfo', 'lastName', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                        type="email"
                        value={data.tenantInfo.email}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed font-bold"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={data.tenantInfo.phone}
                        onChange={(e) => onChange('tenantInfo', 'phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Employment Status</label>
                    <select
                        value={data.tenantInfo.employmentStatus}
                        onChange={(e) => onChange('tenantInfo', 'employmentStatus', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                    >
                        <option value="Employed">Employed</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Business Owner">Business Owner</option>
                        <option value="Contractor">Contractor</option>
                        <option value="Unemployed">Unemployed</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Employer/Company Name</label>
                    <input
                        type="text"
                        value={data.tenantInfo.employerName}
                        onChange={(e) => onChange('tenantInfo', 'employerName', e.target.value)}
                        placeholder="Company Name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white font-bold text-gray-900"
                    />
                </div>
                <div className="md:col-span-2 mt-2">
                    <p className="text-[11px] text-brand-green font-bold flex items-center gap-1 bg-green-50 w-fit px-3 py-1 rounded-full border border-green-100">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Updates here only apply to this application. <a href="/dashboard/tenant/profile" className="underline decoration-2">Update global profile</a>
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={data.guarantor.phone}
                        onChange={(e) => onChange('guarantor', 'phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <select
                        value={data.guarantor.relationship}
                        onChange={(e) => onChange('guarantor', 'relationship', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all bg-white"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-all resize-none"
                />
            </div>
        </div>
    );
}
