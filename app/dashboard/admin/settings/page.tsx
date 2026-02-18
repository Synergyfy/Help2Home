// app/dashboard/admin/settings/page.tsx
"use client";

import React, { useState } from 'react';
import { MdOutlineSecurity, MdOutlinePalette, MdOutlineIntegrationInstructions, MdOutlineWarning } from 'react-icons/md';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const settingsTabs = [
    { id: 'general', label: 'General', icon: MdOutlineSecurity },
    { id: 'appearance', label: 'Appearance', icon: MdOutlinePalette },
    { id: 'integrations', label: 'Integrations', icon: MdOutlineIntegrationInstructions },
    { id: 'dangerZone', label: 'Danger Zone', icon: MdOutlineWarning },
  ];

  return (
    <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Admin Settings</h1>
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
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-900">Enable User Registration</h3>
                    <p className="text-sm text-gray-500">Allow new users to sign up for the platform.</p>
                  </div>
                  <label htmlFor="toggle-user-registration" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" id="toggle-user-registration" className="sr-only" />
                      <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive system-wide email notifications for important events.</p>
                  </div>
                  <label htmlFor="toggle-email-notifications" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" id="toggle-email-notifications" className="sr-only" defaultChecked />
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
                  <h3 className="font-medium text-gray-900 mb-2">Theme Selection</h3>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-100">Light</button>
                    <button className="px-4 py-2 border rounded-lg bg-gray-800 text-white hover:bg-gray-700">Dark</button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">Dashboard Layout</h3>
                  <p className="text-sm text-gray-500 mb-3">Choose your preferred dashboard layout.</p>
                  <select className="p-2 border rounded-lg w-full max-w-xs">
                    <option>Compact</option>
                    <option>Spacious</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'integrations' && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Integrations</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">Payment Gateway</h3>
                  <p className="text-sm text-gray-500 mb-3">Connect your preferred payment processing service.</p>
                  <input type="text" placeholder="API Key" className="p-2 border rounded-lg w-full max-w-md" />
                  <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Connect</button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-2">Analytics Service</h3>
                  <p className="text-sm text-gray-500 mb-3">Integrate with an analytics platform to track user behavior.</p>
                  <input type="text" placeholder="Tracking ID" className="p-2 border rounded-lg w-full max-w-md" />
                  <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Connect</button>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'dangerZone' && (
            <section>
              <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-medium text-red-800 mb-2">Deactivate Account</h3>
                  <p className="text-sm text-red-600 mb-3">Permanently deactivate your admin account. This action cannot be undone.</p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Deactivate</button>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-medium text-red-800 mb-2">Export All Data</h3>
                  <p className="text-sm text-red-600 mb-3">Download all platform data. This may take some time.</p>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Export Data</button>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}