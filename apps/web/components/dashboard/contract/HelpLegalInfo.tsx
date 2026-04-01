import React from 'react';

export default function HelpLegalInfo() {
    return (
        <div className="text-center mb-12">
            <p className="text-sm text-gray-500 mb-2">
                By signing you agree to the contract terms and our <a href="#" className="text-[#6D28D9] hover:underline">Privacy Policy</a>.
            </p>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1 mx-auto">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Need help? Contact support
            </button>
        </div>
    );
}
