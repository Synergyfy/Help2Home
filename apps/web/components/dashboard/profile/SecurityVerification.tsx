'use client';

import React, { useState } from 'react';
import { useUserStore, Role } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { VERIFICATION_REQUIREMENTS, VerificationRequirement } from '@/config/verificationConfig';
import {
    HiOutlineShieldCheck,
    HiOutlineLockClosed,
    HiOutlineDocumentArrowUp,
    HiOutlineCheckCircle,
    HiOutlineExclamationTriangle,
    HiOutlineCloudArrowUp,
    HiOutlineTrash
} from 'react-icons/hi2';
import { toast } from 'react-toastify';

export default function SecurityVerification() {
    const { activeRole, verified: isGloballyVerified } = useUserStore();
    const { addNotification } = useNotificationStore();
    const [activeTab, setActiveTab] = useState<'security' | 'verification'>('verification');
    const [uploadedDocs, setUploadedDocs] = useState<Record<string, { name: string, status: 'pending' | 'verified' | 'rejected' }>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const requirements = activeRole ? VERIFICATION_REQUIREMENTS[activeRole] : [];

    const handleFileUpload = (reqId: string, fileName: string) => {
        setUploadedDocs(prev => ({
            ...prev,
            [reqId]: { name: fileName, status: 'pending' }
        }));
        toast.info(`${fileName} uploaded and pending review.`);
    };

    const submitForVerification = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        addNotification({
            title: 'Verification Submitted',
            message: 'Your documents have been submitted for review. This typically takes 24-48 hours.',
            type: 'info'
        });

        toast.success('Verification request submitted!');
        setIsSubmitting(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Tab Navigation */}
            <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('verification')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'verification' ? 'bg-white shadow-md text-brand-green' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Verification
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'security' ? 'bg-white shadow-md text-brand-green' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Security
                </button>
            </div>

            {activeTab === 'verification' ? (
                <div className="space-y-6">
                    {/* Status Header */}
                    <div className={`p-6 rounded-3xl border-2 flex items-center justify-between ${isGloballyVerified ? 'bg-green-50 border-brand-green/20' : 'bg-orange-50 border-orange-200'
                        }`}>
                        <div className="flex items-center gap-4">
                            <div className={`size-12 rounded-2xl flex items-center justify-center ${isGloballyVerified ? 'bg-brand-green text-white' : 'bg-orange-600 text-white'
                                }`}>
                                {isGloballyVerified ? <HiOutlineCheckCircle size={28} /> : <HiOutlineExclamationTriangle size={28} />}
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900">
                                    {isGloballyVerified ? 'Account Verified' : 'Action Required: Verify Identity'}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {isGloballyVerified
                                        ? 'You have full access to all platform features.'
                                        : `Verification is required to unlock full ${activeRole} capabilities.`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Requirements List */}
                    <div className="grid grid-cols-1 gap-4">
                        {requirements.map((req) => (
                            <RequirementCard
                                key={req.id}
                                requirement={req}
                                status={uploadedDocs[req.id]?.status}
                                fileName={uploadedDocs[req.id]?.name}
                                onUpload={(fileName) => handleFileUpload(req.id, fileName)}
                                onRemove={() => {
                                    const newDocs = { ...uploadedDocs };
                                    delete newDocs[req.id];
                                    setUploadedDocs(newDocs);
                                }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={submitForVerification}
                        disabled={isSubmitting || Object.keys(uploadedDocs).length === 0}
                        className="w-full py-5 bg-brand-green text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-green/20 hover:bg-green-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
                    >
                        {isSubmitting ? 'Processing Request...' : 'Submit Documents for Review'}
                    </button>
                </div>
            ) : (
                <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900">
                            <HiOutlineLockClosed size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900">Security Credentials</h3>
                            <p className="text-sm text-gray-500">Manage your password and authentication methods.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <SecurityRow
                            label="Password"
                            value="••••••••••••"
                            actionLabel="Update"
                            onClick={() => {
                                toast.success('Password update initiated');
                                addNotification({
                                    title: 'Security Update',
                                    message: 'A request to change your password has been started.',
                                    type: 'info'
                                });
                            }}
                        />
                        <SecurityRow
                            label="Two-Factor Auth"
                            value="Disabled"
                            actionLabel="Enable"
                            status="warning"
                            onClick={() => {
                                toast.info('Enabling 2FA');
                                addNotification({
                                    title: 'Security Alert',
                                    message: 'You have started the process to enable Two-Factor Authentication.',
                                    type: 'info'
                                });
                            }}
                        />
                        <SecurityRow
                            label="Primary Email"
                            value="daniel@example.com"
                            actionLabel="Manage"
                            onClick={() => toast.info('Email management coming soon')}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function RequirementCard({
    requirement,
    status,
    fileName,
    onUpload,
    onRemove
}: {
    requirement: VerificationRequirement,
    status?: 'pending' | 'verified' | 'rejected',
    fileName?: string,
    onUpload: (name: string) => void,
    onRemove: () => void
}) {
    return (
        <div className={`p-6 bg-white rounded-3xl border-2 transition-all ${status === 'verified' ? 'border-brand-green bg-green-50/10' :
            status === 'pending' ? 'border-amber-200' : 'border-gray-100 hover:border-gray-200'
            }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${status === 'verified' ? 'bg-brand-green text-white' :
                        status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                        <HiOutlineDocumentArrowUp size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h5 className="font-bold text-gray-900">{requirement.label}</h5>
                            {status === 'verified' && <HiOutlineCheckCircle className="text-brand-green" />}
                        </div>
                        <p className="text-xs text-gray-500">{requirement.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {fileName ? (
                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                            <span className="text-xs font-bold text-gray-600 max-w-[120px] truncate">{fileName}</span>
                            <button onClick={onRemove} className="text-red-500 hover:text-red-700 transition-colors">
                                <HiOutlineTrash size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="relative group">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0].name)}
                            />
                            <button className="px-6 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-gray-600 group-hover:border-brand-green group-hover:text-brand-green transition-all flex items-center gap-2">
                                <HiOutlineCloudArrowUp size={16} />
                                Upload
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function SecurityRow({ label, value, actionLabel, status = 'info', onClick }: { label: string, value: string, actionLabel: string, status?: 'info' | 'warning', onClick?: () => void }) {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
                <p className={`font-bold ${status === 'warning' ? 'text-orange-600' : 'text-gray-700'}`}>{value}</p>
            </div>
            <button
                onClick={onClick}
                className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:border-brand-green hover:text-brand-green transition-all shadow-sm"
            >
                {actionLabel}
            </button>
        </div>
    );
}
