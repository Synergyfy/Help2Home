'use client';

import React from 'react';
import PropertyWizard from '@/components/dashboard/shared/Wizard/PropertyWizard'
import { mockProperties } from '@/utils/properties';

export default function EditPropertyPage({ params }: { params: { id: string } }) {
    // 1. Convert string param to number to fix the comparison error
    const propertyId = Number(params.id);

    // 2. Find the property in the mock database
    const property = mockProperties.find(p => p.id === propertyId);

    // 3. Fallback logic: If property isn't found, you might want to handle it 
    // but for now we fallback to the first mock or the property itself
    const dataToEdit = property || mockProperties[0];

    // 4. Transform to initialData
    // We remove the nested 'description' and 'terms' objects because your 
    // Property interface is now flat.
    const initialData = {
        ...dataToEdit,
        // Ensure any fields the Wizard expects are present
        description: dataToEdit.description || '',
        availableFrom: dataToEdit.availableFrom || '',
    };

    return <PropertyWizard initialData={initialData} isEditing={true} />;
}