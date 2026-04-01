// components/dashboard/admin/users/AddUserModal.tsx
'use client';

import React, { useState } from 'react';
import { MdClose, MdPersonAdd, MdSave } from 'react-icons/md';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: any) => void; // Callback to handle new user data
}

export default function AddUserModal({ isOpen, onClose, onAddUser }: AddUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Landlord'); // Default role
  const [status, setStatus] = useState('Active'); // Default status
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const newUser = {
      id: String(Date.now()), // Mock ID
      name,
      email,
      role,
      status,
      initials: name.split(' ').map(n => n[0]).join('').toUpperCase(),
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      color: 'bg-indigo-100 text-indigo-700' // Default color for new users
    };

    onAddUser(newUser);
    setMessage('User added successfully!');
    setName('');
    setEmail('');
    setRole('Landlord');
    setStatus('Active');
    
    // Optionally close modal after a short delay
    setTimeout(() => {
      setMessage('');
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-lg p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <MdClose size={24} />
        </button>
        
        <div className="text-center mb-6">
          <MdPersonAdd size={48} className="mx-auto text-brand-green mb-3" />
          <h2 className="text-2xl font-bold text-gray-900">Add New Member</h2>
          <p className="text-gray-500 text-sm">Fill in the details to create a new user account.</p>
        </div>

        {message && (
          <div className={`p-3 mb-4 rounded-lg text-sm ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
            >
              <option value="Landlord">Landlord</option>
              <option value="Tenant">Tenant</option>
              <option value="Agent">Agent</option>
              <option value="Caretaker">Caretaker</option>
              <option value="Investor">Investor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              <MdClose size={20} /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-green text-white rounded-xl font-bold hover:bg-brand-green/90 transition-colors"
            >
              <MdSave size={20} /> Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}