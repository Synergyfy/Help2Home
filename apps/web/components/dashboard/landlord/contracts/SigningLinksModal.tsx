'use client';

import React from 'react';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

interface SigningLinksModalProps {
    isOpen: boolean;
    onClose: () => void;
    mockSigningLinks: { name: string; url: string }[];
}

export default function SigningLinksModal({ isOpen, onClose, mockSigningLinks }: SigningLinksModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Signature Request Sent!</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4 text-center">
                    <FiCheckCircle className="text-green-500 w-16 h-16 mx-auto" />
                    <p className="text-gray-700 text-lg font-medium">
                        Your signature requests have been successfully prepared.
                    </p>
                    <p className="text-sm text-gray-500">
                        In a real scenario, these links would be sent via email. For testing purposes, you can use the links below to simulate the signing process.
                    </p>
                </div>

                <div className="bg-gray-50 p-6 border-t border-gray-100">
                    <p className="font-semibold text-gray-800 mb-3">Mock Signing Links:</p>
                    <ul className="space-y-2">
                        {mockSigningLinks.map((link, index) => (
                            <li key={index} className="flex items-center text-sm">
                                <span className="text-gray-700 mr-2">{link.name}:</span>
                                <Link
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-green hover:underline break-all"
                                    onClick={onClose} // Close modal when link is clicked
                                >
                                    {link.url}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
