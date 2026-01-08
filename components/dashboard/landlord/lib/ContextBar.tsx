'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore, Role } from '@/store/userStore';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { toast } from 'react-toastify'

export default function ContextBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { roles, activeRole, hasHydrated, roleOnboardingCompleted } = useUserStore();

  if (!hasHydrated) return null;

  // Roles allowed to use the switcher
  const switcherAllowedRoles: Role[] = ['landlord', 'agent', 'caretaker'];

  // Filter the user roles to only show those allowed in this switcher
  const filteredRoles = roles.filter(role => switcherAllowedRoles.includes(role));

  // Only show if user has allowed roles and more than one option exists
  const canSwitch = filteredRoles.length > 1;

  const displayRole = pathname.split('/')[2] || activeRole || 'Dashboard';

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;

    // Check if the target role has completed onboarding
    if (!roleOnboardingCompleted[newRole]) {
      const confirmOnboarding = window.confirm(`Onboarding for the ${newRole} role is incomplete. Would you like to complete it now? \n\nClick OK to complete now, or Cancel to skip for later.`);

      if (confirmOnboarding) {
        router.push('/onboarding');
        return;
      }
      // If skip, allow the switch but maybe remind later (simplified here as just allowing)
      toast.info(`You've skipped onboarding for ${newRole}. You can complete it any time from your profile.`);
    }

    router.push(`/dashboard/${newRole}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
      {/* Title Section */}
      <div className="w-full sm:w-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize leading-tight">
          {displayRole} Portal
        </h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">
          Manage your {displayRole} operations and tasks.
        </p>
      </div>

      {/* Switcher Section */}
      {canSwitch && (
        <div className="w-full sm:w-auto flex items-center gap-3 bg-white border border-gray-200 px-3 py-2 md:px-4 md:py-2 rounded-xl shadow-sm hover:border-brand-green transition-all group">
          <div className="bg-brand-green/10 p-1.5 rounded-lg group-hover:bg-brand-green/20 transition-colors">
            <MdOutlineSwapHoriz className="text-brand-green text-lg md:text-xl" />
          </div>

          <div className="flex flex-col flex-1 sm:flex-none">
            <span className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 leading-none mb-1 tracking-wider">
              Switch Perspective
            </span>
            <select
              value={activeRole || ''}
              onChange={handleRoleChange}
              className="bg-transparent text-sm font-bold text-gray-800 focus:outline-none cursor-pointer capitalize appearance-none pr-4"
              style={{ backgroundImage: 'none' }}
            >
              {filteredRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}