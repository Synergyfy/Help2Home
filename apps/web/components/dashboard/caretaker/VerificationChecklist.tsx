'use client';

import React, { useState } from 'react';
import { VerificationChecklist as IVerificationChecklist, ChecklistItem } from '@/lib/mockCaretakerData';
import PhotoUploader from './PhotoUploader';

interface VerificationChecklistProps {
    checklist: IVerificationChecklist;
    onSave: (items: ChecklistItem[]) => void;
    onSubmit: (items: ChecklistItem[]) => void;
}

export default function VerificationChecklist({ checklist, onSave, onSubmit }: VerificationChecklistProps) {
    const [items, setItems] = useState<ChecklistItem[]>(checklist.items);

    const handleStatusChange = (itemId: string, status: ChecklistItem['status']) => {
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, status } : item
        ));
    };

    const handleValueChange = (itemId: string, value: string) => {
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, value } : item
        ));
    };

    const handleNotesChange = (itemId: string, notes: string) => {
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, notes } : item
        ));
    };

    const handlePhotoUpload = (itemId: string, url: string) => {
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, photos: [...(item.photos || []), url] } : item
        ));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Checklist Items</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {items.map(item => (
                        <div key={item.id} className="p-4">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-gray-900">{item.label}</h4>
                                        {item.required && <span className="text-xs text-red-500 font-medium">*Required</span>}
                                    </div>

                                    {/* Input for Number/Text types */}
                                    {(item.type === 'number' || item.type === 'text') && (
                                        <input
                                            type={item.type === 'number' ? 'number' : 'text'}
                                            value={item.value || ''}
                                            onChange={(e) => handleValueChange(item.id, e.target.value)}
                                            placeholder={`Enter ${item.label.toLowerCase()}`}
                                            className="mt-2 w-full md:w-64 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                                        />
                                    )}
                                </div>

                                {/* Pass/Fail Toggles */}
                                <div className="flex bg-gray-100 rounded-lg p-1 self-start">
                                    <button
                                        onClick={() => handleStatusChange(item.id, 'Pass')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${item.status === 'Pass' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Pass
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(item.id, 'Fail')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${item.status === 'Fail' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        Fail
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(item.id, 'N/A')}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${item.status === 'N/A' ? 'bg-gray-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        N/A
                                    </button>
                                </div>
                            </div>

                            {/* Conditional Fields (Notes & Photos) */}
                            {(item.status === 'Fail' || item.type === 'photo' || item.notes || (item.photos && item.photos.length > 0)) && (
                                <div className="pl-4 border-l-2 border-gray-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                        <textarea
                                            value={item.notes || ''}
                                            onChange={(e) => handleNotesChange(item.id, e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none resize-none"
                                            placeholder="Add observations..."
                                        />
                                    </div>
                                    <PhotoUploader
                                        onUpload={(url) => handlePhotoUpload(item.id, url)}
                                        currentPhotos={item.photos}
                                        label="Attachments"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 sticky bottom-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-10">
                <button
                    onClick={() => onSave(items)}
                    className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                    Save Draft
                </button>
                <button
                    onClick={() => onSubmit(items)}
                    className="flex-1 py-3 bg-[#00853E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                    Submit Verification
                </button>
            </div>
        </div>
    );
}
