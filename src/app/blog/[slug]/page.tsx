import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/date";

const postsDir = path.join(process.cwd(), "content", "posts");

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Frontmatter = {
  title?: string;
  date?: string;
  category?: string;
  summary?: string;
  tags?: string[];
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const filePathMdx = path.join(postsDir, `${slug}.mdx`);
  const filePathMd = path.join(postsDir, `${slug}.md`);

  const filePath = fs.existsSync(filePathMdx)
    ? filePathMdx
    : fs.existsSync(filePathMd)
    ? filePathMd
    : null;

  console.log("filePath:", filePath);

  if (!filePath) return notFound();

  const source = fs.readFileSync(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  return (
    <main>
      <h1 className="text-3xl font-bold">{frontmatter.title ?? slug}</h1>
      {frontmatter.date && <time
          dateTime={frontmatter.date}
          className="mt-2 block text-sm opacity-70"
        >
          {formatDate(frontmatter.date)}
        </time>}
      <article className="prose mt-8 max-w-none">{content}</article>
    </main>
  );
}
