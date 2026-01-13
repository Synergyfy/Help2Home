'use client';

import React, { useState, useEffect } from 'react';
import ContentGrid from '@/components/dashboard/education/ContentGrid';
import FeaturedCarousel from '@/components/dashboard/education/FeaturedCarousel';
import { EducationContent, ContentCategory } from '@/components/dashboard/education/types';
import { getContentList, getFeaturedContent, toggleSaveContent } from '@/utils/mockEducationApi';

const CATEGORIES: (ContentCategory | 'All')[] = ['All', 'Beginner', 'Credit', 'Savings', 'Rent Management', 'Legal', 'Tenant Rights', 'Budgeting'];

export default function EducationHubPage() {
    const [contents, setContents] = useState<EducationContent[]>([]);
    const [featured, setFeatured] = useState<EducationContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [contentData, featuredData] = await Promise.all([
                    getContentList(selectedCategory, searchQuery),
                    getFeaturedContent()
                ]);
                setContents(contentData);
                setFeatured(featuredData);
            } catch (error) {
                console.error("Failed to load education content", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(loadData, 300);
        return () => clearTimeout(timeoutId);
    }, [selectedCategory, searchQuery]);

    const handleToggleSave = async (id: string) => {
        const newStatus = await toggleSaveContent(id);
        setContents(prev => prev.map(c => c.id === id ? { ...c, isSaved: newStatus } : c));
        setFeatured(prev => prev.map(c => c.id === id ? { ...c, isSaved: newStatus } : c));
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Education Hub</h1>
                <p className="text-gray-600">Learn about rent, savings, and credit in short, easy lessons.</p>
            </div>

            {/* Featured Section */}
            {!searchQuery && selectedCategory === 'All' && (
                <FeaturedCarousel featured={featured} />
            )}

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between sticky top-0 bg-gray-50/95 backdrop-blur-sm py-4 z-10">
                <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    <div className="flex gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                    ? 'bg-[#00853E] text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-72 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search topics..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -tranbrand-green-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Content Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white rounded-xl h-96 animate-pulse">
                            <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                            <div className="p-5 space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <ContentGrid contents={contents} onToggleSave={handleToggleSave} />
            )}
        </div>
    );
}
