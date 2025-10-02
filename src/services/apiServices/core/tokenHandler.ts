/**
 * Centralized token handler for authentication
 * Handles token retrieval from localStorage and sessionStorage
 */
export class TokenHandler {
  private static instance: TokenHandler;

  private constructor() {}

  public static getInstance(): TokenHandler {
    if (!TokenHandler.instance) {
      TokenHandler.instance = new TokenHandler();
    }
    return TokenHandler.instance;
  }

  /**
   * Get authentication token from storage
   * Checks both localStorage and sessionStorage
   */
  getAuthToken(): string | null {
    // First check localStorage (for "remember me" users)
    let token = localStorage.getItem("auth_token");
    if (token) {
      return token;
    }

    // Then check sessionStorage (for current session users)
    token = sessionStorage.getItem("auth_token");
    if (token) {
      return token;
    }

    // Fallback to the token key used by apiInstance
    token = localStorage.getItem("token");
    if (token) {
      return token;
    }

    return null;
  }

  /**
   * Set token for apiInstance compatibility
   * This ensures the apiInstance can access the token
   */
  setTokenForApiInstance(): void {
    const token = this.getAuthToken();
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return token !== null && token.trim() !== '';
  }

  /**
   * Get authorization header value
   */
  getAuthorizationHeader(): string | null {
    const token = this.getAuthToken();
    return token ? `Bearer ${token}` : null;
  }

  /**
   * Validate token exists and throw error if not
   */
  validateTokenExists(): void {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
  }
}

// Export singleton instance
export const tokenHandler = TokenHandler.getInstance();
export default tokenHandler;
