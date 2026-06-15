import { cn } from "../../../utils/cn";
import { Skeleton } from "./Skeleton";

export interface SkeletonTextProps {
  /** Number of text lines to render */
  lines?: number;
  /** Custom width for each line (cycles if fewer than lines) */
  widths?: string[];
  /** Tailwind height class for each line */
  lineHeight?: string;
  /** Tailwind gap class between lines */
  gap?: string;
  /** Additional CSS classes on container */
  className?: string;
  /** Animation type passed through to each line */
  animation?: "shimmer" | "pulse" | "none";
}

/** Default staggered widths that mimic real paragraph text */
const DEFAULT_WIDTHS = ["100%", "92%", "80%", "100%", "65%"];

/**
 * SkeletonText — Multi-line text placeholder.
 *
 * Renders several Skeleton bars with staggered widths to simulate paragraph text.
 *
 * @example
 * ```tsx
 * <SkeletonText lines={4} />
 * <SkeletonText lines={2} widths={['100%', '60%']} lineHeight="h-5" />
 * ```
 */
export function SkeletonText({
  lines = 3,
  widths = DEFAULT_WIDTHS,
  lineHeight = "h-4",
  gap = "gap-3",
  className,
  animation,
}: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col", gap, className)} role="presentation" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn(lineHeight, "rounded-md")}
          width={widths[i % widths.length]}
          animation={animation}
        />
      ))}
    </div>
  );
}
