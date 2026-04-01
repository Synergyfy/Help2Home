'use client';

import React, { useState } from 'react';
import { Contract, ContractFields } from '@/lib/mockContractData';

interface ContractEditorProps {
    initialData: Contract;
    onSave: (updatedFields: ContractFields) => void;
    onCancel: () => void;
}

export default function ContractEditor({ initialData, onSave, onCancel }: ContractEditorProps) {
    const [fields, setFields] = useState<ContractFields>(initialData.fields);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFields(prev => ({
            ...prev,
            [name]: name === 'rentAmount' || name === 'depositAmount' || name === 'noticePeriod'
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(fields);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Edit Contract Terms</h2>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#00853E] text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-all flex items-center gap-2"
                    >
                        <span>Preview & Edit Legal Text</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dates */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={fields.startDate.split('T')[0]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                    <input
                        type="date"
                        name="endDate"
                        value={fields.endDate ? fields.endDate.split('T')[0] : ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                    />
                </div>

                {/* Financials */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rent Amount (₦)</label>
                    <input
                        type="number"
                        name="rentAmount"
                        value={fields.rentAmount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        required
                        min="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Frequency</label>
                    <select
                        name="paymentFrequency"
                        value={fields.paymentFrequency}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Annually">Annually</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount (₦)</label>
                    <input
                        type="number"
                        name="depositAmount"
                        value={fields.depositAmount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        required
                        min="0"
                    />
                </div>

                {/* Terms */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period (Days)</label>
                    <input
                        type="number"
                        name="noticePeriod"
                        value={fields.noticePeriod}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        required
                        min="0"
                    />
                </div>

                {/* Special Clauses */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Clauses</label>
                    <textarea
                        name="specialClauses"
                        value={fields.specialClauses || ''}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none resize-none"
                        placeholder="Enter any additional terms or clauses here..."
                    />
                </div>
            </div>
        </form>
    );
}
