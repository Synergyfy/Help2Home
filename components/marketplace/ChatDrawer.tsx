'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineXMark, HiOutlineShieldCheck } from 'react-icons/hi2';
import { MdOutlineVilla } from 'react-icons/md';
import { IoSend } from 'react-icons/io5';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'lister';
    timestamp: string;
}

interface ChatDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    propertyTitle: string;
    listerName: string;
    listerImage?: string;
    listerRole: string;
    listerVerified?: boolean;
}

export default function ChatDrawer({
    isOpen,
    onClose,
    propertyTitle,
    listerName,
    listerImage,
    listerRole,
    listerVerified
}: ChatDrawerProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: `Hello! I'm interested in "${propertyTitle}". Is it still available?`,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
            id: 2,
            text: `Hi! Yes, it is still available. Would you like to schedule a viewing?`,
            sender: 'lister',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
    ]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputText('');

        // Simple mock response
        setTimeout(() => {
            const botResponse: Message = {
                id: messages.length + 2,
                text: "I've received your message. I'll get back to you shortly with more details.",
                sender: 'lister',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 lg:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full sm:w-[400px] bg-white shadow-2xl z-70 flex flex-col border-l border-gray-100"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
                            <div className="flex items-center gap-4">
                                <div className="relative size-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                                    {listerImage ? (
                                        <img src={listerImage} alt={listerName} className="size-full object-cover" />
                                    ) : (
                                        <div className="size-full flex items-center justify-center text-brand-green bg-brand-green/5">
                                            <MdOutlineVilla size={24} />
                                        </div>
                                    )}
                                    {listerVerified && (
                                        <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-white flex items-center justify-center shadow-md">
                                            <HiOutlineShieldCheck className="text-brand-green" size={14} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 leading-tight">{listerName}</h4>
                                    <p className="text-[10px] uppercase font-bold text-brand-green tracking-wider">{listerRole}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <HiOutlineXMark size={24} />
                            </button>
                        </div>

                        {/* Safety Notice */}
                        <div className="px-6 py-3 bg-[#FFF9F3] border-b border-[#FFE7CC]">
                            <p className="text-[10px] text-[#995500] font-medium leading-relaxed">
                                <strong>Safety Tip:</strong> Keep todos and payments on Help2Home to stay protected.
                            </p>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            <div className="text-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                                    Conversation started
                                </span>
                            </div>

                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] space-y-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-brand-green text-white rounded-tr-none'
                                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <p className="text-[10px] text-gray-400 font-medium px-1">
                                            {msg.timestamp}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-brand-green/30 focus:ring-4 focus:ring-brand-green/5 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 size-10 rounded-xl bg-brand-green text-white flex items-center justify-center hover:bg-brand-green-dark transition-all disabled:opacity-50 active:scale-95"
                                    disabled={!inputText.trim()}
                                >
                                    <IoSend size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
