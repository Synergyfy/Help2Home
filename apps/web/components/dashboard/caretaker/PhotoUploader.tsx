'use client';

import React, { useState } from 'react';

interface PhotoUploaderProps {
    onUpload: (url: string) => void;
    label?: string;
    maxPhotos?: number;
    currentPhotos?: string[];
}

export default function PhotoUploader({ onUpload, label = 'Upload Photos', maxPhotos = 5, currentPhotos = [] }: PhotoUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsUploading(true);
            // Simulate upload delay
            setTimeout(() => {
                // In a real app, we would upload the file to a server here
                // For now, we just return a mock URL
                const mockUrl = URL.createObjectURL(e.target.files![0]);
                onUpload(mockUrl);
                setIsUploading(false);
            }, 1000);
        }
    };

    return (
        <div className="space-y-3">
            {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

            <div className="flex flex-wrap gap-3">
                {currentPhotos.map((photo, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group">
                        <img src={photo} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                    </div>
                ))}

                {currentPhotos.length < maxPhotos && (
                    <label className={`
                        w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 
                        cursor-pointer hover:border-[#00853E] hover:bg-green-50 transition-colors
                        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                        {isUploading ? (
                            <svg className="animate-spin h-6 w-6 text-[#00853E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                    </label>
                )}
            </div>
        </div>
    );
}
