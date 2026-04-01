'use client';

import React, { useState } from 'react';
import { Template } from '@/lib/mockSupportData';

interface TemplateManagerProps {
    templates: Template[];
    onSave: (template: Template) => void;
    onDelete: (id: string) => void;
}

export default function TemplateManager({ templates, onSave, onDelete }: TemplateManagerProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Template>>({});

    const handleEdit = (template: Template) => {
        setEditingId(template.id);
        setFormData(template);
    };

    const handleCreate = () => {
        setEditingId('new');
        setFormData({
            title: '',
            content: '',
            category: 'General'
        });
    };

    const handleSave = () => {
        if (!formData.title || !formData.content) return;

        onSave({
            id: editingId === 'new' ? `tpl_${Date.now()}` : editingId!,
            title: formData.title!,
            content: formData.content!,
            category: formData.category || 'General'
        });

        setEditingId(null);
        setFormData({});
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({});
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Response Templates</h2>
                    <p className="text-sm text-gray-500">Manage quick replies for common questions.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium text-sm transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Template
                </button>
            </div>

            <div className="divide-y divide-gray-100">
                {editingId === 'new' && (
                    <div className="p-6 bg-green-50/50">
                        <h3 className="text-sm font-bold text-gray-900 mb-4">Create New Template</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title || ''}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        placeholder="e.g., Application Received"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        value={formData.category || 'General'}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                    >
                                        <option value="General">General</option>
                                        <option value="Application">Application</option>
                                        <option value="Viewing">Viewing</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Payment">Payment</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
                                <textarea
                                    value={formData.content || ''}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-transparent h-24"
                                    placeholder="Enter the template content..."
                                />
                                <p className="text-xs text-gray-500 mt-1">Available placeholders: {'{applicantName}'}, {'{propertyTitle}'}, {'{date}'}, {'{time}'}</p>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button onClick={handleCancel} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
                                <button onClick={handleSave} className="px-3 py-1.5 bg-[#00853E] text-white rounded-lg hover:bg-green-700 text-sm font-medium">Save Template</button>
                            </div>
                        </div>
                    </div>
                )}

                {templates.map(template => (
                    <div key={template.id} className="p-6 hover:bg-gray-50 transition-colors group">
                        {editingId === template.id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title || ''}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            value={formData.category || 'General'}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        >
                                            <option value="General">General</option>
                                            <option value="Application">Application</option>
                                            <option value="Viewing">Viewing</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Payment">Payment</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
                                    <textarea
                                        value={formData.content || ''}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-transparent h-24"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button onClick={handleCancel} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
                                    <button onClick={handleSave} className="px-3 py-1.5 bg-[#00853E] text-white rounded-lg hover:bg-green-700 text-sm font-medium">Save Changes</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-sm font-bold text-gray-900">{template.title}</h3>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 uppercase tracking-wide">
                                            {template.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(template)}
                                        className="p-2 text-gray-400 hover:text-[#00853E] hover:bg-green-50 rounded-lg transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onDelete(template.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
