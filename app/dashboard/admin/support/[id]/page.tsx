// app/dashboard/admin/support/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack, MdOutlineChat, MdSend, MdChangeCircle, MdClose, MdCheckCircleOutline } from 'react-icons/md';

// Mock data for demonstration - in a real app, this would come from an API
const MOCK_TICKET_DETAILS = {
  '1023': {
    id: '1023',
    priority: 'High',
    title: 'Payment failed for User #892',
    status: 'Open',
    statusColor: 'bg-red-100 text-red-600',
    submittedBy: 'John Doe',
    submittedById: 'user892',
    date: 'Oct 24, 2023, 10:30 AM',
    category: 'Billing',
    description: 'User John Doe (ID #892) reported that their payment for property ID #L5678 failed to process. They have tried multiple times with different cards. Please investigate the payment gateway logs and assist the user.',
    messages: [
      { id: 1, sender: 'John Doe', type: 'user', timestamp: 'Oct 24, 2023, 10:30 AM', text: 'My payment for property L5678 keeps failing. I tried two different cards. Can you help?' },
      { id: 2, sender: 'Admin', type: 'admin', timestamp: 'Oct 24, 2023, 11:00 AM', text: 'Hi John, we are looking into this. Could you please confirm the last 4 digits of the cards you attempted to use?' },
      { id: 3, sender: 'John Doe', type: 'user', timestamp: 'Oct 24, 2023, 11:15 AM', text: 'Last 4 digits: ****1234 and ****5678.' },
    ],
  },
  '1021': {
    id: '1021',
    priority: 'Medium',
    title: 'Photo upload limit issue',
    status: 'Open',
    statusColor: 'bg-amber-100 text-amber-600',
    submittedBy: 'Sarah Smith',
    submittedById: 'user777',
    date: 'Oct 23, 2023, 04:15 PM',
    category: 'Technical',
    description: 'User Sarah Smith (ID #777) is unable to upload more than 5 photos to her listing, even though the limit is 10. She is using a desktop browser (Chrome).',
    messages: [
      { id: 1, sender: 'Sarah Smith', type: 'user', timestamp: 'Oct 23, 2023, 04:15 PM', text: 'I can only upload 5 photos to my listing. The system says I can upload up to 10. Using Chrome on desktop.' },
      { id: 2, sender: 'Admin', type: 'admin', timestamp: 'Oct 23, 2023, 04:30 PM', text: 'Thanks for reporting, Sarah. We are investigating a potential bug with the photo uploader. We will get back to you shortly.' },
    ],
  },
  '1019': {
    id: '1019',
    priority: 'Low',
    title: 'Dark mode feature request',
    status: 'Closed',
    statusColor: 'bg-green-100 text-green-600',
    submittedBy: 'Alice Lee',
    submittedById: 'user666',
    date: 'Oct 22, 2023, 09:00 AM',
    category: 'Feature Request',
    description: 'User Alice Lee (ID #666) has requested a dark mode feature for the entire platform. She believes it would improve user experience during late-night browsing.',
    messages: [
      { id: 1, sender: 'Alice Lee', type: 'user', timestamp: 'Oct 22, 2023, 09:00 AM', text: 'Please add a dark mode. It would be great for my eyes at night!' },
      { id: 2, sender: 'Admin', type: 'admin', timestamp: 'Oct 22, 2023, 09:10 AM', text: 'Thanks for your suggestion, Alice! We\'ve added it to our feature request backlog for consideration.' },
      { id: 3, sender: 'Admin', type: 'admin', timestamp: 'Oct 23, 2023, 10:00 AM', text: 'Marking this ticket as closed. Feature request logged.' },
    ],
  },
};

export default function TicketDetailPage() {
  const params = useParams();
  const { id } = params;
  const initialTicket = MOCK_TICKET_DETAILS[id as keyof typeof MOCK_TICKET_DETAILS];

  const [ticket, setTicket] = useState(initialTicket);
  const [newMessage, setNewMessage] = useState('');

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
      const updatedMessages = [...ticket.messages, {
        id: ticket.messages.length + 1,
        sender: 'Admin',
        type: 'admin',
        timestamp: new Date().toLocaleString(),
        text: newMessage.trim(),
      }];
      setTicket({ ...ticket, messages: updatedMessages });
      setNewMessage('');
      // In a real app, send message to API
    }
  };

  const handleChangeStatus = (newStatus: string) => {
    let newColor = '';
    if (newStatus === 'Open') newColor = 'bg-red-100 text-red-600';
    else if (newStatus === 'Pending') newColor = 'bg-amber-100 text-amber-600';
    else if (newStatus === 'Closed') newColor = 'bg-green-100 text-green-600';

    setTicket(prev => ({ ...prev, status: newStatus, statusColor: newColor }));
    // In a real app, update status via API
  };

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
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${ticket.statusColor}`}>{ticket.status}</span>
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
            {/* Initial Description */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold flex-shrink-0">
                {ticket.submittedBy.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="bg-blue-50 p-3 rounded-lg max-w-[80%]">
                <p className="text-sm font-medium text-blue-800">{ticket.submittedBy}</p>
                <p className="text-xs text-gray-500 mb-1">{ticket.date}</p>
                <p className="text-sm text-gray-800">{ticket.description}</p>
              </div>
            </div>

            {/* Message History */}
            {ticket.messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.type === 'admin' ? 'justify-end' : ''}`}>
                {msg.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold flex-shrink-0">
                    {msg.sender.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.type === 'admin' ? 'bg-brand-green-50 text-brand-green-800' : 'bg-blue-50 text-blue-800'}`}>
                  <p className="text-sm font-medium">{msg.sender}</p>
                  <p className="text-xs text-gray-500 mb-1">{msg.timestamp}</p>
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.type === 'admin' && (
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
            <p><strong>Ticket ID:</strong> #{ticket.id}</p>
            <p><strong>Category:</strong> {ticket.category}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Status:</strong> <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${ticket.statusColor}`}>{ticket.status}</span></p>
            <p><strong>Submitted By:</strong> <Link href={`/dashboard/admin/users/profile/${ticket.submittedById}`} className="text-brand-green hover:underline">{ticket.submittedBy}</Link></p>
            <p><strong>Submitted On:</strong> {ticket.date}</p>
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