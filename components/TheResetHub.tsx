"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Lock,
  CheckCircle2,
  PlayCircle,
  X,
  ArrowRightCircle,
} from "lucide-react";

const TOTAL_DAYS = 30;
const STORAGE_KEY = "resetHub.completedDays";

// DEMO VIDEO: "Something God Can Build With" (Used as Day 1 Devotional)
const DAY_1_VIDEO_ID = "oiuiaIUm5I8";

const WEEK1_TITLES: Record<number, string> = {
  1: "Recalibrate (Completed)",
  2: "The Sound of Silence",
  3: "Breaking Agreement with Fear",
  4: "Who God Says You Are",
  5: "The Discipline of Rest",
  6: "Worship as a Weapon",
  7: "Sabbath & Celebration",
};

export default function TheResetHub() {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCompleted(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {}
  }, [completed]);

  const days = useMemo(
    () => Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
    []
  );

  const completedCount = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed]
  );

  const progress = Math.round((completedCount / TOTAL_DAYS) * 100);

  const nextIncompleteDay = useMemo(() => {
    for (let d = 1; d <= TOTAL_DAYS; d++) {
      if (!completed[d]) return d;
    }
    return null;
  }, [completed]);

  function handleMarkComplete(day: number) {
    setCompleted((prev) => ({ ...prev, [day]: true }));
    setCelebrating(true);
    spawnConfetti();
    setTimeout(() => setCelebrating(false), 1800);
  }

  function handleContinue() {
    if (!nextIncompleteDay) return;
    const el = document.getElementById(`day-card-${nextIncompleteDay}`);
    const grid = document.getElementById("reset-grid");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    if (el) {
      el.classList.add("ring-2", "ring-amber-300", "animate-pulse");
      setTimeout(
        () =>
          el.classList.remove("ring-2", "ring-amber-300", "animate-pulse"),
        1600
      );
    }
    if (nextIncompleteDay === 1) setOpenDay(1);
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Sticky progress + continue bar */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <p className="text-sm tracking-wide text-neutral-300">
            Your Journey: {progress}% Complete
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-amber-300 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {completedCount > 0 && nextIncompleteDay && (
          <div className="border-t border-white/10 bg-white/5">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
              <div className="text-sm text-neutral-200">
                <span className="font-medium">Continue where you left off</span>
                : Next up — Day {nextIncompleteDay}
              </div>
              <button
                onClick={handleContinue}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Continue <ArrowRightCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
            The 30-Day Reset.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-300">
          Realign your heart. Renew your mind. 30 Days of focus.
        </p>
      </header>

      {/* Grid */}
      <section id="reset-grid" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {days.map((day) => {
            const demoUnlocked = day <= 7;
            const isUnlocked = demoUnlocked || !!completed[day - 1];
            const isDone = !!completed[day];
            const title =
              WEEK1_TITLES[day] || (isUnlocked ? "Unlocked" : "Locked");

            const subtitle =
              day === 1
                ? "Begin with stillness. Make space for God to speak."
                : WEEK1_TITLES[day]
                ? "Focused, practical formation for the day."
                : isUnlocked
                ? "Ready when you are."
                : "Complete the previous day to unlock.";

            return (
              <button
                id={`day-card-${day}`}
                key={day}
                onClick={() => isUnlocked && day === 1 && setOpenDay(day)}
                className={[
                  "group flex flex-col items-start rounded-2xl border p-4 text-left transition ring-offset-0",
                  isUnlocked
                    ? "border-white/15 bg-white/5 hover:bg-white/10"
                    : "cursor-not-allowed border-white/10 bg-neutral-900/60",
                ].join(" ")}
                aria-disabled={!isUnlocked}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm uppercase tracking-wide text-neutral-400">
                    Day {day}
                  </span>
                  {isUnlocked ? (
                    isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <PlayCircle className="h-5 w-5 text-amber-300" />
                    )
                  ) : (
                    <Lock className="h-5 w-5 text-neutral-500" />
                  )}
                </div>
                <h3 className="mt-3 text-base font-medium">{title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                  {subtitle}
                </p>
                {isUnlocked && day !== 1 && (
                  <p className="mt-3 text-xs text-neutral-500">
                    (Demo: tap Day 1 to view the devotional modal)
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Day 1 Modal */}
      {openDay === 1 && (
        <DayOneModal
          onClose={() => setOpenDay(null)}
          onMarkComplete={() => handleMarkComplete(1)}
          completed={!!completed[1]}
          celebrating={celebrating}
        />
      )}

      <div id="confetti-root" className="pointer-events-none fixed inset-0 z-50" />

      <style jsx global>{`
        .btn-primary {
          @apply rounded-xl px-5 py-3 font-medium text-white shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/60 active:scale-[0.99];
          background-image: linear-gradient(
            135deg,
            rgb(67, 56, 202) 0%,
            rgb(79, 70, 229) 20%,
            rgb(245, 158, 11) 100%
          );
        }
        .btn-ghost {
          @apply rounded-xl px-4 py-2 text-neutral-200 hover:bg-white/10;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10vh) rotate(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function DayOneModal({
  onClose,
  onMarkComplete,
  completed,
  celebrating,
}: {
  onClose: () => void;
  onMarkComplete: () => void;
  completed: boolean;
  celebrating: boolean;
}) {
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 top-10 mx-auto w-full max-w-3xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950">
          <button
            onClick={onClose}
            className="btn-ghost absolute right-3 top-3 z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* VIDEO PLAYER (Replaces Placeholder) */}
          <div className="aspect-video w-full bg-black">
             <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${DAY_1_VIDEO_ID}?autoplay=0`}
                title="Day 1 Devotional"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Scripture Focus
              </p>
              <blockquote className="text-2xl font-medium leading-snug text-neutral-100 sm:text-3xl">
                “Be still, and know that I am God.”{" "}
                <span className="text-neutral-400">— Psalm 46:10</span>
              </blockquote>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-wider text-neutral-300">
                Action Step
              </p>
              <p className="mt-2 text-neutral-200">
                Set a 10-minute timer today. Sit in stillness before the Lord.
                Breathe slowly. When distractions come, return to the Name of
                Jesus.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                className="btn-primary"
                onClick={onMarkComplete}
                disabled={completed}
              >
                {completed ? "Completed" : "Mark Complete"}
              </button>
              {completed && (
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm">We&apos;ve got you covered!</span>
                </div>
              )}
            </div>
          </div>

          {celebrating && <CelebrationOverlay />}
        </div>
      </div>
    </div>
  );
}

function CelebrationOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-300/5 to-indigo-500/5" />
    </div>
  );
}

function spawnConfetti() {
  if (typeof document === "undefined") return;
  const root = document.getElementById("confetti-root");
  if (!root) return;

  const colors = [
    "#fde68a",
    "#fbbf24",
    "#c4b5fd",
    "#818cf8",
    "#a5b4fc",
    "#f59e0b",
    "#eab308",
  ];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.style.position = "absolute";
    piece.style.top = "-10vh";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.width = Math.random() * 8 + 4 + "px";
    piece.style.height = Math.random() * 14 + 6 + "px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.opacity = "0";
    piece.style.transform = `translateY(0) rotate(${
      Math.random() * 360
    }deg)`;
    piece.style.borderRadius = "2px";
    // @ts-ignore
    piece.style.animation = `confetti-fall ${
      1.2 + Math.random() * 1.2
    }s ease-out forwards`;
    root.appendChild(piece);
    setTimeout(() => {
      try {
        root.removeChild(piece);
      } catch {}
    }, 2000);
  }
}