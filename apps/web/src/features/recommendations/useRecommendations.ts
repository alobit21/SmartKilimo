import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import { Crop } from '../marketplace/useMarketplace';

export interface Recommendation {
  id: string;
  farmId: string;
  cropId: string;
  suitable: boolean;
  generatedAt: string;
  weatherSnapshotJson: any;
  crop: Crop;
}

export const useRecommendations = (farmId: string | undefined) => {
  return useQuery<Recommendation[]>({
    queryKey: ['recommendations', farmId],
    queryFn: async () => {
      if (!farmId) return [];
      const response = await apiClient.get(`/recommendations/farm/${farmId}`);
      return response.data;
    },
    enabled: !!farmId,
  });
};

export const useGenerateRecommendations = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (farmId: string) => {
      const response = await apiClient.post(`/recommendations/farm/${farmId}/generate`);
      return response.data;
    },
    onSuccess: (_, farmId) => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', farmId] });
    },
  });
};
