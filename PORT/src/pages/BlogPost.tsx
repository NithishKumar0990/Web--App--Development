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
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium mb-8 inline-block">
        ← Back to Blog
      </Link>
      
      <article className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
        <small className="text-slate-500 block mb-8 border-b pb-4">
          Published on {new Date(post.created_at).toLocaleDateString()}
        </small>
        
        <div className="prose prose-slate max-w-none text-slate-700 leading-loose whitespace-pre-wrap">
          {post.body}
        </div>
      </article>
    </div>
  );
}