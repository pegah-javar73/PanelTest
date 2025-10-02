import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  icon?: LucideIcon;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  icon: Icon,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  className = '',
  inputClassName = '',
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
        {label} {required && '*'}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full ${Icon ? 'pr-10' : 'pr-3'} pl-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${readOnly || disabled ? 'bg-gray-50' : ''} ${inputClassName}`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 text-right">{error}</p>
      )}
    </div>
  );
};

export default InputField;
