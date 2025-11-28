import React, { useMemo, useState } from "react";
import { Shirt, Clock, ParkingCircle, CheckCircle2 } from "lucide-react";

export default function PlanYourVisit() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bringingKids, setBringingKids] = useState(false);
  const upcomingSundays = useMemo(() => getNextSundays(10), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/plan-your-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          bringingKids: !!payload["bringingKids"],
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setSubmitted(true);
      form.reset();
      setBringingKids(false);
    } catch (err) {
      console.error("Submit failed", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <video
            className="h-full w-full object-cover opacity-60"
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-fallback.jpg"
          >
            <source
              src="/welcome-greeters-placeholder.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-amber-300">
                Welcome Home to El Bethel.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-200">
              We can&apos;t wait to meet you. Let us know you&apos;re coming,
              and we&apos;ll roll out the red carpet.
            </p>
            <div className="mt-10">
              <a href="#vip" className="btn-primary inline-flex items-center gap-2">
                Schedule Your VIP Visit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Form */}
      <section id="vip" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Schedule Your VIP Visit
              </h2>
              <p className="mt-2 text-sm text-neutral-300">
                Fill this out and a member of our host team will meet you at
                the front door, show you around, and help you get your kids
                checked in.
              </p>
            </div>

            {submitted ? (
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">You&apos;re on the list!</p>
                  <p className="text-sm text-emerald-200/90">
                    We&apos;ll send a confirmation with details shortly. We
                    can&apos;t wait to welcome you.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <LabeledInput
                    label="Name"
                    name="name"
                    placeholder="First & Last"
                    required
                  />
                  <LabeledInput
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <LabeledInput
                    type="tel"
                    label="Phone"
                    name="phone"
                    placeholder="(555) 123-4567"
                    required
                  />
                  <LabeledSelect
                    label="Which Sunday are you coming?"
                    name="sunday"
                    required
                  >
                    <option value="">Select a Sunday…</option>
                    {upcomingSundays.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </LabeledSelect>
                </div>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="bringingKids"
                    className="h-5 w-5 rounded border-white/20 bg-transparent text-amber-400 focus:ring-amber-400"
                    checked={bringingKids}
                    onChange={(e) => setBringingKids(e.target.checked)}
                  />
                  <span className="text-sm">
                    I&apos;m bringing kids{" "}
                    <span className="text-neutral-400">
                      (Pre-register them!)
                    </span>
                  </span>
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto"
                    disabled={loading}
                  >
                    {loading ? "Scheduling…" : "Reserve My VIP Visit"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="text-xl font-semibold">
                What happens when you arrive?
              </h3>
              <p className="mt-2 text-neutral-300">
                You&apos;ll be greeted by our Host Team, shown around campus,
                and we&apos;ll answer any questions you have. If you&apos;re
                bringing kids, we&apos;ll help you get them checked in quickly
                and safely.
              </p>
              <ul className="mt-4 list-disc pl-5 text-neutral-300/90">
                <li>Front door welcome with a smile</li>
                <li>Quick guided tour</li>
                <li>Save time with pre-check for kids</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/40 to-amber-700/20 p-8">
              <h4 className="text-lg font-semibold">
                Need to talk to someone first?
              </h4>
              <p className="mt-2 text-neutral-300">
                We&apos;re glad to help. Send us a note and we&apos;ll reach
                out.
              </p>
              <a
                href="#vip"
                className="mt-4 inline-block underline decoration-amber-400/70 underline-offset-4 hover:text-amber-300"
              >
                Contact the Host Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-white/5 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold">What to Expect</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ExpectCard
              icon={<Shirt className="h-6 w-6" />}
              title="Wear"
              text="Come as you are. Suit or jeans, you fit in."
            />
            <ExpectCard
              icon={<Clock className="h-6 w-6" />}
              title="Time"
              text="Service lasts about 90 minutes of powerful worship and word."
            />
            <ExpectCard
              icon={<ParkingCircle className="h-6 w-6" />}
              title="Parking"
              text="We have a saved spot just for you near the front."
            />
          </div>
        </div>
      </section>

      {/* Kids Ministry */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold">Safe. Fun. Jesus-Centered.</h2>
            <p className="mt-3 text-neutral-300">
              Our kids spaces are secure, staffed by trained leaders, and
              filled with age-appropriate Bible teaching and joy.
            </p>
            <div className="mt-6">
              <a href="#vip" className="btn-secondary inline-flex">
                Pre-Register Your Kids
              </a>
            </div>
          </div>
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-amber-400/20 to-indigo-400/20 p-0.5">
            <div className="h-full w-full rounded-[1rem] bg-neutral-950/60 ring-1 ring-white/10" />
          </div>
        </div>
      </section>

      {/* FAQ (short demo) */}
      <section className="bg-white/5 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-semibold">FAQ</h2>
          <div className="mt-8 rounded-2xl border border-white/10 bg-neutral-950/40 p-6 text-neutral-300">
            You&apos;re our guest — there&apos;s no pressure to give. Yes, there
            is coffee! And if you&apos;re running late, come on in; our host
            team will help you find a seat.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/40 to-amber-700/20 p-8 text-center">
          <h3 className="text-2xl font-semibold">Ready to plan your visit?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-neutral-300">
            We&apos;re saving you a spot and a warm welcome. Tell us you&apos;re
            coming and we&apos;ll take care of the rest.
          </p>
          <div className="mt-6">
            <a href="#vip" className="btn-primary inline-flex">
              Schedule Your VIP Visit
            </a>
          </div>
        </div>
      </section>

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

        .btn-secondary {
          @apply rounded-xl px-5 py-3 font-medium text-neutral-900 shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/60 active:scale-[0.99];
          background-color: rgb(252, 211, 77);
        }
      `}</style>
    </main>
  );
}

function LabeledInput({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-neutral-300">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/15 bg-neutral-900/60 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
      />
    </label>
  );
}

function LabeledSelect({
  label,
  name,
  children,
  required = false,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-neutral-300">{label}</span>
      <select
        name={name}
        required={required}
        className="w-full rounded-xl border border-white/15 bg-neutral-900/60 px-4 py-3 text-neutral-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
      >
        {children}
      </select>
    </label>
  );
}

function ExpectCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/10 p-2 ring-1 ring-white/10">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-neutral-300">{text}</p>
    </div>
  );
}

function getNextSundays(count: number) {
  const out: { label: string; value: string }[] = [];
  const now = new Date();
  const day = now.getDay();
  const diff = (7 - day) % 7 || 7;
  const start = new Date(now);
  start.setDate(now.getDate() + diff);
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i * 7);
    const label = d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const value = d.toISOString().split("T")[0];
    out.push({ label, value });
  }
  return out;
}
