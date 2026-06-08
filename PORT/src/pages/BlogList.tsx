import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
};

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts")
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

  if (loading) return <div className="p-8 text-center text-xl">Loading blog...</div>;

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
    <div className="mx-auto max-w-4xl px-4 py-12">
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
    </div>
  );
}
