'use client';

import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-xl relative animate-scale-up text-center">
                <div className="w-20 h-20 bg-[#00853E] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">We Have Received Your Mail</h2>
                <p className="text-gray-500 mb-8">We will reply in your email</p>

                <button
                    onClick={onClose}
                    className="bg-[#00853E] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#006c32] transition-colors"
                >
                    Continue Viewing
                </button>
            </div>
        </div>
    );
}
