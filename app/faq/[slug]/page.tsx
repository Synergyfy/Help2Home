import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    // In a real app, fetch article data here
    return {
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Help Center`,
        description: 'Help2Home Support Article',
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;

    // Mock data - in production this would come from a CMS
    const article = {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        category: 'General',
        updatedAt: 'October 24, 2023',
        readTime: '3 min read',
        content: `
      <p class="mb-4">This is a placeholder for the article content. In a real application, this content would be fetched from a CMS like Contentful, Sanity, or Strapi.</p>
      <h3 class="text-xl font-bold mb-3 mt-6">Key Points</h3>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li>Verify your identity using a government-issued ID.</li>
        <li>Ensure your proof of address is recent (within the last 3 months).</li>
        <li>Contact support if you have issues with verification.</li>
      </ul>
      <p class="mb-4">If you need further assistance, please don't hesitate to reach out to our support team.</p>
    `
    };

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                <FadeIn>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/faq" className="hover:text-brand-green transition-colors">Help Center</Link>
                        <span>/</span>
                        <span className="text-gray-900">{article.category}</span>
                    </div>

                    {/* Article Header */}
                    <div className="mb-10 border-b border-gray-100 pb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Updated {article.updatedAt}
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {article.readTime}
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <div
                        className="prose prose-lg prose-green max-w-none mb-16"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Feedback */}
                    <div className="bg-gray-50 rounded-xl p-8 text-center mb-12">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Was this article helpful?</h3>
                        <div className="flex justify-center gap-4">
                            <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full hover:border-brand-green hover:text-brand-green transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                Yes
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-200 rounded-full hover:border-red-500 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l2.94 1.106b.09.03.175.06.26.093m0 0a2 2 0 002 2v6a2 2 0 00-2 2h-2.5M10 14v6a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
                                </svg>
                                No
                            </button>
                        </div>
                    </div>

                    {/* Related Articles */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2].map((i) => (
                                <Link
                                    href="#"
                                    key={i}
                                    className="block p-6 rounded-xl border border-gray-100 hover:border-brand-green/30 hover:shadow-md transition-all"
                                >
                                    <h4 className="font-medium text-gray-900 mb-2">Related Article Title {i}</h4>
                                    <p className="text-sm text-gray-500">Short description of the related article goes here.</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
