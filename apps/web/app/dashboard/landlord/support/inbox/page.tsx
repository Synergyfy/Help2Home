'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ConversationList from '@/components/dashboard/landlord/support/ConversationList';
import ChatPane from '@/components/dashboard/landlord/support/ChatPane';
import { Conversation, Message } from '@/lib/api/support-types';
import { useLandlordInbox } from '@/hooks/useLandlordInbox';

function InboxContent() {
    const searchParams = useSearchParams();
    const tenantId = searchParams.get('tenantId');

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [prevTenantId, setPrevTenantId] = useState(tenantId);
    
    // Using the hook
    const { conversations, messages, isLoading, sendMessage, markAsRead } = useLandlordInbox(selectedId);

    if (tenantId !== prevTenantId || (!selectedId && conversations.length > 0)) {
        setPrevTenantId(tenantId);
        let nextId = selectedId;

        if (tenantId) {
            const foundConv = conversations.find(c =>
                c.participants.some(p =>
                    p.id === tenantId ||
                    p.id === `tenant_${tenantId}` ||
                    p.name.toLowerCase().includes(tenantId.toLowerCase()) ||
                    (p as any).email?.toLowerCase() === tenantId.toLowerCase()
                )
            );
            if (foundConv) {
                nextId = foundConv.id;
            }
        }

        if (!nextId && conversations.length > 0) {
            nextId = conversations[0].id;
        }

        if (nextId !== selectedId) {
            setSelectedId(nextId);
        }
    }

    const handleSelectConversation = (id: string) => {
        setSelectedId(id);
        markAsRead(id);
    };

    const handleSendMessage = (text: string, _attachments?: File[]) => {
        if (!selectedId) return;
        sendMessage({ conversationId: selectedId, text });
    };

    if (isLoading && conversations.length === 0) return <div className="p-12 text-center text-gray-500 font-bold animate-pulse">Loading Inbox...</div>;

    const selectedConversation = conversations.find((c: Conversation) => c.id === selectedId) || null;
    const currentMessages = messages || [];

    return (
        <div className="flex h-[calc(100vh-6rem)] -m-6 md:-m-8 bg-white overflow-hidden">
            <ConversationList
                conversations={conversations}
                selectedId={selectedId}
                onSelect={handleSelectConversation}
            />
            <ChatPane
                conversation={selectedConversation}
                messages={currentMessages}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
}

export default function InboxPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading Inbox...</div>}>
            <InboxContent />
        </Suspense>
    );
}
