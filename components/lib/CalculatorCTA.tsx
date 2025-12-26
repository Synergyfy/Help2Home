'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';

interface CalculatorCTAProps {
  title: string;
  description: string;
  placeholder: string;
  redirectPath: string;
  ctaText?: string;
}

export default function CalculatorCTA({
  title,
  description,
  placeholder,
  redirectPath,
  ctaText = 'Calculate Now',
}: CalculatorCTAProps) {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');

  // Format number with commas
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

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl">
              {description}
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(amount)}
              onChange={handleChange}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
            />

            <button
              onClick={handleRedirect}
              className="bg-brand-green text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-md"
            >
              {ctaText}
            </button>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="text-center text-gray-500 text-sm mt-6">
            Quick estimates. No hidden fees. Plan your finances with confidence!
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
