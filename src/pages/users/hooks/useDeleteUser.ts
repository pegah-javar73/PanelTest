import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../services/user/userService';
import { toast } from 'react-hot-toast';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number): Promise<void> => {
      return await userService.deleteUser(id);
    },
    onSuccess: () => {
      toast.success(` کاربر با موفقیت حذف شدند`);      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error('Delete user error:', error);
    },
  });
};

export const useBulkDeleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: (string | number)[]): Promise<void> => {
      return await userService.bulkDeleteUsers(ids);
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error('Bulk delete users error:', error);
    },
  });
};
