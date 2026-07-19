import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Brain,
  ArrowLeft,
  Pill,
  ShieldCheck,
  Syringe,
  Activity,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/prophylaxis")({
  head: () => ({
    meta: [
      { title: "Migraine Prophylaxis (NICE CG150) | Mira" },
      {
        name: "description",
        content:
          "Interactive summary of NICE CG150 prophylaxis of migraine with or without aura — first-line, further, and alternative treatment options.",
      },
      { property: "og:title", content: "Migraine Prophylaxis — NICE CG150" },
      {
        property: "og:description",
        content:
          "First-line, further, and alternative migraine prophylaxis based on NICE CG150 visual summary (updated 2025).",
      },
    ],
  }),
  component: Prophylaxis,
});

const FIRST_LINE = [
  {
    name: "Propranolol",
    dose: "Start 40 mg PO BD; titrate to 80–160 mg/day (max 240 mg/day)",
    contra: "Asthma, uncontrolled heart failure, bradycardia, heart block, hypotension, Raynaud’s.",
    adverse: "Fatigue, cold extremities, sleep disturbance, bradycardia, bronchospasm.",
    notes:
      "Use caution — MHRA/HSIB flagged toxicity and rapid deterioration in overdose. Screen for depression/self-harm risk before prescribing.",
    citations: [
      { label: "NICE CG150 §1.3.6 (prophylaxis first-line)", href: "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations#migraine-2" },
      { label: "MHRA — propranolol overdose safety update", href: "https://www.gov.uk/drug-safety-update/propranolol-risk-of-serious-harm-and-death-in-overdose" },
    ],
  },
  {
    name: "Topiramate",
    dose: "Start 25 mg PO nocte; titrate by 25 mg weekly to 50–100 mg/day in divided doses",
    contra:
      "Pregnancy and women of childbearing potential unless the Pregnancy Prevention Programme conditions are met; history of nephrolithiasis; narrow-angle glaucoma.",
    adverse:
      "Paraesthesia, cognitive slowing, weight loss, mood change, nephrolithiasis, metabolic acidosis, teratogenicity.",
    notes: "Follow MHRA 2024 safety measures. Off-label in children/young people.",
    citations: [
      { label: "NICE CG150 §1.3.6 (prophylaxis first-line)", href: "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations#migraine-2" },
      { label: "MHRA — topiramate new safety measures (2024)", href: "https://www.gov.uk/drug-safety-update/topiramate-topamax-introduction-of-new-safety-measures-including-a-pregnancy-prevention-programme" },
    ],
  },
  {
    name: "Amitriptyline",
    dose: "Start 10 mg PO nocte; titrate to 25–75 mg nocte (usual effective 25–50 mg)",
    contra: "Recent MI, arrhythmias, severe hepatic impairment, mania, concurrent MAOI.",
    adverse:
      "Sedation, dry mouth, constipation, weight gain, orthostatic hypotension, QT prolongation.",
    notes: "Off-label for migraine. Follow NICE guidance on antidepressant dependence/withdrawal.",
    citations: [
      { label: "NICE CG150 §1.3.7 (amitriptyline — off-label)", href: "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations#migraine-2" },
    ],
  },
];

const FURTHER_EPISODIC = [
  {
    name: "Rimegepant (TA906)",
    dose: "75 mg oral lyophilisate on/under tongue every other day",
    indication: "Episodic migraine — ≥4 and <15 attacks/month",
    contra: "Severe hepatic impairment; concomitant strong CYP3A4 inhibitors.",
    adverse: "Nausea, hypersensitivity, rare rash.",
    citations: [
      { label: "NICE TA906 — rimegepant for preventing migraine (2023)", href: "https://www.nice.org.uk/guidance/ta906" },
      { label: "NICE CG150 §1.3.9 (further options)", href: "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations#migraine-2" },
    ],
  },
];

