import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <h1 className="text-3xl font-bold">Blog</h1>

      <div className="mt-8 space-y-6">
        {posts.map((p) => (
          <article key={p.slug} className="space-y-1">
            <h2 className="text-xl font-semibold">
              <Link className="underline underline-offset-4" href={`/blog/${p.slug}`}>
                {p.meta.title}
              </Link>
            </h2>
            <div className="text-sm opacity-70">{p.meta.date}</div>
            {p.meta.summary && <p className="opacity-80">{p.meta.summary}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
