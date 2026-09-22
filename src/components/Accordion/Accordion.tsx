import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  allowMultiple?: boolean;
}

const defaultItems = [
  { id: '1', title: 'What is UIForge?', content: 'UIForge is a playground for interactive components.' },
  { id: '2', title: 'Is it accessible?', content: 'Yes, we test against WCAG guidelines.' },
  { id: '3', title: 'Can I use it in production?', content: 'Absolutely, the components are production-ready.' },
];

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ allowMultiple = false, className = '', ...props }, ref) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set(['1']));

    const toggleItem = (id: string) => {
      const newOpen = new Set(openItems);
      if (newOpen.has(id)) {
        newOpen.delete(id);
      } else {
        if (!allowMultiple) {
          newOpen.clear();
        }
        newOpen.add(id);
      }
      setOpenItems(newOpen);
    };

    return (
      <div 
        ref={ref} 
        className={`w-full max-w-md rounded-md border border-border bg-bg-base text-left divide-y divide-border ${className}`}
        {...props}
      >
        {defaultItems.map((item) => {
          const isOpen = openItems.has(item.id);
          const headerId = `accordion-header-${item.id}`;
          const contentId = `accordion-content-${item.id}`;

          return (
            <div key={item.id} className="overflow-hidden">
              <h3>
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-text-base transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800"
                >
                  {item.title}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </h3>
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <div className="p-4 text-sm text-text-muted">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
