import type { ILoginFormData, ILoginApiResponse } from './type';
import { AUTH_STORAGE_KEYS } from './type';
import { apiInstance } from '../apiServices/instance/apiInstance';

class AuthService {
  async login(credentials: ILoginFormData): Promise<string> {
    try {
      const loginData: ILoginApiResponse = await apiInstance<ILoginApiResponse>({
        url: '/api/login',
        method: 'POST',
        client: 'axios',
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      });

      this.storeAuthData(loginData.token, credentials.rememberMe);
      return loginData.token;
    } catch (error) {
      console.error('Login error:', error);
      throw error instanceof Error ? error : new Error('Login failed');
    }
  }

  private storeAuthData(token: string, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem(AUTH_STORAGE_KEYS.TOKEN, token);
    
    if (rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEYS.REMEMBER_ME, 'true');
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEYS.REMEMBER_ME);
    }
    
    import('../apiServices/core/error-handling/strategies/AuthErrorHandler').then(({ AuthErrorHandler }) => {
      AuthErrorHandler.reset();
    });
  }

  getStoredAuthToken(): string | null {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN) || 
             sessionStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error retrieving stored auth token:', error);
      return null;
    }
  }

  clearAuthData(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REMEMBER_ME);
    sessionStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
  }

  isAuthenticated(): boolean {
    const token = this.getStoredAuthToken();
    return Boolean(token);
  }

  getAuthToken(): string | null {
    return this.getStoredAuthToken();
  }

  initializeAuth(): void {
    // Method kept for compatibility but simplified
    this.getStoredAuthToken();
  }

}

export const authService = new AuthService();
export default authService;
