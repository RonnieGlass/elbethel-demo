import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold">
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
            El Bethel Demo Hub
          </span>
        </h1>
        <p className="mt-4 text-neutral-300">
          Three live demos showing how the website can serve real ministry.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href="/visit"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">Plan Your Visit</h2>
            <p className="mt-2 text-sm text-neutral-300">
              VIP Sunday experience.
            </p>
          </Link>

          <Link
            href="/reset"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">30-Day Reset</h2>
            <p className="mt-2 text-sm text-neutral-300">
              Daily spiritual calibration.
            </p>
          </Link>

          <Link
            href="/sermons"
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">Semantic Sermons</h2>
            <p className="mt-2 text-sm text-neutral-300">
              Find messages by what you feel.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
