import { 
  HiOutlineUser, 
  HiOutlineLockClosed, 
  HiOutlineBell, 
  HiOutlineClock 
} from 'react-icons/hi';

const navItems = [
  { id: 'personal', label: 'Personal Information', icon: HiOutlineUser },
  { id: 'security', label: 'Security & Password', icon: HiOutlineLockClosed },
  { id: 'notifications', label: 'Notifications', icon: HiOutlineBell },
  { id: 'activity', label: 'Activity Log', icon: HiOutlineClock },
];

interface SidebarNavProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
  return (
    <div className="bg-white rounded-2xl border border-brand-green-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-brand-green-50">
        <h3 className="font-black text-brand-green-900 uppercase text-xs tracking-[0.15em]">Profile Settings</h3>
      </div>
      <nav className="flex flex-col p-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold transition-all group ${
                isActive 
                  ? 'bg-emerald-50 text-brand-green shadow-sm ring-1 ring-emerald-100/50' 
                  : 'text-brand-green-500 hover:bg-brand-green-50 hover:text-brand-green-900'
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-colors ${isActive ? 'text-brand-green' : 'text-brand-green-400 group-hover:text-brand-green-600'}`} 
              />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 mt-2">
         <div className="bg-brand-green-50 rounded-xl p-4 border border-dashed border-brand-green-200">
            <p className="text-[10px] font-bold text-brand-green-400 uppercase text-center tracking-tighter">
              Account Security: 75% Complete
            </p>
            <div className="w-full bg-brand-green-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-brand-green h-1.5 rounded-full w-[75%]" />
            </div>
         </div>
      </div>
    </div>
  );
}
