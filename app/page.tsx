import HeroSearch from "@/components/HeroSearch";
import RoleCards from "@/components/RoleCards";
import PurpleBanner from "@/components/PurpleBanner";
import FeaturedListings from "@/components/FeaturedListings";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import LocationsGrid from "@/components/LocationsGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CalculatorCTA from '@/components/lib/CalculatorCTA';

import TenantImg from '@/assets/undraw_house_searching.svg';
import LandlordImg from '@/assets/undraw_for-sale_7qjb.svg';
import InvestorImg from '@/assets/undraw_invest_t695.svg';

export default function Home() {
  return (
    <div className="min-h-screen font-(family-name:--font-geist-sans)">
      <main>
        <HeroSearch />
        <RoleCards />
        <PurpleBanner />
        <FeaturedListings />

        {/* Tenant Calculator Section */}
        <CalculatorCTA
          variant="hero"
          title="Take Control of Your"
          highlightText="Rent Today"
          description="Estimate your monthly payments in seconds and plan your budget confidently."
          placeholder="Enter Annual Rent (₦)"
          redirectPath="/tenant-rent-calculator"
          ctaText="Check Rent"
          imageSrc={TenantImg.src}
          badgeValue="Save 15%"
          badgeLabel="Savings"
          badgeType="savings"
          bgColor="bg-[#F9FEFA]"
        />

        <HowItWorks />
        <LocationsGrid />

        {/* Landlord Calculator Section */}
        <CalculatorCTA
          variant="hero"
          title="See What You Can Earn as a"
          highlightText="Landlord"
          description="Determine your property investment potential based on your budget and target ROI."
          placeholder="Enter Investment Budget (₦)"
          redirectPath="/landlord-earnings-calculator"
          ctaText="Calculate ROI"
          imageSrc={LandlordImg}
          badgeValue="+₦250k/mo"
          badgeLabel="Monthly ROI"
          badgeType="earnings"
          bgColor="bg-[#F4F7FF]"
          imageBgColor="bg-[#E0E7FF]"
        />

        <FeaturesGrid />
        <Testimonials />

        {/* Investor Calculator Section */}
        <CalculatorCTA
          variant="hero"
          title="Maximize Your Investment"
          highlightText="Potential"
          description="Quickly find out how much you can invest in properties and expected returns."
          placeholder="Enter Investment Amount (₦)"
          redirectPath="/investor-earning-calculator"
          ctaText="View Returns"
          imageSrc={InvestorImg}
          badgeValue="12.5% Yield"
          badgeLabel="Annual Yield"
          badgeType="yield"
          bgColor="bg-[#FFFBF5]"
          imageBgColor="bg-[#FFEFD2]"
        />

        <FAQ />
      </main>
    </div>
  );
}