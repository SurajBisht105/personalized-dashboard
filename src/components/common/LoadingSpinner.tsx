'use client';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3',
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-gray-300 border-t-indigo-600 rounded-full animate-spin`} />
    </div>
  );
}