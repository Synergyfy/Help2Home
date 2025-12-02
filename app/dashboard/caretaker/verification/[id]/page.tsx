'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_CHECKLISTS, ChecklistItem } from '@/lib/mockCaretakerData';
import VerificationChecklist from '@/components/dashboard/caretaker/VerificationChecklist';

export default function VerificationPage() {
    const params = useParams();
    const router = useRouter();
    const checklistId = params.id as string;
    const checklist = MOCK_CHECKLISTS.find(c => c.id === checklistId);

    if (!checklist) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900">Checklist Not Found</h2>
                <Link href="/dashboard/caretaker" className="text-[#00853E] hover:underline mt-4 inline-block">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    const handleSave = (items: ChecklistItem[]) => {
        console.log('Saving draft:', items);
        alert('Draft saved successfully!');
    };

    const handleSubmit = (items: ChecklistItem[]) => {
        console.log('Submitting verification:', items);

        // Validate required fields
        const missingRequired = items.filter(item => item.required && item.status === 'Pending');
        if (missingRequired.length > 0) {
            alert(`Please complete all required items: ${missingRequired.map(i => i.label).join(', ')}`);
            return;
        }

        // Validate failed items have photos/notes
        const failedWithoutReason = items.filter(item =>
            item.status === 'Fail' && (!item.notes && (!item.photos || item.photos.length === 0))
        );
        if (failedWithoutReason.length > 0) {
            alert('Please add notes or photos for failed items.');
            return;
        }

        alert('Verification submitted successfully!');
        router.push('/dashboard/caretaker');
    };

    return (
        <div className="pb-20 max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link href="/dashboard/caretaker" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {checklist.type === 'move-in' ? 'Move-In Verification' : 'Move-Out Verification'}
                        </h1>
                        <p className="text-gray-500">{checklist.propertyTitle} {checklist.unit ? `• Unit ${checklist.unit}` : ''}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {checklist.status}
                    </span>
                </div>
            </div>

            <VerificationChecklist
                checklist={checklist}
                onSave={handleSave}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
