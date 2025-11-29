import React from 'react';
import Link from 'next/link';
import { ContractDetails } from './types';

interface ContractSectionProps {
    contract?: ContractDetails;
    onSign: () => void;
}

export default function ContractSection({ contract, onSign }: ContractSectionProps) {
    if (!contract) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Contract & Agreements</h3>
                {contract.isSigned && (
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Signed
                    </span>
                )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-500 flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>

                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{contract.name}</h4>
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs uppercase">Monthly Rent</p>
                                <p className="font-medium">₦ {contract.monthlyPayment.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs uppercase">Tenure</p>
                                <p className="font-medium">{contract.tenure}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                    <Link
                        href={`/dashboard/tenant/applications/${contract.applicationId}/contract/${contract.id}`}
                        className="flex-1 py-2 text-center bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                        View Contract
                    </Link>
                    {!contract.isSigned ? (
                        <button
                            onClick={onSign}
                            className="flex-1 py-2 text-center bg-[#6D28D9] text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                            Sign Contract
                        </button>
                    ) : (
                        <a
                            href={contract.pdfUrl}
                            download
                            className="flex-1 py-2 text-center bg-[#6D28D9] text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                            Download Signed Copy
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
