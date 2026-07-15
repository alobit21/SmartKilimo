import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface Farm {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  sizeHectares: number;
  soilNotes?: string;
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
