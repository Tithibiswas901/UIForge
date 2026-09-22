import React from 'react';
import type { RegistryEntry } from '../data/componentRegistry';

interface PropertiesPanelProps {
  component: RegistryEntry;
  props: Record<string, any>;
  onChange: (newProps: Record<string, any>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ component, props, onChange }) => {
  const handleChange = (name: string, value: any) => {
    onChange({ ...props, [name]: value });
  };

  return (
    <div className="w-80 border-l border-border bg-bg-panel p-6 overflow-y-auto h-full flex flex-col gap-6">
      <h2 className="text-lg font-semibold border-b border-border pb-2">Properties</h2>
      
      <div className="flex flex-col gap-4">
        {component.propSchema.map((control) => {
          const value = props[control.name] ?? component.defaultProps[control.name];

          return (
            <div key={control.name} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-base flex items-center justify-between">
                {control.name}
                <span className="text-xs text-text-muted">{control.type}</span>
              </label>

              {control.type === 'enum' && (
                <select
                  value={value}
                  onChange={(e) => handleChange(control.name, e.target.value)}
                  className="w-full bg-bg-base border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {control.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {control.type === 'boolean' && (
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={(e) => handleChange(control.name, e.target.checked)}
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary dark:bg-slate-600 dark:peer-focus:ring-primary"></div>
                </label>
              )}

              {control.type === 'text' && (
                <input
                  type="text"
                  value={value || ''}
                  onChange={(e) => handleChange(control.name, e.target.value)}
                  className="w-full bg-bg-base border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}

              {control.type === 'number' && (
                <input
                  type="number"
                  value={value ?? ''}
                  onChange={(e) => handleChange(control.name, e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full bg-bg-base border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}

              {control.type === 'color' && (
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => handleChange(control.name, e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border border-border bg-bg-base p-0.5"
                  />
                  <span className="text-sm font-mono text-text-muted uppercase">{value || '#000000'}</span>
                </div>
              )}

              {control.type === 'icon' && (
                <select
                  value={value || ''}
                  onChange={(e) => handleChange(control.name, e.target.value)}
                  className="w-full bg-bg-base border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">None</option>
                  {['Check', 'X', 'Star', 'Heart', 'User', 'Settings', 'Info', 'AlertCircle', 'Search'].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
