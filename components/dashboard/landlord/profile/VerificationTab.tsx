'use client';

import { VerificationDocument } from '@/lib/mockLandlordData';

export default function VerificationTab({ documents }: { documents: VerificationDocument[] }) {
    const completedCount = documents.filter(d => d.status === 'approved').length;
    const totalCount = documents.length;
    const progress = (completedCount / totalCount) * 100;

    return (
        <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Verification Progress</h3>
                        <p className="text-sm text-gray-500">Complete all steps to verify your account.</p>
                    </div>
                    <span className="text-sm font-bold text-[#00853E]">{completedCount} of {totalCount} complete</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-[#00853E] h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Required Documents</h3>
                </div>

                <div className="divide-y divide-gray-100">
                    {documents.map((doc) => (
                        <div key={doc.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.status === 'approved' ? 'bg-green-100 text-green-600' :
                                        doc.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                            doc.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                                                'bg-gray-100 text-gray-400'
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">{doc.label}</h4>
                                    {doc.filename ? (
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            {doc.filename}
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            {doc.uploadedAt}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-500">Accepted: jpg, png, pdf (Max 10MB)</p>
                                    )}

                                    {doc.status === 'rejected' && (
                                        <p className="text-sm text-red-600 mt-1">
                                            Reason: {doc.rejectionReason || 'Document unclear or expired.'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {doc.status === 'approved' ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Approved
                                    </span>
                                ) : doc.status === 'pending' ? (
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                                        Under Review
                                    </span>
                                ) : doc.status === 'rejected' ? (
                                    <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
                                        Re-upload
                                    </button>
                                ) : (
                                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                        Upload
                                    </button>
                                )}

                                {doc.filename && (
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
