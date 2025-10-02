// Authentication status enum
export enum AuthStatus {
  IDLE = "idle",
  LOADING = "loading", 
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
  ERROR = "error",
}

// Login form field names
export enum LoginFields {
  EMAIL = "email",
  PASSWORD = "password", 
  REMEMBER_ME = "rememberMe",
}

// API endpoints for reqres.in
export const API_ENDPOINTS = {
  LOGIN: "https://reqres.in/api/login",
  USERS: "https://reqres.in/api/users",
  USER_DETAIL: (id: number) => `https://reqres.in/api/users/${id}`,
} as const;
