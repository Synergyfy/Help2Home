import React from 'react';
import { ApplicationDocument } from './types';

interface ApplicationDocumentsProps {
    documents: ApplicationDocument[];
    onUpload: (id: string, file: File) => void;
    onRemove: (id: string) => void;
}

export default function ApplicationDocuments({ documents, onUpload, onRemove }: ApplicationDocumentsProps) {
    const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(id, file);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Required Documents</h3>
            <p className="text-sm text-gray-500 mb-6">
                Please upload the following documents to support your application. Accepted formats: JPG, PNG, PDF. Max size: 10MB.
            </p>

            <div className="space-y-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-gray-900">{doc.name}</h4>
                                <p className="text-xs text-gray-500">{doc.type}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${doc.status === 'Uploaded' ? 'bg-green-100 text-green-700' :
                                doc.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                {doc.status}
                            </span>
                        </div>

                        {doc.status === 'Pending' || doc.status === 'Rejected' ? (
                            <div className="mt-3">
                                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <span className="text-sm text-[#6D28D9] font-medium">Upload File</span>
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
                            <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{doc.file?.name || 'Document.pdf'}</p>
                                        <p className="text-xs text-gray-500">{(doc.size ? (doc.size / 1024 / 1024).toFixed(2) : '2.4')} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onRemove(doc.id)}
                                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
