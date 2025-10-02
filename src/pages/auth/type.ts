import type { Dispatch, SetStateAction } from "react";

// Login form data interface
export interface ILoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// User authentication data
export interface IAuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  token: string;
}

// Authentication context interface
export interface IAuthContext {
  // Authentication state
  user: IAuthUser | null;
  setUser: Dispatch<SetStateAction<IAuthUser | null>>;
  isAuthenticated: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  
  // Authentication operations
  login: (credentials: ILoginFormData) => Promise<void>;
  handleLogin: (credentials: ILoginFormData) => Promise<void>;
  logout: () => void;
  
  // Form state
  loginError: string | null;
  setLoginError: () => void;
}

// Props for auth namespace
export interface IAuthNamespaceProps {
  children: React.ReactNode;
}

// Props for login form
export interface ILoginFormProps {
  onSubmit: (data: ILoginFormData) => void;
  loading?: boolean;
  error?: string | null;
}

// API response interfaces for reqres.in
export interface ILoginApiResponse {
  token: string;
}

export interface IUserApiResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export interface IApiError {
  error: string;
}

// Local storage keys
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
  REMEMBER_ME: 'remember_me',
} as const;
