'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';

const faqs = [
    {
        question: "Who pays the landlord?",
        answer: "Our partner financial institution pays the landlord the full rent upfront once the tenant's application is approved and the down payment is made."
    },
    {
        question: "What happens if I miss a payment?",
        answer: "Missed payments may incur a penalty fee and could affect your credit score. We recommend setting up automated payments to avoid this."
    },
    {
        question: "How long does verification take?",
        answer: "Verification is typically completed within 24-48 hours after all required documents are submitted."
    },
    {
        question: "Can I pay off my balance early?",
        answer: "Yes, you can pay off your remaining balance at any time without any early repayment penalties."
    },
    {
        question: "Is the down payment refundable?",
        answer: "The down payment is paid to the landlord to secure the property. Refund policies depend on the specific landlord's terms and the stage of the transaction."
    }
];

export default function HowItWorksFAQs() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                <FadeIn>
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
                </FadeIn>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.05}>
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-gray-900">{faq.question}</span>
                                    <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </button>
                                {openIndex === index && (
                                    <div className="p-6 pt-0 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
