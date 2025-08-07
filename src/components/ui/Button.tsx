import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';
    
    const variants = {
      primary: 'bg-gradient-to-r from-primary to-primary-light text-white hover:from-[#3DFFAB] hover:to-[#3DFFAB] hover:text-[#2E3237] focus:ring-primary shadow-primary hover:shadow-primary-hover',
      secondary: 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-[var(--glass-dark)] focus:ring-gray-500',
      outline: 'border-2 border-[#3DFFAB] text-gray-600 hover:bg-[#3DFFAB] hover:text-[#2E3237] dark:text-[#3DFFAB] dark:hover:bg-[#3DFFAB] dark:hover:text-[#2E3237] focus:ring-[#3DFFAB] group-hover:bg-[#3DFFAB] group-hover:text-[#2E3237] dark:group-hover:bg-[#3DFFAB] dark:group-hover:text-[#2E3237]',
      ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-[#2E3237] dark:hover:bg-[#3DFFAB] dark:hover:text-[#2E3237] focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };