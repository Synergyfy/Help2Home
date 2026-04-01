'use client';

import React, { useState } from 'react';
import { FAQItem } from './types';

interface FAQSectionProps {
    faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {faqs.map((faq) => (
                    <div key={faq.id} className="group">
                        <button
                            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                            className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            <svg
                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openId === faq.id ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
