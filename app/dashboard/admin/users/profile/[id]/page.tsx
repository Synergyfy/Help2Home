"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack, MdMailOutline, MdPhone, MdPersonPin, MdCalendarToday, MdWork } from 'react-icons/md';
import { useAdminStore } from '@/store/adminStore';

export default function UserProfilePage() {
  const params = useParams();
  const { id } = params;
  const { users } = useAdminStore();

  // Find the user from the store's users array
  const user = users.find(u => u.id === id);

  if (!user) {
    return (
      <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/admin/users" className="p-2 rounded-full hover:bg-gray-200">
            <MdArrowBack size={24} />
          </Link>
          <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">User Not Found</h1>
        </div>
        <p className="text-gray-600">The user with ID &quot;{id}&quot; could not be found.</p>
      </main>
    );
  }

  // Placeholder for missing phone, bio, profilePicture in PlatformUser
  const userPhone = "N/A"; // Assuming phone is not in PlatformUser
  const userBio = "No biography available."; // Assuming bio is not in PlatformUser
  const userProfilePicture = `https://via.placeholder.com/150?text=${user.name.charAt(0)}`; // Generate from initials

  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/admin/users" className="p-2 rounded-full hover:bg-gray-200">
          <MdArrowBack size={24} />
        </Link>
        <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">User Profile: {user.name}</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <div className="md:col-span-1 flex flex-col items-center text-center">
          <img 
            src={userProfilePicture} 
            alt={`Profile of ${user.name}`} 
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-brand-green-100 shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-brand-green-600 font-medium">{user.role}</p>
          <span className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
            user.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : user.status === 'Pending'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-red-100 text-red-800' // For Suspended
          }`}>
            {user.status}
          </span>
          <Link 
            href={`/dashboard/admin/users/edit/${user.id}`} 
            className="mt-4 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 text-sm font-bold transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        {/* Contact and Bio Info */}
        <div className="md:col-span-2 space-y-6">
          <section>
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-700"><MdMailOutline size={20} /> <strong>Email:</strong> {user.email}</p>
              <p className="flex items-center gap-2 text-gray-700"><MdPhone size={20} /> <strong>Phone:</strong> {userPhone}</p>
              <p className="flex items-center gap-2 text-gray-700"><MdCalendarToday size={20} /> <strong>Joined:</strong> {user.joinedAt}</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">About</h3>
            <p className="text-gray-700 leading-relaxed">{userBio}</p>
          </section>

          {/* Placeholder for more sections like recent activity, properties, etc. */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Additional Details</h3>
            <p className="text-gray-500">More user-specific data and actions would go here.</p>
          </section>
        </div>
      </div>
    </main>
  );
}