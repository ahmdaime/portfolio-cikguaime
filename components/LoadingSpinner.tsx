import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Memuatkan...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin"></div>
      </div>
      {text && (
        <p className="mt-4 text-gray-400 text-sm">{text}</p>
      )}
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
