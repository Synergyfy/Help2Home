'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message, Template, MOCK_TEMPLATES } from '@/lib/mockSupportData';
import { formatDistanceToNow } from 'date-fns';

interface ChatPaneProps {
    conversation: Conversation | null;
    messages: Message[];
    onSendMessage: (text: string, attachments?: File[]) => void;
}

export default function ChatPane({ conversation, messages, onSendMessage }: ChatPaneProps) {
    const [newMessage, setNewMessage] = useState('');
    const [showTemplates, setShowTemplates] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!conversation) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg font-medium">Select a conversation to start messaging</p>
            </div>
        );
    }

    const otherParticipant = conversation.participants.find(p => p.role !== 'landlord') || conversation.participants[0];

    const handleSend = () => {
        if (!newMessage.trim()) return;
        onSendMessage(newMessage);
        setNewMessage('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const insertTemplate = (template: Template) => {
        // Simple placeholder replacement logic (mock)
        let content = template.content;
        content = content.replace('{applicantName}', otherParticipant.name);
        content = content.replace('{propertyTitle}', conversation.linkedObject?.title || 'the property');

        setNewMessage(content);
        setShowTemplates(false);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white">
            {/* Header */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                        {otherParticipant.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900">{otherParticipant.name}</h2>
                        <p className="text-xs text-gray-500 capitalize">{otherParticipant.role}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {conversation.linkedObject && (
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{conversation.linkedObject.type}:</span>
                            <span className="text-sm font-medium text-gray-900">{conversation.linkedObject.title}</span>
                        </div>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === 'user_1';
                    const showAvatar = !isMe && (index === 0 || messages[index - 1].senderId !== msg.senderId);

                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            {!isMe && (
                                <div className={`w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 mr-2 flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                                    {msg.senderName.charAt(0)}
                                </div>
                            )}

                            <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${isMe
                                        ? 'bg-[#00853E] text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}>
                                    {msg.text}

                                    {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {msg.attachments.map(att => (
                                                <div key={att.id} className={`flex items-center gap-3 p-2 rounded-lg ${isMe ? 'bg-white/10' : 'bg-gray-50'}`}>
                                                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-gray-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium truncate">{att.filename}</p>
                                                        <p className={`text-[10px] ${isMe ? 'text-green-100' : 'text-gray-400'}`}>{att.size}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span className="text-[10px] text-gray-400 mt-1 px-1">
                                    {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                {showTemplates && (
                    <div className="absolute bottom-20 left-4 right-4 md:left-auto md:right-auto md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-10 animate-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100 mb-2">
                            <h3 className="text-xs font-bold text-gray-500 uppercase">Quick Replies</h3>
                            <button onClick={() => setShowTemplates(false)} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-1">
                            {MOCK_TEMPLATES.map(tpl => (
                                <button
                                    key={tpl.id}
                                    onClick={() => insertTemplate(tpl)}
                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 group"
                                >
                                    <span className="font-medium text-gray-900 block mb-0.5">{tpl.title}</span>
                                    <span className="text-xs text-gray-500 line-clamp-1 group-hover:text-gray-700">{tpl.content}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-end gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-[#00853E] focus-within:border-transparent transition-all">
                    <div className="flex gap-1 pb-1">
                        <button
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Attach file"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className={`p-2 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors ${showTemplates ? 'text-[#00853E] bg-green-50' : 'text-gray-400'}`}
                            title="Quick Replies"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </button>
                    </div>

                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-900 placeholder-gray-500 resize-none max-h-32 py-3"
                        rows={1}
                        style={{ minHeight: '44px' }}
                    />

                    <button
                        onClick={handleSend}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
