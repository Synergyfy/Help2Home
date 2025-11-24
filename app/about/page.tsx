import AboutHero from '@/components/AboutHero';
import MissionVision from '@/components/MissionVision';
import WhyChooseUs from '@/components/WhyChooseUs';
import TeamGrid from '@/components/TeamGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Help2Home',
    description: 'Learn more about Help2Home, our mission, vision, and the team dedicated to making renting and property management simple in Nigeria.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <AboutHero />
            <MissionVision />
            <WhyChooseUs />
            <TeamGrid />
        </main>
    );
}
