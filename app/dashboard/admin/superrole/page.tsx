import { Suspense } from "react";
import SuperAdmin from "@/components/dashboard/admin/superrole/MainPage";

export default function SuperAdminPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <SuperAdmin />
        </Suspense>
    );
}
