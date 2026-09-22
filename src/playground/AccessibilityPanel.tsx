import React, { useMemo, useState, useEffect } from 'react';
import type { RegistryEntry } from '../data/componentRegistry';
import { getContrastRatio } from '../lib/contrast';
import { CheckCircle2, XCircle } from 'lucide-react';

interface AccessibilityPanelProps {
  component: RegistryEntry;
  props: Record<string, any>;
  element: HTMLElement | null;
  colorBlindness?: string;
  onColorBlindnessChange?: (val: string) => void;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ component, props, element, colorBlindness = 'none', onColorBlindnessChange }) => {
  const [contrastRatio, setContrastRatio] = useState<number | null>(null);

  useEffect(() => {
    if (element) {
      const styles = window.getComputedStyle(element);
      const bg = styles.backgroundColor;
      const color = styles.color;
      
      const ratio = getContrastRatio(bg, color);
      setContrastRatio(ratio);
    } else {
      setContrastRatio(null);
    }
  }, [props, element]);

  const checks = useMemo(() => {
    if (!component.a11yChecks) return [];
    return component.a11yChecks(props, element);
  }, [component, props, element]);

  const contrastPassed = contrastRatio !== null && contrastRatio >= 4.5;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Accessibility Report</h3>
      <div className="flex flex-col gap-4">
        
        {/* Color Blindness Simulation */}
        <div className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-bg-panel">
          <label className="font-medium text-sm">Color Blindness Simulator</label>
          <select 
            value={colorBlindness} 
            onChange={(e) => onColorBlindnessChange?.(e.target.value)}
            className="w-full bg-bg-base border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="none">None (Normal Vision)</option>
            <option value="protanopia">Protanopia (Red-Blind)</option>
            <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
          </select>
          <p className="text-xs text-text-muted mt-1">Simulates how the component appears to users with different types of color blindness.</p>
        </div>

        {/* Contrast Check */}
        <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-bg-panel">
          <div className="mt-0.5">
            {contrastPassed ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : (
              <XCircle className="w-5 h-5 text-danger" />
            )}
          </div>
          <div>
            <h4 className="font-medium text-sm">Contrast Ratio</h4>
            <p className="text-sm text-text-muted mt-1">
              {contrastRatio !== null ? (
                <>
                  Actual contrast ratio is <strong>{contrastRatio.toFixed(2)}:1</strong>.
                  {contrastPassed ? ' Passes WCAG AA (>= 4.5:1).' : ' Fails WCAG AA (>= 4.5:1).'}
                </>
              ) : (
                'Could not compute contrast.'
              )}
            </p>
          </div>
        </div>

        {/* Custom Component Checks */}
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-bg-panel">
            <div className="mt-0.5">
              {check.passed ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <XCircle className="w-5 h-5 text-danger" />
              )}
            </div>
            <div>
              <h4 className="font-medium text-sm">{check.name}</h4>
              <p className="text-sm text-text-muted mt-1">{check.message}</p>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};
