import React from 'react';
import { ApplicationDocument } from './types';

interface DocumentsEvidenceSectionProps {
    documents: ApplicationDocument[];
    onUpload: (id: string) => void;
}

export default function DocumentsEvidenceSection({ documents, onUpload }: DocumentsEvidenceSectionProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Documents & Evidence</h3>

            <div className="space-y-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900">{doc.name}</h4>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">{doc.type}</span>
                                    {doc.size && <span className="text-xs text-gray-400">• {doc.size}</span>}
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' :
                                            doc.status === 'In Review' ? 'bg-blue-100 text-blue-700' :
                                                doc.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-gray-100 text-gray-600'
                                        }`}>
                                        {doc.status}
                                    </span>
                                </div>
                                {doc.rejectionReason && (
                                    <p className="text-xs text-red-600 mt-1">Reason: {doc.rejectionReason}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {doc.fileUrl && (
                                <a
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                                >
                                    View
                                </a>
                            )}

                            {doc.status === 'Rejected' || doc.status === 'Pending' ? (
                                <button
                                    onClick={() => onUpload(doc.id)}
                                    className="px-3 py-1.5 text-sm font-medium text-[#6D28D9] bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                                >
                                    {doc.status === 'Rejected' ? 'Upload Again' : 'Upload'}
                                </button>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
