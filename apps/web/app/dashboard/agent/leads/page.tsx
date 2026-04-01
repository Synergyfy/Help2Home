import { Suspense } from "react";
import Leads from "../../../../components/dashboard/agent/Leads";

export default function LeadsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen animate-pulse bg-gray-50" />}>
            <Leads />
        </Suspense>
    );
}
