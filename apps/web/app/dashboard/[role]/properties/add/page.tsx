import PropertyWizard from '@/components/dashboard/shared/Wizard/PropertyWizard';
import { STEP_CONFIG } from '@/config/propertyConfig';

type Role = 'landlord' | 'agent' | 'caretaker' | 'developer';

interface PageProps {
    params: Promise<{
        role: Role;
    }>;
}

export default async function AddPropertyPage({ params }: PageProps) {
    const { role: roleKey } = await params;
    const availableStepsKeys = STEP_CONFIG[roleKey] || STEP_CONFIG.landlord;

    return (
        <PropertyWizard
            roleKey={roleKey}
            availableStepsKeys={availableStepsKeys}
        />
    );
}
