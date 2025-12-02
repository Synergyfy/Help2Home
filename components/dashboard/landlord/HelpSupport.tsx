'use client';

export default function HelpSupport() {
    return (
        <div className="bg-gradient-to-br from-[#00853E] to-green-800 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Need help?</h3>
            <p className="text-sm text-green-100 mb-4 leading-relaxed">
                Chat with support or create a ticket. We're here to help with listings, payouts, and disputes.
            </p>

            <div className="space-y-2">
                <button className="w-full bg-white text-[#00853E] py-2 rounded-lg font-bold text-sm hover:bg-green-50 transition-colors">
                    Chat now
                </button>
                <div className="grid grid-cols-2 gap-2">
                    <button className="bg-green-700/50 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors border border-green-600">
                        Create ticket
                    </button>
                    <button className="bg-green-700/50 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors border border-green-600">
                        Docs
                    </button>
                </div>
            </div>
        </div>
    );
}
