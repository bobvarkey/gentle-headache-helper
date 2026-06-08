import { createFileRoute } from "@tanstack/react-router";
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
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  
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
    setShowDiagnostic(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#1f2230]">
      {/* Header */}
      <header className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2230] text-[#f7f5ef]">
            <Brain className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold">Mira</span>
        </div>
        <nav className="flex gap-4 text-xs text-[#1f2230]/60">
          <a href="#diagnose" className="hover:text-[#1f2230]">Diagnostic</a>
          <a href="#about" className="hover:text-[#1f2230]">About</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-6 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Headache Diagnostic</h1>
          <p className="mt-2 text-sm text-[#1f2230]/60">Based on ICHD-3 Classification</p>
        </div>
        
        {/* SAFETY DISCLAIMER - Always visible */}
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-red-700">Medical Disclaimer</p>
              <p className="text-red-600/80">This tool is for educational purposes only. It does NOT provide medical diagnosis. Always consult a qualified healthcare provider for proper evaluation and treatment of headaches.</p>
            </div>
          </div>
        </div>

        {/* QUICK DIAGNOSTIC FORM */}
        <div id="diagnose" className="scroll-mt-8 bg-white rounded-2xl p-5 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="h-5 w-5 text-[#e07856]" />
            <h2 className="text-lg font-semibold">Quick Symptom Check</h2>
          </div>
          
          <p className="text-sm text-[#1f2230]/60 mb-4">Answer a few questions to get an initial assessment:</p>
          
          {/* Questions Grid */}
          <div className="grid gap-4 text-sm">
            {/* Q1: Duration */}
            <div>
              <p className="font-medium mb-2">How long do headaches last?</p>
              <div className="flex flex-wrap gap-2">
                {questions.duration.map((opt) => (
                  <button key={opt.value} onClick={() => handleAnswer('duration', opt.value)}
                    className={`px-3 py-2 rounded-lg border transition ${
                      answers.duration === opt.value 
                        ? 'bg-[#1f2230] text-white border-[#1f2230]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Q2: Location */}
            <div>
              <p className="font-medium mb-2">Pain location?</p>
              <div className="flex flex-wrap gap-2">
                {questions.location.map((opt) => (
                  <button key={opt.value} onClick={() => handleAnswer('location', opt.value)}
                    className={`px-3 py-2 rounded-lg border transition ${
                      answers.location === opt.value 
                        ? 'bg-[#1f2230] text-white border-[#1f2230]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Q3: Nausea */}
            <div>
              <p className="font-medium mb-2">Nausea or vomiting?</p>
              <div className="flex gap-2">
                {questions.nausea.map((opt) => (
                  <button key={String(opt.value)} onClick={() => handleAnswer('nausea', opt.value)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      answers.nausea === opt.value 
                        ? 'bg-[#1f2230] text-white border-[#1f2230]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Q4: Light sensitivity */}
            <div>
              <p className="font-medium mb-2">Sensitive to light?</p>
              <div className="flex gap-2">
                {questions.photophobia.map((opt) => (
                  <button key={String(opt.value)} onClick={() => handleAnswer('photophobia', opt.value)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      answers.photophobia === opt.value 
                        ? 'bg-[#1f2230] text-white border-[#1f2230]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Q5: Intensity */}
            <div>
              <p className="font-medium mb-2">Pain intensity (1-5)?</p>
              <div className="flex gap-1">
                {questions.intensity.map((opt) => (
                  <button key={opt.value} onClick={() => handleAnswer('intensity', opt.value)}
                    className={`flex-1 py-3 rounded-lg border transition text-center ${
                      answers.intensity === opt.value 
                        ? 'bg-[#1f2230] text-white border-[#1f2230]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className="block font-bold">{opt.value}</span>
                    <span className="block text-xs opacity-60">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button onClick={resetDiagnostic} className="mt-4 text-xs text-[#1f2230]/50 hover:text-[#1f2230]">
            Clear answers
          </button>
        </div>
        
        {/* RESULTS SECTION */}
        {results && (
          <div className="space-y-4 mb-8">
            {/* RED FLAG WARNING - If emergency detected */}
            {results.priority === 'emergency' && (
              <div className="rounded-xl bg-red-600 p-5 text-white">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-lg font-bold">Seek Immediate Medical Care!</h3>
                </div>
                <p className="mt-2 text-red-100">{results.content}</p>
                {results.alerts && (
                  <ul className="mt-3 space-y-1 text-sm">
                    {results.alerts.map((a, i) => (
                      <li key={i}>• {a.symptom}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-3 font-semibold">Call emergency services or go to ER now.</p>
              </div>
            )}
            
            {/* DIFFERENTIAL DIAGNOSES */}
            {results.differentials && results.differentials.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Possible Diagnoses
                </h3>
                
                <div className="space-y-3">
                  {results.differentials.slice(0, 3).map((diff, i) => (
                    <div key={i} className={`p-4 rounded-xl ${
                      i === 0 ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{diff.name}</p>
                          <p className="text-xs text-[#1f2230]/50">ICHD-3: {diff.code}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          diff.confidence >= 70 ? 'bg-green-500 text-white' :
                          diff.confidence >= 50 ? 'bg-yellow-500 text-white' :
                          'bg-gray-400 text-white'
                        }`}>
                          {diff.confidence}%
                        </span>
                      </div>
                      {diff.description && (
                        <p className="text-sm text-[#1f2230]/70 mt-1">{diff.description}</p>
                      )}
                      {diff.recommendation && (
                        <div className="mt-2 text-xs bg-[#f7f5ef] p-2 rounded text-black">
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
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-[#1f2230]/60">Answer more questions or consult a healthcare provider.</p>
              </div>
            )}
          </div>
        )}
        
        {/* RED FLAGS INFO */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-amber-800 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Important Red Flags
          </h3>
          <p className="text-sm text-amber-700 mt-1">
            Seek immediate care if: sudden "thunderclap" worst headache, fever/neck stiffness, 
            new neurological symptoms (weakness, speech difficulty), or headache after age 50 with no history.
          </p>
        </div>
        
        {/* FULL ASSESSMENT LINK */}
        <div className="text-center">
          <a href="/diagnostic" className="inline-flex items-center gap-2 bg-[#1f2230] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2d3142]">
            Take Full Diagnostic Assessment
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {/* FAQ 1 */}
          <details className="group rounded-xl bg-white p-4 cursor-pointer">
            <summary className="flex items-center justify-between font-medium list-none">
              <span>How accurate is this diagnostic?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-3 text-sm text-[#1f2230]/70">
              <p>This tool evaluates your symptoms against ICHD-3 diagnostic criteria used by neurologists worldwide. It provides a preliminary assessment, not a definitive diagnosis. Clinical accuracy depends on how precisely your inputs match observed symptoms. Always verify results with a healthcare provider.</p>
            </div>
          </details>
          
          {/* FAQ 2 */}
          <details className="group rounded-xl bg-white p-4 cursor-pointer">
            <summary className="flex items-center justify-between font-medium list-none">
              <span>How does the ICHD-3 engine work?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-3 text-sm text-[#1f2230]/70">
              <p>The engine uses a scoring algorithm that matches your symptom answers against official ICHD-3 criteria for each headache type. Each criterion (like unilateral pain, nausea, photophobia) adds to a score. Higher scores indicate stronger matches. Red flags are screened first—if detected, the tool prioritizes safety warnings.</p>
            </div>
          </details>
          
          {/* FAQ 3 */}
          <details className="group rounded-xl bg-white p-4 cursor-pointer">
            <summary className="flex items-center justify-between font-medium list-none">
              <span>Is my data private?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-3 text-sm text-[#1f2230]/70">
              <p>Yes. All data is stored locally on your device. We don't collect, store, or transmit any personal health information to external servers. No accounts, no tracking, no analytics.</p>
            </div>
          </details>
          
          {/* FAQ 4 */}
          <details className="group rounded-xl bg-white p-4 cursor-pointer">
            <summary className="flex items-center justify-between font-medium list-none">
              <span>What if I get an emergency warning?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-3 text-sm text-[#1f2230]/70">
              <p>If red flag symptoms are detected (like thunderclap headache, fever with neck stiffness, new neurological symptoms), the tool shows an immediate "Seek Medical Care" alert. Do not ignore these warnings. Call emergency services or go to the ER immediately.</p>
            </div>
          </details>
          
          {/* FAQ 5 */}
          <details className="group rounded-xl bg-white p-4 cursor-pointer">
            <summary className="flex items-center justify-between font-medium list-none">
              <span>Can I use this for free?</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <div className="mt-3 text-sm text-[#1f2230]/70">
              <p>Yes, the diagnostic tool is completely free to use. No subscription, no ads, no hidden fees.</p>
            </div>
          </details>
        </div>
      </section>
      
      {/* Footer */}
      <footer id="about" className="bg-white border-t py-8 mt-12">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-[#1f2230]/50">
          <p className="font-medium text-[#1f2230]/70">Mira Headache Diagnostic</p>
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