'use client';

import { Suspense } from "react";
import Apply from "@/components/dashboard/tenant/ApplyPage";

export default function ApplyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <Apply />
        </Suspense>
    );
}