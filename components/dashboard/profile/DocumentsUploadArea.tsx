import React, { useState } from 'react';
import { DocumentItem } from './types';

interface DocumentsUploadAreaProps {
    documents: DocumentItem[];
    onUpload: (id: string, file: File) => void;
    onRemove: (id: string) => void;
}

export default function DocumentsUploadArea({ documents, onUpload, onRemove }: DocumentsUploadAreaProps) {
    const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(id, file);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">Documents</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Upload the documents we need to verify your identity and income. Accepted: JPG, PNG, PDF. Max 10MB each.
                </p>
            </div>

            <div className="space-y-6">
                {documents.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-bold text-gray-900">{doc.name}</h4>
                                {doc.status === 'Rejected' && (
                                    <p className="text-xs text-red-500 mt-1">{doc.rejectionReason}</p>
                                )}
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' :
                                doc.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                    doc.status === 'In Review' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-600'
                                }`}>
                                {doc.status}
                            </span>
                        </div>

                        {doc.status === 'Pending' || doc.status === 'Rejected' ? (
                            <div className="mt-4">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500">JPG, PNG or PDF (MAX. 10MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => handleFileChange(doc.id, e)}
                                    />
                                </label>
                            </div>
                        ) : (
                            <div className="mt-4 flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">Document uploaded</p>
                                    <p className="text-xs text-gray-500">2.4 MB</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-sm text-[#6D28D9] hover:underline">View</button>
                                    {doc.status !== 'Verified' && (
                                        <button
                                            onClick={() => onRemove(doc.id)}
                                            className="text-sm text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
