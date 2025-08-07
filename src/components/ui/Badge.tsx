import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-all duration-200 hover:scale-105';

    const variants = {
      default: 'bg-gray-100/80 text-gray-800 dark:bg-[#181C20]/80 dark:text-gray-200 backdrop-blur-sm',
      primary: 'bg-[#3DFFAB] text-[#2E3237] shadow-neon-green',
      secondary: 'bg-blue-100/80 text-primary dark:text-[#00FFFB] dark:bg-[var(--glass-dark)] backdrop-blur-sm',
      success: 'bg-green-100/80 text-green-800 dark:bg-[var(--glass-dark)] dark:text-green-400 backdrop-blur-sm',
      warning: 'bg-yellow-100/80 text-yellow-800 dark:bg-[var(--glass-dark)] dark:text-yellow-400 backdrop-blur-sm',
      danger: 'bg-red-100/80 text-red-800 dark:bg-[var(--glass-dark)] dark:text-red-400 backdrop-blur-sm',
      info: 'bg-cyan-100/80 text-cyan-800 dark:bg-[var(--glass-dark)] dark:text-cyan-400 backdrop-blur-sm',
      outline: 'border border-[#3DFFAB] text-[#2E3237] bg-[#3DFFAB] hover:bg-[#3DFFAB]/90 dark:border-[#3DFFAB] dark:text-[#3DFFAB] dark:bg-transparent dark:hover:bg-[#3DFFAB]/10 backdrop-blur-sm',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    };

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };