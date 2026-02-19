'use client';

import React, { useState, useEffect } from 'react';
import { HiOutlineDocumentText, HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi2';

interface ContractContentEditorProps {
    content: string;
    onSave: (newContent: string) => void;
    onBack: () => void;
    title: string;
}

export default function ContractContentEditor({ content, onSave, onBack, title }: ContractContentEditorProps) {
    const [editableContent, setEditableContent] = useState(content);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Review & Edit Content</h2>
                    <p className="text-sm text-gray-500 font-medium">Finalize the legal text before generating the PDF.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
                    >
                        <HiOutlineArrowLeft /> Back
                    </button>
                    <button
                        onClick={() => onSave(editableContent)}
                        className="px-6 py-2 bg-brand-green text-white rounded-xl text-sm font-black flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-900/10"
                    >
                        <HiOutlineCheck /> Finalize & Save
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <HiOutlineDocumentText size={18} />
                    </div>
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{title}</span>
                </div>

                <div className="p-12 bg-[#F3F4F6] flex justify-center min-h-[600px]">
                    <div className="w-full max-w-[800px] bg-white shadow-2xl p-16 min-h-[1000px] relative overflow-hidden ring-1 ring-gray-200">
                        {/* Paper texture overlay */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

                        <textarea
                            value={editableContent}
                            onChange={(e) => setEditableContent(e.target.value)}
                            className="w-full h-full min-h-[900px] border-none focus:ring-0 resize-none text-gray-800 font-serif leading-relaxed text-sm p-0 bg-transparent placeholder:italic"
                            placeholder="Write your contract content here..."
                        />
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4">
                <div className="size-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-sm font-black text-amber-800 uppercase tracking-wider mb-1">Editing Tips</h4>
                    <p className="text-xs text-amber-700 font-medium leading-relaxed">
                        This is a plain text editor. You can manually adjust any clauses, add signatures placeholders, or remove unnecessary sections.
                        The generated PDF will preserve your manual edits exactly as shown here.
                    </p>
                </div>
            </div>
        </div>
    );
}
