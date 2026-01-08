'use client';

import React, { useState, useEffect } from 'react';
import { useTenants } from '@/hooks/useTenants';
import { useLandlordProperties } from '@/hooks/useLandlordQueries';
import { Tenant } from '@/lib/mockLandlordData';
import { FiX, FiUser, FiHome, FiDollarSign, FiCalendar } from 'react-icons/fi';

interface AddTenantModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

export default function AddTenantModal({ isOpen, onClose, initialData }: AddTenantModalProps) {
    const { addTenant, updateTenant, isAdding, isUpdating } = useTenants();
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
        guarantorName: '',
        guarantorPhone: '',
        guarantorRelationship: '',
        guarantorEmail: '',
        notes: '',
    });

    const [documents, setDocuments] = useState([
        { id: '1', type: 'ID', name: 'Government ID', status: 'Pending' },
        { id: '2', type: 'Income', name: '3 Months Payslips', status: 'Pending' },
        { id: '3', type: 'Statement', name: '3 Months Bank Statement', status: 'Pending' },
        { id: '4', type: 'Address', name: 'Proof of Address', status: 'Pending' }
    ]);

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
                employmentStatus: initialData.details?.employmentStatus || initialData.employmentStatus || 'Employed',
                employerName: initialData.details?.employerName || initialData.employerName || '',
                monthlySalary: initialData.details?.monthlySalary?.toString() || initialData.monthlySalary?.toString() || '',
                guarantorName: initialData.details?.guarantor?.name || '',
                guarantorPhone: initialData.details?.guarantor?.phone || '',
                guarantorRelationship: initialData.details?.guarantor?.relationship || '',
                guarantorEmail: initialData.details?.guarantor?.email || '',
                notes: initialData.details?.notes || '',
            });
            if (initialData.details?.documents) {
                setDocuments(initialData.details.documents);
            }
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real environment, you'd upload the file and get a URL
            // For mock, we'll just update the status
            setDocuments(prev => prev.map(doc =>
                doc.id === id ? { ...doc, status: 'Uploaded' } : doc
            ));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTenant: Tenant = {
            id: initialData?.id || `T-${Math.floor(Math.random() * 900000) + 100000}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            propertyId: formData.propertyId || 'manual',
            propertyName: formData.propertyName,
            status: initialData?.status || 'Active',
            rentAmount: Number(formData.rentAmount.toString().replace(/,/g, '')),
            leaseStart: formData.leaseStart,
            leaseEnd: formData.leaseEnd,
            paymentStatus: initialData?.paymentStatus || 'Up to date',
            details: {
                employmentStatus: formData.employmentStatus,
                employerName: formData.employerName,
                monthlySalary: formData.monthlySalary,
                guarantor: {
                    name: formData.guarantorName,
                    phone: formData.guarantorPhone,
                    relationship: formData.guarantorRelationship,
                    email: formData.guarantorEmail,
                },
                documents: documents.map(doc => ({
                    id: doc.id,
                    type: doc.type,
                    name: doc.name,
                    status: doc.status
                })),
                notes: formData.notes
            }
        };

        if (initialData) {
            updateTenant({ id: initialData.id, data: newTenant }, {
                onSuccess: () => {
                    onClose();
                }
            });
        } else {
            addTenant(newTenant, {
                onSuccess: () => {
                    onClose();
                    setFormData({
                        name: '', email: '', phone: '', propertyId: '', propertyName: '',
                        rentAmount: '', leaseStart: '', leaseEnd: '',
                        employmentStatus: 'Employed', employerName: '', monthlySalary: '',
                        guarantorName: '', guarantorPhone: '', guarantorRelationship: '',
                        guarantorEmail: '', notes: ''
                    });
                    setDocuments([
                        { id: '1', type: 'ID', name: 'Government ID', status: 'Pending' },
                        { id: '2', type: 'Income', name: '3 Months Payslips', status: 'Pending' },
                        { id: '3', type: 'Statement', name: '3 Months Bank Statement', status: 'Pending' },
                        { id: '4', type: 'Address', name: 'Proof of Address', status: 'Pending' }
                    ]);
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
                    <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Tenant' : 'Add New Tenant'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Column 1: Personal & Property */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-brand-green uppercase tracking-wider">Basic Information</h3>
                                <div className="space-y-4">
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
                                    <div className="grid grid-cols-2 gap-4">
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
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-semibold text-brand-green uppercase tracking-wider">Lease details</h3>
                                <div className="space-y-4">
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

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <FiCalendar size={14} /> Lease Start
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
                                                <FiCalendar size={14} /> Lease End
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
                        </div>

                        {/* Column 2: Employment, Guarantor & Docs */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-brand-green uppercase tracking-wider">Employment & Income</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Status</label>
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
                                        <label className="text-sm font-medium text-gray-700">Monthly Salary</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                            value={formData.monthlySalary ? Number(formData.monthlySalary.toString().replace(/,/g, '')).toLocaleString() : ''}
                                            onChange={e => {
                                                const val = e.target.value.replace(/,/g, '');
                                                if (val === '' || /^\d+$/.test(val)) {
                                                    setFormData({ ...formData, monthlySalary: val });
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Employer Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                            value={formData.employerName}
                                            onChange={e => setFormData({ ...formData, employerName: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-semibold text-brand-green uppercase tracking-wider">Guarantor Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                            value={formData.guarantorName}
                                            onChange={e => setFormData({ ...formData, guarantorName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                            value={formData.guarantorPhone}
                                            onChange={e => setFormData({ ...formData, guarantorPhone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Relationship</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none bg-white"
                                            value={formData.guarantorRelationship}
                                            onChange={e => setFormData({ ...formData, guarantorRelationship: e.target.value })}
                                        >
                                            <option value="">Select...</option>
                                            <option value="Parent">Parent</option>
                                            <option value="Sibling">Sibling</option>
                                            <option value="Employer">Employer</option>
                                            <option value="Friend">Friend</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email (Optional)</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                                            value={formData.guarantorEmail}
                                            onChange={e => setFormData({ ...formData, guarantorEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-semibold text-brand-green uppercase tracking-wider">Required Documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {documents.map((doc) => (
                                <div key={doc.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                                    <p className="text-xs font-bold text-gray-900 mb-1">{doc.name}</p>
                                    <p className="text-[10px] text-gray-500 mb-3">{doc.type}</p>
                                    <label className={`block text-center py-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${doc.status === 'Uploaded' ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-200 text-brand-green hover:border-brand-green'}`}>
                                        {doc.status === 'Uploaded' ? 'Uploaded ✓' : 'Upload File'}
                                        <input type="file" className="hidden" onChange={(e) => handleFileChange(doc.id, e)} />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Additional Notes</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none resize-none"
                            placeholder="Any other relevant details about the tenant..."
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        />
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
                            {(isAdding || isUpdating) ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : initialData ? 'Save Changes' : 'Create Tenant'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
