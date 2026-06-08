/**
 * Diagnostic Route - ICHD-3 Headache Diagnostic
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { diagnose, formatDifferentialResults } from "../utils/diagnostic-engine";
import { HEADACHE_TYPES } from "../data/headacheData";

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
      <div className="min-h-screen bg-[#f7f5ef] text-[#1f2230] p-6">
        <div className="mx-auto max-w-2xl pt-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f2230] text-[#f7f5ef]">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Headache Diagnostic</h1>
              <p className="text-sm text-[#1f2230]/60">Based on ICHD-3 Classification</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">How it works</h2>
            <ul className="space-y-3 text-[#1f2230]/80">
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f2230] text-[#f7f5ef] text-sm">1</span>Answer questions about your headache symptoms</li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f2230] text-[#f7f5ef] text-sm">2</span>Get evaluated against ICHD-3 criteria</li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f2230] text-[#f7f5ef] text-sm">3</span>Receive diagnosis with treatment suggestions</li>
            </ul>

            <div className="mt-6 rounded-xl bg-[#fff3cd] p-4 text-sm text-[#856404]">
              <strong>⚕️ Disclaimer:</strong> This tool is for educational purposes only.
            </div>

            <button onClick={startDiagnostic} className="mt-6 w-full rounded-xl bg-[#1f2230] py-4 text-lg font-medium text-[#f7f5ef]">
              Start Diagnostic Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen bg-[#f7f5ef] text-[#1f2230] p-6">
        <div className="mx-auto max-w-2xl">
          <button onClick={restart} className="mb-6 flex items-center gap-2 text-sm text-[#1f2230]/60">
            <ArrowLeft className="h-4 w-4" /> Start new assessment
          </button>

          {results.priority === 'emergency' ? (
            <div className="rounded-2xl border-2 border-red-500 bg-red-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <h2 className="text-2xl font-bold text-red-700">Seek Immediate Medical Care!</h2>
              </div>
              <p className="mb-4 text-red-600">{results.content}</p>
              <div className="rounded-xl bg-red-100 p-4 font-semibold text-red-800">{results.recommendation}</div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{results.title}</h2>
              {results.differentials?.map((diff, i) => (
                <div key={i} className="rounded-2xl bg-white p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{diff.name}</h3>
                    <span className="rounded-full px-3 py-1 text-sm font-medium bg-[#22c55e] text-white">{diff.confidence}%</span>
                  </div>
                  <p className="mb-2 text-sm text-black">ICHD-3: {diff.code}</p>
                  {diff.recommendation && <div className="rounded-lg bg-[#f7f5ef] p-3 text-sm text-black">{diff.recommendation}</div>}
                </div>
              ))}
              {results.differentials?.length === 0 && (
                <div className="rounded-2xl bg-white p-6 text-center">
                  <h3 className="mb-2 text-lg font-semibold">No Clear Diagnosis</h3>
                  <p className="text-[#1f2230]/60">Please consult a healthcare provider.</p>
                </div>
              )}
              <div className="mt-6 rounded-xl bg-[#fef3c7] p-4 text-sm text-[#92400e]">
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
    <div className="min-h-screen bg-[#f7f5ef] text-[#1f2230] p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => setStarted(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Headache Diagnostic</h1>
            <p className="text-sm text-[#1f2230]/60">Step {stepIndex + 1} of {totalSteps}</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-2 h-2 rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-[#1f2230]" style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }} />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">{currentQuestion.title}</h2>
          {currentQuestion.description && <p className="mb-6 text-[#1f2230]/60">{currentQuestion.description}</p>}

          {(currentQuestion.type === 'yes-no' || currentQuestion.type === 'multiple-choice') && (
            <div className="space-y-3">
              {currentQuestion.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                  className={`w-full rounded-xl p-4 text-left transition ${answers[currentQuestion.id] === opt.value ? 'bg-[#1f2230] text-[#f7f5ef]' : 'bg-[#f7f5ef]'}`}>
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
                  className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition ${selected ? 'bg-[#1f2230] text-[#f7f5ef]' : 'bg-[#f7f5ef]'}`}>
                    <span className={`flex h-6 w-6 items-center justify-center rounded border-2 ${selected ? 'border-white bg-white/20' : 'border-gray-400'}`}>
                      {selected && <CheckCircle className="h-4 w-4" />}
                    </span>
                    {opt.label || opt.name}
                  </button>
                );
              })}
            </div>
          )}

          {currentQuestion.type === 'scale' && (
            <div className="flex gap-2">
              {currentQuestion.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                  className={`flex-1 rounded-xl py-4 text-center transition ${answers[currentQuestion.id] === opt.value ? 'bg-[#1f2230] text-[#f7f5ef]' : 'bg-[#f7f5ef]'}`}>
                  <div className="text-2xl font-bold">{opt.value}</div>
                  <div className="text-xs">{opt.label}</div>
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