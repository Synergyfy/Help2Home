import { Suspense } from "react";
import AgentDashboard from "@/components/dashboard/agent/AgentDashboard";

export default function AgentPage() {
    return (
        <Suspense fallback={<div className="min-h-screen animate-pulse bg-gray-50" />}>
            <AgentDashboard />
        </Suspense>
    );
}