// app/dashboard/admin/profile/_components/ActivityLog.tsx
import { HiOutlineLogin, HiOutlinePencilAlt, HiOutlineKey } from 'react-icons/hi';

const activities = [
  {
    id: 1,
    action: 'Successful Login',
    date: 'Oct 24, 2023, 09:41 AM',
    ip: '192.168.1.105',
    device: 'Chrome on MacOS',
    icon: HiOutlineLogin,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    id: 2,
    action: 'Updated Profile Info',
    date: 'Oct 23, 2023, 02:15 PM',
    ip: '192.168.1.105',
    device: 'Chrome on MacOS',
    icon: HiOutlinePencilAlt,
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    id: 3,
    action: 'Password Changed',
    date: 'Sep 15, 2023, 10:30 AM',
    ip: '192.168.1.105',
    device: 'Chrome on MacOS',
    icon: HiOutlineKey,
    color: 'text-purple-600 bg-purple-50',
  },
];

export function ActivityLog() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header - Matches the Table Toolbar spacing */}
      <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Activity</h3>
          <p className="text-sm text-slate-500 font-medium">Latest actions performed on your account.</p>
        </div>
        <button className="text-sm font-bold text-brand-green hover:underline decoration-2 underline-offset-4">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Header row matches the Support Table header exactly */}
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Device</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {activities.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{item.action}</span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-slate-900">
                  {item.date}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-bold uppercase tracking-tight">
                    {item.ip}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <span className="text-sm font-medium text-slate-600">{item.device}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer - Matching Support Page Pagination UI style */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
          Security Log • End-to-End Encrypted
        </p>
      </div>
    </div>
  );
}