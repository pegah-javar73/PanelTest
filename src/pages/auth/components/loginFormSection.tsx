import React from 'react';
import LoginForm from './loginForm';
import { useAuthContext } from '../namespace';

const LoginFormSection: React.FC = () => {
  const { handleLogin, loading, loginError } = useAuthContext();
  return (
    <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-12 flex flex-col justify-center">
      <div className="w-full max-w-md mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            ورود به حساب کاربری
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            لطفاً اطلاعات خود را وارد کنید
          </p>
        </div>

        {/* Login Form */}
        <LoginForm
          onSubmit={handleLogin}
          loading={loading}
          error={loginError}
        />

        
      </div>
    </div>
  );
};

export default LoginFormSection;
