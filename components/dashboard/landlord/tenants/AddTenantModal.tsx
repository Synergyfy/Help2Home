'use client';

import React, { useState, useEffect } from 'react';
import { useTenants } from '@/hooks/useTenants';
import { useLandlordProperties } from '@/hooks/useLandlordQueries';
import { Tenant } from '@/lib/mockLandlordData';
import { Property } from '@/utils/properties';
import { FiX, FiUser, FiHome, FiCalendar, FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

export interface AddTenantInitialData extends Omit<Partial<Tenant>, 'status' | 'rentAmount'> {
    firstName?: string;
    lastName?: string;
    employmentStatus?: string;
    employerName?: string;
    monthlySalary?: string | number;
    status?: string;
    rentAmount?: string | number;
}

interface AddTenantModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: AddTenantInitialData | null;
}

export default function AddTenantModal({ isOpen, onClose, initialData }: AddTenantModalProps) {
    const { addTenant, updateTenant, isAdding, isUpdating } = useTenants();
    const { data: properties = [] } = useLandlordProperties();
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
        { id: '3', type: 'Statement', name: '3 Months Bank Statement', status: 'Pending' },
        { id: '4', type: 'Address', name: 'Proof of Address', status: 'Pending' }
    ]);

    useEffect(() => {
        if (initialData && isOpen) {
            const nameParts = initialData.name?.split(' ') || ['', ''];
            setFormData({
                firstName: initialData.firstName || nameParts[0] || '',
                lastName: initialData.lastName || nameParts.slice(1).join(' ') || '',
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
                setDocuments(initialData.details.documents
                    .filter(d => !d.name.toLowerCase().includes('payslip'))
                    .map(d => ({
                        id: d.id,
                        type: d.type,
                        name: d.name,
                        status: d.status
                    }))
                );
            }
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDocuments(prev => prev.map(doc =>
                doc.id === id ? { ...doc, status: 'Uploaded' } : doc
            ));
        }
    };

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTenant: Tenant = {
            id: initialData?.id || `T-${Math.floor(Math.random() * 900000) + 100000}`,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            propertyId: formData.propertyId || 'manual',
            propertyName: formData.propertyName,
            status: (initialData?.status as Tenant['status']) || 'Active',
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

        if (initialData?.id) {
            updateTenant({ id: initialData.id as string, data: newTenant }, {
                onSuccess: () => {
                    onClose();
                }
            });
        } else {
            addTenant(newTenant, {
                onSuccess: () => {
                    onClose();
                    setStep(1);
                    setFormData({
                        firstName: '', lastName: '', email: '', phone: '', propertyId: '', propertyName: '',
                        rentAmount: '', leaseStart: '', leaseEnd: '',
                        employmentStatus: 'Employed', employerName: '', monthlySalary: '',
                        guarantorName: '', guarantorPhone: '', guarantorRelationship: '',
                        guarantorEmail: '', notes: ''
                    });
                    setDocuments([
                        { id: '1', type: 'ID', name: 'Government ID', status: 'Pending' },
                        { id: '3', type: 'Statement', name: '3 Months Bank Statement', status: 'Pending' },
                        { id: '4', type: 'Address', name: 'Proof of Address', status: 'Pending' }
                    ]);
                }
            });
        }
    };

    const inputClasses = "w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green outline-none transition-all";
    const labelClasses = "text-sm font-medium text-gray-700 flex items-center gap-2 mb-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-20">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Tenant' : 'Add New Tenant'}</h2>
                        <p className="text-xs text-gray-500 mt-1">Step {step} of 2: {step === 1 ? 'Personal & Lease Details' : 'Professional & Verification'}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-1">
                    <motion.div
                        initial={{ width: '50%' }}
                        animate={{ width: step === 1 ? '50%' : '100%' }}
                        className="bg-brand-green h-full"
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <form id="add-tenant-form" onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-brand-green uppercase tracking-widest flex items-center gap-2">
                                            <FiUser /> Basic Information
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClasses}>First Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="John"
                                                    className={inputClasses}
                                                    value={formData.firstName}
                                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Last Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Doe"
                                                    className={inputClasses}
                                                    value={formData.lastName}
                                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClasses}>Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    className={inputClasses}
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Phone Number</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="+234..."
                                                    className={inputClasses}
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-gray-100">
                                        <h3 className="text-sm font-bold text-brand-green uppercase tracking-widest flex items-center gap-2">
                                            <FiHome /> Lease Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClasses}>Select Property</label>
                                                <select
                                                    required
                                                    className={inputClasses + " bg-white"}
                                                    value={formData.propertyId}
                                                    onChange={e => {
                                                        const propId = e.target.value;
                                                        const prop = (properties as Property[]).find(p => p.id.toString() === propId);
                                                        setFormData({
                                                            ...formData,
                                                            propertyId: propId,
                                                            propertyName: prop ? prop.title : '',
                                                            rentAmount: prop ? prop.price.toString() : formData.rentAmount
                                                        });
                                                    }}
                                                >
                                                    <option value="">Choose a property...</option>
                                                    {properties.map((prop: Property) => (
                                                        <option key={prop.id} value={prop.id}>
                                                            {prop.title} - ₦{prop.price.toLocaleString()}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className={labelClasses}>
                                                    <HiOutlineBanknotes className="text-brand-green" /> Rent Amount (Annual)
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₦</span>
                                                    <input
                                                        required
                                                        type="text"
                                                        className={inputClasses + " pl-8"}
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

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClasses}>
                                                        <FiCalendar /> Lease Start
                                                    </label>
                                                    <input
                                                        required
                                                        type="date"
                                                        className={inputClasses}
                                                        value={formData.leaseStart}
                                                        onChange={e => setFormData({ ...formData, leaseStart: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className={labelClasses}>
                                                        <FiCalendar /> Lease End
                                                    </label>
                                                    <input
                                                        required
                                                        type="date"
                                                        className={inputClasses}
                                                        value={formData.leaseEnd}
                                                        onChange={e => setFormData({ ...formData, leaseEnd: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-brand-green uppercase tracking-widest">Professional Context</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClasses}>Employment Status</label>
                                                <select
                                                    className={inputClasses + " bg-white"}
                                                    value={formData.employmentStatus}
                                                    onChange={e => setFormData({ ...formData, employmentStatus: e.target.value })}
                                                >
                                                    <option value="Employed">Employed</option>
                                                    <option value="Self-Employed">Self-Employed</option>
                                                    <option value="Unemployed">Unemployed</option>
                                                    <option value="Student">Student</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Monthly Salary (₦)</label>
                                                <input
                                                    type="text"
                                                    className={inputClasses}
                                                    value={formData.monthlySalary ? Number(formData.monthlySalary.toString().replace(/,/g, '')).toLocaleString() : ''}
                                                    onChange={e => {
                                                        const val = e.target.value.replace(/,/g, '');
                                                        if (val === '' || /^\d+$/.test(val)) {
                                                            setFormData({ ...formData, monthlySalary: val });
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className={labelClasses}>Employer Name</label>
                                                <input
                                                    type="text"
                                                    className={inputClasses}
                                                    value={formData.employerName}
                                                    onChange={e => setFormData({ ...formData, employerName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-gray-100">
                                        <h3 className="text-sm font-bold text-brand-green uppercase tracking-widest">Guarantor Info</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className={labelClasses}>Name</label>
                                                <input
                                                    type="text"
                                                    className={inputClasses}
                                                    value={formData.guarantorName}
                                                    onChange={e => setFormData({ ...formData, guarantorName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className={labelClasses}>Phone</label>
                                                <input
                                                    type="tel"
                                                    className={inputClasses}
                                                    value={formData.guarantorPhone}
                                                    onChange={e => setFormData({ ...formData, guarantorPhone: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClasses}>Relationship</label>
                                                <select
                                                    className={inputClasses + " bg-white"}
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
                                            <div>
                                                <label className={labelClasses}>Email (Optional)</label>
                                                <input
                                                    type="email"
                                                    className={inputClasses}
                                                    value={formData.guarantorEmail}
                                                    onChange={e => setFormData({ ...formData, guarantorEmail: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-gray-100">
                                        <h3 className="text-sm font-bold text-brand-green uppercase tracking-widest">Documents & Verification</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {documents.map((doc) => (
                                                <div key={doc.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col">
                                                    <p className="text-[10px] font-black text-gray-900 mb-0.5 truncate">{doc.name}</p>
                                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mb-2">{doc.type}</p>
                                                    <label className={`mt-auto block text-center py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${doc.status === 'Uploaded' ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-200 text-brand-green hover:border-brand-green'}`}>
                                                        {doc.status === 'Uploaded' ? 'Uploaded ✓' : 'Upload'}
                                                        <input type="file" className="hidden" onChange={(e) => handleFileChange(doc.id, e)} />
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-4">
                                        <label className={labelClasses}>Internal Notes</label>
                                        <textarea
                                            rows={2}
                                            className={inputClasses + " resize-none"}
                                            placeholder="Confidential notes about this tenant..."
                                            value={formData.notes}
                                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex gap-3 bg-gray-50/50">
                    {step === 1 ? (
                        <>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 px-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-white transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.propertyId}
                                className="flex-1 py-3 px-4 bg-brand-green text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                Next Step <FiArrowRight />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-white transition-all flex items-center justify-center"
                            >
                                <FiArrowLeft />
                            </button>
                            <button
                                type="submit"
                                form="add-tenant-form"
                                disabled={isAdding || isUpdating}
                                className="flex-1 py-3 px-4 bg-brand-green text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {(isAdding || isUpdating) ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>{initialData ? 'Save Changes' : 'Complete Registration'} <FiCheck /></>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
