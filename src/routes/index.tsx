import { createFileRoute } from "@tanstack/react-router";
import { Brain, Droplets, Moon, Activity, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mira — Track & Tame Your Headaches" },
      {
        name: "description",
        content:
          "Mira helps you log headaches, spot triggers, and find relief with a calm, science-backed daily companion.",
      },
      { property: "og:title", content: "Mira — Track & Tame Your Headaches" },
      {
        property: "og:description",
        content:
          "Log headaches, spot triggers, and find relief with a calm daily companion.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#1f2230]">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2230] text-[#f7f5ef]">
            <Brain className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Mira</span>
        </div>
        <nav className="hidden gap-8 text-sm text-[#1f2230]/70 md:flex">
          <a href="#features" className="hover:text-[#1f2230]">Features</a>
          <a href="#how" className="hover:text-[#1f2230]">How it works</a>
          <a href="#pricing" className="hover:text-[#1f2230]">Pricing</a>
        </nav>
        <a
          href="#get"
          className="rounded-full bg-[#1f2230] px-4 py-2 text-sm font-medium text-[#f7f5ef] transition hover:bg-[#2d3142]"
        >
          Get the app
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1f2230]/15 bg-white/60 px-3 py-1 text-xs font-medium text-[#1f2230]/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e07856]" />
              New · iOS & Android
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Quiet the noise in your head.
            </h1>
            <p className="mt-5 max-w-md text-lg text-[#1f2230]/70">
              Mira is a gentle headache tracker that learns your patterns,
              flags triggers, and helps you feel better — one day at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#get"
                className="rounded-full bg-[#e07856] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#cf6a4a]"
              >
                Start tracking free
              </a>
              <a
                href="#how"
                className="rounded-full border border-[#1f2230]/20 px-6 py-3 text-sm font-medium text-[#1f2230] transition hover:bg-white"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Phone mock */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[#e9e3d2] to-[#dcd3bb] blur-2xl opacity-70" />
            <div className="relative rounded-[2.5rem] border border-[#1f2230]/10 bg-white p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between text-xs text-[#1f2230]/60">
                <span>Today</span>
                <span>9:41</span>
              </div>
              <div className="rounded-2xl bg-[#f7f5ef] p-5">
                <p className="text-xs uppercase tracking-wider text-[#1f2230]/50">
                  How's your head?
                </p>
                <p className="mt-2 text-3xl font-semibold">Mild · 3/10</p>
                <div className="mt-4 flex gap-1.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 flex-1 rounded ${
                        i < 3 ? "bg-[#e07856]" : "bg-[#1f2230]/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { icon: Droplets, label: "Water" },
                  { icon: Moon, label: "Sleep" },
                  { icon: Activity, label: "Stress" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#1f2230]/10 p-3 text-center"
                  >
                    <Icon className="mx-auto h-5 w-5 text-[#1f2230]/70" />
                    <p className="mt-1 text-xs text-[#1f2230]/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
            Small inputs. Real insight.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Brain,
                title: "30-second log",
                desc: "Tap intensity, type, and what you ate or did. That's it.",
              },
              {
                icon: Activity,
                title: "Pattern detection",
                desc: "Mira spots the foods, sleep, and weather behind your flare-ups.",
              },
              {
                icon: Droplets,
                title: "Gentle reminders",
                desc: "Hydration and rest nudges that adapt to your week — never naggy.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#1f2230]/10 p-6"
              >
                <Icon className="h-6 w-6 text-[#e07856]" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-[#1f2230]/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Three steps to fewer headaches.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            ["Log", "When a headache hits, rate it in seconds."],
            ["Learn", "Mira maps triggers across sleep, diet, and stress."],
            ["Live better", "Get tailored tips to head off the next one."],
          ].map(([title, desc], i) => (
            <li key={title}>
              <span className="text-sm font-medium text-[#e07856]">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[#1f2230]/70">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing / CTA */}
      <section id="pricing" className="bg-[#1f2230] py-20 text-[#f7f5ef]">
        <div id="get" className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Free forever. Premium when you want more.
          </h2>
          <ul className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm">
            {[
              "Unlimited headache logging",
              "Weekly insight report",
              "Trigger detection across 20+ factors",
              "Export to share with your doctor",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-[#e07856]" />
                <span className="text-[#f7f5ef]/80">{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-10 inline-block rounded-full bg-[#e07856] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#cf6a4a]"
          >
            Download Mira
          </a>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-[#1f2230]/60">
        © 2026 Mira Health. Not a substitute for medical advice.
      </footer>
    </div>
  );
}
