'use client';

import React, { useState } from 'react';
import { CreateTicketData, TicketCategory } from './types';

interface CreateTicketFormProps {
    onSubmit: (data: CreateTicketData) => void;
    onCancel: () => void;
}

export default function CreateTicketForm({ onSubmit, onCancel }: CreateTicketFormProps) {
    const [category, setCategory] = useState<TicketCategory>('Complaint');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [restructuringReason, setRestructuringReason] = useState('');
    const [proposedAmount, setProposedAmount] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data: CreateTicketData = {
            category,
            subject,
            description,
            ...(category === 'Restructuring Request' && {
                restructuringReason,
                proposedAmount: Number(proposedAmount)
            })
        };

        onSubmit(data);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Ticket</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as TicketCategory)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                    >
                        <option value="Complaint">Complaint</option>
                        <option value="Payment Issue">Payment Issue</option>
                        <option value="Restructuring Request">Restructuring Request</option>
                        <option value="Property Issue">Property Issue</option>
                        <option value="Application Issue">Application Issue</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {category === 'Restructuring Request' && (
                    <div className="bg-blue-50 p-4 rounded-lg space-y-4 animate-fade-in">
                        <p className="text-sm text-blue-800 font-medium">
                            Restructuring requests may take up to 48 hours for review by our finance team.
                        </p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Restructuring</label>
                            <select
                                value={restructuringReason}
                                onChange={(e) => setRestructuringReason(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                                required
                            >
                                <option value="">Select a reason...</option>
                                <option value="Salary delay">Salary delay</option>
                                <option value="Unexpected expenses">Unexpected expenses</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Proposed New Monthly Amount</label>
                            <input
                                type="number"
                                value={proposedAmount}
                                onChange={(e) => setProposedAmount(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                                placeholder="e.g. 150000"
                                required
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        placeholder="Brief summary of the issue"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        placeholder="Please explain the issue clearly so we can assist you faster."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attach Documents (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#00853E] transition-colors cursor-pointer">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 bg-[#00853E] text-white font-bold rounded-lg hover:bg-[#006b32] transition-colors disabled:opacity-50 flex justify-center items-center"
                    >
                        {isSubmitting ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Submit Ticket'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
