'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlinePaperClip, HiOutlineLightningBolt } from 'react-icons/hi';

interface Ticket {
  id: string;
  user: string;
  subject: string;
  status: string;
  priority: string;
}

export default function TicketDetailModal({ ticket, onClose }: { ticket: Ticket | null, onClose: () => void }) {
  if (!ticket) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        />
        
        {/* Slide Panel */}
        <motion.div 
          initial={{ x: '100%' }} 
          animate={{ x: 0 }} 
          exit={{ x: '100%' }} 
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
        >
          {/* Modal Header */}
          <div className="p-6 border-b flex justify-between items-center bg-slate-50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">
                  {ticket.id}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {ticket.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{ticket.subject}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <HiOutlineX size={24} />
            </button>
          </div>

          {/* Chat/Conversation Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
            {/* User Message */}
            <div className="flex flex-col items-start">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Hi Support, I tried to make a payment for my listing #892 using my Verve card, 
                  but the transaction kept failing even though I have sufficient funds. 
                  Can you look into this?
                </p>
                <span className="text-[10px] text-slate-400 mt-2 block font-bold uppercase">{ticket.user} • 2h ago</span>
              </div>
            </div>

            {/* System Note */}
            <div className="flex justify-center">
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">
                Ticket assigned to you
              </span>
            </div>
          </div>

          {/* Reply Area */}
          <div className="p-6 border-t bg-white">
            <div className="mb-4 flex gap-2">
              <button className="text-[10px] font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded hover:bg-slate-200 transition-colors flex items-center gap-1">
                <HiOutlineLightningBolt /> Canned Response
              </button>
            </div>
            <div className="relative border-2 border-slate-100 rounded-2xl focus-within:border-brand-green transition-all p-2">
              <textarea 
                className="w-full p-3 text-sm outline-none resize-none h-32"
                placeholder="Type your response here..."
              />
              <div className="flex justify-between items-center p-2 border-t border-slate-50 mt-2">
                <button className="p-2 text-slate-400 hover:text-brand-green">
                  <HiOutlinePaperClip size={20} />
                </button>
                <button className="bg-brand-green text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-brand-green/20">
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}