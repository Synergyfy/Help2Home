'use client';

import React, { useState } from 'react';
import { Ticket, MOCK_TEMPLATES, Template } from '@/lib/mockSupportData';
import { formatDistanceToNow, format } from 'date-fns';
import ResolveTicketModal from './ResolveTicketModal';
import { HiOutlineCheckCircle, HiOutlineXMark } from 'react-icons/hi2';

interface TicketDetailProps {
    ticket: Ticket;
    onClose: () => void;
    onUpdateStatus: (status: string) => void;
}

export default function TicketDetail({ ticket, onClose, onUpdateStatus }: TicketDetailProps) {
    const [note, setNote] = useState('');
    const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);

    const handleAddNote = () => {
        if (!note.trim()) return;
        // Mock add note logic
        setNote('');
        alert('Note added (mock)');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNote(value);

        if (value.endsWith('/')) {
            setShowTemplates(true);
        } else if (showTemplates && !value.includes('/')) {
            setShowTemplates(false);
        }
    };

    const insertTemplate = (template: Template) => {
        let content = template.content;
        // Basic placeholder logic
        content = content.replace('{applicantName}', ticket.createdBy.name);
        content = content.replace('{propertyTitle}', ticket.relatedObject?.title || 'the property');

        const textWithoutSlash = note.endsWith('/') ? note.slice(0, -1) : note;
        setNote(textWithoutSlash + content);
        setShowTemplates(false);
    };

    return (
        <div className="bg-white h-full flex flex-col relative">
            <ResolveTicketModal 
                isOpen={isResolveModalOpen}
                onClose={() => setIsResolveModalOpen(false)}
                onConfirm={() => onUpdateStatus('Resolved')}
            />
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${ticket.status === 'Open' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                ticket.status === 'In Progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                    'bg-green-50 text-green-700 border-green-100'
                            }`}>
                            {ticket.status}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{ticket.title}</h2>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Description</h3>
                            <div className="bg-gray-50 p-6 rounded-3xl text-gray-700 font-medium leading-relaxed border border-gray-100 shadow-inner">
                                {ticket.description}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Activity Timeline</h3>
                            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-8">
                                {/* Mock Timeline Items */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-white ring-1 ring-blue-500"></div>
                                    <div className="text-xs">
                                        <span className="font-bold text-gray-900">Ticket Created</span>
                                        <span className="text-gray-500 mx-2">•</span>
                                        <span className="text-gray-400 font-medium">{format(new Date(ticket.createdAt), 'MMM d, yyyy h:mm a')}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">Ticket created by {ticket.createdBy.name}</p>
                                </div>

                                {ticket.status !== 'Open' && (
                                    <div className="relative pl-8">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-100 border-2 border-white ring-1 ring-yellow-500"></div>
                                        <div className="text-xs">
                                            <span className="font-bold text-gray-900">Status Changed</span>
                                            <span className="text-gray-500 mx-2">•</span>
                                            <span className="text-gray-400 font-medium">{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Status updated to <span className="font-bold text-gray-900">{ticket.status}</span> by {ticket.assignedTo}</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="relative">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Add Internal Note</h3>
                            
                            {showTemplates && (
                                <div className="absolute bottom-full left-0 mb-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-20 animate-in slide-in-from-bottom-2">
                                    <div className="flex justify-between items-center px-3 py-2 border-b border-gray-50 mb-2">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Replies</span>
                                        <button onClick={() => setShowTemplates(false)}>
                                            <HiOutlineXMark className="text-gray-400" size={16} />
                                        </button>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
                                        {MOCK_TEMPLATES.map(tpl => (
                                            <button
                                                key={tpl.id}
                                                onClick={() => insertTemplate(tpl)}
                                                className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-xl transition-all group"
                                            >
                                                <p className="text-xs font-bold text-gray-900 group-hover:text-brand-green">{tpl.title}</p>
                                                <p className="text-[10px] text-gray-500 line-clamp-1">{tpl.content}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <textarea
                                value={note}
                                onChange={handleInputChange}
                                placeholder="Add a private note or update (type / for templates)..."
                                className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white rounded-3xl outline-none transition-all font-medium text-gray-900 resize-none min-h-[120px]"
                            />
                            <div className="mt-3 flex justify-end">
                                <button
                                    onClick={handleAddNote}
                                    disabled={!note.trim()}
                                    className="px-8 py-3 bg-gray-900 text-white rounded-2xl hover:bg-black disabled:opacity-50 transition-all text-sm font-black active:scale-95 shadow-lg"
                                >
                                    Post Note
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Metadata</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Priority</label>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                                            ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {ticket.priority}
                                    </span>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Category</label>
                                    <span className="text-sm font-bold text-gray-900">{ticket.category}</span>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Assigned Agent</label>
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-xl bg-gray-200 flex items-center justify-center text-xs font-black text-gray-500 shadow-sm">
                                            {ticket.assignedTo ? ticket.assignedTo.charAt(0) : '?'}
                                        </div>
                                        <span className="text-sm font-bold text-gray-900">{ticket.assignedTo || 'Unassigned'}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">SLA Response</label>
                                    <div className="flex items-center gap-2 text-sm font-bold text-red-600 bg-red-50 w-fit px-3 py-1.5 rounded-xl border border-red-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatDistanceToNow(new Date(ticket.slaDeadline), { addSuffix: true })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {ticket.relatedObject && (
                            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Linked Object</h3>
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{ticket.relatedObject.type}</p>
                                        <p className="text-sm font-black text-gray-900 truncate">{ticket.relatedObject.title}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 pt-4">
                            {ticket.status !== 'Resolved' && (
                                <button
                                    onClick={() => setIsResolveModalOpen(true)}
                                    className="w-full py-4 bg-brand-green text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <HiOutlineCheckCircle size={20} strokeWidth={2.5} />
                                    Mark as Resolved
                                </button>
                            )}
                            <button className="w-full py-4 border-2 border-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-50 transition-all text-sm active:scale-95">
                                Escalate Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
