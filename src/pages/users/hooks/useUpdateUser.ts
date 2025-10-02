import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../services/user/userService';
import type { UpdateUserData, UserResponse } from '../../../services/user/userService';

export type { UpdateUserData } from '../../../services/user/userService';
export type UpdateUserResponse = UserResponse;

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      userData 
    }: { 
      id: string | number; 
      userData: UpdateUserData 
    }): Promise<UpdateUserResponse> => {
      return await userService.updateUser(id, userData);
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error('Update user error:', error);
    },
  });
};
