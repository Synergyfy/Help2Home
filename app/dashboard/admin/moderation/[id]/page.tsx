// app/dashboard/admin/moderation/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack, MdCheckCircleOutline, MdCancel, MdOutlineInfo, MdOutlinePanorama } from 'react-icons/md';

// Mock data for demonstration - in a real app, this would come from an API
const MOCK_MODERATION_DETAILS = {
  1: { title: 'Modern Loft in Downtown', user: 'John Doe', userId: 'user123', submitted: 'Today, 10:23 AM', status: 'New Submission', statusColor: 'bg-amber-100 text-amber-700', description: 'This listing features a modern loft apartment in the heart of downtown, with 2 bedrooms and 2 bathrooms. The description contains some potentially misleading keywords.', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', imageUrl: 'https://via.placeholder.com/600x400?text=Listing+Image' },
  2: { title: 'Cozy Studio near Park', user: 'Sarah Smith', userId: 'user124', submitted: 'Yesterday, 4:45 PM', status: 'Flagged Photos', statusColor: 'bg-red-100 text-red-700', description: 'Photos submitted for this studio apartment appear to be heavily edited and possibly AI-generated, violating community guidelines.', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', imageUrl: 'https://via.placeholder.com/600x400?text=Flagged+Image' },
  3: { title: 'Spacious Family Home', user: 'Mike Johnson', userId: 'user125', submitted: '2 days ago', status: 'Pending Review', statusColor: 'bg-blue-100 text-blue-700', description: 'User submitted a new family home listing. Requires review to ensure all details are accurate and comply with platform standards.', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', imageUrl: 'https://via.placeholder.com/600x400?text=Family+Home' },
  4: { title: 'Urban Apartment', user: 'Emily White', userId: 'user126', submitted: '3 days ago', status: 'New Submission', statusColor: 'bg-amber-100 text-amber-700', description: 'New apartment listing, requires standard verification of address and amenities.', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', imageUrl: 'https://via.placeholder.com/600x400?text=Urban+Apartment' },
  5: { title: 'Riverside Villa', user: 'David Green', userId: 'user127', submitted: 'Last week', status: 'Flagged Content', statusColor: 'bg-red-100 text-red-700', description: 'The property description for this villa contains promotional language and external links not allowed by platform policies.', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', imageUrl: 'https://via.placeholder.com/600x400?text=Riverside+Villa' },
};

export default function ModerationDetailPage() {
  const params = useParams();
  const { id } = params;
  const itemId = typeof id === 'string' ? Number(id) : 0;
  const initialItem = MOCK_MODERATION_DETAILS[itemId as keyof typeof MOCK_MODERATION_DETAILS];

  const [item, setItem] = useState(initialItem);
  const [message, setMessage] = useState('');

  if (!item) {
    return (
      <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/admin/moderation" className="p-2 rounded-full hover:bg-gray-200">
            <MdArrowBack size={24} />
          </Link>
          <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Item Not Found</h1>
        </div>
        <p className="text-gray-600">The moderation item with ID &quot;{id}&quot; could not be found.</p>
      </main>
    );
  }

  const handleApprove = () => {
    setItem(prev => ({ ...prev, status: 'Approved', statusColor: 'bg-green-100 text-green-700' }));
    setMessage('Item approved successfully!');
    // In a real app, send approval to API
  };

  const handleReject = () => {
    setItem(prev => ({ ...prev, status: 'Rejected', statusColor: 'bg-red-100 text-red-700' }));
    setMessage('Item rejected.');
    // In a real app, send rejection to API
  };

  const handleRequestMoreInfo = () => {
    setItem(prev => ({ ...prev, status: 'Info Requested', statusColor: 'bg-blue-100 text-blue-700' }));
    setMessage('Request for more information sent.');
    // In a real app, send request to API
  };

  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/admin/moderation" className="p-2 rounded-full hover:bg-gray-200">
          <MdArrowBack size={24} />
        </Link>
        <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">{item.title}</h1>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage('')}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Details and Actions */}
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Moderation Details</h2>
            <span className={`px-3 py-1 text-sm font-bold rounded-full ${item.statusColor}`}>{item.status}</span>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700"><strong>Submitted by:</strong> {item.user} (<Link href={`/dashboard/admin/users?id=${item.userId}`} className="text-brand-green hover:underline">{item.userId}</Link>)</p>
            <p className="text-gray-700"><strong>Submitted on:</strong> {item.submitted}</p>
            <p className="text-gray-700"><strong>Issue Description:</strong> {item.description}</p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Content Overview</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
            <p className="text-gray-800 leading-relaxed">{item.content}</p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Actions</h3>
          <div className="flex gap-4">
            <button onClick={handleApprove} className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
              <MdCheckCircleOutline size={20} /> Approve
            </button>
            <button onClick={handleReject} className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors">
              <MdCancel size={20} /> Reject
            </button>
            <button onClick={handleRequestMoreInfo} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
              <MdOutlineInfo size={20} /> Request More Info
            </button>
          </div>
        </div>

        {/* Right Column: Visual Content */}
        <div className="md:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Associated Visuals</h2>
          {item.imageUrl ? (
            <img src={item.imageUrl} alt="Associated content visual" className="w-full h-auto rounded-lg object-cover mb-4" />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mb-4">
              <MdOutlinePanorama size={48} />
            </div>
          )}
          <p className="text-sm text-gray-500">Review images for inappropriate or misleading content.</p>
        </div>
      </div>
    </main>
  );
}