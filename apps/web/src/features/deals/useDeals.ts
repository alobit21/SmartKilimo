import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface Deal {
  id: string;
  listingId: string;
  buyerId: string;
  farmerId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  respondedAt?: string;
  listing?: {
    crop?: { name: string };
    quantity?: number;
    unit?: string;
    pricePerUnit?: number;
    currency?: string;
  };
  buyer?: { fullName: string };
  farmer?: { fullName: string };
}

export const useBuyerDeals = () => {
  return useQuery<Deal[]>({
    queryKey: ['my-deals'],
    queryFn: async () => {
      const response = await apiClient.get('/deals/my-deals');
      return response.data;
    },
  });
};

export const useFarmerDeals = () => {
  return useQuery<Deal[]>({
    queryKey: ['farmer-deals'],
    queryFn: async () => {
      const response = await apiClient.get('/deals/farmer-deals');
      return response.data;
    },
  });
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (listingId: string) => {
      const response = await apiClient.post('/deals', { listingId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-deals'] });
    },
  });
};

export const useRespondDeal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'ACCEPTED' | 'REJECTED' }) => {
      const response = await apiClient.patch(`/deals/${id}/respond`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmer-deals'] });
    },
  });
};

export const useCancelDeal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/deals/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-deals'] });
    },
  });
};
