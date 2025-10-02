import { IErrorHandler } from "../models";
import { dispatchManualErrorMessages } from "../utils/dispatchErrorMessages";

export class AuthErrorHandler implements IErrorHandler {
  private static hasHandled401 = false;

  handle(error: any) {
    // Prevent multiple 401 error handling
    if (AuthErrorHandler.hasHandled401) {
      return;
    }

    AuthErrorHandler.hasHandled401 = true;
    
    dispatchManualErrorMessages(["Auth"], "خطای احراز هویت - لطفا مجدداً وارد شوید");
    console.warn("Authentication error:", error.response?.status);
    
    // Clear authentication data
    this.clearAuthData();
    
    // Redirect to login after a short delay
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);
  }

  private clearAuthData(): void {
    // Clear from both localStorage and sessionStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_remember_me");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
  }

  // Reset the flag when needed (e.g., on successful login)
  static reset(): void {
    AuthErrorHandler.hasHandled401 = false;
  }
}
