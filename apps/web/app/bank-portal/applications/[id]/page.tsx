'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_BANK_APPLICATIONS, BankLoanApplication } from '@/lib/mockBankData';
import { 
    HiOutlineArrowLeft, 
    HiOutlineCheckBadge, 
    HiOutlineDocumentArrowDown, 
    HiOutlineIdentification,
    HiOutlineShieldCheck,
    HiOutlineChatBubbleLeftRight,
    HiOutlineUserPlus,
    HiOutlineClipboardDocumentList
} from 'react-icons/hi2';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function BankApplicationDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [application, setApplication] = useState<BankLoanApplication | null>(null);
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        const found = MOCK_BANK_APPLICATIONS.find(app => app.id === id);
        if (found) setApplication(found);
    }, [id]);

    if (!application) return <div className="p-20 text-center animate-pulse">Loading Application...</div>;

    const handleApprove = () => {
        toast.success(`Application ${application.id} approved successfully!`);
        // In real app, we would call API and update local state or redirect
    };

    const handleReject = () => {
        toast.error(`Application ${application.id} has been rejected.`);
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
                <HiOutlineArrowLeft /> Back to Applications
            </button>

            {/* Header Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-6">
                    <div className="w-20 h-20 relative rounded-2xl overflow-hidden shadow-md">
                        <Image src={application.propertyImage} alt={application.propertyTitle} fill className="object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{application.tenantName}</h1>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-tight ${
                                application.status === 'New' ? 'bg-blue-100 text-blue-600' :
                                'bg-green-100 text-green-600'
                            }`}>
                                {application.status}
                            </span>
                        </div>
                        <p className="text-gray-500 font-medium">{application.propertyTitle}</p>
                        <p className="text-xs text-gray-400 mt-1 uppercase font-semibold tracking-widest flex items-center gap-1">
                            Application ID: <span className="text-gray-900">{application.id}</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                        <HiOutlineUserPlus /> Assign Officer
                    </button>
                    <button 
                        onClick={handleReject}
                        className="px-6 py-3 border border-red-100 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all"
                    >
                        Reject
                    </button>
                    <button 
                        onClick={handleApprove}
                        className="px-8 py-3 bg-[#003366] text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                    >
                        Approve Application
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Tabs */}
                    <div className="flex items-center gap-8 border-b border-gray-100">
                        {['Overview', 'Documents', 'Credit & Risk', 'Repayment Schedule'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-semibold transition-all relative ${
                                    activeTab === tab 
                                    ? 'text-[#003366]' 
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#003366] rounded-full"></div>}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'Overview' && (
                        <div className="space-y-8">
                            {/* Personal Details */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <HiOutlineIdentification className="text-blue-600" /> Tenant Information
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                    <div>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Date of Birth</p>
                                        <p className="font-semibold text-gray-900">{application.tenantDetails.dob}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
                                        <p className="font-semibold text-gray-900">{application.tenantDetails.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                                        <p className="font-semibold text-gray-900">{application.tenantDetails.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">KYC Status</p>
                                        <div className="flex items-center gap-1 text-green-600 font-semibold">
                                            <HiOutlineCheckBadge /> {application.tenantDetails.kycStatus}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Audit Trail */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <HiOutlineClipboardDocumentList className="text-gray-400" /> Audit Trail
                                </h3>
                                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-50">
                                    {[
                                        { action: 'Application Created', detail: 'Originated via Help2Home', date: '2026-02-18 10:30', actor: 'System' },
                                        { action: 'Identity Verified', detail: 'KYC check passed', date: '2026-02-18 11:15', actor: 'System' },
                                        { action: 'Documents Requested', detail: 'Monthly payslips required', date: '2026-02-18 14:20', actor: 'John Doe (Loan Officer)' },
                                    ].map((log, idx) => (
                                        <div key={idx} className="relative pl-8">
                                            <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center z-10">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{log.action}</p>
                                                    <p className="text-xs text-gray-500">{log.detail}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-semibold text-gray-400 uppercase">{log.date}</p>
                                                    <p className="text-[10px] text-blue-600 font-bold uppercase">{log.actor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Documents' && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4">Document Name</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Uploaded</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {application.documents.map((doc) => (
                                        <tr key={doc.id}>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">{doc.name}</p>
                                                <p className="text-xs text-gray-400">{doc.type}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-tight ${
                                                    doc.status === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                                }`}>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{doc.uploadedDate}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                    <HiOutlineDocumentArrowDown size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'Credit & Risk' && (
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900">Credit Report Analysis</h3>
                                    <span className="text-xs text-gray-400 font-medium">Last updated: {application.creditRisk.reportDate}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Risk Recommendation</p>
                                        <div className={`text-xl font-semibold flex items-center gap-2 ${
                                            application.creditRisk.recommendation === 'Approve' ? 'text-green-600' : 
                                            application.creditRisk.recommendation === 'Reject' ? 'text-red-600' : 'text-orange-600'
                                        }`}>
                                            <HiOutlineShieldCheck size={24} />
                                            {application.creditRisk.recommendation}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">Automated system recommendation based on multi-factor analysis.</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Debt-to-Income Ratio</p>
                                        <div className="text-3xl font-semibold text-gray-900">{application.creditRisk.debtToIncomeRatio}%</div>
                                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
                                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${application.creditRisk.debtToIncomeRatio}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">System Flagged Items</p>
                                    <div className="space-y-3">
                                        {application.creditRisk.redFlags.length > 0 ? application.creditRisk.redFlags.map((flag, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-700 font-medium">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                                {flag}
                                            </div>
                                        )) : (
                                            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 font-medium">
                                                <HiOutlineShieldCheck size={18} />
                                                No red flags detected.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Repayment Schedule' && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {application.repaymentSchedule.length > 0 ? (
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                        <tr>
                                            <th className="px-6 py-4">Installment</th>
                                            <th className="px-6 py-4">Due Date</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Fees</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {application.repaymentSchedule.map((inst, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 font-semibold text-gray-900">#0{idx + 1}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{inst.dueDate}</td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">₦{inst.amount.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 font-medium">₦{inst.fees.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-tight ${
                                                        inst.status === 'Paid' ? 'bg-green-100 text-green-600' :
                                                        inst.status === 'Overdue' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                        {inst.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-20 text-center text-gray-400">
                                    <HiOutlineClipboardDocumentList size={48} className="mx-auto mb-4 opacity-20" />
                                    <p className="font-semibold">Repayment schedule will be generated upon approval.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column: Score & Actions */}
                <div className="space-y-8">
                    {/* Credit Score Card */}
                    <div className="bg-[#003366] text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                        <h3 className="text-lg font-semibold mb-6 text-blue-100">Internal Risk Score</h3>
                        <div className="flex items-center justify-center py-4">
                            <div className="w-32 h-32 rounded-full border-8 border-white/10 flex items-center justify-center relative">
                                <div className="absolute inset-0 border-8 border-orange-500 rounded-full" style={{ clipPath: 'inset(0 0 50% 0)' }}></div>
                                <span className="text-4xl font-semibold">{application.creditScore}</span>
                            </div>
                        </div>
                        <p className="text-center text-sm font-semibold mt-4 text-orange-400 uppercase tracking-widest">Moderate Risk</p>
                        <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-blue-100">Income Verification</span>
                                <span className="font-semibold">Passed</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-blue-100">Employment Status</span>
                                <span className="font-semibold">Full-time</span>
                            </div>
                        </div>
                    </div>

                    {/* Officer Notes */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <HiOutlineChatBubbleLeftRight className="text-orange-500" /> Review Notes
                        </h3>
                        <div className="space-y-4 mb-6">
                            <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-600 leading-relaxed  border-l-4 border-[#003366]">
                                "Initial review looks promising. Need to double check the monthly debt-to-income ratio based on the latest payslip."
                                <p className="mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest not-">— System Audit Log</p>
                            </div>
                        </div>
                        <textarea 
                            placeholder="Add internal comments..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all resize-none h-32"
                        ></textarea>
                        <button className="w-full mt-4 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all">Save Note</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
