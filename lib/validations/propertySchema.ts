import { z } from 'zod';

export const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  type: z.string().min(1, 'Property type is required'),
  listingType: z.enum(['Rent', 'Sale']),
  address: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
  }),
  price: z.object({
    amount: z.number().min(1, 'Price is required'),
    currency: z.enum(['NGN', 'USD']),
    period: z.enum(['year', 'month']).optional(),
  }),
  specs: z.object({
    bedrooms: z.number().min(0),
    bathrooms: z.number().min(0),
    area: z.number().optional(),
    areaUnit: z.enum(['sqm', 'sqft']).optional(),
    furnishing: z.string().optional(),
  }),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.object({
    id: z.string(),
    url: z.string(), // This will store the Base64 string
    isPrimary: z.boolean(),
    file: z.any().optional(), // Keep file object for potential future use (though we rely on url for persistence)
  })).min(1, 'At least one image is required'),
  installments: z.object({
    enabled: z.boolean(),
    depositPercent: z.number().optional(),
    tenures: z.array(z.number()).optional(),
  }).optional(),
  description: z.object({
    short: z.string().optional(),
    long: z.string().optional(),
  }).optional(),
  terms: z.object({
    availableFrom: z.string().optional(),
    minTenancy: z.string().optional(),
  }).optional(),
  status: z.enum(['available', 'sold', 'let-agreed', 'draft']).optional(),
});

export type PropertySchema = z.infer<typeof propertySchema>;
