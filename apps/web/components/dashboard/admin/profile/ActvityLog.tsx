// app/dashboard/admin/profile/_components/ActivityLog.tsx
import { HiOutlineLogin, HiOutlinePencilAlt, HiOutlineKey } from 'react-icons/hi';

import { useQuery } from '@tanstack/react-query';
import { fetchProfileActivity } from '@/lib/api/profile';

export function ActivityLog() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['profile-activity'],
    queryFn: fetchProfileActivity,
  });

  const getLogIcon = (action: string) => {
    if (action.includes('LOGIN')) return HiOutlineLogin;
    if (action.includes('UPDATE')) return HiOutlinePencilAlt;
    if (action.includes('PASSWORD')) return HiOutlineKey;
    return HiOutlinePencilAlt;
  };

  const getLogColor = (action: string) => {
    if (action.includes('LOGIN')) return 'text-blue-600 bg-blue-50';
    if (action.includes('UPDATE')) return 'text-emerald-600 bg-emerald-50';
    if (action.includes('PASSWORD')) return 'text-purple-600 bg-purple-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-green-100 shadow-sm overflow-hidden">
      {/* Header - Matches the Table Toolbar spacing */}
      <div className="p-6 border-b border-brand-green-50 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-lg font-black text-brand-green-900 tracking-tight">Recent Activity</h3>
          <p className="text-sm text-brand-green-500 font-medium">Latest actions performed on your account.</p>
        </div>
        <button className="text-sm font-bold text-brand-green hover:underline decoration-2 underline-offset-4">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Header row matches the Support Table header exactly */}
            <tr className="bg-brand-green-50/50 border-b border-brand-green-100">
              <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider text-right">Device</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-green-50">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto"></div>
                </td>
              </tr>
            ) : !logs || logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-brand-green-400 font-bold">
                  No recent activity found.
                </td>
              </tr>
            ) : (
              logs.map((item: any) => {
                const Icon = getLogIcon(item.action);
                return (
                  <tr key={item.id} className="hover:bg-brand-green-50/50 transition-colors group">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${getLogColor(item.action)}`}>
                          <Icon size={20} />
                        </div>
                        <span className="text-sm font-bold text-brand-green-900 text-capitalize">
                          {item.action.replace(/_/g, ' ').toLowerCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-brand-green-900">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-brand-green-100 text-brand-green-500 font-bold uppercase tracking-tight">
                        {item.ipAddress || 'Internal'}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-brand-green-600">
                        {item.meta?.device || 'Web Browser'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer - Matching Support Page Pagination UI style */}
      <div className="px-6 py-4 bg-brand-green-50/50 border-t border-brand-green-100">
        <p className="text-[10px] font-black text-brand-green-400 uppercase tracking-widest text-center">
          Security Log • End-to-End Encrypted
        </p>
      </div>
    </div>
  );
}
