// @/components/auth/RoleGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function RoleGuard({ children }: { children: React.ReactNode }) {
  const { roles, activeRole, hasHydrated } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hasHydrated) return;

    // Extract role from path (e.g., /dashboard/landlord -> landlord)
    const pathRole = pathname.split('/')[2]; 

    // 1. If user doesn't have the role in the URL, redirect to their activeRole
    if (pathRole && !roles.includes(pathRole as any)) {
      router.replace(`/dashboard/${activeRole}`);
    }
  }, [pathname, roles, activeRole, hasHydrated, router]);

  if (!hasHydrated) return null; // Or a loading spinner

  return <>{children}</>;
}
