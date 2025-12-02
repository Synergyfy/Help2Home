'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockProperties, Property } from '@/lib/mockLandlordData';
import PropertiesTable from '@/components/dashboard/landlord/properties/PropertiesTable';
import PropertyCard from '@/components/dashboard/landlord/properties/PropertyCard';
import FilterBar from '@/components/dashboard/landlord/properties/FilterBar';

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>(mockProperties);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Filter logic
    const filteredProperties = properties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.address.city.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || property.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Mock Actions
    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this property?')) {
            setProperties(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleDuplicate = (id: string) => {
        const propertyToClone = properties.find(p => p.id === id);
        if (propertyToClone) {
            const newProperty = {
                ...propertyToClone,
                id: `prop-${Date.now()}`,
                title: `${propertyToClone.title} (Copy)`,
                status: 'Draft' as const,
            };
            setProperties(prev => [newProperty, ...prev]);
        }
    };

    const handleToggleStatus = (id: string) => {
        setProperties(prev => prev.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    status: p.status === 'Published' ? 'Paused' : 'Published'
                };
            }
            return p;
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
                    <p className="text-gray-500">Manage your listings and view their performance.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/landlord/properties/bulk-upload"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Bulk Upload
                    </Link>
                    <Link
                        href="/dashboard/landlord/properties/add"
                        className="px-4 py-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Property
                    </Link>
                </div>
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
                    <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your filters or add a new property.</p>
                </div>
            ) : (
                <>
                    {viewMode === 'table' ? (
                        <PropertiesTable
                            properties={filteredProperties}
                            onDelete={handleDelete}
                            onDuplicate={handleDuplicate}
                            onToggleStatus={handleToggleStatus}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProperties.map(property => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    onDelete={handleDelete}
                                    onDuplicate={handleDuplicate}
                                    onToggleStatus={handleToggleStatus}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
