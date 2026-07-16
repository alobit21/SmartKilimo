import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface Crop {
  id: string;
  name: string;
  faoCropCode?: string;
  temperatureRangeMin?: number;
  temperatureRangeMax?: number;
  rainfallRangeMin?: number;
  rainfallRangeMax?: number;
  marketRank?: number;
}

export const useCrops = () => {
  return useQuery<Crop[]>({
    queryKey: ['crops'],
    queryFn: async () => {
      const res = await apiClient.get('/crops');
      return res.data;
    },
  });
};
