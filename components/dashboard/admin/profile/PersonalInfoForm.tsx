import { HiOutlineMail, HiOutlinePhone, HiOutlineBadgeCheck, HiOutlineSave } from 'react-icons/hi';

export function PersonalInfoForm() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Personal Information</h3>
          <p className="text-sm text-slate-500 font-medium">Update your profile details and contact information.</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition-colors">
          Cancel
        </button>
      </div>

      {/* Form Content */}
      <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">First Name</label>
          <input 
            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" 
            defaultValue="Alex" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Last Name</label>
          <input 
            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" 
            defaultValue="Morgan" 
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" 
              defaultValue="alex.morgan@admin.com" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Phone Number</label>
          <div className="relative">
            <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" 
              defaultValue="+234 810 000 0000" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Admin Role</label>
          <div className="relative">
            <HiOutlineBadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
            <input 
              disabled
              className="w-full bg-slate-100 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-500 cursor-not-allowed" 
              defaultValue="Super Admin" 
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end md:col-span-2 pt-4">
          <button className="bg-brand-green text-white px-10 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-green/20 hover:bg-brand-green/90 flex items-center gap-2 transition-all transform hover:scale-[1.02]">
            <HiOutlineSave size={20} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}