import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Blog</h1>

      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="space-y-1">
            <h2 className="text-xl font-semibold">
              <Link className="underline" href={`/blog/${post.slug}`}>
                {post.meta.title}
              </Link>
            </h2>

            <div className="text-sm opacity-70">{post.meta.date}</div>

            {post.meta.summary && (
              <p className="opacity-80">{post.meta.summary}</p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
