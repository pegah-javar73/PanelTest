import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  icon?: LucideIcon;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  selectClassName?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  icon: Icon,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  className = '',
  selectClassName = '',
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
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || readOnly}
          className={`w-full ${Icon ? 'pr-10' : 'pr-3'} pl-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${readOnly || disabled ? 'bg-gray-50' : ''} ${selectClassName}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 text-right">{error}</p>
      )}
    </div>
  );
};

export default SelectField;
