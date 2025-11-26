import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    author: string;
    category: string;
    imageUrl: string;
    readTime: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all h-full"
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-green">
                    {post.category}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                </p>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative">
                        {/* Placeholder avatar */}
                        <div className="absolute inset-0 bg-brand-green/20 flex items-center justify-center text-[10px] font-bold text-brand-green">
                            {post.author.charAt(0)}
                        </div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">{post.author}</span>
                </div>
            </div>
        </Link>
    );
}
