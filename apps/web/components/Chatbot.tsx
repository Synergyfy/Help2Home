'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    IoChatbubbleEllipses, 
    IoClose, 
    IoSend, 
    IoSparkles,
    IoPersonCircle,
    IoShieldCheckmark
} from 'react-icons/io5';
import { useUserStore } from '@/store/userStore';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

export default function Chatbot() {
    const { fullName, profile, hasHydrated } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (hasHydrated) {
            const firstName = profile?.firstName || fullName?.split(' ')[0] || 'there';
            setMessages([
                {
                    id: '1',
                    text: `Hi ${firstName}! 👋 I'm Homey, your Help2Home assistant. How can I help you find your dream home or manage your properties today?`,
                    sender: 'bot',
                    timestamp: new Date()
                }
            ]);
        }
    }, [hasHydrated, fullName, profile?.firstName]);

    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chatbot', handleOpenChat);
        return () => window.removeEventListener('open-chatbot', handleOpenChat);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock bot response
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const getBotResponse = (input: string) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('rent') || lowerInput.includes('apply')) {
            return "Applying for rent financing is easy! Just browse our marketplace, pick a property, and click 'Apply for Rent'. We'll guide you through the 10-month repayment setup.";
        }
        if (lowerInput.includes('bvn') || lowerInput.includes('nin') || lowerInput.includes('verify')) {
            return "Security is our priority! You can verify your identity in your Profile settings under the Documents tab. We accept NIN, Driver's License, and more.";
        }
        if (lowerInput.includes('landlord')) {
            return "Are you a property owner? Help2Home helps you find verified tenants and manage payments seamlessly. Sign up as a Landlord to get started!";
        }
        return "That's a great question! I'm still learning, but I can tell you that Help2Home is the best platform for flexible rent payments in Nigeria. Is there anything specific about our features you'd like to know?";
    };

    return (
        <div className="fixed bottom-6 right-6 z-1000 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-brand-green p-6 text-white relative overflow-hidden shrink-0">
                            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                                <IoSparkles size={80} />
                            </div>
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                        <IoSparkles className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg leading-tight">Homey AI</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Always Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <IoClose size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 no-scrollbar"
                        >
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                                        msg.sender === 'user' 
                                            ? 'bg-brand-green text-white rounded-tr-none' 
                                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                    }`}>
                                        {msg.text}
                                        <div className={`text-[10px] mt-1.5 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-green-50 transition-all text-gray-900"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="w-12 h-12 bg-brand-green text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 hover:bg-green-700 transition-all disabled:opacity-50 active:scale-95"
                                >
                                    <IoSend size={20} />
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-3 opacity-40">
                                <IoShieldCheckmark size={12} className="text-brand-green" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Secure end-to-end communication</span>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 ${
                    isOpen ? 'bg-gray-900 rotate-90' : 'bg-brand-green'
                }`}
            >
                {isOpen ? (
                    <IoClose className="text-white" size={32} />
                ) : (
                    <div className="relative">
                        <IoChatbubbleEllipses className="text-white" size={32} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-brand-green rounded-full"></span>
                    </div>
                )}
            </motion.button>
        </div>
    );
}
