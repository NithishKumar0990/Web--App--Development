import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-xl">Loading blog...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">My Blog</h1>
      
      {posts.length === 0 ? (
        <p className="text-slate-500">No posts published yet.</p>
      ) : (
        <div className="grid gap-8">
          {posts.map((p) => (
            <article key={p.id} className="bg-transparent p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <h2 className="text-2xl font-semibold mb-2">
                <a href={`/blog/${p.slug}`} className="text-blue-600 hover:text-blue-800">
                  {p.title}
                </a>
              </h2>
              <p className="text-slate-600 mb-4">{p.excerpt}</p>
              <small className="text-slate-400 font-medium">
                {new Date(p.created_at).toLocaleDateString()}
              </small>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}