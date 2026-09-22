import React from 'react';
import * as Icons from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
  icon?: string;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ text = 'Badge', variant = 'default', icon = '', className = '', ...props }, ref) => {
    
    const variants = {
      default: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      outline: 'border border-border text-text-base',
    };

    // @ts-ignore dynamic icon mapping
    const IconComponent = icon && Icons[icon] ? Icons[icon] : null;

    return (
      <div 
        ref={ref}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${variants[variant]} ${className}`}
        {...props}
      >
        {IconComponent && <IconComponent className="h-3 w-3" />}
        {text}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
