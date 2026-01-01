'use client';

import { MdLock, MdNotificationsActive, MdAccountCircle, MdSecurity } from 'react-icons/md';

export default function SettingsPage() {
    return (
        <div className="max-w-2xl space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

            <section className="space-y-4">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MdAccountCircle className="text-[#00853E]" /> Profile Information
                </h2>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Agency Name</label>
                            <input className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm font-medium" defaultValue="Help2Home Developers" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">License ID</label>
                            <input className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm font-medium" defaultValue="LASRERA/2025/091" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <MdSecurity className="text-[#00853E]" /> Security & Access
                </h2>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                    <button className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MdLock /></div>
                            <span className="text-sm font-bold text-gray-900">Update Password</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-300">Last changed 3mo ago</span>
                    </button>
                    <button className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><MdNotificationsActive /></div>
                            <span className="text-sm font-bold text-gray-900">Notification Preferences</span>
                        </div>
                    </button>
                </div>
            </section>
            
            <button className="w-full py-4 bg-[#00853E] text-white rounded-2xl font-bold shadow-lg shadow-green-900/20 hover:scale-[1.01] transition-all active:scale-[0.98]">
                Save All Changes
            </button>
        </div>
    );
}