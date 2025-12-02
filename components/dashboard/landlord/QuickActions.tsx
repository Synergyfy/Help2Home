'use client';

export default function QuickActions() {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick actions</h3>

            <div className="space-y-3">
                <button className="w-full bg-[#00853E] text-white py-3 px-4 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add property
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button className="bg-gray-50 text-gray-700 py-3 px-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                        Review applications
                    </button>
                    <button className="bg-gray-50 text-gray-700 py-3 px-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                        Send contract
                    </button>
                    <button className="bg-gray-50 text-gray-700 py-3 px-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                        Request payout
                    </button>
                    <button className="bg-gray-50 text-gray-700 py-3 px-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                        Invite caretaker
                    </button>
                </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
                Tip: Use 'Add property' to list a new rental. You can save drafts.
            </p>
        </div>
    );
}
