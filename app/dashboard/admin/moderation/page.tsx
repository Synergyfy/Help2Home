// app/dashboard/admin/moderation/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { MdOutlinePanorama } from 'react-icons/md';

// Mock data for demonstration
const ALL_MODERATION_ITEMS = [
    { id: 1, title: 'Modern Loft in Downtown', user: 'John Doe', time: 'Today, 10:23 AM', status: 'New Submission', statusColor: 'bg-amber-100 text-amber-700' },
    { id: 2, title: 'Cozy Studio near Park', user: 'Sarah Smith', time: 'Yesterday, 4:45 PM', status: 'Flagged Photos', statusColor: 'bg-red-100 text-red-700' },
    { id: 3, title: 'Spacious Family Home', user: 'Mike Johnson', time: '2 days ago', status: 'Pending Review', statusColor: 'bg-blue-100 text-blue-700' },
    { id: 4, title: 'Urban Apartment', user: 'Emily White', time: '3 days ago', status: 'New Submission', statusColor: 'bg-amber-100 text-amber-700' },
    { id: 5, title: 'Riverside Villa', user: 'David Green', time: 'Last week', status: 'Flagged Content', statusColor: 'bg-red-100 text-red-700' },
];

export default function AdminModerationPage() {
  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
      <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight mb-8">Content Moderation</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h3 className="text-gray-900 text-lg font-bold">All Items for Moderation</h3>
          {/* Add filter/sort options here later */}
        </div>
        <div className="divide-y divide-gray-50">
          {ALL_MODERATION_ITEMS.map((item) => (
            <Link key={item.id} href={`/dashboard/admin/moderation/${item.id}`}>
              <div className="p-4 flex flex-col sm:flex-row gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
                <div className="w-full sm:w-24 h-24 sm:h-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                  <MdOutlinePanorama size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-gray-900 font-bold truncate">{item.title}</h4>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${item.statusColor}`}>{item.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Submitted by <span className="font-medium text-gray-900">{item.user}</span> • {item.time}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}