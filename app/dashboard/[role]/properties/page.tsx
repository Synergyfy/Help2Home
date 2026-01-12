'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import PropertiesTable from '@/components/dashboard/landlord/properties/PropertiesTable';
import PropertyCard from '@/components/dashboard/landlord/properties/PropertyCard';
import FilterBar from '@/components/dashboard/landlord/properties/FilterBar';
import { Property } from '@/utils/properties';
import { useLandlordProperties } from '@/hooks/useLandlordQueries';

export default function PropertiesPage() {
    const { activeRole } = useUserStore();
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Using existing hook for now - assumes backend handles role-based filtering based on auth token
    const { data: properties = [], isLoading } = useLandlordProperties();

    const filteredProperties = useMemo(() => {
        return properties
            .filter((property: Property) => {
                const matchesSearch =
                    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    property.city.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesStatus = statusFilter === 'All' || property.status === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a: Property, b: Property) => {
                const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
                const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
                return dateB - dateA;
            });
    }, [properties, searchQuery, statusFilter]);

    if (isLoading) {
        return <div className="p-10 text-center text-gray-500">Loading your properties...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
                    <p className="text-gray-500">Manage your {activeRole} listings and view their performance.</p>
                </div>
                <Link
                    href={`/dashboard/${activeRole}/properties/add`}
                    className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center gap-2 w-fit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Property
                </Link>
            </div>

            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            {filteredProperties.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                    <p className="text-gray-500 mt-2">Get started by creating your first listing.</p>
                </div>
            ) : (
                <>
                    {viewMode === 'table' ? (
                        <PropertiesTable
                            properties={filteredProperties}
                            onDelete={(id) => console.log('Delete:', id)}
                            onDuplicate={(id) => console.log('Duplicate:', id)}
                            onToggleStatus={(id) => console.log('Toggle:', id)}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProperties.map((property: Property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    onDelete={() => { }}
                                    onDuplicate={() => { }}
                                    onToggleStatus={() => { }}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
