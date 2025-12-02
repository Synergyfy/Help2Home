'use client';

import { VerificationItem } from '@/lib/mockLandlordData';

export default function VerificationStatus({ items }: { items: VerificationItem[] }) {
    const isVerified = items.every(item => item.status === 'verified');

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Verification status</h3>
                {isVerified && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                        Verified
                    </span>
                )}
            </div>

            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        {item.status === 'verified' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {isVerified ? (
                <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                    Verified — You can publish properties and receive payouts.
                </p>
            ) : (
                <div>
                    <p className="text-sm text-gray-600 mb-3">
                        Your account is not yet verified. Upload documents to get verified and receive payouts.
                    </p>
                    <button className="w-full border border-[#00853E] text-[#00853E] py-2 rounded-lg font-bold text-sm hover:bg-green-50 transition-colors">
                        Complete verification
                    </button>
                </div>
            )}
        </div>
    );
}
