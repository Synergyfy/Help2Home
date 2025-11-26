import React from 'react';
import { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
    title: 'Terms & Conditions - Help2Home',
    description: 'Read our Terms and Conditions to understand your rights and obligations when using Help2Home.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <FadeIn>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Terms & Conditions
                    </h1>
                    <p className="text-gray-500 mb-12">
                        Last Updated: October 24, 2023
                    </p>

                    <div className="prose prose-lg prose-green max-w-none">
                        <p>
                            Welcome to Help2Home. These Terms and Conditions ("Terms") govern your use of our website, mobile application, and services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms.
                        </p>

                        <h3>1. Definitions</h3>
                        <p>
                            "Help2Home", "we", "us", or "our" refers to Help2Home Limited, a company registered in Nigeria.
                            "User", "you", or "your" refers to any individual or entity that accesses or uses our Platform.
                        </p>

                        <h3>2. Eligibility</h3>
                        <p>
                            You must be at least 18 years old and capable of forming a binding contract to use our Platform. By using our Platform, you represent and warrant that you meet these eligibility requirements.
                        </p>

                        <h3>3. Account Registration</h3>
                        <p>
                            To access certain features of our Platform, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                        </p>

                        <h3>4. User Conduct</h3>
                        <p>
                            You agree not to use the Platform for any unlawful purpose or in any way that interrupts, damages, impairs, or renders the Platform less efficient.
                        </p>

                        <h3>5. Intellectual Property</h3>
                        <p>
                            All content included on the Platform, such as text, graphics, logos, images, and software, is the property of Help2Home or its content suppliers and is protected by Nigerian and international copyright laws.
                        </p>

                        <h3>6. Limitation of Liability</h3>
                        <p>
                            To the fullest extent permitted by law, Help2Home shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                        </p>

                        <h3>7. Governing Law</h3>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
                        </p>

                        <h3>8. Changes to Terms</h3>
                        <p>
                            We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the new Terms on the Platform.
                        </p>

                        <h3>9. Contact Us</h3>
                        <p>
                            If you have any questions about these Terms, please contact us at legal@help2home.ng.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
