import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">My Blog</h1>
      <p className="mt-4 opacity-80">
        Notes on software, learning, and whatever I’m working through.
      </p>

      <div className="mt-8">
        <Link className="underline" href="/blog">
          Go to Blog
        </Link>
      </div>
    </main>
  );
}
