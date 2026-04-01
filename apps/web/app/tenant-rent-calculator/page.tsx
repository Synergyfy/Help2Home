import { Suspense } from 'react';
import RentCalculator from "@/components/RentCalculator";

export default function AffordabilityPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <RentCalculator />
        </Suspense>
    );
}
