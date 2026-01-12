export const PROPERTY_CATEGORIES = [
  {
    id: 'residential',
    label: 'Residential',
    description: 'Homes for living',
    types: ['Apartment', 'House', 'Duplex', 'Studio', 'Bungalow', 'Villa']
  },
  {
    id: 'commercial',
    label: 'Commercial',
    description: 'Business spaces',
    types: ['Office Space', 'Shop', 'Warehouse', 'Co-working', 'Showroom']
  },
  {
    id: 'land',
    label: 'Land',
    description: 'Undeveloped plots',
    types: ['Residential Land', 'Commercial Land', 'Mixed Use', 'Farmland']
  },
  {
    id: 'industrial',
    label: 'Industrial',
    description: 'Factories and plants',
    types: ['Factory', 'Industrial Complex']
  }
];

export const STEP_CONFIG: Record<string, string[]> = {
  landlord: ['basics', 'location', 'details', 'financials', 'media'],
  agent: ['basics', 'location', 'details', 'financials', 'media', 'client-info'],
  caretaker: ['basics', 'location', 'details', 'financials', 'media'],
};

export const ROLE_ACTIONS: Record<string, { submitLabel: string; successMessage: string }> = {
  landlord: {
    submitLabel: 'Publish Listing',
    successMessage: 'Your property has been published successfully!'
  },
  agent: {
    submitLabel: 'Publish Listing',
    successMessage: 'Listing published successfully!'
  },
  caretaker: {
    submitLabel: 'List Property',
    successMessage: 'Property listed successfully!'
  }
};
