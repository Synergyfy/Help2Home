'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineXMark, HiOutlineChatBubbleLeftRight, HiOutlineUser, HiOutlinePhoto, HiCheckBadge } from 'react-icons/hi2';
import { TicketSidebar } from './ticketModal/TicketSidebar';
import { TicketReplyArea } from './ticketModal/TicketReplyArea';

export default function TicketDetailModal({ ticket, onClose }: any) {
  if (!ticket) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 300 }}
          className="relative w-full lg:max-w-[1000px] bg-white h-full shadow-[-20px_0_50px_-12px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-5 border-b border-slate-50 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HiOutlineChatBubbleLeftRight size={22} />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900">{ticket.subject}</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{ticket.id} • UNIT {ticket.unit}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
              <HiOutlineXMark size={22} />
            </button>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Thread Area */}
            <div className="flex-1 flex flex-col bg-white overflow-y-auto">
              <div className="p-8">
                {/* Original Message */}
                <div className="flex gap-4 mb-10">
                  <div className="h-10 w-10 rounded-full bg-slate-100 shrink-0 overflow-hidden">
                    <img src={ticket.userImage || "/api/placeholder/40/40"} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900">{ticket.user}</span>
                      <span className="text-[10px] font-medium text-slate-400">Received {ticket.createdAt}</span>
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed">
                      {ticket.description}
                    </div>
                  </div>
                </div>

                {/* Conversation Divider */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Conversation Started</span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                {/* Agent Reply */}
                <div className="flex flex-col items-end gap-2 ml-12">
                   <div className="bg-slate-900 text-white p-4 rounded-2xl rounded-tr-none text-sm max-w-[90%]">
                      Excellent, I've assigned a team to check the HVAC unit. They should arrive by 10 AM.
                   </div>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <HiCheckBadge size={14}/> Seen by tenant
                   </div>
                </div>
              </div>
              
              <TicketReplyArea />
            </div>

            <TicketSidebar ticket={ticket} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}