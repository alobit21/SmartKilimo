import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

export interface AdminStats {
  totalUsers: number;
  totalListings: number;
  totalDeals: number;
  totalAdvisoryRequests: number;
  pendingAdvisories: number;
  pendingDeals: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
}

export const useAdminStats = () => {
  return useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await apiClient.get('/admin/stats');
      return response.data;
    },
  });
};

export const useAdminRecentUsers = () => {
  return useQuery<AdminUser[]>({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const response = await apiClient.get('/admin/users');
      return response.data;
    },
  });
};
