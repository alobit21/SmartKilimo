import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface WeatherRecord {
  id: string;
  farmId: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
  fetchedAt: string;
}

export const useLatestWeather = (farmId?: string) => {
  return useQuery<WeatherRecord>({
    queryKey: ['weather', farmId],
    queryFn: async () => {
      const response = await apiClient.get(`/weather/farm/${farmId}`);
      return response.data;
    },
    enabled: !!farmId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFetchWeather = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (farmId: string) => {
      const response = await apiClient.post(`/weather/farm/${farmId}/fetch`);
      return response.data;
    },
    onSuccess: (_, farmId) => {
      queryClient.invalidateQueries({ queryKey: ['weather', farmId] });
    }
  });
};
