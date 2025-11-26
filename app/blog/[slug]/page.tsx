import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Help2Home Blog`,
        description: 'Read the latest from Help2Home.',
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;

    // Mock Data
    const post = {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        date: 'October 24, 2023',
        author: 'Chidinma O.',
        category: 'Renting Tips',
        readTime: '5 min read',
        imageUrl: '/assets/images/Frame 604.png',
        content: `
      <p class="lead text-xl text-gray-600 mb-8">
        Finding the perfect apartment in Lagos can be a daunting task, especially if it's your first time. 
        From navigating agent fees to understanding tenancy agreements, there's a lot to consider.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Determine Your Budget</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        Before you start looking, it's crucial to know exactly how much you can afford. 
        Remember to factor in additional costs like service charges, agency fees, and legal fees.
        With Help2Home, you can spread these costs over monthly payments, making it easier to manage your cash flow.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Choose the Right Location</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        Proximity to work, safety, and access to amenities should be top priorities. 
        Spend some time in the neighborhood at different times of the day to get a feel for the area.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Inspect Thoroughly</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        Don't just look at the aesthetics. Check for water pressure, signs of leakage, and the condition of electrical fittings.
        It's better to spot these issues before you sign the lease.
      </p>
      
      <div class="bg-brand-green/5 border-l-4 border-brand-green p-6 my-8 rounded-r-lg">
        <p class="font-medium text-brand-dark italic">
          "Help2Home made my move so much smoother. I didn't have to worry about the huge upfront payment, 
          which allowed me to furnish my new place exactly how I wanted."
        </p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Read the Agreement</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        Never sign a tenancy agreement without reading it thoroughly. If there are clauses you don't understand, ask for clarification.
      </p>
    `
    };

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <article className="container mx-auto px-6 md:px-12 max-w-4xl">
                <FadeIn>
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 text-sm text-brand-green font-bold mb-4 uppercase tracking-wider">
                            {post.category}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
                            <span className="font-medium text-gray-900">{post.author}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-16 shadow-lg">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg prose-green mx-auto max-w-3xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share / Tags */}
                    <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex gap-2">
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#Renting</span>
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#Lagos</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="text-gray-400 hover:text-brand-green transition-colors">
                                <span className="sr-only">Share on Twitter</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </button>
                            <button className="text-gray-400 hover:text-brand-green transition-colors">
                                <span className="sr-only">Share on Facebook</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </article>

            {/* CTA Section */}
            <section className="bg-gray-50 py-20 mt-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to find your new home?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Browse thousands of verified listings and pay your rent monthly with Help2Home.
                    </p>
                    <Link
                        href="/listings"
                        className="inline-block bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg"
                    >
                        Browse Listings
                    </Link>
                </div>
            </section>
        </main>
    );
}
