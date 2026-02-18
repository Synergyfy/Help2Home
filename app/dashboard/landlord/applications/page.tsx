'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApplications } from '@/hooks/useApplications';
import { ApplicationStatus } from '@/store/applicationStore';
import { FiCheck, FiX, FiEye, FiClock, FiFileText, FiUserPlus, FiDollarSign } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTenants } from '@/hooks/useTenants';
import { Tenant } from '@/lib/mockLandlordData';
import AddTenantModal from '@/components/dashboard/landlord/tenants/AddTenantModal';

export default function LandlordApplicationsPage() {
    const { applications, isLoading, updateStatus, isUpdating } = useApplications();
    const { addTenant, isAdding } = useTenants();
    const [filter, setFilter] = useState<ApplicationStatus | 'All'>('All');
    const [selectedApp, setSelectedApp] = useState<any | null>(null);
    const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);
    const [initialTenantData, setInitialTenantData] = useState<any>(null);

    const handleOnboard = (app: any) => {
        const nameParts = app.tenantName.split(' ');
        setInitialTenantData({
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: app.tenantEmail,
            phone: app.tenantPhone,
            propertyId: app.propertyId,
            propertyName: app.propertyTitle,
            rentAmount: app.details.monthlySalary || '', // Or use property price if available
            employmentStatus: app.details.employmentStatus,
            employerName: app.details.employerName,
            monthlySalary: app.details.monthlySalary,
        });
        setIsAddTenantModalOpen(true);
    };

    const filteredApps = applications.filter(app =>
        (filter === 'All' || app.status === filter) && app.status !== 'Draft'
    );

    const getStatusColor = (status: ApplicationStatus) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            case 'Under Review': return 'bg-purple-100 text-[#6D28D9]';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            <AddTenantModal
                isOpen={isAddTenantModalOpen}
                onClose={() => setIsAddTenantModalOpen(false)}
                initialData={initialTenantData}
            />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tenant Applications</h1>
                    <p className="text-gray-500">Review and manage applications from potential tenants.</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Pending', 'Under Review', 'Approved', 'Rejected'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === f
                            ? 'bg-brand-green text-white shadow-sm'
                            : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Applications List */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode='popLayout'>
                    {filteredApps.length > 0 ? (
                        filteredApps.map((app) => (
                            <motion.div
                                key={app.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-5 flex flex-col md:flex-row gap-6">
                                    {/* Thumbnail */}
                                    <div className="w-full md:w-32 h-32 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                        <Image
                                            src={app.propertyImage}
                                            alt={app.propertyTitle}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Main Info */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{app.tenantName}</h3>
                                                <p className="text-sm text-gray-500">{app.propertyTitle}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <FiFileText className="text-gray-400" />
                                                <span>Salary: {app.details.monthlySalary} / mo</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiClock className="text-gray-400" />
                                                <span>Applied: {new Date(app.submittedAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiFileText className="text-gray-400" />
                                                <span>{app.details.employerName}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex md:flex-col justify-end gap-2 shrink-0">
                                        <button
                                            onClick={() => setSelectedApp(app)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            title="View Details"
                                        >
                                            <FiEye /> <span>Details</span>
                                        </button>

                                        {app.status === 'Approved' && (
                                            <button
                                                onClick={() => handleOnboard(app)}
                                                disabled={isAdding}
                                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold bg-brand-green text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
                                            >
                                                {isAdding ? (
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : <FiUserPlus />}
                                                <span>Add as Tenant</span>
                                            </button>
                                        )}

                                        {app.status === 'Pending' || app.status === 'Under Review' ? (
                                            <>
                                                <button
                                                    onClick={() => updateStatus({ id: app.id, status: 'Approved' })}
                                                    disabled={isUpdating}
                                                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-brand-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                                >
                                                    <FiCheck /> <span>Approve</span>
                                                </button>
                                                <button
                                                    onClick={() => updateStatus({ id: app.id, status: 'Rejected' })}
                                                    disabled={isUpdating}
                                                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                                                >
                                                    <FiX /> <span>Reject</span>
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => updateStatus({ id: app.id, status: 'Under Review' })}
                                                disabled={isUpdating}
                                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-purple-100"
                                            >
                                                <FiClock /> <span>Move to Review</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiFileText className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No applications found</h3>
                            <p className="text-gray-500">Applications for your properties will appear here.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Application Detail Sliding Panel */}
            <AnimatePresence>
                {selectedApp && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedApp(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-70 overflow-y-auto"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                                    <p className="text-sm text-gray-500">ID: {selectedApp.id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedApp(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="p-8 space-y-8 pb-32">
                                {/* Tenant Hero */}
                                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
                                    <div className="w-16 h-16 bg-brand-green/10 rounded-full border border-brand-green/20 flex items-center justify-center text-brand-green text-2xl font-bold">
                                        {selectedApp.tenantName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedApp.tenantName}</h3>
                                        <div className="space-y-0.5">
                                            <p className="text-sm text-gray-600">{selectedApp.tenantEmail}</p>
                                            <p className="text-sm text-gray-600 font-medium">{selectedApp.tenantPhone}</p>
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedApp.status)}`}>
                                            {selectedApp.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Property Card */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Property Applied For</h4>
                                    <div className="flex gap-4 p-4 border border-gray-100 rounded-xl">
                                        <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                            <Image src={selectedApp.propertyImage} alt={selectedApp.propertyTitle} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h5 className="font-bold text-gray-900">{selectedApp.propertyTitle}</h5>
                                            <p className="text-xs text-gray-500 line-clamp-1 mb-2">{selectedApp.propertyAddress}</p>
                                            <p className="text-sm font-bold text-brand-green">₦{selectedApp.progress === 100 ? '4,500,000' : '---'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Employment Details */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <FiFileText /> Employment & Income
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1">Status</p>
                                            <p className="font-bold text-gray-900">{selectedApp.details.employmentStatus}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1">Monthly Salary</p>
                                            <p className="font-bold text-gray-900">₦{selectedApp.details.monthlySalary}</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 col-span-2">
                                            <p className="text-xs text-gray-500 mb-1">Employer / Business</p>
                                            <p className="font-bold text-gray-900">{selectedApp.details.employerName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Financial Plan */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <FiDollarSign /> Financial Arrangement
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1">Down Payment</p>
                                            <p className="font-bold text-gray-900 font-mono">{selectedApp.financing.downPaymentPercent}%</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1">Repayment Plan</p>
                                            <p className="font-bold text-gray-900 font-mono">{selectedApp.financing.repaymentDuration} Months</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Verification Documents Block */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Verification Documents</h4>
                                    <div className="space-y-3">
                                        {['Government ID', 'Employment Letter', 'Bank Statement'].map((doc, idx) => (
                                            <div key={doc} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl group hover:border-brand-green hover:bg-green-50/30 transition-all cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gray-100 group-hover:bg-brand-green/10 rounded-lg text-gray-500 group-hover:text-brand-green transition-colors">
                                                        <FiFileText size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">{doc}</p>
                                                        <p className="text-xs text-gray-500">PDF • 1.2MB • Uploaded {new Date(selectedApp.submittedAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <FiEye className="text-gray-400 group-hover:text-brand-green" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Action Footer */}
                            <div className="fixed bottom-0 right-0 w-full max-w-xl p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
                                <div className="flex gap-4">
                                    {selectedApp.status === 'Approved' ? (
                                        <button
                                            onClick={() => { handleOnboard(selectedApp); setSelectedApp(null); }}
                                            disabled={isAdding}
                                            className="flex-1 px-6 py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isAdding ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiUserPlus size={20} />}
                                            Onboard as Tenant
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => { updateStatus({ id: selectedApp.id, status: 'Approved' }); setSelectedApp(null); }}
                                                disabled={isUpdating}
                                                className="flex-1 px-6 py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-100 disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                {isUpdating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiCheck size={20} />}
                                                Approve Application
                                            </button>
                                            <button
                                                onClick={() => { updateStatus({ id: selectedApp.id, status: 'Rejected' }); setSelectedApp(null); }}
                                                disabled={isUpdating}
                                                className="px-6 py-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all border border-red-100 disabled:opacity-50"
                                            >
                                                <FiX size={20} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
