'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack, MdOutlineChat, MdSend, MdChangeCircle, MdClose, MdCheckCircleOutline } from 'react-icons/md';
import { useAdminSupportItem } from '@/hooks/useAdminSupport';
import { useUserStore } from '@/store/userStore';

export default function TicketDetailPage() {
  const params = useParams();
  const { id } = params;
  const ticketId = typeof id === 'string' ? id : '';
  const user = useUserStore(state => state);

  const { ticket, isLoading, messages, sendMessage, isSending, updateStatus } = useAdminSupportItem(ticketId);
  const [newMessage, setNewMessage] = useState('');

  if (isLoading) {
    return (
      <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
        <div className="flex items-center justify-center min-h-[400px]">
           <div className="animate-spin size-8 border-4 border-brand-green border-t-transparent rounded-full" />
        </div>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/admin/support" className="p-2 rounded-full hover:bg-gray-200">
            <MdArrowBack size={24} />
          </Link>
          <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Ticket Not Found</h1>
        </div>
        <p className="text-gray-600">The support ticket with ID &quot;{id}&quot; could not be found.</p>
      </main>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage({
        senderId: user.id || 'admin-id',
        senderName: 'Admin Support',
        senderRole: 'admin',
        content: newMessage.trim(),
      }, {
        onSuccess: () => setNewMessage('')
      });
    }
  };

  const handleChangeStatus = (newStatus: string) => {
    updateStatus(newStatus);
  };

  const statusColors: Record<string, string> = {
    'Open': 'bg-red-100 text-red-600',
    'Pending': 'bg-amber-100 text-amber-600',
    'Closed': 'bg-green-100 text-green-600'
  };
  const statusColor = statusColors[ticket.status] || 'bg-gray-100 text-gray-700';

  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/admin/support" className="p-2 rounded-full hover:bg-gray-200">
          <MdArrowBack size={24} />
        </Link>
        <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Ticket #{ticket.id}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Ticket Details and Messages */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-[70vh]">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
            <h2 className="text-xl font-bold text-gray-900">{ticket.title}</h2>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${statusColor}`}>{ticket.status}</span>
              <div className="relative group">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                  <MdChangeCircle size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 hidden group-hover:block">
                  <button onClick={() => handleChangeStatus('Open')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Open</button>
                  <button onClick={() => handleChangeStatus('Pending')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Pending</button>
                  <button onClick={() => handleChangeStatus('Closed')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Closed</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
            {/* Initial Description from Ticket */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold flex-shrink-0">
                {(ticket.submittedByName || 'U').charAt(0)}
              </div>
              <div className="bg-blue-50 p-3 rounded-lg max-w-[80%]">
                <p className="text-sm font-medium text-blue-800">{ticket.submittedByName || 'Unknown User'}</p>
                <p className="text-xs text-gray-500 mb-1">{new Date(ticket.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-800">{ticket.description || 'Ticket opened.'}</p>
              </div>
            </div>

            {/* Message History */}
            {messages.map((msg: any) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.senderRole === 'admin' ? 'justify-end' : ''}`}>
                {msg.senderRole !== 'admin' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold flex-shrink-0">
                    {msg.senderName?.charAt(0) || 'U'}
                  </div>
                )}
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.senderRole === 'admin' ? 'bg-brand-green-50 text-brand-green-800' : 'bg-blue-50 text-blue-800'}`}>
                  <p className="text-sm font-medium">{msg.senderName}</p>
                  <p className="text-xs text-gray-500 mb-1">{new Date(msg.createdAt).toLocaleString()}</p>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.senderRole === 'admin' && (
                  <div className="w-8 h-8 rounded-full bg-brand-green-100 flex items-center justify-center text-brand-green-700 text-sm font-bold flex-shrink-0">
                    AD
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-brand-green focus:border-brand-green"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors"
            >
              <MdSend size={24} />
            </button>
          </div>
        </div>

        {/* Sidebar: Ticket Info */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-fit sticky top-8">
          <h2 className="text-xl font-bold text-gray-900 pb-2 border-b mb-4">Ticket Information</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong>Ticket ID:</strong> #{ticket.id.slice(0, 8)}...</p>
            <p><strong>Category:</strong> {ticket.category || 'General'}</p>
            <p><strong>Priority:</strong> {ticket.priority || 'Medium'}</p>
            <p><strong>Status:</strong> <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${statusColor}`}>{ticket.status}</span></p>
            <p><strong>Submitted By:</strong> {ticket.submittedBy ? (
              <Link href={`/dashboard/admin/users/profile/${ticket.submittedBy}`} className="text-brand-green hover:underline">
                {ticket.submittedByName || 'Unknown User'}
              </Link>
            ) : 'Unknown User'}</p>
            <p><strong>Submitted On:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button onClick={() => handleChangeStatus('Closed')} className="w-full flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                <MdCheckCircleOutline size={20} /> Mark as Resolved
              </button>
              <button onClick={() => handleChangeStatus('Pending')} className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                <MdChangeCircle size={20} /> Set to Pending
              </button>
              <button onClick={() => handleChangeStatus('Closed')} className="w-full flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                <MdClose size={20} /> Close Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}