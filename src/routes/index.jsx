import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Brain, Shield, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft,
  Stethoscope, Sparkles, Clock, MapPin, Waves, Sun, Flame, RotateCcw, Heart,
} from "lucide-react";
import { diagnose, formatDifferentialResults } from "../utils/diagnostic-engine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mira — Understand your headache" },
      { name: "description", content: "A friendly, ICHD-3 based check-in for your headache. Takes about a minute." },
      { property: "og:title", content: "Mira — Understand your headache" },
      { property: "og:description", content: "Answer 5 quick questions. Get a clear, evidence-based read on what might be going on." },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    id: "duration",
    icon: Clock,
    title: "How long does it usually last?",
    hint: "A rough idea is perfect — pick the closest.",
    options: [
      { value: "minutes_15", label: "Under 15 min" },
      { value: "minutes_30", label: "15–30 min" },
      { value: "hours_2", label: "30 min – 2 hr" },
      { value: "hours_4", label: "2–4 hr" },
      { value: "hours_24", label: "4–24 hr" },
      { value: "hours_72", label: "1–3 days" },
    ],
  },
  {
    id: "location",
    icon: MapPin,
    title: "Where do you feel it most?",
    hint: "Wherever it lands hardest.",
    options: [
      { value: "unilateral", label: "One side" },
      { value: "bilateral", label: "Both sides" },
      { value: "orbit", label: "Around an eye" },
      { value: "diffuse", label: "All over" },
    ],
  },
  {
    id: "nausea",
    icon: Waves,
    title: "Any nausea or vomiting?",
    hint: "Even mild queasiness counts.",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "Not really" },
    ],
  },
  {
    id: "photophobia",
    icon: Sun,
    title: "Is light bothering you?",
    hint: "Bright rooms, screens, sunlight.",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  },
  {
    id: "intensity",
    icon: Flame,
    title: "How intense is the pain?",
    hint: "Trust your gut.",
    options: [
      { value: 1, label: "Mild" },
      { value: 2, label: "Moderate" },
      { value: 3, label: "Bad" },
      { value: 4, label: "Severe" },
      { value: 5, label: "The worst" },
    ],
  },
];

