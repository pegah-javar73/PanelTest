import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext, AuthNamespace } from './namespace';

const AuthView: React.FC = () => {
  const { isAuthenticated } = useAuthContext();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 flex items-center justify-center p-2 sm:p-4">
      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px]">
            
            {/* Branding - Mobile at top, Desktop at left */}
            <AuthNamespace.LoginBranding />

            {/* Login Form Section */}
            <AuthNamespace.LoginFormSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
