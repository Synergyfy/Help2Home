import HowItWorksHero from '@/components/HowItWorksHero';
import ProcessInfographic from '@/components/ProcessInfographic';
import RoleFlowTabs from '@/components/RoleFlowTabs';
import HowItWorksFAQs from '@/components/HowItWorksFAQs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How It Works - Help2Home',
    description: 'Learn how Help2Home makes renting simple and affordable. Calculate your repayment plan and understand the process for tenants, landlords, and investors.',
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-white">
            <HowItWorksHero />
            <ProcessInfographic />
            <RoleFlowTabs />
            <HowItWorksFAQs />
        </main>
    );
}
