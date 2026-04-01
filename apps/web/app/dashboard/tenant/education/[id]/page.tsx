'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ContentDetail from '@/components/dashboard/education/ContentDetail';
import { EducationContent } from '@/components/dashboard/education/types';
import { getContentDetail, getContentList, toggleSaveContent } from '@/utils/mockEducationApi';

export default function ContentDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [content, setContent] = useState<EducationContent | null>(null);
    const [related, setRelated] = useState<EducationContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            try {
                const detail = await getContentDetail(id);
                if (detail) {
                    setContent(detail);
                    // Fetch related content based on IDs or category
                    const allContent = await getContentList();
                    const relatedItems = allContent.filter(c =>
                        detail.relatedContentIds?.includes(c.id) ||
                        (c.category === detail.category && c.id !== detail.id)
                    ).slice(0, 2);
                    setRelated(relatedItems);
                }
            } catch (error) {
                console.error("Failed to load content detail", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleToggleSave = async (contentId: string) => {
        const newStatus = await toggleSaveContent(contentId);
        if (content && content.id === contentId) {
            setContent({ ...content, isSaved: newStatus });
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading content...</div>;
    }

    if (!content) {
        return <div className="min-h-screen flex items-center justify-center">Content not found.</div>;
    }

    return (
        <div className="p-4 md:p-8 font-sans">
            <ContentDetail
                content={content}
                relatedContent={related}
                onToggleSave={handleToggleSave}
            />
        </div>
    );
}
