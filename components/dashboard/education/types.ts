export type ContentFormat = 'article' | 'video' | 'tip';
export type ContentCategory = 'Beginner' | 'Credit' | 'Savings' | 'Rent Management' | 'Legal' | 'Tenant Rights' | 'Budgeting' | 'Financial Literacy';
export type TargetAudience = 'all' | 'tenant' | 'landlord' | 'agent' | 'caretaker' | 'developer' | 'investor';
export type ContentStatus = 'published' | 'draft' | 'scheduled';

export interface Author {
    name: string;
    role: string;
    avatarUrl?: string;
}

export interface EducationContent {
    id: string;
    title: string;
    slug: string;
    summary: string;
    category: ContentCategory;
    readTime: number; // in minutes
    author: Author;
    publishDate: string;
    format: ContentFormat;
    thumbnailUrl: string;
    isSaved: boolean;
    content?: string; // HTML/Markdown content for articles
    videoUrl?: string; // For videos
    relatedContentIds?: string[];
    targetAudience: TargetAudience[];
    status: ContentStatus;
    views?: number;
    likes?: number;
}
