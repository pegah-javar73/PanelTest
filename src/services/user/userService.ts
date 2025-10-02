import { apiInstance } from '../apiServices/instance/apiInstance';
import { tokenHandler } from '../apiServices/core/tokenHandler';
import { toast } from 'react-hot-toast';
import type { CreateUserData, UpdateUserData, UserResponse, UsersListResponse } from './type';


class UserService {
  async fetchUsers(page: number = 1, per_page: number = 6): Promise<UsersListResponse> {
    try {
      tokenHandler.validateTokenExists();
      tokenHandler.setTokenForApiInstance();

      const result = await apiInstance<UsersListResponse>({
        url: '/api/users',
        method: 'GET',
        params: { page, per_page },
      });
      
      return result;
    } catch (error: any) {
      console.error('Fetch users error:', error);
      if (error.response?.status === 401) {
        throw new Error('Authentication failed');
      }
      toast.error('خطا در بارگذاری لیست کاربران');
      throw error;
    }
  }

  async getUserById(id: number | string): Promise<{ data: UserResponse }> {
    try {
      tokenHandler.validateTokenExists();
      tokenHandler.setTokenForApiInstance();

      const result = await apiInstance<{ data: UserResponse }>({
        url: `/api/users/${id}`,
        method: 'GET',
      });

      return result;
    } catch (error: any) {
      console.error('Get user by ID error:', error);
      if (error.response?.status === 401) {
        throw new Error('Authentication failed');
      }
      toast.error('خطا در بارگذاری اطلاعات کاربر');
      throw error;
    }
  }

  async createUser(userData: CreateUserData): Promise<UserResponse> {
    try {
      tokenHandler.validateTokenExists();
      tokenHandler.setTokenForApiInstance();

      const result = await apiInstance<UserResponse>({
        url: '/api/register',
        method: 'POST',
        data: userData,
      });
      
      toast.success('کاربر جدید با موفقیت ایجاد شد');
      return result;
    } catch (error: any) {
      console.error('Create user error:', error);
      if (error.response?.status === 401) {
        throw new Error('Authentication failed');
      }
      toast.error('خطا در ایجاد کاربر جدید');
      throw error;
    }
  }

  async updateUser(id: number | string, userData: UpdateUserData): Promise<UserResponse> {
    try {
      tokenHandler.validateTokenExists();
      tokenHandler.setTokenForApiInstance();

      const result = await apiInstance<UserResponse>({
        url: `/api/users/${id}`,
        method: 'PUT',
        data: userData,
      });
      
      toast.success('اطلاعات کاربر با موفقیت بروزرسانی شد');
      return result;
    } catch (error: any) {
      console.error('Update user error:', error);
      if (error.response?.status === 401) {
        throw new Error('Authentication failed');
      }
      toast.error('خطا در بروزرسانی اطلاعات کاربر');
      throw error;
    }
  }

  async deleteUser(id: number | string): Promise<void> {
    try {
      tokenHandler.validateTokenExists();
      tokenHandler.setTokenForApiInstance();

      await apiInstance({
        url: `/api/users/${id}`,
        method: 'DELETE',
      });
      
      toast.success('کاربر با موفقیت حذف شد');
    } catch (error: any) {
      console.error('Delete user error:', error);
      if (error.response?.status === 401) {
        throw new Error('Authentication failed');
      }
      toast.error('خطا در حذف کاربر');
      throw error;
    }
  }

  async bulkDeleteUsers(ids: (number | string)[]): Promise<void> {
    try {
      const deletePromises = ids.map(id => this.deleteUser(id));
      await Promise.all(deletePromises);
      toast.success(`${ids.length} کاربر با موفقیت حذف شدند`);
    } catch (error) {
      console.error('Bulk delete users error:', error);
      toast.error('خطا در حذف کاربران');
      throw error;
    }
  }
}

export const userService = new UserService();
export default userService;
