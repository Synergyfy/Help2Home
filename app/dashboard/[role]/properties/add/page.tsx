import PropertyWizard from '@/components/dashboard/shared/wizard/PropertyWizard';

interface PageProps {
    params: {
        role: 'landlord' | 'agent' | 'caretaker' | 'developer';
    };
}

const ROLE_STEPS_MAP: Record<PageProps['params']['role'], string[]> = {
    landlord: [
        'basics',
        'location',
        'financials',
        'details',
        'media',
        'preview'
    ],
    agent: [
        'basics',
        'location',
        'financials',
        'details',
        'media',
        'preview'
    ],
    developer: [
        'basics',
        'location',
        'project-timeline',
        'investment-terms',
        'media',
        'preview'
    ],
    caretaker: [
        'basics',
        'location',
        'financials',
        'details',
        'media',
        'preview'
    ]
};

export default async function AddPropertyPage({ params }: PageProps) {
    const { role: roleKey } = await params;
    const availableStepsKeys = ROLE_STEPS_MAP[roleKey];

    return (
        <PropertyWizard
            roleKey={roleKey}
            availableStepsKeys={availableStepsKeys}
        />
    );
}
