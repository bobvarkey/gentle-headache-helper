import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, AlertTriangle, Zap, CheckCircle2, ArrowLeft, Info, Pill, Activity, Clock } from "lucide-react";

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

export const Route = createFileRoute("/tac-safety")({
  head: () => ({
    meta: [
      { title: "TAC Safety & Contraindications | Mira" },
      { name: "description", content: "Clinical safety guidelines and contraindications for Trigeminal Autonomic Cephalalgias treatments including Indomethacin and Oxygen." },
      { property: "og:title", content: "TAC Safety & Contraindications | Mira" },
      { property: "og:description", content: "Essential clinical warnings for TAC management." },
    ],
  }),
  component: TacSafetyPage,
});

function TacSafetyPage() {
  return (
    <div className="min-h-screen text-[#1a1330] pb-20" style={{ background: "linear-gradient(180deg, #fff7f0 0%, #fde5d3 40%, #f9d6e8 100%)" }}>
      <header className="glass-header sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="feature-icon" style={{ width: 36, height: 36, borderRadius: 12 }}>
              <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight">Back to Mira</span>
          </Link>
          <div className="clay-badge bg-sunset text-[10px]" style={{ background: "var(--gradient-sunset)" }}>
            Clinical Safety Guide
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-12">
        <div className="animate-clay-pop">
          <div className="flex items-center gap-4 mb-6">
            <div className="feature-icon bg-[#1a1330]" style={{ width: 56, height: 56, borderRadius: 18 }}>
              <Shield className="h-7 w-7 text-white" strokeWidth={2.25} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">TAC Safety</h1>
              <p className="text-[#1a1330]/60 font-medium">Critical warnings for Trigeminal Autonomic Cephalalgias</p>
            </div>
          </div>

          <div className="clay-alert warning mb-8 p-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm mb-1">Prescriber Alert</p>
                <p className="text-sm opacity-90 leading-relaxed">
                  The treatments for TACs (Cluster, PH, SUNCT/SUNA) often carry higher risks or specific titration requirements compared to standard migraine therapies. Always verify renal and cardiac status before initiation.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {TAC_SAFETY.map((s, idx) => (
              <div key={s.category} className="clay-card p-6 md:p-8 animate-step-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${s.priority === 'critical' ? 'bg-[#e84393]' : s.priority === 'high' ? 'bg-[#f7931e]' : 'bg-[#1a1330]'}`} />
                    {s.category}
                  </h3>
                  {s.priority === 'critical' && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#e84393] bg-[#e84393]/10 px-2 py-1 rounded-md">
                      Critical
                    </span>
                  )}
                </div>
                
                <ul className="space-y-4">
                  {s.warnings.map((w, i) => (
                    <li key={i} className="flex gap-3 text-[#1a1330]/80 leading-relaxed">
                      <div className="mt-1.5 shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-[#e84393]" strokeWidth={2.5} />
                      </div>
                      <span className="text-[15px]">{w}</span>
                    </li>
                  ))}
                </ul>

                {s.category.includes("Indomethacin") && (
                  <div className="mt-6 p-4 rounded-2xl bg-[#1a1330]/5 border border-[#1a1330]/10 flex gap-3 items-start">
                    <Info className="h-4 w-4 mt-0.5 text-[#1a1330]/40" />
                    <p className="text-[11px] text-[#1a1330]/60 italic leading-relaxed">
                      Indomethacin is diagnostic for Paroxysmal Hemicrania and Hemicrania Continua. Lack of response at 225mg/day usually rules out these diagnoses.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 clay-card p-8 bg-white/40">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#e84393]" /> Quick Reference Links
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/ed-migraine" className="feature-card flex items-center gap-4 hover:scale-[1.02] transition-transform">
                <div className="feature-icon bg-[#e84393]/10 text-[#e84393]"><Activity className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-sm">ED Algorithm</div>
                  <div className="text-[10px] opacity-60 uppercase font-bold">AHS 2025</div>
                </div>
              </Link>
              <Link to="/prophylaxis" className="feature-card flex items-center gap-4 hover:scale-[1.02] transition-transform">
                <div className="feature-icon bg-[#e84393]/10 text-[#e84393]"><Pill className="h-5 w-5" /></div>
                <div>
                  <div className="font-bold text-sm">Prophylaxis</div>
                  <div className="text-[10px] opacity-60 uppercase font-bold">NICE CG150</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-[10px] text-[#1a1330]/40 uppercase tracking-widest font-bold px-4">
        Evidence grounded in ICHD-3 and BASH Guidelines
      </footer>
    </div>
  );
}
