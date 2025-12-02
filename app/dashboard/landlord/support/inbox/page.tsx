'use client';

import React, { useState } from 'react';
import ConversationList from '@/components/dashboard/landlord/support/ConversationList';
import ChatPane from '@/components/dashboard/landlord/support/ChatPane';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, Message } from '@/lib/mockSupportData';

export default function InboxPage() {
    const [selectedId, setSelectedId] = useState<string | null>(MOCK_CONVERSATIONS[0]?.id || null);
    const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
    const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);

    const handleSelectConversation = (id: string) => {
        setSelectedId(id);
        // Mark as read logic (mock)
        setConversations(prev => prev.map(c =>
            c.id === id ? { ...c, unreadCount: 0 } : c
        ));
    };

    const handleSendMessage = (text: string, attachments?: File[]) => {
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
