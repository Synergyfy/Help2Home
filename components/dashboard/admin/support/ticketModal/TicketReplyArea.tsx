'use client';

import { HiOutlinePaperClip, HiOutlineFaceSmile, HiOutlineBolt } from 'react-icons/hi2';

export function TicketReplyArea() {
  return (
    <div className="p-6 bg-white border-t border-slate-100 sticky bottom-0">
      <div className="flex items-center justify-between mb-3">
        <div className="flex bg-slate-100/80 p-1 rounded-xl">
          <button className="px-5 py-1.5 rounded-lg bg-white shadow-sm text-xs font-bold text-slate-900">Reply</button>
          <button className="px-5 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700">Internal Note</button>
        </div>
        <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5">
          <HiOutlineBolt size={14} /> Use template
        </button>
      </div>
      <div className="relative">
        <textarea 
          className="w-full resize-none rounded-2xl border-none bg-slate-50 text-sm p-4 focus:ring-2 focus:ring-emerald-500/10 outline-none min-h-[120px]" 
          placeholder="Type your response to the tenant..."
        />
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1 text-slate-400">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><HiOutlinePaperClip size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><HiOutlineFaceSmile size={20} /></button>
          </div>
          <button className="px-8 py-2.5 rounded-xl bg-brand-green hover:bg-green-700 text-white text-sm font-bold transition-all shadow-lg shadow-slate-200">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}