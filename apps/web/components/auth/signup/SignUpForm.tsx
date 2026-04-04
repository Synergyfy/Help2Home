'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Role } from '@/store/userStore';

const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  roles: Role[];
  onBack: () => void;
  onSubmit: (data: SignUpFormData) => void;
  isLoading: boolean;
}

export default function SignUpForm({ roles, onBack, onSubmit, isLoading }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <div className="max-w-md w-full mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-green mb-8 transition-colors"
      >
        <FiArrowLeft /> Back to role selection
      </button>

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
        <p className="text-gray-500">
          Joining as <span className="text-brand-green font-bold capitalize">{roles[0]}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">First Name</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" />
              <input
                {...register('firstName')}
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.firstName ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-brand-green'}`}
                placeholder="John"
              />
            </div>
            {errors.firstName && <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Last Name</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" />
              <input
                {...register('lastName')}
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.lastName ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-brand-green'}`}
                placeholder="Doe"
              />
            </div>
            {errors.lastName && <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Email Address</label>
          <div className="relative group">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" />
            <input
              {...register('email')}
              className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.email ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-brand-green'}`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>}
        </div>

        <div>
           <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Phone (Optional)</label>
          <div className="relative group">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" />
            <input
              {...register('phone')}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-xl outline-none transition-all focus:bg-white focus:border-brand-green"
              placeholder="+234..."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Password</label>
          <div className="relative group">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" />
            <input
              {...register('password')}
              type="password"
              className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.password ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-brand-green'}`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="w-full py-4 bg-brand-green hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-6"
        >
          {isLoading ? 'Creating account...' : 'Create Account'} <FiArrowRight />
        </motion.button>
      </form>
    </div>
  );
}
