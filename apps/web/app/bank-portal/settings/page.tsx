'use client';

import React from 'react';
import { HiOutlineKey, HiOutlineGlobeAlt, HiOutlineBellAlert, HiOutlineUserCircle } from 'react-icons/hi2';

export default function BankSettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">System Settings</h1>
                <p className="text-gray-500 font-medium">Manage API keys, webhooks, and institutional roles.</p>
            </div>

            {/* API Keys */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <HiOutlineKey size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">API Credentials</h2>
                            <p className="text-sm text-gray-500 font-medium">Use these keys to authenticate your systems.</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-[#003366] text-white rounded-xl text-sm font-semibold">Generate New Key</button>
                </div>
                
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Production Key</p>
                            <p className="font-mono text-sm text-gray-600">sk_live_••••••••••••••••••••••••4f2a</p>
                        </div>
                        <button className="text-[#003366] font-semibold text-xs uppercase tracking-widest hover:underline">Reveal Key</button>
                    </div>
                </div>
            </div>

            {/* Webhooks */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                            <HiOutlineGlobeAlt size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Webhook Endpoints</h2>
                            <p className="text-sm text-gray-500 font-medium">Configure where to receive Help2Home event updates.</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">Add Endpoint</button>
                </div>

                <div className="divide-y divide-gray-50">
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-900 text-sm">https://api.accessbank.com/v1/webhooks/h2h</p>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded uppercase">Active</span>
                                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Events: application.approved, disbursement.success</span>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Roles & Permissions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                            <HiOutlineUserCircle size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Team & Roles</h2>
                            <p className="text-sm text-gray-500 font-medium">Manage institutional access for your staff.</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">Invite Staff</button>
                </div>

                <div className="space-y-4">
                    {[
                        { name: 'John Bank Manager', email: 'john.m@accessbank.com', role: 'Admin' },
                        { name: 'Jane Reviewer', email: 'jane.r@accessbank.com', role: 'Loan Officer' }
                    ].map((staff) => (
                        <div key={staff.email} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold text-xs uppercase">
                                    {staff.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{staff.name}</p>
                                    <p className="text-xs text-gray-500">{staff.email}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">{staff.role}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
