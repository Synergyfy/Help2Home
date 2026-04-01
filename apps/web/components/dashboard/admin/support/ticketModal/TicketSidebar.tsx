'use client';

import { HiOutlineUser, HiOutlineCheckCircle } from 'react-icons/hi2';

export function TicketSidebar({ ticket }: { ticket: any }) {
  return (
    <div className="w-80 bg-brand-green-50/30 overflow-y-auto hidden lg:block">
      {/* Action Area */}
      <div className="p-6 border-b border-brand-green-100">
        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]">
          <HiOutlineCheckCircle size={20} />
          Resolve Ticket
        </button>
      </div>

      {/* Configuration */}
      <div className="p-6 border-b border-brand-green-100 space-y-6">
        <div>
          <label className="block text-[10px] font-bold text-brand-green-400 uppercase tracking-widest mb-2">Status</label>
          <select className="w-full bg-white border border-brand-green-200 rounded-lg py-2 px-3 text-sm font-bold text-brand-green-700 focus:ring-2 focus:ring-emerald-500/20 outline-none">
            <option>{ticket.status}</option>
            <option>Pending</option>
            <option>On Hold</option>
          </select>
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-brand-green-400 uppercase tracking-widest mb-2">Priority</label>
          <div className="grid grid-cols-3 gap-2">
            {['Low', 'Med', 'High'].map((p) => (
              <button 
                key={p}
                className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                  ticket.priority === p 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                  : 'bg-white border-brand-green-200 text-brand-green-500 hover:bg-brand-green-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Meta Details */}
      <div className="p-6 border-b border-brand-green-100">
        <h4 className="text-[10px] font-bold text-brand-green-400 uppercase tracking-widest mb-4">Unit Information</h4>
        <div className="space-y-4">
          {[
            { label: 'Property', value: ticket.property },
            { label: 'Unit', value: ticket.unit },
            { label: 'Category', value: ticket.category },
            { label: 'Due Date', value: ticket.dueDate },
          ].map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-xs text-brand-green-500 font-medium">{item.label}</span>
              <span className="text-xs font-bold text-brand-green-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
