// @/components/dashboard/ContextBar.tsx
'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore, Role } from '@/store/userStore';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function ContextBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { roles, activeRole, setActiveRole, hasHydrated, roleOnboardingCompleted } = useUserStore();

  if (!hasHydrated) return null;

  const switcherAllowedRoles: Role[] = ['landlord', 'agent', 'caretaker'];
  const filteredRoles = roles.filter(role => switcherAllowedRoles.includes(role));
  const canSwitch = filteredRoles.length > 1;

  const displayRole = pathname.split('/')[2] || activeRole || 'Dashboard';

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    
    setActiveRole(newRole);

    if (!roleOnboardingCompleted[newRole]) {
      toast.info(`Note: ${newRole} profile is incomplete. Some features may be limited.`);
    }

    router.push(`/dashboard/${newRole}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
      <div className="w-full sm:w-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize leading-tight">
          {displayRole} Portal
        </h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">
          Manage your {displayRole} operations and tasks.
        </p>
      </div>

      {canSwitch && (
        <div className="w-full sm:w-auto flex items-center gap-3 bg-white border border-gray-200 px-3 py-2 md:px-4 md:py-2 rounded-xl shadow-sm hover:border-[#00853E] transition-all group">
          <div className="bg-[#00853E]/10 p-1.5 rounded-lg group-hover:bg-[#00853E]/20 transition-colors">
            <MdOutlineSwapHoriz className="text-[#00853E] text-lg md:text-xl" />
          </div>

          <div className="flex flex-col flex-1 sm:flex-none">
            <span className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 leading-none mb-1 tracking-wider">
              Switch Perspective
            </span>
            <select
              value={activeRole || ''}
              onChange={handleRoleChange}
              className="bg-transparent text-sm font-bold text-gray-800 focus:outline-none cursor-pointer capitalize appearance-none pr-4"
            >
              {filteredRoles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}