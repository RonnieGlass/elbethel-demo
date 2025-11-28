"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Lock,
  CheckCircle2,
  PlayCircle,
  X,
  ArrowRightCircle,
  Quote,
  BookOpen
} from "lucide-react";

const TOTAL_DAYS = 30;
const STORAGE_KEY = "resetHub.completedDays";

// DATA: Mapping the "El Bethel Master" Sermons to the 30-Day Reset Journey
const DAYS_DATA: Record<number, { title: string; subtitle: string; quote: string; sermonTitle: string; videoId: string; teaching?: string; action?: string }> = {
  1: {
    title: "Recalibrate",
    subtitle: "What does it profit a man to gain the world but lose his soul?",
    quote: "We can lose strength when seduced by worldly desires, just as Superman is weakened by Kryptonite. Don't trade your spiritual integrity for temporary pleasures.",
    sermonTitle: "Don't Lose It (Jan 28)",
    videoId: "dB2zykbthy0", // Placeholder ID
    teaching: "Priorities determine power. If we gain the whole world but starve our spirit, we are spiritually bankrupt.",
    action: "List 3 things you prioritized over God this week."
  },
  2: {
    title: "The Sound of Silence",
    subtitle: "Making room for the Savior in the private places.",
    // Sourced from "The Making Of A Strong House"
    quote: "We must make Jesus feel at home in every part of our lives—not just the 'public' areas, but the private ones too. You cannot just let Him into the living room but lock Him out of the basement.",
    sermonTitle: "The Making Of A Strong House",
    videoId: "qPJ0KBNwelY", // Placeholder ID
    teaching: "Noise is the enemy of intimacy. Pastor Glass taught that a strong house must be 'Savior-accommodating.' You cannot host a guest you never listen to. To build a strong house, you must lower the volume of the world so you can open the private doors of your heart to the whisper of the Spirit.",
    action: "Turn off the radio in the car today. Drive in silence and ask: 'Lord, are You comfortable in this home?'"
  },
  3: {
    title: "Breaking Agreement with Fear",
    subtitle: "Lift up your head. The King is coming in.",
    // Sourced from "Heads Up!"
    quote: "When you look down, you see the problem. When you lift up your head, you see the King of Glory. He is the Lord strong and mighty in battle.",
    sermonTitle: "Heads Up! (Oct 1)",
    videoId: "sQ-xGqqLoBQ", // Placeholder ID
    teaching: "We often look down in discouragement, but the command is to 'Lift up your heads, O ye gates!' As Pastor Glass preached, God is the Commander of all armies. When we shift our focus from the problem on the ground to the Commander in the Heavens, fear loses its grip.",
    action: "Physically lift your head when you pray today. Declare: 'The King of Glory is coming in.'"
  },
  4: {
    title: "Who God Says You Are",
    subtitle: "You are a city on a hill. You cannot be hidden.",
    quote: "God didn't light your lamp to put it under a basket. The world is dark, and your purpose is to shine. Let them see your good works.",
    sermonTitle: "Let's Get Lit! (Oct 22)",
    videoId: "SclVSQ2AasM" // Placeholder ID
  },
  5: {
    title: "The Discipline of Rest",
    subtitle: "Finding peace in the midst of the process.",
    quote: "He was wounded for our transgressions. Sometimes we must embrace the suffering to find the purpose, knowing that by His stripes, we are healed.",
    sermonTitle: "The Successful Suffering Servant",
    videoId: "vrZRhx_Lek0" // Placeholder ID
  },
  6: {
    title: "Worship as a Weapon",
    subtitle: "Unity commands the blessing.",
    quote: "Behold how good and pleasant it is! When we dwell together in unity, God doesn't just suggest a blessing—He commands it.",
    sermonTitle: "There, IT Is! (Feb 4)",
    videoId: "gWmR-JYKzQA" // Placeholder ID
  },
  7: {
    title: "Sabbath & Celebration",
    subtitle: "Living in the victory of the Resurrection.",
    quote: "If we only had hope in this life, we would be miserable. But He is risen! We live with purpose because the victory is already won.",
    sermonTitle: "He's Up Now! (March 31)",
    videoId: "H7OTdzRgSmA" // Placeholder ID
  },
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
    if (nextIncompleteDay <= 7) setOpenDay(nextIncompleteDay);
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
            const data = DAYS_DATA[day];
            // Demo logic: Unlock days 1-7
            const demoUnlocked = day <= 7;
            const isUnlocked = demoUnlocked || !!completed[day - 1];
            const isDone = !!completed[day];
            
            const title = data ? data.title : (isUnlocked ? "Unlocked" : "Locked");
            const subtitle = data 
                ? data.subtitle 
                : (isUnlocked ? "Ready when you are." : "Complete the previous day to unlock.");

            return (
              <button
                id={`day-card-${day}`}
                key={day}
                onClick={() => isUnlocked && data && setOpenDay(day)}
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
                <h3 className="mt-3 text-base font-medium text-white">{title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                  {subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Dynamic Day Modal */}
      {openDay && DAYS_DATA[openDay] && (
        <DayModal
          day={openDay}
          data={DAYS_DATA[openDay]}
          onClose={() => setOpenDay(null)}
          onMarkComplete={() => handleMarkComplete(openDay)}
          completed={!!completed[openDay]}
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

function DayModal({
  day,
  data,
  onClose,
  onMarkComplete,
  completed,
  celebrating,
}: {
  day: number;
  data: { title: string; quote: string; sermonTitle: string; videoId: string; teaching?: string; action?: string };
  onClose: () => void;
  onMarkComplete: () => void;
  completed: boolean;
  celebrating: boolean;
}) {
  const [mode, setMode] = useState<"quote" | "content">("quote");

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-white/20"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-5 h-full min-h-[500px]">
            {/* Sidebar / Progress */}
            <div className="hidden md:flex md:col-span-2 flex-col justify-between bg-neutral-900/50 p-8 border-r border-white/5">
                <div>
                    <span className="inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/20">Day {day}</span>
                    <h2 className="mt-4 text-3xl font-bold text-white">{data.title}</h2>
                    <div className="mt-6 flex items-start gap-3">
                        <BookOpen className="h-5 w-5 text-amber-400 mt-1" />
                        <div>
                            <p className="text-xs uppercase tracking-wider text-neutral-500">From the Sermon</p>
                            <p className="text-sm text-neutral-300 italic">"{data.sermonTitle}"</p>
                        </div>
                    </div>
                </div>
                
                {mode === "content" && (
                    <div className="mt-8">
                        <button
                            className="btn-primary w-full"
                            onClick={onMarkComplete}
                            disabled={completed}
                        >
                            {completed ? "Day Completed" : "Mark Complete"}
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-3 bg-black relative">
                {mode === "quote" ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-indigo-950 via-neutral-900 to-black">
                        <Quote className="h-12 w-12 text-amber-400/20 mb-6" />
                        <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-white">
                            "{data.quote}"
                        </blockquote>
                        <p className="mt-6 text-sm uppercase tracking-widest text-amber-400/80">— Pastor Glass</p>
                        <button 
                            onClick={() => setMode("content")}
                            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-neutral-950 transition hover:bg-neutral-200"
                        >
                            <PlayCircle className="h-5 w-5" />
                            Start Devotional
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col h-full overflow-y-auto">
                        {/* Video */}
                        <div className="aspect-video w-full bg-black shrink-0">
                             <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1`}
                                title="Devotional Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                        </div>
                        {/* Text Content */}
                        <div className="p-6 md:p-8 space-y-6">
                            {data.teaching && (
                                <div>
                                    <h4 className="text-sm font-semibold uppercase tracking-wide text-indigo-400">Teaching</h4>
                                    <p className="mt-2 text-neutral-300 leading-relaxed">{data.teaching}</p>
                                </div>
                            )}
                            {data.action && (
                                <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                                    <h4 className="text-sm font-semibold uppercase tracking-wide text-amber-400">Today's Action</h4>
                                    <p className="mt-1 text-white">{data.action}</p>
                                </div>
                            )}
                        </div>
                        {/* Mobile Controls */}
                        <div className="p-6 pt-0 md:hidden mt-auto">
                             <button
                                className="btn-primary w-full"
                                onClick={onMarkComplete}
                                disabled={completed}
                            >
                                {completed ? "Day Completed" : "Mark Complete"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {celebrating && <CelebrationOverlay />}
      </div>
    </div>
  );
}

function CelebrationOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
       <div className="absolute inset-0 bg-gradient-to-b from-amber-300/10 to-indigo-500/10" />
    </div>
  );
}

function spawnConfetti() {
  if (typeof document === "undefined") return;
  const root = document.getElementById("confetti-root");
  if (!root) return;

  const colors = ["#fde68a", "#fbbf24", "#c4b5fd", "#818cf8", "#f59e0b"];
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
    piece.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
    piece.style.borderRadius = "2px";
    // @ts-ignore
    piece.style.animation = `confetti-fall ${1.2 + Math.random() * 1.2}s ease-out forwards`;
    root.appendChild(piece);
    setTimeout(() => { try { root.removeChild(piece); } catch {} }, 2000);
  }
}