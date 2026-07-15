import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface AdvisoryRequest {
  id: string;
  farmId: string;
  cropId: string;
  title: string;
  description: string;
  photoUrl?: string;
  status: 'PENDING' | 'RESOLVED';
  responseNotes?: string;
  createdAt: string;
  farm?: { name: string };
  crop?: { name: string };
  assignedOfficer?: { name: string };
}

export const useMyAdvisoryRequests = () => {
  return useQuery<AdvisoryRequest[]>({
    queryKey: ['my-advisory-requests'],
    queryFn: async () => {
      const response = await apiClient.get('/advisory/my-requests');
      return response.data;
    },
  });
};

export const useCreateAdvisoryRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData: FormData) => {
      // We must send multipart/form-data for file uploads
      const response = await apiClient.post('/advisory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-advisory-requests'] });
    },
  });
};
