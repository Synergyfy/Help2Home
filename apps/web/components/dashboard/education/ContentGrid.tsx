'use client';

import React from 'react';
import ContentCard from './ContentCard';
import { EducationContent } from './types';

interface ContentGridProps {
    contents: EducationContent[];
    onToggleSave: (id: string) => void;
}

export default function ContentGrid({ contents, onToggleSave }: ContentGridProps) {
    if (contents.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">No content found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((content) => (
                <ContentCard
                    key={content.id}
                    content={content}
                    onToggleSave={onToggleSave}
                />
            ))}
        </div>
    );
}
