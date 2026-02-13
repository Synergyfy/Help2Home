'use client';

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiRefreshCw, FiPhone } from "react-icons/fi";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useUserStore } from "@/store/userStore";

const DEMO_OTP = "123456";

const VerifyEmailStep = () => {
  const { getCurrentUser, nextStep } = useOnboardingStore();
  const { setEmailVerified, setPhoneVerified } = useUserStore();
  const user = getCurrentUser();
  const isEmail = !!user?.currentEmail;
  const contactInfo = isEmail ? user?.currentEmail : user?.currentPhone;

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      if (otpString === DEMO_OTP) {
        if (isEmail) {
          setEmailVerified(true);
        } else {
          setPhoneVerified?.(true);
        }
        nextStep();
      } else {
        setError("Invalid verification code. Use 123456 for demo.");
        setIsVerifying(false);
      }
    }, 1000);
  };

  return (
    <motion.div
      key="verify-email-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col max-w-lg"
    >
      <div className="mb-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-6">
          {isEmail ? <FiMail className="text-brand-green" size={28} /> : <FiPhone className="text-brand-green" size={28} />}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
          {isEmail ? "Verify your email" : "Verify your phone"}
        </h1>
        <p className="text-gray-600 text-lg">
          We've sent a 6-digit code to{" "}
          <span className="font-semibold text-brand-green">{contactInfo || 'your contact'}</span>
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Enter Security Code
            </label>
            <div className="flex gap-2 sm:gap-3 justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-full aspect-square max-w-[64px] text-center text-2xl font-bold rounded-xl border-2 transition-all outline-none ${
                    error 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-200 bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/10"
                  }`}
                />
              ))}
            </div>
            {error && (
              <p className="mt-4 text-sm font-medium text-red-500 text-center">{error}</p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-brand-green">Demo Mode:</span> Use code{" "}
              <span className="font-mono font-bold bg-white px-2 py-1 rounded border border-gray-200">123456</span>
            </p>
          </div>
        </div>

        <div className="mt-auto pt-10 space-y-4">
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full py-4 px-8 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
          >
            {isVerifying ? (
              <FiRefreshCw className="animate-spin" size={20} />
            ) : (
              <>
                Verify Identity
                <FiArrowRight size={20} />
              </>
            )}
          </button>

          <div className="text-center">
            <button
              onClick={() => resendCooldown === 0 && setResendCooldown(60)}
              disabled={resendCooldown > 0}
              className="text-gray-500 font-medium hover:text-brand-green transition-colors disabled:opacity-50"
            >
              {resendCooldown > 0 
                ? `Resend available in ${resendCooldown}s` 
                : "Didn't get a code? Resend now"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyEmailStep;
