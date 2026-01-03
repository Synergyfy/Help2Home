'use client';

import {useRouter} from 'next/navigation'
import { useUserStore } from '@/store/userStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { useDashboardData } from '@/hooks/UseDashboardData';

// UI Components
import SummaryTiles from './SummaryTiles';
import ActivityFeed from './ActivityFeed';
import OpenTasks from './OpenTasks';
import RecentPayments from './RecentPayments';
import QuickActions from './QuickActions';
import VerificationStatus from './VerificationStatus';
import PerformanceSnapshot from './PerformanceSnapshot';
import HelpSupport from './HelpSupport';

export default function LandlordDashboard() {
  const { activeRole, hasHydrated } = useUserStore();
  const { dateRange, setFilters } = useDashboardStore();
  
  const { data, isPending, isError } = useDashboardData();

  const router = useRouter();

  const handleAddProperty = ()=>{
    router.push('/dashboard/landlord/properties/add')
  }

  if (!hasHydrated) return null;

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00853E]/20 border-t-[#00853E] rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-bold animate-pulse text-xs uppercase tracking-widest">
          Loading {activeRole} data...
        </p>
      </div>
    );
  }

  if (isError) return <div className="p-10 text-red-500">Failed to load {activeRole} data.</div>;

  return (
    <div className="pb-12">
      {/* Local Filters - Role Switcher removed as it is now in the global ContextBar */}
      <div className="flex justify-end items-center mb-8">
        <select
          value={dateRange}
          onChange={(e) => setFilters({ dateRange: e.target.value })}
          className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#00853E] focus:border-[#00853E] p-2.5 shadow-sm font-bold cursor-pointer outline-none"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Summary Tiles */}
      <SummaryTiles tiles={data.summary} />

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <ActivityFeed activities={data.activities} />
          <OpenTasks tasks={data.tasks} />
          <RecentPayments payments={data.payments} />
        </div>

        {/* Right Column (Side Rail) */}
        <div className="space-y-6">
          <QuickActions/>
          <VerificationStatus items={data.verification} />
          <PerformanceSnapshot />
          <HelpSupport />
        </div>
      </div>
    </div>
  );
}