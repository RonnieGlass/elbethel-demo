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

// --- PASTOR GLASS CONTENT DATABASE ---
const DAYS_DATA: Record<number, { title: string; subtitle: string; quote: string; sermonTitle: string; videoId: string; teaching: string; action: string }> = {
  1: {
    title: "Recalibrate",
    subtitle: "What does it profit a man to gain the world but lose his soul?",
    quote: "We can lose strength when seduced by worldly desires, just as Superman is weakened by Kryptonite. Don't trade your spiritual integrity for temporary pleasures.",
    sermonTitle: "Don't Lose It (Jan 28)",
    videoId: "dB2zykbthy0",
    teaching: "Priorities determine power. Pastor Glass reminds us that 'Pride and earthly desires' can cause us to lose our soul. We must recalibrate our hearts to value the spiritual over the material.",
    action: "List 3 things you prioritized over God this week. Repent and reset."
  },
  2: {
    title: "The Sound of Silence",
    subtitle: "Making room for the Savior in the private places.",
    quote: "We must make Jesus feel at home in every part of our lives—not just the 'public' areas, but the private ones too. You cannot just let Him into the living room but lock Him out of the basement.",
    sermonTitle: "The Making Of A Strong House",
    videoId: "qPJ0KBNwelY",
    teaching: "Noise is the enemy of intimacy. To build a 'Savior-accommodating house,' you must lower the volume of the world so you can open the private doors of your heart to the whisper of the Spirit.",
    action: "Turn off the radio in the car today. Drive in silence and ask: 'Lord, are You comfortable in this home?'"
  },
  3: {
    title: "Breaking Agreement with Fear",
    subtitle: "Lift up your head. The King is coming in.",
    quote: "When you look down, you see the problem. When you lift up your head, you see the King of Glory. He is the Lord strong and mighty in battle.",
    sermonTitle: "Heads Up! (Oct 1)",
    videoId: "sQ-xGqqLoBQ",
    teaching: "We often look down in discouragement, but the command is to 'Lift up your heads!' God is the Commander of all armies. Shift your focus from the problem on the ground to the Commander in the Heavens.",
    action: "Physically lift your head when you pray today. Declare: 'The King of Glory is coming in.'"
  },
  4: {
    title: "Who God Says You Are",
    subtitle: "You are a city on a hill. You cannot be hidden.",
    quote: "God didn't light your lamp to put it under a basket. The world is dark, and your purpose is to shine. Let them see your good works.",
    sermonTitle: "Let's Get Lit! (Oct 22)",
    videoId: "SclVSQ2AasM",
    teaching: "You are the light of the world. Pastor Glass teaches that we must 'Get Lighter' by casting off burdens so we can shine brighter. Don't hide your testimony.",
    action: "Send an encouraging text to someone right now. Shine your light."
  },
  5: {
    title: "The Discipline of Rest",
    subtitle: "Finding peace in the midst of the process.",
    quote: "He was wounded for our transgressions. Sometimes we must embrace the suffering to find the purpose, knowing that by His stripes, we are healed.",
    sermonTitle: "The Successful Suffering Servant",
    videoId: "vrZRhx_Lek0",
    teaching: "Rest is not inactivity; it is trust. We rest in the finished work of the Suffering Servant. Your pain has a purpose when placed in His hands.",
    action: "Take 15 minutes to sit and do nothing but breathe. Trust Him with the outcome."
  },
  6: {
    title: "Worship as a Weapon",
    subtitle: "Unity commands the blessing.",
    quote: "Behold how good and pleasant it is! When we dwell together in unity, God doesn't just suggest a blessing—He commands it.",
    sermonTitle: "There, IT Is! (Feb 4)",
    videoId: "gWmR-JYKzQA",
    teaching: "Worship is warfare. When we unify our hearts and lift our voices, we command a blessing to fall. Confusion cannot stay where worship lives.",
    action: "Play worship music in your home for one hour today. Shift the atmosphere."
  },
  7: {
    title: "Sabbath & Celebration",
    subtitle: "Living in the victory of the Resurrection.",
    quote: "If we only had hope in this life, we would be miserable. But He is risen! We live with purpose because the victory is already won.",
    sermonTitle: "He's Up Now! (March 31)",
    videoId: "H7OTdzRgSmA",
    teaching: "We celebrate because the grave is empty. The Resurrection is the seal of your victory. Live today like a winner.",
    action: "Write down one victory God gave you this week. Celebrate it."
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
    // For demo purposes, we allow jumping to any of the first 7 days
    if (nextIncompleteDay <= 7) {
        setOpenDay(nextIncompleteDay);
    } else {
        // If they finished day 7, just open day 7 again for the demo
        setOpenDay(7);
    }
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
            const demoUnlocked = day <= 7;
            const isUnlocked = demoUnlocked || !!completed[day - 1];
            const isDone = !!completed[day];
            
            // Logic to ensure we show titles ONLY if data exists
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
                    : "