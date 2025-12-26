'use client';

import CalculatorCTA from '@/components/lib/CalculatorCTA';

export default function PurpleBanner() {
    return (
        <section className="py-20 px-4 md:px-0">
            <div className="container mx-auto flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                    Find Your Perfect Home Without Breaking the Bank
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base font-medium">
                    Discover apartments that fit your budget. Pay monthly, live comfortably, and make your dream home a reality without financial stress.
                </p>
                <CalculatorCTA
                    title="Check Rent Affordability"
                    description="Estimate your rent affordability with ease."
                    placeholder="Enter Annual Rent (₦)"
                    redirectPath="/check-rent-affordability"
                />
            </div>
        </section>
    );
}
