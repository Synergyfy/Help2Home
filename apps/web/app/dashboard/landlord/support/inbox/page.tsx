'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ConversationList from '@/components/dashboard/landlord/support/ConversationList';
import ChatPane from '@/components/dashboard/landlord/support/ChatPane';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, Message } from '@/lib/mockSupportData';

function InboxContent() {
    const searchParams = useSearchParams();
    const tenantId = searchParams.get('tenantId');

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [prevTenantId, setPrevTenantId] = useState(tenantId);
    const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
    const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);

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
        // Mark as read logic (mock)
        setConversations(prev => prev.map(c =>
            c.id === id ? { ...c, unreadCount: 0 } : c
        ));
    };

    const handleSendMessage = (text: string, _attachments?: File[]) => {
        if (!selectedId) return;

        const newMessage: Message = {
            id: `msg_${Date.now()}`,
            conversationId: selectedId,
            senderId: 'user_1',
            senderName: 'You',
            role: 'landlord',
            text: text,
            type: 'text',
            createdAt: new Date().toISOString(),
            isRead: true
        };

        setMessages(prev => ({
            ...prev,
            [selectedId]: [...(prev[selectedId] || []), newMessage]
        }));

        // Update last message in conversation list
        setConversations(prev => prev.map(c =>
            c.id === selectedId ? {
                ...c,
                lastMessage: newMessage,
                updatedAt: newMessage.createdAt
            } : c
        ));
    };

    const selectedConversation = conversations.find(c => c.id === selectedId) || null;
    const currentMessages = selectedId ? (messages[selectedId] || []) : [];

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
