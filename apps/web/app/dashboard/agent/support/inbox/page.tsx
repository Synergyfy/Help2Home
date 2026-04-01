'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ConversationList from '@/components/dashboard/agent/support/ConversationList';
import ChatPane from '@/components/dashboard/agent/support/ChatPane';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, Message } from '@/lib/mockSupportData';

function InboxContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const partnerId = searchParams.get('partnerId');

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [prevParams, setPrevParams] = useState({ leadId, partnerId });
    const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
    const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);

    if (leadId !== prevParams.leadId || partnerId !== prevParams.partnerId || (!selectedId && conversations.length > 0)) {
        setPrevParams({ leadId, partnerId });
        const targetId = leadId || partnerId;
        let nextId = selectedId;

        if (targetId) {
            const foundConv = conversations.find(c =>
                c.participants.some(p =>
                    p.id === targetId ||
                    p.id === `lead_${targetId}` ||
                    p.id === `partner_${targetId}` ||
                    p.name.toLowerCase().includes(targetId.toLowerCase())
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
            role: 'agent',
            text: text,
            type: 'text',
            createdAt: new Date().toISOString(),
            isRead: true
        };

        setMessages(prev => ({
            ...prev,
            [selectedId]: [...(prev[selectedId] || []), newMessage]
        }));

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

export default function AgentInboxPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading Inbox...</div>}>
            <InboxContent />
        </Suspense>
    );
}
