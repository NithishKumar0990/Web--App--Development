import { cn } from "../../../utils/cn";
import "./skeleton.css";

export interface SkeletonProps {
  /** Additional CSS classes */
  className?: string;
  /** Explicit width (CSS value) */
  width?: string | number;
  /** Explicit height (CSS value) */
  height?: string | number;
  /** Border radius override */
  borderRadius?: string | number;
  /** Animation type */
  animation?: "shimmer" | "pulse" | "none";
}

/**
 * Skeleton — Base loading placeholder primitive.
 *
 * Renders an animated rectangle that mimics content layout while data loads.
 * Uses CSS-only animations for guaranteed 60fps performance.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-8 w-48 rounded-lg" />
 * <Skeleton width={200} height={20} animation="pulse" />
 * ```
 */
export function Skeleton({
  className,
  width,
  height,
  borderRadius,
  animation = "shimmer",
}: SkeletonProps) {
  const animClass =
    animation === "shimmer"
      ? "skeleton-shimmer"
      : animation === "pulse"
        ? "skeleton-pulse"
        : "";

  return (
    <div
      className={cn("skeleton-bone", animClass, className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius:
          typeof borderRadius === "number"
            ? `${borderRadius}px`
            : borderRadius,
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
}
