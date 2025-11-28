"use client";
import React, { useMemo, useState } from "react";
import { Sparkles, Filter, PlayCircle, X, Quote } from "lucide-react";

// REAL EL BETHEL SERMON DATA + QUOTES
const SERMONS = [
  {
    title: "The Church That Speaks Up!",
    topic: "Courage",
    pain: "For those feeling their voice doesn't matter.",
    quote: "Silence itself can sometimes become sin. If the church stops feeling, the church stops speaking. God is calling us to care enough to speak up.",
    date: "Nov 2024",
    videoId: "sQ-xGqqLoBQ", 
  },
  {
    title: "Responding To Hard Questions",
    topic: "Grief",
    pain: "For those struggling to understand why God allows loss.",
    quote: "It is okay to ask God 'Why?' He is not intimidated by your pain. Your tears are a language that Heaven understands.",
    date: "Oct 2024",
    videoId: "H7OTdzRgSmA",
  },
  {
    title: "The Drama of Being Gifted!",
    topic: "Purpose",
    pain: "For those who feel burdened or isolated by their own talent.",
    quote: "Your gift was never meant to isolate you; it was meant to elevate others. The drama comes when we carry the weight alone.",
    date: "Sept 2024",
    videoId: "MybSuoaWvHg",
  },
  {
    title: "Ready For a 'When...'!",
    topic: "Patience",
    pain: "For those waiting on a promise that feels delayed.",
    quote: "God doesn't live in 'Right Now,' He lives in 'Already Done.' Your 'When' is coming, you just have to stay ready while you wait.",
    date: "Aug 2024",
    videoId: "XrZwOkYcjR0",
  },
  {
    title: "The Wheel of Circumstances",
    topic: "Resilience",
    pain: "For those feeling like life is spinning out of control.",
    quote: "The wheel turns, but the Hub remains still. If you stay centered in Christ, it doesn't matter how fast the circumstances spin around you.",
    date: "Aug 2024",
    videoId: "gWmR-JYKzQA",
  },
  {
    title: "Something God Can Build With",
    topic: "Faith",
    pain: "For those who feel they don't have enough to offer God.",
    quote: "God doesn't need your perfection; He needs your pieces. Give Him what you have left, and watch Him build a kingdom.",
    date: "July 2024",
    videoId: "oiuiaIUm5I8",
  },
  {
    title: "Valley Time!",
    topic: "Suffering",
    pain: "For those currently in a low season where God feels distant.",
    quote: "The Shepherd didn't say He would take you *around* the valley; He said He would walk with you *through* it.",
    date: "June 2024",
    videoId: "vrZRhx_Lek0",
  },
  {
    title: "Keep On Shining",
    topic: "Legacy",
    pain: "For those tired of serving and needing a reminder it matters.",
    quote: "Your light isn't for you. It's for the person stumbling in the dark three steps behind you. Don't dim it now.",
    date: "May 2024",
    videoId: "iYlPsutu6k0",
  },
  {
    title: "Rescuing The Prophet",
    topic: "Leadership",
    pain: "For those feeling the weight of supporting their leaders.",
    quote: "Even the strongest among us need a rope sometimes. Who is holding the rope for the man of God?",
    date: "April 2024",
    videoId: "qPJ0KBNwelY",
  },
  {
    title: "When God Opens Eyes",
    topic: "Vision",
    pain: "For those who feel stuck in a dead situation.",
    quote: "The situation didn't change, but your sight did. When God opens your eyes, you see an Army where you used to see an enemy.",
    date: "March 2024",
    videoId: "SclVSQ2AasM",
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
  const [selectedSermon, setSelectedSermon] = useState<typeof SERMONS[number] | null>(null);
  const [viewMode, setViewMode] = useState<"quote" | "video">("quote");

  const filtered = useMemo(
    () => (filter === "All" ? SERMONS : SERMONS.filter((s) => s.topic === filter)),
    [filter]
  );

  function openSermon(sermon: typeof SERMONS[number]) {
    setSelectedSermon(sermon);
    setViewMode("quote"); // Always start with the quote
  }

  function closeSermon() {
    setSelectedSermon(null);
    setViewMode("quote");
  }

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
              onClick={() => openSermon(s)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm transition hover:-translate-y-1 hover:border-white/20 hover:shadow-lg"
            >
              {/* Thumbnail Area with Play Button Overlay */}
              <div className="relative aspect-video w-full bg-gradient-to-br from-indigo-900/40 to-amber-700/20 p-0.5">
                <div className="h-full w-full overflow-hidden rounded-[1rem] bg-neutral-950 ring-1 ring-white/10">
                   <img 
                     src={`https://img.youtube.com/vi/${s.videoId}/hqdefault.jpg`} 
                     alt={s.title}
                     className="h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100" 
                   />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/50 p-3 backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-amber-500">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Badge topic={s.topic} />
                  <span className="text-xs text-neutral-400">{s.date}</span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-amber-200 transition-colors">{s.title}</h3>
                <p className="mt-1 text-sm italic text-neutral-300">{s.pain}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal: Quote -> Video */}
      {selectedSermon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl">
            <button 
              onClick={closeSermon}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Content Area */}
            <div className="aspect-video w-full">
              {viewMode === "quote" ? (
                // QUOTE MODE
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-neutral-900 to-black p-8 text-center">
                  <Quote className="mb-6 h-12 w-12 text-amber-400/20" />
                  <blockquote className="max-w-2xl text-2xl font-medium leading-relaxed text-white sm:text-3xl">
                    "{selectedSermon.quote}"
                  </blockquote>
                  <p className="mt-6 text-sm uppercase tracking-widest text-amber-400/80">
                    — Pastor Glass
                  </p>
                  
                  <button 
                    onClick={() => setViewMode("video")}
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-neutral-950 transition hover:bg-neutral-200"
                  >
                    <PlayCircle className="h-5 w-5" />
                    Watch Full Message
                  </button>
                </div>
              ) : (
                // VIDEO MODE
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedSermon.videoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}
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
      return { bg: "bg-indigo-600/20", text: "text-indigo-200", ring: "ring-indigo-400/30" };
    case "Grief":
      return { bg: "bg-slate-500/20", text: "text-slate-200", ring: "ring-slate-300/30" };
    case "Purpose":
      return { bg: "bg-amber-600/20", text: "text-amber-200", ring: "ring-amber-300/30" };
    case "Patience":
      return { bg: "bg-cyan-600/20", text: "text-cyan-200", ring: "ring-cyan-300/30" };
    case "Faith":
      return { bg: "bg-emerald-600/20", text: "text-emerald-200", ring: "ring-emerald-300/30" };
    case "Suffering":
      return { bg: "bg-rose-600/20", text: "text-rose-200", ring: "ring-rose-300/30" };
    default:
      return { bg: "bg-white/10", text: "text-neutral-200", ring: "ring-white/20" };
  }
}