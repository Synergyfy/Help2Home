'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TemplateManager from '@/components/dashboard/landlord/support/TemplateManager';
import { MOCK_TEMPLATES, Template } from '@/lib/mockSupportData';

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);

    const handleSaveTemplate = (template: Template) => {
        setTemplates(prev => {
            const exists = prev.find(t => t.id === template.id);
            if (exists) {
                return prev.map(t => t.id === template.id ? template : t);
            }
            return [...prev, template];
        });
    };

    const handleDeleteTemplate = (id: string) => {
        setTemplates(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <Link href="/dashboard/landlord/support" className="text-gray-500 hover:text-gray-700 text-sm mb-2 inline-block">
                    ← Back to Support Hub
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Message Templates</h1>
                <p className="text-gray-500">Create and manage quick replies for faster communication.</p>
            </div>

            <TemplateManager
                templates={templates}
                onSave={handleSaveTemplate}
                onDelete={handleDeleteTemplate}
            />
        </div>
    );
}
