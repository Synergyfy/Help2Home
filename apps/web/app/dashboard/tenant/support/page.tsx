'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CreateTicketForm from '@/components/dashboard/support/CreateTicketForm';
import TicketList from '@/components/dashboard/support/TicketList';
import TicketThread from '@/components/dashboard/support/TicketThread';
import FAQSection from '@/components/dashboard/support/FAQSection';
import { Ticket, CreateTicketData, FAQItem } from '@/components/dashboard/support/types';
import { getTickets, getFAQs, createTicket, sendMessage } from '@/utils/mockSupportApi';

function SupportContent() {
    const searchParams = useSearchParams();
    const initialView = searchParams.get('view') === 'create' ? 'create' : 'list';
    const [view, setView] = useState<'list' | 'create' | 'thread'>(initialView);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [ticketsData, faqsData] = await Promise.all([getTickets(), getFAQs()]);
                setTickets(ticketsData);
                setFaqs(faqsData);
            } catch (error) {
                console.error("Failed to load support data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // Sync view with query param if it changes
    useEffect(() => {
        const queryView = searchParams.get('view');
        if (queryView === 'create') {
            setView('create');
        }
    }, [searchParams]);

    // Poll for updates when in thread view
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (view === 'thread' && selectedTicketId) {
            interval = setInterval(async () => {
                const updatedTickets = await getTickets();
                setTickets(updatedTickets);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [view, selectedTicketId]);

    const handleCreateTicket = async (data: CreateTicketData) => {
        try {
            const newTicket = await createTicket(data);
            setTickets(prev => [newTicket, ...prev]);
            setView('list');
            alert("Ticket created successfully! We've sent a confirmation email.");
        } catch (error) {
            alert("Failed to create ticket. Please try again.");
        }
    };

    const handleSelectTicket = (ticketId: string) => {
        setSelectedTicketId(ticketId);
        setView('thread');
    };

    const handleSendMessage = async (content: string) => {
        if (!selectedTicketId) return;
        try {
            await sendMessage(selectedTicketId, content);
            // Optimistic update
            const updatedTickets = await getTickets();
            setTickets(updatedTickets);
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    const selectedTicket = tickets.find(t => t.id === selectedTicketId);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading support center...</div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
                {view === 'list' && (
                    <button
                        onClick={() => setView('create')}
                        className="bg-[#00853E] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#006b32] transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Ticket
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    {view === 'list' && (
                        <TicketList
                            tickets={tickets}
                            onSelectTicket={handleSelectTicket}
                            onCreateNew={() => setView('create')}
                        />
                    )}

                    {view === 'create' && (
                        <CreateTicketForm
                            onSubmit={handleCreateTicket}
                            onCancel={() => setView('list')}
                        />
                    )}

                    {view === 'thread' && selectedTicket && (
                        <TicketThread
                            ticket={selectedTicket}
                            onSendMessage={handleSendMessage}
                            onBack={() => setView('list')}
                        />
                    )}
                </div>

                {/* Sidebar - FAQ & Contact */}
                <div className="lg:col-span-1 space-y-6">
                    <FAQSection faqs={faqs} />

                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">Live Chat Offline</h3>
                        <p className="text-sm text-blue-800 mb-4">
                            Our live chat agents are currently offline. Please create a ticket and we will respond within 24 hours.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            Offline
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SupportPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SupportContent />
        </Suspense>
    );
}
