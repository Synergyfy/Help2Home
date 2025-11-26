import React from 'react';
import { Metadata } from 'next';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
    title: 'Privacy Policy - Help2Home',
    description: 'Learn how Help2Home collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <FadeIn>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-500 mb-12">
                        Last Updated: October 24, 2023
                    </p>

                    <div className="prose prose-lg prose-green max-w-none">
                        <p>
                            At Help2Home, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We may collect personal information that you voluntarily provide to us when you register on the Platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the Platform, or otherwise when you contact us.
                        </p>
                        <ul>
                            <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact details.</li>
                            <li><strong>Financial Data:</strong> Payment information, bank account details (processed securely by our payment partners).</li>
                            <li><strong>Identity Data:</strong> Government-issued ID, proof of address (for verification purposes).</li>
                        </ul>

                        <h3>2. How We Use Your Information</h3>
                        <p>
                            We use personal information collected via our Platform for a variety of business purposes described below:
                        </p>
                        <ul>
                            <li>To facilitate account creation and logon process.</li>
                            <li>To send you administrative information.</li>
                            <li>To fulfill and manage your orders and payments.</li>
                            <li>To verify your identity and prevent fraud.</li>
                            <li>To improve our services and user experience.</li>
                        </ul>

                        <h3>3. Sharing Your Information</h3>
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with:
                        </p>
                        <ul>
                            <li><strong>Service Providers:</strong> We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf.</li>
                            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                        </ul>

                        <h3>4. Data Security</h3>
                        <p>
                            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                        </p>

                        <h3>5. Your Privacy Rights</h3>
                        <p>
                            Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us.
                        </p>

                        <h3>6. Contact Us</h3>
                        <p>
                            If you have questions or comments about this policy, you may email us at privacy@help2home.ng.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
