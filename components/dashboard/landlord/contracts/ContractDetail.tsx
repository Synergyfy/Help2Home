'use client';

import React from 'react';
import { Contract, Signer } from '@/lib/mockContractData';
import { format } from 'date-fns';
import { 
    HiOutlineDocumentText, 
    HiOutlineMagnifyingGlassPlus, 
    HiOutlineMagnifyingGlassMinus,
    HiOutlinePrinter,
    HiOutlineArrowDownTray,
    HiOutlineCheckCircle
} from 'react-icons/hi2';

interface ContractDetailProps {
    contract: Contract;
    onSendForSignature: () => void;
    onDownload: () => void;
}

export default function ContractDetail({ contract, onSendForSignature, onDownload }: ContractDetailProps) {
    const getSignerStatusColor = (status: Signer['status']) => {
        switch (status) {
            case 'Signed': return 'text-green-600 bg-green-50 border-green-100';
            case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
            case 'Viewed': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'Declined': return 'text-red-600 bg-red-50 border-red-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Professional Mock Preview */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[800px]">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-gray-500">
                            <HiOutlineDocumentText size={20} className="text-brand-green" />
                            <span className="text-xs font-bold uppercase tracking-widest">Document Preview</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
                                <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                                    <HiOutlineMagnifyingGlassMinus size={18} />
                                </button>
                                <span className="px-3 flex items-center text-[10px] font-black text-gray-500 border-x border-gray-100">100%</span>
                                <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                                    <HiOutlineMagnifyingGlassPlus size={18} />
                                </button>
                            </div>
                            <button onClick={() => window.print()} className="p-2 text-gray-400 hover:text-brand-green hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100">
                                <HiOutlinePrinter size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Document Surface */}
                    <div className="flex-1 bg-gray-100/50 p-8 md:p-12 flex justify-center overflow-y-auto custom-scrollbar">
                        <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-[20mm] md:p-[25mm] flex flex-col font-serif text-[#1a1a1a] leading-relaxed relative print:shadow-none print:p-0">
                            
                            {/* Watermark for Unsigned */}
                            {contract.status !== 'Signed' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                                    <span className="text-[120px] font-black -rotate-45 border-[20px] border-gray-900 px-10">DRAFT</span>
                                </div>
                            )}

                            {/* Contract Header */}
                            <div className="text-center mb-16">
                                <h1 className="text-2xl font-bold uppercase underline tracking-tight mb-2">Residential Tenancy Agreement</h1>
                                <p className="text-xs font-medium text-gray-500">Document Reference: {contract.id.toUpperCase()}</p>
                            </div>

                            <div className="space-y-10 text-sm">
                                {/* Section 1: The Parties */}
                                <section>
                                    <h4 className="font-bold border-b border-gray-900 mb-4 pb-1">1. THE PARTIES</h4>
                                    <div className="space-y-4">
                                        <p>This agreement is made on this <span className="font-bold underline">{format(new Date(contract.createdAt), 'do')}</span> day of <span className="font-bold underline">{format(new Date(contract.createdAt), 'MMMM, yyyy')}</span>, between:</p>
                                        <div className="pl-4 border-l-2 border-gray-100">
                                            <p className="font-bold mb-1">THE LANDLORD:</p>
                                            <p className="italic">{contract.signers.find(s => s.role === 'Landlord')?.name || 'Help2Home Registered Owner'}</p>
                                            <p className="text-xs text-gray-500 mt-1">Represented by Help2Home Digital Management Services.</p>
                                        </div>
                                        <div className="pl-4 border-l-2 border-gray-100">
                                            <p className="font-bold mb-1">THE TENANT:</p>
                                            <p className="italic">{contract.signers.find(s => s.role === 'Tenant')?.name || 'Registered Applicant'}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: The Property */}
                                <section>
                                    <h4 className="font-bold border-b border-gray-900 mb-4 pb-1">2. THE PROPERTY</h4>
                                    <p>The Landlord agrees to let and the Tenant agrees to take the premises known as:</p>
                                    <p className="font-bold mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 italic">
                                        {contract.propertyTitle} — {contract.propertyAddress}
                                    </p>
                                </section>

                                {/* Section 3: Term & Rent */}
                                <section>
                                    <h4 className="font-bold border-b border-gray-900 mb-4 pb-1">3. TERM AND RENT</h4>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>The tenancy shall be for a period of <span className="font-bold underline">12 Months</span> commencing on <span className="font-bold underline">{format(new Date(contract.fields.startDate), 'MMM d, yyyy')}</span>.</li>
                                        <li>The Rent for the said term shall be <span className="font-bold">₦{contract.fields.rentAmount.toLocaleString()}</span>, payable <span className="font-bold underline">{contract.fields.paymentFrequency}</span> in advance.</li>
                                        <li>A security deposit of <span className="font-bold text-brand-green">₦{contract.fields.depositAmount.toLocaleString()}</span> is required and will be held in escrow by Help2Home.</li>
                                    </ul>
                                </section>

                                {/* Section 4: General Covenants (Mock legal text) */}
                                <section>
                                    <h4 className="font-bold border-b border-gray-900 mb-4 pb-1">4. GENERAL COVENANTS</h4>
                                    <p className="text-[11px] text-gray-600 text-justify">
                                        The Tenant hereby covenants with the Landlord to pay the rent at the times and in the manner aforesaid. To keep the interior of the premises including all fixtures and fittings in good and tenantable repair. Not to make any structural alterations to the premises without the prior written consent of the Landlord. To use the premises strictly for residential purposes and not to sublet or part with possession of the premises or any part thereof.
                                    </p>
                                </section>

                                {/* Section 5: Signatures */}
                                <section className="pt-12 mt-auto">
                                    <h4 className="font-bold border-b border-gray-900 mb-10 pb-1 uppercase">Signatures & Execution</h4>
                                    <div className="grid grid-cols-2 gap-16">
                                        {contract.signers.map(signer => (
                                            <div key={signer.id} className="space-y-4">
                                                <div className="h-20 border-b border-gray-300 relative flex items-center justify-center">
                                                    {signer.status === 'Signed' ? (
                                                        <div className="text-center animate-in fade-in zoom-in duration-700">
                                                            <p className="font-serif italic text-blue-600 text-xl font-bold select-none">{signer.name}</p>
                                                            <div className="absolute top-0 right-0">
                                                                <HiOutlineCheckCircle className="text-green-500 bg-white rounded-full" size={24} />
                                                            </div>
                                                            <p className="text-[8px] text-gray-400 mt-1 uppercase font-sans">Digitally Verified: {format(new Date(signer.signedAt || ''), 'yyyy-MM-dd HH:mm:ss')}</p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-[10px] text-gray-300 uppercase font-sans tracking-[0.3em]">Awaiting Signature</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-xs uppercase">{signer.role}</p>
                                                    <p className="text-[10px] text-gray-500">{signer.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Document Footer */}
                            <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-[9px] text-gray-400 uppercase tracking-widest font-sans">
                                <span>Powered by Help2Home Digital Contracts</span>
                                <span>Page 1 of 1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar - Metadata & Actions */}
            <div className="space-y-6">
                {/* Actions */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h3 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Management Actions</h3>
                    <div className="space-y-3">
                        {contract.status === 'Draft' && (
                            <button
                                onClick={onSendForSignature}
                                className="w-full py-4 bg-brand-green text-white rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-2 active:scale-95"
                            >
                                <HiOutlineDocumentText size={20} strokeWidth={2.5} />
                                Send for Signature
                            </button>
                        )}
                        <button
                            onClick={onDownload}
                            className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-black text-sm hover:border-brand-green hover:text-brand-green transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <HiOutlineArrowDownTray size={20} strokeWidth={2.5} />
                            Download Archive
                        </button>
                    </div>
                </div>

                {/* Signers Track */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h3 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Signing Status</h3>
                    <div className="space-y-6">
                        {contract.signers.map((signer) => (
                            <div key={signer.id} className="group">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-10 rounded-xl flex items-center justify-center text-sm font-black ${signer.status === 'Signed' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                                            {signer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{signer.name}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{signer.role}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${getSignerStatusColor(signer.status)}`}>
                                        {signer.status}
                                    </span>
                                </div>
                                {signer.signedAt && (
                                    <p className="text-[10px] text-green-600 font-bold ml-13 flex items-center gap-1">
                                        <HiOutlineCheckCircle />
                                        Signed {format(new Date(signer.signedAt), 'MMM d, HH:mm')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Summary */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h3 className="font-black text-gray-900 mb-6 uppercase text-xs tracking-widest">Lease Summary</h3>
                    <div className="space-y-4 text-xs font-bold">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 uppercase tracking-wider">Base Rent</span>
                            <span className="text-gray-900">₦{contract.fields.rentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 uppercase tracking-wider">Frequency</span>
                            <span className="text-brand-green">{contract.fields.paymentFrequency}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 uppercase tracking-wider">Notice Period</span>
                            <span className="text-gray-900">{contract.fields.noticePeriod} Days</span>
                        </div>
                        <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-gray-400 uppercase tracking-wider">Start Date</span>
                            <span className="text-gray-900">{format(new Date(contract.fields.startDate), 'MMM d, yyyy')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
