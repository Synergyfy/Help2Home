'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BulkUploadPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        // Simulate upload
        setTimeout(() => {
            setIsUploading(false);
            setUploadStatus('success');
        }, 2000);
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <div className="mb-8">
                <Link href="/dashboard/landlord/properties" className="text-gray-500 hover:text-gray-700 text-sm mb-2 inline-block">
                    ← Back to Properties
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Bulk Upload Properties</h1>
                <p className="text-gray-500">Upload multiple listings at once using a CSV file.</p>
            </div>

            <div className="space-y-6">
                {/* Step 1: Download Template */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">1. Download Template</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                Get the CSV template with all required columns and example data.
                            </p>
                            <button className="text-[#00853E] font-medium hover:underline flex items-center gap-2">
                                Download properties_template.csv
                            </button>
                        </div>
                    </div>
                </div>

                {/* Step 2: Upload */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-lg text-[#00853E]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">2. Upload CSV & Images</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                Upload your filled CSV file. You can also upload a ZIP file containing images referenced in the CSV.
                            </p>

                            <form onSubmit={handleUpload} className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                    <input type="file" className="hidden" id="csv-upload" accept=".csv" />
                                    <label htmlFor="csv-upload" className="cursor-pointer">
                                        <p className="text-gray-900 font-medium">Click to upload CSV</p>
                                        <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="w-full py-3 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium transition-colors disabled:opacity-50"
                                >
                                    {isUploading ? 'Uploading...' : 'Start Import'}
                                </button>
                            </form>

                            {uploadStatus === 'success' && (
                                <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Import successful! 12 properties added.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
