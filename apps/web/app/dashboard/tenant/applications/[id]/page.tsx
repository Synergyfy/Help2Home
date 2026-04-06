'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ApplicationStatusHeader from '@/components/dashboard/application/ApplicationStatusHeader';
import StatusTimeline from '@/components/dashboard/application/StatusTimeline';
import StatusSummaryCard from '@/components/dashboard/application/StatusSummaryCard';
import DocumentsEvidenceSection from '@/components/dashboard/application/DocumentsEvidenceSection';
import ContractSection from '@/components/dashboard/application/ContractSection';
import RepaymentScheduleSummary from '@/components/dashboard/application/RepaymentScheduleSummary';
import ActivityLog from '@/components/dashboard/application/ActivityLog';
import PropertyQuickCard from '@/components/dashboard/application/PropertyQuickCard';
import { ApplicationDetails, ApplicationDocument } from '@/components/dashboard/application/types';
import { useApplications } from '@/hooks/useApplications';
import { Application } from '@/store/applicationStore';


export default function ApplicationStatusPage() {
    const params = useParams();
    const applicationId = params.id as string;
    const { applications, isLoading: appsLoading } = useApplications();
    const [application, setApplication] = useState<ApplicationDetails | null>(null);

    useEffect(() => {
        const found = applications.find((a: Application) => a.id === applicationId);
        if (found) {
            // Map the store Application type to the UI-required ApplicationDetails type
            setApplication({
                id: found.id,
                propertyId: found.propertyId,
                propertyName: found.propertyTitle,
                propertyAddress: found.propertyAddress || found.propertyTitle,
                propertyImage: found.propertyImage,
                landlordName: found.landlordId || 'Landlord', // using ID as fallback since name is not in model
                currentStatus: found.status as any,
                progressPercent: found.progress || 0,
                lastUpdated: found.submittedAt ? new Date(found.submittedAt).toLocaleString() : 'Just now',
                timeline: [
                    { id: '1', title: 'Application Submitted', status: 'Completed', responsibleParty: 'Tenant', timestamp: found.submittedAt ? new Date(found.submittedAt).toLocaleDateString() : '' },
                    { id: '2', title: 'Under Review', status: found.status === 'Under Review' || found.status === 'Approved' ? 'Completed' : 'In Progress', responsibleParty: 'Help2Home', timestamp: found.status === 'Under Review' ? new Date().toLocaleDateString() : '' },
                    { id: '3', title: 'Bank Approval (Coming Soon)', status: 'Pending', responsibleParty: 'Bank', notes: 'This feature will be available once bank integrations are live.' },
                    { id: '4', title: 'Funded (Coming Soon)', status: 'Pending', responsibleParty: 'Bank', notes: 'Automated funding is currently in development.' },
                    { id: '5', title: 'Active', status: 'Pending', responsibleParty: 'Tenant' },
                    { id: '6', title: 'Completed', status: 'Pending', responsibleParty: 'Tenant' },
                ],
                documents: found.documents || [],
                contract: {
                    id: found.contracts?.[0]?.id || `c_${found.id}`,
                    applicationId: found.id,
                    name: found.contracts?.[0]?.name || 'Tenancy Agreement',
                    parties: [found.tenantName, found.landlordId || 'Landlord'],
                    rentAmount: found.contracts?.[0]?.rentAmount || 0,
                    tenure: found.contracts?.[0]?.tenure || `${found.financing?.repaymentDuration || 12} Months`,
                    monthlyPayment: found.contracts?.[0]?.monthlyPayment || 0,
                    isSigned: found.contracts?.[0]?.isSigned || false,
                    pdfUrl: found.contracts?.[0]?.pdfUrl || '#'
                },
                activityLog: found.activityLogs?.length ? found.activityLogs : [
                    { id: '1', event: 'Application submitted', actor: found.tenantName, timestamp: found.submittedAt || '', type: 'status' as const },
                    { id: '2', event: `Status updated to ${found.status}`, actor: 'System', timestamp: new Date().toLocaleDateString(), type: 'status' as const },
                ],
                financials: {
                    downPayment: found.calculations?.downPayment || 0,
                    duration: found.calculations?.repaymentDuration || 12,
                    monthlyPayment: found.calculations?.monthlyRent || 0,
                    totalPayable: found.calculations?.propertyPrice || 0
                },
                repayment: {
                    nextAmount: found.calculations?.monthlyRent || 0,
                    nextDueDate: 'Coming Soon',
                    status: 'Upcoming',
                    totalPaid: 0
                }
            });
        }
    }, [applicationId, applications]);

    const isLoading = appsLoading && !application;

    // --- Handlers ---
    const handleUpload = (id: string) => {
        alert(`Upload flow triggered for document ID: ${id}`);
        if (application) {
            const updatedDocs = application.documents.map(doc =>
                doc.id === id ? { ...doc, status: 'In Review' as const, rejectionReason: undefined } : doc
            );
            setApplication({ ...application, documents: updatedDocs });
        }
    };

    const handleSignContract = () => {
        // Contract signing is Coming Soon — navigates to the coming soon page
        window.location.href = `/dashboard/tenant/applications/${applicationId}/contract/coming-soon`;
    };

    const handleContactSupport = () => {
        alert("Opening support chat...");
    };

    // Bank portal flow is Coming Soon — no mock needed

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading application details...</div>;
    }

    if (!application) {
        return <div className="min-h-screen flex items-center justify-center">Application not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <ApplicationStatusHeader
                    applicationId={application.id}
                    propertyName={application.propertyName}
                    propertyAddress={application.propertyAddress}
                />

                {/* Bank Portal — Coming Soon Banner */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        <StatusTimeline timeline={application.timeline} />

                        {/* Bank Activation — Coming Soon */}
                        {application.timeline.find(t => t.title === 'Bank Approval' && t.status === 'Pending') && (
                            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-bold text-gray-900">Bank Portal</h3>
                                            <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">Coming Soon</span>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Our bank integration portal is under development. You will be able to connect directly with our partner banks to activate your loan right here.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <DocumentsEvidenceSection
                            documents={application.documents}
                            onUpload={handleUpload}
                        />

                        <ContractSection
                            contract={application.contract}
                            onSign={handleSignContract}
                        />

                        <RepaymentScheduleSummary schedule={application.repayment} />

                        <ActivityLog logs={application.activityLog} />
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        <StatusSummaryCard
                            status={application.currentStatus}
                            progressPercent={application.progressPercent}
                            lastUpdated={application.lastUpdated}
                            onUploadClick={() => alert('General upload clicked')}
                            onContactSupport={handleContactSupport}
                        />

                        <PropertyQuickCard
                            propertyName={application.propertyName}
                            propertyAddress={application.propertyAddress}
                            propertyImage={application.propertyImage}
                            landlordName={application.landlordName}
                            financials={application.financials}
                        />

                        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-6">
                            <h4 className="text-yellow-800 font-bold text-sm mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Important Notice
                            </h4>
                            <p className="text-xs text-yellow-700">
                                Please ensure your bank statement is clear and legible. Blurred documents will delay your application.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
