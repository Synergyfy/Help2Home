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
import BankRedirectModal from '@/components/dashboard/bank/BankRedirectModal';
import BankInterstitial from '@/components/dashboard/bank/BankInterstitial';
import { initiateBankRedirect, checkBankStatus, manualConfirmBank } from '@/utils/mockBankApi';

export default function ApplicationStatusPage() {
    const params = useParams();
    const applicationId = params.id as string;

    // --- Mock Data ---
    const [application, setApplication] = useState<ApplicationDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setApplication({
                id: applicationId || 'A-000123',
                propertyId: 'prop_123',
                propertyName: 'Sunnyvale Apartments',
                propertyAddress: '15, Admiralty Way, Lekki Phase 1, Lagos',
                propertyImage: '/assets/marketplace assets/Home4.png',
                landlordName: 'Lekki Gardens Ltd',
                currentStatus: 'Under Review',
                progressPercent: 35,
                lastUpdated: 'Mar 3, 2026 at 10:34 AM',
                timeline: [
                    { id: '1', title: 'Application Submitted', status: 'Completed', responsibleParty: 'Tenant', timestamp: 'Mar 1, 2026' },
                    { id: '2', title: 'Under Review', status: 'In Progress', responsibleParty: 'Help2Home', timestamp: 'Mar 2, 2026' },
                    { id: '3', title: 'Bank Approval', status: 'Pending', responsibleParty: 'Bank' },
                    { id: '4', title: 'Funded', status: 'Pending', responsibleParty: 'Bank' },
                    { id: '5', title: 'Active', status: 'Pending', responsibleParty: 'Tenant' },
                    { id: '6', title: 'Completed', status: 'Pending', responsibleParty: 'Tenant' },
                ],
                documents: [
                    { id: '1', type: 'ID', name: 'Government ID', status: 'Verified', fileUrl: '#', size: '2.4 MB' },
                    { id: '2', type: 'Income', name: '3 Months Payslips', status: 'In Review', fileUrl: '#', size: '1.8 MB' },
                    { id: '3', type: 'Statement', name: '3 Months Bank Statement', status: 'Rejected', rejectionReason: 'Image too blurry', size: '5.2 MB' },
                ],
                contract: {
                    id: 'c_123',
                    applicationId: applicationId || 'A-000123',
                    name: 'Tenancy Agreement',
                    parties: ['Mercy Okoli', 'Lekki Gardens Ltd'],
                    rentAmount: 3500000,
                    tenure: '12 Months',
                    monthlyPayment: 291666,
                    isSigned: false,
                    pdfUrl: '#'
                },
                repayment: undefined, // Not active yet
                activityLog: [
                    { id: '1', event: 'Application submitted', actor: 'Mercy Okoli', timestamp: 'Mar 1, 2026 09:00 AM', type: 'status' },
                    { id: '2', event: 'Document "Government ID" verified', actor: 'System', timestamp: 'Mar 1, 2026 10:30 AM', type: 'document' },
                    { id: '3', event: 'Status changed to Under Review', actor: 'Help2Home Admin', timestamp: 'Mar 2, 2026 02:15 PM', type: 'status' },
                    { id: '4', event: 'Document "Bank Statement" rejected', actor: 'Verification Team', timestamp: 'Mar 3, 2026 10:34 AM', type: 'document' },
                ],
                financials: {
                    downPayment: 875000,
                    duration: 12,
                    monthlyPayment: 291666,
                    totalPayable: 3943750
                }
            });
            setIsLoading(false);
        }, 1000);
    }, [applicationId]);

    // --- Handlers ---
    const handleUpload = (id: string) => {
        alert(`Upload flow triggered for document ID: ${id}`);
        // Mock update
        if (application) {
            const updatedDocs = application.documents.map(doc =>
                doc.id === id ? { ...doc, status: 'In Review' as const, rejectionReason: undefined } : doc
            );
            setApplication({ ...application, documents: updatedDocs });
        }
    };

    const handleSignContract = () => {
        alert("Opening e-sign flow...");
        // Mock sign
        if (application && application.contract) {
            setApplication({
                ...application,
                contract: { ...application.contract, isSigned: true }
            });
        }
    };

    const handleContactSupport = () => {
        alert("Opening support chat...");
    };

    // --- Bank Portal Flow ---
    const [bankFlowState, setBankFlowState] = useState<'idle' | 'confirming' | 'waiting' | 'success' | 'error'>('idle');
    const [bankRedirectUrl, setBankRedirectUrl] = useState<string | null>(null);

    // Poll for bank status
    useEffect(() => {
        let pollInterval: NodeJS.Timeout;

        if (bankFlowState === 'waiting') {
            pollInterval = setInterval(async () => {
                try {
                    const { status } = await checkBankStatus(applicationId);
                    if (status === 'success') {
                        setBankFlowState('success');
                        // Update application status
                        if (application) {
                            setApplication(prev => prev ? ({
                                ...prev,
                                currentStatus: 'Active',
                                timeline: prev.timeline.map(t =>
                                    t.title === 'Bank Approval' ? { ...t, status: 'Completed', timestamp: new Date().toLocaleDateString() } :
                                        t.title === 'Funded' ? { ...t, status: 'Completed', timestamp: new Date().toLocaleDateString() } :
                                            t.title === 'Active' ? { ...t, status: 'In Progress' } : t
                                )
                            }) : null);
                        }
                    } else if (status === 'failed') {
                        setBankFlowState('error');
                    }
                } catch (error) {
                    console.error("Polling error:", error);
                }
            }, 3000); // Poll every 3 seconds
        }

        return () => clearInterval(pollInterval);
    }, [bankFlowState, applicationId, application]);

    const handleActivateLoan = () => {
        setBankFlowState('confirming');
    };

    const handleConfirmRedirect = async () => {
        try {
            const { redirectUrl } = await initiateBankRedirect(applicationId);
            setBankRedirectUrl(redirectUrl);
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
            setBankFlowState('waiting');
        } catch (error) {
            console.error("Redirect error:", error);
            alert("Failed to initiate bank session. Please try again.");
        }
    };

    const handleManualCheck = async () => {
        try {
            const { status } = await manualConfirmBank(applicationId);
            if (status === 'success') {
                setBankFlowState('success');
                // Update application status
                if (application) {
                    setApplication(prev => prev ? ({
                        ...prev,
                        currentStatus: 'Active',
                        timeline: prev.timeline.map(t =>
                            t.title === 'Bank Approval' ? { ...t, status: 'Completed', timestamp: new Date().toLocaleDateString() } :
                                t.title === 'Funded' ? { ...t, status: 'Completed', timestamp: new Date().toLocaleDateString() } :
                                    t.title === 'Active' ? { ...t, status: 'In Progress' } : t
                        )
                    }) : null);
                }
            } else {
                alert("Bank confirmation not received yet. Please try again in a moment.");
            }
        } catch (error) {
            console.error("Manual check error:", error);
            alert("Error checking status.");
        }
    };

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

                {/* Bank Flow Components */}
                <BankRedirectModal
                    isOpen={bankFlowState === 'confirming'}
                    onClose={() => setBankFlowState('idle')}
                    onConfirm={handleConfirmRedirect}
                    bankName="Access Bank"
                />

                {bankFlowState === 'waiting' && (
                    <BankInterstitial
                        bankName="Access Bank"
                        onManualCheck={handleManualCheck}
                        onReopenBank={() => bankRedirectUrl && window.open(bankRedirectUrl, '_blank', 'noopener,noreferrer')}
                        onContactSupport={handleContactSupport}
                    />
                )}

                {bankFlowState === 'success' && (
                    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                            <p className="font-bold">Loan Activated!</p>
                            <p className="text-sm text-green-100">Your application is now active.</p>
                        </div>
                        <button onClick={() => setBankFlowState('idle')} className="ml-4 hover:bg-green-600 p-1 rounded">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        <StatusTimeline timeline={application.timeline} />

                        {/* Bank Activation CTA - Show only if Bank Approval is pending */}
                        {application.timeline.find(t => t.title === 'Bank Approval' && t.status === 'Pending') && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Activate your loan</h3>
                                        <p className="text-gray-600 mb-4">
                                            Your application is approved! Connect with our partner bank to activate your loan and finalize the process.
                                        </p>
                                        <button
                                            onClick={handleActivateLoan}
                                            className="px-6 py-3 bg-[#6D28D9] text-white font-bold rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                                        >
                                            Open bank portal
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </button>
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
