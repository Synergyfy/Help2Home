import { HiOutlineCamera } from 'react-icons/hi';

export function ProfileHeader({ profile }: { profile: any }) {
  const fullName = `${profile?.firstName || 'Alex'} ${profile?.lastName || 'Morgan'}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center text-center shadow-sm">
      {/* Profile Picture Section */}
      <div className="relative mb-6">
        <div className="size-32 rounded-full border-4 border-white shadow-xl bg-slate-50 overflow-hidden">
          <img
            src={profile?.image || "/api/placeholder/128/128"}
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
        <button className="absolute bottom-1 right-1 p-2.5 bg-brand-green text-white rounded-full hover:bg-brand-green/90 shadow-lg shadow-brand-green/20 transition-all transform hover:scale-105">
          <HiOutlineCamera size={20} />
        </button>
      </div>

      {/* Identity Section */}
      <h2 className="text-xl font-black text-slate-900 tracking-tight">{fullName}</h2>
      <p className="text-sm font-bold text-slate-500 mb-4">Super Admin</p>

      {/* Status Badge - Matching your Support page green-on-green style */}
      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wider border border-emerald-100/50">
        Active Status
      </span>

      {/* Stats Divider */}
      <div className="w-full mt-8 border-t border-slate-50 pt-6 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-widest">Member Since</span>
          <span className="font-bold text-slate-900">Aug 20, 2021</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-widest">Last Login</span>
          <span className="font-bold text-slate-900">Today, 09:41 AM</span>
        </div>
      </div>
    </div>
  );
}