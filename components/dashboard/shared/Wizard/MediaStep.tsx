'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { toast } from 'react-toastify';
import {
    HiOutlinePhoto,
    HiOutlineVideoCamera,
    HiOutlineTrash,
    HiOutlineStar,
    HiOutlineCloudArrowUp,
    HiOutlineXMark,
    HiOutlineCube,
    HiOutlineLightBulb
} from 'react-icons/hi2';

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
    role?: 'landlord' | 'agent' | 'caretaker' | 'developer';
}

export default function MediaStep({ role }: MediaStepProps = {}) {
    const { setValue, formState: { errors } } = useFormContext<PropertySchema>();

    const images = (useWatch({ name: 'images' }) || []) as ImageItem[];
    const video = useWatch({ name: 'video' }) as VideoItem | undefined;
    const floorPlan = useWatch({ name: 'floorPlan' });
    const listingType = useWatch({ name: 'listingType' });

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesList = e.target.files;
        if (filesList && filesList.length > 0) {
            const files = Array.from(filesList);

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
        const filesList = e.target.files;
        if (filesList && filesList[0]) {
            const file = filesList[0];

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

    const handleFloorPlanChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesList = e.target.files;
        if (filesList && filesList[0]) {
            const file = filesList[0];
            const base64 = await convertToBase64(file);
            setValue('floorPlan', {
                id: `plan-${Date.now()}`,
                url: base64,
                file: file
            }, { shouldValidate: true });
        }
    };

    const removeFloorPlan = () => {
        setValue('floorPlan', undefined, { shouldValidate: true });
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

    const cardClasses = "bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8";

    return (
        <div className="max-w-4xl mx-auto pt-4 pb-20">
            {/* Photos Section */}
            <div className={cardClasses}>
                <div className="flex items-center gap-4 mb-8">
                    <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <HiOutlinePhoto size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight">Property Photography</h2>
                        <p className="text-sm text-gray-500">
                            High-quality images increase engagement by up to 80%.
                        </p>
                    </div>
                </div>

                <div className="group relative border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:bg-gray-50 hover:border-brand-green/50 transition-all cursor-pointer overflow-hidden">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="relative z-0">
                        <div className="size-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6 text-brand-green group-hover:scale-110 transition-transform">
                            <HiOutlineCloudArrowUp size={32} />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors">Drag & drop images here</h4>
                        <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">Upload at least 5 photos for best results. Support for JPEG, PNG, WEBP (Max 10MB)</p>
                    </div>
                </div>
                {errors.images && <p className="text-sm text-red-500 mt-4 font-bold flex items-center gap-2"><HiOutlineXMark /> {errors.images.message}</p>}

                {images.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {images.map((image) => (
                            <div key={image.id} className={`relative group rounded-3xl overflow-hidden border-2 transition-all aspect-4/3 ${image.isPrimary ? 'border-brand-green shadow-lg scale-[1.02]' : 'border-gray-100'}`}>
                                <img src={image.url} alt="Property" className="w-full h-full object-cover" />

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => removeImage(image.id)}
                                            className="size-10 bg-white/90 backdrop-blur-sm rounded-xl text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-lg flex items-center justify-center"
                                        >
                                            <HiOutlineTrash size={20} />
                                        </button>
                                    </div>

                                    <div className="flex justify-center">
                                        {image.isPrimary ? (
                                            <span className="bg-brand-green text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                                                <HiOutlineStar /> Cover Photo
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setPrimary(image.id)}
                                                className="bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-brand-green hover:text-white transition-all shadow-lg"
                                            >
                                                Make Cover
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {image.isPrimary && (
                                    <div className="absolute top-4 left-4 size-8 rounded-lg bg-brand-green text-white flex items-center justify-center shadow-lg">
                                        <HiOutlineStar />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Video Section */}
            <div className={cardClasses}>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <HiOutlineVideoCamera size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">Virtual Tour</h2>
                            <p className="text-sm text-gray-500">Provide a walkthrough of the premises.</p>
                        </div>
                    </div>
                    <span className="px-4 py-2 rounded-full text-[10px] font-black bg-blue-50 text-blue-600 uppercase tracking-[0.2em] border border-blue-100 shadow-sm">Optional</span>
                </div>

                {!video ? (
                    <div className="group relative border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:bg-blue-50/30 hover:border-blue-300 transition-all cursor-pointer overflow-hidden">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="relative z-0">
                            <div className="size-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                                <HiOutlineCloudArrowUp size={32} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">Upload video tour</h4>
                            <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">MP4, MOV (max. 100MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className="relative rounded-3xl overflow-hidden border-4 border-white bg-black shadow-2xl group ring-1 ring-gray-100">
                        <video
                            src={video.url}
                            controls
                            className="w-full aspect-video object-contain"
                        />
                        <button
                            type="button"
                            onClick={removeVideo}
                            className="absolute top-4 right-4 size-12 bg-white/90 backdrop-blur-md rounded-2xl text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 z-20"
                        >
                            <HiOutlineTrash size={24} />
                        </button>
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-white/20">
                            {video.file ? `${(video.file.size / (1024 * 1024)).toFixed(2)} MB` : 'Virtual Tour Ready'}
                        </div>
                    </div>
                )}
            </div>

            {/* Floor Plan Section */}
            <div className={cardClasses}>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="size-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <HiOutlineCube size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">Property Floor Plan</h2>
                            <p className="text-sm text-gray-500">Upload architectural plans or layout diagrams.</p>
                        </div>
                    </div>
                    <span className="px-4 py-2 rounded-full text-[10px] font-black bg-amber-50 text-amber-600 uppercase tracking-[0.2em] border border-amber-100 shadow-sm">Optional</span>
                </div>

                {/* Encouragement for Sale Properties */}
                {listingType === 'Sale' && !floorPlan && (
                    <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-amber-500 shrink-0 shadow-sm">
                            <HiOutlineLightBulb size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-amber-900 mb-1">Boost Your Sale Chances!</h4>
                            <p className="text-xs text-amber-800/80 leading-relaxed">
                                Properties "For Sale" with uploaded floor plans receive <strong>3x more enquiries</strong>. Buyers love seeing the layout before booking a viewing.
                            </p>
                        </div>
                    </div>
                )}

                {!floorPlan ? (
                    <div className="group relative border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:bg-amber-50/30 hover:border-amber-300 transition-all cursor-pointer overflow-hidden">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFloorPlanChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="relative z-0">
                            <div className="size-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6 text-amber-600 group-hover:scale-110 transition-transform">
                                <HiOutlineCloudArrowUp size={32} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">Upload floor plan</h4>
                            <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">JPEG, PNG, PDF (max. 10MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className="relative rounded-3xl overflow-hidden border-2 border-gray-100 bg-gray-50 group p-6">
                        <img
                            src={floorPlan.url}
                            alt="Floor Plan Preview"
                            className="max-h-[300px] mx-auto object-contain rounded-xl"
                        />
                        <button
                            type="button"
                            onClick={removeFloorPlan}
                            className="absolute top-4 right-4 size-10 bg-white shadow-lg rounded-xl text-red-600 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                        >
                            <HiOutlineTrash size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