const FURTHER_EPISODIC_OR_CHRONIC = [
  {
    name: "Atogepant (TA973)",
    dose: "10–60 mg PO once daily",
    contra: "Severe hepatic impairment; strong CYP3A4 inducers reduce efficacy.",
    adverse: "Nausea, constipation, fatigue, decreased appetite.",
    citations: [
      { label: "NICE TA973 — atogepant for preventing migraine (2024)", href: "https://www.nice.org.uk/guidance/ta973" },
    ],
  },
  {
    name: "Eptinezumab (TA871)",
    dose: "100 mg IV infusion every 12 weeks (may increase to 300 mg)",
    contra: "Hypersensitivity to CGRP monoclonal antibodies.",
    adverse: "Nasopharyngitis, infusion reactions, hypersensitivity.",
    citations: [
      { label: "NICE TA871 — eptinezumab for preventing migraine (2023)", href: "https://www.nice.org.uk/guidance/ta871" },
    ],
  },
  {
    name: "Fremanezumab (TA764)",
    dose: "225 mg SC monthly or 675 mg SC every 3 months",
    contra: "Hypersensitivity to CGRP mAbs; caution in severe cardiovascular disease.",
    adverse: "Injection-site reactions, hypersensitivity.",
    citations: [
      { label: "NICE TA764 — fremanezumab for preventing migraine (2022)", href: "https://www.nice.org.uk/guidance/ta764" },
    ],
  },
  {
    name: "Erenumab (TA682)",
    dose: "140 mg SC every 4 weeks (140 mg dose only per NICE)",
    contra: "Hypersensitivity; caution — post-marketing reports of hypertension and constipation.",
    adverse: "Constipation (may be severe), injection-site reactions, hypertension, muscle spasm.",
    citations: [
      { label: "NICE TA682 — erenumab for preventing migraine (2021)", href: "https://www.nice.org.uk/guidance/ta682" },
    ],
  },
  {
    name: "Galcanezumab (TA659)",
    dose: "240 mg SC loading dose, then 120 mg SC monthly",
    contra: "Hypersensitivity to CGRP mAbs.",
    adverse: "Injection-site reactions, hypersensitivity, constipation.",
    citations: [
      { label: "NICE TA659 — galcanezumab for preventing migraine (2020)", href: "https://www.nice.org.uk/guidance/ta659" },
    ],
  },
];

const CHRONIC = [
  {
    name: "Botulinum toxin type A (TA260)",
    dose: "155–195 units IM across 31–39 sites (PREEMPT protocol) every 12 weeks",
    indication: "Chronic migraine — ≥15 headache days/month with ≥8 migrainous days",
    contra:
      "Infection at injection sites; neuromuscular junction disorders (myasthenia, Lambert-Eaton, ALS); pregnancy.",
    adverse: "Neck pain, muscle weakness, ptosis, injection-site pain, headache.",
    citations: [
      { label: "NICE TA260 — botulinum toxin type A for chronic migraine (2012)", href: "https://www.nice.org.uk/guidance/ta260" },
    ],
  },
];

const ALTERNATIVE = [
  {
    name: "Acupuncture",
    dose: "Up to 10 sessions over 5–8 weeks",
    contra: "Bleeding disorders, anticoagulation (relative), local skin infection.",
    adverse: "Local bruising, transient soreness, rare pneumothorax.",
    notes: "Suitable for both adults and children.",
    citations: [
      { label: "NICE CG150 §1.3.8 (acupuncture)", href: "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations#migraine-2" },
    ],
  },
];

const STOPPING_CITATIONS = [
  { label: "NICE CG150 §1.3.10 (review & stopping rules)", href: "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations#migraine-2" },
  { label: "NICE CG150 visual summary (PDF)", href: "https://www.nice.org.uk/guidance/cg150/resources/visual-summary-on-prophylaxis-of-migraine-with-or-without-aura-pdf-15363542125" },
];

