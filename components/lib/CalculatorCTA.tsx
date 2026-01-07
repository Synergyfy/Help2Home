'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import { IoCheckmarkCircle, IoLeafOutline, IoStatsChartOutline, IoWalletOutline } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { StaticImageData } from 'next/image';

interface CalculatorCTAProps {
  title?: string;
  highlightText?: string; 
  description?: string;
  placeholder: string;
  redirectPath: string;
  ctaText?: string;
  variant?: 'default' | 'minimal' | 'hero';
  imageSrc?: string | StaticImageData;
  badgeValue?: string;
  badgeLabel?: string;
  badgeType?: 'savings' | 'earnings' | 'yield';
  bgColor?: string;
  imageBgColor?: string;
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

  const imgUrl = typeof imageSrc === 'object' && imageSrc !== null && 'src' in imageSrc 
    ? imageSrc.src 
    : (imageSrc as string);

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

  const getBadgeIcon = () => {
    switch (badgeType) {
      case 'earnings': return <IoWalletOutline size={24} />;
      case 'yield': return <IoStatsChartOutline size={24} />;
      default: return <IoLeafOutline size={24} />;
    }
  };

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

  if (variant === 'hero') {
    return (
      <section className="py-6 md:py-10 bg-white w-full">
        {/* Increased max-width to 7xl to reduce side margins on large screens */}
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 ${bgColor} rounded-4xl md:rounded-[3rem] p-6 md:p-12 lg:p-20 border border-gray-100 shadow-sm`}>
            
            <div className="w-full lg:w-3/5">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-[1.1]">
                {title} <span className="text-brand-green block mt-1">{highlightText}</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-12 max-w-xl leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-0 items-center bg-white rounded-xl shadow-xl shadow-green-900/5 p-1.5 border border-gray-100 mb-8 focus-within:ring-2 focus-within:ring-brand-green/20 transition-all max-w-2xl">
                <div className="flex items-center px-4 w-full text-gray-400">
                  <TbCurrencyNaira size={24} className="shrink-0" />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatNumber(amount)}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full py-4 px-3 outline-none text-gray-900 bg-transparent placeholder:text-gray-300 font-semibold text-lg"
                  />
                </div>
                <button 
                  onClick={handleRedirect}
                  className="bg-brand-green text-white px-10 py-4 lg:py-5 rounded-lg font-bold hover:bg-green-600 transition-all whitespace-nowrap w-full sm:w-auto text-lg shadow-lg shadow-brand-green/20"
                >
                  {ctaText}
                </button>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-center gap-2.5 text-sm md:text-base font-bold text-gray-700">
                  <IoCheckmarkCircle className="text-brand-green" size={22} />
                  No credit check
                </div>
                <div className="flex items-center gap-2.5 text-sm md:text-base font-bold text-gray-700">
                  <IoCheckmarkCircle className="text-brand-green" size={22} />
                  Instant results
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/5 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
              {/* Increased size of image container slightly */}
              <div className={`${imageBgColor} rounded-3xl p-8 md:p-12 w-full max-w-[500px] aspect-square flex items-center justify-center relative overflow-visible`}>
                <div className="bg-white p-3 shadow-2xl rounded-lg border-12 border-white transform rotate-3 transition-transform hover:rotate-0 duration-500">
                   <img src={imgUrl} alt="Illustration" className="w-full h-full object-contain" />
                </div>

                {badgeValue && (
                  <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white shadow-2xl rounded-2xl p-4 md:p-5 flex items-center gap-4 border border-gray-50 z-20 min-w-[180px]">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-full flex items-center justify-center text-brand-green shrink-0">
                      {getBadgeIcon()}
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">{badgeLabel}</p>
                      <p className="text-xl md:text-2xl font-black text-gray-900">{badgeValue}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
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
              className="flex-1 px-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green outline-none transition-all font-medium"
            />
            <button onClick={handleRedirect} className="bg-brand-green text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 shadow-md transition-all">
              {ctaText}
            </button>
        </div>
      </div>
    </section>
  );
}