'use client';

import React from 'react';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';

interface Props {
    role: string;
}

const roleImages: Record<string, string> = {
    tenant: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1600&q=80',
    landlord: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900',
    agent: 'https://images.unsplash.com/photo-1560185127-6c7f8e2e5f2c?w=900',
    caretaker: 'https://images.unsplash.com/photo-1572120360610-d971b9b63938?w=900',
    investor: 'https://images.unsplash.com/photo-1600585154340-be6161c14d0c?w=900',
};

const roleHeadlines: Record<string, string> = {
    tenant: 'Find your dream home quickly and easily',
    landlord: 'Maximize your rental income effortlessly',
    agent: 'Manage properties efficiently and earn commissions',
    caretaker: 'Oversee property operations seamlessly',
    investor: 'Grow your real estate portfolio with high returns',
};

const testimonials: Record<string, string> = {
    tenant: '“Thanks to this platform, I found my perfect apartment in just a week!”',
    landlord: '“Managing my properties has never been easier, everything is at my fingertips.”',
    agent: '“I increased my commissions by 30% using this intuitive system.”',
    caretaker: '“Keeping track of multiple properties is now effortless.”',
    investor: '“I discovered high-yield investment opportunities I never knew existed.”',
};

export default function OnboardingPanel({ role }: Props) {
    return (
        <>
            {/* Image fills parent div */}
            <Image
                src={roleImages[role]}
                alt={`${role} onboarding`}
                fill
                style={{ objectFit: 'cover' }}
                className="absolute inset-0"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12">
                <FadeIn>
                    <h2 className="text-white text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg">
                        {role && role.charAt(0).toUpperCase() + role.slice(1)}
                    </h2>

                    <p className="text-gray-200 text-lg md:text-xl max-w-md italic mb-4 drop-shadow-md">
                        {testimonials[role]}
                    </p>

                    <p className="text-gray-200 text-xl md:text-2xl max-w-md drop-shadow-md">
                        {roleHeadlines[role]}
                    </p>
                </FadeIn>
            </div>
        </>
    );
}
