import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Amin’s Blog",
    template: "%s · Amin’s Blog",
  },
  description: "Notes on software, learning, and whatever I’m working through.",
};

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="hover:underline underline-offset-4" href={href}>
      {label}
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
      </head>
      <body>
        <header className="border-b">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold">
              Amin’s Blog
            </Link>

            <nav className="flex gap-5 text-sm">
              <NavLink href="/" label="Home" />
              <NavLink href="/blog" label="Blog" />
              <NavLink href="/about" label="About" />
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>

        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-3xl px-6 py-8 text-sm opacity-70 flex space-x-6">
            <div>© {new Date().getFullYear()} Amin Kaviani</div>
            <div>
              <a href="/rss.xml" className="underline underline-offset-4">
                Subscribe (RSS)
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
