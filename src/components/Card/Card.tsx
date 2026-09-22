import React from 'react';
import { Button } from '../Button';

export interface CardProps {
  title?: string;
  description?: string;
  actionLabel?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title = 'Card Title', description = 'Card description goes here.', actionLabel = 'Action', ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className="w-full max-w-md rounded-xl border border-border bg-bg-base p-6 shadow-sm text-left"
        {...props}
      >
        <h3 className="text-xl font-semibold leading-none tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
        {actionLabel && (
          <div className="mt-6 flex items-center">
            <Button variant="primary" size="small">{actionLabel}</Button>
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
