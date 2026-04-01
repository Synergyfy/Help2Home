'use client'

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import testimonialImage from "@/assets/alexander-andrews-A3DPhhAL6Zg-unsplash(1).jpg";
import Logo from "@/components/shared/Logo";

const testimonials = [
  {
    quote: "Help2Home made finding my perfect apartment incredibly easy. The whole process was smooth and I moved in within weeks!",
    author: "Sarah Johnson",
    role: "Tenant, Lagos",
  },
  {
    quote: "As a landlord, I've been able to manage my properties efficiently and find reliable tenants quickly. Highly recommended!",
    author: "Michael Adeyemi",
    role: "Property Owner, Abuja",
  },
  {
    quote: "The platform connects me with serious investors. My portfolio has grown significantly since joining Help2Home.",
    author: "Grace Okonkwo",
    role: "Real Estate Agent, Port Harcourt",
  },
];

const GeometricPattern = () => (
  <div className="absolute top-6 left-6 grid grid-cols-4 gap-2 opacity-60">
    {[...Array(16)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.03, duration: 0.3 }}
        className={`w-6 h-6 rounded-md ${[0, 1, 4, 5, 8, 12].includes(i)
          ? "bg-card/40"
          : "bg-transparent"
          }`}
      />
    ))}
  </div>
);

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const OnboardingLayout = ({ children, currentStep, totalSteps }: OnboardingLayoutProps) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl bg-card rounded-2xl shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left Panel - Testimonial */}
        <div className="relative hidden lg:flex flex-col h-full overflow-hidden bg-foreground">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={testimonialImage}
              alt="Professional working"
              fill
              className="object-cover opacity-60"
              priority
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-8"></div>

          <GeometricPattern />

          {/* Logo Badge */}
          <div className="relative z-10 p-8 flex justify-end">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
              <Logo 
                width={24} 
                height={24} 
                className="brightness-0 invert opacity-80" 
                textClassName="text-sm font-semibold text-white"
              />
            </div>
          </div>

          {/* Content pushed to bottom */}
          <div className="relative z-10 mt-auto p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-white text-2xl font-medium leading-relaxed mb-6 italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div>
                  <p className="text-white font-semibold text-lg">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-white/60 text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-8">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 transition-all"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 transition-all"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="p-6 md:p-10 flex flex-col min-h-[600px]">
          {/* Logo & Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8"
          >
                                          <div className="flex items-center gap-2">
                                            <Logo width={40} height={40} textClassName="font-semibold text-foreground" />
                                          </div>            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${i <= currentStep ? "bg-primary" : "bg-muted"
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Dynamic Content */}
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingLayout;
