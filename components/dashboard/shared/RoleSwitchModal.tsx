'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface RoleSwitchModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetRole: string;
    onConfirmSwitch: () => void;
}

export default function RoleSwitchModal({ isOpen, onClose, targetRole, onConfirmSwitch }: RoleSwitchModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/25 transition-opacity"
                onClick={onClose}
            />

            <div className="flex min-h-full items-center justify-center p-4 text-center">
                {/* Modal Panel */}
                <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">
                        Switch to {targetRole} View
                    </h3>

                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            You are about to switch your dashboard context to <strong>{targetRole}</strong>.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            If this is your first time, you may need to complete your profile onboarding.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-lg border border-transparent bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            onClick={onConfirmSwitch}
                        >
                            Switch Dashboard
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                            onClick={() => {
                                router.push('/onboarding?role=' + targetRole);
                                onClose();
                            }}
                        >
                            Go to Onboarding (Setup Profile)
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
