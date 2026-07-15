import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface AdvisoryRequest {
  id: string;
  farmId: string;
  cropId: string;
  title: string;
  description: string;
  photoUrl?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'RESOLVED';
  responseNotes?: string;
  createdAt: string;
  farm?: { name: string };
  crop?: { name: string };
  farmer?: { fullName: string, location?: string };
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

export const usePendingAdvisories = () => {
  return useQuery<AdvisoryRequest[]>({
    queryKey: ['pending-advisories'],
    queryFn: async () => {
      const response = await apiClient.get('/advisory/pending');
      return response.data;
    },
  });
};

export const useRespondAdvisory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, responseNotes }: { id: string; responseNotes: string }) => {
      const response = await apiClient.patch(`/advisory/${id}/respond`, { responseNotes });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-advisories'] });
      queryClient.invalidateQueries({ queryKey: ['my-advisory-requests'] });
    },
  });
};

export const useUpdateAdvisoryRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AdvisoryRequest> }) => {
      const response = await apiClient.patch(`/advisory/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-advisory-requests'] });
    },
  });
};

export const useDeleteAdvisoryRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/advisory/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-advisory-requests'] });
    },
  });
};
