'use client';

import { Suspense } from "react";
import Apply from "@/components/dashboard/tenant/ApplyPage"; // Assuming ApplyPage component exists and is client-side

export default function ApplyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <Apply />
        </Suspense>
    );
}