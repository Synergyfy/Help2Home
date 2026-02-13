import { Suspense } from 'react';
import SearchResults from '@/components/marketplace/SearchResults';

export default function MarketplaceSearchPage() {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="p-20 text-center min-h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-brand-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading properties...</p>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}
