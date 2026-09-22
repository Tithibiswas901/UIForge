import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  state?: 'normal' | 'error' | 'disabled';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, state = 'normal', className = '', ...props }, ref) => {
    const id = props.id || React.useId();
    const helperId = `${id}-helper`;

    const disabled = state === 'disabled';
    const error = state === 'error';

    const baseInputStyles = "w-full rounded-md border bg-bg-base px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:opacity-50";
    
    let stateStyles = "border-border focus:border-primary focus:ring-primary";
    if (error) {
      stateStyles = "border-danger text-danger focus:border-danger focus:ring-danger placeholder:text-danger/60";
    }

    return (
      <div className="flex flex-col gap-1.5 w-full max-w-sm text-left">
        {label && (
          <label htmlFor={id} className={`text-sm font-medium ${error ? 'text-danger' : 'text-text-base'}`}>
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={helperText ? helperId : undefined}
            className={`${baseInputStyles} ${stateStyles} ${className}`}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-2.5 pointer-events-none">
              <AlertCircle className="h-4 w-4 text-danger" />
            </div>
          )}
        </div>
        {helperText && (
          <p id={helperId} className={`text-xs ${error ? 'text-danger' : 'text-text-muted'}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
