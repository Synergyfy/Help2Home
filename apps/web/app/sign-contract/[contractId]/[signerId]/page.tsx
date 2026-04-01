'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useContractStore } from '@/store/contractStore';
import { Signer } from '@/lib/mockContractData';
import { FiCheckCircle, FiXCircle, FiLoader, FiUpload, FiEdit2 } from 'react-icons/fi';
import Link from 'next/link';

export default function SignContractPage() {
    const params = useParams();
    const router = useRouter();
    const contractId = params.contractId as string;
    const signerId = params.signerId as string;

    const { contracts, updateSignerStatus } = useContractStore();
    const contract = contracts.find(c => c.id === contractId);
    const signer = contract?.signers.find(s => s.id === signerId);

    const [isSigned, setIsSigned] = useState(false);
    const [signatureText, setSignatureText] = useState('');
    const [selectedSignatureFile, setSelectedSignatureFile] = useState<File | null>(null);
    const [signatureMethod, setSignatureMethod] = useState<'typed' | 'uploaded'>(signer?.signatureMethod || 'typed');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (signer?.status === 'Signed') {
            setIsSigned(true);
            setSignatureMethod(signer.signatureMethod || 'typed');
            if (signer.signatureMethod === 'typed') {
                setSignatureText(signer.signatureContent || '');
            } else {
                // For uploaded, we just show it's signed, actual file isn't persisted for mock
            }
        }
    }, [signer]);

    if (!contract || !signer) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <FiXCircle className="text-red-500 w-16 h-16 mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Contract or Signer Not Found</h1>
                <p className="text-gray-600 text-center">
                    The contract you are trying to sign does not exist or the signer ID is invalid.
                </p>
                <Link href="/" className="mt-6 text-brand-green hover:underline">Go to Homepage</Link>
            </div>
        );
    }

    const handleSignContract = async () => {
        setError('');
        let contentToSave: string | undefined;

        if (signatureMethod === 'typed') {
            if (!signatureText.trim()) {
                setError('Please provide a typed signature to confirm.');
                return;
            }
            contentToSave = signatureText.trim();
        } else if (signatureMethod === 'uploaded') {
            if (!selectedSignatureFile) {
                setError('Please upload a signature file.');
                return;
            }
            contentToSave = `[Uploaded: ${selectedSignatureFile.name}]`; // Mock content for uploaded
        } else {
            setError('Please select a signature method.');
            return;
        }
        
        setLoading(true);

        // Simulate API call to update signature status
        await new Promise(resolve => setTimeout(resolve, 1500));

        updateSignerStatus(contract.id, signer.id, 'Signed', new Date().toISOString(), signatureMethod, contentToSave);
        setIsSigned(true);
        setLoading(false);
    };

    const handleBackToDashboard = () => {
        router.push(`/dashboard/landlord/contracts/${contract.id}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden p-8">
                <div className="text-center mb-8">
                    {isSigned ? (
                        <FiCheckCircle className="text-green-500 w-20 h-20 mx-auto mb-4" />
                    ) : (
                        <FiLoader className="text-brand-green w-20 h-20 mx-auto mb-4 animate-pulse" />
                    )}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {isSigned ? 'Contract Signed Successfully!' : 'Sign Your Contract'}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {isSigned ? 'Thank you for signing.' : 'Please review the details below and provide your signature.'}
                    </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 mb-8 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">{contract.title}</h2>
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Property:</span> {contract.propertyTitle} ({contract.propertyAddress})
                    </p>
                    <p className="text-gray-700 mb-2">
                        <span className="font-medium">Signing as:</span> {signer.name} ({signer.role})
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Status:</span>{' '}
                        <span className={`font-semibold ${signer.status === 'Signed' ? 'text-green-600' : 'text-orange-500'}`}>
                            {signer.status}
                        </span>
                    </p>
                </div>

                {!isSigned && (
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Signature Method:
                        </label>
                        <div className="flex gap-4 mb-4">
                            <button
                                type="button"
                                onClick={() => setSignatureMethod('typed')}
                                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                    signatureMethod === 'typed'
                                        ? 'bg-brand-green text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                disabled={loading}
                            >
                                <FiEdit2 /> Type Signature
                            </button>
                            <button
                                type="button"
                                onClick={() => setSignatureMethod('uploaded')}
                                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                                    signatureMethod === 'uploaded'
                                        ? 'bg-brand-green text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                disabled={loading}
                            >
                                <FiUpload /> Upload Signature
                            </button>
                        </div>

                        {signatureMethod === 'typed' && (
                            <div>
                                <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2">
                                    Type your full name as signature:
                                </label>
                                <input
                                    type="text"
                                    id="signature"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-green focus:border-brand-green outline-none"
                                    value={signatureText}
                                    onChange={(e) => {
                                        setSignatureText(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="e.g., John Doe"
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {signatureMethod === 'uploaded' && (
                            <div>
                                <label htmlFor="signature-upload" className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload your signature image:
                                </label>
                                <input
                                    type="file"
                                    id="signature-upload"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-brand-green/10 file:text-brand-green
                                    hover:file:bg-brand-green/20"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setSelectedSignatureFile(e.target.files[0]);
                                            setError('');
                                        }
                                    }}
                                    disabled={loading}
                                />
                                {selectedSignatureFile && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        Selected file: <span className="font-medium">{selectedSignatureFile.name}</span>
                                    </p>
                                )}
                            </div>
                        )}
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                )}

                <div className="flex justify-center gap-4">
                    {isSigned ? (
                        <button
                            onClick={handleBackToDashboard}
                            className="px-6 py-3 bg-brand-green text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                        >
                            Back to Contract Details
                        </button>
                    ) : (
                        <button
                            onClick={handleSignContract}
                            className="px-6 py-3 bg-brand-green text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                            disabled={loading || (signatureMethod === 'typed' && !signatureText.trim()) || (signatureMethod === 'uploaded' && !selectedSignatureFile)}
                        >
                            {loading ? (
                                <FiLoader className="animate-spin mr-2" />
                            ) : (
                                <FiCheckCircle className="mr-2" />
                            )}
                            {loading ? 'Signing...' : 'Confirm Signature'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
