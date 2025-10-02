import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '../../../services/apiServices/instance/apiInstance';
import { userService } from '../../../services/user/userService';

export interface PaginatedApiResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface UsePaginatedDataOptions {
  url: string;
  queryKey: string[];
  enabled?: boolean;
  per_page?: number;
  page: number;
}

export const usePaginatedData = <T>({
  url,
  queryKey,
  enabled = true,
  per_page = 6,
  page,
}: UsePaginatedDataOptions) => {
  // Check if user is authenticated
  const getAuthToken = () => {
    let token = localStorage.getItem("auth_token");
    if (!token) {
      token = sessionStorage.getItem("auth_token");
    }
    return token;
  };

  const isAuthenticated = !!getAuthToken();

  return useQuery({
    queryKey: [...queryKey, page],
    queryFn: async () => {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Set the token in the format expected by apiInstance
      localStorage.setItem('token', token);

      try {
        console.log('Making API call for page:', page);
        
        // Use userService for /api/users endpoint
        if (url === '/api/users') {
          const response = await userService.fetchUsers(page, per_page);
          console.log('UserService response for page', page, ':', response);
          return response as PaginatedApiResponse<T>;
        }
        
        // For other endpoints, use apiInstance
        const response = await apiInstance<PaginatedApiResponse<T>>({
          url,
          method: 'get',
          baseURL: 'https://reqres.in',
          params: {
            page,
            per_page,
          },
          headers: {
            'x-api-key': 'reqres-free-v1',
          },
        });
        console.log('API response for page', page, ':', response);
        return response;
      } catch (error: any) {
        console.error('API error for page', page, ':', error);
        // If it's a 401 error, don't retry
        if (error.response?.status === 401 || error.message?.includes('Authentication failed')) {
          throw new Error('Authentication failed');
        }
        throw error;
      }
    },
    enabled: enabled && isAuthenticated,
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error.response?.status === 401 || error.message?.includes('Authentication failed')) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
