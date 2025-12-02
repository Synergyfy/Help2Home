'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Contract, ContractFields, MOCK_TEMPLATES } from '@/lib/mockContractData';
import ContractEditor from '@/components/dashboard/landlord/contracts/ContractEditor';
import { addDays } from 'date-fns';

export default function NewContractPage() {
    const router = useRouter();
    const [step, setStep] = useState<'template' | 'details'>('template');
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const defaultFields: ContractFields = {
        startDate: addDays(new Date(), 1).toISOString(),
        rentAmount: 0,
        paymentFrequency: 'Monthly',
        depositAmount: 0,
        noticePeriod: 30
    };

    const mockContract: Contract = {
        id: 'new',
        propertyId: '',
        propertyTitle: 'New Contract',
        propertyAddress: '',
        title: 'Draft Contract',
        status: 'Draft',
        signers: [],
        fields: defaultFields,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User'
    };

    const handleSave = (fields: ContractFields) => {
        console.log('Saving new contract:', fields);
        // In a real app, this would call an API to create the contract
        alert('Contract created successfully!');
        router.push('/dashboard/landlord/contracts');
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Link href="/dashboard/landlord/contracts" className="hover:text-gray-900">Contracts</Link>
                    <span>/</span>
                    <span className="text-gray-900">New Contract</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Generate Contract</h1>
                <p className="text-gray-500">Create a new tenancy agreement from a template.</p>
            </div>

            {step === 'template' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_TEMPLATES.map(template => (
                        <button
                            key={template.id}
                            onClick={() => {
                                setSelectedTemplate(template.id);
                                setStep('details');
                            }}
                            className="text-left p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#00853E] hover:ring-1 hover:ring-[#00853E] transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-green-50 text-[#00853E] rounded-lg group-hover:bg-[#00853E] group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
                            <p className="text-sm text-gray-500">{template.description}</p>
                        </button>
                    ))}
                </div>
            ) : (
                <ContractEditor
                    initialData={mockContract}
                    onSave={handleSave}
                    onCancel={() => setStep('template')}
                />
            )}
        </div>
    );
}
