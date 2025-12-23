'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import BackgroundPanel from '@/components/lib/BackgroundPanel';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/userStore';

export default function ResendOtpPage() {
  const router = useRouter();
  const setUserOtp = useUserStore((state) => state.setOtp);
  const [timer, setTimer] = useState(60);
  const [message, setMessage] = useState('OTP has been sent to your email');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedOtp = localStorage.getItem('email_otp') || '';
    setOtp(storedOtp);
  }, []);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (timer > 0) return;

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    if (typeof window !== 'undefined') {
      localStorage.setItem('email_otp', newOtp);
    }

    setOtp(newOtp);
    setUserOtp(newOtp);
    setMessage(`A new OTP has been sent!`);
    toast.success('OTP resent successfully');
    setTimer(60);
  };

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
            <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">
              Verify Your Email
            </h2>
            <p className="text-gray-200 text-lg drop-shadow-md max-w-xs mb-2">
              Enter the OTP sent to your email to continue.
            </p>
            <p className="text-gray-200 text-base drop-shadow-sm max-w-xs">
              If you haven’t received it, you can resend it after the cooldown.
            </p>
          </FadeIn>
        </BackgroundPanel>

        {/* Form Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Resend OTP</h1>
                <p className="text-gray-500">{message}</p>
              </div>

              <div className="space-y-6">
                <button
                  onClick={handleResend}
                  disabled={timer > 0}
                  className={`w-full text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl
                    ${timer > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-green hover:bg-green-700'}
                  `}
                >
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                </button>

                <p className="mt-6 text-center text-gray-500 text-sm">
                  Enter your OTP on the{' '}
                  <Link href="/signup/verify" className="text-brand-green hover:underline">
                    Verify Email
                  </Link>{' '}
                  page to continue
                </p>

                {typeof window !== 'undefined' && (
                  <p className="mt-2 text-center text-gray-400 text-xs">
                    For demo, your OTP is <b>{otp || '123456'}</b>
                  </p>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
