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
  crop: Crop;
  farmer: {
    id: string;
    name: string;
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
    mutationFn: async (data: CreateListingData) => {
      const response = await apiClient.post('/marketplace/listings', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
      queryClient.invalidateQueries({ queryKey: ['active-listings'] });
    }
  });
};
