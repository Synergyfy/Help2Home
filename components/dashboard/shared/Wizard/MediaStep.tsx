'use client';

import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { toast } from 'react-toastify';

interface ImageItem {
    id: string;
    url: string;
    isPrimary: boolean;
    file?: File;
}

interface VideoItem {
    id: string;
    url: string;
    file?: File;
    thumbnail?: string;
}

interface MediaStepProps {
    role?: 'landlord' | 'agent' | 'caretaker';
}

export default function MediaStep({ role }: MediaStepProps = {}) {
    const { setValue, formState: { errors } } = useFormContext<PropertySchema>();

    const images = (useWatch({ name: 'images' }) || []) as ImageItem[];
    const video = useWatch({ name: 'video' }) as VideoItem | undefined;

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);

            const newImagePromises = files.map(async (file, index) => {
                const base64 = await convertToBase64(file);
                return {
                    id: `new-${Date.now()}-${index}`,
                    url: base64,
                    isPrimary: images.length === 0 && index === 0,
                    file: file
                };
            });

            const newImages = await Promise.all(newImagePromises);
            setValue('images', [...images, ...newImages], { shouldValidate: true });
        }
    };

    const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validate file size (max 100MB)
            const maxSize = 100 * 1024 * 1024; 
            if (file.size > maxSize) {
                toast.error('Video file size must be less than 100MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('video/')) {
                toast.error('Please upload a valid video file');
                return;
            }

            const base64 = await convertToBase64(file);
            const videoData: VideoItem = {
                id: `video-${Date.now()}`,
                url: base64,
                file: file
            };

            setValue('video', videoData, { shouldValidate: true });
            toast.success('Video uploaded successfully!');
        }
    };

    const removeImage = (id: string) => {
        const updated = images.filter((img) => img.id !== id);
        setValue('images', updated, { shouldValidate: true });
    };

    const removeVideo = () => {
        setValue('video', undefined, { shouldValidate: true });
    };

    const setPrimary = (id: string) => {
        const updated = images.map(img => ({
            ...img,
            isPrimary: img.id === id
        }));
        setValue('images', updated, { shouldValidate: true });
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Photos Section */}
            <div className={`bg-white p-6 rounded-xl shadow-sm border ${errors.images ? 'border-red-500' : 'border-gray-100'}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Photos</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Upload high-quality photos to attract more tenants. At least one photo is required.
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-900 font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG or GIF (max. 10MB each)</p>
                </div>
                {errors.images && <p className="text-xs text-red-500 mt-2 text-center">{errors.images.message}</p>}

                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        {images.map((image) => (
                            <div key={image.id} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-video">
                                <img src={image.url} alt="Property" className="w-full h-full object-cover" />

                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => removeImage(image.id)}
                                            className="p-1 bg-white rounded-full text-red-600 hover:bg-red-50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex justify-center">
                                        {image.isPrimary ? (
                                            <span className="bg-brand-green text-white text-xs px-2 py-1 rounded-full">Cover Photo</span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setPrimary(image.id)}
                                                className="bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full hover:bg-white"
                                            >
                                                Set as Cover
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Video Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-900">Property Tour Video</h2>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-semibold">Optional</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                    Upload a video tour to give potential tenants a better view of the property. (Max 100MB)
                </p>

                {!video ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-900 font-medium">Click to upload video</p>
                        <p className="text-xs text-gray-500 mt-1">MP4, MOV, AVI (max. 100MB)</p>
                    </div>
                ) : (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-black">
                        <video
                            src={video.url}
                            controls
                            className="w-full h-64 object-contain"
                        />
                        <button
                            type="button"
                            onClick={removeVideo}
                            className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-600 hover:bg-red-50 shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.file ? `${(video.file.size / (1024 * 1024)).toFixed(2)} MB` : 'Video uploaded'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}