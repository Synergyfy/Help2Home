'use client';

import { Suspense } from "react";
import CreatePortfolioPageContent from '@/components/dashboard/developer/portfolio/create/CreatePortfolioPageContent';

export default function CreatePortfolioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <CreatePortfolioPageContent />
        </Suspense>
    );
}
