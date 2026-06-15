import { useState, useEffect, useRef } from "react";

/**
 * useSkeletonTransition — Prevents skeleton flicker.
 *
 * Ensures the skeleton stays visible for at least `minDisplayMs` milliseconds,
 * even if data arrives almost instantly. This prevents the jarring flash where
 * a skeleton appears and disappears in under 100ms.
 *
 * @param isLoading - Whether the data is currently being fetched
 * @param minDisplayMs - Minimum time the skeleton should be shown (default: 400ms)
 * @returns `{ showSkeleton }` — true while skeleton should be rendered
 *
 * @example
 * ```tsx
 * const [loading, setLoading] = useState(true);
 * const { showSkeleton } = useSkeletonTransition(loading);
 *
 * if (showSkeleton) return <SkeletonBlogCard count={3} />;
 * return <ActualContent />;
 * ```
 */
export function useSkeletonTransition(
  isLoading: boolean,
  minDisplayMs: number = 400
): { showSkeleton: boolean } {
  const [showSkeleton, setShowSkeleton] = useState(isLoading);
  const loadStartRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading) {
      // Loading started — record the timestamp
      loadStartRef.current = Date.now();
      setShowSkeleton(true);
    } else {
      // Loading finished — ensure minimum display time
      const elapsed = loadStartRef.current
        ? Date.now() - loadStartRef.current
        : minDisplayMs;
      const remaining = Math.max(0, minDisplayMs - elapsed);

      if (remaining > 0) {
        timerRef.current = setTimeout(() => {
          setShowSkeleton(false);
        }, remaining);
      } else {
        setShowSkeleton(false);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isLoading, minDisplayMs]);

  return { showSkeleton };
}
