import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-3xl font-bold">Amin’s Blog</h1>
      <p className="mt-4 opacity-80">
        Notes on software, learning, and whatever I’m working through.
      </p>

      <div className="mt-8">
        <Link className="underline underline-offset-4" href="/blog">
          Go to Blog
        </Link>
      </div>
    </main>
  );
}
