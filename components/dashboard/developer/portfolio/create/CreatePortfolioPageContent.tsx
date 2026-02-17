'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore, PortfolioItem } from '@/store/userStore';
import { MdArrowBack, MdCloudUpload, MdCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function CreatePortfolioPageContent() {
    const router = useRouter();
    const { roleData, updateRoleProfileData } = useUserStore();
    const developerData = roleData.developer || { portfolio: [] };

    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        status: PortfolioItem['status'];
        image: string;
    }>({
        title: '',
        description: '',
        status: 'completed',
        image: '' // In a real app avoiding base64 for large images is better, but using placeholder for now
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            toast.error('Please fill in all required fields');
            return;
        }

        const newItem: PortfolioItem = {
            id: crypto.randomUUID(),
            ...formData,
            image: formData.image || '/assets/dashboard/placeholder-project.jpg' // Fallback
        };

        const currentPortfolio = developerData.portfolio || [];
        updateRoleProfileData('developer', {
            portfolio: [newItem, ...currentPortfolio]
        });

        toast.success('Project added to portfolio!');
        router.push('/dashboard/developer/portfolio');
    };

    // Mock image upload handler
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // For demo purposes, we're not actually uploading, just creating a fake object URL
            // In a real implementation this would go to S3/Cloudinary
            const objectUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, image: objectUrl }));
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors"
            >
                <MdArrowBack /> Back to Portfolio
            </button>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Project</h1>
                <p className="text-gray-500 mb-8">Share details about a completed or ongoing project.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Project Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Lekki Gardens Phase 4"
                                className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none transition-all font-medium"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the project scope, location, and key features..."
                                className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none transition-all font-medium h-32 resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Project Status</label>
                            <div className="flex gap-4">
                                {(['completed', 'in-progress', 'planned'] as const).map((status) => (
                                    <label key={status} className={`
                                        flex-1 cursor-pointer border-2 rounded-xl p-3 flex items-center justify-center gap-2 font-bold capitalize transition-all
                                        ${formData.status === status
                                            ? 'border-brand-green bg-green-50 text-brand-green'
                                            : 'border-gray-100 text-gray-500 hover:border-gray-200'}
                                    `}>
                                        <input
                                            type="radio"
                                            name="status"
                                            value={status}
                                            checked={formData.status === status}
                                            onChange={() => setFormData({ ...formData, status })}
                                            className="hidden"
                                        />
                                        {formData.status === status && <MdCheck />}
                                        {status.replace('-', ' ')}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Project Image</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-brand-green transition-colors bg-gray-50 group cursor-pointer relative overflow-hidden">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />

                            {formData.image ? (
                                <div className="relative h-48 w-full -m-4">
                                    <Image
                                        src={formData.image}
                                        alt="Preview"
                                        fill
                                        className="object-cover rounded-lg"
                                        style={{ margin: 'auto' }}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white font-bold flex items-center gap-2">
                                            <MdCloudUpload size={20} /> Change Image
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-500 group-hover:text-brand-green transition-colors">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                        <MdCloudUpload size={24} />
                                    </div>
                                    <p className="font-bold">Click to upload image</p>
                                    <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg active:scale-95"
                        >
                            Save Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
