import { Suspense } from "react";
import MainPage from "@/components/dashboard/admin/users/UsersPage";

export default function AffordabilityPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <MainPage />
        </Suspense>
    );
}
