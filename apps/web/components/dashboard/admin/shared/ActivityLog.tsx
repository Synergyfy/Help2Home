// components/dashboard/admin/shared/ActivityLog.tsx
'use client';

interface LogItem {
  id: string | number;
  time: string;
  text: string;
  isPrimary: boolean;
}

export default function ActivityLog({ logs = [] }: { logs?: LogItem[] }) {

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-gray-900 text-lg font-bold mb-6">System Activity Log</h3>
      <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
        {logs.map((item: LogItem) => (
          <div key={item.id} className="relative">
            {/* Timeline Dot */}
            <div className={`absolute -left-[23px] rounded-full size-3.5 border-2 border-white ${
              item.isPrimary ? 'bg-brand-green' : 'bg-gray-300'
            }`}></div>
            <p className="text-xs text-gray-400 mb-0.5 text-capitalize">{item.time}</p>
            <p className="text-sm text-gray-900 font-medium text-capitalize">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
