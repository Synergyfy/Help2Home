// app/dashboard/admin/moderation/[id]/page.tsx
"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack, MdCheckCircleOutline, MdCancel, MdOutlineInfo, MdOutlinePanorama } from 'react-icons/md';
import { useAdminModeration, useAdminModerationItem } from '@/hooks/useAdminModeration';

export default function ModerationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const itemId = typeof id === 'string' ? id : '';

  const { data: property, isLoading } = useAdminModerationItem(itemId);
  const { approve, reject, requestInfo, isApproving, isRejecting, isRequestingInfo } = useAdminModeration();

  if (isLoading) {
    return (
      <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
        <div className="flex items-center justify-center min-h-[400px]">
           <div className="animate-spin size-8 border-4 border-brand-green border-t-transparent rounded-full" />
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/admin/moderation" className="p-2 rounded-full hover:bg-gray-200">
            <MdArrowBack size={24} />
          </Link>
          <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Listing Not Found</h1>
        </div>
        <p className="text-gray-600">The moderation item with ID &quot;{id}&quot; could not be found.</p>
      </main>
    );
  }

  const handleApprove = () => {
    approve(itemId, {
      onSuccess: () => router.push('/dashboard/admin/moderation')
    });
  };

  const handleReject = () => {
    reject(itemId, {
      onSuccess: () => router.push('/dashboard/admin/moderation')
    });
  };

  const handleRequestMoreInfo = () => {
    requestInfo(itemId);
  };

  const statusColors: Record<string, string> = {
    'available': 'bg-green-100 text-green-700',
    'pending': 'bg-amber-100 text-amber-700',
    'rejected': 'bg-red-100 text-red-700',
    'Info Requested': 'bg-blue-100 text-blue-700'
  };
  const statusColor = statusColors[property.status] || 'bg-gray-100 text-gray-700';

  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/admin/moderation" className="p-2 rounded-full hover:bg-gray-200">
          <MdArrowBack size={24} />
        </Link>
        <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">{property.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Moderation Details</h2>
            <span className={`px-3 py-1 text-sm font-bold rounded-full uppercase tracking-wider ${statusColor}`}>{property.status}</span>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700">
              <strong>Submitted by:</strong> {property.owner?.firstName} {property.owner?.lastName}  
               (<Link href={`/dashboard/admin/users?id=${property.ownerId}`} className="text-brand-green hover:underline ml-1">{property.ownerId}</Link>)
            </p>
            <p className="text-gray-700"><strong>Submitted on:</strong> {new Date(property.createdAt).toLocaleString()}</p>
            <p className="text-gray-700"><strong>Price:</strong> {property.currency} {property.price}</p>
            <p className="text-gray-700"><strong>Category:</strong> {property.category} • {property.propertyType}</p>
            <p className="text-gray-700"><strong>Address:</strong> {property.address}, {property.city}</p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Content Overview</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6 whitespace-pre-wrap">
            <p className="text-gray-800 leading-relaxed">{property.description || 'No description provided.'}</p>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Actions</h3>
          <div className="flex gap-4">
            <button disabled={isApproving || property.status === 'available'} onClick={handleApprove} className="disabled:opacity-50 flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
              <MdCheckCircleOutline size={20} /> {isApproving ? 'Approving...' : 'Approve'}
            </button>
            <button disabled={isRejecting || property.status === 'rejected'} onClick={handleReject} className="disabled:opacity-50 flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors">
              <MdCancel size={20} /> {isRejecting ? 'Rejecting...' : 'Reject'}
            </button>
            <button disabled={isRequestingInfo} onClick={handleRequestMoreInfo} className="disabled:opacity-50 flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
              <MdOutlineInfo size={20} /> {isRequestingInfo ? 'Sending...' : 'Request More Info'}
            </button>
          </div>
        </div>

        {/* Right Column: Visual Content */}
        <div className="md:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Associated Visuals</h2>
          {property.images && property.images.length > 0 ? (
            <div className="space-y-4">
              {property.images.map((img: string, i: number) => (
                <img key={i} src={img} alt={`Listing visual ${i+1}`} className="w-full h-48 rounded-lg object-cover" />
              ))}
            </div>
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