'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiOutlinePlus, 
    HiOutlineMagnifyingGlass, 
    HiOutlineFunnel,
    HiOutlineBookOpen,
    HiOutlineChartBar,
    HiOutlineUsers,
    HiOutlineArrowPath
} from 'react-icons/hi2';
import { EducationContent } from '@/components/dashboard/education/types';
import EducationManagementList from '@/components/dashboard/admin/education/EducationManagementList';
import EducationPostForm from '@/components/dashboard/admin/education/EducationPostForm';
import { getContentList } from '@/utils/mockEducationApi';
import { toast } from 'react-toastify';

export default function AdminEducationHubPage() {
    const [posts, setPosts] = useState<EducationContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<EducationContent | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setIsLoading(true);
        try {
            // Using existing mock API - we'll cast it to include our new fields for now
            const data = await getContentList('All', '');
            
            // Enriching mock data with our new fields if they don't exist
            const enrichedData = data.map((p: any) => ({
                ...p,
                targetAudience: p.targetAudience || ['all'],
                status: p.status || 'published',
                views: p.views || Math.floor(Math.random() * 5000),
                likes: p.likes || Math.floor(Math.random() * 200)
            }));
            
            setPosts(enrichedData);
        } catch (error) {
            toast.error("Failed to fetch educational posts");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingPost(null);
        setIsFormOpen(true);
    };

    const handleEdit = (post: EducationContent) => {
        setEditingPost(post);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            setPosts(prev => prev.filter(p => p.id !== id));
            toast.success("Post deleted successfully");
        }
    };

    const handleSave = (formData: any) => {
        if (editingPost) {
            setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...formData } : p));
            toast.success("Post updated successfully");
        } else {
            const newPost: EducationContent = {
                ...formData,
                id: `ED-${Math.floor(Math.random() * 100000)}`,
                slug: formData.title.toLowerCase().replace(/ /g, '-'),
                publishDate: new Date().toISOString(),
                isSaved: false,
                author: {
                    name: 'Admin Team',
                    role: 'Platform Administrator',
                    avatarUrl: '/assets/H2H_Logo_One.png'
                },
                views: 0,
                likes: 0
            };
            setPosts(prev => [newPost, ...prev]);
            toast.success("New educational post published");
        }
    };

    const filteredPosts = posts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = [
        { label: 'Total Resources', value: posts.length, icon: HiOutlineBookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Reach', value: posts.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString(), icon: HiOutlineUsers, color: 'text-brand-green', bg: 'bg-green-50' },
        { label: 'Avg. Engagement', value: '4.2%', icon: HiOutlineChartBar, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Education Hub Management</h1>
                    <p className="text-gray-500 font-medium mt-1">Create and distribute knowledge resources across the platform.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={loadPosts}
                        className="p-3 bg-white border-2 border-gray-100 rounded-2xl text-gray-400 hover:text-brand-green transition-all active:scale-95"
                        title="Refresh List"
                    >
                        <HiOutlineArrowPath size={24} className={isLoading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                        onClick={handleCreate}
                        className="flex items-center gap-2 bg-brand-green text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-900/20 hover:bg-green-700 transition-all active:scale-95"
                    >
                        <HiOutlinePlus size={20} strokeWidth={3} />
                        New Post
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all duration-500">
                        <div className={`size-16 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon size={32} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-3xl font-black text-gray-900 leading-none">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text"
                        placeholder="Search posts by title or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:border-brand-green outline-none shadow-sm transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    {['All', 'Articles', 'Videos', 'Tips', 'Drafts'].map(filter => (
                        <button 
                            key={filter}
                            className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:border-brand-green hover:text-brand-green transition-all whitespace-nowrap"
                        >
                            {filter}
                        </button>
                    ))}
                    <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-all">
                        <HiOutlineFunnel size={20} />
                    </button>
                </div>
            </div>

            {/* List Section */}
            <EducationManagementList 
                posts={filteredPosts}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl overflow-hidden"
                        >
                            <EducationPostForm 
                                initialData={editingPost}
                                onClose={() => setIsFormOpen(false)}
                                onSave={handleSave}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
