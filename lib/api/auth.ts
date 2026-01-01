import { Role } from '@/store/userStore';

export interface MockUserResponse {
  user: {
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
  // 1. Agent - Fully Onboarded
  'agent@example.com': {
    user: {
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

  // 2. Landlord - Fully Onboarded
  'landlord@example.com': {
    user: {
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

  // 3. Investor - Fully Onboarded
  'investor@example.com': {
    user: {
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

  // 4. Caretaker - Fully Onboarded
  'caretaker@example.com': {
    user: {
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

  // 5. Tenant - Fully Onboarded
  'tenant@example.com': {
    user: {
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

  // 6. Multi-Role User (Landlord & Investor) - Both Onboarded
  'multi@example.com': {
    user: {
      email: 'multi@example.com',
      fullName: 'Morgan Multi',
      phone: '+1 789 012 3456',
      roles: ['landlord', 'investor'],
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

  // 7. New User - Needs Onboarding (Primary role: Landlord)
  'newuser@example.com': {
    user: {
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
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Optional: Simulate a password check (for demo purposes)
  // if (password === 'wrong-password') {
  //   throw new Error('Invalid credentials');
  // }

  // Get user from mock database or fallback to new user
  const userData = MOCK_USERS[email] || MOCK_USERS['newuser@example.com'];

  // Ensure the returned email matches the login input
  return { 
    ...userData, 
    user: { 
      ...userData.user, 
      email: email 
    } 
  };
};