import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Brain, Shield, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft,
  Stethoscope, Sparkles, Clock, MapPin, Waves, Sun, Flame, RotateCcw,
  Activity, Pill, Siren, BookOpen, Zap, Lightbulb, Droplet, CloudRain, Syringe, Sparkle,
} from "lucide-react";

const TIPS = [
  {
    icon: Sparkle,
    tag: "New evidence",
    title: "Suzetrigine for headache pain",
    body: "In a single-center retrospective cohort, 67.5% of patients had improvement in headache symptoms on the newly approved non-opioid suzetrigine, with only 6.3% reporting worsening — side effects were tolerable.",
    citations: [
      { label: "AHS 2025 abstract", url: "https://americanheadachesociety.org/wp-content/uploads/2025/06/AHS-2025-Scientific-Program.pdf" },
      { label: "FDA: Journavx (suzetrigine)", url: "https://www.fda.gov/news-events/press-announcements/fda-approves-novel-non-opioid-treatment-moderate-severe-acute-pain" },
    ],
  },
  {
    icon: Pill,
    tag: "Acute & Preventive",
    title: "Gepants in Migraine",
    body: "Gepants (CGRP receptor antagonists) like Rimegepant and Atogepant provide a non-constricting alternative to triptans. Rimegepant is unique as it's licensed for both acute treatment and every-other-day prevention.",
    citations: [
      { label: "NICE TA906 (Rimegepant)", url: "https://www.nice.org.uk/guidance/ta906" },
      { label: "NICE TA973 (Atogepant)", url: "https://www.nice.org.uk/guidance/ta973" },
      { label: "AHS Gepant Consensus", url: "https://americanheadachesociety.org/wp-content/uploads/2021/01/AHS_Consensus_Statement_Update.pdf" },
    ],
  },
  {
    icon: CloudRain,
    tag: "Prevention",
    title: "Fremanezumab & weather-triggered attacks",
    body: "The CGRP monoclonal antibody fremanezumab appears to reduce the risk of weather-related attacks in some patients with episodic migraine — worth considering for weather-sensitive phenotypes.",
    citations: [
      { label: "Headache 2024 (fremanezumab & weather triggers)", url: "https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14680" },
    ],
  },
  {
    icon: Droplet,
    tag: "Lifestyle",
    title: "Saline instead of toothpaste",
    body: "Brushing with saline instead of toothpaste for 4 weeks cut weekly migraine frequency from 3 to 1, dropped median intensity to 0/10, and gave nearly a third complete freedom from migraine.",
    citations: [
      { label: "AAN 2025 abstract — saline brushing trial", url: "https://www.aan.com/AAN-Resources/Details/press-room/press-releases/" },
    ],
  },
  {
    icon: Syringe,
    tag: "GLP-1 signals",
    title: "GLP-1 RAs vs topiramate in chronic migraine",
    body: "Retrospective TriNetX study (AHS 2026): starting a GLP-1 was linked to 17% lower ED visits and 13% lower hospitalization compared to topiramate. Signals only; RCTs needed.",
    citations: [
      { label: "Acar et al., AHS 2026", url: "https://americanheadachesociety.org/annual-meeting/" },
      { label: "Liraglutide in chronic migraine (Headache 2024)", url: "https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.14624" },
    ],
  },
];

