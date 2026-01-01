import { Suspense } from "react";
import Listings from "@/components/dashboard/agent/Listings";

export default function LeadsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen animate-pulse bg-gray-50" />}>
            <Listings />
        </Suspense>
    );
}