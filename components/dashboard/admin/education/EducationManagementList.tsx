'use client';

import React from 'react';
import { 
    HiOutlineEye, 
    HiOutlinePencilSquare, 
    HiOutlineTrash,
    HiOutlineChartBar,
    HiOutlineUserGroup,
    HiOutlineClock,
    HiOutlineHandThumbUp
} from 'react-icons/hi2';
import { EducationContent } from '@/components/dashboard/education/types';

interface EducationManagementListProps {
    posts: EducationContent[];
    onEdit: (post: EducationContent) => void;
    onDelete: (id: string) => void;
}

export default function EducationManagementList({ posts, onEdit, onDelete }: EducationManagementListProps) {
    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="px-8 py-6">Content Detail</th>
                            <th className="px-8 py-6">Target Audience</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6">Analytics</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                                            <img src={post.thumbnailUrl} alt="" className="size-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-gray-900 truncate max-w-[240px] group-hover:text-brand-green transition-colors">{post.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold text-brand-green bg-green-50 px-2 py-0.5 rounded-md uppercase tracking-tight">
                                                    {post.category}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-semibold uppercase flex items-center gap-1">
                                                    <HiOutlineClock size={12} /> {post.readTime} min read
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                                        {post.targetAudience.map(audience => (
                                            <span key={audience} className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-full uppercase tracking-tighter">
                                                {audience}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        post.status === 'published' ? 'bg-green-500 text-white' :
                                        post.status === 'scheduled' ? 'bg-blue-500 text-white' :
                                        'bg-gray-200 text-gray-500'
                                    }`}>
                                        {post.status}
                                    </span>
                                    <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-tight">
                                        Published {new Date(post.publishDate).toLocaleDateString()}
                                    </p>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Views</p>
                                            <p className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
                                                <HiOutlineEye size={14} className="text-gray-400" /> {post.views?.toLocaleString() || 0}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Likes</p>
                                            <p className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
                                                <HiOutlineHandThumbUp size={14} className="text-gray-400" /> {post.likes?.toLocaleString() || 0}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => onEdit(post)}
                                            className="p-2 hover:bg-white hover:text-brand-green rounded-xl transition-all text-gray-400 border border-transparent hover:border-gray-100 hover:shadow-sm"
                                            title="Edit Post"
                                        >
                                            <HiOutlinePencilSquare size={20} />
                                        </button>
                                        <button 
                                            onClick={() => onDelete(post.id)}
                                            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all text-gray-400 border border-transparent hover:border-red-100"
                                            title="Delete Post"
                                        >
                                            <HiOutlineTrash size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {posts.length === 0 && (
                    <div className="p-20 text-center text-gray-400">
                        <div className="size-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
                            <HiOutlineUserGroup size={40} className="opacity-20" />
                        </div>
                        <p className="font-bold">No educational posts found.</p>
                        <p className="text-sm">Start by creating your first knowledge resource.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
