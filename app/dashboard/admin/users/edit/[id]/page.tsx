"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdArrowBack, MdSave, MdCancel, MdPersonPin } from 'react-icons/md';
import { useAdminStore, PlatformUser } from '@/store/adminStore';

export default function UserEditPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { users, updateUser } = useAdminStore();

  const [user, setUser] = useState<PlatformUser | null>(() => users.find(u => u.id === id) || null);
  const [prevId, setPrevId] = useState(id);
  const [message, setMessage] = useState('');

  if (id !== prevId) {
    setPrevId(id);
    const foundUser = users.find(u => u.id === id);
    setUser(foundUser || null);
  }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = () => {
    if (user) {
      updateUser(user);
      setMessage('User details synchronized successfully!');
      setTimeout(() => router.push('/dashboard/admin/users'), 1500);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/admin/users');
  };

  return (
    <main className="flex-1 py-8 px-4 lg:px-12 w-full max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Premium Breadcrumb/Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-3 bg-white rounded-2xl border border-gray-200 text-gray-400 hover:text-brand-green hover:border-brand-green transition-all shadow-sm group"
          >
            <MdArrowBack size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold text-brand-green uppercase tracking-widest bg-brand-green-50 px-2 py-0.5 rounded-md">Edit Mode</span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">System Management</span>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Modify Parameters</h1>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-3 border border-gray-200 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 transition-all text-sm"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-brand-green text-white rounded-2xl font-semibold hover:bg-brand-green-hover transition-all shadow-lg shadow-brand-green/20 text-sm"
          >
            <MdSave size={20} /> Deploy Updates
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-xl text-white">
              <MdSave size={20} />
            </div>
            <p className="text-emerald-900 font-semibold">{message}</p>
          </div>
          <button onClick={() => setMessage('')} className="text-emerald-500 hover:text-emerald-700 font-bold">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-8 text-center flex flex-col items-center">
            <div className="relative mb-6">
              <div className="size-32 bg-gradient-to-tr from-brand-green to-emerald-400 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-semibold shadow-2xl border-4 border-white">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-gray-50 text-gray-400">
                <MdPersonPin size={24} />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-400 font-medium mb-4">{user.email}</p>
            <span className={`px-4 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
              user.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
              {user.status}
            </span>
          </div>

          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
            <h3 className="text-lg font-semibold mb-4 relative z-10">Access Logs</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/50">Joined At</span>
                <span className="font-bold">{user.joinedAt}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/50">System Role</span>
                <span className="font-bold">{user.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 lg:p-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-brand-green rounded-full" />
              Identity Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-semibold text-gray-900 focus:bg-white focus:border-brand-green focus:ring-0 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-semibold text-gray-900 focus:bg-white focus:border-brand-green focus:ring-0 transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">Administrative Role</label>
                <select
                  name="role"
                  id="role"
                  value={user.role}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-semibold text-gray-900 focus:bg-white focus:border-brand-green focus:ring-0 transition-all outline-none appearance-none"
                >
                  <option value="Landlord">Landlord</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Agent">Agent</option>
                  <option value="Caretaker">Caretaker</option>
                  <option value="Investor">Investor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest ml-1">Access Protocol</label>
                <select
                  name="status"
                  id="status"
                  value={user.status}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 font-semibold text-gray-900 focus:bg-white focus:border-brand-green focus:ring-0 transition-all outline-none appearance-none"
                >
                  <option value="Active">Authorized</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="mt-12 flex items-center p-6 bg-brand-green-50 rounded-3xl border border-brand-green-100">
              <div className="p-3 bg-white rounded-2xl text-brand-green shadow-sm mr-4">
                <MdPersonPin size={24} />
              </div>
              <p className="text-sm text-brand-green-900 font-semibold leading-relaxed">
                Updating these parameters will immediately synchronize across the entire Help2Home matrix. Please ensure all data is verified before deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}