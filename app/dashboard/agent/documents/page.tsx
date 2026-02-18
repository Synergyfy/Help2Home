'use client';

import { MdPictureAsPdf, MdOutlineCloudUpload, MdMoreVert, MdFileDownload } from '@/components/shared/Icons';

export default function DocumentsPage() {
    const docs = [
        { name: 'C_of_O_Skyline.pdf', size: '2.4 MB', date: 'Dec 12, 2025' },
        { name: 'Sales_Agreement_Template.docx', size: '1.1 MB', date: 'Nov 30, 2025' },
        { name: 'Site_Plan_Lekki.pdf', size: '5.8 MB', date: 'Oct 15, 2025' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Legal Vault</h1>
                <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold">
                    <MdOutlineCloudUpload size={20} /> Upload
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {docs.map((doc, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-brand-green transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                                <MdPictureAsPdf size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 truncate max-w-[150px] md:max-w-xs">{doc.name}</h3>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{doc.size} • {doc.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="p-2 text-gray-400 hover:text-brand-green transition-colors"><MdFileDownload size={20} /></button>
                            <button className="p-2 text-gray-400 hover:text-gray-900"><MdMoreVert size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
