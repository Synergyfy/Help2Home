import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import RoleCards from "@/components/RoleCards";
import PurpleBanner from "@/components/PurpleBanner";
import FeaturedListings from "@/components/FeaturedListings";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import LocationsGrid from "@/components/LocationsGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main>
        <HeroSearch />
        <RoleCards />
        <PurpleBanner />
        <FeaturedListings />
        <HowItWorks />
        <LocationsGrid />
        <FeaturesGrid />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
