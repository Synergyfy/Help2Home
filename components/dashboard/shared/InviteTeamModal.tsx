'use client';

import { useState } from 'react';
import { useUserStore, Role } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import { toast } from 'react-toastify';
import { HiOutlineEnvelope, HiOutlineUserGroup, HiOutlineXMark } from 'react-icons/hi2';
import { AnimatePresence, motion } from 'framer-motion';

interface InviteTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRole?: Role;
}

export default function InviteTeamModal({ isOpen, onClose, initialRole }: InviteTeamModalProps) {
    const { activeRole } = useUserStore();
    const { addNotification } = useNotificationStore();
    const [email, setEmail] = useState('');
    const [targetRole, setTargetRole] = useState<Role | ''>(initialRole || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter available roles based on current user role
    const getAvailableRoles = (): Role[] => {
        switch (activeRole) {
            case 'landlord':
                return ['agent', 'caretaker'];
            case 'caretaker':
                return ['landlord'];
            case 'agent':
                return ['landlord', 'caretaker', 'agent'];
            default:
                return [];
        }
    };

    const availableRoles = getAvailableRoles();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !targetRole) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success(`Invitation sent to ${email} as ${targetRole}`);

        addNotification({
            title: 'Invitation Sent',
            message: `A professional invitation has been dispatched to ${email}.`,
            type: 'success'
        });

        setIsSubmitting(false);
        setEmail('');
        setTargetRole('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900">Invite Partner</h3>
                                    <p className="text-sm text-gray-500">Add trusted members to your property network.</p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                    <HiOutlineXMark size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="partner@example.com"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Assign Role</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {availableRoles.map((role) => (
                                            <button
                                                key={role}
                                                type="button"
                                                onClick={() => setTargetRole(role)}
                                                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${targetRole === role
                                                    ? 'border-brand-green bg-green-50 shadow-md'
                                                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-xl transition-colors ${targetRole === role ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                                                        }`}>
                                                        <HiOutlineUserGroup size={20} />
                                                    </div>
                                                    <span className={`font-bold capitalize ${targetRole === role ? 'text-gray-900' : 'text-gray-500'}`}>
                                                        {role}
                                                    </span>
                                                </div>
                                                {targetRole === role && (
                                                    <div className="size-5 rounded-full bg-brand-green flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !email || !targetRole}
                                    className="w-full bg-brand-green text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-brand-green/20 hover:bg-green-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
                                >
                                    {isSubmitting ? 'Sending Invitation...' : 'Send Invitation'}
                                </button>
                            </form>
                        </div>

                        <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                Your current role is {activeRole}. Restrictions apply.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
