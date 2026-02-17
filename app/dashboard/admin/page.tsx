// app/dashboard/admin/overview/page.tsx
import StatCard from '@/components/dashboard/admin/shared/StatCard';
import ModerationQueue from '@/components/dashboard/admin/shared/ModerationQueue';
import RecentUsersTable from '@/components/dashboard/admin/shared/RecentUsersTable';
import ActivityLog from '@/components/dashboard/admin/shared/ActivityLog';
import SupportTracker from '@/components/dashboard/admin/shared/SupportTracker';
import {
  HiOutlineDownload,
  HiOutlinePlus,
  HiOutlineHome,
  HiOutlineReceiptTax,
  HiOutlineCog
} from '@/components/shared/Icons';

export default function AdminOverview() {
  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
          <p className="text-brand-green-500 mt-1">Platform performance and moderation alerts.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex bg-white rounded-lg border border-brand-green-200 p-1 shadow-sm">
            {['7D', '30D', '3M', 'YTD'].map((range, i) => (
              <button key={range} className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${i === 0 ? 'bg-brand-green-100 text-brand-green-900' : 'hover:bg-brand-green-50 text-brand-green-600'}`}>
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-green/20">
            <HiOutlineDownload size={18} /> Export Report
          </button>
        </div>
      </div>

      {/* 4-Column Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Users" value="12,450" trend="+12%" type="users" />
        <StatCard label="Active Listings" value="854" trend="+3.2%" type="listings" />
        <StatCard label="Pending Apps" value="42" trend="Action Required" type="pending" requiresAction />
        <StatCard label="YTD Revenue" value="₦4.2M" trend="+15%" type="revenue" />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-8">

        {/* LEFT COLUMN: Extended Content Area */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
          <ModerationQueue />
          <RecentUsersTable />
          {/* Moved to the bottom of the main col to fill space vertically */}
          <ActivityLog />
        </div>

        {/* RIGHT COLUMN: Sidebar Utilities */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">

          {/* Quick Actions */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-gray-900 text-lg font-bold mb-5 flex items-center gap-2">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ActionButton icon={HiOutlinePlus} label="Add User" color="text-blue-600 bg-blue-50" />
              <ActionButton icon={HiOutlineHome} label="New Listing" color="text-emerald-600 bg-emerald-50" />
              <ActionButton icon={HiOutlineReceiptTax} label="Refunds" color="text-purple-600 bg-purple-50" />
              <ActionButton icon={HiOutlineCog} label="Settings" color="text-brand-green-600 bg-brand-green-50" />
            </div>
          </section>

          {/* New Support Tracker */}
          <SupportTracker />

          {/* System Health */}
          <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 tracking-tight">System Health</h3>
              <span className="flex items-center gap-1.5 text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="space-y-5">
              <HealthBar label="Server CPU Load" value={45} />
              <HealthBar label="Database Usage" value={12} />
              <HealthBar label="API Latency" value={65} customText="120ms" isWarning />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// Helper Components
function ActionButton({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
  return (
    <button className={`flex flex-col items-center justify-center p-5 rounded-xl transition-all gap-3 group border border-transparent hover:border-gray-200 hover:shadow-sm ${color}`}>
      <div className="transition-transform group-hover:scale-110">
        <Icon size={28} />
      </div>
      <span className="text-xs font-bold text-gray-700">{label}</span>
    </button>
  );
}

function HealthBar({ label, value, customText, isWarning }: { label: string, value: number, customText?: string, isWarning?: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-tight">
        <span>{label}</span>
        <span className={isWarning ? 'text-amber-600' : 'text-brand-green-900'}>{customText || `${value}%`}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ease-out ${isWarning ? 'bg-amber-500' : 'bg-brand-green'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
