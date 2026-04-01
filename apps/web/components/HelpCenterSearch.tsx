'use client';

import React, { useState } from 'react';

export default function HelpCenterSearch() {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would redirect to search results or filter the list
        console.log('Searching for:', query);
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Search for articles, topics, or keywords..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-14 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all text-lg"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-brand-green text-white px-6 rounded-full font-medium hover:bg-green-700 transition-colors"
                >
                    Search
                </button>
            </form>
        </div>
    );
}
