'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ContractHeader from '@/components/dashboard/contract/ContractHeader';
import ContractSummaryCard from '@/components/dashboard/contract/ContractSummaryCard';
import ContractViewer from '@/components/dashboard/contract/ContractViewer';
import SignersStatusBlock from '@/components/dashboard/contract/SignersStatusBlock';
import AuditTrail from '@/components/dashboard/contract/AuditTrail';
import HelpLegalInfo from '@/components/dashboard/contract/HelpLegalInfo';
import { ContractData } from '@/components/dashboard/contract/types';

export default function ContractPage() {
    const params = useParams();
    const applicationId = params.id as string;
    const contractId = params.contractId as string;

    const [contract, setContract] = useState<ContractData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setContract({
                id: contractId || 'c_123',
                title: 'Tenancy Agreement',
                applicationId: applicationId || 'A-000123',
                propertyTitle: 'Sunnyvale Apartments',
                propertyAddress: '15, Admiralty Way, Lekki Phase 1, Lagos',
                summary: {
                    rentAmount: 3500000,
                    contractType: 'Tenancy',
                    tenure: '12 Months',
                    monthlyRepayment: 291666,
                    downPayment: 875000,
                    interestRate: 0,
                    penalty: '5% flat fee',
                    startDate: 'Apr 1, 2026',
                    nextPayment: 'May 1, 2026 (₦ 291,666)'
                },
                pdfUrl: '#',
                fileSize: '2.4 MB',
                lastUpdated: 'Mar 3, 2026 at 10:34 AM',
                signers: [
                    { id: 's1', name: 'Mercy Okoli', role: 'Tenant', status: 'Pending', canSign: true },
                    { id: 's2', name: 'Lekki Gardens Ltd', role: 'Landlord', status: 'Pending', canSign: false },
                    { id: 's3', name: 'Help2Home', role: 'Help2Home', status: 'Signed', signedAt: 'Mar 3, 2026', canSign: false }
                ],
                audit: {
                    createdDate: 'Mar 3, 2026',
                    version: '1.0',
                    lastModifiedBy: 'System'
                }
            });
            setIsLoading(false);
        }, 1000);
    }, [applicationId, contractId]);

    const handleSign = () => {
        if (!contract) return;

        const confirmSign = window.confirm("By clicking OK, you agree to electronically sign this contract.");
        if (confirmSign) {
            // Mock signing process
            const updatedSigners = contract.signers.map(s =>
                s.role === 'Tenant'
                    ? { ...s, status: 'Signed' as const, signedAt: new Date().toLocaleDateString() }
                    : s
            );
            setContract({ ...contract, signers: updatedSigners });
            alert("Contract signed successfully!");
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading contract...</div>;
    }

    if (!contract) {
        return <div className="min-h-screen flex items-center justify-center">Contract not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <ContractHeader
                    applicationId={contract.applicationId}
                    contractTitle={contract.title}
                    propertyTitle={contract.propertyTitle}
                />

                <ContractSummaryCard summary={contract.summary} />

                <ContractViewer
                    pdfUrl={contract.pdfUrl}
                    fileSize={contract.fileSize}
                    lastUpdated={contract.lastUpdated}
                />

                <SignersStatusBlock
                    signers={contract.signers}
                    onSign={handleSign}
                />

                <AuditTrail audit={contract.audit} />

                <HelpLegalInfo />
            </div>
        </div>
    );
}
