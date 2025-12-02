'use client';

import React, { useState } from 'react';
import { Ticket } from '@/lib/mockSupportData';
import { formatDistanceToNow, format } from 'date-fns';

interface TicketDetailProps {
    ticket: Ticket;
    onClose: () => void;
    onUpdateStatus: (status: string) => void;
}

export default function TicketDetail({ ticket, onClose, onUpdateStatus }: TicketDetailProps) {
    const [note, setNote] = useState('');

    const handleAddNote = () => {
        if (!note.trim()) return;
        // Mock add note logic
        setNote('');
        alert('Note added (mock)');
    };

    return (
        <div className="bg-white h-full flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${ticket.status === 'Open' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                ticket.status === 'In Progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                    'bg-green-50 text-green-700 border-green-100'
                            }`}>
                            {ticket.status}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{ticket.title}</h2>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Description</h3>
                            <div className="bg-gray-50 p-4 rounded-xl text-gray-700 leading-relaxed border border-gray-100">
                                {ticket.description}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Activity Timeline</h3>
                            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-8">
                                {/* Mock Timeline Items */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-white ring-1 ring-blue-500"></div>
                                    <div className="text-sm">
                                        <span className="font-bold text-gray-900">Ticket Created</span>
                                        <span className="text-gray-500 mx-2">•</span>
                                        <span className="text-gray-400">{format(new Date(ticket.createdAt), 'MMM d, yyyy h:mm a')}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Ticket created by {ticket.createdBy.name}</p>
                                </div>

                                {ticket.status !== 'Open' && (
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-100 border-2 border-white ring-1 ring-yellow-500"></div>
                                        <div className="text-sm">
                                            <span className="font-bold text-gray-900">Status Changed</span>
                                            <span className="text-gray-500 mx-2">•</span>
                                            <span className="text-gray-400">{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Status updated to <span className="font-medium">{ticket.status}</span> by {ticket.assignedTo}</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Add Note</h3>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Add an internal note or update..."
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00853E] focus:border-transparent min-h-[100px]"
                            />
                            <div className="mt-2 flex justify-end">
                                <button
                                    onClick={handleAddNote}
                                    disabled={!note.trim()}
                                    className="px-4 py-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium"
                                >
                                    Post Note
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Ticket Details</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Priority</label>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                                            ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {ticket.priority}
                                    </span>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Category</label>
                                    <span className="text-sm font-medium text-gray-900">{ticket.category}</span>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Assigned To</label>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {ticket.assignedTo ? ticket.assignedTo.charAt(0) : '?'}
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{ticket.assignedTo || 'Unassigned'}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">SLA Deadline</label>
                                    <span className="text-sm font-medium text-red-600 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatDistanceToNow(new Date(ticket.slaDeadline), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {ticket.relatedObject && (
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Related To</h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase">{ticket.relatedObject.type}</p>
                                        <p className="text-sm font-bold text-gray-900 line-clamp-1">{ticket.relatedObject.title}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <button
                                onClick={() => onUpdateStatus('Resolved')}
                                className="w-full py-2 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 transition-colors text-sm"
                            >
                                Mark as Resolved
                            </button>
                            <button className="w-full py-2 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm">
                                Escalate Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