function Prophylaxis() {
  return (
    <div className="min-h-screen bg-[#ebe7df] text-[#2d2a33]">
      <header className="clay-header sticky top-0 z-10 mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="clay-icon h-10 w-10">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold">Mira</span>
        </Link>
        <Link
          to="/"
          className="text-sm text-[#2d2a33]/70 hover:text-[#2d2a33] flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-8 pb-16">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0b3d5c]/10 px-3 py-1 text-xs font-medium text-[#0b3d5c] mb-3">
            <ShieldCheck className="h-3.5 w-3.5" /> NICE CG150
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Prophylaxis of Migraine (with or without aura)
          </h1>
          <p className="text-[#2d2a33]/60 text-sm">
            Adapted from the NICE visual summary — headaches in over-12s. Discuss benefits,
            risks, comorbidities, and quality-of-life impact before starting prophylaxis.
          </p>
        </div>

        <div className="clay-alert error mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Clinical decision support only</p>
              <p className="opacity-90">
                Verify current NICE/MHRA guidance and local formulary before prescribing.
                Review need for continuing prophylaxis after 3–6 months.
              </p>
            </div>
          </div>
        </div>

        {/* FIRST LINE */}
        <Section
          icon={<Pill className="h-5 w-5" />}
          title="First-line treatment options"
          subtitle="After a full discussion of benefits, risks, and suitability, consider one of the following:"
        >
          <div className="grid gap-3">
            {FIRST_LINE.map((tx) => (
              <DrugCard key={tx.name} tx={tx} tone="a" />
            ))}
          </div>
          <p className="text-xs text-[#2d2a33]/60 mt-4">
            Review at 3–6 months. If the first option fails or is not tolerated, try a second,
            then the remaining option (unless unsuitable for safety reasons).
          </p>
        </Section>

        {/* FURTHER */}
        <Section
          icon={<Syringe className="h-5 w-5" />}
          title="Further treatment (adults only)"
          subtitle="Consider once ≥3 preventive medicines have failed, are not tolerated, or are unsuitable due to safety concerns."
        >
          <SubHeading label="Episodic migraine — ≥4 and <15 attacks/month" />
          <div className="grid gap-3 mb-5">
            {FURTHER_EPISODIC.map((tx) => (
              <DrugCard key={tx.name} tx={tx} tone="b" />
            ))}
          </div>

          <SubHeading label="Episodic or chronic migraine — ≥4 migraine days/month" />
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {FURTHER_EPISODIC_OR_CHRONIC.map((tx) => (
              <DrugCard key={tx.name} tx={tx} tone="b" />
            ))}
          </div>

          <SubHeading label="Chronic migraine — ≥15 headache days/month (≥8 migrainous)" />
          <div className="grid gap-3">
            {CHRONIC.map((tx) => (
              <DrugCard key={tx.name} tx={tx} tone="c" />
            ))}
          </div>
        </Section>

        {/* ALTERNATIVE */}
        <Section
          icon={<Activity className="h-5 w-5" />}
          title="Alternative treatment (adults & children)"
          subtitle="Use according to the person’s preferences, comorbidities, and risk of adverse events."
        >
          <div className="grid gap-3">
            {ALTERNATIVE.map((tx) => (
              <DrugCard key={tx.name} tx={tx} tone="alt" />
            ))}
          </div>
        </Section>

        {/* STOPPING RULES */}
        <div className="clay-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="h-5 w-5 text-[#0b3d5c]" />
            <h2 className="text-lg font-semibold">Review & stopping rules</h2>
          </div>
          <ul className="text-sm space-y-2 list-disc pl-5">
            <li>
              <strong>Rimegepant, CGRP mAbs, atogepant:</strong> stop after 12 weeks if attack
              frequency does not reduce by ≥50% (episodic) or ≥30% (chronic).
            </li>
            <li>
              <strong>Botulinum toxin type A:</strong> stop if headache days/month do not reduce
              by ≥30% after 2 cycles, or the condition converts to episodic migraine (fewer than
              15 headache days/month) for 3 consecutive months.
            </li>
            <li>
              <strong>All prophylaxis:</strong> review need to continue every 3–6 months. If
              already on another prophylaxis and migraine is well controlled, continue.
            </li>
          </ul>
          <CitationList citations={STOPPING_CITATIONS} className="mt-4" />
        </div>

        <a
          href="https://www.nice.org.uk/guidance/cg150"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-[#0b3d5c] hover:underline"
        >
          Source: NICE CG150 visual summary <ExternalLink className="h-3.5 w-3.5" />
        </a>

      </main>
    </div>
  );
}

function Section({ icon, title, subtitle, children }) {
  return (
    <div className="clay-card p-6 mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="clay-icon h-9 w-9">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-sm text-[#2d2a33]/70 mb-4">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

function SubHeading({ label }) {
  return (
    <div className="mb-2 mt-1">
      <span className="inline-block rounded-full bg-[#2d2a33]/8 px-3 py-1 text-xs font-semibold text-[#2d2a33]/80">
        {label}
      </span>
    </div>
  );
}

function DrugCard({ tx, tone }) {
  const border =
    tone === "a"
      ? "border-[#4b8b6b]/40"
      : tone === "c"
      ? "border-[#c8391a]/30"
      : tone === "alt"
      ? "border-[#0b3d5c]/25"
      : "border-[#d69838]/40";
  return (
    <div className={`rounded-xl border ${border} bg-white/60 p-4`}>
      <div className="flex items-center gap-2 mb-1">
        <Pill className="h-4 w-4 text-[#2d2a33]/70" />
        <p className="font-semibold text-sm">{tx.name}</p>
      </div>
      {tx.indication && (
        <p className="text-xs text-[#0b3d5c] mb-1">
          <span className="font-semibold">Indication:</span> {tx.indication}
        </p>
      )}
      <p className="text-sm text-[#2d2a33]/80">
        <span className="font-medium">Dose:</span> {tx.dose}
      </p>
      {tx.contra && (
        <p className="text-xs text-[#c8391a] mt-1">
          <span className="font-semibold">Contraindications:</span> {tx.contra}
        </p>
      )}
      {tx.adverse && (
        <p className="text-xs text-[#7a5312] mt-1">
          <span className="font-semibold">Adverse effects:</span> {tx.adverse}
        </p>
      )}
      {tx.notes && (
        <p className="text-xs text-[#2d2a33]/60 mt-1 italic">{tx.notes}</p>
      )}
    </div>
  );
}
