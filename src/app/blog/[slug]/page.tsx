import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { getAllSlugs } from "@/lib/posts";

type Params = { slug: string };

const postsDir = path.join(process.cwd(), "content", "posts");

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: Params }) {
  const filePathMdx = path.join(postsDir, `${params.slug}.mdx`);
  const filePathMd = path.join(postsDir, `${params.slug}.md`);

  const filePath = fs.existsSync(filePathMdx)
    ? filePathMdx
    : fs.existsSync(filePathMd)
    ? filePathMd
    : null;

  if (!filePath) return notFound();

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const title = String(data.title ?? params.slug);
  const date = String(data.date ?? "");

  // For now we render raw markdown as plain text.
  // Later we’ll render MDX properly with next/mdx.
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">{title}</h1>
      {date && <div className="mt-2 text-sm opacity-70">{date}</div>}

      <pre className="mt-8 whitespace-pre-wrap leading-7">{content}</pre>
    </main>
  );
}
