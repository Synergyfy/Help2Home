import { Suspense } from "react";
import SignIn from "@/components/auth/signin/SiginIn";

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <SignIn />
        </Suspense>
    );
}
