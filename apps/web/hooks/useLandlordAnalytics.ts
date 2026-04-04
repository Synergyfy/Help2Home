import { useState, useEffect } from 'react';
import { fetchLandlordAnalytics, AnalyticsData } from '@/lib/api/analytics';

export function useLandlordAnalytics() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                setIsLoading(true);
                const result = await fetchLandlordAnalytics();
                setData(result);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadAnalytics();
    }, []);

    return { data, isLoading, error };
}
