import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'در حال بارگذاری...', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4`}></div>
        {text && (
          <p className="text-gray-600 text-sm font-medium">{text}</p>
        )}
      </div>
    </div>
  );
};

// Page loading component specifically for route transitions
export const PageLoading: React.FC = () => (
  <LoadingSpinner 
    size="lg" 
    text="در حال بارگذاری صفحه..." 
    fullScreen={true} 
  />
);

// Component loading for smaller sections
export const ComponentLoading: React.FC<{ text?: string }> = ({ text }) => (
  <LoadingSpinner 
    size="md" 
    text={text} 
    fullScreen={false} 
  />
);

export default LoadingSpinner;
