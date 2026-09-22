import { useState, useEffect, useCallback } from 'react';

export function useUrlState<T extends Record<string, any>>(
  componentId: string,
  defaultProps: T
): [T, (props: T) => void] {
  const [props, setProps] = useState<T>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlId = params.get('c');
    
    if (urlId === componentId) {
      const p = params.get('p');
      if (p) {
        try {
          return { ...defaultProps, ...JSON.parse(decodeURIComponent(p)) };
        } catch (e) {
          // ignore parsing error
        }
      }
    }
    return defaultProps;
  });

  const updateProps = useCallback(
    (newProps: T) => {
      setProps(newProps);
      const params = new URLSearchParams(window.location.search);
      params.set('c', componentId);
      
      // Only store differences from defaults to keep URL clean, or just store all.
      // We will store all stringified.
      params.set('p', encodeURIComponent(JSON.stringify(newProps)));
      
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
    },
    [componentId]
  );

  useEffect(() => {
    // If component changes, reset state if it doesn't match URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('c') !== componentId) {
      setProps(defaultProps);
      params.set('c', componentId);
      params.set('p', encodeURIComponent(JSON.stringify(defaultProps)));
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    }
  }, [componentId, defaultProps]);

  return [props, updateProps];
}
