// components/dashboard/admin/shared/ActivityLog.tsx
'use client';

const LOG_ITEMS = [
  { id: 1, time: 'Today, 10:00 AM', text: 'System maintenance completed successfully.', isPrimary: true },
  { id: 2, time: 'Yesterday, 5:30 PM', text: 'New batch of listings imported (150 items).', isPrimary: false },
  { id: 3, time: 'Oct 23, 2:15 PM', text: 'User #8821 flagged for suspicious payment activity.', isPrimary: false },
];

export default function ActivityLog() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-gray-900 text-lg font-bold mb-6">System Activity Log</h3>
      <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
        {LOG_ITEMS.map((item) => (
          <div key={item.id} className="relative">
            {/* Timeline Dot */}
            <div className={`absolute -left-[23px] rounded-full size-3.5 border-2 border-white ${
              item.isPrimary ? 'bg-brand-green' : 'bg-gray-300'
            }`}></div>
            <p className="text-xs text-gray-400 mb-0.5">{item.time}</p>
            <p className="text-sm text-gray-900 font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}