import React from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  message?: string;
  dismissable?: boolean;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ type = 'info', message = 'Toast message', dismissable = true, ...props }, ref) => {
    
    const icons = {
      success: <CheckCircle2 className="h-5 w-5 text-success" />,
      error: <XCircle className="h-5 w-5 text-danger" />,
      info: <Info className="h-5 w-5 text-primary" />,
    };

    return (
      <div 
        ref={ref}
        role="status"
        aria-live="polite"
        className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-bg-base shadow-lg ring-1 ring-black ring-opacity-5 border border-border"
        {...props}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {icons[type]}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-text-base text-left">{message}</p>
            </div>
            {dismissable && (
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-bg-base text-text-muted hover:text-text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';
