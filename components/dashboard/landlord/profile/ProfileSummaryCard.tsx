import { ProfileData } from '@/lib/mockLandlordData';
import { useUserStore } from '@/store/userStore';

export default function ProfileSummaryCard({ profile: initialProfile }: { profile: ProfileData }) {
    const { profile: storeProfile, activeRole } = useUserStore();

    const profile = {
        ...initialProfile,
        firstName: storeProfile.firstName || initialProfile.firstName,
        lastName: storeProfile.lastName || initialProfile.lastName,
        displayName: storeProfile.firstName ? `${storeProfile.firstName} ${storeProfile.lastName}` : initialProfile.displayName,
        role: activeRole || initialProfile.role,
        avatarUrl: storeProfile.image || initialProfile.avatarUrl
    };

    const getStatusColor = (status: ProfileData['verificationStatus']) => {
        switch (status) {
            case 'verified': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-amber-100 text-amber-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status: ProfileData['verificationStatus']) => {
        switch (status) {
            case 'verified': return 'Verified';
            case 'pending': return 'Pending verification';
            case 'rejected': return 'Verification required';
            default: return 'Not verified';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-4 group cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-3xl font-bold text-gray-400">
                                {profile.firstName?.[0] || ''}{profile.lastName?.[0] || ''}
                            </span>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">{profile.displayName}</h2>
                <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">{profile.role}</span>
                </div>

                <div className={`px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 mb-2 ${getStatusColor(profile.verificationStatus)}`}>
                    {profile.verificationStatus === 'verified' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    )}
                    {getStatusLabel(profile.verificationStatus)}
                </div>

                {profile.verificationStatus === 'verified' && (
                    <p className="text-xs text-gray-500 mb-6">
                        Verified on {profile.verificationDate}.<br />You can publish properties and receive payouts.
                    </p>
                )}

                <div className="w-full space-y-2">
                    <button className="w-full bg-white border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Edit profile
                    </button>
                    {profile.verificationStatus !== 'verified' && (
                        <button className="w-full bg-brand-green text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                            Complete verification
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
