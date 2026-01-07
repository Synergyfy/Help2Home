// components/dashboard/admin/shared/StatTile.tsx
'use client';

import { IconType } from 'react-icons';
import { HiOutlineUsers, HiOutlineTrendingUp, HiOutlineClock, HiOutlineBan } from 'react-icons/hi';

export interface StatTileProps {
  id: string;
  label: string;
  value: string;
  status: 'success' | 'warning' | 'danger' | 'neutral';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const iconMap: Record<string, IconType> = {
  'total': HiOutlineUsers,
  'new': HiOutlineTrendingUp,
  'pending': HiOutlineClock,
  'suspended': HiOutlineBan,
};

export default function StatTile({ id, label, value, status, trend, trendValue }: StatTileProps) {
  const Icon = iconMap[id] || HiOutlineUsers;

  const statusColors = {
    success: 'bg-green-100 text-green-600',
    warning: 'bg-amber-100 text-amber-600',
    danger: 'bg-red-100 text-red-600',
    neutral: 'bg-primary/10 text-primary',
  };

  return (
    <div className="bg-white dark:bg-[#1a202c] p-4 rounded-xl border border-[#dbdfe6] dark:border-[#2d3748] shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[#616f89] dark:text-gray-400 text-xs font-bold uppercase tracking-wide">
          {label}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <h3 className="text-[#111318] dark:text-white text-2xl font-bold">{value}</h3>
          {trendValue && (
            <span className={`text-[10px] font-bold ${status === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              {trendValue}
            </span>
          )}
        </div>
      </div>
      <div className={`p-3 rounded-full ${statusColors[status]}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}