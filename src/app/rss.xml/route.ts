import { getAllPosts } from "@/lib/posts";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const siteUrl =
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const posts = getAllPosts(); 

  const itemsXml = posts
    .map((p) => {
      const url = `${siteUrl}/blog/${p.slug}`;
      const title = escapeXml(p.meta.title);
      const description = escapeXml(p.meta.summary ?? "");
      const pubDate = p.meta.date ? new Date(p.meta.date).toUTCString() : "";

      return `
        <item>
          <title>${title}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
          ${description ? `<description>${description}</description>` : ""}
        </item>
      `.trim();
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Amin Kaviani</title>
    <link>${siteUrl}</link>
    <description>Notes on software, learning, and whatever I’m working through.</description>
    <language>en</language>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
