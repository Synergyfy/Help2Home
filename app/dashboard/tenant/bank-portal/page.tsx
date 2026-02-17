'use client';

import { Suspense } from "react";
import BankPortalPageContent from '@/components/dashboard/tenant/BankPortalPageContent';

export default function BankPortalPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <BankPortalPageContent />
        </Suspense>
    );
}
