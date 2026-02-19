"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack, MdMailOutline, MdPhone, MdPersonPin, MdCalendarToday, MdWork, MdCancel, MdShield } from 'react-icons/md';
import { useAdminStore } from '@/store/adminStore';

export default function UserProfilePage() {
  const params = useParams();
  const { id } = params;
  const { users } = useAdminStore();

  const user = users.find(u => u.id === id);

  if (!user) {
    return (
      <main className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-md w-full text-center">
          <div className="size-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <MdCancel size={40} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">User Not Found</h1>
          <p className="text-gray-500 mb-8">The identity record for <span className="font-mono text-red-500">{id}</span> does not exist in our systems.</p>
          <Link href="/dashboard/admin/users" className="block w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all">
            Return to Directory
          </Link>
        </div>
      </main>
    );
  }

  const userPhone = "Not Verified";
  const userBio = "This member has not yet provided a professional biography. As an authorized Help2Home partner, they are currently contributing to the growth and stability of the ecosystem.";

  return (
    <main className="flex-1 py-8 px-4 lg:px-12 w-full max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Premium Profile Header Banner */}
      <div className="relative h-64 lg:h-80 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green-900 via-brand-green-800 to-emerald-900" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full -ml-32 -mb-32 blur-2xl" />

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="flex items-center gap-6 lg:gap-8">
            <div className="relative">
              <div className="size-32 lg:size-40 bg-white p-1.5 rounded-[2.5rem] shadow-2xl">
                <div className="w-full h-full bg-gradient-to-tr from-brand-green to-emerald-400 rounded-[2.2rem] flex items-center justify-center text-white text-5xl lg:text-6xl font-semibold">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
            <div className="mb-2 lg:mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.2em] border border-white/10">
                  {user.role}
                </span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${user.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                  {user.status}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">{user.name}</h1>
            </div>
          </div>

          <div className="flex gap-4 mb-4 lg:mb-6 w-full md:w-auto">
            <Link
              href={`/dashboard/admin/users/edit/${user.id}`}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-green-900 rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl text-sm"
            >
              <MdWork size={18} /> Modify Record
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="flex items-center justify-center size-14 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <MdArrowBack size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Ecosystem Standing', value: 'Prime Member', icon: MdPersonPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Platform Activity', value: 'High Engagement', icon: MdCalendarToday, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Network Reach', value: 'Level 4 Access', icon: MdShield, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Card */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-brand-green rounded-full" />
              Contact Hub
            </h3>
            <div className="space-y-6">
              {[
                { icon: MdMailOutline, label: 'Email Address', value: user.email },
                { icon: MdPhone, label: 'Verified Phone', value: userPhone },
                { icon: MdCalendarToday, label: 'Onboarding Date', value: user.joinedAt }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                  <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-brand-green transition-colors">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none mb-1.5">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-900 rounded-[2.5rem] p-8 text-white">
            <h3 className="text-xl font-semibold mb-6">Security Clearance</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span className="text-sm text-white/50 font-medium">Account ID</span>
                <span className="text-sm font-mono font-semibold text-emerald-400">#HID-{user.id?.slice(-6).toUpperCase()}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                <span className="text-sm text-white/50 font-medium">2FA Status</span>
                <span className="text-xs font-semibold uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Enabled</span>
              </div>
            </div>
          </section>
        </div>

        {/* Bio and Activity Card */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 lg:p-12 group">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-brand-green rounded-full" />
                Professional Summary
              </h3>
              <div className="p-3 bg-gray-50 rounded-2xl text-gray-300 group-hover:text-brand-green transition-colors">
                <MdWork size={24} />
              </div>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed font-medium italic">
              &quot;{userBio}&quot;
            </p>
          </section>

          <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-brand-green rounded-full" />
                System Integration
              </h3>
              <div className="p-12 border-2 border-dashed border-gray-100 rounded-[2rem] text-center">
                <p className="text-gray-400 font-semibold">Integration logs and activity history are currently being synchronized for this profile.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}