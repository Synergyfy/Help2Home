'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TicketList from '@/components/dashboard/landlord/support/TicketList';
import TicketDetail from '@/components/dashboard/landlord/support/TicketDetail';
import CreateTicketModal from '@/components/dashboard/landlord/support/CreateTicketModal';
import { MOCK_TICKETS, Ticket } from '@/lib/mockSupportData';

function TicketsContent() {
    const searchParams = useSearchParams();
    const action = searchParams.get('action');
    
    const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        if (action === 'create') {
            setIsCreateModalOpen(true);
        }
    }, [action]);

    const handleSelectTicket = (id: string) => {
        setSelectedTicketId(id);
    };

    const handleCloseDetail = () => {
        setSelectedTicketId(null);
    };

    const handleUpdateStatus = (status: string) => {
        if (!selectedTicketId) return;

        setTickets(prev => prev.map(t =>
            t.id === selectedTicketId ? { ...t, status: status as any, updatedAt: new Date().toISOString() } : t
        ));
    };

    const handleCreateTicket = (newTicket: Ticket) => {
        setTickets(prev => [newTicket, ...prev]);
    };

    const selectedTicket = tickets.find(t => t.id === selectedTicketId);

    return (
        <div className="pb-20 h-[calc(100vh-6rem)] flex flex-col">
            <div className="mb-6 flex justify-between items-center shrink-0">
                <div>
                    <Link href="/dashboard/landlord/support" className="text-gray-500 hover:text-gray-700 text-sm mb-1 inline-block">
                        ← Back to Support Hub
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
                </div>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Ticket
                </button>
            </div>

            <div className="flex-1 min-h-0 relative">
                {selectedTicket ? (
                    <div className="absolute inset-0 z-10 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <TicketDetail
                            ticket={selectedTicket}
                            onClose={handleCloseDetail}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    </div>
                ) : (
                    <TicketList
                        tickets={tickets}
                        onSelect={handleSelectTicket}
                    />
                )}
            </div>

            <CreateTicketModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateTicket}
            />
        </div>
    );
}

export default function TicketsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading Tickets...</div>}>
            <TicketsContent />
        </Suspense>
    );
}
