'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CONTRACTS, Signer } from '@/lib/mockContractData';
import ContractDetail from '@/components/dashboard/landlord/contracts/ContractDetail';
import SignatureRequestModal from '@/components/dashboard/landlord/contracts/SignatureRequestModal';

export default function ContractDetailPage() {
    const params = useParams();
    const router = useRouter();
    const contractId = params.id as string;
    const contract = MOCK_CONTRACTS.find(c => c.id === contractId);

    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

    if (!contract) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900">Contract Not Found</h2>
                <p className="text-gray-500 mt-2">The contract you are looking for does not exist.</p>
                <Link href="/dashboard/landlord/contracts" className="text-[#00853E] hover:underline mt-4 inline-block">
                    Back to Contracts
                </Link>
            </div>
        );
    }

    const handleSendForSignature = (data: { signers: Signer[]; message: string; deadline?: string }) => {
        console.log('Sending for signature:', data);
        // In a real app, this would call an API
        alert(`Signature request sent to ${data.signers.length} recipients.`);
    };

    const handleDownload = () => {
        console.log('Downloading PDF...');
        alert('Downloading contract PDF...');
    };

    return (
        <div className="pb-20">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Link href="/dashboard/landlord/contracts" className="hover:text-gray-900">Contracts</Link>
                    <span>/</span>
                    <span className="text-gray-900">{contract.id}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{contract.title}</h1>
                        <p className="text-gray-500">{contract.propertyTitle}</p>
                    </div>
                    <div className="flex gap-2">
                        {contract.status === 'Draft' && (
                            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                Edit Contract
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ContractDetail
                contract={contract}
                onSendForSignature={() => setIsSignatureModalOpen(true)}
                onDownload={handleDownload}
            />

            <SignatureRequestModal
                isOpen={isSignatureModalOpen}
                onClose={() => setIsSignatureModalOpen(false)}
                onSend={handleSendForSignature}
                signers={contract.signers}
            />
        </div>
    );
}
