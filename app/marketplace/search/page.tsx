import { Suspense } from 'react';
import SearchResults from '@/components/marketplace/SearchResults';

export default function MarketplaceSearchPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="py-10 px-6  border-gray-600">
        <h1 className="text-4xl font-bold sr-only">Property Marketplace</h1>
      </header>

     
      <Suspense fallback={
        <div className="p-20 text-center">
          <div className="animate-spin h-10 w-10 border-4 border-brand-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading properties...</p>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}