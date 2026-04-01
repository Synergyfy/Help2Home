import { Suspense } from "react";
import SignUp from "@/components/auth/signup/Signup";

export default function SignUpPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <SignUp />
        </Suspense>
    );
}
