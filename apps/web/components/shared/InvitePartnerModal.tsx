'use client';

import { useState } from 'react';
import {
    HiOutlineLink,
    HiOutlineMagnifyingGlass,
    HiOutlineXMark,
    HiOutlineClipboardDocument,
    HiOutlineEnvelope,
    HiOutlineCheckCircle,
    HiOutlineUserPlus,
    FaWhatsapp
} from './Icons';

interface InvitePartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentRole: 'landlord' | 'agent' | 'caretaker';
}

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar?: string;
}

const MOCK_USERS: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+234 801 234 5678', role: 'Agent' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+234 802 345 6789', role: 'Caretaker' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+234 803 456 7890', role: 'Landlord' },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+234 804 567 8901', role: 'Agent' },
    { id: '5', name: 'David Brown', email: 'david@example.com', phone: '+234 805 678 9012', role: 'Caretaker' },
];

export default function InvitePartnerModal({ isOpen, onClose, currentRole }: InvitePartnerModalProps) {
    const [activeTab, setActiveTab] = useState<'link' | 'search'>('link');
    const [searchQuery, setSearchQuery] = useState('');
    const [copied, setCopied] = useState(false);
    const [invitedUsers, setInvitedUsers] = useState<Set<string>>(new Set());

    if (!isOpen) return null;

    const inviteLink = `https://help2home.com/invite/${currentRole}/abc123xyz`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareEmail = () => {
        const subject = 'Join me on Help2Home';
        const body = `I'd like to invite you to collaborate with me on Help2Home.\n\nClick here to join: ${inviteLink}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleShareWhatsApp = () => {
        const text = `Join me on Help2Home! ${inviteLink}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleInviteUser = (userId: string) => {
        setInvitedUsers(prev => new Set(prev).add(userId));
        setTimeout(() => {
            setInvitedUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(userId);
                return newSet;
            });
        }, 3000);
    };

    const filteredUsers = MOCK_USERS.filter(user => {
        const query = searchQuery.toLowerCase();
        const nameMatch = user.name.toLowerCase().includes(query);
        const emailMatch = user.email.toLowerCase().includes(query);

        // Normalize phone numbers for better search (especially for Nigerian formats)
        const cleanQuery = searchQuery.replace(/\D/g, '');
        const cleanPhone = user.phone.replace(/\D/g, '');

        let phoneMatch = false;
        if (cleanQuery.length > 0) {
            // Direct match on digits
            phoneMatch = cleanPhone.includes(cleanQuery);

            // Handle Nigerian local format: 080... should match 23480...
            if (!phoneMatch && cleanQuery.startsWith('0')) {
                const internationalFormat = '234' + cleanQuery.slice(1);
                phoneMatch = cleanPhone.includes(internationalFormat);
            }
        }

        return nameMatch || emailMatch || phoneMatch;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl animate-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Invite Partner</h2>
                        <p className="text-sm text-gray-500 mt-1">Grow your network and collaborate efficiently</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <HiOutlineXMark size={24} className="text-gray-400" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-8">
                    <button
                        onClick={() => setActiveTab('link')}
                        className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all border-b-2 ${activeTab === 'link'
                            ? 'border-brand-green text-brand-green'
                            : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <HiOutlineLink size={20} />
                        Invite by Link
                    </button>
                    <button
                        onClick={() => setActiveTab('search')}
                        className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm transition-all border-b-2 ${activeTab === 'search'
                            ? 'border-brand-green text-brand-green'
                            : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <HiOutlineMagnifyingGlass size={20} />
                        Search Users
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    {activeTab === 'link' ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Your Invite Link
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inviteLink}
                                        readOnly
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 font-mono"
                                    />
                                    <button
                                        onClick={handleCopyLink}
                                        className="px-6 py-3 bg-brand-green text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
                                    >
                                        {copied ? (
                                            <>
                                                <HiOutlineCheckCircle size={20} />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <HiOutlineClipboardDocument size={20} />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <p className="text-sm font-semibold text-gray-900 mb-4">Share via</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleShareEmail}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-all border border-blue-100"
                                    >
                                        <HiOutlineEnvelope size={20} />
                                        Email
                                    </button>
                                    <button
                                        onClick={handleShareWhatsApp}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl font-semibold hover:bg-green-100 transition-all border border-green-100"
                                    >
                                        <FaWhatsapp size={20} />
                                        WhatsApp
                                    </button>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 flex gap-3">
                                <div className="text-blue-600 mt-0.5">
                                    <HiOutlineCheckCircle size={20} />
                                </div>
                                <div className="text-sm text-blue-900">
                                    <span className="font-semibold block mb-1">How it works:</span>
                                    Share this link with partners not yet on the platform. When they sign up using your link, they'll automatically be added to your network.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Search for existing users
                                </label>
                                <div className="relative">
                                    <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search by name, number or email..."
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-brand-green outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="max-h-96 overflow-y-auto space-y-3">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-green/30 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="size-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-semibold">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                                                    <p className="text-xs text-gray-500">{user.email} • {user.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 uppercase tracking-widest">
                                                    {user.role}
                                                </span>
                                                {invitedUsers.has(user.id) ? (
                                                    <button
                                                        disabled
                                                        className="px-6 py-2 bg-green-50 text-green-600 rounded-xl font-semibold text-sm flex items-center gap-2 border border-green-100"
                                                    >
                                                        <HiOutlineCheckCircle size={18} />
                                                        Invited
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleInviteUser(user.id)}
                                                        className="px-6 py-2 bg-brand-green text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition-all"
                                                    >
                                                        Invite
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <HiOutlineMagnifyingGlass className="size-16 mx-auto mb-4 text-gray-300" />
                                        <p className="font-medium">No users found</p>
                                        <p className="text-sm mt-1">Try a different search term</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
