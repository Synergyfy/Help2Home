// components/dashboard/developer/CreateProjectModal.tsx
'use client';

import React, { useState } from 'react';
import { MdClose, MdAdd, MdSave } from 'react-icons/md';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (projectData: any) => void; // Callback to handle new project data
}

export default function CreateProjectModal({ isOpen, onClose, onCreateProject }: CreateProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Residential'); // Default category
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !budget) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const newProject = {
      id: String(Date.now()), // Mock ID
      title,
      description,
      category,
      budget,
      status: 'Planning', // Default status
      startDate: new Date().toLocaleDateString('en-US'),
    };

    onCreateProject(newProject);
    setMessage('Project created successfully!');
    setTitle('');
    setDescription('');
    setCategory('Residential');
    setBudget('');
    
    // Optionally close modal after a short delay
    setTimeout(() => {
      setMessage('');
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-lg p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <MdClose size={24} />
        </button>
        
        <div className="text-center mb-6">
          <MdAdd size={48} className="mx-auto text-brand-green mb-3" />
          <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
          <p className="text-gray-500 text-sm">Define your new development project details.</p>
        </div>

        {message && (
          <div className={`p-3 mb-4 rounded-lg text-sm ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed-Use">Mixed-Use</option>
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
            <input
              type="text"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-green focus:border-brand-green"
              placeholder="e.g., ₦500,000,000"
              required
            />
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
              <MdSave size={20} /> Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}