import { Suspense } from "react";
import MainPage from "@/components/marketplace/MarketplaceMain";

export default function MarketPlaceMain() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <MainPage />
        </Suspense>
    );
}
