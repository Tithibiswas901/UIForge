import { useState, useEffect } from 'react';
import { componentRegistry } from '../data/componentRegistry';
import { useUrlState } from '../lib/urlState';
import { PropertiesPanel } from '../playground/PropertiesPanel';
import { Preview } from '../playground/Preview';
import { AccessibilityPanel } from '../playground/AccessibilityPanel';
import { CodePanel } from '../playground/CodePanel';
import { BackgroundGraph } from '../components/BackgroundGraph';
import { Moon, Sun, Component as ComponentIcon } from 'lucide-react';

type Tab = 'preview' | 'accessibility' | 'code';

export function Playground() {
  const [activeComponentId, setActiveComponentId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('c') || componentRegistry[0].id;
  });

  const activeComponent = componentRegistry.find(c => c.id === activeComponentId) || componentRegistry[0];

  const [props, setProps] = useUrlState(activeComponent.id, activeComponent.defaultProps);
  
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const [previewElement, setPreviewElement] = useState<HTMLElement | null>(null);
  const [colorBlindness, setColorBlindness] = useState<string>('none');

  // Theme toggle
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('uiforge_theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('uiforge_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('uiforge_theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-bg-base text-text-base">
      
      {/* Header */}
      <header className="h-14 border-b border-border px-6 flex items-center justify-between shrink-0 bg-bg-base">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-1.5 rounded-md">
            <ComponentIcon className="w-5 h-5" />
          </div>
          <a href="/" className="font-bold text-xl tracking-tight hover:text-primary transition-colors">UIForge</a>
        </div>
        
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Components */}
        <div className="w-64 border-r border-border bg-bg-panel flex flex-col shrink-0">
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Components</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
            {componentRegistry.map((comp) => (
              <button
                key={comp.id}
                onClick={() => {
                  setActiveComponentId(comp.id);
                  setActiveTab('preview');
                }}
                className={`text-left px-4 py-2 rounded-md text-sm transition-colors ${
                  activeComponentId === comp.id 
                    ? 'bg-primary text-white font-medium' 
                    : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Panel - Main */}
        <div className="flex-1 flex flex-col min-w-0">
          
          <div className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
            <div className="absolute inset-0 z-0">
              <BackgroundGraph />
            </div>
            <div className="relative z-10 w-full h-full">
              {activeTab === 'preview' && (
              <Preview 
                component={activeComponent} 
                props={props} 
                onRefChange={setPreviewElement}
                colorBlindness={colorBlindness}
              />
            )}
            {activeTab === 'accessibility' && (
              <AccessibilityPanel 
                component={activeComponent} 
                props={props} 
                element={previewElement} 
                colorBlindness={colorBlindness}
                onColorBlindnessChange={setColorBlindness}
              />
            )}
            {activeTab === 'code' && (
              <CodePanel 
                component={activeComponent} 
                props={props} 
              />
            )}
            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="h-12 border-t border-border flex shrink-0 bg-bg-panel px-4">
            <div className="flex gap-1 h-full items-end">
              {(['preview', 'accessibility', 'code'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-sm font-medium capitalize border-t-2 transition-colors ${
                    activeTab === tab 
                      ? 'border-primary text-primary bg-bg-base' 
                      : 'border-transparent text-text-muted hover:text-text-base hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <PropertiesPanel 
          component={activeComponent} 
          props={props} 
          onChange={setProps} 
        />

      </div>
    </div>
  );
}

