import React, { useState } from 'react';
import Button from '../../../components/common/Button';
import InputField from '../../../components/common/InputField';
import type { ILoginFormProps, ILoginFormData } from '../type';

const LoginForm: React.FC<ILoginFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<ILoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Form validation
  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'نام کاربری الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'فرمت ایمیل صحیح نیست';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'کلمه عبور الزامی است';
    } else if (formData.password.length < 6) {
      errors.password = 'کلمه عبور باید حداقل ۶ کاراکتر باشد';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof ILoginFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear validation error for this field
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Email Input */}
        <InputField
          label="نام کاربری"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          type="email"
          placeholder="نام کاربری"
          error={validationErrors.email}
          required
          className="mb-3 sm:mb-4"
        />

        {/* Password Input */}
        <InputField
          label="رمز عبور"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          type="password"
          placeholder="رمز عبور"
          error={validationErrors.password}
          required
          className="mb-3 sm:mb-4"
        />

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>مرا بخاطر بسپار</span>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-2 sm:p-3 text-right">
            <p className="text-xs sm:text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          className="bg-slate-800 hover:bg-slate-900 focus:ring-slate-500 text-white font-medium text-sm sm:text-base py-2 sm:py-3"
        >
          ورود
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
