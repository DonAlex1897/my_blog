export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold">About</h1>

      <div className="prose mt-6 max-w-none">
        <p>
          I’m Amin. I build software, and I use this blog
          to write down things I learn and things I want to remember.
        </p>

        <p>
          Topics: .NET, React, architecture tradeoffs, productivity, and random
          learning notes.
        </p>
      </div>
    </main>
  );
}
