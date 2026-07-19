import { createFileRoute, Link } from "@tanstack/react-router";
import edAcuteTreatmentAsset from "@/assets/ed-acute-treatment.png.asset.json";
import edDischargePrescriptionsAsset from "@/assets/ed-discharge-prescriptions.png.asset.json";
import { useState } from "react";
import {
  Brain,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Activity,
  Syringe,
  ShieldAlert,
  RotateCcw,
} from "lucide-react";

export const Route = createFileRoute("/ed-migraine")({
  head: () => ({
    meta: [
      { title: "ED Acute Migraine Treatment Algorithm | Mira" },
      {
        name: "description",
        content:
          "Interactive algorithm for parenteral treatment of acute migraine in the Emergency Department, based on 2025 AHS practice recommendations.",
      },
      { property: "og:title", content: "ED Acute Migraine Treatment Algorithm" },
      {
        property: "og:description",
        content:
          "Step-by-step ED algorithm for acute migraine parenteral therapy with 2025 evidence-based recommendations.",
      },
    ],
  }),
  component: EDMigraine,
});

const RED_FLAGS = [
  "Sudden thunderclap onset (peak <1 min)",
  "New neurologic deficit / altered consciousness",
  "Fever, neck stiffness, or meningismus",
  "Age >50 with new headache",
  "Immunocompromised or active cancer",
  "Pregnancy / postpartum",
  "Papilledema or new visual loss",
  "Post-trauma or anticoagulated",
];

const LEVEL_A = [
  {
    name: "Prochlorperazine",
    route: "IV",
    dose: "10 mg IV over 2 min (may repeat once at 30 min; max 20 mg)",
    contra: "QT prolongation, Parkinson disease, known phenothiazine hypersensitivity, children <2 y.",
    adverse: "Akathisia, dystonia, sedation, hypotension, QT prolongation.",
    notes: "Pre-treat with diphenhydramine 25 mg IV to reduce akathisia. Infuse slowly to limit hypotension.",
  },
  {
    name: "Greater Occipital Nerve Block",
    route: "Injection",
    dose: "Bupivacaine 0.5% or lidocaine 1–2%, 2–3 mL per side (bilateral)",
    contra: "Local infection or skull defect at injection site, local anesthetic allergy, coagulopathy.",
    adverse: "Local pain, transient dizziness, alopecia (with steroid), rare intravascular injection.",
    notes: "Landmark: 1/3 the distance from occipital protuberance to mastoid; aspirate before injection.",
  },
];

const LEVEL_B = [
  {
    name: "Metoclopramide",
    route: "IV",
    dose: "10 mg IV over ≥2 min (may repeat q30 min; max 30 mg)",
    contra: "GI obstruction/perforation, pheochromocytoma, seizure disorder, Parkinson disease.",
    adverse: "Akathisia, dystonia, drowsiness, diarrhea, rare NMS.",
  },
  {
    name: "Sumatriptan",
    route: "SC",
    dose: "6 mg SC (may repeat once after 1 h; max 12 mg/24 h)",
    contra: "CAD, uncontrolled HTN, prior stroke/TIA, hemiplegic or basilar migraine, pregnancy, ergot/MAOI within 24 h.",
    adverse: "Chest/throat tightness, flushing, paresthesias, injection-site reaction.",
  },
  {
    name: "Ketorolac",
    route: "IV",
    dose: "15–30 mg IV (max 60 mg/day; 15 mg if >65 y or <50 kg)",
    contra: "Active bleeding, peptic ulcer, renal impairment, NSAID allergy, 3rd-trimester pregnancy, perioperative CABG.",
    adverse: "GI bleeding, AKI, platelet dysfunction, bronchospasm.",
  },
  {
    name: "Dexketoprofen",
    route: "IV",
    dose: "50 mg IV over 15 min (may repeat q8h; max 150 mg/day)",
    contra: "Same NSAID class contraindications as ketorolac.",
    adverse: "Dyspepsia, AKI, bronchospasm, bleeding risk.",
  },
  {
    name: "Supraorbital Nerve Block",
    route: "Injection",
    dose: "Lidocaine 1–2% or bupivacaine 0.5%, 1–2 mL per side",
    contra: "Local infection, anesthetic allergy, coagulopathy.",
    adverse: "Local bruising, transient forehead numbness, rare vascular injection.",
  },
];

