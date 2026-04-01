'use client';

import React from 'react';
import Link from 'next/link';
import { EducationContent } from './types';

interface ContentCardProps {
    content: EducationContent;
    onToggleSave: (id: string) => void;
}

export default function ContentCard({ content, onToggleSave }: ContentCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="relative h-48 bg-gray-200">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                    {content.thumbnailUrl ? (
                        <img src={content.thumbnailUrl} alt={content.title} className="w-full h-full object-cover" />
                    ) : (
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    )}
                </div>
                <div className="absolute top-3 right-3">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleSave(content.id);
                        }}
                        className={`p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors ${content.isSaved ? 'text-[#00853E]' : 'text-gray-400'}`}
                    >
                        <svg className="w-5 h-5" fill={content.isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
                <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-md">
                        {content.format === 'video' ? 'Video' : 'Article'}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#00853E] uppercase tracking-wide">{content.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{content.readTime} min read</span>
                </div>

                <Link href={`/dashboard/tenant/education/${content.id}`} className="block group">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#00853E] transition-colors line-clamp-2">
                        {content.title}
                    </h3>
                </Link>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {content.summary}
                </p>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-auto">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                        {/* Avatar placeholder */}
                        <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{content.author.name}</span>
                    <span className="text-gray-300 mx-1">•</span>
                    <span className="text-xs text-gray-500">{content.publishDate}</span>
                </div>
            </div>
        </div>
    );
}
