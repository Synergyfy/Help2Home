'use client';

export default function PrivacySecurityTab() {
    return (
        <div className="space-y-6">
            {/* 2FA Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                        Disabled
                    </span>
                </div>
                <button className="text-[#00853E] font-bold text-sm hover:underline">Enable 2FA</button>
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00853E] focus:border-transparent" />
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                        Update Password
                    </button>
                </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Windows PC - Chrome</p>
                                <p className="text-xs text-green-600">Active now • Lagos, Nigeria</p>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">Current Session</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
