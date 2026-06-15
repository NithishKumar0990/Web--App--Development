import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getApiUrl } from "../utils/api";
import { useSkeletonTransition } from "../hooks/useSkeletonTransition";
import { SkeletonBlogDetail } from "../components/ui/skeleton";

type Post = {
  title: string;
  slug: string;
  body: string;
  created_at: string;
};

const renderInlineCode = (text: string) => {
  const parts = text.split(/`/g);
  return parts.map((part, idx) => {
    if (idx % 2 !== 0) {
      return (
        <code
          key={idx}
          className="mx-1 rounded bg-slate-100 border border-slate-200/80 px-1.5 py-0.5 font-mono text-[0.85em] text-rose-600 font-semibold"
        >
          {part}
        </code>
      );
    }
    
    // Parse bold (**) and italic (*) inside the text parts
    const boldParts = part.split(/\*\*/g);
    return boldParts.map((boldPart, boldIdx) => {
      if (boldIdx % 2 !== 0) {
        return <strong key={boldIdx} className="font-bold text-slate-900">{boldPart}</strong>;
      }
      
      const italicParts = boldPart.split(/\*/g);
      return italicParts.map((italicPart, italicIdx) => {
        if (italicIdx % 2 !== 0) {
          return <em key={italicIdx} className="italic">{italicPart}</em>;
        }
        return italicPart;
      });
    });
  });
};

const renderPostBody = (body: string) => {
  if (!body) return null;

  // Split by triple backticks to isolate code blocks
  const blocks = body.split(/```/g);

  return blocks.map((block, blockIdx) => {
    // If it's a code block (odd index)
    if (blockIdx % 2 !== 0) {
      const lines = block.split("\n");
      let language = "";
      let code = block;

      if (lines.length > 0 && lines[0].trim().length > 0 && lines[0].trim().length < 15 && !lines[0].includes(" ") && !lines[0].includes(":") && !lines[0].includes(";") && !lines[0].includes("=")) {
        language = lines[0].trim();
        code = lines.slice(1).join("\n");
      }

      // Trim leading/trailing newlines
      code = code.replace(/^\n+|\n+$/g, "");

      return (
        <pre
          key={blockIdx}
          className="my-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-100 shadow-lg"
        >
          {language && (
            <div className="mb-2 -mt-4 -mx-4 border-b border-slate-800 bg-slate-800/60 px-4 py-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase select-none">
              {language}
            </div>
          )}
          <code className="block select-text">{code}</code>
        </pre>
      );
    }

    // It's normal text (even index). Parse line-by-line to properly split headings, lists, and rules.
    const lines = block.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        const paraText = currentParagraph.join(" ").trim();
        if (paraText) {
          elements.push(
            <p key={key} className="mb-4 leading-relaxed text-slate-700">
              {renderInlineCode(paraText)}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();

      // 1. Horizontal Rule
      if (trimmed === "---") {
        flushParagraph(`para-${lineIdx}`);
        elements.push(<hr key={`hr-${lineIdx}`} className="my-6 border-t border-slate-200" />);
        return;
      }

      // 2. Headings
      if (trimmed.startsWith("### ")) {
        flushParagraph(`para-${lineIdx}`);
        elements.push(
          <h3 key={`h3-${lineIdx}`} className="mt-6 mb-3 text-lg font-bold text-slate-900">
            {renderInlineCode(trimmed.substring(4))}
          </h3>
        );
        return;
      }
      if (trimmed.startsWith("## ")) {
        flushParagraph(`para-${lineIdx}`);
        elements.push(
          <h2 key={`h2-${lineIdx}`} className="mt-8 mb-4 text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
            {renderInlineCode(trimmed.substring(3))}
          </h2>
        );
        return;
      }
      if (trimmed.startsWith("# ")) {
        flushParagraph(`para-${lineIdx}`);
        elements.push(
          <h1 key={`h1-${lineIdx}`} className="mt-10 mb-6 text-2xl font-extrabold text-slate-900">
            {renderInlineCode(trimmed.substring(2))}
          </h1>
        );
        return;
      }

      // 3. Bullet list items
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushParagraph(`para-${lineIdx}`);
        elements.push(
          <li key={`li-${lineIdx}`} className="ml-6 list-disc pl-1 mb-2 text-slate-700 leading-relaxed">
            {renderInlineCode(trimmed.substring(2))}
          </li>
        );
        return;
      }

      // 4. Empty line (Paragraph Break)
      if (trimmed === "") {
        flushParagraph(`para-${lineIdx}`);
        return;
      }

      // 5. Normal text line accumulation
      currentParagraph.push(trimmed);
    });

    flushParagraph(`para-end-${blockIdx}`);

    return <Fragment key={blockIdx}>{elements}</Fragment>;
  });
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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showSkeleton } = useSkeletonTransition(loading);

  useEffect(() => {
    if (!slug) return;
    fetch(getApiUrl(`/api/posts/${slug}`))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => {
        console.error("Error fetching post:", err);
        setError("Could not retrieve post. Make sure the Laravel backend server is running and the database is accessible.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (error) return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center text-red-500">
      <h1 className="mb-4 text-2xl font-bold">Error Loading Post</h1>
      <p className="mb-6 text-slate-600">{error}</p>
      <Link to="/blog" className="inline-block font-medium text-blue-600 hover:text-blue-800">
        ← Back to Blog
      </Link>
    </div>
  );

  if (!showSkeleton && !post) return <div className="p-8 text-center text-xl text-red-500">Post not found</div>;

  return (
    <AnimatePresence mode="wait">
      {showSkeleton ? (
        <motion.div
          key="skeleton"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-busy="true"
        >
          <SkeletonBlogDetail />
        </motion.div>
      ) : post ? (
        <motion.div
          key="content"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="mx-auto max-w-3xl px-4 py-12">
            <Link to="/blog" className="mb-8 inline-block font-medium text-blue-600 hover:text-blue-800">
              ← Back to Blog
            </Link>

            <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <h1 className="mb-4 text-4xl font-bold text-slate-900">{post.title}</h1>
              <small className="mb-8 block border-b pb-4 text-slate-500">
                Published on {new Date(post.created_at).toLocaleDateString()}
              </small>

              <div className="prose prose-slate max-w-none leading-loose text-slate-700">
                {renderPostBody(post.body)}
              </div>
            </article>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
