'use client';

import PropertyWizard from '@/components/dashboard/shared/Wizard/PropertyWizard';

export default function AgentAddPropertyPage() {
  const agentSteps = [
    'basics',
    'location',
    'financials',
    'details',
    'media',
    'preview'
  ];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <PropertyWizard 
        roleKey="agent" 
        availableStepsKeys={agentSteps} 
      />
    </div>
  );
}
