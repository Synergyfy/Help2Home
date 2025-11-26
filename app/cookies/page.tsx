import React from 'react';
import { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
    title: 'Cookie Policy - Help2Home',
    description: 'Understand how Help2Home uses cookies to improve your experience.',
};

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <FadeIn>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Cookie Policy
                    </h1>
                    <p className="text-gray-500 mb-12">
                        Last Updated: October 24, 2023
                    </p>

                    <div className="prose prose-lg prose-green max-w-none">
                        <p>
                            This Cookie Policy explains how Help2Home ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                        </p>

                        <h3>1. What are cookies?</h3>
                        <p>
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                        </p>

                        <h3>2. Why do we use cookies?</h3>
                        <p>
                            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
                        </p>

                        <h3>3. Types of Cookies We Use</h3>
                        <ul>
                            <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</li>
                            <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</li>
                            <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</li>
                        </ul>

                        <h3>4. How can I control cookies?</h3>
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. In addition, most web browsers allow you to control cookies through their settings preferences.
                        </p>

                        <h3>5. Updates to this Policy</h3>
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>

                        <h3>6. Contact Us</h3>
                        <p>
                            If you have any questions about our use of cookies or other technologies, please email us at privacy@help2home.ng.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
