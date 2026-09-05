import { useMemo, useState } from "react";
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
  Table as TableIcon,
  Search,
  X,
  Filter,
  Sparkles,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/prophylaxis")({
  head: () => ({
    meta: [
      { title: "Migraine Prophylaxis (NICE CG150) | Headache Mx" },
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

// Evidence matrices (International guideline — Table 1.4 episodic, Table 1.5 chronic).
// Rows = strength of recommendation, columns = quality of evidence.
const QUALITY_COLS = ["High", "Moderate", "Low", "Very low"];
const STRENGTH_ROWS = ["Strong in favor", "Weak in favor"];
const DRUG_CLASSES = ["CGRP", "Gepant", "Beta-blocker", "Antiepileptic", "TCA", "ARB/ACEi", "Toxin", "Other"];

// ----- AAN/AHS 2026 update -----
const AAN_AHS_CITATIONS = [
  { label: "AAN/AHS Migraine Prevention Guideline (Oct 2026) — Medscape", href: "https://www.medscape.com/viewarticle/new-migraine-prevention-guidelines-released-2026a1000wv9" },
  { label: "Migraine headache: prophylactic therapy — Medscape", href: "https://emedicine.medscape.com/article/1142556-treatment#d11" },
  { label: "Migraine headache: guidelines summary — Medscape", href: "https://emedicine.medscape.com/article/1142556-guidelines#g1" },
  { label: "NICE — Headaches in over 12s (CG150)", href: "https://reference.medscape.com/cc2/p10/headaches-over-12s-diagnosis-and-management-2022a10012gq" },
];

const AAN_ELIGIBILITY = [
  "≥4 migraine days/month",
  "≥4 moderate–severe headache days/month",
  "Substantial migraine-related disability",
  "Acute therapies fail, are overused (>2 days/week), or are contraindicated",
];

// Higher-confidence preventive options by indication (AAN/AHS 2026)
const AAN_EFFICACY = [
  {
    indication: "Episodic migraine",
    drugs: ["Atogepant", "Eptinezumab", "Erenumab", "Fremanezumab", "Galcanezumab", "Propranolol", "Topiramate", "Valproate"],
  },
  {
    indication: "Chronic migraine",
    drugs: ["Atogepant", "Eptinezumab", "Erenumab", "Fremanezumab", "Galcanezumab", "OnabotulinumtoxinA", "Topiramate", "Valproate"],
  },
];

// Oral preventive evidence levels (AAN/AHS)
const AAN_EVIDENCE_LEVELS = [
  {
    level: "Level A — established effective",
    tone: "a",
    items: [
      "Topiramate; divalproex / sodium valproate (antiepileptics)",
      "β-blockers: propranolol, metoprolol, timolol",
    ],
  },
  {
    level: "Level B — probably effective",
    tone: "b",
    items: ["Amitriptyline, venlafaxine", "Atenolol, nadolol"],
  },
  {
    level: "Level C — possibly effective",
    tone: "alt",
    items: ["Lisinopril, candesartan, clonidine, guanfacine, carbamazepine", "Several other β-blockers"],
  },
];

// Comorbidity-guided selection (AAN/AHS 2026)
const AAN_COMORBIDITIES = [
  { condition: "Hypertension", choice: "Consider enalapril, nifedipine, or telmisartan" },
  { condition: "Fibromyalgia", choice: "Offer amitriptyline" },
  { condition: "Increased BMI", choice: "Topiramate is the preferred oral option" },
  { condition: "Medication overuse", choice: "Consider CGRP mAbs, atogepant, onabotulinumtoxinA, or topiramate" },
];

// Pregnancy guidance (AAN/AHS 2026)
const AAN_PREGNANCY = [
  {
    tag: "First-line",
    tone: "a",
    text: "Maximize nonpharmacologic measures and avoid known teratogens. CCBs / antihistamines show the least fetal-risk signal in research.",
  },
  {
    tag: "Preferred drug",
    tone: "b",
    text: "Nifedipine — may be offered if medication is needed.",
  },
  {
    tag: "Acceptable with caution",
    tone: "b",
    text: "Metoprolol or propranolol if nifedipine is unsuitable/ineffective (balance fetal risk vs benefit). OnabotulinumtoxinA for chronic migraine — pregnancy outcome data are limited.",
  },
  {
    tag: "Avoid",
    tone: "c",
    text: "Valproate / divalproex and topiramate (teratogenic). Generally avoid CGRP-targeted agents; stop CGRP mAbs / gepants when pregnancy is recognized (insufficient safety data).",
  },
];

// Timing of response assessment (AAN/AHS 2026)
const AAN_TIMING = [
  "Most preventives — assess efficacy after 8–12 weeks at a tolerated dose.",
  "OnabotulinumtoxinA — assess after 24 weeks.",
  "If response is suboptimal by 8 weeks, optimize toward the maximum tolerated dose.",
  "If side effects are intolerable, reduce the dose or switch. Adverse effects may appear before full benefit.",
];

// Stopping therapy (AAN/AHS 2026)
const AAN_STOPPING = {
  when: "After 6 months of treatment, in patients with good response and stable control, discuss the potential benefits and risks of tapering.",
  risks: [
    "Increased headache days",
    "More acute medication use",
    "Reduced headache-related quality of life",
  ],
  decision: "Continue, taper, or switch based on the patient’s goals, response, and risk. Tapering should be a decision — not a reflex.",
};

// Flat entries drive both matrices AND the detail sheet.
const MATRIX_ENTRIES = [
  // ===== EPISODIC — STRONG =====
  { id: "e-atogepant", condition: "episodic", strength: "Strong in favor", quality: "High",
    drug: "Atogepant", label: "Atogepant 60 mg oral", cls: "Gepant", route: "Oral",
    dose: "60 mg PO once daily.",
    notes: "Oral small-molecule CGRP receptor antagonist. Onset within first month; assess at 12 weeks.",
    adverse: "Nausea, constipation, fatigue, decreased appetite.",
    contra: "Severe hepatic impairment; strong CYP3A4 inducers reduce efficacy.",
    citations: [{ label: "NICE TA973 — atogepant", href: "https://www.nice.org.uk/guidance/ta973" }] },
  { id: "e-erenumab", condition: "episodic", strength: "Strong in favor", quality: "High",
    drug: "Erenumab", label: "Erenumab 70 & 140 mg SC every 4 weeks", cls: "CGRP", route: "SC",
    dose: "70 mg or 140 mg SC every 4 weeks (NICE funds 140 mg).",
    notes: "Anti-CGRP receptor mAb. Review response at 12 weeks; stop if <50% reduction (episodic).",
    adverse: "Constipation (may be severe), injection-site reactions, hypertension, muscle spasm.",
    contra: "Hypersensitivity; caution in severe cardiovascular disease.",
    citations: [{ label: "NICE TA682 — erenumab", href: "https://www.nice.org.uk/guidance/ta682" }] },
  { id: "e-fremanezumab", condition: "episodic", strength: "Strong in favor", quality: "High",
    drug: "Fremanezumab", label: "Fremanezumab 225 mg monthly / 675 mg quarterly SC", cls: "CGRP", route: "SC",
    dose: "225 mg SC monthly, or 675 mg SC every 3 months.",
    notes: "Anti-CGRP ligand mAb. Stop at 12 weeks if response inadequate.",
    adverse: "Injection-site reactions, hypersensitivity.",
    contra: "Hypersensitivity to CGRP mAbs.",
    citations: [{ label: "NICE TA764 — fremanezumab", href: "https://www.nice.org.uk/guidance/ta764" }] },
  { id: "e-galcanezumab", condition: "episodic", strength: "Strong in favor", quality: "High",
    drug: "Galcanezumab", label: "Galcanezumab 120 mg monthly SC", cls: "CGRP", route: "SC",
    dose: "240 mg SC loading, then 120 mg SC monthly.",
    notes: "Anti-CGRP ligand mAb. Reassess at 12 weeks.",
    adverse: "Injection-site reactions, hypersensitivity, constipation.",
    contra: "Hypersensitivity to CGRP mAbs.",
    citations: [{ label: "NICE TA659 — galcanezumab", href: "https://www.nice.org.uk/guidance/ta659" }] },
  { id: "e-topiramate-high", condition: "episodic", strength: "Strong in favor", quality: "Moderate",
    drug: "Topiramate", label: "Topiramate 100 & 200 mg oral", cls: "Antiepileptic", route: "Oral",
    dose: "Target 100 mg/day (some evidence up to 200 mg/day); titrate 25 mg/week.",
    notes: "Follow MHRA 2024 Pregnancy Prevention Programme requirements.",
    adverse: "Paraesthesia, cognitive slowing, weight loss, mood change, nephrolithiasis, teratogenicity.",
    contra: "Pregnancy/childbearing potential without PPP; nephrolithiasis; narrow-angle glaucoma.",
    citations: [{ label: "MHRA — topiramate safety measures", href: "https://www.gov.uk/drug-safety-update/topiramate-topamax-introduction-of-new-safety-measures-including-a-pregnancy-prevention-programme" }] },
  { id: "e-eptinezumab", condition: "episodic", strength: "Strong in favor", quality: "Moderate",
    drug: "Eptinezumab", label: "Eptinezumab 100 & 300 mg IV quarterly", cls: "CGRP", route: "IV",
    dose: "100 mg IV every 12 weeks (may increase to 300 mg).",
    notes: "Only IV CGRP mAb — useful when adherence to SC dosing is a barrier.",
    adverse: "Nasopharyngitis, infusion reactions, hypersensitivity.",
    contra: "Hypersensitivity to CGRP mAbs.",
    citations: [{ label: "NICE TA871 — eptinezumab", href: "https://www.nice.org.uk/guidance/ta871" }] },
  // ===== EPISODIC — WEAK =====
  { id: "e-amitriptyline", condition: "episodic", strength: "Weak in favor", quality: "Moderate",
    drug: "Amitriptyline", label: "Amitriptyline 25 mg oral", cls: "TCA", route: "Oral",
    dose: "10 mg PO nocte, titrate to 25–75 mg (usual 25–50 mg).",
    notes: "Off-label for migraine; useful with comorbid tension-type headache or insomnia.",
    adverse: "Sedation, dry mouth, constipation, weight gain, orthostatic hypotension, QT prolongation.",
    contra: "Recent MI, arrhythmias, severe hepatic impairment, mania, concurrent MAOI.",
    citations: [{ label: "NICE CG150 §1.3.7", href: "https://www.nice.org.uk/guidance/cg150/chapter/Recommendations#migraine-2" }] },
  { id: "e-candesartan", condition: "episodic", strength: "Weak in favor", quality: "Moderate",
    drug: "Candesartan", label: "Candesartan 16 mg oral", cls: "ARB/ACEi", route: "Oral",
    dose: "16 mg PO once daily (start 4–8 mg, titrate).",
    notes: "Off-label; consider if propranolol contraindicated or when hypertension coexists.",
    adverse: "Dizziness, hypotension, hyperkalaemia, renal impairment.",
    contra: "Pregnancy, bilateral renal artery stenosis, severe hepatic impairment.",
    citations: [{ label: "EHF/EAN guideline", href: "https://thejournalofheadacheandpain.biomedcentral.com/articles/10.1186/s10194-023-01541-0" }] },
  { id: "e-topiramate-low", condition: "episodic", strength: "Weak in favor", quality: "Low",
    drug: "Topiramate", label: "Topiramate 50 mg oral", cls: "Antiepileptic", route: "Oral",
    dose: "50 mg/day — lower dose option when 100 mg not tolerated.",
    notes: "Same MHRA PPP requirements apply.",
    adverse: "Paraesthesia, cognitive slowing, weight loss, mood change.",
    contra: "Pregnancy without PPP; nephrolithiasis.",
    citations: [{ label: "MHRA — topiramate safety measures", href: "https://www.gov.uk/drug-safety-update/topiramate-topamax-introduction-of-new-safety-measures-including-a-pregnancy-prevention-programme" }] },
  { id: "e-lisinopril", condition: "episodic", strength: "Weak in favor", quality: "Low",
    drug: "Lisinopril", label: "Lisinopril 20 mg oral", cls: "ARB/ACEi", route: "Oral",
    dose: "20 mg PO once daily (start 10 mg).",
    notes: "Off-label; consider with comorbid hypertension.",
    adverse: "Dry cough, hyperkalaemia, angio-oedema, hypotension.",
    contra: "Pregnancy, angio-oedema history, bilateral renal artery stenosis.",
    citations: [{ label: "EHF/EAN guideline", href: "https://thejournalofheadacheandpain.biomedcentral.com/articles/10.1186/s10194-023-01541-0" }] },
  { id: "e-propranolol", condition: "episodic", strength: "Weak in favor", quality: "Low",
    drug: "Propranolol", label: "Propranolol 160 mg oral", cls: "Beta-blocker", route: "Oral",
    dose: "Target 160 mg/day (range 80–240 mg/day) in divided doses.",
    notes: "Screen for depression/self-harm risk; MHRA flagged overdose toxicity.",
    adverse: "Fatigue, cold extremities, bradycardia, bronchospasm, sleep disturbance.",
    contra: "Asthma, uncontrolled heart failure, bradycardia, heart block, hypotension, Raynaud's.",
    citations: [{ label: "MHRA — propranolol overdose", href: "https://www.gov.uk/drug-safety-update/propranolol-risk-of-serious-harm-and-death-in-overdose" }] },
  { id: "e-valproate", condition: "episodic", strength: "Weak in favor", quality: "Very low",
    drug: "Valproate", label: "Valproate 750 & 1500 mg oral", cls: "Antiepileptic", route: "Oral",
    dose: "750–1500 mg/day in divided doses.",
    notes: "MHRA: contraindicated in anyone of childbearing potential unless Pregnancy Prevention Programme met; new patients <55 need two-specialist sign-off.",
    adverse: "Weight gain, tremor, hair loss, hepatotoxicity, thrombocytopenia, teratogenicity.",
    contra: "Pregnancy, hepatic impairment, urea cycle disorders, mitochondrial disease.",
    citations: [{ label: "MHRA — valproate", href: "https://www.gov.uk/drug-safety-update/valproate-medicines-organisational-and-clinical-guidance-on-new-regulatory-measures-effective-from-31-january-2024" }] },
  { id: "e-lamotrigine", condition: "episodic", strength: "Weak in favor", quality: "Very low",
    drug: "Lamotrigine", label: "Lamotrigine 50 mg oral", cls: "Antiepileptic", route: "Oral",
    dose: "50 mg/day; slow titration to reduce rash risk.",
    notes: "Some evidence for migraine with aura specifically.",
    adverse: "Rash (including Stevens–Johnson), dizziness, diplopia, headache.",
    contra: "Hypersensitivity; caution with valproate (increases levels).",
    citations: [{ label: "EHF/EAN guideline", href: "https://thejournalofheadacheandpain.biomedcentral.com/articles/10.1186/s10194-023-01541-0" }] },
  { id: "e-levetiracetam", condition: "episodic", strength: "Weak in favor", quality: "Very low",
    drug: "Levetiracetam", label: "Levetiracetam 1000 mg oral", cls: "Antiepileptic", route: "Oral",
    dose: "1000 mg/day in divided doses.",
    notes: "Limited evidence; consider only if better-supported options unsuitable.",
    adverse: "Somnolence, irritability, mood change, behavioural disturbance.",
    contra: "Hypersensitivity; caution with psychiatric history.",
    citations: [{ label: "EHF/EAN guideline", href: "https://thejournalofheadacheandpain.biomedcentral.com/articles/10.1186/s10194-023-01541-0" }] },

  // ===== CHRONIC — STRONG =====
  { id: "c-botox", condition: "chronic", strength: "Strong in favor", quality: "High",
    drug: "OnabotulinumtoxinA", label: "OnabotulinumtoxinA 155–195 IU IM", cls: "Toxin", route: "IM",
    dose: "155–195 units IM across 31–39 sites (PREEMPT protocol) every 12 weeks.",
    notes: "Chronic migraine only (≥15 headache days/month, ≥8 migrainous). Stop if <30% reduction after 2 cycles.",
    adverse: "Neck pain, muscle weakness, ptosis, injection-site pain, headache.",
    contra: "Infection at sites; neuromuscular junction disorders; pregnancy.",
    citations: [{ label: "NICE TA260 — botulinum toxin A", href: "https://www.nice.org.uk/guidance/ta260" }] },
  { id: "c-atogepant", condition: "chronic", strength: "Strong in favor", quality: "High",
    drug: "Atogepant", label: "Atogepant 60 mg oral", cls: "Gepant", route: "Oral",
    dose: "60 mg PO once daily.",
    notes: "Also licensed for chronic migraine (TA973).",
    adverse: "Nausea, constipation, fatigue, decreased appetite.",
    contra: "Severe hepatic impairment; strong CYP3A4 inducers.",
    citations: [{ label: "NICE TA973 — atogepant", href: "https://www.nice.org.uk/guidance/ta973" }] },
  { id: "c-eptinezumab", condition: "chronic", strength: "Strong in favor", quality: "High",
    drug: "Eptinezumab", label: "Eptinezumab 100 & 300 mg IV quarterly", cls: "CGRP", route: "IV",
    dose: "100 mg IV every 12 weeks (may escalate to 300 mg).",
    notes: "IV CGRP mAb; useful for adherence.",
    adverse: "Nasopharyngitis, infusion reactions.",
    contra: "Hypersensitivity to CGRP mAbs.",
    citations: [{ label: "NICE TA871 — eptinezumab", href: "https://www.nice.org.uk/guidance/ta871" }] },
  { id: "c-fremanezumab-q", condition: "chronic", strength: "Strong in favor", quality: "High",
    drug: "Fremanezumab", label: "Fremanezumab 675 mg quarterly SC", cls: "CGRP", route: "SC",
    dose: "675 mg SC every 3 months (chronic migraine dose).",
    notes: "Alternative monthly regimen also effective.",
    adverse: "Injection-site reactions, hypersensitivity.",
    contra: "Hypersensitivity.",
    citations: [{ label: "NICE TA764 — fremanezumab", href: "https://www.nice.org.uk/guidance/ta764" }] },
  { id: "c-galcanezumab", condition: "chronic", strength: "Strong in favor", quality: "High",
    drug: "Galcanezumab", label: "Galcanezumab 120 mg monthly SC", cls: "CGRP", route: "SC",
    dose: "240 mg SC loading, then 120 mg SC monthly.",
    notes: "Also licensed for chronic migraine.",
    adverse: "Injection-site reactions, constipation.",
    contra: "Hypersensitivity.",
    citations: [{ label: "NICE TA659 — galcanezumab", href: "https://www.nice.org.uk/guidance/ta659" }] },
  { id: "c-erenumab", condition: "chronic", strength: "Strong in favor", quality: "Moderate",
    drug: "Erenumab", label: "Erenumab 70 & 140 mg SC every 4 weeks", cls: "CGRP", route: "SC",
    dose: "70 or 140 mg SC every 4 weeks.",
    notes: "Chronic migraine: stop if <30% reduction at 12 weeks.",
    adverse: "Constipation, hypertension, injection-site reactions.",
    contra: "Hypersensitivity; caution in severe CV disease.",
    citations: [{ label: "NICE TA682 — erenumab", href: "https://www.nice.org.uk/guidance/ta682" }] },
  { id: "c-fremanezumab-m", condition: "chronic", strength: "Strong in favor", quality: "Moderate",
    drug: "Fremanezumab", label: "Fremanezumab 225 mg monthly SC", cls: "CGRP", route: "SC",
    dose: "225 mg SC monthly.",
    notes: "Monthly regimen for chronic migraine.",
    adverse: "Injection-site reactions, hypersensitivity.",
    contra: "Hypersensitivity.",
    citations: [{ label: "NICE TA764 — fremanezumab", href: "https://www.nice.org.uk/guidance/ta764" }] },
  // ===== CHRONIC — WEAK =====
  { id: "c-topiramate-200", condition: "chronic", strength: "Weak in favor", quality: "Low",
    drug: "Topiramate", label: "Topiramate 200 mg oral", cls: "Antiepileptic", route: "Oral",
    dose: "200 mg/day; titrate slowly.",
    notes: "MHRA PPP required.",
    adverse: "Paraesthesia, cognitive slowing, weight loss, teratogenicity.",
    contra: "Pregnancy without PPP; nephrolithiasis.",
    citations: [{ label: "MHRA — topiramate", href: "https://www.gov.uk/drug-safety-update/topiramate-topamax-introduction-of-new-safety-measures-including-a-pregnancy-prevention-programme" }] },
  { id: "c-topiramate-50", condition: "chronic", strength: "Weak in favor", quality: "Very low",
    drug: "Topiramate", label: "Topiramate 50 mg oral", cls: "Antiepileptic", route: "Oral",
    dose: "50 mg/day — lower dose option.",
    notes: "MHRA PPP required.",
    adverse: "Paraesthesia, cognitive slowing, weight loss.",
    contra: "Pregnancy without PPP; nephrolithiasis.",
    citations: [{ label: "MHRA — topiramate", href: "https://www.gov.uk/drug-safety-update/topiramate-topamax-introduction-of-new-safety-measures-including-a-pregnancy-prevention-programme" }] },
];

const MATRIX_CITATIONS = [
  { label: "NICE CG150 (context)", href: "https://www.nice.org.uk/guidance/cg150" },
  { label: "EHF/EAN guideline on preventive migraine treatment", href: "https://thejournalofheadacheandpain.biomedcentral.com/articles/10.1186/s10194-023-01541-0" },
];


function Prophylaxis() {
  return (
    <div className="min-h-screen bg-[#ebe7df] text-[#2d2a33]">
      <header className="clay-header sticky top-0 z-10 mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="clay-icon h-10 w-10">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold">Headache Mx</span>
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

        {/* AAN/AHS 2026 UPDATE */}
        <AanAhsSection />


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

        {/* EVIDENCE MATRICES */}
        <EvidenceMatrixSection />


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
      {tx.citations && <CitationList citations={tx.citations} className="mt-2" />}
    </div>
  );
}

function CitationList({ citations, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {citations.map((c) => (
        <a
          key={c.href}
          href={c.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-[#0b3d5c]/25 bg-[#0b3d5c]/5 px-2 py-0.5 text-[10px] font-medium text-[#0b3d5c] hover:bg-[#0b3d5c]/10"
        >
          {c.label} <ExternalLink className="h-2.5 w-2.5" />
        </a>
      ))}
    </div>
  );
}

function AanAhsSection() {
  return (
    <div className="clay-card p-6 mb-8 border-[#6a2b8a]/30">
      <div className="flex items-center gap-3 mb-2">
        <div className="clay-icon h-9 w-9 bg-[#6a2b8a]/10">
          <Sparkles className="h-5 w-5 text-[#6a2b8a]" />
        </div>
        <h2 className="text-xl font-semibold">AAN/AHS 2026 update — prevention guidance</h2>
      </div>
      <p className="text-sm text-[#2d2a33]/70 mb-4">
        Updated AAN/AHS guidance adds CGRP-targeted therapies for adult episodic and chronic
        migraine prevention. No single preventive is clearly superior — choose via shared
        decision-making: efficacy, tolerability, safety, cost, and route.
      </p>

      {/* Who should receive prevention */}
      <div className="rounded-xl border border-[#0b3d5c]/25 bg-[#0b3d5c]/5 p-4 mb-5">
        <p className="text-sm font-semibold text-[#0b3d5c] mb-2">Who should receive prophylaxis?</p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          {AAN_ELIGIBILITY.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      {/* Efficacy-driven first choices */}
      <SubHeading label="Use efficacy evidence to guide first choices — higher-confidence options" />
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        {AAN_EFFICACY.map((g) => (
          <div key={g.indication} className="rounded-xl border border-[#6a2b8a]/25 bg-white/60 p-4">
            <p className="font-semibold text-sm text-[#6a2b8a] mb-2">{g.indication}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.drugs.map((d) => (
                <span
                  key={d}
                  className="inline-block rounded-full bg-[#6a2b8a]/10 px-2 py-0.5 text-xs font-medium text-[#6a2b8a]"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Oral evidence levels */}
      <SubHeading label="Oral preventive evidence levels (non-pregnant adults)" />
      <div className="grid gap-3 mb-5">
        {AAN_EVIDENCE_LEVELS.map((lvl) => (
          <DrugCard
            key={lvl.level}
            tx={{ name: lvl.level, dose: lvl.items.join("; "), notes: undefined }}
            tone={lvl.tone}
          />
        ))}
      </div>

      {/* Newer & device options */}
      <SubHeading label="Newer & device options" />
      <div className="rounded-xl border border-[#0b3d5c]/25 bg-[#0b3d5c]/5 p-4 mb-5 text-sm space-y-1">
        <p>
          <strong>CGRP monoclonal antibodies</strong> (erenumab, fremanezumab, galcanezumab,
          eptinezumab) and <strong>atogepant</strong> — recommended for episodic and chronic
          migraine, especially after failure of traditional agents or when tolerability is
          prioritized.
        </p>
        <p>
          <strong>OnabotulinumtoxinA</strong> — recommended for chronic migraine (≥15 headache
          days/month).
        </p>
        <p>
          <strong>External trigeminal TENS</strong> — can be offered as a nonpharmacologic
          preventive.
        </p>
      </div>

      {/* Comorbidity-guided selection */}
      <SubHeading label="Use comorbidities to make smarter choices" />
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        {AAN_COMORBIDITIES.map((c) => (
          <div key={c.condition} className="rounded-xl border border-[#d69838]/40 bg-white/60 p-4">
            <p className="font-semibold text-sm text-[#7a5312]">{c.condition}</p>
            <p className="text-sm text-[#2d2a33]/80 mt-1">{c.choice}</p>
          </div>
        ))}
      </div>

      {/* Pregnancy */}
      <SubHeading label="If prevention is needed in pregnancy — narrow the options" />
      <div className="grid gap-3 mb-5">
        {AAN_PREGNANCY.map((p) => (
          <DrugCard
            key={p.tag}
            tx={{ name: p.tag, dose: p.text }}
            tone={p.tone}
          />
        ))}
        <p className="text-xs text-[#2d2a33]/60 italic">
          Use the lowest overall pharmacologic exposure compatible with control.
        </p>
      </div>

      {/* Timing of response assessment */}
      <SubHeading label="Do not judge response too early — timing of assessment" />
      <div className="rounded-xl border border-[#4b8b6b]/40 bg-white/60 p-4 mb-5">
        <ul className="text-sm space-y-2 list-decimal pl-5">
          {AAN_TIMING.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      {/* Stopping therapy */}
      <SubHeading label="Stopping therapy — tapering should be a decision, not a reflex" />
      <div className="rounded-xl border border-[#c8391a]/30 bg-white/60 p-4 mb-4">
        <p className="text-sm text-[#2d2a33]/80 mb-2">
          <strong>When to consider:</strong> {AAN_STOPPING.when}
        </p>
        <p className="text-sm font-semibold text-[#c8391a] mb-1">
          Limited evidence — discontinuation may lead to:
        </p>
        <ul className="text-sm space-y-1 list-disc pl-5 mb-2">
          {AAN_STOPPING.risks.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="text-sm text-[#0b3d5c] font-medium">{AAN_STOPPING.decision}</p>
      </div>

      <CitationList citations={AAN_AHS_CITATIONS} />
    </div>
  );
}

function EvidenceMatrixSection() {
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("all"); // all | episodic | chronic
  const [strengthFilter, setStrengthFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MATRIX_ENTRIES.filter((e) => {
      if (condition !== "all" && e.condition !== condition) return false;
      if (strengthFilter !== "all" && e.strength !== strengthFilter) return false;
      if (classFilter !== "all" && e.cls !== classFilter) return false;
      if (!q) return true;
      return (
        e.drug.toLowerCase().includes(q) ||
        e.label.toLowerCase().includes(q) ||
        e.cls.toLowerCase().includes(q) ||
        e.route.toLowerCase().includes(q) ||
        (e.notes || "").toLowerCase().includes(q)
      );
    });
  }, [query, condition, strengthFilter, classFilter]);

  const activeFilters =
    (condition !== "all" ? 1 : 0) +
    (strengthFilter !== "all" ? 1 : 0) +
    (classFilter !== "all" ? 1 : 0);

  const showEpisodic = condition !== "chronic";
  const showChronic = condition !== "episodic";

  const episodicMatches = filtered.filter((e) => e.condition === "episodic");
  const chronicMatches = filtered.filter((e) => e.condition === "chronic");

  return (
    <>
      <Section
        icon={<TableIcon className="h-5 w-5" />}
        title="Prevention evidence matrix"
        subtitle="Rows = strength of recommendation; columns = quality of evidence. Click any entry for full dosing and safety detail."
      >
        {/* Search + filters */}
        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2d2a33]/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search drug, class, route, or notes…"
              className="w-full rounded-full border border-[#2d2a33]/15 bg-white/80 py-2 pl-9 pr-9 text-sm focus:border-[#0b3d5c] focus:outline-none focus:ring-2 focus:ring-[#0b3d5c]/20"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#2d2a33]/50 hover:bg-[#2d2a33]/10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 text-[#2d2a33]/60">
              <Filter className="h-3.5 w-3.5" /> Filters:
            </span>
            <FilterChipGroup
              label="Condition"
              value={condition}
              onChange={setCondition}
              options={[
                { v: "all", l: "All" },
                { v: "episodic", l: "Episodic" },
                { v: "chronic", l: "Chronic" },
              ]}
            />
            <FilterChipGroup
              label="Strength"
              value={strengthFilter}
              onChange={setStrengthFilter}
              options={[
                { v: "all", l: "All" },
                ...STRENGTH_ROWS.map((s) => ({ v: s, l: s.replace(" in favor", "") })),
              ]}
            />
            <FilterChipGroup
              label="Class"
              value={classFilter}
              onChange={setClassFilter}
              options={[
                { v: "all", l: "All classes" },
                ...DRUG_CLASSES.map((c) => ({ v: c, l: c })),
              ]}
            />
            {(activeFilters > 0 || query) && (
              <button
                onClick={() => {
                  setQuery("");
                  setCondition("all");
                  setStrengthFilter("all");
                  setClassFilter("all");
                }}
                className="ml-auto rounded-full border border-[#c8391a]/25 bg-[#c8391a]/5 px-2.5 py-1 text-[11px] font-medium text-[#c8391a] hover:bg-[#c8391a]/10"
              >
                Reset
              </button>
            )}
          </div>

          <p className="text-[11px] text-[#2d2a33]/50">
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"} match
          </p>
        </div>

        {showEpisodic && (
          <>
            <SubHeading label="Episodic migraine (Table 1.4)" />
            <EvidenceMatrix
              entries={episodicMatches}
              onSelect={setSelected}
              highlight={query.trim()}
            />
          </>
        )}

        {showChronic && (
          <div className={showEpisodic ? "mt-6" : ""}>
            <SubHeading label="Chronic migraine (Table 1.5)" />
            <EvidenceMatrix
              entries={chronicMatches}
              onSelect={setSelected}
              highlight={query.trim()}
            />
          </div>
        )}

        <CitationList citations={MATRIX_CITATIONS} className="mt-4" />
      </Section>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-[#f6f2ea]">
          {selected && <EntryDetail entry={selected} />}
        </SheetContent>
      </Sheet>
    </>
  );
}

function FilterChipGroup({ label, value, onChange, options }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[#2d2a33]/5 p-0.5">
      <span className="px-2 text-[10px] font-semibold uppercase tracking-wide text-[#2d2a33]/50">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
            value === o.v
              ? "bg-[#0b3d5c] text-white shadow-sm"
              : "text-[#2d2a33]/70 hover:bg-white"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

function EvidenceMatrix({ entries, onSelect, highlight }) {
  const byCell = useMemo(() => {
    const map = {};
    for (const s of STRENGTH_ROWS) map[s] = {};
    for (const s of STRENGTH_ROWS) for (const q of QUALITY_COLS) map[s][q] = [];
    for (const e of entries) {
      if (map[e.strength] && map[e.strength][e.quality]) {
        map[e.strength][e.quality].push(e);
      }
    }
    return map;
  }, [entries]);

  const empty = entries.length === 0;

  return (
    <div className="overflow-x-auto rounded-xl border border-[#2d2a33]/10 bg-white/60">
      <table className="w-full min-w-[720px] border-collapse text-xs">
        <thead>
          <tr className="bg-[#0b3d5c]/8 text-left">
            <th className="p-2 font-semibold text-[#2d2a33]/70 w-32">
              Strength ↓ / Quality →
            </th>
            {QUALITY_COLS.map((q) => (
              <th key={q} className="p-2 font-semibold text-[#0b3d5c]">
                {q}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STRENGTH_ROWS.map((row) => {
            const strong = row.startsWith("Strong");
            return (
              <tr key={row} className="border-t border-[#2d2a33]/10 align-top">
                <td
                  className={`p-2 font-semibold ${
                    strong ? "text-[#4b8b6b]" : "text-[#d69838]"
                  }`}
                >
                  {row}
                </td>
                {QUALITY_COLS.map((q) => {
                  const cell = byCell[row][q];
                  return (
                    <td key={q} className="p-2 text-[#2d2a33]/85">
                      {cell.length === 0 ? (
                        <span className="text-[#2d2a33]/25">—</span>
                      ) : (
                        <ul className="space-y-1">
                          {cell.map((e) => (
                            <li key={e.id}>
                              <button
                                onClick={() => onSelect(e)}
                                className="group inline-flex w-full items-start gap-1 rounded-md border border-transparent px-1.5 py-1 text-left hover:border-[#0b3d5c]/25 hover:bg-[#0b3d5c]/5"
                              >
                                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#0b3d5c]/50 group-hover:bg-[#0b3d5c]" />
                                <span>{highlightText(e.label, highlight)}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {empty && (
        <div className="p-4 text-center text-xs text-[#2d2a33]/50">
          No entries match. Try clearing filters or a different search term.
        </div>
      )}
    </div>
  );
}

function highlightText(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-[#d69838]/40 px-0.5 text-[#2d2a33]">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function EntryDetail({ entry }) {
  const strong = entry.strength.startsWith("Strong");
  return (
    <div className="text-[#2d2a33]">
      <SheetHeader className="text-left">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Tag color={entry.condition === "chronic" ? "#c8391a" : "#0b3d5c"}>
            {entry.condition === "chronic" ? "Chronic migraine" : "Episodic migraine"}
          </Tag>
          <Tag color={strong ? "#4b8b6b" : "#d69838"}>{entry.strength}</Tag>
          <Tag color="#0b3d5c">Quality: {entry.quality}</Tag>
          <Tag color="#2d2a33">{entry.cls}</Tag>
          <Tag color="#2d2a33">{entry.route}</Tag>
        </div>
        <SheetTitle className="text-xl">{entry.drug}</SheetTitle>
        <SheetDescription className="text-[#2d2a33]/70">
          {entry.label}
        </SheetDescription>
      </SheetHeader>

      <div className="mt-5 space-y-4 text-sm">
        <DetailBlock title="Dose">{entry.dose}</DetailBlock>
        {entry.notes && (
          <DetailBlock title="Clinical notes">{entry.notes}</DetailBlock>
        )}
        {entry.contra && (
          <DetailBlock title="Contraindications" tone="danger">
            {entry.contra}
          </DetailBlock>
        )}
        {entry.adverse && (
          <DetailBlock title="Key adverse effects" tone="warn">
            {entry.adverse}
          </DetailBlock>
        )}
        {entry.citations && entry.citations.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#2d2a33]/50">
              Citations
            </p>
            <CitationList citations={entry.citations} />
          </div>
        )}
      </div>
    </div>
  );
}

function Tag({ color, children }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{
        color,
        backgroundColor: `${color}15`,
        border: `1px solid ${color}40`,
      }}
    >
      {children}
    </span>
  );
}

function DetailBlock({ title, tone, children }) {
  const toneClass =
    tone === "danger"
      ? "border-[#c8391a]/25 bg-[#c8391a]/5 text-[#c8391a]"
      : tone === "warn"
      ? "border-[#d69838]/30 bg-[#d69838]/5 text-[#7a5312]"
      : "border-[#2d2a33]/10 bg-white/70 text-[#2d2a33]/85";
  return (
    <div className={`rounded-lg border p-3 ${toneClass}`}>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide opacity-80">
        {title}
      </p>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}



