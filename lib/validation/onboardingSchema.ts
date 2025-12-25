import { z } from 'zod';

export const baseSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().min(7, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  fullAddress: z.string().min(5, 'Address is required'),
  postalCode: z.string().optional(),
});

/* Role-specific extensions */
export const tenantSchema = baseSchema.extend({
  gender: z.enum(['male', 'female']),
  employmentStatus: z.string().min(1),
  monthlyIncome: z.string().min(1),
});

export const landlordSchema = baseSchema.extend({
  portfolioSize: z.coerce.number().min(1),
});

export const caretakerSchema = landlordSchema.extend({
  responsibilities: z.string().min(3),
});

export const investorSchema = baseSchema.extend({
  investorType: z.string().min(1),
  investmentBudget: z.coerce.number().min(1),
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
