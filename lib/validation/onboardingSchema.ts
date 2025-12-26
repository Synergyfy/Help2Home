import { z } from 'zod';

/* Base Info */
export const baseSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(7, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  fullAddress: z.string().min(5, 'Address is required'),
  postalCode: z.string().optional(),
});

/* Full schema including all possible fields (optional) */
export const fullSchema = baseSchema.extend({
  gender: z.enum(['male', 'female']).optional(),
  employmentStatus: z.string().optional(),
  monthlyIncome: z.string().optional(),
  portfolioSize: z.number().optional(),
  responsibilities: z.string().optional(),
  investmentBudget: z.number().optional(),
});

/* Role-specific required schemas */
export const tenantSchema = fullSchema.extend({
  gender: z.enum(['male', 'female']),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  monthlyIncome: z.string().min(1, 'Monthly income is required'),
});

export const landlordSchema = fullSchema.extend({
  portfolioSize: z.number().min(1, 'Portfolio size is required'),
});

export const agentSchema = fullSchema.extend({
  responsibilities: z.string().min(3, 'Responsibilities are required'),
});

export const caretakerSchema = fullSchema.extend({
  responsibilities: z.string().min(3, 'Responsibilities are required'),
});

export const investorSchema = fullSchema.extend({
  investmentBudget: z.number().min(1, 'Investment budget is required'),
});

/* Helper */
export const getSchemaByRole = (role: string) => {
  switch (role) {
    case 'tenant':
      return tenantSchema;
    case 'landlord':
      return landlordSchema;
    case 'agent':
      return agentSchema;
    case 'caretaker':
      return caretakerSchema;
    case 'investor':
      return investorSchema;
    default:
      return baseSchema;
  }
};