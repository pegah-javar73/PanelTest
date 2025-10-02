import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../services/user/userService';
import type { UpdateUserData, UserResponse } from '../../../services/user/type';
import { toast } from 'react-hot-toast';

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
      toast.success('اطلاعات کاربر با موفقیت بروزرسانی شد');      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error('Update user error:', error);
    },
  });
};
