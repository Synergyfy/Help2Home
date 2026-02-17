// components/dashboard/admin/ModerationQueue.tsx
import Link from 'next/link';
import { MdOutlinePanorama } from 'react-icons/md';

const QUEUE_ITEMS = [
  { id: 1, title: 'Modern Loft in Downtown', user: 'John Doe', time: 'Today, 10:23 AM', status: 'New Submission', statusColor: 'bg-amber-100 text-amber-700' },
  { id: 2, title: 'Cozy Studio near Park', user: 'Sarah Smith', time: 'Yesterday, 4:45 PM', status: 'Flagged Photos', statusColor: 'bg-red-100 text-red-700' },
];

export default function ModerationQueue() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h3 className="text-gray-900 text-lg font-bold">Content Moderation Queue</h3>
        <Link href="/dashboard/admin/moderation" className="text-brand-green text-sm font-bold hover:underline">
          View All
        </Link>
      </div>
      <div className="divide-y divide-gray-50">
        {QUEUE_ITEMS.map((item) => (
          <Link key={item.id} href={`/dashboard/admin/moderation/${item.id}`}>
            <div className="p-4 flex flex-col sm:flex-row gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
              <div className="w-full sm:w-24 h-24 sm:h-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                 <MdOutlinePanorama size={32} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-gray-900 font-bold truncate">{item.title}</h4>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${item.statusColor}`}>{item.status}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Submitted by <span className="font-medium text-gray-900">{item.user}</span> • {item.time}</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-brand-green/10 hover:bg-brand-green/20 text-brand-green px-3 py-1.5 rounded text-xs font-bold">Preview</button>
                  <button className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-bold">Approve</button>
                  <button className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-bold">Reject</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
