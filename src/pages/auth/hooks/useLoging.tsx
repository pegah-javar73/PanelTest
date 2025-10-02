import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../../services/auth/authService';
import type { ILoginFormData, IAuthUser } from '../type';

interface UseLoginReturn {
  login: (credentials: ILoginFormData) => void;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  data: IAuthUser | undefined;
  reset: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (credentials: ILoginFormData): Promise<IAuthUser> => {
      // Show loading toast
      const loadingToast = toast.loading('در حال ورود...');
      
      try {
        const result = await authService.login(credentials);
        toast.dismiss(loadingToast);
        return result;
      } catch (error) {
        toast.dismiss(loadingToast);
        throw error;
      }
    },
    onSuccess: (data: IAuthUser) => {
      console.log('✅ Login successful:', data);
      toast.success(`خوش آمدید ${data.first_name} ${data.last_name}! 🎉`);
      // Navigate to dashboard after successful login
      navigate('/', { replace: true });
    },
    onError: (error: Error) => {
      console.error('❌ Login failed:', error.message);
      
      // Show appropriate error message
      let errorMessage = 'خطا در ورود به سیستم';
      
      if (error.message.includes('401')) {
        errorMessage = 'نام کاربری یا رمز عبور اشتباه است';
      } else if (error.message.includes('400')) {
        errorMessage = 'اطلاعات ورودی نامعتبر است';
      } else if (error.message.includes('Network')) {
        errorMessage = 'خطا در اتصال به سرور';
      } else if (error.message.includes('missing')) {
        errorMessage = 'نام کاربری و رمز عبور الزامی است';
      }
      
      toast.error(errorMessage);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset,
  };
};