function Index() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const step = STEPS[stepIdx];
  const progress = Math.round(((stepIdx + (done ? 1 : 0)) / STEPS.length) * 100);

  const results = useMemo(() => {
    if (!done) return null;
    return formatDifferentialResults(diagnose(answers));
  }, [done, answers]);

  const pick = (value) => {
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    // Feels instant, then advance
    setTimeout(() => {
      if (stepIdx < STEPS.length - 1) {
        setStepIdx(stepIdx + 1);
      } else {
        setDone(true);
        // Smooth scroll to results
        setTimeout(() => {
          document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }, 220);
  };

  const back = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  const restart = () => {
    setAnswers({});
    setStepIdx(0);
    setDone(false);
    document.getElementById("diagnose")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#ebe7df] text-[#2d2a33]">
      <header className="clay-header sticky top-0 z-10 mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="clay-icon h-10 w-10 animate-soft-float">
            <Brain className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <span className="text-xl font-semibold">Mira</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#diagnose" className="text-[#2d2a33]/70 hover:text-[#2d2a33] transition-colors">Check-in</a>
          <Link to="/ed-migraine" className="text-[#2d2a33]/70 hover:text-[#2d2a33] transition-colors">ED Algorithm</Link>
          <Link to="/prophylaxis" className="text-[#2d2a33]/70 hover:text-[#2d2a33] transition-colors">Prophylaxis</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-4 pt-10 pb-8">
        <div className="text-center mb-8 animate-clay-pop">
          <div className="inline-flex items-center gap-2 clay-badge mb-4">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
            <span>Takes about a minute</span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl mb-3 leading-tight">Let's figure out<br/>what's going on.</h1>
          <p className="text-base text-[#2d2a33]/60 max-w-md mx-auto">
            Five quick questions. Honest, private, and grounded in the ICHD-3 clinical criteria.
          </p>
        </div>

        <div className="clay-alert warning mb-6 text-sm">
          <div className="flex items-start gap-2.5">
            <Shield className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={2.25} />
            <p><span className="font-semibold">Not a diagnosis.</span> Mira helps you understand patterns — it's not a substitute for a clinician.</p>
          </div>
        </div>

        {/* ONBOARDING FLOW */}
        <div id="diagnose" className="scroll-mt-24 clay-card p-6 md:p-8">
          {!done && (
            <>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-medium text-[#2d2a33]/60 mb-2">
                  <span>Question {stepIdx + 1} of {STEPS.length}</span>
                  <span>{progress}%</span>
                </div>
                <div className="clay-progress-track">
                  <div
                    className="clay-progress-fill transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Step */}
              <div key={step.id} className="animate-step-in">
                <div className="flex items-center gap-3 mb-1">
                  <div className="clay-icon h-9 w-9">
                    <step.icon className="h-4.5 w-4.5" strokeWidth={2.25} />
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold">{step.title}</h2>
                </div>
                <p className="text-sm text-[#2d2a33]/55 mb-5 ml-12">{step.hint}</p>

                <div className={`grid gap-2 ${step.options.length > 4 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"}`}>
                  {step.options.map((opt) => {
                    const selected = answers[step.id] === opt.value;
                    return (
                      <button
                        key={String(opt.value)}
                        onClick={() => pick(opt.value)}
                        className={`clay-pill clay-button-press text-sm font-medium ${selected ? "selected" : ""}`}
                      >
                        <span className="inline-flex items-center gap-2 justify-center w-full">
                          {selected && <CheckCircle2 className="h-4 w-4 animate-checkmark" strokeWidth={2.5} fill="currentColor" />}
                          <span>{opt.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nav */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={back}
                  disabled={stepIdx === 0}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2d2a33]/60 hover:text-[#2d2a33] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <span className="text-xs text-[#2d2a33]/40">Tap an answer to continue</span>
              </div>
            </>
          )}

          {/* RESULTS */}
          {done && results && (
            <div id="results" className="animate-step-in">
              <ResultsView results={results} onRestart={restart} />
            </div>
          )}
        </div>
      </section>

      {/* WHAT COMES NEXT */}
      {!done && (
        <section className="mx-auto max-w-3xl px-4 pb-12">
          <div className="clay-card p-6 md:p-8 text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/50 flex items-center justify-center animate-soft-float">
              <Heart className="h-7 w-7 text-[#c76a4a]" strokeWidth={2} fill="currentColor" />
            </div>
            <h3 className="font-semibold text-lg mb-1">You're doing great.</h3>
            <p className="text-sm text-[#2d2a33]/60 max-w-md mx-auto">
              When you finish the five questions, you'll see the most likely headache types, red flags to watch for, and what to do next.
            </p>
          </div>
        </section>
      )}

      <footer id="about" className="clay-footer py-10 mt-4">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-[#2d2a33]/50">
          <p className="font-medium text-[#2d2a33]/70">Mira</p>
          <p className="mt-1">Grounded in the International Classification of Headache Disorders (ICHD-3).</p>
          <p className="mt-2">For education, not diagnosis. When in doubt, call your clinician.</p>
        </div>
      </footer>
    </div>
  );
}

function ResultsView({ results, onRestart }) {
  const hasDiffs = results.differentials && results.differentials.length > 0;

  return (
    <>
      {results.priority === "emergency" && (
        <div className="clay-alert error mb-5 animate-clay-pop">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-6 w-6" strokeWidth={2.25} />
            <h3 className="text-lg font-bold">Please get care now.</h3>
          </div>
          <p className="mb-3 opacity-90">{results.content}</p>
          {results.alerts && (
            <ul className="mb-3 space-y-1 text-sm">
              {results.alerts.map((a, i) => <li key={i}>• {a.symptom}</li>)}
            </ul>
          )}
          <p className="font-semibold">Call emergency services or go to the ER.</p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div className="clay-icon h-9 w-9">
          <Stethoscope className="h-4.5 w-4.5" strokeWidth={2.25} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Here's what stood out</h2>
          <p className="text-xs text-[#2d2a33]/55">Ranked by how well your answers matched each pattern.</p>
        </div>
      </div>

      {hasDiffs ? (
        <div className="space-y-3">
          {results.differentials.slice(0, 3).map((diff, i) => (
            <div
              key={i}
              className={`clay-result-card p-5 ${i === 0 ? "highlight" : ""} animate-step-in`}
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
            >
              <div className="flex justify-between items-start mb-2 gap-3">
                <div>
                  <p className="font-semibold text-lg leading-tight">{diff.name}</p>
                  <p className="text-xs text-[#2d2a33]/50 mt-0.5">ICHD-3 · {diff.code}</p>
                </div>
                <span className={`clay-badge ${diff.confidence >= 70 ? "success" : diff.confidence >= 50 ? "warning" : ""}`}>
                  {diff.confidence}% match
                </span>
              </div>
              {diff.description && (
                <p className="text-sm text-[#2d2a33]/70 mt-2 leading-relaxed">{diff.description}</p>
              )}
              {diff.recommendation && (
                <div className="mt-3 text-sm clay-alert info">
                  <span className="font-medium">Next step: </span>{diff.recommendation}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Empty-but-friendly state
        <div className="text-center py-8">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/60 flex items-center justify-center animate-soft-float">
            <Sparkles className="h-7 w-7 text-[#c76a4a]" strokeWidth={2} />
          </div>
          <h3 className="font-semibold mb-1">No clear pattern yet.</h3>
          <p className="text-sm text-[#2d2a33]/60 max-w-sm mx-auto mb-5">
            Your answers don't line up neatly with a single type — that's actually pretty common. A full assessment can dig deeper.
          </p>
          <a href="/diagnostic" className="clay-link-button clay-button-press">
            Take the full check-in <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 items-center justify-between">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2d2a33]/60 hover:text-[#2d2a33] transition-colors"
        >
          <RotateCcw className="h-4 w-4" /> Start over
        </button>
        {hasDiffs && (
          <a href="/diagnostic" className="clay-link-button clay-button-press">
            Take the full check-in <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </>
  );
}
