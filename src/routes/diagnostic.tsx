/**
 * Diagnostic Route - ICHD-3 Headache Diagnostic (Claymorphism UI)
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { diagnose, formatDifferentialResults } from "../utils/diagnostic-engine";

export const Route = createFileRoute("/diagnostic")({
  head: () => ({
    meta: [
      { title: "Headache Diagnostic - ICHD-3" },
      { name: "description", content: "Identify your headache type based on ICHD-3" }
    ]
  }),
  component: DiagnosticPage,
});

function DiagnosticPage() {
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [results, setResults] = useState(null);
  const [started, setStarted] = useState(false);

  const questions = getQuestions();
  const questionKeys = Object.keys(questions);
  const currentQuestion = questions[questionKeys[stepIndex]];
  const totalSteps = questionKeys.length;

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (stepIndex < questionKeys.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      const diagnosis = diagnose(newAnswers);
      setResults(formatDifferentialResults(diagnosis));
    }
  };

  const startDiagnostic = () => {
    setStarted(true);
    setStepIndex(0);
    setAnswers({});
  };

  const restart = () => {
    setAnswers({});
    setResults(null);
    setStarted(true);
    setStepIndex(0);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-[#ebe7df] text-[#2d2a33] p-6">
        <div className="mx-auto max-w-2xl pt-12">
          <div className="mb-10 flex items-center gap-4">
            <div className="clay-icon h-14 w-14">
              <Brain className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Headache Diagnostic</h1>
              <p className="text-sm text-[#2d2a33]/60">Based on ICHD-3 Classification</p>
            </div>
          </div>

          <div className="clay-card p-8">
            <h2 className="mb-6 text-xl font-semibold">How it works</h2>
            <ul className="space-y-4 text-[#2d2a33]/80">
              <li className="flex gap-4 items-center">
                <span className="clay-icon h-8 w-8 text-sm">1</span>
                <span>Answer questions about your headache symptoms</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="clay-icon h-8 w-8 text-sm">2</span>
                <span>Get evaluated against ICHD-3 criteria</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="clay-icon h-8 w-8 text-sm">3</span>
                <span>Receive diagnosis with treatment suggestions</span>
              </li>
            </ul>

            <div className="mt-8 clay-alert warning">
              <strong>⚕️ Disclaimer:</strong> This tool is for educational purposes only.
            </div>

            <button onClick={startDiagnostic} className="clay-button mt-8 w-full py-4 text-lg">
              Start Diagnostic Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen bg-[#ebe7df] text-[#2d2a33] p-6">
        <div className="mx-auto max-w-2xl">
          <button onClick={restart} className="mb-8 flex items-center gap-2 text-sm text-[#2d2a33]/60 hover:text-[#2d2a33] transition-colors">
            <ArrowLeft className="h-4 w-4" /> Start new assessment
          </button>

          {results.priority === 'emergency' ? (
            <div className="clay-alert error p-8">
              <div className="mb-4 flex items-center gap-3">
                <AlertTriangle className="h-10 w-10" />
                <h2 className="text-2xl font-bold">Seek Immediate Medical Care!</h2>
              </div>
              <p className="mb-4 text-lg opacity-90">{results.content}</p>
              <div className="clay-card p-4 font-semibold text-[#8a3a3a]">{results.recommendation}</div>
            </div>
          ) : (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold">{results.title}</h2>
              {results.differentials?.map((diff, i) => (
                <div key={i} className={`clay-result-card p-6 ${i === 0 ? 'highlight' : ''}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{diff.name}</h3>
                    <span className={`clay-badge ${diff.confidence >= 70 ? 'success' : diff.confidence >= 50 ? 'warning' : ''}`}>
                      {diff.confidence}%
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-[#2d2a33]/60">ICHD-3: {diff.code}</p>
                  {diff.recommendation && (
                    <div className="clay-alert info text-sm">{diff.recommendation}</div>
                  )}
                </div>
              ))}
              {results.differentials?.length === 0 && (
                <div className="clay-card p-8 text-center">
                  <h3 className="mb-3 text-lg font-semibold">No Clear Diagnosis</h3>
                  <p className="text-[#2d2a33]/60">Please consult a healthcare provider.</p>
                </div>
              )}
              <div className="mt-8 clay-alert warning">
                <strong>⚕️ Disclaimer:</strong> Educational only. Verify with a healthcare provider.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-[#ebe7df] text-[#2d2a33] p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-4">
          <button onClick={() => setStarted(false)} className="clay-icon h-11 w-11">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Headache Diagnostic</h1>
            <p className="text-sm text-[#2d2a33]/60">Step {stepIndex + 1} of {totalSteps}</p>
          </div>
        </div>

        <div className="mb-10">
          <div className="clay-progress-track">
            <div className="clay-progress-fill" style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }} />
          </div>
        </div>

        <div className="clay-card p-8">
          <h2 className="mb-2 text-xl font-semibold">{currentQuestion.title}</h2>
          {currentQuestion.description && <p className="mb-6 text-[#2d2a33]/60">{currentQuestion.description}</p>}

          {(currentQuestion.type === 'yes-no' || currentQuestion.type === 'multiple-choice') && (
            <div className="space-y-3">
              {currentQuestion.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                  className={`clay-pill w-full text-left ${answers[currentQuestion.id] === opt.value ? 'selected' : ''}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multi-select' && (
            <div className="space-y-3">
              {currentQuestion.options.map((opt, i) => {
                const selected = (answers[currentQuestion.id] || []).includes(opt.id);
                return (
                  <button key={i} onClick={() => {
                    const current = answers[currentQuestion.id] || [];
                    const updated = selected ? current.filter(id => id !== opt.id) : [...current, opt.id];
                    handleAnswer(currentQuestion.id, updated);
                  }}
                  className={`clay-pill w-full text-left ${selected ? 'selected' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition ${selected ? 'border-white bg-white/20' : 'border-[#2d2a33]/30'}`}>
                        {selected && <CheckCircle className="h-4 w-4" />}
                      </span>
                      {opt.label || opt.name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {currentQuestion.type === 'scale' && (
            <div className="flex gap-2">
              {currentQuestion.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                  className={`clay-pill flex-1 text-center ${answers[currentQuestion.id] === opt.value ? 'selected' : ''}`}>
                  <div className="text-2xl font-bold">{opt.value}</div>
                  <div className="text-xs opacity-70">{opt.label}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getQuestions() {
  return {
    onset: { id: 'onset', title: 'When did headaches begin?', type: 'multiple-choice', options: [
      { value: 'days_7', label: 'Within last week' }, { value: 'weeks_2', label: '2 weeks - 1 month' },
      { value: 'months_1', label: '1-3 months' }, { value: 'months_3', label: '3-6 months' },
      { value: 'months_6', label: '6 months - 1 year' }, { value: 'year_plus', label: '>1 year' },
      { value: 'years_many', label: 'Many years' }
    ]},
    frequency: { id: 'frequency', title: 'How often?', type: 'multiple-choice', options: [
      { value: 'rarely', label: 'Rarely (<1/mo)' }, { value: 'few_month', label: 'Few times/month' },
      { value: 'weekly', label: 'Weekly' }, { value: 'few_week', label: 'Several/week' },
      { value: 'daily', label: 'Daily' }, { value: 'multiple_daily', label: 'Multiple daily' }
    ]},
    duration: { id: 'duration', title: 'How long do they last?', type: 'multiple-choice', options: [
      { value: 'seconds', label: 'Seconds' }, { value: 'minutes_15', label: '1-15 min' },
      { value: 'minutes_30', label: '15-30 min' }, { value: 'hours_2', label: '30 min - 2 hr' },
      { value: 'hours_4', label: '2-4 hr' }, { value: 'hours_12', label: '4-12 hr' },
      { value: 'hours_24', label: '12-24 hr' }, { value: 'hours_72', label: '24-72 hr' },
      { value: 'continuous', label: 'Non-stop' }
    ]},
    location: { id: 'location', title: 'Where is pain?', type: 'multiple-choice', options: [
      { value: 'right', label: 'Right side only' }, { value: 'left', label: 'Left side only' },
      { value: 'unilateral', label: 'One side (varies)' }, { value: 'bilateral', label: 'Both sides' },
      { value: 'orbit', label: 'Around eye' }, { value: 'diffuse', label: 'Entire head' }
    ]},
    quality: { id: 'quality', title: 'Pain feel? (select all)', type: 'multi-select', options: [
      { id: 'pulsating', name: 'Pulsating/Throbbing' }, { id: 'pressing', name: 'Pressing/Tightening' },
      { id: 'stabbing', name: 'Sharp/Stabbing' }, { id: 'electric', name: 'Electric shock' },
      { id: 'aching', name: 'Dull/Aching' }, { id: 'pressure', name: 'Pressure' }
    ]},
    intensity: { id: 'intensity', title: 'Severity?', type: 'scale', options: [
      { value: 1, label: 'Mild' }, { value: 2, label: 'Moderate' },
      { value: 3, label: 'Bad' }, { value: 4, label: 'Severe' }, { value: 5, label: 'Extreme' }
    ]},
    worsening: { id: 'worsening', title: 'Activity worsens pain?', type: 'yes-no', options: [
      { value: true, label: 'Yes, worse with activity' }, { value: false, label: 'No, activity OK' }
    ]},
    nausea: { id: 'nausea', title: 'Nausea or vomiting?', type: 'yes-no', options: [
      { value: true, label: 'Yes' }, { value: false, label: 'No' }
    ]},
    photophobia: { id: 'photophobia', title: 'Sensitive to light?', type: 'yes-no', options: [
      { value: true, label: 'Yes' }, { value: false, label: 'No' }
    ]},
    phonophobia: { id: 'phonophobia', title: 'Sensitive to sound?', type: 'yes-no', options: [
      { value: true, label: 'Yes' }, { value: false, label: 'No' }
    ]},
    autonomic: { id: 'autonomic', title: 'Eye/nose symptoms?', type: 'multi-select', options: [
      { id: 'tearing', name: 'Watery eye' }, { id: 'red_eye', name: 'Red eye' },
      { id: 'congestion', name: 'Blocked nose' }, { id: 'ptosis', name: 'Drooping eyelid' },
      { id: 'sweat', name: 'Facial sweat' }
    ]},
    indomethacin: { id: 'indomethacin', title: 'Indomethacin tried?', type: 'yes-no', options: [
      { value: 'yes_complete', label: 'Yes - complete relief' }, { value: 'yes_partial', label: 'Partial relief' },
      { value: 'no', label: "Haven't tried" }, { value: 'no_relief', label: 'No relief' }
    ]},
    trauma: { id: 'trauma', title: 'Recent head injury?', type: 'yes-no', options: [
      { value: true, label: 'Yes, recent' }, { value: false, label: 'No' }
    ]},
    fever: { id: 'fever', title: 'Fever or sick?', type: 'yes-no', options: [
      { value: true, label: 'Yes, fever' }, { value: false, label: 'No' }
    ]},
    thunderclap: { id: 'thunderclap', title: 'Worst ever thunderclap?', type: 'yes-no', options: [
      { value: true, label: 'Yes, sudden worst' }, { value: false, label: 'No' }
    ]},
    neuro: { id: 'neuro', title: 'New neurological symptoms?', type: 'yes-no', options: [
      { value: true, label: 'Yes (weakness, speech)' }, { value: false, label: 'No' }
    ]}
  };
}