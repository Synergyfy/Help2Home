// components/dashboard/admin/shared/SupportTracker.tsx
'use client';

import Link from 'next/link';
import { HiOutlineTicket } from 'react-icons/hi';

const TICKETS = [
  { id: '1023', priority: 'High', title: 'Payment failed for User #892', statusColor: 'bg-red-50 text-red-600' },
  { id: '1021', priority: 'Medium', title: 'Photo upload limit issue', statusColor: 'bg-amber-50 text-amber-600' },
  { id: '1019', priority: 'Low', title: 'Dark mode feature request', statusColor: 'bg-green-50 text-green-600' },
];

export default function SupportTracker() {
  return (
    <div className="bg-white rounded-2xl border border-brand-green-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-brand-green-50">
        <h3 className="text-brand-green-900 text-lg font-bold">Support Requests</h3>
        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 New</span>
      </div>
      <div className="divide-y divide-brand-green-50">
        {TICKETS.map((ticket) => (
          <Link key={ticket.id} href={`/dashboard/admin/support/${ticket.id}`}>
            <div className="p-4 hover:bg-brand-green-50 cursor-pointer transition-colors group">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-bold text-brand-green-900">Ticket #{ticket.id}</p>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${ticket.statusColor}`}>
                  {ticket.priority}
                </span>
              </div>
              <p className="text-xs text-brand-green-500 line-clamp-1 group-hover:text-brand-green-700">{ticket.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/dashboard/admin/support" className="w-full py-3 bg-brand-green-50 text-xs font-bold text-brand-green hover:bg-brand-green/5 transition-colors block text-center">
        View All Tickets
      </Link>
    </div>
  );
}
