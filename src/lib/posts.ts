import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  title: string;
  date: string; // ISO string recommended
  category?: string;
  summary?: string;
  tags?: string[];
  draft?: boolean;
};

export type Post = {
  slug: string;
  meta: PostMeta;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    const meta: PostMeta = {
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      category: data.category ? String(data.category) : undefined,
      summary: data.summary ? String(data.summary) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    };

    return { slug, meta };
  });

  const includeDrafts = process.env.NODE_ENV !== "production";

  const filteredPosts = posts.filter((post) => {
    if (post.meta.draft) {
      return includeDrafts;
    }
    return true;
  });

  // newest first (expects date like "2025-01-01")
  filteredPosts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

  return filteredPosts;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
