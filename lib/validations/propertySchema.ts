import { z } from 'zod';

export const propertySchema = z.object({
  // Identity & Attribution
  posterRole: z.enum(['landlord', 'agent', 'caretaker']),
  agencyName: z.string().optional(),
  agentLicense: z.string().optional(),
  
  // Basic Info
  title: z.string().min(5, 'Title must be at least 5 characters'),
  propertyCategory: z.enum(['Residential', 'Commercial', 'Land', 'Industrial']),
  propertyType: z.string().min(1, 'Property type is required'), // Apartment, House, Shop, etc.
  listingType: z.enum(['Rent', 'Sale', 'Short-Let']),
  
  // Location
  address: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
  }),
  
  // Pricing Dynamics (Conditional based on listingType)
  price: z.object({
    amount: z.coerce.number().min(1, 'Price is required'),
    currency: z.enum(['NGN', 'USD']).default('NGN'),
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

  // Sale Specifics
  purchasePrice: z.coerce.number().optional(),
  optionFee: z.coerce.number().optional(),
  downPayment: z.coerce.number().optional(),
  isMortgageAvailable: z.boolean().default(false),

  // Specifications
  specs: z.object({
    bedrooms: z.coerce.number().min(0).optional(),
    bathrooms: z.coerce.number().min(0).optional(),
    area: z.coerce.number().optional(),
    areaUnit: z.enum(['sqm', 'sqft']).default('sqm'),
    furnishing: z.string().optional(),
    floorNumber: z.coerce.number().optional(), // For Apartments/Commercial
    zoning: z.string().optional(), // For Land
    topography: z.string().optional(), // For Land
  }),

  // Media & Extras
  amenities: z.array(z.string()).default([]),
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

  installments: z.object({
    enabled: z.boolean().default(false),
    depositPercent: z.coerce.number().optional(),
    tenures: z.array(z.coerce.number()).optional(),
  }).optional(),

  description: z.object({
    short: z.string().optional(),
    long: z.string().optional(),
  }).optional(),

  terms: z.object({
    availableFrom: z.string().optional(),
    minTenancy: z.string().optional(),
  }).optional(),

  status: z.enum(['available', 'sold', 'let-agreed', 'draft']).default('draft'),
}).superRefine((data, ctx) => {
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