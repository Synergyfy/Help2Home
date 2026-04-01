'use client';

import React, { useState } from 'react';
import { 
    HiOutlineXMark, 
    HiOutlinePhoto, 
    HiOutlineVideoCamera, 
    HiOutlineDocumentText,
    HiOutlineUserGroup,
    HiOutlineCheckCircle
} from 'react-icons/hi2';
import { 
    EducationContent, 
    ContentCategory, 
    ContentFormat, 
    TargetAudience,
    ContentStatus 
} from '@/components/dashboard/education/types';
import { toast } from 'react-toastify';

interface EducationPostFormProps {
    onClose: () => void;
    initialData?: EducationContent | null;
    onSave: (data: any) => void;
}

const CATEGORIES: ContentCategory[] = [
    'Beginner', 'Credit', 'Savings', 'Rent Management', 
    'Legal', 'Tenant Rights', 'Budgeting', 'Financial Literacy'
];

const AUDIENCES: { id: TargetAudience; label: string }[] = [
    { id: 'all', label: 'Everyone' },
    { id: 'tenant', label: 'Tenants' },
    { id: 'landlord', label: 'Landlords' },
    { id: 'agent', label: 'Agents' },
    { id: 'caretaker', label: 'Caretakers' },
    { id: 'developer', label: 'Developers' },
    { id: 'investor', label: 'Investors' }
];

export default function EducationPostForm({ onClose, initialData, onSave }: EducationPostFormProps) {
    const [formData, setFormData] = useState<Partial<EducationContent>>(initialData || {
        title: '',
        summary: '',
        content: '',
        category: 'Beginner',
        format: 'article',
        targetAudience: ['all'],
        status: 'draft',
        readTime: 5,
        thumbnailUrl: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAudienceToggle = (audience: TargetAudience) => {
        const current = formData.targetAudience || ['all'];
        
        if (audience === 'all') {
            setFormData({ ...formData, targetAudience: ['all'] });
            return;
        }

        let next: TargetAudience[] = current.filter(a => a !== 'all');
        
        if (next.includes(audience)) {
            next = next.filter(a => a !== audience);
        } else {
            next = [...next, audience];
        }

        // If no audience left, default to 'all'
        if (next.length === 0) {
            next = ['all'];
        }

        setFormData({ ...formData, targetAudience: next });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.summary) {
            toast.error('Please fill in required fields');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            onSave(formData);
            setIsSubmitting(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Hub Post' : 'Create New Educational Post'}</h2>
                    <p className="text-sm text-gray-500 mt-1">Share knowledge with the Help2Home community.</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <HiOutlineXMark size={24} className="text-gray-400" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Post Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Understanding Rent-to-Own Legal Contracts"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as ContentCategory })}
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none"
                            >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Format</label>
                            <div className="flex bg-gray-50 p-1 rounded-2xl">
                                {(['article', 'video', 'tip'] as ContentFormat[]).map(format => (
                                    <button
                                        key={format}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, format })}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                                            formData.format === format 
                                            ? 'bg-white text-brand-green shadow-sm' 
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        {format === 'article' && <HiOutlineDocumentText size={16} />}
                                        {format === 'video' && <HiOutlineVideoCamera size={16} />}
                                        {format === 'tip' && <HiOutlineCheckCircle size={16} />}
                                        {format}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Target Audience */}
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-1">Target Audience (Who can see this?)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {AUDIENCES.map((audience) => {
                            const isSelected = formData.targetAudience?.includes(audience.id);
                            return (
                                <button
                                    key={audience.id}
                                    type="button"
                                    onClick={() => handleAudienceToggle(audience.id)}
                                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                                        isSelected
                                        ? 'bg-brand-green/10 border-brand-green text-brand-green'
                                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                    }`}
                                >
                                    <HiOutlineUserGroup size={16} />
                                    {audience.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Media & Content */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Thumbnail Image URL</label>
                        <div className="relative">
                            <HiOutlinePhoto className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={formData.thumbnailUrl}
                                onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                placeholder="Paste image URL here..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Short Summary *</label>
                        <textarea
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            placeholder="Brief description of the post (shows in grid view)"
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900 h-24 resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Full Content (Markdown/HTML)</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your full article content here..."
                            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900 h-64 resize-y"
                        />
                    </div>
                </div>

                {/* Status & Options */}
                <div className="p-6 bg-brand-green/5 rounded-[2rem] border border-brand-green/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-sm font-bold text-gray-900">Publish immediately?</p>
                            <p className="text-xs text-gray-500">Scheduled posts will go live automatically.</p>
                        </div>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none"
                        >
                            <option value="draft">Save as Draft</option>
                            <option value="published">Publish Now</option>
                            <option value="scheduled">Schedule Post</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="text-xs font-bold text-gray-500">Read Time (min):</label>
                        <input
                            type="number"
                            value={formData.readTime}
                            onChange={(e) => setFormData({ ...formData, readTime: Number(e.target.value) })}
                            className="w-16 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none"
                        />
                    </div>
                </div>
            </form>

            <div className="p-8 border-t border-gray-100 shrink-0 bg-gray-50 flex gap-4">
                <button
                    onClick={onClose}
                    className="flex-1 py-4 px-6 border-2 border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-[2] py-4 px-6 bg-brand-green text-white font-black rounded-2xl hover:bg-green-700 shadow-xl shadow-green-900/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <HiOutlineCheckCircle size={20} strokeWidth={2.5} />
                            {initialData ? 'Update Post' : 'Create Post'}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
