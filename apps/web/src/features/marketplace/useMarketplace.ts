import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface Crop {
  id: string;
  name: string;
  faoCropCode: string;
}

export interface Listing {
  id: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  currency: string;
  status: string;
  photoUrl?: string;
  crop: Crop;
  farmer: {
    id: string;
    name?: string;
    fullName?: string;
    farmerProfile?: {
      region: string;
    };
  };
}

export const useMyListings = () => {
  return useQuery<Listing[]>({
    queryKey: ['my-listings'],
    queryFn: async () => {
      const response = await apiClient.get('/marketplace/my-listings');
      return response.data;
    },
  });
};

export const useActiveListings = () => {
  return useQuery<Listing[]>({
    queryKey: ['active-listings'],
    queryFn: async () => {
      const response = await apiClient.get('/marketplace/listings');
      return response.data;
    },
  });
};

export const useMarketPrices = () => {
  return useQuery({
    queryKey: ['market-prices'],
    queryFn: async () => {
      const response = await apiClient.get('/marketplace/prices/summary');
      return response.data;
    },
  });
};

export interface CreateListingData {
  cropId: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  currency: string;
}

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/marketplace/listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      queryClient.invalidateQueries({ queryKey: ['active-listings'] });
    }
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const isFormData = data instanceof FormData;
      const response = await apiClient.put(`/marketplace/listings/${id}`, data, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      queryClient.invalidateQueries({ queryKey: ['active-listings'] });
    }
  });
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/marketplace/listings/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      queryClient.invalidateQueries({ queryKey: ['active-listings'] });
    }
  });
};
