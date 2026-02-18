'use client';

import React, { useState } from 'react';
import { 
    HiOutlineShieldCheck, 
    HiOutlineKey, 
    HiOutlineDevicePhoneMobile,
    HiOutlineComputerDesktop,
    HiOutlineGlobeAlt,
    HiOutlineFingerPrint,
    HiOutlineExclamationTriangle
} from 'react-icons/hi2';
import { toast } from 'react-toastify';

export default function PrivacySecurityTab() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPasswordLoading(true);
        setTimeout(() => {
            setIsPasswordLoading(false);
            toast.success('Password updated successfully');
        }, 1500);
    };

    const toggle2FA = () => {
        setIs2FAEnabled(!is2FAEnabled);
        toast.info(is2FAEnabled ? 'Two-factor authentication disabled' : 'Two-factor authentication enabled');
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Account Security Overview */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <HiOutlineShieldCheck size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900">Account Security</h3>
                        <p className="text-sm text-gray-500 font-medium">Protect your account with advanced security features.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 2FA Card */}
                    <div className={`p-6 rounded-3xl border-2 transition-all ${is2FAEnabled ? 'border-brand-green bg-green-50/30' : 'border-gray-100 bg-gray-50/30'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${is2FAEnabled ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <HiOutlineFingerPrint size={24} />
                            </div>
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${is2FAEnabled ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {is2FAEnabled ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Two-Factor Auth</h4>
                        <p className="text-xs text-gray-500 mb-6 font-medium leading-relaxed">Secure your account with an extra verification layer via SMS or Authenticator App.</p>
                        <button 
                            onClick={toggle2FA}
                            className={`w-full py-3 rounded-xl text-sm font-black transition-all ${
                                is2FAEnabled 
                                ? 'bg-white border-2 border-red-100 text-red-600 hover:bg-red-50' 
                                : 'bg-brand-green text-white hover:bg-green-700 shadow-lg shadow-green-900/20'
                            }`}
                        >
                            {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                        </button>
                    </div>

                    {/* Security Alert Card */}
                    <div className="p-6 rounded-3xl border-2 border-gray-100 bg-gray-50/30 flex flex-col">
                        <div className="p-3 rounded-xl bg-amber-100 text-amber-600 w-fit mb-4">
                            <HiOutlineExclamationTriangle size={24} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Login Alerts</h4>
                        <p className="text-xs text-gray-500 mb-6 font-medium leading-relaxed">Receive notifications for logins from new devices or unrecognized locations.</p>
                        <button className="mt-auto w-full py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-black text-gray-600 hover:border-brand-green hover:text-brand-green transition-all">
                            Configure Alerts
                        </button>
                    </div>
                </div>
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <HiOutlineKey className="text-gray-400" size={24} />
                        <h3 className="text-lg font-black text-gray-900">Change Password</h3>
                    </div>
                </div>
                <form onSubmit={handlePasswordUpdate} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Current Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">New Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Confirm New</label>
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-gray-900"
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        disabled={isPasswordLoading}
                        className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                    >
                        {isPasswordLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Update Password'
                        )}
                    </button>
                </form>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-black text-gray-900 mb-6">Active Sessions</h3>
                <div className="space-y-4">
                    {[
                        { 
                            device: 'Windows PC • Chrome', 
                            location: 'Lagos, Nigeria', 
                            status: 'Current Session', 
                            icon: HiOutlineComputerDesktop,
                            isCurrent: true 
                        },
                        { 
                            device: 'iPhone 15 Pro • Safari', 
                            location: 'Abuja, Nigeria', 
                            status: '2 days ago', 
                            icon: HiOutlineDevicePhoneMobile,
                            isCurrent: false 
                        }
                    ].map((session, i) => (
                        <div key={i} className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all ${session.isCurrent ? 'border-brand-green bg-green-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`size-12 rounded-2xl flex items-center justify-center ${session.isCurrent ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <session.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-gray-900">{session.device}</p>
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-0.5">
                                        <HiOutlineGlobeAlt size={14} />
                                        <span>{session.location}</span>
                                        <span>•</span>
                                        <span className={session.isCurrent ? 'text-brand-green font-bold' : ''}>{session.status}</span>
                                    </div>
                                </div>
                            </div>
                            {!session.isCurrent && (
                                <button className="text-xs font-black text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all">
                                    Logout
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
