import { cn } from "../../../utils/cn";
import { Skeleton } from "./Skeleton";

export interface SkeletonBlogCardProps {
  /** Number of skeleton cards to show */
  count?: number;
  /** Additional CSS classes on the grid container */
  className?: string;
  /** Animation type */
  animation?: "shimmer" | "pulse" | "none";
}

/**
 * SkeletonBlogCard — Blog card loading placeholder.
 *
 * Matches the exact layout of the real `<article>` cards rendered in BlogList.tsx:
 * - `rounded-2xl border border-slate-100 p-6 shadow-sm`
 * - Title (2 lines), excerpt (3 lines), date (1 short line)
 *
 * CLS = 0 because dimensions match the real component exactly.
 *
 * @example
 * ```tsx
 * <SkeletonBlogCard count={3} />
 * ```
 */
export function SkeletonBlogCard({
  count = 3,
  className,
  animation,
}: SkeletonBlogCardProps) {
  return (
    <div
      className={cn("grid gap-8", className)}
      role="status"
      aria-label="Loading blog posts"
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200/60 bg-white/40 p-6 shadow-sm"
        >
          {/* ── Title area (matches h2 with text-2xl font-semibold) ── */}
          <div className="mb-4 flex flex-col gap-2.5">
            <Skeleton className="h-7 w-[75%] rounded-lg" animation={animation} />
            <Skeleton className="h-7 w-[50%] rounded-lg" animation={animation} />
          </div>

          {/* ── Excerpt area (matches p with text-base) ── */}
          <div className="mb-5 flex flex-col gap-2.5">
            <Skeleton className="h-4 w-full rounded-md" animation={animation} />
            <Skeleton className="h-4 w-[88%] rounded-md" animation={animation} />
            <Skeleton className="h-4 w-[65%] rounded-md" animation={animation} />
          </div>

          {/* ── Date area (matches small with font-medium text-slate-400) ── */}
          <Skeleton className="h-3.5 w-[30%] rounded-md" animation={animation} />
        </div>
      ))}
    </div>
  );
}
