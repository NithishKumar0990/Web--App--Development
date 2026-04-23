import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Post = {
  title: string;
  slug: string;
  body: string;
  created_at: string;
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`http://127.0.0.1:8000/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="p-8 text-center text-xl">Loading post...</div>;
  if (!post) return <div className="p-8 text-center text-xl text-red-500">Post not found</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/blog" className="mb-8 inline-block font-medium text-blue-600 hover:text-blue-800">
        ← Back to Blog
      </Link>

      <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">{post.title}</h1>
        <small className="mb-8 block border-b pb-4 text-slate-500">
          Published on {new Date(post.created_at).toLocaleDateString()}
        </small>

        <div className="prose prose-slate max-w-none whitespace-pre-wrap leading-loose text-slate-700">
          {post.body}
        </div>
      </article>
    </div>
  );
}
