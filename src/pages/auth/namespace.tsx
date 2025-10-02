"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { 
  IAuthUser, 
  ILoginFormData, 
  IAuthContext, 
  IAuthNamespaceProps
} from "./type";
import { authService } from "../../services/auth/authService";
import { useLogin } from "./hooks/useLoging";
import LoginBranding from "./components/loginBranding";
import LoginFormSection from "./components/loginFormSection";

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthNamespace");
  }
  return context;
};

export const AuthNamespace = ({ children }: IAuthNamespaceProps) => {
  // State management
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // React Query login hook
  const loginMutation = useLogin();

  // Computed state
  const isAuthenticated = user !== null;

  // Initialize authentication state from stored data
  const initializeAuth = useCallback(() => {
    try {
      const storedUser = authService.getStoredAuthData();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear any corrupted data
      authService.clearAuthData();
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle login form submission using React Query
  const handleLogin = async (credentials: ILoginFormData): Promise<void> => {
    return new Promise<void>((resolve) => {
      loginMutation.login(credentials);
      // The mutation will handle success/error, we just resolve immediately
      resolve();
    });
  };

  // Update user state when login is successful
  useEffect(() => {
    if (loginMutation.isSuccess && loginMutation.data) {
      setUser(loginMutation.data);
    }
  }, [loginMutation.isSuccess, loginMutation.data]);

  // Login function (for backward compatibility)
  const login = handleLogin;

  // Logout function
  const logout = useCallback(() => {
    authService.clearAuthData();
    setUser(null);
    loginMutation.reset(); // Reset mutation state
  }, [loginMutation]);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Context value
  const contextValue: IAuthContext = {
    user,
    setUser,
    isAuthenticated,
    loading: loading || loginMutation.isLoading,
    setLoading,
    login,
    logout,
    loginError: loginMutation.error,
    setLoginError: () => loginMutation.reset(), // Reset error by resetting mutation
    handleLogin, // Add handleLogin to context
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Composition components
AuthNamespace.LoginBranding = LoginBranding;
AuthNamespace.LoginFormSection = LoginFormSection;
