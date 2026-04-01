'use client';

import React, { useState } from 'react';
import { Conversation } from '@/lib/mockSupportData';
import { formatDistanceToNow } from 'date-fns';

interface ConversationListProps {
    conversations: Conversation[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export default function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'All' | 'Unread'>('All');

    const filteredConversations = conversations.filter(conv => {
        const matchesSearch = conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All' || (filter === 'Unread' && conv.unreadCount > 0);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200 w-full md:w-80 lg:w-96">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Messages</h2>

                <div className="relative mb-3">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('All')}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${filter === 'All' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('Unread')}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${filter === 'Unread' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Unread
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                    filteredConversations.map(conv => {
                        const otherParticipant = conv.participants.find(p => p.role !== 'landlord') || conv.participants[0];
                        return (
                            <div
                                key={conv.id}
                                onClick={() => onSelect(conv.id)}
                                className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selectedId === conv.id ? 'bg-blue-50/50 border-l-4 border-l-[#00853E]' : 'border-l-4 border-l-transparent'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`text-sm ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-900'}`}>
                                        {otherParticipant.name}
                                    </h3>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {formatDistanceToNow(new Date(conv.lastMessage.createdAt), { addSuffix: false })}
                                    </span>
                                </div>

                                <p className={`text-sm line-clamp-1 mb-2 ${conv.unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                    {conv.lastMessage.senderId === 'user_1' && 'You: '}
                                    {conv.lastMessage.text}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {conv.linkedObject && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                                                {conv.linkedObject.type}
                                            </span>
                                        )}
                                        {conv.labels.map(label => (
                                            <span key={label} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600">
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                    {conv.unreadCount > 0 && (
                                        <span className="w-5 h-5 rounded-full bg-[#00853E] text-white text-[10px] font-bold flex items-center justify-center">
                                            {conv.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        <p className="text-sm">No conversations found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
