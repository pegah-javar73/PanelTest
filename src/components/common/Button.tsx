import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  fullWidth = false,
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Loading spinner
  const LoadingSpinner = () => (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );

  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonStyles}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
};

export default Button;
