import { HiOutlineBell, HiOutlineMail, HiOutlineDeviceMobile } from 'react-icons/hi';

export function NotificationSettings() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-50 bg-white">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">Notification Settings</h3>
        <p className="text-sm text-slate-500 font-medium">Choose how you want to be notified about account activity.</p>
      </div>

      <div className="p-8 space-y-6">
        {[
          { title: "Email Notifications", desc: "Receive security alerts and reports via email.", icon: HiOutlineMail },
          { title: "Push Notifications", desc: "Get instant alerts on your mobile or desktop.", icon: HiOutlineDeviceMobile },
          { title: "System Updates", desc: "News about new features and maintenance.", icon: HiOutlineBell }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-white rounded-xl shadow-sm text-brand-green">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
              </div>
            </div>
            {/* Simple Toggle Mockup */}
            <button className="w-11 h-6 bg-brand-green rounded-full relative transition-colors">
              <div className="absolute right-1 top-1 size-4 bg-white rounded-full shadow-sm" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}