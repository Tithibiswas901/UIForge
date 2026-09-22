import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button';

export interface ModalProps {
  open?: boolean;
  title?: string;
  description?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open = false, title = 'Modal Title', description = 'Modal description text goes here.', ...props }, ref) => {
    
    // We render inline for the playground, normally this would use a Portal
    if (!open) return (
      <div className="text-sm text-text-muted">Modal is closed. Toggle "open" property to view.</div>
    );

    return (
      <div className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" aria-hidden="true" />
        
        {/* Dialog container */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div 
              role="dialog" 
              aria-modal="true" 
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              ref={ref}
              className="relative transform overflow-hidden rounded-lg bg-bg-base text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-border"
              {...props}
            >
              <div className="bg-bg-base px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-semibold leading-6 text-text-base" id="modal-title">
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-text-muted" id="modal-desc">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-bg-panel px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button variant="primary" size="medium" className="sm:ml-3">Confirm</Button>
                <Button variant="secondary" size="medium" className="mt-3 sm:mt-0">Cancel</Button>
              </div>
              
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-bg-base transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
