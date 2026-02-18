import { HiOutlineUsers, HiOutlineHome, HiOutlineClipboardList, HiOutlineCash, HiOutlineTrendingUp } from '@/components/shared/Icons';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  type: 'users' | 'listings' | 'pending' | 'revenue';
  requiresAction?: boolean;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  users: HiOutlineUsers,
  listings: HiOutlineHome,
  pending: HiOutlineClipboardList,
  revenue: HiOutlineCash,
};

export default function StatCard({ label, value, trend, type, requiresAction }: StatCardProps) {
  const Icon = iconMap[type];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-brand-green/10 rounded-lg text-brand-green">
          <Icon size={24} />
        </div>
        <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${requiresAction ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
          }`}>
          {!requiresAction && <HiOutlineTrendingUp className="mr-1" />}
          {trend}
        </span>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h3 className="text-gray-900 text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
