'use client';

import React from 'react';
import { HiOutlinePencilAlt, HiOutlineEye, HiOutlineBan, HiOutlineCheckCircle, HiOutlineRefresh } from 'react-icons/hi';
import { MdOutlineRealEstateAgent, MdOutlinePerson, MdOutlineSupportAgent } from 'react-icons/md';

const USERS = [
  { id: '1', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Landlord', status: 'Active', joined: 'Oct 24, 2023', initials: 'JD' },
  { id: '2', name: 'Michael Ross', email: 'm.ross@example.com', role: 'Tenant', status: 'Pending Review', joined: 'Oct 23, 2023', initials: 'MR' },
  { id: '3', name: 'Alice Lee', email: 'alice.lee@realty.com', role: 'Agent', status: 'Active', joined: 'Oct 22, 2023', initials: 'AL' },
];

export default function UserManagementTable() {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Landlord': return <MdOutlineRealEstateAgent className="text-primary text-lg" />;
      case 'Tenant': return <MdOutlinePerson className="text-purple-600 text-lg" />;
      case 'Agent': return <MdOutlineSupportAgent className="text-blue-600 text-lg" />;
      default: return <MdOutlinePerson />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {USERS.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm mr-4">
                    {user.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  {getRoleIcon(user.role)} {user.role}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                  user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit"><HiOutlinePencilAlt size={18} /></button>
                  <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="View"><HiOutlineEye size={18} /></button>
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Suspend"><HiOutlineBan size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}