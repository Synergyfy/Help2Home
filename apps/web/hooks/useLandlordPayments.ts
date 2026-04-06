import { useQuery } from '@tanstack/react-query';
import { landlordPaymentsApi } from '../lib/api/payments';

export const useLandlordPayments = () => {
    const paymentsQuery = useQuery({
        queryKey: ['landlord-payments'],
        queryFn: landlordPaymentsApi.getPayments,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const payoutsQuery = useQuery({
        queryKey: ['landlord-payouts'],
        queryFn: landlordPaymentsApi.getPayouts,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        payments: paymentsQuery.data || [],
        isLoadingPayments: paymentsQuery.isLoading,
        isErrorPayments: paymentsQuery.isError,

        payouts: payoutsQuery.data || [],
        isLoadingPayouts: payoutsQuery.isLoading,
        isErrorPayouts: payoutsQuery.isError,
    };
};
