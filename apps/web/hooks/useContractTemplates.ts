import { useState, useEffect } from 'react';
import { landlordContractsApi } from '@/lib/api/contracts';
import { ContractTemplate } from '@/lib/api/contracts';

export function useContractTemplates() {
    const [templates, setTemplates] = useState<ContractTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setIsLoading(true);
                const data = await landlordContractsApi.getTemplates();
                setTemplates(data);
            } catch (err: any) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    return { templates, isLoading, error };
}
