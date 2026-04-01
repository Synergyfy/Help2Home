'use client';

import React, { useState } from 'react';
import { HiOutlineUserPlus, HiOutlineInformationCircle } from 'react-icons/hi2';
import InviteTeamModal from '@/components/dashboard/shared/InviteTeamModal';

interface PropertyInviteSectionProps {
    propertyId: string;
    propertyTitle: string;
}

export default function PropertyInviteSection({ propertyId, propertyTitle }: PropertyInviteSectionProps) {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteType, setInviteType] = useState<'landlord' | 'agent' | null>(null);

    const handleInvite = (type: 'landlord' | 'agent') => {
        setInviteType(type);
        setIsInviteModalOpen(true);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <HiOutlineUserPlus size={20} className="text-brand-green" />
                    Property Collaboration
                </h3>
            </div>

            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                As a caretaker, you can invite a Landlord or an Agent to help manage this property. They will receive an invitation to join your network for **{propertyTitle}**.
            </p>

            <div className="grid grid-cols-1 gap-3">
                <button
                    onClick={() => handleInvite('landlord')}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-green hover:bg-green-50/50 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-green group-hover:text-white transition-all">
                            <HiOutlineUserPlus size={20} />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-semibold text-gray-900">Invite Landlord</div>
                            <div className="text-[10px] text-gray-500">For ownership and financial oversight</div>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleInvite('agent')}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-green hover:bg-green-50/50 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-green group-hover:text-white transition-all">
                            <HiOutlineUserPlus size={20} />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-semibold text-gray-900">Invite Agent</div>
                            <div className="text-[10px] text-gray-500">For marketing and showings</div>
                        </div>
                    </div>
                </button>
            </div>

            <div className="mt-6 flex items-start gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <HiOutlineInformationCircle className="size-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-700 leading-normal">
                    Invited partners will see this property in their "Partner Network" and will be able to collaborate based on their role permissions.
                </p>
            </div>

            {/* Invite Modal */}
            {isInviteModalOpen && (
                <InviteTeamModal
                    isOpen={isInviteModalOpen}
                    onClose={() => setIsInviteModalOpen(false)}
                    initialRole={inviteType || 'landlord'}
                />
            )}
        </div>
    );
}
