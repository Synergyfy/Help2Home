import { Suspense, ReactNode } from "react";

export function ClientSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
