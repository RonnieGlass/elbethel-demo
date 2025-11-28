"use client";
import React, { useMemo, useState } from "react";
import { Sparkles, Filter, PlayCircle, X } from "lucide-react";

// REAL EL BETHEL SERMON IDs
const SERMONS = [
  {
    title: "The Church That Speaks Up!",
    topic: "Courage",
    pain: "For those feeling their voice doesn't matter.",
    date: "Nov 2024",
    videoId: "sQ-xGqqLoBQ", 
  },
  {
    title: "Responding To Hard Questions",
    topic: "Grief",
    pain: "For those struggling to understand why God allows loss.",
    date: "Oct 2024",
    videoId: "H7OTdzRgSmA",
  },
  {
    title: "The Drama of Being Gifted!",
    topic: "Purpose",
    pain: "For those who feel burdened or isolated by their own talent.",
    date: "Sept 2024",
    videoId: "MybSuoaWvHg",
  },
  {
    title: "Ready For a 'When...'!",
    topic: "Patience",
    pain: "For those waiting on a promise that feels delayed.",
    date: "Aug 2024",
    videoId: "XrZwOkYcjR0",
  },
  {
    title: "The Wheel of Circumstances",
    topic: "Resilience",
    pain: "For those feeling like life is spinning out of control.",
    date: "Aug 2024",
    videoId: "gWmR-JYKzQA",
  },
  {
    title: "Something God Can Build With",
    topic: "Faith",
    pain: "For those who feel they don't have enough to offer God.",
    date: "July 2024",
    videoId: "oiuiaIUm5I8",
  },
  {
    title: "Valley Time!",
    topic: "Suffering",
    pain: "For those currently in a low season where God feels distant.",
    date: "June 2024",
    videoId: "vrZRhx_Lek0",
  },
  {
    title: "Keep On Shining",
    topic: "Legacy",
    pain: "For those tired of serving and needing a reminder it matters.",
    date: "May 2024",
    videoId: "iYlPsutu6k0", // 35th Anniversary Service
  },
  {
    title: "Rescuing The Prophet",
    topic: "Leadership",
    pain: "For those feeling the weight of supporting their leaders.",
    date: "April 2024",
    videoId: "qPJ0KBNwelY",
  },
  {
    title: "When God Opens Eyes",
    topic: "Vision",
    pain: "For those who feel stuck in a dead situation.",
    date: "March 2024",
    videoId: "SclVSQ2AasM", // "When Life Overwhelms You"
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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