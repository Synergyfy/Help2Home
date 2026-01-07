import { HiOutlineExclamationCircle, HiOutlineKey } from 'react-icons/hi';

export function SecuritySettings() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 bg-white">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">Security Settings</h3>
        <p className="text-sm text-slate-500 font-medium">Manage your password and account protection.</p>
      </div>

      <div className="p-8 space-y-8">
        {/* Warning Alert - High Contrast Emerald/Red style */}
        <div className="p-5 bg-red-50 border border-red-100 rounded-2xl flex gap-4">
          <HiOutlineExclamationCircle className="text-red-600 shrink-0" size={24} />
          <div>
            <h4 className="text-sm font-black text-red-900 uppercase tracking-tight">Two-Factor Authentication is Disabled</h4>
            <p className="text-xs text-red-700 mt-1 font-medium leading-relaxed">
              Add an extra layer of security to your account to prevent unauthorized access.
            </p>
            <button className="mt-3 text-xs font-black text-red-800 underline decoration-2 underline-offset-4 hover:text-red-900 transition-colors">
              Enable 2FA Now
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all" 
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button className="flex items-center gap-2 border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <HiOutlineKey size={18} /> Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}