import { EducationContent, ContentCategory } from '@/components/dashboard/education/types';

// Mock Data
let mockContent: EducationContent[] = [
    {
        id: '1',
        title: '5 Tips for First-Time Renters',
        slug: '5-tips-first-time-renters',
        summary: 'Moving into your first apartment? Here are the essential things you need to know about leases, deposits, and tenant rights.',
        category: 'Beginner',
        readTime: 5,
        author: { name: 'Sarah Johnson', role: 'Housing Expert' },
        publishDate: 'Nov 15, 2025',
        format: 'article',
        thumbnailUrl: '', // Using placeholder
        isSaved: false,
        content: `
            <p>Moving into your first apartment is an exciting milestone, but it comes with a lot of responsibilities. Here are five essential tips to help you navigate the process smoothly.</p>
            <h3>1. Understand Your Lease</h3>
            <p>Before you sign anything, read the lease agreement carefully. Pay attention to clauses about rent increases, maintenance responsibilities, and termination policies.</p>
            <h3>2. Budget for More Than Just Rent</h3>
            <p>Remember to factor in utilities, internet, groceries, and transportation costs. A good rule of thumb is to keep your rent under 30% of your monthly income.</p>
            <h3>3. Inspect the Property</h3>
            <p>Do a thorough walkthrough before moving in. Take photos of any existing damage to ensure you get your security deposit back when you move out.</p>
            <h3>4. Get Renters Insurance</h3>
            <p>It's affordable and protects your belongings in case of theft, fire, or water damage. Your landlord's insurance typically covers the building, not your stuff.</p>
            <h3>5. Know Your Rights</h3>
            <p>Familiarize yourself with local tenant laws. You have rights regarding privacy, repairs, and eviction notices.</p>
        `,
        relatedContentIds: ['2', '3']
    },
    {
        id: '2',
        title: 'Understanding Your Credit Score',
        slug: 'understanding-credit-score',
        summary: 'What goes into your credit score and why does it matter for renting? We break down the factors that impact your rating.',
        category: 'Credit',
        readTime: 8,
        author: { name: 'Michael Chen', role: 'Financial Advisor' },
        publishDate: 'Nov 10, 2025',
        format: 'video',
        thumbnailUrl: '',
        isSaved: true,
        content: '<p>Video transcript placeholder...</p>',
        relatedContentIds: ['1']
    },
    {
        id: '3',
        title: 'How to Save for a Down Payment',
        slug: 'save-for-down-payment',
        summary: 'Practical strategies to help you reach your savings goals faster, from automated transfers to cutting unnecessary expenses.',
        category: 'Savings',
        readTime: 6,
        author: { name: 'Sarah Johnson', role: 'Housing Expert' },
        publishDate: 'Oct 28, 2025',
        format: 'article',
        thumbnailUrl: '',
        isSaved: false,
        content: '<p>Content placeholder...</p>',
        relatedContentIds: ['1']
    },
    {
        id: '4',
        title: 'Tenant Rights 101',
        slug: 'tenant-rights-101',
        summary: 'A comprehensive guide to your legal rights as a tenant in Nigeria. Know what your landlord can and cannot do.',
        category: 'Tenant Rights',
        readTime: 10,
        author: { name: 'Barr. Adeyemi', role: 'Legal Consultant' },
        publishDate: 'Oct 15, 2025',
        format: 'article',
        thumbnailUrl: '',
        isSaved: false,
        content: '<p>Content placeholder...</p>',
        relatedContentIds: ['1']
    },
    {
        id: '5',
        title: 'Budgeting for Rent: The 50/30/20 Rule',
        slug: 'budgeting-50-30-20',
        summary: 'Learn how to apply the famous 50/30/20 budgeting rule to manage your finances and ensure you always pay rent on time.',
        category: 'Budgeting',
        readTime: 4,
        author: { name: 'Michael Chen', role: 'Financial Advisor' },
        publishDate: 'Sep 30, 2025',
        format: 'article',
        thumbnailUrl: '',
        isSaved: false,
        content: '<p>Content placeholder...</p>',
        relatedContentIds: ['3']
    }
];

export const getContentList = async (category?: string, search?: string): Promise<EducationContent[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    let results = [...mockContent];

    if (category && category !== 'All') {
        results = results.filter(c => c.category === category);
    }

    if (search) {
        const query = search.toLowerCase();
        results = results.filter(c =>
            c.title.toLowerCase().includes(query) ||
            c.summary.toLowerCase().includes(query)
        );
    }

    return results;
};

export const getContentDetail = async (id: string): Promise<EducationContent | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockContent.find(c => c.id === id);
};

export const getFeaturedContent = async (): Promise<EducationContent[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockContent.slice(0, 3); // Return first 3 as featured
};

export const toggleSaveContent = async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockContent.findIndex(c => c.id === id);
    if (index !== -1) {
        mockContent[index].isSaved = !mockContent[index].isSaved;
        return mockContent[index].isSaved;
    }
    return false;
};
