'use client'

import { useEffect,useState } from "react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCheck,FiArrowLeft,FiMail,FiRefreshCw } from "react-icons/fi";

const ResendEmail = () => {
  const router = useRouter();
  const { getCurrentUser, currentEmail } = useOnboardingStore();
  const user = getCurrentUser();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!currentEmail) {
      router.push("/signin");
    }
  }, [currentEmail, router]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0) return;
    
    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setCooldown(60);
      
      // Reset sent state after a few seconds
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <OnboardingLayout currentStep={1} totalSteps={8}>
      <motion.div
        key="resend-email"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col"
      >
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <FiArrowLeft size={18} />
          <span className="text-sm font-medium">Back to verification</span>
        </button>

        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <FiMail className="text-primary" size={28} />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Resend verification email
          </h1>
          <p className="text-muted-foreground">
            We'll send a new verification code to{" "}
            <span className="font-medium text-foreground">{user?.email}</span>
          </p>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-secondary border border-border">
              <h3 className="font-medium text-foreground mb-2">
                Didn't receive the email?
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure your email address is correct</li>
                <li>• Wait a few minutes and try again</li>
              </ul>
            </div>

            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-primary/10 border border-primary/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <FiCheck className="text-primary-foreground" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email sent!</p>
                    <p className="text-sm text-muted-foreground">
                      Check your inbox for the new code
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-accent/50 border border-accent"
            >
              <p className="text-sm text-accent-foreground">
                <span className="font-medium">Demo Mode:</span> Use code{" "}
                <span className="font-mono font-bold">123456</span> to verify your email
              </p>
            </motion.div>
          </div>

          <div className="mt-auto pt-8 space-y-4">
            <button
              onClick={handleResend}
              disabled={isSending || cooldown > 0}
              className="w-full py-3 px-6 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <FiRefreshCw className="animate-spin" size={18} />
                  Sending...
                </>
              ) : cooldown > 0 ? (
                `Resend in ${cooldown}s`
              ) : (
                <>
                  <FiMail size={18} />
                  Resend verification email
                </>
              )}
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full py-3 px-6 border border-border text-muted-foreground font-medium rounded-xl hover:bg-secondary transition-colors"
            >
              I already have a code
            </button>
          </div>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
};

export default ResendEmail;
