'use client';

import React from 'react';
import ComingSoon from '@/components/shared/ComingSoon';
import { MdGroup } from 'react-icons/md';

export default function TeamPage() {
    return (
        <div className="h-full">
            <ComingSoon
                title="Partner Network"
                description="We're building a powerful networking hub for agents to collaborate with landlords and caretakers. Stay tuned for real-time collaboration tools!"
                icon={MdGroup}
            />
        </div>
    );
}
