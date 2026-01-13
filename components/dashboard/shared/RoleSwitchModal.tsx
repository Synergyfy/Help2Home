'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface RoleSwitchModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetRole: string;
    onConfirmSwitch: (shouldRedirect: boolean) => void;
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
                    <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize text-center mb-4">
                        Switch Perspective
                    </h3>

                    <div className="mt-2 text-center">
                        <div className="size-16 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-black uppercase">{targetRole.charAt(0)}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Switching to <strong>{targetRole}</strong>. How would you like to proceed?
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                        <button
                            type="button"
                            className="inline-flex justify-center items-center gap-2 rounded-xl bg-brand-green px-5 py-4 text-sm font-bold text-white shadow-lg shadow-brand-green/20 hover:bg-green-700 transition-all active:scale-[0.98]"
                            onClick={() => onConfirmSwitch(true)}
                        >
                            Switch & Go to Dashboard
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center items-center gap-2 rounded-xl bg-gray-50 px-5 py-4 text-sm font-bold text-gray-700 border border-gray-100 hover:bg-gray-100 transition-all active:scale-[0.98]"
                            onClick={() => onConfirmSwitch(false)}
                        >
                            Switch & Stay on this Page
                        </button>

                        <div className="h-px bg-gray-100 my-2"></div>

                        <button
                            type="button"
                            className="inline-flex justify-center rounded-lg px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 focus:outline-none"
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
