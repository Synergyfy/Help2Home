import { Suspense } from "react";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";

export default function AffordabilityPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <AffordabilityCalculator />
        </Suspense>
    );
}
