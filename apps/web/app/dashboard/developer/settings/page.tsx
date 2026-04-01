// app/dashboard/developer/settings/page.tsx
"use client";

import React, { useState } from 'react';
import { MdOutlineSecurity, MdOutlinePalette, MdOutlineIntegrationInstructions, MdOutlineKey } from 'react-icons/md';

export default function DeveloperSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const settingsTabs = [
    { id: 'general', label: 'General', icon: MdOutlineSecurity },
    { id: 'appearance', label: 'Appearance', icon: MdOutlinePalette },
    { id: 'integrations', label: 'Integrations', icon: MdOutlineIntegrationInstructions },
  ];

  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Developer Settings</h1>
        <button className="bg-brand-green hover:bg-brand-green/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-green/20">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex border-b border-gray-200 mb-6">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium
                ${activeTab === tab.id
                  ? 'border-b-2 border-brand-green text-brand-green'
                  : 'text-gray-500 hover:text-gray-700'}
                transition-colors duration-200
              `}
            >
              <tab.icon size={20} /> {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === 'general' && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">General Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">Profile Visibility</h3>
                  <p className="text-sm text-gray-500 mb-3">Control who can see your developer profile.</p>
                  <select className="p-2 border rounded-lg w-full max-w-xs">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Visible to Partners Only</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications for project updates and messages.</p>
                  </div>
                  <label htmlFor="toggle-dev-email-notifications" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" id="toggle-dev-email-notifications" className="sr-only" defaultChecked />
                      <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'appearance' && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Appearance Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">Dashboard Theme</h3>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-100">Light</button>
                    <button className="px-4 py-2 border rounded-lg bg-gray-800 text-white hover:bg-gray-700">Dark</button>
                  </div>
                </div>
              </div>
            </section>
          )}



          {activeTab === 'integrations' && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Integrations</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">GitHub Integration</h3>
                  <p className="text-sm text-gray-500 mb-3">Connect your GitHub account for project synchronization.</p>
                  <button className="mt-3 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">Connect GitHub</button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}