import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface Farm {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  sizeHectares: number;
  soilNotes?: string;
  status: string;
  growthProgress: number;
}

export const useFarms = () => {
  return useQuery<Farm[]>({
    queryKey: ['farms'],
    queryFn: async () => {
      const response = await apiClient.get('/farms');
      return response.data;
    },
  });
};

export const useFarmWeather = (farmId: string) => {
  return useQuery({
    queryKey: ['weather', farmId],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/weather/farm/${farmId}`);
        return response.data;
      } catch (err) {
        return null;
      }
    },
    enabled: !!farmId,
  });
};

export const useCreateFarm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newFarm: Partial<Farm>) => {
      const response = await apiClient.post('/farms', newFarm);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
    },
  });
};

export const useUpdateFarmStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, growthProgress }: { id: string, status: string, growthProgress: number }) => {
      const response = await apiClient.patch(`/farms/${id}/status`, { status, growthProgress });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
    },
  });
};
