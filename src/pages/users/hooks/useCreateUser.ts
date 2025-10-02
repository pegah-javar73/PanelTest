import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../services/user/userService';
import type { CreateUserData, UserResponse } from '../../../services/user/type';
import { toast } from 'react-hot-toast';

export type CreateUserResponse = UserResponse;

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserData): Promise<CreateUserResponse> => {
      return await userService.createUser(userData);
    },
    onSuccess: () => {
      toast.success('کاربر جدید با موفقیت ایجاد شد');
      
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error('Create user error:', error);
    },
  });
};
