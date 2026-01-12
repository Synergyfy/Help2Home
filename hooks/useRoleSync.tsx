'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore, Role } from '@/store/userStore';

export const useRoleSync = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { roles, activeRole, setActiveRole, hasHydrated, email } = useUserStore();

  useEffect(() => {
    if (!hasHydrated) return;

    // Skip if not logged in
    if (!email) return;

    const segments = pathname.split('/');
    // Url structure: /dashboard/[role]/... 
    // So segments[2] should be the role
    const roleInUrl = segments[2] as Role;

    // Only process if we are actually in a role dashboard
    if (segments[1] === 'dashboard' && roleInUrl) {

      // DEV MODE: Always trust the URL for role switching to allow testing all personas
      // In production, you would check: if (roles.includes(roleInUrl)) ...

      if (activeRole !== roleInUrl) {
        console.log(`[RoleSync] Switching active role from ${activeRole} to ${roleInUrl}`);
        setActiveRole(roleInUrl);
      }
    }

  }, [pathname, roles, activeRole, setActiveRole, hasHydrated, router, email]);
};