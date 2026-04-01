'use client';

import React from 'react';
import Link from 'next/link';
import { EducationContent } from './types';

interface ContentDetailProps {
    content: EducationContent;
    relatedContent: EducationContent[];
    onToggleSave: (id: string) => void;
}

export default function ContentDetail({ content, relatedContent, onToggleSave }: ContentDetailProps) {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Link href="/dashboard/tenant/education" className="text-sm text-gray-500 hover:text-[#00853E] flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Hub
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-sm text-gray-500">{content.category}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {content.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                            <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <span className="font-medium">{content.author.name}</span>
                    </div>
                    <span>{content.publishDate}</span>
                    <span>{content.readTime} min read</span>
                    <button
                        onClick={() => onToggleSave(content.id)}
                        className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${content.isSaved
                                ? 'bg-[#00853E]/10 border-[#00853E] text-[#00853E]'
                                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <svg className="w-5 h-5" fill={content.isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {content.isSaved ? 'Saved' : 'Save for later'}
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <article className="prose prose-lg max-w-none mb-12 text-gray-800">
                {content.format === 'video' && (
                    <div className="aspect-video bg-black rounded-xl overflow-hidden mb-8 relative group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                        <img src={content.thumbnailUrl} alt="Video thumbnail" className="w-full h-full object-cover opacity-80" />
                    </div>
                )}

                <div dangerouslySetInnerHTML={{ __html: content.content || '' }} />
            </article>

            {/* Related Content */}
            {relatedContent.length > 0 && (
                <div className="border-t border-gray-100 pt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedContent.map(item => (
                            <Link key={item.id} href={`/dashboard/tenant/education/${item.id}`} className="group block bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#00853E]">{item.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{item.summary}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
