import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";

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
            <time
              dateTime={p.meta.date}
              className="mt-2 block text-sm opacity-70"
              >
              {formatDate(p.meta.date)}
              </time>
            {p.meta.summary && <p className="opacity-80">{p.meta.summary}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
