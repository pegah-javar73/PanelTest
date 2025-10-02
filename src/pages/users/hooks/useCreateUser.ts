import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../services/user/userService';
import type { CreateUserData, UserResponse } from '../../../services/user/userService';

export type { CreateUserData } from '../../../services/user/userService';
export type CreateUserResponse = UserResponse;

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserData): Promise<CreateUserResponse> => {
      return await userService.createUser(userData);
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error('Create user error:', error);
    },
  });
};
