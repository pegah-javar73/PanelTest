import type { 
  ILoginFormData, 
  ILoginApiResponse, 
  IUserApiResponse, 
  IAuthUser
} from '../../pages/auth/type';
import { AUTH_STORAGE_KEYS } from '../../pages/auth/type';
import { apiInstance } from '../apiServices/instance/apiInstance';
import { tokenHandler } from '../apiServices/core/tokenHandler';
import toast from 'react-hot-toast';

class AuthService {
  // Login user with reqres.in API
  async login(credentials: ILoginFormData): Promise<IAuthUser> {
    try {
      
      // First, authenticate with reqres.in
      const loginData: ILoginApiResponse = await apiInstance<ILoginApiResponse>({
        url: '/api/login',
        method: 'POST',
        client: 'axios',
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      });

      // Get user details (using a sample user ID since reqres.in doesn't return user data on login)
      const userData: IUserApiResponse = await apiInstance<IUserApiResponse>({
        url: '/api/users/2',
        method: 'GET',
      });

      // Combine login token with user data
      const authUser: IAuthUser = {
        ...userData.data,
        token: loginData.token,
      };

      // Store authentication data
      this.storeAuthData(authUser, credentials.rememberMe);

      return authUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error instanceof Error ? error : new Error('Login failed');
    }
  }

  // Store authentication data in localStorage
  private storeAuthData(user: IAuthUser, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, user.token);
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(AUTH_STORAGE_KEYS.REMEMBER_ME, 'true');
      // Also store with the key used by apiInstance
      localStorage.setItem('auth_token', user.token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      // Store in sessionStorage for current session only
      sessionStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, user.token);
      sessionStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.removeItem(AUTH_STORAGE_KEYS.REMEMBER_ME);
      // Also store with the key used by apiInstance
      sessionStorage.setItem('auth_token', user.token);
      sessionStorage.setItem('auth_user', JSON.stringify(user));
    }
    
    // Reset the 401 error handler flag on successful login
    import('../apiServices/core/error-handling/strategies/AuthErrorHandler').then(({ AuthErrorHandler }) => {
      AuthErrorHandler.reset();
    });
  }

  // Get stored authentication data
  getStoredAuthData(): IAuthUser | null {
    try {
      // Check if user chose to be remembered
      const rememberMe = localStorage.getItem(AUTH_STORAGE_KEYS.REMEMBER_ME) === 'true';
      
      let token: string | null;
      let userStr: string | null;

      if (rememberMe) {
        token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
        userStr = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
      } else {
        token = sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
        userStr = sessionStorage.getItem(AUTH_STORAGE_KEYS.USER);
      }

      if (token && userStr) {
        const user: IAuthUser = JSON.parse(userStr);
        return user;
      }

      return null;
    } catch (error) {
      console.error('Error retrieving stored auth data:', error);
      return null;
    }
  }

  // Clear authentication data
  clearAuthData(): void {
    // Clear from both localStorage and sessionStorage
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REMEMBER_ME);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    
    // Also clear the keys used by apiInstance
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const authData = this.getStoredAuthData();
    return authData !== null && authData.token !== '';
  }

  // Get authentication token for API requests
  getAuthToken(): string | null {
    return tokenHandler.getAuthToken();
  }

  // Fetch users list from reqres.in API
  async fetchUsers(page: number = 1): Promise<any> {
    try {
      tokenHandler.validateTokenExists();

      const result = await apiInstance({
        url: '/api/users',
        method: 'GET',
        params: { page },
      });
      
      toast.success('لیست کاربران با موفقیت بارگذاری شد');
      return result;
    } catch (error) {
      console.error('Fetch users error:', error);
      toast.error('خطا در بارگذاری لیست کاربران');
      throw error;
    }
  }

  // Get user details by ID
  async getUserById(id: number): Promise<any> {
    try {
      tokenHandler.validateTokenExists();

      return await apiInstance({
        url: `/api/users/${id}`,
        method: 'GET',
      });
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw error;
    }
  }

  // Create user (POST request to reqres.in)
  async createUser(userData: any): Promise<any> {
    try {
      tokenHandler.validateTokenExists();

      const result = await apiInstance({
        url: '/api/users',
        method: 'POST',
        data: userData,
      });
      
      toast.success('کاربر جدید با موفقیت ایجاد شد');
      return result;
    } catch (error) {
      console.error('Create user error:', error);
      toast.error('خطا در ایجاد کاربر جدید');
      throw error;
    }
  }

  // Update user (PUT request to reqres.in)
  async updateUser(id: number, userData: any): Promise<any> {
    try {
      tokenHandler.validateTokenExists();

      const result = await apiInstance({
        url: `/api/users/${id}`,
        method: 'PUT',
        data: userData,
      });
      
      toast.success('اطلاعات کاربر با موفقیت بروزرسانی شد');
      return result;
    } catch (error) {
      console.error('Update user error:', error);
      toast.error('خطا در بروزرسانی اطلاعات کاربر');
      throw error;
    }
  }

  // Delete user (DELETE request to reqres.in)
  async deleteUser(id: number): Promise<void> {
    try {
      tokenHandler.validateTokenExists();

      await apiInstance({
        url: `/api/users/${id}`,
        method: 'DELETE',
      });
      
      toast.success('کاربر با موفقیت حذف شد');
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('خطا در حذف کاربر');
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
