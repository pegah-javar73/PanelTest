import { useQuery } from '@tanstack/react-query';
import { userService } from '../../../services/user/userService';
import type { UserResponse } from '../../../services/user/userService';

export type UserData = UserResponse;

export const useGetUser = (id: string | number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async (): Promise<UserData> => {
      const response = await userService.getUserById(id);
      return response.data;
    },
    enabled: !!id,
    retry: (failureCount, error: any) => {
      if (error.message?.includes('Authentication failed')) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
