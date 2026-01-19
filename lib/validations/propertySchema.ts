import { z } from 'zod';

export const propertySchema = z.object({
  // Identity & Attribution
  posterRole: z.enum(['landlord', 'agent', 'caretaker', 'developer']),
  agencyName: z.string().optional(),
  agentLicense: z.string().optional(),
  
  // Basic Info
  title: z.string().min(5, 'Title is too short (min 5 chars)'),
  propertyCategory: z.enum(['Residential', 'Commercial', 'Land', 'Industrial'], {
    errorMap: () => ({ message: 'Please select a property category' })
  }),
  propertyType: z.string().min(1, 'Property type is required'), // Apartment, House, Shop, etc.
  listingType: z.enum(['Rent', 'Sale', 'Service-Apartment', 'Rent-to-Own'], {
    errorMap: () => ({ message: 'Please select a listing type' })
  }),
  
  // Location
  address: z.object({
    street: z.string().min(5, 'Street address is required (min 5 chars)'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
  }),
  
  // Pricing Dynamics (Conditional based on listingType)
  price: z.object({
    amount: z.coerce.number().min(1, 'Price is required'),
    currency: z.enum(['NGN', 'USD']),
    period: z.enum(['year', 'month', 'day', 'week']).optional(), // Added for Rent/Short-Let
    serviceCharge: z.coerce.number().optional(),
  }),
  
  // Service Apt / Short Let Specifics
  shortLetDetails: z.object({
    dailyRate: z.coerce.number().optional(),
    securityDeposit: z.coerce.number().optional(),
    cleaningFee: z.coerce.number().optional(),
    checkInTime: z.string().optional(),
    checkOutTime: z.string().optional(),
  }).optional(),

  // Sale/Market Specifics
  purchasePrice: z.coerce.number().optional(),
  optionFee: z.coerce.number().optional(),
  downPayment: z.coerce.number().optional(),
  isMortgageAvailable: z.boolean(),
  isNewBuild: z.boolean().default(false),
  isSharedOwnership: z.boolean().default(false),
  isRetirementHome: z.boolean().default(false),
  isAuction: z.boolean().default(false),
  isOffPlan: z.boolean().default(false),
  isVerified: z.boolean().default(false),

  // Specifications
  specs: z.object({
    bedrooms: z.coerce.number().min(0).optional(),
    bathrooms: z.coerce.number().min(0).optional(),
    area: z.coerce.number().optional(),
    areaUnit: z.enum(['sqm', 'sqft']),
    furnishing: z.string().optional(),
    floorNumber: z.coerce.number().optional(), // For Apartments/Commercial
    zoning: z.string().optional(), // For Land
    topography: z.string().optional(), // For Land
  }),

  // Media & Extras
  amenities: z.array(z.object({
    name: z.string(),
    price: z.coerce.number(),
  })),
  images: z.array(z.object({
    id: z.string(),
    url: z.string(),
    isPrimary: z.boolean(),
    file: z.any().optional(),
  })).min(1, 'At least one image is required'),
  
  video: z.object({
    id: z.string(),
    url: z.string(),
    file: z.any().optional(),
    thumbnail: z.string().optional(),
  }).optional(),

  floorPlan: z.object({
    id: z.string(),
    url: z.string(),
    file: z.any().optional(),
  }).optional(),

  installments: z.object({
    enabled: z.boolean(),
    depositType: z.enum(['fixed', 'percentage']),
    depositValue: z.coerce.number().min(0, 'Deposit value cannot be negative').optional(),
    tenures: z.array(z.coerce.number()).max(10, 'Repayment plans cannot exceed 10 months').optional(), // Repayment Strategy (months)
    interestRate: z.coerce.number().min(0, 'Interest rate cannot be negative'),
  }).optional(),

  availabilityDuration: z.coerce.number().optional(), // 6, 12, 24 months for rent

  description: z.object({
    short: z.string().optional(),
    long: z.string().optional(),
  }).optional(),

  terms: z.object({
    availableFrom: z.string().optional(),
    minTenancy: z.string().optional(),
  }).optional(),

  // Developer Specifics
  projectTimeline: z.object({
    startDate: z.string().optional(),
    completionDate: z.string().optional(),
    status: z.enum(['planning', 'in-progress', 'completed', 'halted']),
    milestones: z.array(z.object({
       title: z.string(),
       date: z.string(),
       completed: z.boolean()
    })).optional()
  }).optional(),

  investmentTerms: z.object({
    enabled: z.boolean(),
    minInvestment: z.coerce.number().min(0).optional(),
    maxInvestment: z.coerce.number().min(0).optional(),
    roi: z.coerce.number().min(0).optional(), // percentage
    roiFrequency: z.enum(['monthly', 'quarterly', 'annually', 'end-of-term']),
    duration: z.coerce.number().min(0).optional(), // months
    repaymentSchedule: z.string().optional() // Description or Enum
  }).optional(),

  // Landlord Details (Required for Caretakers)
  landlord: z.object({
    fullName: z.string().optional(),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional(),
  }).optional(),

  // Caretaker Details (Option for Landlords/Agents)
  caretaker: z.object({
    fullName: z.string().optional(),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional(),
  }).optional(),

  communityLink: z.string().url('Invalid URL format').optional().or(z.literal('')),
  status: z.enum(['available', 'sold', 'let-agreed', 'draft']),
}).superRefine((data, ctx) => {
  // Caretaker: Landlord details are required
  if (data.posterRole === 'caretaker') {
    if (!data.landlord?.fullName || data.landlord.fullName.trim().length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Landlord's full name is required for caretaker listings",
        path: ["landlord", "fullName"]
      });
    }
    if (!data.landlord?.email || data.landlord.email.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Landlord's email is required for automatically signing them in",
        path: ["landlord", "email"]
      });
    }
  }

  // Rent: Period is required
  if (data.listingType === 'Rent') {
    if (!data.price.period) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Payment period is required for rentals",
        path: ["price", "period"]
      });
    }
  }

  // Short-Let: Period might be relevant or handled via shortLetDetails
  // If we decided price.amount is daily rate, maybe period isn't needed or defaults to 'day'
  
  // Sale: Period forbidden (conceptually), but optional so maybe just ignore.
});

export type PropertySchema = z.infer<typeof propertySchema>;
