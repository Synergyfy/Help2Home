'use client';

import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { useDashboardData } from '@/hooks/UseDashboardData';
import { useApplications } from '@/hooks/useApplications';
import { Application } from '@/store/applicationStore';

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
  const { applications, isLoading: appsLoading } = useApplications();

  const router = useRouter();

  if (!hasHydrated) return null;

  if (isPending || appsLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-bold animate-pulse text-xs uppercase tracking-widest">
          Loading {activeRole} data...
        </p>
      </div>
    );
  }

  if (isError) return <div className="p-10 text-red-500">Failed to load {activeRole} data.</div>;

  const pendingAppsCount = applications.filter((a: Application) => a.status === 'Pending' || a.status === 'Under Review').length;

  const enrichedSummary = [
    ...(data?.summary || []),
    {
      id: 'applications-stat',
      label: 'Pending Applications',
      value: pendingAppsCount.toString(),
      subtitle: pendingAppsCount > 0 ? 'Needs review' : 'All caught up',
      trend: pendingAppsCount > 0 ? 'up' : 'neutral',
      trendValue: pendingAppsCount > 0 ? 'New' : '',
      status: pendingAppsCount > 0 ? 'warning' : 'neutral',
      link: '/dashboard/landlord/applications'
    }
  ];

  return (
    <div className="pb-12">
      <div className="flex justify-end items-center mb-8">
        <select
          value={dateRange}
          onChange={(e) => setFilters({ dateRange: e.target.value })}
          className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-brand-green focus:border-brand-green p-2.5 shadow-sm font-bold cursor-pointer outline-none"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Summary Tiles */}
      <SummaryTiles tiles={enrichedSummary} />

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <ActivityFeed />
          <OpenTasks tasks={data.tasks} />
          <RecentPayments payments={data.payments} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <VerificationStatus items={data.verification} />
          <PerformanceSnapshot />
          <HelpSupport />
        </div>
      </div>
    </div>
  );
}