const LEVEL_C = [
  {
    name: "Dexamethasone",
    route: "IV",
    dose: "10 mg IV single dose (range 4–24 mg) at discharge",
    contra: "Systemic fungal infection, live-vaccine administration, uncontrolled diabetes.",
    adverse: "Transient hyperglycemia, insomnia, facial flushing, mood change.",
    notes: "Reduces 24–72 h headache recurrence; give once, not scheduled.",
  },
  {
    name: "Chlorpromazine",
    route: "IV",
    dose: "0.1 mg/kg IV (typically 12.5 mg) q15 min; max 37.5 mg",
    contra: "QT prolongation, hypotension, Parkinson disease, phenothiazine allergy.",
    adverse: "Orthostatic hypotension, sedation, EPS, QT prolongation.",
    notes: "Pre-load 500 mL NS to blunt hypotension.",
  },
  {
    name: "Haloperidol",
    route: "IV",
    dose: "2.5–5 mg IV in 100 mL NS over 15 min",
    contra: "QT prolongation, Parkinson disease, severe CNS depression.",
    adverse: "Akathisia, dystonia, QT prolongation, sedation.",
  },
  {
    name: "Droperidol",
    route: "IM/IV",
    dose: "2.5 mg IM/IV (may repeat once)",
    contra: "QTc >450 ms, known arrhythmia. Black-box warning for QT.",
    adverse: "Akathisia, sedation, hypotension, QT prolongation.",
  },
  {
    name: "Valproate sodium",
    route: "IV",
    dose: "500–1000 mg IV over 10 min",
    contra: "Pregnancy, hepatic disease, urea-cycle disorders, thrombocytopenia.",
    adverse: "Dizziness, nausea, hepatotoxicity, teratogenicity.",
  },
  {
    name: "Ketamine infusion (KIT)",
    route: "IV",
    dose: "Low-dose ketamine 0.5 mg/kg IV infused over 40 min, daily × 5 consecutive days. Pre-medicate with ondansetron 8 mg IV for nausea. Monitor 30 min post-infusion, then discharge with a known driver.",
    contra: "Uncontrolled or severe hypertension, unstable/active cardiovascular disease (ischemia, arrhythmia, decompensated HF), severe aortic disease or aneurysm, elevated intracranial or intraocular pressure, active psychosis or poorly-controlled schizophrenia/bipolar disorder, current substance use disorder involving ketamine or dissociatives, severe hepatic impairment, pregnancy or breastfeeding, known hypersensitivity to ketamine.",
    adverse: "Perceptual/dissociative symptoms, nausea/vomiting, dizziness, transient BP/HR changes, emergence reactions, rarely respiratory depression or laryngospasm.",
    eligibilityTitle: "KIT eligibility checklist",
    eligibility: [
      "Refractory migraine or chronic daily headache failing ≥2 preventive classes",
      "Age ≥18 years, able to consent",
      "Baseline BP <160/100 and HR 50–110; no active chest pain",
      "No unstable cardiac, cerebrovascular, or aneurysmal disease",
      "No active psychosis, mania, or uncontrolled severe psychiatric illness",
      "No history of ketamine/dissociative misuse",
      "Not pregnant or breastfeeding; effective contraception if applicable",
      "Hepatic and renal function acceptable for repeat dosing",
      "Fasting per local sedation policy; IV access secured",
      "Known driver arranged; no driving or safety-critical tasks for 24 h",
    ],
    readinessTitle: "Pre-infusion readiness (each session)",
    readinessGroups: [
      {
        heading: "Baseline tests & workup",
        items: [
          "12-lead ECG within 12 months (repeat if new cardiac symptoms); no QTc prolongation or significant arrhythmia",
          "Baseline vitals recorded: BP, HR, RR, SpO₂, temperature",
          "LFTs and renal panel within 3 months; TFTs if clinically indicated",
          "Urine β-hCG on day 1 for people of childbearing potential",
          "Urine drug screen if history suggests substance use",
          "Weight recorded today for accurate mg/kg dosing",
          "Medication reconciliation: hold benzodiazepines and stimulants where possible; review serotonergic and antihypertensive agents",
        ],
      },
      {
        heading: "Consent & psychological readiness",
        items: [
          "Written informed consent signed for KIT protocol (risks, benefits, dissociation, off-label use)",
          "Patient understands 5-day daily schedule and can commit",
          "PHQ-9 / GAD-7 baseline documented; suicidality screen negative or safety plan in place",
          "Support person contact recorded",
        ],
      },
      {
        heading: "Day-of readiness",
        items: [
          "NPO per local sedation policy (typically 6 h solids / 2 h clears)",
          "IV access patent; ondansetron 8 mg IV given for nausea prophylaxis",
          "Resuscitation trolley, suction, and reversal agents checked and in room",
          "Monitoring set: continuous ECG, SpO₂, BP cuff cycling every 15 min",
        ],
      },
      {
        heading: "Driver & discharge arrangements",
        items: [
          "Named driver confirmed and present at discharge (no taxi/rideshare alone)",
          "Responsible adult available at home for the evening",
          "Patient agrees: no driving, machinery, legal or financial decisions for 24 h",
          "Written post-infusion instructions given; 24/7 contact number provided",
          "Next session date/time confirmed and added to patient record",
        ],
      },
    ],
    notes: "Infusion suite with full resuscitation equipment. Continuous ECG, SpO₂, and BP every 15 min. Stop KIT and call the medical emergency team for new bradycardia, tachycardia, atrial fibrillation, symptomatic hypertension/hypotension, or any vital-sign change >20% from baseline.",
  },
  {
    name: "Acetylsalicylic acid",
    route: "IV",
    dose: "1000 mg IV",
    contra: "Active bleeding, peptic ulcer, aspirin allergy, children (Reye).",
    adverse: "GI bleeding, bronchospasm, tinnitus.",
  },
  {
    name: "Diclofenac",
    route: "IM",
    dose: "75 mg IM",
    contra: "NSAID class contraindications (see ketorolac).",
    adverse: "Injection-site pain, GI upset, AKI.",
  },
  {
    name: "Dipyrone (metamizole)",
    route: "IV",
    dose: "1–2 g IV over 15 min",
    contra: "Prior agranulocytosis, G6PD deficiency, pregnancy (3rd trimester).",
    adverse: "Rare agranulocytosis, hypotension with rapid infusion, hypersensitivity.",
    notes: "Not available in the US.",
  },
];

