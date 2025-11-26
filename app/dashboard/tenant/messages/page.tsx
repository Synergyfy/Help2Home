'use client';

import React from 'react';
import MessageList from '@/components/MessageList';

export default function MessagesPage() {
    const messages = [
        {
            id: 1,
            title: 'Apartment 2698',
            content: 'This is to notify you that you have 3 more milestones...',
            time: '05:44 pm'
        },
        {
            id: 2,
            title: 'Apartment 2698',
            content: 'This is to notify you that you have completed your..',
            time: '05:44 pm'
        },
        {
            id: 3,
            title: 'Apartment 2698',
            content: 'This is to notify you that you have completed your..',
            time: '05:44 pm'
        },
        {
            id: 4,
            title: 'Apartment 2698',
            content: 'This is to notify you that you have completed your..',
            time: '05:44 pm'
        },
        {
            id: 5,
            title: 'Apartment 2698',
            content: 'This is to notify you that you have completed your..',
            time: '05:44 pm'
        },
        {
            id: 6,
            title: 'Apartment 2698',
            content: 'This is to notify you that you have completed your..',
            time: '05:44 pm'
        },
        {
            id: 7,
            title: 'Apartment 2698',
            content: 'This is to notify you that you have completed your..',
            time: '05:44 pm'
        },
        {
            id: 8,
            title: 'Apartment 2698',
            content: 'This is to notify you that you have completed your..',
            time: '05:44 pm'
        },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="mb-8 text-center text-gray-500 text-sm">
                Tue. jan 14.2023
            </div>
            <MessageList messages={messages} />
        </div>
    );
}
