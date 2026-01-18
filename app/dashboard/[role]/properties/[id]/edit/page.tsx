'use client';

import React, { use } from 'react';
import PropertyWizard from '@/components/dashboard/shared/Wizard/PropertyWizard'
import { mockProperties } from '@/utils/properties';
import { STEP_CONFIG } from '@/config/propertyConfig';

interface PageProps {
    params: Promise<{ id: string; role: string }>;
}

export default function EditPropertyPage({ params }: PageProps) {
    const { id, role } = use(params);
    const propertyId = Number(id);
    const roleKey = role as 'landlord' | 'agent' | 'caretaker' | 'developer';

    // 2. Find the property in the mock database
    const property = mockProperties.find(p => p.id === propertyId);
    const dataToEdit = property || mockProperties[0];

    // 4. Transform to match PropertySchema expected by the Wizard
    const initialData = {
        ...dataToEdit,
        posterRole: dataToEdit.posterRole || ('landlord' as any),
        address: {
            street: dataToEdit.address || '',
            city: dataToEdit.city || '',
            state: dataToEdit.state || '',
        },
        description: {
            short: dataToEdit.description || '',
            long: dataToEdit.description || '',
        },
        price: {
            amount: dataToEdit.price || 0,
            currency: (dataToEdit.currency as any) || 'NGN',
            period: (dataToEdit as any).period || (dataToEdit.propertyType === 'rent' ? 'year' : undefined),
        },
        specs: {
            bedrooms: dataToEdit.bedrooms || 0,
            bathrooms: dataToEdit.bathrooms || 0,
            area: (dataToEdit as any).floorSize || 0,
        },
        images: (dataToEdit.images || []).map((url: string, index: number) => ({
            id: String(index),
            url: url,
            isPrimary: index === 0
        }))
    };

    return (
        <PropertyWizard
            roleKey={roleKey}
            availableStepsKeys={STEP_CONFIG[roleKey] || STEP_CONFIG.landlord}
            initialData={initialData as any}
            isEditing={true}
        />
    );
}

