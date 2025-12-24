import HeroSearch from "@/components/HeroSearch";
import RoleCards from "@/components/RoleCards";
import PurpleBanner from "@/components/PurpleBanner";
import FeaturedListings from "@/components/FeaturedListings";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import LocationsGrid from "@/components/LocationsGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CalculatorCTA from '@/components/lib/CalculatorCTA'

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        <HeroSearch />
        <RoleCards />
        <PurpleBanner />
        <FeaturedListings />
        <CalculatorCTA
          title="Take Control of Your Rent Today"
          description="Estimate your monthly payments in seconds and plan your budget confidently."
          placeholder="Enter Annual Rent (₦)"
          redirectPath="/tenant-rent-calculator"
        />
        <HowItWorks />
        <LocationsGrid />
        <CalculatorCTA
          title="See What You Can Earn as a Landlord"
          description="Determine your property investment potential based on your budget and target ROI."
          placeholder="Enter Investment Budget (₦)"
          redirectPath="/landlord-earning-calculator"
        />
        <FeaturesGrid />
        <Testimonials />
        <CalculatorCTA
          title="Maximize Your Investment Potential"
          description="Quickly find out how much you can invest in properties and expected returns."
          placeholder="Enter Investment Amount (₦)"
          redirectPath="/investor-earning-calculator"
        />
        <FAQ />
      </main>
    </div>
  );
}
