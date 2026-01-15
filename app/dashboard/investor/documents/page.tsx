'use client';

import React, { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineFolder,
    HiOutlineDocumentText,
    HiOutlineCloudArrowUp,
    HiOutlineMagnifyingGlass,
    HiOutlineArrowDownTray,
    HiOutlineEllipsisVertical,
    HiOutlineInformationCircle
} from 'react-icons/hi2';

const FOLDERS = [
    { name: "Legal Agreements", files: 4, color: "bg-blue-50 text-blue-600" },
    { name: "Tax Documents", files: 2, color: "bg-orange-50 text-orange-600" },
    { name: "Certificates", files: 3, color: "bg-brand-green/10 text-brand-green" },
    { name: "Quarterly Reports", files: 12, color: "bg-purple-50 text-purple-600" }
];

const DOCUMENTS = [
    { id: 1, name: "Equity Certificate - Lekki Ph1.pdf", type: "PDF", date: "Jan 12, 2026", size: "1.2MB", status: "Verified" },
    { id: 2, name: "Investment Agreement Addendum.pdf", type: "PDF", date: "Jan 05, 2026", size: "850KB", status: "Verified" },
    { id: 3, name: "Warrant of Title #8892.jpg", type: "Image", date: "Dec 15, 2025", size: "3.4MB", status: "Audit Pending" },
    { id: 4, name: "Tax Clearance Certificate 2025.pdf", type: "PDF", date: "Dec 01, 2025", size: "1.1MB", status: "Verified" }
];

export default function DocumentsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <FadeIn>
            <div className="space-y-10 pb-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">Documents Vault</h1>
                        <p className="text-gray-500 mt-1">Secure repository for all your legal and financial assets.</p>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-4 bg-brand-green text-white font-black rounded-2xl text-sm italic hover:shadow-xl hover:shadow-brand-green/20 transition-all">
                        <HiOutlineCloudArrowUp size={20} />
                        Secure Upload
                    </button>
                </div>

                {/* Folder Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FOLDERS.map((folder) => (
                        <div key={folder.name} className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer">
                            <div className={`size-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${folder.color}`}>
                                <HiOutlineFolder size={32} />
                            </div>
                            <h4 className="font-black text-gray-900 mb-1">{folder.name}</h4>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{folder.files} Items</p>
                        </div>
                    ))}
                </div>

                {/* Document Explorer */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/20">
                        <div className="flex items-center gap-4">
                            <HiOutlineDocumentText className="text-brand-green" size={24} />
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent Documents</h3>
                        </div>
                        <div className="relative w-full md:w-80">
                            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by filename or date..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:border-brand-green outline-none shadow-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Document Name</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Uploaded</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">File Size</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {DOCUMENTS.map((doc) => (
                                    <tr key={doc.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-green/10 group-hover:text-brand-green transition-all">
                                                    <HiOutlineDocumentText size={20} />
                                                </div>
                                                <span className="font-black text-gray-900 group-hover:text-brand-green transition-colors">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-xs text-gray-500 font-bold">{doc.type}</td>
                                        <td className="px-8 py-6 text-xs text-gray-500 font-medium">{doc.date}</td>
                                        <td className="px-8 py-6 text-xs text-gray-500 font-medium italic">{doc.size}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`size-2 rounded-full ${doc.status === 'Verified' ? 'bg-brand-green' : 'bg-orange-400'}`} />
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${doc.status === 'Verified' ? 'text-brand-green' : 'text-orange-500'}`}>
                                                    {doc.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-3 text-gray-400 hover:text-brand-green hover:bg-brand-green/5 rounded-xl transition-all">
                                                    <HiOutlineArrowDownTray size={20} />
                                                </button>
                                                <button className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                    <HiOutlineEllipsisVertical size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 bg-gray-50/30 border-t border-gray-50 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-brand-green bg-white px-4 py-2 rounded-full border border-brand-green/10 shadow-sm text-[10px] font-black uppercase">
                            <HiOutlineInformationCircle size={14} />
                            Storage Usage: 2.4 GB of 10 GB
                        </div>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[24%] h-full bg-brand-green rounded-full shadow-sm shadow-brand-green/20" />
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
