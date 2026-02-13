import React from 'react';

export default function HelpTipsCard() {
    return (
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-start gap-3 mb-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-[#6D28D9]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Quick Tips</h4>
                    <p className="text-xs text-gray-600 mt-1">Get verified faster with these tips.</p>
                </div>
            </div>

            <ul className="space-y-3">
                <li className="flex gap-2 text-sm text-gray-700">
                    <span className="text-[#6D28D9]">•</span>
                    <span>Use your phone camera for clearer photos of documents.</span>
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                    <span className="text-[#6D28D9]">•</span>
                    <span>For self-employed, upload 6 months of bank statements to verify income.</span>
                </li>
                <li className="flex gap-2 text-sm text-gray-700">
                    <span className="text-[#6D28D9]">•</span>
                    <span>Ensure all four corners of the document are visible.</span>
                </li>
            </ul>

            <button className="mt-4 text-sm font-medium text-[#6D28D9] hover:underline">
                How we verify your documents →
            </button>
        </div>
    );
}
