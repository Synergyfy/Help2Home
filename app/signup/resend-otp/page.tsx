'use client';

import { useState, useEffect } from 'react';
import FadeIn from '@/components/FadeIn';

export default function ResendOtpPage() {
  const [timer, setTimer] = useState(60); // 60-second cooldown
  const [message, setMessage] = useState('OTP has been sent to your email');

  // Countdown timer for resending
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (timer > 0) return; // prevent spamming
    // Simulate sending OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('email_otp', newOtp);
    setMessage(`A new OTP has been sent!`);
    setTimer(60);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 px-4">
      <FadeIn>
        <div className="bg-white shadow-xl rounded-2xl p-10 sm:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Resend OTP</h1>
            <p className="mt-2 text-gray-500">{message}</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleResend}
              disabled={timer > 0}
              className={`w-full text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl
                ${timer > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00853E] hover:bg-green-700'}
              `}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
            </button>

            <p className="mt-6 text-center text-gray-500 text-sm">
              Enter your OTP on the <b className="text-gray-700">Verify Email</b> page to continue
            </p>

            <p className="mt-2 text-center text-gray-400 text-xs">
              For demo, your OTP is <b>{localStorage.getItem('email_otp') || '123456'}</b>
            </p>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}
