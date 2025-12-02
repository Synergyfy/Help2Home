'use client';

import React from 'react';
import PropertyWizard from '@/components/dashboard/landlord/properties/wizard/PropertyWizard';
import { mockProperties } from '@/lib/mockLandlordData';

export default function EditPropertyPage({ params }: { params: { id: string } }) {
    // In a real app, fetch data based on params.id
    // For mock, we'll just grab the first one or a specific one if possible
    const property = mockProperties.find(p => p.id === params.id) || mockProperties[0];

    // Transform mock data to form data structure if needed
    const initialData = {
        ...property,
        // Ensure nested objects exist
        description: { short: 'Mock description', long: 'Long mock description' },
        terms: { availableFrom: '2024-06-01', minTenancy: '12' }
    };

    return <PropertyWizard initialData={initialData} isEditing={true} />;
}
