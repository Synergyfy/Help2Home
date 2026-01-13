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
  landlord: ['basics', 'location', 'details', 'financials', 'media', 'preview'],
  agent: ['basics', 'location', 'details', 'financials', 'media', 'client-info', 'preview'],
  caretaker: ['basics', 'location', 'details', 'financials', 'media', 'preview'],
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
    submitLabel: 'Submit for Verification',
    successMessage: 'Property listed successfully!'
  }
};

export const PROPERTY_TYPES_BY_LISTING: Record<string, string[]> = {
  'Rent': [
    'Residential Property to Rent',
    'Corporate Property',
    'Student / Corpers Property',
    'Shared Spaces / Self-Contain',
    'Land / Plots to Rent'
  ],
  'Sale': [
    'Residential Property for Sale',
    'Commercial Property for Sale',
    'Corporate Property for Sale',
    'Land / Plots for Sale'
  ],
  'Service-Apartment': [
    'Service Apartments'
  ],
  'Rent-to-Own': [
    'Rent to Own'
  ]
};
