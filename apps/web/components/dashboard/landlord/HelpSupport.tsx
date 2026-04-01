'use client';

import Link from 'next/link';

export default function HelpSupport() {
    const handleChatClick = () => {
        window.dispatchEvent(new CustomEvent('open-chatbot'));
    };

    return (
        <div className="bg-linear-to-br from-brand-green to-green-800 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Need help?</h3>
            <p className="text-sm text-green-100 mb-4 leading-relaxed">
                Chat with support or create a ticket. We're here to help with listings, payouts, and disputes.
            </p>

            <div className="space-y-2">
                <button 
                    onClick={handleChatClick}
                    className="w-full bg-white text-brand-green py-2 rounded-lg font-bold text-sm hover:bg-green-50 transition-colors"
                >
                    Chat now
                </button>
                <div className="grid grid-cols-2 gap-2">
                    <Link 
                        href="/dashboard/landlord/support/tickets?action=create"
                        className="bg-green-700/50 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors border border-green-600 text-center"
                    >
                        Create ticket
                    </Link>
                    <Link 
                        href="/dashboard/landlord/education"
                        className="bg-green-700/50 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors border border-green-600 text-center"
                    >
                        Docs
                    </Link>
                </div>
            </div>
        </div>
    );
}
