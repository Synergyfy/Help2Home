'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Contract, ContractStatus } from '@/lib/mockContractData';
import { useContractStore } from '@/store/contractStore';
import { format } from 'date-fns';

interface ContractListProps {
    onSelect?: (contract: Contract) => void;
}

export default function ContractList({ onSelect }: ContractListProps) {
    const { contracts } = useContractStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ContractStatus | 'All'>('All');

    const filteredContracts = contracts.filter(contract => {
        const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contract.signers.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'All' || contract.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: ContractStatus) => {
        switch (status) {
            case 'Signed': return 'bg-green-100 text-green-700';
            case 'Pending Signatures': return 'bg-yellow-100 text-yellow-700';
            case 'Draft': return 'bg-gray-100 text-gray-700';
            case 'Partially Signed': return 'bg-blue-100 text-blue-700';
            case 'Declined': return 'bg-red-100 text-red-700';
            case 'Expired': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Filters */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {['All', 'Draft', 'Pending Signatures', 'Signed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === status
                                ? 'bg-[#00853E] text-white'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search contracts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Contract</th>
                            <th className="px-6 py-4">Property</th>
                            <th className="px-6 py-4">Signers</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Updated</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredContracts.map((contract) => (
                            <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{contract.title}</div>
                                    <div className="text-xs text-gray-500">ID: {contract.id}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{contract.propertyTitle}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-[150px]">{contract.propertyAddress}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {contract.signers.map((signer) => (
                                            <div key={signer.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600" title={`${signer.name} (${signer.status})`}>
                                                {signer.name?.[0] || '?'}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                                        {contract.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {format(new Date(contract.updatedAt), 'MMM d, yyyy')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/dashboard/landlord/contracts/${contract.id}`}
                                        className="text-[#00853E] hover:text-green-700 font-medium text-sm"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {filteredContracts.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No contracts found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
