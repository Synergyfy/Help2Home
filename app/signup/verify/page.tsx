'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';
import {toast} from 'react-toastify'
export default function VerifyEmailPage() {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state);

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = async () => {
  setError('');
  setIsVerifying(true);

  try {
    // simulate network request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const savedOtp = localStorage.getItem('email_otp');
    if (otp !== savedOtp) {
      setError('Invalid OTP. Please try again.');
      toast.error('Invalid OTP. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setIsVerifying(false);
      return;
    }

    // Mark verified in Zustand
    setUser({ verified: true });

    // Show success toast
    toast.success('Email verified successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });

    setIsVerifying(false);
    router.push(`/onboarding/${user.role}`);
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
    });
    setIsVerifying(false);
  }
};

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 px-4">
            <FadeIn>
                <div className="bg-white shadow-xl rounded-2xl p-10 sm:p-12 max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
                        <p className="mt-2 text-gray-500">
                            Enter the 6-digit OTP sent to your email
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-center mb-2">
                            <p className="text-sm text-gray-400">
                                For demo purposes, your OTP is <b className="text-gray-700">123456</b>
                            </p>
                        </div>

                        <input
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter OTP"
                            maxLength={6}
                            className="w-full text-center text-xl tracking-widest border-2 border-gray-300 rounded-xl py-4 focus:outline-none focus:ring-2 focus:ring-[#00853E] focus:border-transparent transition"
                        />

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            onClick={handleVerify}
                            disabled={isVerifying}
                            className={`w-full bg-[#00853E] text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl ${isVerifying ? 'opacity-50 cursor-not-allowed hover:bg-[#00853E]' : 'hover:bg-green-700'
                                }`}
                        >
                            {isVerifying ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </div>

                    <Link href='/signup/resend-otp' className="mt-6 text-center text-gray-500 text-sm">
                        Didn't receive the code? <button className="text-[#00853E] hover:underline">Resend OTP</button>
                    </Link>
                </div>
            </FadeIn>
        </main>
    );
}
