'use client';

import CalculatorCTA from '@/components/lib/CalculatorCTA';
import AffordabilityImg from '@/assets/undraw_best-place_dhzp.svg'

export default function PurpleBanner() {
  return (
    <div className="flex justify-center items-center bg-white">
      <CalculatorCTA
        variant="hero"
        title="Find Your Perfect Home Without"
        highlightText="Breaking the Bank"
        description="Discover apartments that fit your budget. Pay monthly, live comfortably, and make your dream home a reality."
        placeholder="Enter Monthly Rent (₦)"
        redirectPath="/check-rent-affordability"
        ctaText="Check Affordability"
        
        imageSrc={AffordabilityImg}
        badgeValue="Luxury Choice"
        badgeLabel="Status"
        badgeType="savings"
        
        bgColor="bg-[#F8F7FF]" 
        imageBgColor="bg-[#EBE9FE]"
      />
    </div>
  );
}
