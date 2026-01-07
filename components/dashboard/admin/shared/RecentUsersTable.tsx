// components/dashboard/admin/RecentUsersTable.tsx
'use client';

import Link from 'next/link';
import { HiOutlineFilter, HiOutlineDotsVertical } from 'react-icons/hi';

const RECENT_USERS = [
  { id: '1', name: 'Jane Doe', initials: 'JD', role: 'Landlord', status: 'Active', joined: 'Oct 24, 2023', color: 'bg-brand-green/20 text-brand-green' },
  { id: '2', name: 'Michael Ross', initials: 'MR', role: 'Tenant', status: 'Pending', joined: 'Oct 23, 2023', color: 'bg-purple-100 text-purple-700' },
  { id: '3', name: 'Alice Lee', initials: 'AL', role: 'Agent', status: 'Active', joined: 'Oct 22, 2023', color: 'bg-blue-100 text-blue-700' },
];

export default function RecentUsersTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h3 className="text-gray-900 text-lg font-bold">Recent Users</h3>
        <div className="flex gap-2">
          <button className="p-1.5 rounded hover:bg-gray-50 text-gray-400">
            <HiOutlineFilter size={20} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-50 text-gray-400">
            <HiOutlineDotsVertical size={20} />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {RECENT_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs mr-3 ${user.color}`}>
                      {user.initials}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/dashboard/admin/users/edit/${user.id}`} className="text-brand-green hover:text-brand-green/80">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}