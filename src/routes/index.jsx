import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, Shield, AlertTriangle, CheckCircle, ArrowRight, Stethoscope } from "lucide-react";
import { diagnose, formatDifferentialResults } from "../utils/diagnostic-engine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mira — Headache Diagnostic" },
      { name: "description", content: "ICHD-3 based headache diagnostic. Identify your headache type." },
      { property: "og:title", content: "Mira — Headache Diagnostic" },
    ],
  }),
  component: Index,
});

function Index() {
  // Diagnostic state
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  
  const questions = getQuickQuestions();
  
  const handleAnswer = (id, value) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    
    // Auto-diagnose when we have enough
    if (id === 'intensity' || id === 'nausea') {
      const diagnosis = diagnose(newAnswers);
      setResults(formatDifferentialResults(diagnosis));
    }
  };
  
  const resetDiagnostic = () => {
    setAnswers({});
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-[#ebe7df] text-[#2d2a33]">
      {/* Header */}
      <header className="clay-header sticky top-0 z-10 mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="clay-icon h-10 w-10">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold">Mira</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#diagnose" className="text-[#2d2a33]/70 hover:text-[#2d2a33] transition-colors">Diagnostic</a>
          <Link to="/ed-migraine" className="text-[#2d2a33]/70 hover:text-[#2d2a33] transition-colors">ED Algorithm</Link>
          <Link to="/prophylaxis" className="text-[#2d2a33]/70 hover:text-[#2d2a33] transition-colors">Prophylaxis</Link>
          <a href="#about" className="text-[#2d2a33]/70 hover:text-[#2d2a33] transition-colors">About</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-8 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold md:text-5xl mb-3">Headache Diagnostic</h1>
          <p className="text-base text-[#2d2a33]/60">Based on ICHD-3 Classification</p>
        </div>
        
        {/* SAFETY DISCLAIMER - Always visible */}
        <div className="clay-alert error mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Medical Disclaimer</p>
              <p className="opacity-90">This tool is for educational purposes only. It does NOT provide medical diagnosis. Always consult a qualified healthcare provider for proper evaluation and treatment of headaches.</p>
            </div>
          </div>
        </div>

        {/* QUICK DIAGNOSTIC FORM */}
        <div id="diagnose" className="scroll-mt-8 clay-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="clay-icon h-8 w-8">
              <Stethoscope className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-semibold">Quick Symptom Check</h2>
          </div>
          
          <p className="text-sm text-[#2d2a33]/60 mb-5">Answer a few questions to get an initial assessment:</p>
          
          {/* Questions Grid */}
          <div className="grid gap-5 text-sm">
            {/* Q1: Duration */}
            <div>
              <p className="font-medium mb-3">How long do headaches last?</p>
              <div className="flex flex-wrap gap-2">
                {questions.duration.map((opt) => (
                  <button key={opt.value} onClick={() => handleAnswer('duration', opt.value)}
                    className={`clay-pill ${answers.duration === opt.value ? 'selected' : ''}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Q2: Location */}
            <div>
              <p className="font-medium mb-3">Pain location?</p>
              <div className="flex flex-wrap gap-2">
                {questions.location.map((opt) => (
                  <button key={opt.value} onClick={() => handleAnswer('location', opt.value)}
                    className={`clay-pill ${answers.location === opt.value ? 'selected' : ''}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Q3: Nausea */}
            <div>
              <p className="font-medium mb-3">Nausea or vomiting?</p>
              <div className="flex gap-2">
                {questions.nausea.map((opt) => (
                  <button key={String(opt.value)} onClick={() => handleAnswer('nausea', opt.value)}
                    className={`clay-pill ${answers.nausea === opt.value ? 'selected' : ''}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Q4: Light sensitivity */}
            <div>
              <p className="font-medium mb-3">Sensitive to light?</p>
              <div className="flex gap-2">
                {questions.photophobia.map((opt) => (
                  <button key={String(opt.value)} onClick={() => handleAnswer('photophobia', opt.value)}
                    className={`clay-pill ${answers.photophobia === opt.value ? 'selected' : ''}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Q5: Intensity */}
            <div>
              <p className="font-medium mb-3">Pain intensity (1-5)?</p>
              <div className="flex gap-2">
                {questions.intensity.map((opt) => (
                  <button key={opt.value} onClick={() => handleAnswer('intensity', opt.value)}
                    className={`clay-pill flex-1 text-center ${answers.intensity === opt.value ? 'selected' : ''}`}>
                    <span className="block text-lg font-bold">{opt.value}</span>
                    <span className="block text-xs opacity-70">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button onClick={resetDiagnostic} className="mt-5 text-xs text-[#2d2a33]/40 hover:text-[#2d2a33]/70 transition-colors">
            Clear answers
          </button>
        </div>
        
        {/* RESULTS SECTION */}
        {results && (
          <div className="space-y-4 mb-8 animate-clay-pop">
            {/* RED FLAG WARNING - If emergency detected */}
            {results.priority === 'emergency' && (
              <div className="clay-alert error">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-lg font-bold">Seek Immediate Medical Care!</h3>
                </div>
                <p className="mb-3 opacity-90">{results.content}</p>
                {results.alerts && (
                  <ul className="mb-3 space-y-1 text-sm">
                    {results.alerts.map((a, i) => (
                      <li key={i}>• {a.symptom}</li>
                    ))}
                  </ul>
                )}
                <p className="font-semibold">Call emergency services or go to ER now.</p>
              </div>
            )}
            
            {/* DIFFERENTIAL DIAGNOSES */}
            {results.differentials && results.differentials.length > 0 && (
              <div className="clay-card p-6">
                <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#4a9a6d]" />
                  Possible Diagnoses
                </h3>
                
                <div className="space-y-4">
                  {results.differentials.slice(0, 3).map((diff, i) => (
                    <div key={i} className={`clay-result-card p-5 ${i === 0 ? 'highlight' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-lg">{diff.name}</p>
                          <p className="text-xs text-[#2d2a33]/50">ICHD-3: {diff.code}</p>
                        </div>
                        <span className={`clay-badge ${diff.confidence >= 70 ? 'success' : diff.confidence >= 50 ? 'warning' : ''}`}>
                          {diff.confidence}%
                        </span>
                      </div>
                      {diff.description && (
                        <p className="text-sm text-[#2d2a33]/70 mt-2">{diff.description}</p>
                      )}
                      {diff.recommendation && (
                        <div className="mt-3 text-sm clay-alert info">
                          💊 {diff.recommendation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* No clear diagnosis */}
            {(!results.differentials || results.differentials.length === 0) && results.priority !== 'emergency' && (
              <div className="clay-card p-6 text-center">
                <p className="text-[#2d2a33]/60">Answer more questions or consult a healthcare provider.</p>
              </div>
            )}
          </div>
        )}
        
        {/* RED FLAGS INFO */}
        <div className="clay-alert warning mb-8">
          <h3 className="font-semibold flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Important Red Flags
          </h3>
          <p className="mt-2 text-sm opacity-90">
            Seek immediate care if: sudden "thunderclap" worst headache, fever/neck stiffness, 
            new neurological symptoms (weakness, speech difficulty), or headache after age 50 with no history.
          </p>
        </div>
        
        {/* FULL ASSESSMENT LINK */}
        <div className="text-center">
          <a href="/diagnostic" className="clay-link-button">
            Take Full Diagnostic Assessment
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {/* FAQ 1 */}
          <details className="clay-faq p-5 group">
            <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>How accurate is this diagnostic?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-4 text-sm text-[#2d2a33]/70 leading-relaxed">
              <p>This tool evaluates your symptoms against ICHD-3 diagnostic criteria used by neurologists worldwide. It provides a preliminary assessment, not a definitive diagnosis. Clinical accuracy depends on how precisely your inputs match observed symptoms. Always verify results with a healthcare provider.</p>
            </div>
          </details>
          
          {/* FAQ 2 */}
          <details className="clay-faq p-5 group">
            <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>How does the ICHD-3 engine work?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-4 text-sm text-[#2d2a33]/70 leading-relaxed">
              <p>The engine uses a scoring algorithm that matches your symptom answers against official ICHD-3 criteria for each headache type. Each criterion (like unilateral pain, nausea, photophobia) adds to a score. Higher scores indicate stronger matches. Red flags are screened first—if detected, the tool prioritizes safety warnings.</p>
            </div>
          </details>
          
          {/* FAQ 3 */}
          <details className="clay-faq p-5 group">
            <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>Is my data private?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-4 text-sm text-[#2d2a33]/70 leading-relaxed">
              <p>Yes. All data is stored locally on your device. We don't collect, store, or transmit any personal health information to external servers. No accounts, no tracking, no analytics.</p>
            </div>
          </details>
          
          {/* FAQ 4 */}
          <details className="clay-faq p-5 group">
            <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>What if I get an emergency warning?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-4 text-sm text-[#2d2a33]/70 leading-relaxed">
              <p>If red flag symptoms are detected (like thunderclap headache, fever with neck stiffness, new neurological symptoms), the tool shows an immediate "Seek Medical Care" alert. Do not ignore these warnings. Call emergency services or go to the ER immediately.</p>
            </div>
          </details>
          
          {/* FAQ 5 */}
          <details className="clay-faq p-5 group">
            <summary className="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>Can I use this for free?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-4 text-sm text-[#2d2a33]/70 leading-relaxed">
              <p>Yes, the diagnostic tool is completely free to use. No subscription, no ads, no hidden fees.</p>
            </div>
          </details>
        </div>
      </section>
      
      {/* Footer */}
      <footer id="about" className="clay-footer py-10 mt-12">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-[#2d2a33]/50">
          <p className="font-medium text-[#2d2a33]/70">Mira Headache Diagnostic</p>
          <p className="mt-1">Based on International Classification of Headache Disorders (ICHD-3)</p>
          <p className="mt-2">For educational purposes only. Not medical advice.</p>
        </div>
      </footer>
    </div>
  );
}

function getQuickQuestions() {
  return {
    duration: [
      { value: 'minutes_15', label: '<15 min' },
      { value: 'minutes_30', label: '15-30 min' },
      { value: 'hours_2', label: '30min-2hr' },
      { value: 'hours_4', label: '2-4 hr' },
      { value: 'hours_24', label: '4-24 hr' },
      { value: 'hours_72', label: '1-3 days' },
    ],
    location: [
      { value: 'unilateral', label: 'One side' },
      { value: 'bilateral', label: 'Both sides' },
      { value: 'orbit', label: 'Around eye' },
      { value: 'diffuse', label: 'Whole head' },
    ],
    nausea: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    photophobia: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
    intensity: [
      { value: 1, label: 'Mild' },
      { value: 2, label: 'Mod' },
      { value: 3, label: 'Bad' },
      { value: 4, label: 'Severe' },
      { value: 5, label: 'Extreme' },
    ],
  };
}