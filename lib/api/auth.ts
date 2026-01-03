import { Role } from '@/store/userStore';

export interface MockUserResponse {
  user: {
    id: string; // Added ID
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
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: false, agent: true, investor: false },
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
      roleOnboardingCompleted: { tenant: false, landlord: true, caretaker: false, agent: false, investor: false },
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
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: false, agent: false, investor: true },
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
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: true, agent: false, investor: false },
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
      roleOnboardingCompleted: { tenant: true, landlord: false, caretaker: false, agent: false, investor: false },
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
      roleOnboardingCompleted: { tenant: false, landlord: true, caretaker: false, agent: false, investor: true },
      draftData: { 
        landlord: { propertyCount: '6-10 properties' },
        investor: { investmentBudget: '$1M+' }
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
      roleOnboardingCompleted: { tenant: false, landlord: false, caretaker: false, agent: false, investor: false },
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