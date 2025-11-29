import React from 'react';

interface ContractViewerProps {
    pdfUrl: string;
    fileSize: string;
    lastUpdated: string;
}

export default function ContractViewer({ pdfUrl, fileSize, lastUpdated }: ContractViewerProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Contract Document</h3>
                    <p className="text-xs text-gray-500 mt-1">
                        PDF • {fileSize} • Last updated: {lastUpdated}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                    </button>
                </div>
            </div>

            <div className="w-full h-[600px] bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                {/* 
                    In a real implementation, this would be an <iframe src={pdfUrl} /> or a PDF viewer component.
                    For now, we'll use a placeholder since we don't have a real PDF URL.
                */}
                <div className="text-center p-8">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 font-medium">PDF Viewer Placeholder</p>
                    <p className="text-gray-400 text-sm mt-2">The contract PDF would be displayed here.</p>
                    <a href="#" className="text-[#6D28D9] hover:underline text-sm mt-4 inline-block">
                        Click to download PDF
                    </a>
                </div>
            </div>
        </div>
    );
}
