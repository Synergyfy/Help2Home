'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore, Role } from '@/store/userStore';

export const useRoleSync = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { roles, activeRole, setActiveRole, hasHydrated, email } = useUserStore();

  useEffect(() => {
    // Wait for Zustand to load from LocalStorage
    if (!hasHydrated) return;

    // Prevent syncing logic if the user is logged out
    if (!email) return;

    // Detect the role from the URL (e.g., /dashboard/landlord/...)
    const segments = pathname.split('/');
    const roleInUrl = segments[2] as Role;

    const isValidRole = roles.includes(roleInUrl);

    if (roleInUrl && isValidRole) {
      // 1. Sync Store with URL if they differ
      if (roleInUrl !== activeRole) {
        setActiveRole(roleInUrl);
      }
    } else if (roleInUrl && !isValidRole) {
      // 2. Security: Redirect if user tries to access an unauthorized role
      console.warn(`Unauthorized access to ${roleInUrl}. Redirecting...`);
      router.push(`/dashboard/${roles[0] || 'tenant'}`);
    }
  }, [pathname, roles, activeRole, setActiveRole, hasHydrated, router, email]);
};