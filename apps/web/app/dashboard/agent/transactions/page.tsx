import { Suspense } from "react";
import Transactions from "@/components/dashboard/agent/Transactions";

export default function LeadsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen animate-pulse bg-gray-50" />}>
            <Transactions />
        </Suspense>
    );
}
