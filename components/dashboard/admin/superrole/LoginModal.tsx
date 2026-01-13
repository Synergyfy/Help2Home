import React, { useState } from 'react';
import { FiShield, FiLock, FiUser } from 'react-icons/fi';

interface LoginModalProps {
  onLogin: (status: boolean) => void;
}

export const LoginModal = ({ onLogin }: LoginModalProps) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(true);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-brand-green-900/90 backdrop-blur-md px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-emerald-100">
        <div className="flex flex-col items-center mb-8">
          <div className="size-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
            <FiShield size={40} />
          </div>
          <h2 className="text-2xl font-bold text-brand-green-900">Admin Authentication</h2>
          <p className="text-brand-green-500 text-sm">Please verify your identity to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-green-500 uppercase tracking-wider">Admin Email</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -tranbrand-green-y-1/2 text-brand-green-400" size={18} />
              <input
                type="email" required
                className="w-full pl-10 pr-4 py-3 bg-brand-green-50 border border-brand-green-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="admin@brand.com"
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-green-500 uppercase tracking-wider">Secure Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -tranbrand-green-y-1/2 text-brand-green-400" size={18} />
              <input
                type="password" required
                className="w-full pl-10 pr-4 py-3 bg-brand-green-50 border border-brand-green-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="••••••••"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform active:scale-[0.98]"
          >
            Access Console
          </button>
        </form>
      </div>
    </div>
  );
};
