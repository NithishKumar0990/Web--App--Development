import { useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useLocation, useNavigationType } from 'react-router-dom';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    let lenis;
    let frame;
    let isDestroyed = false;

    const initLenis = () => {
      const wrapper = document.getElementById('main-scroll-container');
      const content = document.getElementById('main-content-wrapper');

      if (!wrapper || !content) {
        frame = requestAnimationFrame(initLenis);
        return;
      }

      try {
        lenis = new Lenis({
          wrapper,
          content,
          eventsTarget: window,
          lerp: 0.08,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0,
          smoothTouch: false,
          touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;
        window.lenis = lenis;

        const raf = (time) => {
          if (isDestroyed) return;
          lenis.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      } catch (err) {
        console.error('[Lenis] Failed to initialize:', err);
      }
    };

    initLenis();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(frame);
      if (lenis) {
        lenis.destroy();
        if (window.lenis === lenis) {
          window.lenis = null;
        }
      }
    };
  }, []);

  // Reset scroll to top on route change BEFORE paint
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (navType !== 'POP') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname, location.search, navType]);

  return <>{children}</>;
};

export default SmoothScroll;
