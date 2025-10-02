
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

export class AxiosAdapter {
  private instance: AxiosInstance;
  private customHeaders: Record<string, string> = {};

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setHeaders(headers: Record<string, string>): void {
    this.customHeaders = headers;
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(
      this.handleResponseSuccess,
      this.handleResponseError
    );
  }

  private handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');

    // Add custom headers first
    Object.keys(this.customHeaders).forEach(key => {
      config.headers[key] = this.customHeaders[key];
    });

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }

  private handleResponseSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleResponseError = async (error: any) => {
    // Handle different error types
    if (error.response?.status === 401) {
      toast.error('نام کاربری شما منقضی شده است. لطفاً مجدداً وارد شوید');
      localStorage.removeItem('token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toast.error('شما اجازه دسترسی به این بخش را ندارید');
    } else if (error.response?.status === 404) {
      toast.error('اطلاعات مورد نظر یافت نشد');
    } else if (error.response?.status >= 500) {
      toast.error('خطا در سرور. لطفاً بعداً تلاش کنید');
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      toast.error('خطا در اتصال به سرور');
    }

    return Promise.reject(error);
  };

  // Public Methods
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, config).then((res) => res.data);
  }

  post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(url, data, config).then((res) => res.data);
  }

  put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put<T>(url, data, config).then((res) => res.data);
  }

  patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch<T>(url, data, config).then((res) => res.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T>(url, config).then((res) => res.data);
  }
}
