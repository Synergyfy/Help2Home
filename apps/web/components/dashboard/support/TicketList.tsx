'use client';

import React from 'react';
import { Ticket } from './types';

interface TicketListProps {
    tickets: Ticket[];
    onSelectTicket: (ticketId: string) => void;
    onCreateNew: () => void;
}

export default function TicketList({ tickets, onSelectTicket, onCreateNew }: TicketListProps) {
    if (tickets.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No tickets yet</h3>
                <p className="text-gray-500 mb-6">Need help? Create a new support ticket and we'll assist you.</p>
                <button
                    onClick={onCreateNew}
                    className="px-6 py-3 bg-[#00853E] text-white font-bold rounded-lg hover:bg-[#006b32] transition-colors"
                >
                    Create New Ticket
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tickets.map((ticket) => (
                <div
                    key={ticket.id}
                    onClick={() => onSelectTicket(ticket.id)}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-mono text-gray-500">#{ticket.id}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                                    ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                        ticket.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                {ticket.status}
                            </span>
                            {ticket.priority === 'High' && (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    High Priority
                                </span>
                            )}
                        </div>
                        <span className="text-xs text-gray-500">{ticket.lastUpdated}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{ticket.subject}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {ticket.messages[ticket.messages.length - 1]?.content || 'No messages yet'}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">{ticket.category}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
