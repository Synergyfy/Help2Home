'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Contract, ContractFields, MOCK_TEMPLATES } from '@/lib/mockContractData';
import { toast } from 'react-toastify';
import ContractEditor from '@/components/dashboard/landlord/contracts/ContractEditor';
import PropertySelectModal from '@/components/dashboard/landlord/contracts/PropertySelectModal';
import { addDays } from 'date-fns';
import { HiOutlineHome, HiOutlineDocumentDuplicate, HiOutlineChevronRight, HiOutlineDocumentText } from 'react-icons/hi2';
import { Property } from '@/utils/properties';
import { useContractStore } from '@/store/contractStore';

import ContractContentEditor from '@/components/dashboard/landlord/contracts/ContractContentEditor';

export default function NewContractPage() {
    const router = useRouter();
    const { addContract } = useContractStore();
    const [step, setStep] = useState<'property' | 'template' | 'details' | 'content'>('property');
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [generatedContent, setGeneratedContent] = useState('');

    const [contractFields, setContractFields] = useState<ContractFields>({
        startDate: addDays(new Date(), 1).toISOString(),
        rentAmount: 0,
        paymentFrequency: 'Monthly',
        depositAmount: 0,
        noticePeriod: 30
    });

    const handlePropertySelect = (property: Property) => {
        setSelectedProperty(property);
        setContractFields(prev => ({
            ...prev,
            rentAmount: property.price || 0,
            depositAmount: (property.price || 0) * 0.1, // Default 10% deposit
        }));
        setStep('template');
    };

    const generateInitialContent = (templateId: string, fields: ContractFields) => {
        if (templateId === 'custom') {
            return '# CUSTOM TENANCY AGREEMENT\n\n[Start typing your custom agreement here...]';
        }

        const template = MOCK_TEMPLATES.find(t => t.id === templateId);
        if (!template) return '';

        let content = template.content;

        // Replacement mapping
        const replacements: Record<string, string> = {
            '{{today_date}}': new Date().toLocaleDateString(),
            '{{landlord_name}}': 'Lagos Properties Ltd', // Mock landlord name
            '{{landlord_address}}': '15 Adeola Odeku St, Victoria Island, Lagos', // Mock
            '{{tenant_name}}': '[TENANT NAME]',
            '{{tenant_phone}}': '[TENANT PHONE]',
            '{{property_address}}': selectedProperty?.address || '[PROPERTY ADDRESS]',
            '{{lease_duration}}': fields.endDate ? 'the specified term' : 'one year',
            '{{start_date}}': new Date(fields.startDate).toLocaleDateString(),
            '{{end_date}}': fields.endDate ? new Date(fields.endDate).toLocaleDateString() : 'N/A',
            '{{rent_amount}}': fields.rentAmount.toLocaleString(),
            '{{payment_frequency}}': fields.paymentFrequency.toLowerCase(),
            '{{deposit_amount}}': fields.depositAmount.toLocaleString(),
            '{{notice_period}}': fields.noticePeriod.toString(),
            '{{special_clauses}}': fields.specialClauses || 'None specified.',
            '{{max_occupants}}': '4'
        };

        Object.keys(replacements).forEach(key => {
            content = content.split(key).join(replacements[key]);
        });

        return content;
    };

    const handleProceedToContent = (fields: ContractFields) => {
        setContractFields(fields);
        const content = generateInitialContent(selectedTemplate || 'custom', fields);
        setGeneratedContent(content);
        setStep('content');
    };

    const handleSave = (finalContent: string) => {
        const newContract: Contract = {
            ...mockContract,
            id: `cont_${Date.now()}`,
            status: 'Draft',
            updatedAt: new Date().toISOString(),
            content: finalContent,
            previewUrl: '#', // Link to this content eventually
        };

        addContract(newContract);
        toast.success('Contract generated and saved to your list!');
        router.push('/dashboard/landlord/contracts');
    };

    const mockContract: Contract = {
        id: 'new',
        propertyId: selectedProperty?.id?.toString() || '',
        propertyTitle: selectedProperty?.title || 'New Contract',
        propertyAddress: selectedProperty?.address || '',
        title: `Tenancy Agreement - ${selectedProperty?.title || 'Draft'}`,
        status: 'Draft',
        signers: [
            {
                id: 'sig_ll',
                name: 'Lagos Properties Ltd',
                email: 'landlord@help2home.com',
                role: 'Landlord',
                status: 'Pending'
            },
            {
                id: 'sig_tn',
                name: '[TENANT NAME]',
                email: 'tenant@example.com',
                role: 'Tenant',
                status: 'Pending'
            }
        ],
        fields: contractFields,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User'
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-12">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Link href="/dashboard/landlord/contracts" className="hover:text-gray-900 font-medium">Contracts</Link>
                    <HiOutlineChevronRight size={12} />
                    <span className="text-gray-900 font-bold">Generate Contract</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Create Agreement</h1>
                <p className="text-gray-500 text-lg font-medium">Follow the steps to generate a professional legal document.</p>
            </div>

            {/* Step 1: Property Selection */}
            {step === 'property' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 p-12 text-center">
                        <div className="size-20 rounded-3xl bg-brand-green/10 flex items-center justify-center text-brand-green mx-auto mb-6">
                            <HiOutlineHome size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Start with a Property</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Select the property you want to generate this agreement for to auto-fill the legal details.</p>
                        <button
                            onClick={() => setStep('property')}
                            className="bg-brand-green text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-green-900/20 hover:bg-green-700 transition-all active:scale-95"
                        >
                            Select Property to Begin
                        </button>
                    </div>
                    <PropertySelectModal
                        isOpen={step === 'property'}
                        onClose={() => router.back()}
                        onSelect={handlePropertySelect}
                    />
                </div>
            )}

            {/* Step 2: Template Selection */}
            {step === 'template' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Select Legal Template</h3>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black uppercase text-gray-500">
                            <HiOutlineHome className="text-brand-green" />
                            {selectedProperty?.title}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MOCK_TEMPLATES.map(template => (
                            <button
                                key={template.id}
                                onClick={() => {
                                    setSelectedTemplate(template.id);
                                    setStep('details');
                                }}
                                className="text-left p-8 bg-white rounded-[2rem] shadow-sm border-2 border-gray-50 hover:border-brand-green hover:shadow-xl transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                    <HiOutlineDocumentDuplicate size={120} />
                                </div>
                                <div className="p-4 bg-green-50 text-brand-green rounded-2xl w-fit mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                                    <HiOutlineDocumentDuplicate size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{template.description}</p>
                                <div className="mt-8 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-brand-green font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Use Template <HiOutlineChevronRight />
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTemplate(template.id);
                                            const content = generateInitialContent(template.id, contractFields);
                                            setGeneratedContent(content);
                                            setStep('content');
                                        }}
                                        className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-brand-green hover:bg-green-50 transition-all opacity-0 group-hover:opacity-100"
                                        title="Preview and Edit directly"
                                    >
                                        <HiOutlineDocumentText size={20} />
                                    </button>
                                </div>
                            </button>
                        ))}

                        {/* Custom Option */}
                        <button
                            onClick={() => {
                                setSelectedTemplate('custom');
                                setStep('details');
                            }}
                            className="text-left p-8 bg-gray-900 rounded-[2rem] shadow-sm border-2 border-gray-900 hover:bg-black hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            <div className="p-4 bg-white/10 text-white rounded-2xl w-fit mb-6 group-hover:bg-white/20 transition-colors">
                                <HiOutlineDocumentDuplicate size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Create Custom Contract</h3>
                            <p className="text-sm text-gray-400 font-medium leading-relaxed">Start from a blank page and draft your own unique legal agreement.</p>
                            <div className="mt-8 flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                Start Drafting <HiOutlineChevronRight />
                            </div>
                        </button>
                    </div>
                    <button
                        onClick={() => setStep('property')}
                        className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ← Back to Property Selection
                    </button>
                </div>
            )}

            {/* Step 3: Terms Editor */}
            {step === 'details' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                            <HiOutlineHome size={18} />
                        </div>
                        <p className="text-xs font-bold text-blue-800">
                            Configure terms for <span className="underline">{selectedProperty?.title}</span>.
                        </p>
                    </div>
                    <ContractEditor
                        initialData={mockContract}
                        onSave={handleProceedToContent}
                        onCancel={() => setStep('template')}
                    />
                </div>
            )}

            {/* Step 4: Content Editor */}
            {step === 'content' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <ContractContentEditor
                        title={selectedTemplate === 'custom' ? 'Custom Contract' : MOCK_TEMPLATES.find(t => t.id === selectedTemplate)?.name || 'Legal Agreement'}
                        content={generatedContent}
                        onSave={handleSave}
                        onBack={() => setStep('details')}
                    />
                </div>
            )}
        </div>
    );
}
