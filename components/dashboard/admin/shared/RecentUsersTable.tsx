'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiOutlineFilter, HiOutlineDotsVertical } from 'react-icons/hi';
import { useRouter } from 'next/navigation'; // Import useRouter

const RECENT_USERS = [
  { id: '1', name: 'Jane Doe', initials: 'JD', role: 'Landlord', status: 'Active', joined: 'Oct 24, 2023', color: 'bg-brand-green/20 text-brand-green' },
  { id: '2', name: 'Michael Ross', initials: 'MR', role: 'Tenant', status: 'Pending', joined: 'Oct 23, 2023', color: 'bg-purple-100 text-purple-700' },
  { id: '3', name: 'Alice Lee', initials: 'AL', role: 'Agent', status: 'Active', joined: 'Oct 22, 2023', color: 'bg-blue-100 text-blue-700' },
  { id: '4', name: 'Bob Johnson', initials: 'BJ', role: 'Investor', status: 'Active', joined: 'Nov 01, 2023', color: 'bg-teal-100 text-teal-700' },
  { id: '5', name: 'Charlie Brown', initials: 'CB', role: 'Landlord', status: 'Suspended', joined: 'Sep 15, 2023', color: 'bg-red-100 text-red-700' },
];

export default function RecentUsersTable() {
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // State to track which user's menu is open
  const router = useRouter();

  const filteredUsers = RECENT_USERS.filter(user => {
    const roleMatch = filterRole === 'All' || user.role === filterRole;
    const statusMatch = filterStatus === 'All' || user.status === filterStatus;
    return roleMatch && statusMatch;
  });

  const handleMenuToggle = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleViewUser = (id: string) => {
    router.push(`/dashboard/admin/users/profile/${id}`); // Assuming a user profile page exists
    setOpenMenuId(null);
  };

  const handleEditUser = (id: string) => {
    router.push(`/dashboard/admin/users/edit/${id}`);
    setOpenMenuId(null);
  };

  const handleDeleteUser = (id: string) => {
    alert(`Mock: Deleting user ${id}`);
    setOpenMenuId(null);
    // In a real app, you would dispatch an action to delete the user
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <h3 className="text-gray-900 text-lg font-bold">Recent Users</h3>
        <div className="flex gap-2 items-center">
          {/* Filter by Role */}
          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)}
            className="p-1.5 rounded border border-gray-300 text-gray-700 text-sm"
          >
            <option value="All">All Roles</option>
            <option value="Landlord">Landlord</option>
            <option value="Tenant">Tenant</option>
            <option value="Agent">Agent</option>
            <option value="Investor">Investor</option>
          </select>

          {/* Filter by Status */}
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-1.5 rounded border border-gray-300 text-gray-700 text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
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
            {filteredUsers.map((user) => (
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
                      : user.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800' // For Suspended
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                  <button 
                    onClick={() => handleMenuToggle(user.id)}
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                  >
                    <HiOutlineDotsVertical size={20} />
                  </button>
                  {openMenuId === user.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <button 
                        onClick={() => handleViewUser(user.id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        View User
                      </button>
                      <button 
                        onClick={() => handleEditUser(user.id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Edit User
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left"
                      >
                        Delete User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
