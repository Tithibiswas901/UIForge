import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ text = 'Tooltip text', position = 'top', delay = 200, children, className = '', ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
      timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsVisible(false);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const positionStyles = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
      <div 
        className={`relative inline-block ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        ref={ref}
        {...props}
      >
        {children || <span className="text-text-base cursor-default underline decoration-dotted underline-offset-4">Hover me</span>}
        
        {isVisible && text && (
          <div 
            role="tooltip" 
            className={`absolute z-50 whitespace-nowrap rounded bg-slate-900 px-2.5 py-1 text-xs text-white opacity-100 shadow-md transition-opacity dark:bg-slate-100 dark:text-slate-900 ${positionStyles[position]}`}
          >
            {text}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
