// components/marketplace/FeaturedProperties.tsx
'use client';
import PropertyCard from '@/components/PropertyCard';

type FeaturedPropertiesProps = {
    properties: typeof import('@/utils/properties').mockProperties;
    label: string;
};

export default function FeaturedProperties({ properties, label }: FeaturedPropertiesProps) {
    if (!properties.length) return null;

    return (
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-brand-green font-bold tracking-wider uppercase text-sm">
                        Handpicked for you
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                        Featured {label}
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        id={property.id}
                        image={property.images[0]}
                        title={property.title}
                        location={property.location}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        description={property.description}
                        price={`₦${property.price.toLocaleString()}`}
                        monthlyPrice={
                            typeof property.monthlyPrice === 'number' && property.monthlyPrice > 0
                                ? `₦${property.monthlyPrice.toLocaleString()}`
                                : undefined
                        }

                        featured={property.featured}
                        verified={property.verified}
                        isNew={property.isNew}
                    />
                ))}
            </div>
        </div>
    );
}
