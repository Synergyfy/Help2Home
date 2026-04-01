import { Suspense } from 'react';
import LandlordEarningsCalculator from "@/components/LandlordEarningsCalculator";

export default function AffordabilityPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <LandlordEarningsCalculator />
        </Suspense>
    );
}
