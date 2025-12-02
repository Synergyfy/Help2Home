'use client';

import React from 'react';
import { Contract, Signer } from '@/lib/mockContractData';
import { format } from 'date-fns';

interface ContractDetailProps {
    contract: Contract;
    onSendForSignature: () => void;
    onDownload: () => void;
}

export default function ContractDetail({ contract, onSendForSignature, onDownload }: ContractDetailProps) {
    const getSignerStatusColor = (status: Signer['status']) => {
        switch (status) {
            case 'Signed': return 'text-green-600 bg-green-50 border-green-100';
            case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
            case 'Viewed': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'Declined': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Preview Placeholder */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-medium text-gray-900">Contract Preview</h3>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-500 hover:bg-white rounded-lg transition-colors" title="Zoom Out">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="py-2 text-sm text-gray-500">100%</span>
                            <button className="p-2 text-gray-500 hover:bg-white rounded-lg transition-colors" title="Zoom In">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center">
                        <div className="bg-white shadow-lg w-full max-w-2xl h-[500px] p-12 flex flex-col items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-lg font-medium">PDF Preview Unavailable</p>
                            <p className="text-sm mt-2">This is a mock preview. In a real application, the PDF would be rendered here.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar - Metadata & Actions */}
            <div className="space-y-6">
                {/* Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Actions</h3>
                    <div className="space-y-3">
                        {contract.status === 'Draft' && (
                            <button
                                onClick={onSendForSignature}
                                className="w-full py-2.5 bg-[#00853E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Send for Signature
                            </button>
                        )}
                        <button
                            onClick={onDownload}
                            className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Signers */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Signers</h3>
                    <div className="space-y-4">
                        {contract.signers.map((signer, index) => (
                            <div key={signer.id} className="relative pl-6 pb-4 border-l-2 border-gray-100 last:pb-0">
                                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${signer.status === 'Signed' ? 'border-green-500' : 'border-gray-300'
                                    }`}></div>
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-gray-900">{signer.name}</p>
                                            <p className="text-xs text-gray-500">{signer.role}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded border ${getSignerStatusColor(signer.status)}`}>
                                            {signer.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{signer.email}</p>
                                    {signer.signedAt && (
                                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Signed {format(new Date(signer.signedAt), 'MMM d, HH:mm')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Contract Details</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Property</span>
                            <span className="text-gray-900 font-medium text-right">{contract.propertyTitle}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Start Date</span>
                            <span className="text-gray-900 font-medium">{format(new Date(contract.fields.startDate), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Rent</span>
                            <span className="text-gray-900 font-medium">₦{contract.fields.rentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Frequency</span>
                            <span className="text-gray-900 font-medium">{contract.fields.paymentFrequency}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Created</span>
                            <span className="text-gray-900 font-medium">{format(new Date(contract.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
