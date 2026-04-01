'use client';

import React from 'react';

export default function PDFPreview() {
    return (
        <div className="bg-gray-100 p-8 flex items-center justify-center min-h-[400px] rounded-lg border border-gray-200">
            <div className="bg-white shadow-lg w-full max-w-2xl aspect-[1/1.414] p-12 flex flex-col items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium">Contract Preview</p>
                <p className="text-sm mt-2 text-center max-w-xs">
                    This is a placeholder for the generated contract PDF. In a production environment, the PDF would be rendered here.
                </p>
            </div>
        </div>
    );
}
