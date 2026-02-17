'use client';

import Image from 'next/image';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
    showText?: boolean;
    textClassName?: string;
}

export default function Logo({ 
    className, 
    width = 40, 
    height = 40, 
    showText = true,
    textClassName = "text-xl font-bold text-brand-green"
}: LogoProps) {
    return (
        <div className={`flex items-center gap-2.5 ${className || ''}`}>
            <Image
                src="/H2H_Logo_One.png"
                alt="Help2Home Logo"
                width={width}
                height={height}
                className="object-contain shrink-0"
                priority
            />
            {showText && (
                <span className={`tracking-tight ${textClassName}`}>Help2Home</span>
            )}
        </div>
    );
}
