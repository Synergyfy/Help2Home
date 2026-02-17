'use client';

import { useState } from 'react';
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineTicket,
  HiOutlineClockOriginal as HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle
} from '@/components/shared/Icons';
import TicketDetailModal from '@/components/dashboard/admin/support/TicketDetailModal';

// Updated Mock Data to match Modal Requirements
const TICKETS = [
  {
    id: 'TKT-1023',
    user: 'John Smith',
    userEmail: 'john.smith@example.com',
    subject: 'Payment failed for User #892',
    priority: 'High',
    status: 'Open',
    category: 'Billing',
    date: '2 hours ago',
    createdAt: 'Jan 7, 2026',
    property: 'Sunset Apartments',
    unit: '4B',
    dueDate: 'Tomorrow, 5:00 PM',
    description: 'Hi Support, I tried to make a payment for my listing #892 using my Verve card, but the transaction kept failing even though I have sufficient funds.'
  },
  {
    id: 'TKT-1021',
    user: 'Sarah Wilson',
    userEmail: 's.wilson@web.com',
    subject: 'Landlord photo upload issue',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Technical',
    date: '5 hours ago',
    createdAt: 'Jan 7, 2026',
    property: 'Green Valley',
    unit: '12A',
    dueDate: 'Jan 10, 2026',
    description: 'I am trying to upload high-resolution photos of my property, but the system keeps timing out at 90%.'
  },
  {
    id: 'TKT-1019',
    user: 'Mike Ade',
    userEmail: 'mike.ade@provider.net',
    subject: 'Dark mode feature request',
    priority: 'Low',
    status: 'Resolved',
    category: 'Feature',
    date: 'Yesterday',
    createdAt: 'Jan 6, 2026',
    property: 'City Center Lofts',
    unit: 'Penthouse 1',
    dueDate: 'Completed',
    description: 'Would love to see a dark mode option for the dashboard. It gets quite bright working late at night!'
  },
];

export default function SupportRequestsPage() {
  const [filter, setFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Support Requests</h1>
          <p className="text-brand-green-500 mt-1">Manage and respond to user inquiries and technical issues.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-brand-green-200 text-brand-green-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-brand-green-50 transition-all">
            <HiOutlineFilter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
            New Ticket
          </button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SupportStat label="Total Tickets" value="154" icon={HiOutlineTicket} color="text-blue-600 bg-blue-50" />
        <SupportStat label="Open Now" value="12" icon={HiOutlineExclamationCircle} color="text-red-600 bg-red-50" />
        <SupportStat label="In Progress" value="8" icon={HiOutlineClock} color="text-amber-600 bg-amber-50" />
        <SupportStat label="Resolved Today" value="45" icon={HiOutlineCheckCircle} color="text-emerald-600 bg-emerald-50" />
      </div>

      <div className="bg-white rounded-2xl border border-brand-green-100 shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-6 border-b border-brand-green-50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-green-400" size={20} />
            <input
              type="text"
              placeholder="Search by ticket ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-brand-green-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
          </div>
          <div className="flex bg-brand-green-50 p-1 rounded-xl w-full md:w-auto">
            {['All', 'Open', 'In Progress', 'Resolved'].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === item ? 'bg-white text-brand-green-900 shadow-sm' : 'text-brand-green-500 hover:text-brand-green-700'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-green-50/50 border-b border-brand-green-100">
                <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider">Subject & Category</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-brand-green-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-green-50">
              {TICKETS.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-brand-green-50/50 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-brand-green-900">{ticket.id}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-semibold text-brand-green-900">{ticket.user}</div>
                    <div className="text-[10px] text-brand-green-400">{ticket.date}</div>
                  </td>
                  <td className="px-6 py-5 max-w-xs">
                    <div className="text-sm font-medium text-brand-green-900 line-clamp-1">{ticket.subject}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-green-100 text-brand-green-500 font-bold uppercase tracking-tight">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${ticket.priority === 'High' ? 'text-red-600 bg-red-50' :
                        ticket.priority === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50'
                      }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${ticket.status === 'Open' ? 'bg-red-500' :
                          ticket.status === 'In Progress' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} />
                      <span className="text-sm font-medium text-brand-green-700">{ticket.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-emerald-500 font-bold text-sm hover:underline decoration-2 underline-offset-4"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Modal Instance */}
      <TicketDetailModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </main>
  );
}

function SupportStat({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-brand-green-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs font-bold text-brand-green-500 uppercase tracking-tight">{label}</p>
        <p className="text-2xl font-black text-brand-green-900">{value}</p>
      </div>
    </div>
  );
}
