export interface Artisan {
    id: string;
    name: string;
    specialization: string;
    rating: number; // out of 5
    experience: string; // e.g., "5+ years"
    contactEmail: string;
    contactPhone: string;
    bio: string;
}

export const MOCK_ARTISANS: Artisan[] = [
    {
        id: 'ART-001',
        name: 'Blessing Okoro',
        specialization: 'Plumbing',
        rating: 4.8,
        experience: '10+ years',
        contactEmail: 'blessing.plumber@example.com',
        contactPhone: '08012345678',
        bio: 'Experienced plumber specializing in residential and commercial pipe repairs, installations, and leak detection.'
    },
    {
        id: 'ART-002',
        name: 'Emeka Nnamdi',
        specialization: 'Electrical',
        rating: 4.5,
        experience: '7 years',
        contactEmail: 'emeka.electric@example.com',
        contactPhone: '08023456789',
        bio: 'Certified electrician providing safe and reliable electrical services, from wiring to fixture installation.'
    },
    {
        id: 'ART-003',
        name: 'Fatima Musa',
        specialization: 'HVAC',
        rating: 4.7,
        experience: '6 years',
        contactEmail: 'fatima.hvac@example.com',
        contactPhone: '08034567890',
        bio: 'HVAC technician expert in AC repair, maintenance, and new system installations for all building types.'
    },
    {
        id: 'ART-004',
        name: 'Kunle Adebayo',
        specialization: 'Carpentry',
        rating: 4.6,
        experience: '12+ years',
        contactEmail: 'kunle.carpenter@example.com',
        contactPhone: '08045678901',
        bio: 'Skilled carpenter for custom furniture, cabinet repairs, and general wood work.'
    },
    {
        id: 'ART-005',
        name: 'Aisha Bello',
        specialization: 'Painting',
        rating: 4.9,
        experience: '8 years',
        contactEmail: 'aisha.painter@example.com',
        contactPhone: '08056789012',
        bio: 'Professional painter offering interior and exterior painting services with attention to detail.'
    }
];