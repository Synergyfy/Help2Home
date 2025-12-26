import { z } from 'zod';

/* Base Info */
export const baseSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(7, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
   city: z.string(),
  countryCode: z.string().optional(),
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
  investorType: z.string().optional(),
  investmentBudget: z.number().optional(),
});

/* Role-specific required schemas */
export const tenantSchema = fullSchema.extend({
  gender: z.enum(['male', 'female']),
  employmentStatus: z.string().min(1),
  monthlyIncome: z.string().min(1),
});

export const landlordSchema = fullSchema.extend({
  portfolioSize: z.number().min(1),
});

export const caretakerSchema = landlordSchema.extend({
  responsibilities: z.string().min(3),
});

export const investorSchema = fullSchema.extend({
  investorType: z.string().min(1),
  investmentBudget: z.number().min(1),
});

/* Helper */
export const getSchemaByRole = (role: string) => {
  switch (role) {
    case 'tenant':
      return tenantSchema;
    case 'landlord':
    case 'agent':
      return landlordSchema;
    case 'caretaker':
      return caretakerSchema;
    case 'investor':
      return investorSchema;
    default:
      return baseSchema;
  }
};
