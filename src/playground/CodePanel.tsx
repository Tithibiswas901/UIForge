import React, { useState } from 'react';
import type { RegistryEntry } from '../data/componentRegistry';
import { Check, Copy } from 'lucide-react';

interface CodePanelProps {
  component: RegistryEntry;
  props: Record<string, any>;
}

export const CodePanel: React.FC<CodePanelProps> = ({ component, props }) => {
  const [copied, setCopied] = useState(false);
  const code = component.generateCode(props);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Generated Code</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm bg-bg-base border border-border px-3 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="relative flex-1 bg-slate-900 rounded-lg p-4 overflow-auto">
        <pre className="text-slate-50 text-sm font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
