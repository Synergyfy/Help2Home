'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import BackgroundPanel from '@/components/lib/BackgroundPanel';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/userStore';

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
      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const savedOtp = localStorage.getItem('email_otp');
      if (otp !== savedOtp) {
        setError('Invalid OTP. Please try again.');
        toast.error('Invalid OTP. Please try again.', { position: 'top-right', autoClose: 3000 });
        setIsVerifying(false);
        return;
      }

      // Mark verified in Zustand
      setUser({ verified: true });

      toast.success('Email verified successfully!', { position: 'top-right', autoClose: 2000 });
      setIsVerifying(false);

      // Navigate to onboarding for multi-role support
      const rolePath = Array.isArray(user.role) ? user.role.join('-') : user.role;
      router.push(`/onboarding/${rolePath}`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.', { position: 'top-right', autoClose: 3000 });
      setIsVerifying(false);
    }
  };

  const savedOtp = typeof window !== 'undefined' ? localStorage.getItem('email_otp') || '123456' : '123456';

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Desktop Panel */}
        <BackgroundPanel
          backgroundImage="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900"
          containerClassName="hidden md:flex md:w-1/2 relative overflow-hidden"
          overlayClassName="absolute inset-0 bg-black/40"
          contentClassName="absolute inset-0 flex flex-col justify-center items-center text-center p-8"
        >
          <FadeIn>
            <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">Verify Your Email</h2>
            <p className="text-gray-200 text-lg drop-shadow-md max-w-xs mb-2">
              Enter the OTP sent to your email to continue.
            </p>
            <p className="text-gray-200 text-base drop-shadow-sm max-w-xs">
              If you haven’t received it, you can resend it on the next page.
            </p>
          </FadeIn>
        </BackgroundPanel>

        {/* Form Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
                <p className="text-gray-500">
                  Enter the 6-digit OTP sent to your email
                </p>
              </div>

              <div className="space-y-6">
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
                  className={`w-full bg-[#00853E] text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl ${
                    isVerifying ? 'opacity-50 cursor-not-allowed hover:bg-[#00853E]' : 'hover:bg-green-700'
                  }`}
                >
                  {isVerifying ? 'Verifying...' : 'Verify Email'}
                </button>

                <Link href='/signup/resend-otp' className="mt-6 text-center text-gray-500 text-sm inline-block">
                  Didn't receive the code? <span className="text-[#00853E] hover:underline cursor-pointer">Resend OTP</span>
                </Link>

                <p className="mt-2 text-center text-gray-400 text-xs">
                  For demo, your OTP is <b>{savedOtp}</b>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
