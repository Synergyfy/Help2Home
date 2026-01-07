'use client';

import React, { useState } from 'react';
import {
  HiOutlineMail,
  HiOutlineBadgeCheck,
  HiOutlineLockClosed,
  HiOutlineSearch,
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlineUserAdd
} from 'react-icons/hi';

// Define the shape of a Sub-User
interface SubUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: 'Active' | 'Away' | 'Inactive';
  lastActive: string;
  isSuperAdmin?: boolean;
}

const AVAILABLE_ROLES = [
  { id: 'finance', name: 'Finance Admin', description: 'Manage payments, refunds, and financial reports.' },
  { id: 'listing', name: 'Listing Admin', description: 'Approve, edit, and remove property listings.' },
  { id: 'security', name: 'Security Admin', description: 'Access to audit logs, user bans, and security settings.' },
  { id: 'support', name: 'Support Admin', description: 'Manage tickets, chat with users, and view FAQs.' },
];

import { useAdminStore } from '@/store/adminStore';

export default function RoleManager() {
  const { subAccounts: users, addSubAccount, removeSubAccount } = useAdminStore();

  const [newUser, setNewUser] = useState({ name: '', email: '', roles: [] as string[] });

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    addSubAccount(newUser);
    setNewUser({ name: '', email: '', roles: [] });
  };

  const toggleRoleSelection = (roleName: string) => {
    setNewUser(prev => ({
      ...prev,
      roles: prev.roles.includes(roleName)
        ? prev.roles.filter(r => r !== roleName)
        : [...prev.roles, roleName]
    }));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
      {/* LEFT: User List Table */}
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
              placeholder="Search by name or email..."
              type="text"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm outline-none">
              <option>All Roles</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-4 px-6 text-xs font-bold uppercase text-slate-500">User</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase text-slate-500">Assigned Roles</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase text-slate-500">Status</th>
                  <th className="py-4 px-6 text-xs font-bold uppercase text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(user => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5">
                        {user.roles.map(role => (
                          <span key={role} className="px-2 py-0.5 rounded bg-emerald-50 text-brand-green text-[10px] font-bold border border-emerald-100">
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><HiOutlinePencilAlt size={18} /></button>
                        <button
                          onClick={() => removeSubAccount(user.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT: Create Sub-Account Form */}
      <div className="xl:col-span-1">
        <div className="bg-white rounded-xl border border-slate-100 shadow-lg sticky top-8">
          <div className="p-6 border-b border-slate-50 bg-linear-to-r from-white to-slate-50 rounded-t-xl">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-brand-green">
                <HiOutlineUserAdd size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">New Sub-Account</h2>
            </div>
            <p className="text-xs text-slate-500 ml-11">Assign specific administrative powers.</p>
          </div>

          <form onSubmit={handleCreateAccount} className="p-6 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Full Name</label>
                <div className="relative">
                  <HiOutlineBadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="e.g. John Doe" type="text"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    placeholder="john@admin.com" type="email"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Assign Access</label>
              <div className="space-y-2">
                {AVAILABLE_ROLES.map(role => (
                  <label key={role.id} className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all group ${newUser.roles.includes(role.name) ? 'border-brand-green bg-emerald-50/50' : 'border-slate-100 hover:bg-slate-50'
                    }`}>
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-slate-300 text-brand-green focus:ring-brand-green"
                      checked={newUser.roles.includes(role.name)}
                      onChange={() => toggleRoleSelection(role.name)}
                    />
                    <div className="flex-1">
                      <span className="block text-sm font-bold text-slate-900">{role.name}</span>
                      <span className="block text-[11px] text-slate-500 leading-tight">{role.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button
                type="button"
                onClick={() => setNewUser({ name: '', email: '', roles: [] })}
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex-2 px-4 py-2.5 bg-brand-green text-white rounded-lg text-sm font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}