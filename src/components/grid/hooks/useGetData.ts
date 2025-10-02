import { useInfiniteQuery } from '@tanstack/react-query';
import { apiInstance } from '../../../services/apiServices/instance/apiInstance';

export interface ApiResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface UseInfiniteGridDataOptions {
  url: string;
  queryKey: string[];
  enabled?: boolean;
  per_page?: number;
}

export const useInfiniteGridData = <T>({
  url,
  queryKey,
  enabled = true,
  per_page = 10,
}: UseInfiniteGridDataOptions) => {
  // Check if user is authenticated
  const getAuthToken = () => {
    let token = localStorage.getItem("auth_token");
    if (!token) {
      token = sessionStorage.getItem("auth_token");
    }
    return token;
  };

  const isAuthenticated = !!getAuthToken();

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      try {
        const response = await apiInstance<ApiResponse<T>>({
          url,
          method: 'get',
          baseURL: 'https://reqres.in',
          params: {
            page: pageParam,
            per_page,
          },
          headers: {
            'x-api-key': 'reqres-free-v1',
          },
        });
        return response;
      } catch (error: any) {
        // If it's a 401 error, don't retry
        if (error.response?.status === 401) {
          throw new Error('Authentication failed');
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: enabled && isAuthenticated,
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error.response?.status === 401) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};