const TAC_SUBTYPES = [
  {
    type: "Cluster Headache",
    duration: "15 – 180 minutes",
    frequency: "1 every other day to 8 per day",
    feature: "Striking circadian (clock-like) rhythm. Treated acutely with 100% high-flow oxygen or subcutaneous triptans.",
    code: "3.1"
  },
  {
    type: "Paroxysmal Hemicrania",
    duration: "2 – 30 minutes",
    frequency: "Typically 5 to 40 per day",
    feature: "Absolute, diagnostic response to the anti-inflammatory drug indomethacin.",
    code: "3.2"
  },
  {
    type: "SUNCT / SUNA",
    duration: "1 – 600 seconds",
    frequency: "Up to 100+ times per day",
    feature: "Short, lightning-like stabs. Triggered by light facial touch. Managed primarily with lamotrigine.",
    code: "3.3"
  },
  {
    type: "Hemicrania Continua",
    duration: "Continuous (24/7)",
    frequency: "Constant baseline pain",
    feature: "Continuous baseline pain with spikes of autonomic severe pain. Also completely responsive to indomethacin.",
    code: "3.4"
  },
  {
    type: "NDPH",
    duration: "Continuous (from onset)",
    frequency: "Daily from first day",
    feature: "New Daily Persistent Headache. Clearly remembered onset date. Persistent from within 24 hours.",
    code: "4.10"
  }
];
import { diagnose, formatDifferentialResults } from "../utils/diagnostic-engine";
import heroImage from "../assets/hero-headache-glow.png.asset.json";
import { SkeletonResults } from "../components/Skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const GEPANTS = [
  {
    name: "Rimegepant",
    brand: "Vydura",
    indication: "Acute treatment AND every-other-day prevention.",
    timing: "Onset: 1-2 hours. Duration: Up to 48 hours.",
    safety: "Avoid in severe hepatic impairment. Nausea is common.",
    dose: "75 mg oral lyophilisate (ODT). Acute: max 75 mg/24h. Prevention: 75 mg every other day.",
    contra: "Severe hepatic impairment (Child-Pugh C). Strong CYP3A4 inhibitors.",
    adverse: "Nausea (3%), hypersensitivity reactions, rash.",
    citations: [
      { label: "NICE TA906", url: "https://www.nice.org.uk/guidance/ta906" },
      { label: "FDA: Vydura Label", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/212738s000lbl.pdf" }
    ]
  },
  {
    name: "Ubrogepant",
    brand: "Ubrelvy",
    indication: "Acute treatment only.",
    timing: "Onset: 1 hour. Relief peak: 2 hours.",
    safety: "Contraindicated with strong CYP3A4 inhibitors.",
    dose: "50 mg or 100 mg PO. May repeat after 2h (max 200 mg/24h).",
    contra: "Concomitant use with strong CYP3A4 inhibitors (e.g., ketoconazole).",
    adverse: "Nausea, somnolence, dry mouth.",
    citations: [
      { label: "FDA: Ubrelvy Label", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/211765s000lbl.pdf" }
    ]
  },
  {
    name: "Atogepant",
    brand: "Aquipta / Qulipta",
    indication: "Prevention only (Episodic & Chronic).",
    timing: "Steady state: 2 days. Efficacy: Assess at 12 weeks.",
    safety: "Monitor for weight loss and decreased appetite.",
    dose: "10 mg, 30 mg, or 60 mg PO once daily.",
    contra: "Severe hepatic impairment. Strong CYP3A4 inducers.",
    adverse: "Nausea, constipation, fatigue, decreased appetite.",
    citations: [
      { label: "NICE TA973", url: "https://www.nice.org.uk/guidance/ta973" },
      { label: "FDA: Qulipta Label", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215206s000lbl.pdf" }
    ]
  }
];

const TAC_SAFETY = [
  {
    category: "Indomethacin Response Testing",
    warnings: [
      "Absolute contraindication: Active peptic ulcer disease or severe renal impairment.",
      "Requires gastric protection: Always co-prescribe a PPI (e.g., omeprazole) during the test period.",
      "Dose titration: Typical test is 25mg TDS for 3 days, then 50mg TDS for 3 days, up to 75mg TDS if needed."
    ],
    priority: "critical"
  },
  {
    category: "High-Flow Oxygen (Cluster)",
    warnings: [
      "Standard of care: 100% oxygen at 12–15 L/min via a non-rebreathing mask.",
      "Safety: Ensure no smoking or open flames; caution in patients with severe COPD (risk of CO2 retention)."
    ],
    priority: "standard"
  },
  {
    category: "Triptans (Acute)",
    warnings: [
      "Subcutaneous sumatriptan 6mg is first-line for Cluster.",
      "Contraindications: Ischaemic heart disease, prior stroke/TIA, uncontrolled hypertension, or peripheral vascular disease."
    ],
    priority: "high"
  },
  {
    category: "Lamotrigine (SUNCT/SUNA)",
    warnings: [
      "Severe rash risk: Stevens-Johnson Syndrome (SJS) risk requires very slow titration (e.g., 25mg every other day or daily for 2 weeks).",
      "Immediate action: Stop immediately if any new rash or mouth sores develop."
    ],
    priority: "critical"
  }
];

const INTERACTION_RULES = [
  {
    id: "triptan_cvd",
    type: "contraindication",
    medication: "Triptans",
    condition: "Cardiovascular Disease",
    message: "Contraindicated in patients with ischaemic heart disease, prior stroke/TIA, or uncontrolled hypertension.",
    check: (answers) => answers.history_cvd === true
  },
  {
    id: "gepant_cyp3a4",
    type: "warning",
    medication: "Gepants (Ubrogepant/Rimegepant)",
    condition: "CYP3A4 Inhibitors",
    message: "Avoid use or reduce dose with strong CYP3A4 inhibitors (e.g. ketoconazole, clarithromycin).",
    check: (answers) => answers.meds_cyp3a4 === true
  },
  {
    id: "oxygen_copd",
    type: "precaution",
    medication: "High-Flow Oxygen",
    condition: "Severe COPD",
    message: "Use with caution in severe COPD due to risk of CO2 retention.",
    check: (answers) => answers.history_copd === true
  },
  {
    id: "indomethacin_pud",
    type: "contraindication",
    medication: "Indomethacin",
    condition: "Active PUD / Renal Impairment",
    message: "Absolute contraindication in active peptic ulcer disease or severe renal impairment.",
    check: (answers) => answers.history_pud === true || answers.history_renal === true
  }
];


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
  { id: "duration", icon: Clock, title: "How long does it usually last?", hint: "A rough idea is perfect — pick the closest.",
    options: [
      { value: "minutes_15", label: "Under 15 min" }, { value: "minutes_30", label: "15–30 min" },
      { value: "hours_2", label: "30 min – 2 hr" }, { value: "hours_4", label: "2–4 hr" },
      { value: "hours_24", label: "4–24 hr" }, { value: "hours_72", label: "1–3 days" },
    ] },
  { id: "location", icon: MapPin, title: "Where do you feel it most?", hint: "Wherever it lands hardest.",
    options: [
      { value: "unilateral", label: "One side" }, { value: "bilateral", label: "Both sides" },
      { value: "orbit", label: "Around an eye" }, { value: "diffuse", label: "All over" },
    ] },
  { id: "nausea", icon: Waves, title: "Any nausea or vomiting?", hint: "Even mild queasiness counts.",
    options: [{ value: true, label: "Yes" }, { value: false, label: "Not really" }] },
  { id: "photophobia", icon: Sun, title: "Is light bothering you?", hint: "Bright rooms, screens, sunlight.",
    options: [{ value: true, label: "Yes" }, { value: false, label: "No" }] },
  { id: "intensity", icon: Flame, title: "How intense is the pain?", hint: "Trust your gut.",
    options: [
      { value: 1, label: "Mild" }, { value: 2, label: "Moderate" }, { value: 3, label: "Bad" },
      { value: 4, label: "Severe" }, { value: 5, label: "The worst" },
    ] },
];

const MINI_APPS = [
  { to: "/ed-migraine", icon: Siren, title: "ED Acute Algorithm", desc: "AHS 2025 step-by-step pathway for acute migraine in the emergency department.", tag: "For clinicians" },
  { to: "/prophylaxis", icon: Pill, title: "Prophylaxis Guide", desc: "NICE CG150 preventive options with dose, contraindications, and stopping rules.", tag: "NICE CG150" },
  { to: "/diagnostic", icon: Activity, title: "Full ICHD-3 Check-in", desc: "A deeper diagnostic wizard with red-flag screening and differential ranking.", tag: "ICHD-3" },
];

const FEATURES = [
  { icon: Zap, title: "60-second read", desc: "Five questions, one clear picture — no medical jargon required." },
  { icon: Brain, title: "ICHD-3 grounded", desc: "Built on the International Classification of Headache Disorders, 3rd edition." },
  { icon: Shield, title: "Red-flag aware", desc: "Flags SNOOP10 warning signs so you know when to seek urgent care." },
  { icon: BookOpen, title: "Evidence linked", desc: "Every recommendation cites the AHS or NICE guideline it came from." },
];

function Index() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [computing, setComputing] = useState(false);
  const [tappedKey, setTappedKey] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedGepant, setSelectedGepant] = useState(null);

  const step = STEPS[stepIdx];
  const progress = Math.round(((stepIdx + (done ? 1 : 0)) / STEPS.length) * 100);

  const results = useMemo(() => {
    if (!done) return null;
    return formatDifferentialResults(diagnose(answers));
  }, [done, answers]);

  const pick = (value) => {
    const key = `${step.id}:${String(value)}`;
    setTappedKey(key);
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    setTimeout(() => {
      if (stepIdx < STEPS.length - 1) {
        setStepIdx(stepIdx + 1);
        setTappedKey(null);
      } else {
        setComputing(true);
        // Show skeleton so results feel immediate, then reveal
        setTimeout(() => {
          setDone(true);
          setComputing(false);
          setTimeout(() => {
            document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 60);
        }, 450);
      }
    }, 200);
  };

  const back = () => { if (stepIdx > 0) setStepIdx(stepIdx - 1); };
  const restart = () => {
    setAnswers({}); setStepIdx(0); setDone(false); setComputing(false);
    document.getElementById("diagnose")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen text-[#1a1330]" style={{ background: "linear-gradient(180deg, #fff7f0 0%, #fde5d3 40%, #f9d6e8 100%)" }}>
      {/* STICKY GLASS HEADER */}
      <header className="glass-header sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="feature-icon" style={{ width: 36, height: 36, borderRadius: 12 }}>
              <Brain className="h-4.5 w-4.5" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight">Mira</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#diagnose" className="text-[#1a1330]/70 hover:text-[#e84393] transition-colors">Check-in</a>
            <a href="#mini-apps" className="text-[#1a1330]/70 hover:text-[#e84393] transition-colors">Tools</a>
            <a href="#tac" className="text-[#1a1330]/70 hover:text-[#e84393] transition-colors">TACs</a>
            <a href="#gepants" className="text-[#1a1330]/70 hover:text-[#e84393] transition-colors">Gepants</a>
            <Link to="/ed-migraine" className="text-[#1a1330]/70 hover:text-[#e84393] transition-colors">ED</Link>
            <Link to="/prophylaxis" className="text-[#1a1330]/70 hover:text-[#e84393] transition-colors">Prophylaxis</Link>
          </nav>
          <a href="#diagnose" className="sunset-btn text-sm" style={{ padding: "0.55rem 1.1rem" }}>
            Start <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-clay-pop relative z-10">
            <div className="inline-flex items-center gap-2 clay-badge mb-5 bg-sunset" style={{ background: "var(--gradient-sunset)" }}>
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
              <span>ICHD-3 · AHS 2025 · NICE CG150</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
              A clinician's guide to{" "}
              <span className="text-sunset">headache</span>
            </h1>
            <p className="text-lg text-[#1a1330]/70 mb-8 max-w-md leading-relaxed">
              In one minute: an ICHD-3 pattern read, red-flag screen, and clear next steps — with AHS and NICE guidance built in.
            </p>


            <div className="flex flex-wrap gap-3">
              <a href="#diagnose" className="sunset-btn">
                Start the check-in <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#mini-apps" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#1a1330] bg-white/60 backdrop-blur border border-white/70 hover:bg-white/80 transition-all">
                Browse tools
              </a>
            </div>
            <div className="mt-8 flex items-center gap-5 text-xs text-[#1a1330]/60">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#e84393]" fill="currentColor" /> Private</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#e84393]" fill="currentColor" /> Evidence-based</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#e84393]" fill="currentColor" /> Free</span>
            </div>
          </div>

          <div className="relative aspect-square max-w-md mx-auto w-full">
            <div className="hero-glow" />
            <img
              src={heroImage.url}
              alt="Glowing profile silhouette illustrating headache energy"
              width={1024}
              height={1024}
              className="relative z-10 w-full h-full object-contain animate-pulse-glow"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="feature-card animate-step-in" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
              <div className="feature-icon mb-4">
                <f.icon className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <h3 className="font-semibold text-base mb-1.5 leading-tight">{f.title}</h3>
              <p className="text-sm text-[#1a1330]/65 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUESTION PREVIEW */}
      <section className="mx-auto max-w-3xl px-4 pb-10">
        <div className="clay-card p-5 md:p-6">
          <button
            onClick={() => setShowPreview((v) => !v)}
            className="w-full flex items-center justify-between gap-3 text-left"
            aria-expanded={showPreview}
          >
            <div className="flex items-center gap-3">
              <div className="feature-icon" style={{ width: 36, height: 36, borderRadius: 12 }}>
                <BookOpen className="h-4.5 w-4.5" strokeWidth={2.25} />
              </div>
              <div>
                <h3 className="font-semibold text-base leading-tight">Peek at the questions</h3>
                <p className="text-xs text-[#1a1330]/55">See all 5 before you start — no commitment.</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#e84393] shrink-0">
              {showPreview ? "Hide" : "Preview"}
            </span>
          </button>

          {showPreview && (
            <ol className="mt-5 space-y-2.5 animate-step-in">
              {STEPS.map((s, i) => (
                <li
                  key={s.id}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/50 border border-white/60"
                >
                  <div className="feature-icon shrink-0" style={{ width: 32, height: 32, borderRadius: 10 }}>
                    <s.icon className="h-4 w-4" strokeWidth={2.25} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight">
                      <span className="text-[#1a1330]/40 mr-1.5">{i + 1}.</span>
                      {s.title}
                    </p>
                    <p className="text-xs text-[#1a1330]/55 mt-1">
                      {s.options.map((o) => o.label).join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
              <li className="pt-2 flex justify-end">
                <a href="#diagnose" className="sunset-btn text-sm" style={{ padding: "0.55rem 1.1rem" }}>
                  Start the check-in <ArrowRight className="h-4 w-4" />
                </a>
              </li>
            </ol>
          )}
        </div>
      </section>

      {/* CHECK-IN */}
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <div className="clay-alert warning mb-6 text-sm">
          <div className="flex items-start gap-2.5">
            <Shield className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={2.25} />
            <p><span className="font-semibold">Not a diagnosis.</span> Mira helps you understand patterns — it's not a substitute for a clinician.</p>
          </div>
        </div>

        <div id="diagnose" className="scroll-mt-24 clay-card p-6 md:p-8">
          {!done && !computing && (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-medium text-[#1a1330]/60 mb-2">
                  <span>Question {stepIdx + 1} of {STEPS.length}</span>
                  <span>{progress}%</span>
                </div>
                <div className="clay-progress-track">
                  <div className="clay-progress-fill transition-all duration-500 ease-out"
                    style={{ width: `${progress}%`, background: "var(--gradient-sunset)" }} />
                </div>
              </div>

              <div key={step.id} className="animate-step-in">
                <div className="flex items-center gap-3 mb-1">
                  <div className="feature-icon" style={{ width: 36, height: 36, borderRadius: 12 }}>
                    <step.icon className="h-4.5 w-4.5" strokeWidth={2.25} />
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold">{step.title}</h2>
                </div>
                <p className="text-sm text-[#1a1330]/55 mb-5 ml-12">{step.hint}</p>

                <div className={`grid gap-2 ${step.options.length > 4 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2"}`}>
                  {step.options.map((opt) => {
                    const selected = answers[step.id] === opt.value;
                    const key = `${step.id}:${String(opt.value)}`;
                    const isTapped = tappedKey === key;
                    return (
                      <button
                        key={String(opt.value)}
                        onClick={() => pick(opt.value)}
                        className={`clay-pill clay-button-press text-sm font-medium ${selected ? "selected" : ""} ${isTapped ? "animate-tap" : ""}`}
                        style={selected ? { background: "var(--gradient-sunset)", color: "white" } : undefined}
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

              <div className="mt-6 flex items-center justify-between">
                <button onClick={back} disabled={stepIdx === 0}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a1330]/60 hover:text-[#1a1330] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <span className="text-xs text-[#1a1330]/40">Tap an answer to continue</span>
              </div>
            </>
          )}

          {computing && (
            <div className="animate-step-in">
              <div className="flex items-center gap-3 mb-5">
                <div className="feature-icon animate-pulse-glow"><Sparkles className="h-5 w-5" strokeWidth={2.25} /></div>
                <div>
                  <h2 className="text-lg font-semibold">Reading your answers…</h2>
                  <p className="text-xs text-[#1a1330]/55">Matching against ICHD-3 patterns.</p>
                </div>
              </div>
              <SkeletonResults />
            </div>
          )}

          {done && results && (
            <div id="results" className="animate-step-in">
              <ResultsView results={results} onRestart={restart} />
            </div>
          )}
        </div>
      </section>

      {/* MINI-APPS */}
      <section id="mini-apps" className="mx-auto max-w-6xl px-4 pb-20 scroll-mt-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            More <span className="text-sunset">tools</span>
          </h2>
          <p className="text-[#1a1330]/60 max-w-md mx-auto">Clinician-grade algorithms and prescriber references, always a tap away.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {MINI_APPS.map((m, i) => (
            <Link to={m.to} key={m.to}
              className="feature-card group animate-step-in block"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
              <div className="flex items-start justify-between mb-4">
                <div className="feature-icon"><m.icon className="h-5 w-5" strokeWidth={2.25} /></div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-white/70 text-[#e84393] border border-[#e84393]/20">{m.tag}</span>
              </div>
              <h3 className="font-semibold text-lg mb-1.5 leading-tight">{m.title}</h3>
              <p className="text-sm text-[#1a1330]/65 leading-relaxed mb-4">{m.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e84393] group-hover:gap-2.5 transition-all">
                Open <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* RESEARCH TIPS */}
      <section id="tips" className="mx-auto max-w-6xl px-4 pb-20 scroll-mt-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-white/70 text-xs font-semibold uppercase tracking-wider text-[#e84393] mb-3">
            <Lightbulb className="h-3.5 w-3.5" strokeWidth={2.5} /> Tips & fresh evidence
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Headache & migraine <span className="text-sunset">notes</span>
          </h2>
          <p className="text-[#1a1330]/60 max-w-lg mx-auto">Bite-size updates from recent studies and meetings — worth remembering in clinic.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {TIPS.map((t, i) => (
            <div key={t.title} className="feature-card animate-step-in"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "both" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="feature-icon"><t.icon className="h-5 w-5" strokeWidth={2.25} /></div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-white/70 text-[#e84393] border border-[#e84393]/20">{t.tag}</span>
              </div>
              <h3 className="font-semibold text-lg mb-1.5 leading-tight">{t.title}</h3>
              <p className="text-sm text-[#1a1330]/70 leading-relaxed">{t.body}</p>
              {t.citations && t.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#1a1330]/10 flex flex-wrap gap-1.5">
                  {t.citations.map((c) => (
                    <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/70 text-[#e84393] border border-[#e84393]/20 hover:bg-[#e84393] hover:text-white transition-colors">
                      <BookOpen className="h-3 w-3" strokeWidth={2.5} />
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TAC SECTION */}
      <section id="tac" className="mx-auto max-w-6xl px-4 pb-20 scroll-mt-24">
        <div className="clay-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon"><Zap className="h-5 w-5 text-[#e84393]" strokeWidth={2.25} /></div>
            <div>
              <h2 className="text-2xl font-bold">Trigeminal autonomic cephalalgias</h2>
              <p className="text-xs text-[#1a1330]/55 uppercase tracking-wider font-semibold">Diagnostic Subtypes & Criteria</p>
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[#1a1330]/10 text-[#1a1330]/60">
                  <th className="pb-3 pr-4 font-semibold">Subtype</th>
                  <th className="pb-3 pr-4 font-semibold">Attack Duration</th>
                  <th className="pb-3 pr-4 font-semibold">Daily Frequency</th>
                  <th className="pb-3 font-semibold">Key Feature / First-Line Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1330]/5">
                {TAC_SUBTYPES.map((t) => (
                  <tr key={t.type} className="hover:bg-white/40 transition-colors group">
                    <td className="py-4 pr-4 align-top">
                      <div className="font-bold text-[#1a1330]">{t.type}</div>
                      <div className="text-[10px] text-[#e84393] font-semibold opacity-70 mt-0.5">ICHD-3 {t.code}</div>
                    </td>
                    <td className="py-4 pr-4 align-top text-[#1a1330]/80">{t.duration}</td>
                    <td className="py-4 pr-4 align-top text-[#1a1330]/80">{t.frequency}</td>
                    <td className="py-4 align-top leading-relaxed text-[#1a1330]/80">
                      {t.feature}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#1a1330]/10 text-[11px] text-[#1a1330]/50 italic">
            Note: Hemicrania Continua and NDPH are persistent (daily) headaches. Episodic and Chronic variants exist for Cluster and Paroxysmal Hemicrania based on remission periods.
          </div>
        </div>
      </section>

      {/* TAC SAFETY PANEL */}
      <section id="tac-safety" className="mx-auto max-w-6xl px-4 pb-20 scroll-mt-24">
        <div className="clay-alert warning border-[#e84393]/20 bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-[32px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon bg-[#1a1330]"><Shield className="h-5 w-5 text-white" strokeWidth={2.5} /></div>
            <div>
              <h2 className="text-xl font-bold text-[#1a1330]">TAC Safety & Contraindications</h2>
              <p className="text-[10px] text-[#1a1330]/50 uppercase tracking-widest font-bold">Clinical Guidance & Warnings</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TAC_SAFETY.map((s) => (
              <div key={s.category} className="space-y-2">
                <h3 className="text-sm font-bold flex items-center gap-2 text-[#1a1330]">
                  <div className={`h-1.5 w-1.5 rounded-full ${s.priority === 'critical' ? 'bg-[#e84393]' : 'bg-[#f7931e]'}`} />
                  {s.category}
                </h3>
                <ul className="space-y-1.5">
                  {s.warnings.map((w, i) => (
                    <li key={i} className="text-xs text-[#1a1330]/70 leading-relaxed pl-3.5 relative">
                      <span className="absolute left-0 top-1.5 h-1 w-1 rounded-full bg-[#1a1330]/20" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEPANTS COMPARISON */}
      <section id="gepants" className="mx-auto max-w-6xl px-4 pb-20 scroll-mt-24">
        <div className="clay-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="feature-icon"><Pill className="h-5 w-5 text-[#e84393]" strokeWidth={2.25} /></div>
            <div>
              <h2 className="text-2xl font-bold">Gepants comparison</h2>
              <p className="text-xs text-[#1a1330]/55 uppercase tracking-wider font-semibold">CGRP Receptor Antagonists</p>
            </div>
          </div>
          
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[#1a1330]/10 text-[#1a1330]/60 text-[11px] uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-bold">Medication</th>
                  <th className="pb-3 pr-4 font-bold">Indication</th>
                  <th className="pb-3 pr-4 font-bold">Onset / Timing</th>
                  <th className="pb-3 font-bold">Key Safety</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1330]/5">
                {GEPANTS.map((g) => (
                  <tr 
                    key={g.name} 
                    className="hover:bg-white/40 transition-colors group cursor-pointer"
                    onClick={() => setSelectedGepant(g)}
                  >
                    <td className="py-4 pr-4 align-top">
                      <div className="font-bold text-[#1a1330] group-hover:text-[#e84393] transition-colors">{g.name}</div>
                      <div className="text-[10px] text-[#1a1330]/40 font-semibold mt-0.5">{g.brand}</div>
                    </td>
                    <td className="py-4 pr-4 align-top text-[#1a1330]/80 text-xs leading-relaxed">{g.indication}</td>
                    <td className="py-4 pr-4 align-top text-[#1a1330]/80 text-xs leading-relaxed">{g.timing}</td>
                    <td className="py-4 align-top text-[#1a1330]/80 text-xs leading-relaxed">
                      {g.safety}
                      <div className="mt-2 text-[10px] text-[#e84393] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Click for full details →</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GEPANT DETAIL SHEET */}
      <Sheet open={!!selectedGepant} onOpenChange={() => setSelectedGepant(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedGepant && (
            <div className="space-y-6 pt-4">
              <SheetHeader className="text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e84393]/10 text-[#e84393] text-[10px] font-bold uppercase tracking-widest w-fit mb-2">
                  Gepant · {selectedGepant.brand}
                </div>
                <SheetTitle className="text-2xl font-bold text-[#1a1330]">{selectedGepant.name}</SheetTitle>
                <SheetDescription className="text-sm text-[#1a1330]/70 leading-relaxed">
                  Clinical profile for {selectedGepant.name} based on AHS and NICE evidence.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#fff7f0] border border-[#ff6b35]/20">
                  <h4 className="text-xs font-bold text-[#ff6b35] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5" /> Dosing & Route
                  </h4>
                  <p className="text-sm text-[#1a1330] leading-relaxed font-medium">{selectedGepant.dose}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#1a1330]/5">
                    <h4 className="text-xs font-bold text-[#1a1330]/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" /> Timing
                    </h4>
                    <p className="text-sm text-[#1a1330]/80 leading-relaxed">{selectedGepant.timing}</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-[#f8d4d4]/30 border border-[#8a3a3a]/10">
                    <h4 className="text-xs font-bold text-[#8a3a3a] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5" /> Contraindications
                    </h4>
                    <p className="text-sm text-[#8a3a3a]/90 leading-relaxed">{selectedGepant.contra}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fdf5d3]/40 border border-[#b08a4c]/10">
                    <h4 className="text-xs font-bold text-[#b08a4c] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5" /> Common Adverse Effects
                    </h4>
                    <p className="text-sm text-[#1a1330]/80 leading-relaxed">{selectedGepant.adverse}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-[#1a1330]/40 uppercase tracking-wider px-1">Citations & Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGepant.citations.map((c) => (
                      <a 
                        key={c.url} 
                        href={c.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#1a1330]/10 text-xs text-[#e84393] font-semibold hover:bg-[#e84393] hover:text-white transition-all"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1a1330]/5">
                <button 
                  onClick={() => setSelectedGepant(null)}
                  className="w-full py-3 rounded-2xl bg-[#1a1330] text-white text-sm font-bold shadow-lg active:scale-[0.98] transition-all"
                >
                  Close Reference
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <footer className="py-10 mt-4" style={{ background: "linear-gradient(180deg, transparent, rgba(26,19,48,0.05))" }}>

        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-[#1a1330]/60">
          <p className="font-semibold text-[#1a1330]">Mira</p>
          <p className="mt-1">Grounded in ICHD-3, AHS 2025, and NICE CG150.</p>
          <p className="mt-2 text-xs">For education, not diagnosis. When in doubt, call your clinician.</p>
        </div>
      </footer>
    </div>
  );
}

function ResultsView({ results, onRestart }) {
  const hasDiffs = results.differentials && results.differentials.length > 0;
  
  const recommendations = useMemo(() => {
    if (!hasDiffs) return [];
    const top = results.differentials[0];
    const recs = [];
    
    if (top.category === 'migraine') {
      recs.push({ label: "Check Gepants for Migraine", href: "#gepants" });
      recs.push({ label: "View Prophylaxis Options", href: "/prophylaxis" });
    } else if (top.category === 'tac') {
      recs.push({ label: "TAC Subtypes Comparison", href: "#tac" });
      recs.push({ label: "TAC Safety & Contraindications", href: "#tac-safety" });
    } else if (top.id === 'ndph') {
      recs.push({ label: "Review NDPH Criteria", href: "#tac" });
    }
    
    // Always suggest mini-apps as a fall-back or additional resource
    recs.push({ label: "Clinician Tools", href: "#mini-apps" });
    
    return recs;
  }, [hasDiffs, results.differentials]);

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
        <div className="feature-icon"><Stethoscope className="h-5 w-5" strokeWidth={2.25} /></div>
        <div>
          <h2 className="text-xl font-semibold">Here's what stood out</h2>
          <p className="text-xs text-[#1a1330]/55">Ranked by how well your answers matched each pattern.</p>
        </div>
      </div>

      {hasDiffs ? (
        <div className="space-y-3">
          {results.differentials.slice(0, 3).map((diff, i) => (
            <div key={i}
              className={`clay-result-card p-5 ${i === 0 ? "highlight" : ""} animate-step-in`}
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both", ...(i === 0 ? { borderLeft: "4px solid #e84393" } : {}) }}>
              <div className="flex justify-between items-start mb-2 gap-3">
                <div>
                  <p className="font-semibold text-lg leading-tight">{diff.name}</p>
                  <p className="text-xs text-[#1a1330]/50 mt-0.5">ICHD-3 · {diff.code}</p>
                </div>
                <span className="clay-badge" style={{
                  background: diff.confidence >= 70 ? "linear-gradient(145deg,#4a9a6d,#3d8a5d)"
                    : diff.confidence >= 50 ? "var(--gradient-sunset)"
                    : "linear-gradient(145deg,#8a7a6a,#9a8a7a)"
                }}>
                  {diff.confidence}% match
                </span>
              </div>
              {diff.description && (
                <p className="text-sm text-[#1a1330]/70 mt-2 leading-relaxed">{diff.description}</p>
              )}
              {diff.recommendation && (
                <div className="mt-3 text-sm clay-alert info">
                  <span className="font-medium">Next step: </span>{diff.recommendation}
                </div>
              )}
            </div>
          ))}

          {recommendations.length > 0 && (
            <div className="mt-6 p-5 rounded-[24px] bg-white/40 border border-white/60 animate-step-in" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
              <h4 className="text-xs font-bold text-[#1a1330]/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Lightbulb className="h-3.5 w-3.5 text-[#e84393]" strokeWidth={2.5} /> Recommended Reading
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recommendations.map((rec, i) => (
                  rec.href.startsWith('#') ? (
                    <a 
                      key={i} 
                      href={rec.href}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white/40 text-sm font-semibold text-[#1a1330] hover:bg-white hover:border-[#e84393]/30 transition-all group"
                    >
                      {rec.label}
                      <ArrowRight className="h-3.5 w-3.5 text-[#e84393] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ) : (
                    <Link 
                      key={i} 
                      to={rec.href}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white/40 text-sm font-semibold text-[#1a1330] hover:bg-white hover:border-[#e84393]/30 transition-all group"
                    >
                      {rec.label}
                      <ArrowRight className="h-3.5 w-3.5 text-[#e84393] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="mx-auto mb-4 feature-icon animate-soft-float" style={{ width: 64, height: 64, borderRadius: 20 }}>
            <Sparkles className="h-7 w-7" strokeWidth={2} />
          </div>
          <h3 className="font-semibold mb-1">No clear pattern yet.</h3>
          <p className="text-sm text-[#1a1330]/60 max-w-sm mx-auto mb-5">
            Your answers don't line up neatly with a single type — that's actually pretty common. A full assessment can dig deeper.
          </p>
          <Link to="/diagnostic" className="sunset-btn">
            Take the full check-in <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 items-center justify-between">
        <button onClick={onRestart}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a1330]/60 hover:text-[#1a1330] transition-colors">
          <RotateCcw className="h-4 w-4" /> Start over
        </button>
        {hasDiffs && (
          <Link to="/diagnostic" className="sunset-btn">
            Take the full check-in <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </>
  );
}

