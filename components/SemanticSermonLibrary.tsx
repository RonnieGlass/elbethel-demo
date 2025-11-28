"use client";
import React, { useMemo, useState } from "react";
import { Sparkles, Filter } from "lucide-react";

const SERMONS = [
  {
    title: "The Church That Speaks Up!",
    topic: "Courage",
    pain: "For those feeling their voice doesn't matter.",
    date: "Nov 2024",
  },
  {
    title: "Responding To Hard Questions",
    topic: "Grief",
    pain: "For those struggling to understand why God allows loss.",
    date: "Oct 2024",
  },
  {
    title: "The Drama of Being Gifted!",
    topic: "Purpose",
    pain: "For those who feel burdened or isolated by their own talent.",
    date: "Sept 2024",
  },
  {
    title: "Ready For a 'When...'!",
    topic: "Patience",
    pain: "For those waiting on a promise that feels delayed.",
    date: "Aug 2024",
  },
  {
    title: "The Wheel of Circumstances",
    topic: "Resilience",
    pain: "For those feeling like life is spinning out of control.",
    date: "Aug 2024",
  },
  {
    title: "Something God Can Build With",
    topic: "Faith",
    pain: "For those who feel they don't have enough to offer God.",
    date: "July 2024",
  },
  {
    title: "Valley Time!",
    topic: "Suffering",
    pain: "For those currently in a low season where God feels distant.",
    date: "June 2024",
  },
  {
    title: "Keep On Shining",
    topic: "Legacy",
    pain: "For those tired of serving and needing a reminder it matters.",
    date: "May 2024",
  },
  {
    title: "Rescuing The Prophet",
    topic: "Leadership",
    pain: "For those feeling the weight of supporting their leaders.",
    date: "April 2024",
  },
  {
    title: "When God Opens Eyes",
    topic: "Vision",
    pain: "For those who feel stuck in a dead situation.",
    date: "March 2024",
  },
] as const;

const FILTERS = [
  "All",
  "Courage",
  "Grief",
  "Purpose",
  "Patience",
  "Faith",
  "Suffering",
] as const;

type FilterType = (typeof FILTERS)[number];

export default function SemanticSermonLibrary() {
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered = useMemo(
    () => (filter === "All" ? SERMONS : SERMONS.filter((s) => s.topic === filter)),
    [filter]
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero / Filter bar */}
      <section className="border-b border-white/10 bg-neutral-950/80 py-10 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-amber-300" />
            <p className="text-sm tracking-wide text-neutral-300">
              Find by feeling — not by date.
            </p>
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
              What do you need today?
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300">
              <Filter className="h-3.5 w-3.5" /> Filters
            </span>

            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  "rounded-full px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-amber-400/50",
                  filter === f
                    ? "text-white shadow-md"
                    : "text-neutral-300 hover:text-white",
                ].join(" ")}
                style={filter === f ? primaryPillStyle : ghostPillStyle}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-4 flex items-center justify-between text-sm text-neutral-400">
          <div>
            {filtered.length} {filtered.length === 1 ? "sermon" : "sermons"} found
          </div>
          {filter !== "All" && (
            <button
              className="underline decoration-amber-400/70 underline-offset-4 hover:text-amber-300"
              onClick={() => setFilter("All")}
            >
              Clear filter
            </button>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((s, idx) => (
            <article
              key={idx}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm transition hover:shadow-lg"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-indigo-900/40 to-amber-700/20 p-0.5">
                <div className="h-full w-full rounded-[1rem] bg-neutral-950 ring-1 ring-white/10" />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Badge topic={s.topic} />
                  <span className="text-xs text-neutral-400">{s.date}</span>
                </div>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm italic text-neutral-300">{s.pain}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
                  <span className="rounded-full bg-white/5 px-2 py-1">
                    Tagged: {s.topic}
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-1">
                    Concierge
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const primaryPillStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(135deg, rgb(67,56,202) 0%, rgb(79,70,229) 20%, rgb(245,158,11) 100%)",
};

const ghostPillStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
};

function Badge({ topic }: { topic: string }) {
  const { bg, text, ring } = topicColors(topic);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${bg} ${text} ring-1 ${ring}`}
    >
      {topic}
    </span>
  );
}

function topicColors(topic: string) {
  switch (topic) {
    case "Courage":
      return {
        bg: "bg-indigo-600/20",
        text: "text-indigo-200",
        ring: "ring-indigo-400/30",
      };
    case "Grief":
      return {
        bg: "bg-slate-500/20",
        text: "text-slate-200",
        ring: "ring-slate-300/30",
      };
    case "Purpose":
      return {
        bg: "bg-amber-600/20",
        text: "text-amber-200",
        ring: "ring-amber-300/30",
      };
    case "Patience":
      return {
        bg: "bg-cyan-600/20",
        text: "text-cyan-200",
        ring: "ring-cyan-300/30",
      };
    case "Faith":
      return {
        bg: "bg-emerald-600/20",
        text: "text-emerald-200",
        ring: "ring-emerald-300/30",
      };
    case "Suffering":
      return {
        bg: "bg-rose-600/20",
        text: "text-rose-200",
        ring: "ring-rose-300/30",
      };
    default:
      return {
        bg: "bg-white/10",
        text: "text-neutral-200",
        ring: "ring-white/20",
      };
  }
}
