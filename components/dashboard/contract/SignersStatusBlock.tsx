import React from 'react';
import { ContractSigner } from './types';

interface SignersStatusBlockProps {
    signers: ContractSigner[];
    onSign: () => void;
}

export default function SignersStatusBlock({ signers, onSign }: SignersStatusBlockProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Signatures</h3>

            <div className="space-y-4">
                {signers.map((signer) => (
                    <div key={signer.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${signer.status === 'Signed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                                }`}>
                                {signer.status === 'Signed' ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span>{signer.name.charAt(0)}</span>
                                )}
                            </div>

                            <div>
                                <p className="font-bold text-gray-900">{signer.name}</p>
                                <p className="text-xs text-gray-500">{signer.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {signer.status === 'Signed' ? (
                                <div className="text-right">
                                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded mb-1">
                                        Signed
                                    </span>
                                    <p className="text-xs text-gray-500">{signer.signedAt}</p>
                                </div>
                            ) : (
                                <div className="text-right">
                                    <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded mb-1">
                                        Pending
                                    </span>
                                </div>
                            )}

                            {signer.role === 'Tenant' && signer.status === 'Pending' && (
                                <button
                                    onClick={onSign}
                                    disabled={!signer.canSign}
                                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors ${signer.canSign
                                            ? 'bg-[#6D28D9] text-white hover:bg-purple-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Sign Contract
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Helper message if waiting for others */}
            {signers.some(s => s.role === 'Tenant' && s.status === 'Pending' && !s.canSign) && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Waiting for bank signature. You will be notified when it's your turn to sign.</p>
                </div>
            )}
        </div>
    );
}
