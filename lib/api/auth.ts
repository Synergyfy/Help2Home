import { Role } from '@/store/userStore';

export interface MockUserResponse {
  user: {
    id: string; 
    email: string;
    fullName: string;
    phone: string;
    roles: Role[];
    verified: boolean;
  };
  onboarding: {
    roleOnboardingCompleted: Record<Role, boolean>;
    draftData: any;
    onboardingCompleted: boolean;
  };
}

const MOCK_USERS: Record<string, MockUserResponse> = {

  'admin@example.com': {
    user: {
      id: 'user_admin01global',
      email: 'admin@example.com',
      fullName: 'System Administrator',
      phone: '+1 800 123 4567',
      roles: ['admin'], // Ensure 'admin' is added to your Role type in userStore
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: true, landlord: true, caretaker: true, agent: true, investor: true, admin: true, superAdmin: true },
      draftData: {},
      onboardingCompleted: true,
    }
  },
  'agent@example.com': {
    user: {
      id: 'user_clt01agent001',
      email: 'agent@example.com',
      fullName: 'Alice Agent',
      phone: '+1 234 567 8901',
      roles: ['agent'],
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: false, agent: true, investor: false, admin: false, superAdmin: false },
      draftData: { 
        agent: { licenseNumber: 'AG-9920', specialization: ['Residential'], yearsExperience: '5+' } 
      },
      onboardingCompleted: true,
    }
  },

  'landlord@example.com': {
    user: {
      id: 'user_clt02landlord002',
      email: 'landlord@example.com',
      fullName: 'Lawrence Landlord',
      phone: '+1 345 678 9012',
      roles: ['landlord'],
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: false, landlord: true, caretaker: false, agent: false, investor: false, admin: false, superAdmin: false },
      draftData: { 
        landlord: { propertyCount: '2-5 properties', propertyTypes: ['Apartments'], managementStyle: 'Self-managed' } 
      },
      onboardingCompleted: true,
    }
  },

  'investor@example.com': {
    user: {
      id: 'user_clt03investor003',
      email: 'investor@example.com',
      fullName: 'Ivan Investor',
      phone: '+1 456 789 0123',
      roles: ['investor'],
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: false, agent: false, investor: true, admin: false, superAdmin: false },
      draftData: { 
        investor: { investmentBudget: '$100k - $500k', investmentType: ['Buy-to-let'], riskTolerance: 'Moderate' } 
      },
      onboardingCompleted: true,
    }
  },

  'caretaker@example.com': {
    user: {
      id: 'user_clt04caretaker004',
      email: 'caretaker@example.com',
      fullName: 'Charlie Caretaker',
      phone: '+1 567 890 1234',
      roles: ['caretaker'],
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: true, agent: false, investor: false, admin: false, superAdmin: false },
      draftData: { 
        caretaker: { propertiesManaged: '10+', managementExperience: '8 years', availableHours: 'Full-time' } 
      },
      onboardingCompleted: true,
    }
  },

  'tenant@example.com': {
    user: {
      id: 'user_clt05tenant005',
      email: 'tenant@example.com',
      fullName: 'Tessa Tenant',
      phone: '+1 678 901 2345',
      roles: ['tenant'],
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: true, landlord: false, caretaker: false, agent: false, investor: false, admin: false, superAdmin: false },
      draftData: { 
        tenant: { preferredLocation: 'Downtown', budgetRange: '$1500 - $2500', moveInDate: '2026-02-01' } 
      },
      onboardingCompleted: true,
    }
  },

  'multi@example.com': {
    user: {
      id: 'user_clt06multi006',
      email: 'multi@example.com',
      fullName: 'Morgan Multi',
      phone: '+1 789 012 3456',
      roles: ['landlord', 'agent', 'caretaker'],
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: false, landlord: true, caretaker: false, agent: false, investor: true, admin: false, superAdmin: false },
      draftData: { 
        landlord: { propertyCount: '6-10 properties' },
        investor: { investmentBudget: '$1M+' }
      },
      onboardingCompleted: true,
    }
  },

  'developer@example.com': {
    user: {
      id: 'user_clt08developer008',
      email: 'developer@example.com',
      fullName: 'David Developer',
      phone: '+1 890 123 4567',
      roles: ['developer'],
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: false, agent: false, investor: false, admin: false, superAdmin: false, developer: true },
      draftData: { 
        developer: { 
            companyName: 'Zenith Developments', 
            registrationNumber: 'RC-123456', 
            yearsExperience: '10+',
            specialization: ['Residential', 'Commercial'],
            portfolio: [
                { id: 'p1', title: 'Lekki Gardens V', description: 'Luxury apartments in Lekki.', image: '/assets/portfolio/1.jpg', status: 'completed' },
                { id: 'p2', title: 'Banana Island Heights', description: 'Premium high-rise living.', image: '/assets/portfolio/2.jpg', status: 'in-progress' }
            ],
            investmentConditions: [
                { minAmount: 1000000, expectedReturn: '20-25%', timeline: '18 Months', riskLevel: 'medium' }
            ]
        } 
      },
      onboardingCompleted: true,
    }
  },

  'newuser@example.com': {
    user: {
      id: 'user_clt07newuser007',
      email: 'newuser@example.com',
      fullName: 'New User',
      phone: '',
      roles: ['landlord'],
      verified: true,
    },
    onboarding: {
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: false, agent: false, investor: false, admin: false, superAdmin: false },
      draftData: {},
      onboardingCompleted: false,
    }
  }
};

// src/lib/api/auth.ts
export const loginUser = async (email: string, password?: string): Promise<MockUserResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userData = MOCK_USERS[email] || MOCK_USERS['newuser@example.com'];

  return { 
    ...userData, 
    user: { 
      ...userData.user, 
      id: userData.user.id,
      email: email 
    } 
  };
};
