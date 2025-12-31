import { Suspense } from 'react';
import OnboardingPage from "@/components/onboarding/OnboardingPage";

export default function AffordabilityPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <OnboardingPage />
        </Suspense>
    );
}
