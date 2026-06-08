import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const cacheKey = 'scrollPos:' + location.pathname + location.search;
    const container = window; // Fallback to window or your scroll container ref

    if (navType === 'POP') {
      const savedStr = sessionStorage.getItem(cacheKey);
      const savedPosition = savedStr ? parseFloat(savedStr) : 0;
      if (savedPosition <= 0) return;

      let attempts = 0;
      let lastHeight = 0;
      let heightStabilizedCount = 0;
      let intervalId = null;

      const clearEvents = () => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        window.removeEventListener('wheel', handleUserInteract);
        window.removeEventListener('touchmove', handleUserInteract);
        window.removeEventListener('mousedown', handleUserInteract);
        window.removeEventListener('keydown', handleUserInteract);
      };

      const handleUserInteract = () => {
        clearEvents();
      };

      window.addEventListener('wheel', handleUserInteract, { passive: true });
      window.addEventListener('touchmove', handleUserInteract, { passive: true });
      window.addEventListener('mousedown', handleUserInteract);
      window.addEventListener('keydown', handleUserInteract);

      intervalId = setInterval(() => {
        if (window.lenis) {
          window.lenis.scrollTo(savedPosition, { immediate: true });
        } else {
          window.scrollTo(0, savedPosition);
        }

        const currentScroll = window.lenis ? window.lenis.scroll : window.scrollY;
        const currentHeight = document.documentElement.scrollHeight;
        const containerHeight = window.innerHeight;

        if (currentHeight === lastHeight) {
          heightStabilizedCount++;
        } else {
          heightStabilizedCount = 0;
          lastHeight = currentHeight;
        }

        if (
          currentScroll >= savedPosition ||
          (heightStabilizedCount > 10 && currentScroll >= currentHeight - containerHeight - 10) ||
          attempts > 100
        ) {
          clearEvents();
        }
        attempts++;
      }, 50);

      return () => clearEvents();
    } else {
      if (location.hash) {
        const targetId = location.hash.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          setTimeout(() => {
            if (window.lenis) {
              window.lenis.scrollTo(targetEl, { offset: -80 });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
          return;
        }
      }

      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location, navType]);

  useEffect(() => {
    const cacheKey = 'scrollPos:' + location.pathname + location.search;
    
    const savePosition = () => {
      const currentY = window.lenis ? window.lenis.scroll : window.scrollY;
      sessionStorage.setItem(cacheKey, currentY.toString());
    };

    window.addEventListener('beforeunload', savePosition);

    return () => {
      window.removeEventListener('beforeunload', savePosition);
      savePosition();
    };
  }, [location]);

  return null;
};

export default ScrollToTopOnRouteChange;
