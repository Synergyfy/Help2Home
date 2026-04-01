import { Suspense } from "react";
import InvestorEarningsCalculator from "@/components/InvestorEarningsCalculator";

export default function AffordabilityPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <InvestorEarningsCalculator />
        </Suspense>
    );
}
