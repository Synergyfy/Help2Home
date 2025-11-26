'use client';

import React from 'react';

interface Message {
    id: number;
    title: string;
    content: string;
    time: string;
}

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    return (
        <div className="space-y-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className="bg-gray-100 rounded-xl p-6 flex items-center justify-between hover:bg-gray-200 transition-colors cursor-pointer group"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 group-hover:text-[#00853E] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-1">{message.title}</h4>
                            <p className="text-gray-500 text-sm">{message.content}</p>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{message.time}</span>
                </div>
            ))}
        </div>
    );
}
