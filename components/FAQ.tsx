'use client';

import { useState } from 'react';

const faqs = [
    {
        id: '01',
        question: 'How does the rent financing work?',
        answer: 'You find a property, we pay the landlord the full annual rent upfront, and you pay us back in monthly installments with a small interest rate.'
    },
    {
        id: '02',
        question: 'What are the requirements to qualify?',
        answer: 'You need to be employed or have a steady income source, provide bank statements, and pass our credit check verification.'
    },
    {
        id: '03',
        question: 'Can I use Help2Home if I already have a landlord?',
        answer: 'Yes! If your landlord agrees to accept an annual payment from us, we can finance your current rental agreement.'
    },
    {
        id: '04',
        question: 'How long does the approval process take?',
        answer: 'Typically, approval takes 24-48 hours after you submit all required documents.'
    },
    {
        id: '05',
        question: 'Are there any hidden fees?',
        answer: 'No hidden fees. We charge a one-time processing fee and the interest on the loan, which is clearly stated before you sign.'
    },
    {
        id: '06',
        question: 'What happens if I miss a payment?',
        answer: 'We encourage you to contact us immediately. Late payments may attract a penalty fee and could affect your credit score.'
    },
    {
        id: '07',
        question: 'Can I pay off my loan early?',
        answer: 'Yes, you can pay off the remaining balance at any time without any early repayment penalties.'
    },
    {
        id: '08',
        question: 'Is my data secure?',
        answer: 'Absolutely. We use bank-grade encryption to protect your personal and financial information.'
    }
];

export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="group">
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="w-full flex items-start text-left bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-lg"
                            >
                                <span className="bg-brand-green text-white font-bold py-2 px-3 rounded mr-4 shrink-0">
                                    {faq.id}
                                </span>
                                <div className="flex-1 py-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-gray-900 pr-4">{faq.question}</h3>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={`transform transition-transform duration-200 ${openId === faq.id ? 'rotate-180' : ''}`}
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </div>
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${openId === faq.id ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                    >
                                        <div className="overflow-hidden text-gray-600 text-sm leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