const AVOID = [
  { name: "Hydromorphone IV", level: "A – Must NOT offer" },
  { name: "Morphine IV", level: "C – May NOT offer" },
  { name: "Diphenhydramine IV as monotherapy", level: "C – May NOT offer" },
  { name: "Octreotide SC/IV", level: "C – May NOT offer" },
  { name: "Paracetamol / Acetaminophen IV", level: "C – May NOT offer" },
];

function EDMigraine() {
  const [step, setStep] = useState(0);
  const [redFlag, setRedFlag] = useState(null);
  const [firstLineResponse, setFirstLineResponse] = useState(null);
  const [secondLineResponse, setSecondLineResponse] = useState(null);

  const reset = () => {
    setStep(0);
    setRedFlag(null);
    setFirstLineResponse(null);
    setSecondLineResponse(null);
  };

  return (
    <div className="min-h-screen bg-[#ebe7df] text-[#2d2a33]">
      <header className="clay-header sticky top-0 z-10 mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="clay-icon h-10 w-10">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold">Mira</span>
        </Link>
        <Link to="/" className="text-sm text-[#2d2a33]/70 hover:text-[#2d2a33] flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-8 pb-16">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e05a2b]/10 px-3 py-1 text-xs font-medium text-[#e05a2b] mb-3">
            <Activity className="h-3.5 w-3.5" /> ED Protocol
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Acute Migraine in the Emergency Department
          </h1>
          <p className="text-[#2d2a33]/60 text-sm">
            Interactive parenteral treatment algorithm — based on 2025 AHS practice recommendations
            (update to Orr et al., 2016).
          </p>
        </div>

        <div className="clay-alert error mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Clinical decision support only</p>
              <p className="opacity-90">
                For use by trained clinicians. Confirm dosing, allergies, contraindications, and local
                protocols before administering any medication.
              </p>
            </div>
          </div>
        </div>

        {/* VISUAL REFERENCE CHARTS */}
        <div className="clay-card p-4 md:p-6 mb-8">
          <h2 className="text-lg font-semibold mb-1">Visual reference</h2>
          <p className="text-sm text-[#2d2a33]/60 mb-5">Printable at-a-glance charts for the ED and discharge.</p>
          <figure className="mb-6">
            <img
              src={edAcuteTreatmentAsset.url}
              alt="Migraine attack acute treatment in the ED — first-line medications, reassessment steps, and nerve block options"
              className="w-full h-auto rounded-2xl shadow-sm border border-black/5"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs text-[#2d2a33]/55 text-center">
              Acute treatment pathway — first- to third-line therapy and nerve blocks.
            </figcaption>
          </figure>
          <figure>
            <img
              src={edDischargePrescriptionsAsset.url}
              alt="Discharge prescriptions — acute options, preventive indications, preventive medications, and nutraceuticals"
              className="w-full h-auto rounded-2xl shadow-sm border border-black/5"
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs text-[#2d2a33]/55 text-center">
              Discharge prescriptions — acute, preventive, and nutraceutical options.
            </figcaption>
          </figure>
        </div>

        {/* STEP FLOW */}
        <div className="clay-card p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Interactive Pathway</h2>
            <button
              onClick={reset}
              className="text-xs text-[#2d2a33]/60 hover:text-[#2d2a33] flex items-center gap-1"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* Step 0 — triage */}
          {step === 0 && (
            <div>
              <StepHeader n={1} title="Confirm diagnosis & screen for red flags (SNOOP)" />
              <p className="text-sm mb-4 text-[#2d2a33]/70">
                Patient presents with headache consistent with migraine. Screen for any of the
                following:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 mb-5 text-sm">
                {RED_FLAGS.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <ShieldAlert className="h-4 w-4 text-[#e05a2b] mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setRedFlag(true);
                    setStep(99);
                  }}
                  className="clay-pill error"
                >
                  Any red flag present
                </button>
                <button
                  onClick={() => {
                    setRedFlag(false);
                    setStep(1);
                  }}
                  className="clay-pill success"
                >
                  No red flags → proceed
                </button>
              </div>
            </div>
          )}

          {/* Step 99 — imaging pathway */}
          {step === 99 && (
            <div>
              <StepHeader n="!" title="Investigate secondary cause first" tone="error" />
              <p className="text-sm mb-3">
                Do <strong>not</strong> proceed with the migraine algorithm until a secondary cause is
                excluded. Consider:
              </p>
              <ul className="text-sm space-y-1 mb-5 list-disc pl-5">
                <li>Non-contrast CT head (± CT angiogram / venogram)</li>
                <li>Lumbar puncture if SAH or meningitis suspected and CT negative</li>
                <li>Neurology / neurosurgery consultation as indicated</li>
              </ul>
              <button onClick={() => setStep(0)} className="clay-pill">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to start
              </button>
            </div>
          )}

          {/* Step 1 — first line */}
          {step === 1 && (
            <div>
              <StepHeader n={2} title="First-line parenteral therapy (Level A)" />
              <p className="text-sm mb-4 text-[#2d2a33]/70">
                Offer one of the following Level A treatments. Combining an antidopaminergic with a
                nerve block is reasonable in severe attacks.
              </p>
              <div className="grid gap-3 mb-5">
                {LEVEL_A.map((tx) => (
                  <TxCard key={tx.name} tx={tx} tone="a" />
                ))}
              </div>
              <div className="text-xs text-[#2d2a33]/60 mb-4">
                Add IV fluids only if clinically dehydrated (normal saline alone has no anti-migraine
                effect — Level U).
              </div>
              <p className="text-sm font-medium mb-2">Reassess at 60 minutes:</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setFirstLineResponse("good");
                    setStep(3);
                  }}
                  className="clay-pill success"
                >
                  <CheckCircle2 className="h-4 w-4" /> Adequate relief
                </button>
                <button
                  onClick={() => {
                    setFirstLineResponse("partial");
                    setStep(2);
                  }}
                  className="clay-pill"
                >
                  Partial / no relief
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — second line */}
          {step === 2 && (
            <div>
              <StepHeader n={3} title="Second-line rescue (Level B)" />
              <p className="text-sm mb-4 text-[#2d2a33]/70">
                Add or switch to a Level B agent. Avoid duplicating classes (e.g. two dopamine
                antagonists).
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {LEVEL_B.map((tx) => (
                  <TxCard key={tx.name} tx={tx} tone="b" />
                ))}
              </div>
              <p className="text-sm font-medium mb-2">Reassess at 60 minutes:</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSecondLineResponse("good");
                    setStep(3);
                  }}
                  className="clay-pill success"
                >
                  <CheckCircle2 className="h-4 w-4" /> Adequate relief
                </button>
                <button
                  onClick={() => {
                    setSecondLineResponse("partial");
                    setStep(4);
                  }}
                  className="clay-pill"
                >
                  Refractory
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — disposition */}
          {step === 3 && (
            <div>
              <StepHeader n={4} title="Prepare for discharge" tone="success" />
              <ul className="text-sm space-y-2 mb-5 list-disc pl-5">
                <li>
                  Give <strong>Dexamethasone 10 mg IV</strong> (Level C) to reduce 24–72 h recurrence.
                </li>
                <li>Ensure oral intake tolerated and pain ≤ 3/10 for 30 min.</li>
                <li>Provide bridge therapy (NSAID or triptan) and abortive plan.</li>
                <li>Arrange neurology / primary care follow-up; counsel on medication-overuse.</li>
                <li>Return precautions: new deficits, thunderclap, fever, or worsening pain.</li>
              </ul>
              <button onClick={reset} className="clay-pill">
                <RotateCcw className="h-3.5 w-3.5" /> Start new patient
              </button>
            </div>
          )}

          {/* Step 4 — refractory */}
          {step === 4 && (
            <div>
              <StepHeader n={4} title="Refractory migraine — Level C options" tone="warn" />
              <p className="text-sm mb-3 text-[#2d2a33]/70">
                Choose a single agent based on comorbidities and prior response. Do not stack multiple
                QT-prolonging or dopamine-antagonist drugs.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {LEVEL_C.map((tx) => (
                  <TxCard key={tx.name} tx={tx} tone="c" />
                ))}
              </div>
              <p className="text-sm mb-3">
                Reconsider secondary cause. Neurology consultation. Admission if intractable, dehydrated,
                or unable to tolerate oral intake.
              </p>
              <button onClick={reset} className="clay-pill">
                <RotateCcw className="h-3.5 w-3.5" /> Start new patient
              </button>
            </div>
          )}
        </div>

        {/* AVOID */}
        <div className="clay-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="h-5 w-5 text-[#c8391a]" />
            <h2 className="text-lg font-semibold">Do NOT offer</h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            {AVOID.map((a) => (
              <li key={a.name} className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-[#c8391a] mt-0.5 shrink-0" />
                <span>
                  <strong>{a.name}</strong>
                  <span className="text-[#2d2a33]/60"> — Level {a.level}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[#2d2a33]/60 mt-4">
            Opioids (especially hydromorphone) are ineffective for acute migraine and increase recurrence,
            revisits, and chronification risk.
          </p>
        </div>

        {/* EVIDENCE TABLE */}
        <div className="clay-card p-6">
          <h2 className="text-lg font-semibold mb-4">2025 Evidence Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[#2d2a33]/10">
                  <th className="py-2 pr-4 font-medium">Level</th>
                  <th className="py-2 pr-4 font-medium">Action</th>
                  <th className="py-2 font-medium">Treatments</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <EvidenceRow
                  level="A"
                  action="Must offer"
                  items="Prochlorperazine IV · Greater occipital nerve blocks"
                  tone="success"
                />
                <EvidenceRow
                  level="B"
                  action="Should offer"
                  items="Metoclopramide IV · Sumatriptan SC · Ketorolac IV · Dexketoprofen IV · Supraorbital nerve blocks"
                  tone="successLite"
                />
                <EvidenceRow
                  level="C"
                  action="May offer"
                  items="ASA IV · Chlorpromazine IV · Dexamethasone IV · Diclofenac IM · Dipyrone IV · Droperidol IM · Haloperidol IV · Valproate IV"
                  tone="neutral"
                />
                <EvidenceRow
                  level="C"
                  action="May NOT offer"
                  items="Diphenhydramine IV · Morphine IV · Octreotide SC/IV · Paracetamol IV"
                  tone="warn"
                />
                <EvidenceRow
                  level="A"
                  action="Must NOT offer"
                  items="Hydromorphone IV"
                  tone="error"
                />
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#2d2a33]/60 mt-4">
            Level U (insufficient evidence): DHE, ergotamine, ketamine, lidocaine, magnesium, meperidine,
            nalbuphine, propofol, promethazine, tramadol, SPG blocks, eptinezumab, and others.
          </p>
        </div>

        {/* ACUTE MIGRAINE MEDICATIONS MATRIX */}
        <div className="clay-card p-6 mt-8">
          <h2 className="text-lg font-semibold mb-1">Acute migraine medications — evidence matrix</h2>
          <p className="text-xs text-[#2d2a33]/60 mb-4">
            Rows = strength of recommendation. Columns = quality of evidence.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#2d2a33]/5">
                  <th className="py-2 px-3 text-left font-semibold border border-[#2d2a33]/10 w-32">Strength</th>
                  <th className="py-2 px-3 text-left font-semibold border border-[#2d2a33]/10">High</th>
                  <th className="py-2 px-3 text-left font-semibold border border-[#2d2a33]/10">Moderate</th>
                  <th className="py-2 px-3 text-left font-semibold border border-[#2d2a33]/10">Low</th>
                  <th className="py-2 px-3 text-left font-semibold border border-[#2d2a33]/10">Very low</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr>
                  <td className="py-2 px-3 border border-[#2d2a33]/10 font-semibold bg-[#4b8b6b]/15 text-[#2f5c46]">
                    Strong in favor
                  </td>
                  <td className="py-2 px-3 border border-[#2d2a33]/10">
                    <MedList items={[
                      "Paracetamol 1000 mg PO",
                      "Almotriptan 12.5 mg PO",
                      "Eletriptan 20 / 40 mg PO",
                      "Frovatriptan 2.5 mg PO",
                      "Naratriptan 1 / 2.5 mg PO",
                      "Rizatriptan 5 / 10 mg PO",
                      "Sumatriptan 50 / 100 mg PO",
                      "Sumatriptan 6 mg/mL SC",
                      "Sumatriptan 10 / 20 mg IN",
                      "Zolmitriptan 2.5 mg PO",
                      "ASA 500 mg + Paracetamol 500 mg + Caffeine 130 mg PO",
                      "Lasmiditan 50 / 100 / 200 mg PO",
                      "Rimegepant 75 mg PO",
                      "Ubrogepant 50 / 100 mg PO",
                      "Zavegepant 10 mg IN",
                    ]} />
                  </td>
                  <td className="py-2 px-3 border border-[#2d2a33]/10">
                    <MedList items={[
                      "ASA 1000 mg PO",
                      "Diclofenac 50 mg PO",
                      "ASA 900 mg + Metoclopramide 10 mg PO",
                    ]} />
                  </td>
                  <td className="py-2 px-3 border border-[#2d2a33]/10">
                    <MedList items={[
                      "Ibuprofen 200 / 400 / 600 mg PO",
                      "Sumatriptan 85 mg + Naproxen 500 mg PO",
                      "Rizatriptan 10 mg + Paracetamol 1000 mg PO",
                    ]} />
                  </td>
                  <td className="py-2 px-3 border border-[#2d2a33]/10">
                    <MedList items={["Naproxen 500 / 825 mg PO"]} />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 border border-[#2d2a33]/10 font-semibold bg-[#d69838]/15 text-[#7a5312]">
                    Weak in favor
                  </td>
                  <td className="py-2 px-3 border border-[#2d2a33]/10 text-[#2d2a33]/40">—</td>
                  <td className="py-2 px-3 border border-[#2d2a33]/10">
                    <MedList items={[
                      "Celecoxib 120 mg PO",
                      "Paracetamol 650 mg + Tramadol 75 mg PO",
                      "Zavegepant 20 mg IN",
                    ]} />
                  </td>
                  <td className="py-2 px-3 border border-[#2d2a33]/10">
                    <MedList items={[
                      "Diclofenac 50 mg SC",
                      "Ketorolac 31.5 mg IN",
                      "Ergotamine 2 mg + Caffeine 200 mg PO",
                    ]} />
                  </td>
                  <td className="py-2 px-3 border border-[#2d2a33]/10">
                    <MedList items={[
                      "Dexketoprofen 50 mg PO",
                      "Paracetamol 400 mg + Codeine 25 mg PO",
                      "Butorphanol 1 mg IN",
                    ]} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#2d2a33]/60 mt-4">
            PO = oral · SC = subcutaneous · IN = intranasal. Use lowest effective dose; avoid opioids and
            butalbital-containing combinations where possible. Screen for medication-overuse headache when
            acute use exceeds 10 days/month (triptans, ergots, opioids, combinations) or 15 days/month
            (simple analgesics).
          </p>
        </div>
      </main>
    </div>
  );
}

function MedList({ items }) {
  return (
    <ul className="space-y-1">
      {items.map((it) => (
        <li key={it} className="leading-snug">{it}</li>
      ))}
    </ul>
  );
}

function StepHeader({ n, title, tone }) {
  const bg =
    tone === "error"
      ? "bg-[#e05a2b] text-white"
      : tone === "success"
      ? "bg-[#4b8b6b] text-white"
      : tone === "warn"
      ? "bg-[#d69838] text-white"
      : "bg-[#2d2a33] text-white";
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${bg}`}>
        {n}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

function TxCard({ tx, tone }) {
  const border =
    tone === "a"
      ? "border-[#4b8b6b]/40"
      : tone === "c"
      ? "border-[#c8391a]/30"
      : "border-[#d69838]/40";
  return (
    <div className={`rounded-xl border ${border} bg-white/60 p-4`}>
      <div className="flex items-center gap-2 mb-1">
        <Syringe className="h-4 w-4 text-[#2d2a33]/70" />
        <p className="font-semibold text-sm">
          {tx.name} <span className="text-[#2d2a33]/60 font-normal">({tx.route})</span>
        </p>
      </div>
      <p className="text-sm text-[#2d2a33]/80"><span className="font-medium">Dose:</span> {tx.dose}</p>
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
      {tx.eligibility && tx.eligibility.length > 0 && (
        <div className="mt-3 rounded-lg border border-[#4b8b6b]/30 bg-[#4b8b6b]/8 p-3">
          <p className="text-xs font-semibold text-[#2f5c46] mb-1.5">
            {tx.eligibilityTitle || "Eligibility checklist"}
          </p>
          <ul className="space-y-1">
            {tx.eligibility.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-[#2d2a33]/80">
                <span className="mt-0.5 inline-block h-3.5 w-3.5 rounded border border-[#4b8b6b]/60 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tx.readinessGroups && tx.readinessGroups.length > 0 && (
        <div className="mt-3 rounded-lg border border-[#3a6ea5]/30 bg-[#3a6ea5]/8 p-3">
          <p className="text-xs font-semibold text-[#1f4571] mb-2">
            {tx.readinessTitle || "Pre-infusion readiness checklist"}
          </p>
          <div className="space-y-3">
            {tx.readinessGroups.map((g) => (
              <div key={g.heading}>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1f4571]/80 mb-1">{g.heading}</p>
                <ul className="space-y-1">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#2d2a33]/80">
                      <span className="mt-0.5 inline-block h-3.5 w-3.5 rounded border border-[#3a6ea5]/60 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {tx.notes && <p className="text-xs text-[#2d2a33]/60 mt-1 italic">{tx.notes}</p>}
    </div>
  );
}

function EvidenceRow({ level, action, items, tone }) {
  const badge =
    tone === "success"
      ? "bg-[#4b8b6b] text-white"
      : tone === "successLite"
      ? "bg-[#4b8b6b]/20 text-[#2f5c46]"
      : tone === "warn"
      ? "bg-[#d69838]/20 text-[#7a5312]"
      : tone === "error"
      ? "bg-[#c8391a] text-white"
      : "bg-[#2d2a33]/10 text-[#2d2a33]";
  return (
    <tr className="border-b border-[#2d2a33]/5">
      <td className="py-3 pr-4">
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${badge}`}>
          Level {level}
        </span>
      </td>
      <td className="py-3 pr-4 whitespace-nowrap text-sm">{action}</td>
      <td className="py-3 text-sm">{items}</td>
    </tr>
  );
}
