// Utility functions for debugging authentication issues

export const debugAuthTokens = () => {
  console.log('=== Authentication Debug Info ===');
  
  // Check localStorage
  const localToken = localStorage.getItem('auth_token');
  const localUser = localStorage.getItem('auth_user');
  const localRememberMe = localStorage.getItem('auth_remember_me');
  
  // Check sessionStorage
  const sessionToken = sessionStorage.getItem('auth_token');
  const sessionUser = sessionStorage.getItem('auth_user');
  
  // Check legacy keys
  const legacyToken = localStorage.getItem('token');
  const legacyAuthToken = localStorage.getItem('auth_token');
  const legacyAuthUser = localStorage.getItem('auth_user');
  
  console.log('LocalStorage:');
  console.log('  auth_token:', localToken ? 'EXISTS' : 'NOT FOUND');
  console.log('  auth_user:', localUser ? 'EXISTS' : 'NOT FOUND');
  console.log('  auth_remember_me:', localRememberMe);
  
  console.log('SessionStorage:');
  console.log('  auth_token:', sessionToken ? 'EXISTS' : 'NOT FOUND');
  console.log('  auth_user:', sessionUser ? 'EXISTS' : 'NOT FOUND');
  
  console.log('Legacy Keys:');
  console.log('  token:', legacyToken ? 'EXISTS' : 'NOT FOUND');
  
  console.log('Active Token:', localToken || sessionToken || 'NONE');
  console.log('================================');
  
  return {
    hasToken: !!(localToken || sessionToken),
    activeToken: localToken || sessionToken,
    storage: localToken ? 'localStorage' : sessionToken ? 'sessionStorage' : 'none'
  };
};

export const clearAllAuthData = () => {
  console.log('Clearing all authentication data...');
  
  // Clear all possible auth keys
  const keysToRemove = [
    'token',
    'auth_token', 
    'auth_user',
    'auth_remember_me',
    'user_token',
    'access_token'
  ];
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
  
  console.log('All authentication data cleared');
};

// Add to window for easy debugging in console
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuthTokens;
  (window as any).clearAuth = clearAllAuthData;
}
