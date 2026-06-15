import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getApiUrl } from "../utils/api";
import { useSkeletonTransition } from "../hooks/useSkeletonTransition";
import { Skeleton, SkeletonBlogCard } from "../components/ui/skeleton";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
};

/** Crossfade animation variants for skeleton → content transition */
const fadeVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showSkeleton } = useSkeletonTransition(loading);

  useEffect(() => {
    fetch(getApiUrl("/api/posts"))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Could not connect to the backend server. Please verify Laravel is running at http://127.0.0.1:8000.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-center">
      <h1 className="mb-4 text-3xl font-bold text-red-600">Connection Error</h1>
      <p className="mb-6 text-slate-600">{error}</p>
      <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-left text-sm text-red-800">
        <p className="font-semibold mb-2">Troubleshooting Steps:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Run <code className="bg-red-100 px-1 py-0.5 rounded font-mono font-bold">npm run dev</code> from the root folder to start both frontend and backend concurrently.</li>
          <li>Or manually start Laravel by running <code className="bg-red-100 px-1 py-0.5 rounded font-mono font-bold">php artisan serve</code> in <code className="bg-red-100 px-1 py-0.5 rounded font-mono font-bold">LaravelProjects/fromInstaller</code>.</li>
          <li>Make sure database migrations are run: <code className="bg-red-100 px-1 py-0.5 rounded font-mono font-bold">php artisan migrate</code>.</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12" aria-busy={showSkeleton}>
      <AnimatePresence mode="wait">
        {showSkeleton ? (
          <motion.div
            key="skeleton"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Title placeholder */}
            <Skeleton className="mb-8 h-10 w-48 rounded-lg" />
            <SkeletonBlogCard count={3} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1 className="mb-8 text-4xl font-bold text-slate-900">My Blog</h1>

            {posts.length === 0 ? (
              <p className="text-slate-500">No posts published yet.</p>
            ) : (
              <div className="grid gap-8">
                {posts.map((p) => (
                  <article
                    key={p.id}
                    className="rounded-2xl border border-slate-100 bg-transparent p-6 shadow-sm transition hover:shadow-md"
                  >
                    <h2 className="mb-2 text-2xl font-semibold">
                      <Link to={`/blog/${p.slug}`} className="text-blue-600 hover:text-blue-800">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mb-4 text-slate-600">{p.excerpt}</p>
                    <small className="font-medium text-slate-400">
                      {new Date(p.created_at).toLocaleDateString()}
                    </small>
                  </article>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
