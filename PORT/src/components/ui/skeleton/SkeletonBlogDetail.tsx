import { cn } from "../../../utils/cn";
import { Skeleton } from "./Skeleton";
import { SkeletonText } from "./SkeletonText";

export interface SkeletonBlogDetailProps {
  /** Additional CSS classes on the outer container */
  className?: string;
  /** Animation type */
  animation?: "shimmer" | "pulse" | "none";
}

/**
 * SkeletonBlogDetail — Full blog post loading placeholder.
 *
 * Matches the exact layout of the real `<article>` in BlogPost.tsx:
 * - "← Back to Blog" link placeholder
 * - `rounded-3xl border border-slate-100 bg-white p-8 shadow-sm` article card
 * - Title (h1, text-4xl), date (small), body paragraphs, simulated code block
 *
 * CLS = 0 because dimensions match the real component exactly.
 *
 * @example
 * ```tsx
 * <SkeletonBlogDetail />
 * ```
 */
export function SkeletonBlogDetail({
  className,
  animation,
}: SkeletonBlogDetailProps) {
  return (
    <div
      className={cn("mx-auto max-w-3xl px-4 py-12", className)}
      role="status"
      aria-label="Loading blog post"
    >
      {/* ── "← Back to Blog" link placeholder ── */}
      <Skeleton
        className="mb-8 h-5 w-32 rounded-md"
        animation={animation}
      />

      {/* ── Article card (matches rounded-3xl border p-8) ── */}
      <div className="rounded-3xl border border-slate-200/60 bg-white/40 p-8 shadow-sm">
        {/* ── Title (matches h1 text-4xl font-bold, ~2 lines) ── */}
        <div className="mb-5 flex flex-col gap-3">
          <Skeleton className="h-10 w-[85%] rounded-lg" animation={animation} />
          <Skeleton className="h-10 w-[55%] rounded-lg" animation={animation} />
        </div>

        {/* ── Published date (matches small with border-b pb-4) ── */}
        <Skeleton className="mb-4 h-4 w-[38%] rounded-md" animation={animation} />
        <div className="mb-8 border-b border-slate-100" />

        {/* ── Body paragraph block 1 ── */}
        <SkeletonText
          lines={5}
          widths={["100%", "96%", "88%", "100%", "72%"]}
          lineHeight="h-[18px]"
          gap="gap-[14px]"
          className="mb-8"
          animation={animation}
        />

        {/* ── Simulated code block ── */}
        <Skeleton
          className="mb-8 h-36 w-full rounded-xl"
          animation={animation}
          borderRadius={12}
        />

        {/* ── Body paragraph block 2 ── */}
        <SkeletonText
          lines={4}
          widths={["100%", "93%", "100%", "60%"]}
          lineHeight="h-[18px]"
          gap="gap-[14px]"
          className="mb-6"
          animation={animation}
        />

        {/* ── Simulated heading ── */}
        <Skeleton className="mb-4 mt-6 h-7 w-[45%] rounded-lg" animation={animation} />

        {/* ── Body paragraph block 3 ── */}
        <SkeletonText
          lines={3}
          widths={["100%", "87%", "75%"]}
          lineHeight="h-[18px]"
          gap="gap-[14px]"
          animation={animation}
        />
      </div>
    </div>
  );
}
