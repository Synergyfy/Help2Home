'use client';

import React, { useState, useEffect } from 'react';
import { useTenants } from '@/hooks/useTenants';
import { useLandlordProperties } from '@/hooks/useLandlordQueries';
import { Tenant } from '@/lib/mockLandlordData';
import { FiX, FiUser, FiHome, FiDollarSign, FiCalendar, FiBriefcase } from 'react-icons/fi';

interface AddTenantModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

export default function AddTenantModal({ isOpen, onClose, initialData }: AddTenantModalProps) {
    const { addTenant, isAdding } = useTenants();
    const { data: properties = [] } = useLandlordProperties();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        propertyId: '',
        propertyName: '',
        rentAmount: '',
        leaseStart: '',
        leaseEnd: '',
        employmentStatus: 'Employed',
        employerName: '',
        monthlySalary: '',
    });

    useEffect(() => {
        if (initialData && isOpen) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                propertyId: initialData.propertyId || '',
                propertyName: initialData.propertyName || '',
                rentAmount: initialData.rentAmount?.toString() || '',
                leaseStart: initialData.leaseStart || '',
                leaseEnd: initialData.leaseEnd || '',
                employmentStatus: initialData.employmentStatus || 'Employed',
                employerName: initialData.employerName || '',
                monthlySalary: initialData.monthlySalary?.toString() || '',
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTenant: Tenant = {
            id: `T-${Math.floor(Math.random() * 900000) + 100000}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            propertyId: formData.propertyId || 'manual',
            propertyName: formData.propertyName,
            status: 'Active',
            rentAmount: Number(formData.rentAmount.toString().replace(/,/g, '')),
            leaseStart: formData.leaseStart,
            leaseEnd: formData.leaseEnd,
            paymentStatus: 'Up to date',
            // Extended details for consistency with applications
            details: {
                employmentStatus: formData.employmentStatus,
                employerName: formData.employerName,
                monthlySalary: formData.monthlySalary,
            }
        };

        addTenant(newTenant, {
            onSuccess: () => {
                onClose();
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    propertyId: '',
                    propertyName: '',
                    rentAmount: '',
                    leaseStart: '',
                    leaseEnd: '',
                    employmentStatus: 'Employed',
                    employerName: '',
                    monthlySalary: '',
                });
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">Add New Tenant</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Personal Information</h3>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <FiUser size={14} /> Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Property Selection */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Lease & Property</h3>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <FiHome size={14} /> Select Property
                                </label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none bg-white font-medium"
                                    value={formData.propertyId}
                                    onChange={e => {
                                        const propId = e.target.value;
                                        const prop = properties.find((p: any) => p.id.toString() === propId);
                                        setFormData({
                                            ...formData,
                                            propertyId: propId,
                                            propertyName: prop ? prop.title : '',
                                            rentAmount: prop ? prop.price.toString() : formData.rentAmount
                                        });
                                    }}
                                >
                                    <option value="">Choose a property...</option>
                                    {properties.map((prop: any) => (
                                        <option key={prop.id} value={prop.id}>
                                            {prop.title} - ₦{prop.price.toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <FiDollarSign size={14} /> Rent Amount (Annual)
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. 1,500,000"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                    value={formData.rentAmount ? Number(formData.rentAmount.toString().replace(/,/g, '')).toLocaleString() : ''}
                                    onChange={e => {
                                        const val = e.target.value.replace(/,/g, '');
                                        if (val === '' || /^\d+$/.test(val)) {
                                            setFormData({ ...formData, rentAmount: val });
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-4 md:col-span-2 border-t border-gray-100 pt-6">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <FiBriefcase size={14} /> Employment & Income
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Employment Status</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none bg-white"
                                        value={formData.employmentStatus}
                                        onChange={e => setFormData({ ...formData, employmentStatus: e.target.value })}
                                    >
                                        <option value="Employed">Employed</option>
                                        <option value="Self-Employed">Self-Employed</option>
                                        <option value="Unemployed">Unemployed</option>
                                        <option value="Student">Student</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Employer Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                        value={formData.employerName}
                                        onChange={e => setFormData({ ...formData, employerName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Monthly Salary</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                        value={formData.monthlySalary}
                                        onChange={e => setFormData({ ...formData, monthlySalary: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FiCalendar size={14} /> Lease Start Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                        value={formData.leaseStart}
                                        onChange={e => setFormData({ ...formData, leaseStart: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FiCalendar size={14} /> Lease End Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                        value={formData.leaseEnd}
                                        onChange={e => setFormData({ ...formData, leaseEnd: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isAdding}
                            className="flex-1 py-3 px-4 bg-brand-green text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isAdding ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : 'Create Tenant'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
