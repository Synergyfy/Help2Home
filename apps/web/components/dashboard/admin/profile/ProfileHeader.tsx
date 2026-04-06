import { HiOutlineCamera } from 'react-icons/hi';

export function ProfileHeader({ profile }: { profile: any }) {
  const fullName = `${profile?.firstName || ''} ${profile?.lastName || ''}`;
  const joinDate = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';

  return (
    <div className="bg-white rounded-2xl border border-brand-green-100 p-8 flex flex-col items-center text-center shadow-sm">
      {/* Profile Picture Section */}
      <div className="relative mb-6">
        <div className="size-32 rounded-full border-4 border-white shadow-xl bg-brand-green-50 overflow-hidden">
          <img
            src={profile?.avatar || "/assets/H2H_Logo_One.png"}
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
        <button className="absolute bottom-1 right-1 p-2.5 bg-brand-green text-white rounded-full hover:bg-brand-green/90 shadow-lg shadow-brand-green/20 transition-all transform hover:scale-105">
          <HiOutlineCamera size={20} />
        </button>
      </div>

      {/* Identity Section */}
      <h2 className="text-xl font-black text-brand-green-900 tracking-tight">{fullName}</h2>
      <p className="text-sm font-bold text-brand-green-500 mb-4">{profile?.roles?.includes('SUPER_ADMIN') ? 'Super Admin' : 'Admin'}</p>

      {/* Status Badge */}
      <span className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-wider border ${
        profile?.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-100/50' : 'bg-red-50 text-red-700 border-red-100/50'
      }`}>
        {profile?.isActive ? 'Active' : 'Inactive'} Status
      </span>

      {/* Stats Divider */}
      <div className="w-full mt-8 border-t border-brand-green-50 pt-6 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-brand-green-500 font-semibold uppercase text-[10px] tracking-widest">Member Since</span>
          <span className="font-bold text-brand-green-900">{joinDate}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-brand-green-500 font-semibold uppercase text-[10px] tracking-widest">Two-Factor Auth</span>
          <span className={`font-bold ${profile?.twoFactorEnabled ? 'text-emerald-600' : 'text-amber-600'}`}>
            {profile?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
    </div>
  );
}
