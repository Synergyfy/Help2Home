'use client';

import { useState } from 'react';
import { ProfileHeader } from '@/components/dashboard/admin/profile/ProfileHeader';
import { SidebarNav } from '@/components/dashboard/admin/profile/SideNav';
import { PersonalInfoForm } from '@/components/dashboard/admin/profile/PersonalInfoForm';
import { SecuritySettings } from '@/components/dashboard/admin/profile/SecuritySettings';
import { ActivityLog } from '@/components/dashboard/admin/profile/ActvityLog';

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');

  const renderContent = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm />;
      case 'security': return <SecuritySettings />;
      case 'activity': return <ActivityLog />;
      case 'notifications': 
        return (
          <div className="bg-white rounded-2xl border border-slate-100 p-20 text-center">
            <p className="text-slate-400 font-bold">Notification Settings coming soon...</p>
          </div>
        );
      default: return <PersonalInfoForm />;
    }
  };

  return (
    <main className="flex-1 px-4 lg:px-10 py-8 max-w-[1440px] mx-auto w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <ProfileHeader />
          <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />
        </aside>

        {/* Right Column: Dynamic Content */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>

          {/* Persistent Footer for Save (Optional) */}
          {activeTab !== 'activity' && (
            <div className="flex justify-end mt-4">
              <button className="bg-brand-green text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-brand-green/20 hover:bg-brand-green/90 transition-all">
                Save Changes
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}