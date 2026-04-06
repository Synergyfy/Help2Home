// app/dashboard/admin/support/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { HiOutlineTicket, HiOutlineFilter } from 'react-icons/hi';
import { MdSearch } from 'react-icons/md';
import { useAdminSupportList } from '@/hooks/useAdminSupport';

export default function AdminSupportTicketsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');

    const { data: items = [], isLoading } = useAdminSupportList(filterStatus);

    const filteredTickets = items.filter((ticket: any) => {
        const matchesSearch = ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              ticket.submittedByName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              String(ticket.id).includes(searchTerm);
        const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
        const matchesPriority = filterPriority === 'All' || ticket.priority === filterPriority;
        return matchesSearch && matchesPriority;
    });

    const statusColors: Record<string, string> = {
        'Open': 'bg-red-100 text-red-600',
        'Pending': 'bg-amber-100 text-amber-600',
        'Closed': 'bg-green-100 text-green-600'
    };

    return (
        <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
            <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight mb-8">Support Tickets</h1>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MdSearch size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <select
                            className="p-2 border border-gray-300 rounded-md text-sm"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="Pending">Pending</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <select
                            className="p-2 border border-gray-300 rounded-md text-sm"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                        >
                            <option value="All">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">View</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-bold animate-pulse">
                                        Loading tickets...
                                    </td>
                                </tr>
                            ) : (
                                filteredTickets.map((ticket: any) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{ticket.id.slice(0, 8)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[ticket.status] || 'bg-gray-100 text-gray-700'}`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.priority || 'Medium'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.submittedByName || 'User'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/dashboard/admin/support/${ticket.id}`} className="text-brand-green hover:text-brand-green/80">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
                {!isLoading && filteredTickets.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No tickets found matching your criteria.</div>
                )}
            </div>
        </main>
    );
}