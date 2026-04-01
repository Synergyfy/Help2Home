'use client';

import React from 'react';
import { Ticket } from '@/lib/mockSupportData';
import { formatDistanceToNow } from 'date-fns';

interface TicketListProps {
    tickets: Ticket[];
    onSelect: (id: string) => void;
}

export default function TicketList({ tickets, onSelect }: TicketListProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'In Progress': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            case 'Resolved': return 'bg-green-50 text-green-700 border-green-100';
            case 'Closed': return 'bg-gray-50 text-gray-700 border-gray-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-red-600 bg-red-50';
            case 'Medium': return 'text-orange-600 bg-orange-50';
            case 'Low': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Ticket ID</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Subject</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Priority</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Category</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs">Last Updated</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {tickets.map((ticket) => (
                            <tr
                                key={ticket.id}
                                onClick={() => onSelect(ticket.id)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors group"
                            >
                                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                    {ticket.id}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{ticket.title}</div>
                                    {ticket.relatedObject && (
                                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                            <span className="uppercase text-[10px] font-bold tracking-wide text-gray-400">{ticket.relatedObject.type}:</span>
                                            {ticket.relatedObject.title}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                        {ticket.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {ticket.category}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-[#00853E] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {tickets.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                    <p>No tickets found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
