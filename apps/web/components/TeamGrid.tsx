'use client';

import React from 'react';
import Image from 'next/image';
import FadeIn from './FadeIn';

// Define the team members. 
// Note: "image: null" means we render a gray placeholder box instead of an image.
const team = [
    {
        name: "Adebisi Samuel",
        role: "Chief Finance Officer",
        image: null,
        bgColor: "bg-brand-green"
    },
    {
        name: "John Oseni",
        role: "Chief Technology Officer",
        image: null,
        bgColor: "bg-brand-green"
    },
    {
        name: "Luke Braimoh",
        role: "Chief Marketing Officer",
        image: null,
        bgColor: "bg-brand-purple"
    },
    {
        name: "Fluorish Usoro",
        role: "Operations Officer",
        image: null,
        bgColor: "bg-brand-purple"
    },
    {
        name: "Mercy Ogbenjuwa",
        role: "Product Manager",
        image: "/images/about/Rectangle 1372.png",
        bgColor: "bg-brand-green"
    },
    {
        name: "Samuel Oni",
        role: "Procurement Officer",
        image: null, // Based on image analysis, Samuel has no photo in the grid
        bgColor: "bg-brand-green"
    },
    {
        name: "Adebola Adekahunsi",
        role: "UI/UX Designer",
        image: "/images/about/Rectangle 1374.png",
        bgColor: "bg-brand-purple"
    },
    {
        name: "Victoria Adedayo",
        role: "Frontend Developer",
        image: "/images/about/Rectangle 1380.png",
        bgColor: "bg-brand-purple"
    },
    {
        name: "Qudus Oyebanji",
        role: "Frontend Developer",
        image: "/images/about/Rectangle 1380.png", // Placeholder
        bgColor: "bg-brand-purple"
    }
];

export default function TeamGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Team</h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {team.map((member, index) => {
                        // Determine row index (every 2 members is a row in 4-col grid)
                        // Row 0 (0,1): Image, Info | Image, Info
                        // Row 1 (2,3): Info, Image | Info, Image
                        // Row 2 (4,5): Image, Info | Image, Info
                        // Row 3 (6,7): Info, Image | Info, Image
                        // Row 4 (8):   Image, Info | Filler

                        const row = Math.floor(index / 2);
                        const isEvenRow = row % 2 === 0;

                        // If Even Row: Order is [Image, Info]
                        // If Odd Row:  Order is [Info, Image]

                        // We use flex order or just conditional rendering. 
                        // Since we are mapping members, each member generates TWO cells.
                        // Member 0 (Even Row): [Image Cell] [Info Cell]
                        // Member 2 (Odd Row):  [Info Cell] [Image Cell]

                        const imageCell = (
                            <div className="relative aspect-square bg-[#D9D9D9] w-full h-full">
                                {member.image && (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        );

                        const infoCell = (
                            <div className={`relative aspect-square flex flex-col justify-center items-center text-white p-6 text-center ${member.bgColor} w-full h-full`}>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-sm opacity-90 mb-2">{member.role}</p>
                                <div className="w-8 h-0.5 bg-white/50 mb-4"></div>
                                <a href="#" className="inline-block hover:scale-110 transition-transform">
                                    <Image
                                        src="/images/about/7156610_linkedin_social_media_icon 1.png"
                                        alt="LinkedIn"
                                        width={24}
                                        height={24}
                                        className="brightness-0 invert"
                                    />
                                </a>
                            </div>
                        );

                        return (
                            <React.Fragment key={index}>
                                {isEvenRow ? (
                                    <>
                                        {imageCell}
                                        {infoCell}
                                    </>
                                ) : (
                                    <>
                                        {infoCell}
                                        {imageCell}
                                    </>
                                )}
                            </React.Fragment>
                        );
                    })}

                    {/* Filler for the last row (Row 4) */}
                    {/* Qudus is index 8. He is in Row 4 (Even). So he renders [Image] [Info].
                        This takes up 2 columns. We need 2 more columns to fill the row.
                        The design shows a Green Block. */}
                    <div className="hidden lg:block col-span-2 bg-brand-green aspect-[2/1] w-full h-full"></div>
                </div>
            </div>
        </section>
    );
}
