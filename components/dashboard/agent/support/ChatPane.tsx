'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message, Template, MOCK_TEMPLATES } from '@/lib/mockSupportData';
import { formatDistanceToNow } from 'date-fns';
import { HiOutlineXMark } from 'react-icons/hi2';

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
                <p className="text-lg font-medium font-black tracking-tight">Select a lead to start messaging</p>
            </div>
        );
    }

    const otherParticipant = conversation.participants.find(p => p.role !== 'agent') || conversation.participants[0];

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

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setNewMessage(value);

        if (value.endsWith('/')) {
            setShowTemplates(true);
        } else if (showTemplates && !value.includes('/')) {
            setShowTemplates(false);
        }
    };

    const insertTemplate = (template: Template) => {
        let content = template.content;
        content = content.replace('{applicantName}', otherParticipant.name);
        content = content.replace('{propertyTitle}', conversation.linkedObject?.title || 'the property');

        const textWithoutSlash = newMessage.endsWith('/') ? newMessage.slice(0, -1) : newMessage;
        setNewMessage(textWithoutSlash + content);
        setShowTemplates(false);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white relative">
            {/* Header */}
            <div className="h-20 border-b border-gray-100 flex items-center justify-between px-8 bg-white shrink-0">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-brand-green text-white flex items-center justify-center font-black text-xl shadow-lg shadow-green-900/20">
                        {otherParticipant.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="font-black text-gray-900 leading-none">{otherParticipant.name}</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{otherParticipant.role} • Active Now</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {conversation.linkedObject && (
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{conversation.linkedObject.type}:</span>
                            <span className="text-sm font-black text-gray-900 italic">{conversation.linkedObject.title}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50 space-y-6 custom-scrollbar">
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === 'user_1';
                    const showAvatar = !isMe && (index === 0 || messages[index - 1].senderId !== msg.senderId);

                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            {!isMe && (
                                <div className={`size-8 rounded-xl bg-gray-200 flex items-center justify-center text-[10px] font-black text-gray-500 mr-3 flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                                    {msg.senderName.charAt(0)}
                                </div>
                            )}

                            <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                <div className={`px-5 py-3 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${isMe
                                        ? 'bg-brand-green text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2 px-1">
                                    {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Composer */}
            <div className="p-6 bg-white border-t border-gray-100 shrink-0">
                {showTemplates && (
                    <div className="absolute bottom-24 left-8 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 z-10 animate-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-50 mb-2">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Replies</h3>
                            <button onClick={() => setShowTemplates(false)}>
                                <HiOutlineXMark className="text-gray-400" size={18} />
                            </button>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
                            {MOCK_TEMPLATES.map(tpl => (
                                <button
                                    key={tpl.id}
                                    onClick={() => insertTemplate(tpl)}
                                    className="w-full text-left px-4 py-3 hover:bg-green-50 rounded-2xl transition-all group"
                                >
                                    <p className="text-xs font-black text-gray-900 group-hover:text-brand-green">{tpl.title}</p>
                                    <p className="text-[10px] text-gray-500 font-medium line-clamp-1 italic mt-0.5">{tpl.content}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-end gap-3 bg-gray-50 p-3 rounded-[2rem] border-2 border-transparent focus-within:border-brand-green focus-within:bg-white transition-all shadow-inner">
                    <textarea
                        value={newMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message (type / for templates)..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-900 placeholder:text-gray-400 resize-none max-h-32 py-3 px-4"
                        rows={1}
                        style={{ minHeight: '44px' }}
                    />

                    <button
                        onClick={handleSend}
                        disabled={!newMessage.trim()}
                        className="size-12 bg-brand-green text-white rounded-2xl flex items-center justify-center hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-900/20 active:scale-95 mb-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
