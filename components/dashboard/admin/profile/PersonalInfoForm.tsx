import { HiOutlineMail, HiOutlinePhone, HiOutlineBadgeCheck, HiOutlineSave } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '@/hooks/useProfile';
import { useState } from 'react';

export function PersonalInfoForm({ profile }: { profile: any }) {
  const { mutate: updateProfile, isPending } = useUpdateProfile('admin');
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues = {
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    email: profile.email || '',
    phone: profile.phone || '',
    role: 'Super Admin' // Hardcoded for now or fetch from roles
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues
  });

  const onSubmit = (data: any) => {
    updateProfile(data, {
      onSuccess: () => setIsEditing(false)
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Personal Information</h3>
          <p className="text-sm text-slate-500 font-medium">Update your profile details and contact information.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-brand-green hover:text-green-700 text-xs font-bold uppercase tracking-widest transition-colors">
            Edit
          </button>
        ) : (
          <button
            onClick={() => {
              reset(defaultValues);
              setIsEditing(false);
            }}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition-colors">
            Cancel
          </button>
        )}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">First Name</label>
          <input
            {...register('firstName')}
            disabled={!isEditing}
            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all disabled:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Last Name</label>
          <input
            {...register('lastName')}
            disabled={!isEditing}
            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all disabled:text-gray-500"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Email Address</label>
          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              {...register('email')}
              disabled={!isEditing}
              className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all disabled:text-gray-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Phone Number</label>
          <div className="relative">
            <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              {...register('phone')}
              disabled={!isEditing}
              className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-green/20 outline-none transition-all disabled:text-gray-500"
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
        {isEditing && (
          <div className="flex justify-end md:col-span-2 pt-4">
            <button
              disabled={isPending}
              className="bg-brand-green text-white px-10 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-green/20 hover:bg-brand-green/90 flex items-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">
              <HiOutlineSave size={20} /> {isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}