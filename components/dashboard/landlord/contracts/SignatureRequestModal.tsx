'use client';

import React, { useState } from 'react';
import { Signer } from '@/lib/mockContractData';

interface SignatureRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: (data: { signers: Signer[]; message: string; deadline?: string }) => void;
    signers: Signer[];
}

export default function SignatureRequestModal({ isOpen, onClose, onSend, signers }: SignatureRequestModalProps) {
    const [message, setMessage] = useState('Please review and sign the attached tenancy agreement.');
    const [deadline, setDeadline] = useState('');
    const [isSending, setIsSending] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        // Simulate API call
        setTimeout(() => {
            onSend({ signers, message, deadline });
            setIsSending(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Send for Signature</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Signers List */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            {signers.map((signer, index) => (
                                <div key={signer.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900">{signer.name}</span>
                                            <span className="text-gray-500 ml-1">({signer.role})</span>
                                        </div>
                                    </div>
                                    <span className="text-gray-500">{signer.email}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message to Signers</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none resize-none"
                            placeholder="Add a personal message..."
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Signing Deadline (Optional)</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            disabled={isSending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-[#00853E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            disabled={isSending}
                        >
                            {isSending ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                'Send Request'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
