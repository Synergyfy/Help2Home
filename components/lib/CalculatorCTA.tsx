'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import { IoCheckmarkCircle, IoLeafOutline, IoStatsChartOutline, IoWalletOutline } from "react-icons/io5";
import { LuCircleDollarSign } from "react-icons/lu";

interface CalculatorCTAProps {
  title?: string;
  highlightText?: string; // The word you want in Green
  description?: string;
  placeholder: string;
  redirectPath: string;
  ctaText?: string;
  variant?: 'default' | 'minimal' | 'hero';
  imageSrc?: string;
  badgeValue?: string;
  badgeLabel?: string; // Custom text like "Savings" or "Monthly ROI"
  badgeType?: 'savings' | 'earnings' | 'yield'; // Changes the icon
  bgColor?: string; // Custom background for the card (e.g. bg-[#F9FEFA])
  imageBgColor?: string; // Custom background for the image frame (e.g. bg-[#FFEFE2])
}

export default function CalculatorCTA({
  title,
  highlightText,
  description,
  placeholder,
  redirectPath,
  ctaText = 'Calculate Now',
  variant = 'default',
  imageSrc = '/assets/illustration-default.png',
  badgeValue,
  badgeLabel = 'Savings',
  badgeType = 'savings',
  bgColor = 'bg-[#F9FEFA]',
  imageBgColor = 'bg-[#FFEFE2]',
}: CalculatorCTAProps) {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');

  const formatNumber = (value: string) => {
    if (!value) return '';
    const numericValue = value.replace(/,/g, '');
    if (isNaN(Number(numericValue))) return '';
    return Number(numericValue).toLocaleString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(rawValue)) {
      setAmount(rawValue);
    }
  };

  const handleRedirect = () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) return;
    router.push(`${redirectPath}?amount=${numericAmount}`);
  };

  // Icon selector for badge
  const getBadgeIcon = () => {
    switch (badgeType) {
      case 'earnings': return <IoWalletOutline size={24} />;
      case 'yield': return <IoStatsChartOutline size={24} />;
      default: return <IoLeafOutline size={24} />;
    }
  };

  // --- MINIMAL VARIANT ---
  if (variant === 'minimal') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="text"
          inputMode="numeric"
          value={formatNumber(amount)}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 rounded-lg border border-transparent text-gray-900 focus:ring-2 focus:ring-brand-green outline-none transition-all"
        />
        <button
          onClick={handleRedirect}
          className="bg-brand-green text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-md whitespace-nowrap"
        >
          {ctaText}
        </button>
      </div>
    );
  }

  // --- HERO VARIANT ---
  if (variant === 'hero') {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 ${bgColor} rounded-[2.5rem] p-8 md:p-16 border border-gray-100 shadow-sm`}>
            
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                {title} <span className="text-brand-green block">{highlightText}</span>
              </h1>
              <p className="text-gray-600 text-lg mb-10 max-w-md leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-0 items-center bg-white rounded-xl shadow-lg shadow-green-900/5 p-1 border border-gray-100 mb-8 focus-within:ring-2 focus-within:ring-brand-green/20 transition-all">
                <div className="flex items-center px-4 w-full text-gray-400">
                  <LuCircleDollarSign size={22} className="shrink-0" />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(amount)}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full py-4 px-3 outline-none text-gray-900 bg-transparent placeholder:text-gray-300 font-medium"
                  />
                </div>
                <button 
                  onClick={handleRedirect}
                  className="bg-brand-green text-white px-10 py-4 rounded-lg font-bold hover:bg-green-600 transition-all whitespace-nowrap w-full sm:w-auto"
                >
                  {ctaText}
                </button>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <IoCheckmarkCircle className="text-brand-green" size={20} />
                  No credit check
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <IoCheckmarkCircle className="text-brand-green" size={20} />
                  Instant results
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
              <div className={`${imageBgColor} rounded-2xl p-6 md:p-10 w-full max-w-[450px] aspect-square flex items-center justify-center`}>
                <div className="bg-white p-3 shadow-2xl rounded-sm border-[10px] border-white transform rotate-2 transition-transform hover:rotate-0">
                   <img src={imageSrc} alt="Illustration" className="w-full h-full object-cover rounded-sm" />
                </div>
              </div>

              {badgeValue && (
                <div className="absolute -bottom-4 left-4 md:left-10 bg-white shadow-2xl rounded-2xl p-4 flex items-center gap-4 border border-gray-50">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-green">
                    {getBadgeIcon()}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{badgeLabel}</p>
                    <p className="text-xl font-black text-gray-900">{badgeValue}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- DEFAULT VARIANT ---
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 text-lg md:text-xl">{description}</p>
          </div>
        </FadeIn>
        <div className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(amount)}
              onChange={handleChange}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green outline-none transition-all"
            />
            <button onClick={handleRedirect} className="bg-brand-green text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 shadow-md">
              {ctaText}
            </button>
        </div>
      </div>
    </section>
  );
}