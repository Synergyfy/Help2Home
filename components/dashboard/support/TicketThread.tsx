'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Ticket } from './types';

interface TicketThreadProps {
    ticket: Ticket;
    onSendMessage: (content: string) => void;
    onBack: () => void;
}

export default function TicketThread({ ticket, onSendMessage, onBack }: TicketThreadProps) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [ticket.messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        onSendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-gray-900">#{ticket.id} - {ticket.subject}</h2>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                                ${ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                                    ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                        ticket.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                {ticket.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">{ticket.category}</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                {ticket.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'user'
                                ? 'bg-[#00853E] text-white rounded-br-none'
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                            }`}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-bold ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-900'}`}>
                                    {msg.senderName}
                                </span>
                                <span className={`text-xs ${msg.sender === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
                {ticket.status === 'Closed' ? (
                    <div className="text-center py-4 bg-gray-50 rounded-lg text-gray-500 text-sm">
                        This ticket is closed and can't receive new messages.
                    </div>
                ) : (
                    <form onSubmit={handleSend} className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your reply..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="px-4 py-2 bg-[#00853E] text-white font-bold rounded-lg hover:bg-[#006b32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Send
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
