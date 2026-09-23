import React, { useEffect, useRef } from 'react';
import type { RegistryEntry } from '../data/componentRegistry';

interface PreviewProps {
  component: RegistryEntry;
  props: Record<string, any>;
  onRefChange: (el: HTMLElement | null) => void;
  colorBlindness?: string;
}

export const Preview: React.FC<PreviewProps> = ({ component, props, onRefChange, colorBlindness = 'none' }) => {
  const Component = component.Component;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    onRefChange(ref.current);
  }, [props, component, onRefChange]);

  let filterStyle = 'none';
  if (colorBlindness === 'protanopia') filterStyle = 'url(#protanopia)';
  if (colorBlindness === 'deuteranopia') filterStyle = 'url(#deuteranopia)';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-bg-base/50">
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: filterStyle }} className="transition-all duration-300">
        <Component ref={ref} {...props}>
          {props.label || props.children}
        </Component>
      </div>
    </div>
  );
};
