import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { Playground } from './pages/Playground';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Override pushState and replaceState to trigger re-renders
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      handleLocationChange();
    };

    window.addEventListener('popstate', handleLocationChange);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin) && !anchor.target) {
        const url = new URL(anchor.href);
        
        // If it's a hash link on the same page, let the browser handle the scroll natively
        if (url.pathname === window.location.pathname && url.hash) {
          return;
        }

        e.preventDefault();
        window.history.pushState(null, '', url.pathname + url.search);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return currentPath === '/playground' ? <Playground /> : <LandingPage />;
}

export default App;
