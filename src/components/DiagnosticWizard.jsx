/**
 * Diagnostic Wizard Screen
 * Based on ICHD-3 Criteria
 */

import { useState } from 'react';
import { WIZARD_STEPS, CONDITIONAL_STEPS, SECONDARY_SCREENING, RED_FLAG_SCREENING, diagnose } from '../utils/wizard-logic';

export default function DiagnosticWizard() {
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState(null);
  const [showSecondary, setShowSecondary] = useState(false);
  const [showRedFlags, setShowRedFlags] = useState(false);
  const [phase, setPhase] = useState('primary'); // 'primary', 'secondary', 'red-flags', 'results'

  const allSteps = phase === 'primary' ? WIZARD_STEPS : 
                 phase === 'secondary' ? SECONDARY_SCREENING : 
                 RED_FLAG_SCREENING;

  const handleAnswer = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (phase === 'secondary') {
      setPhase('primary');
      setShowSecondary(false);
    } else if (phase === 'red-flags') {
      setPhase('secondary');
    }
  };

  const getResults = () => {
    const diagnosisResults = diagnose(answers);
    setResults(diagnosisResults);
    setPhase('results');
  };

  const restart = () => {
    setAnswers({});
    setCurrentStep(0);
    setResults(null);
    setShowSecondary(false);
    setShowRedFlags(false);
    setPhase('primary');
  };

  // Render Results
  if (phase === 'results') {
    return <ResultsView results={results} onRestart={restart} answers={answers} />;
  }

  const step = allSteps[currentStep];
  if (!step && phase === 'primary') {
    // Move to secondary screening
    setShowSecondary(true);
    setPhase('secondary');
    setCurrentStep(0);
    return null;
  }
  if (!step && phase === 'secondary') {
    // Move to red flags
    setShowRedFlags(true);
    setPhase('red-flags');
    setCurrentStep(0);
    return null;
  }
  if (!step && phase === 'red-flags') {
    getResults();
    return null;
  }

  return (
    <div className="wizard-container">
      {/* Progress */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((currentStep + 1) / allSteps.length) * 100}%` }} />
      </div>
      <p className="progress-text">
        {phase === 'primary' ? 'Diagnostic Questions' : 
         phase === 'secondary' ? 'Screening' : 'Safety Check'} - Step {currentStep + 1} of {allSteps.length}
      </p>

      {/* Question */}
      <div className="question-card">
        <h2 className="question-title">{step.title}</h2>
        {step.description && <p className="question-desc">{step.description}</p>}
        
        <AnswerInput 
          step={step} 
          value={answers[step.field]} 
          onAnswer={(value) => handleAnswer(step.field, value)}
        />
      </div>

      {/* Navigation */}
      <div className="wizard-nav">
        {currentStep > 0 && (
          <button className="btn-back" onClick={handleBack}>← Back</button>
        )}
      </div>
    </div>
  );
}

// Answer Input Component
function AnswerInput({ step, value, onAnswer }) {
  if (step.type === 'yes-no') {
    return (
      <div className="answer-options">
        {step.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${value === opt.value ? 'selected' : ''}`}
            onClick={() => onAnswer(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (step.type === 'multiple-choice') {
    return (
      <div className="answer-options">
        {step.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${value === opt.value ? 'selected' : ''}`}
            onClick={() => onAnswer(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (step.type === 'multi-select') {
    const selected = value || [];
    return (
      <div className="answer-options">
        {step.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn checkbox ${selected.includes(opt.id) ? 'selected' : ''}`}
            onClick={() => {
              const newVal = selected.includes(opt.id)
                ? selected.filter(id => id !== opt.id)
                : [...selected, opt.id];
              onAnswer(newVal);
            }}
          >
            <span className="checkbox-icon">{selected.includes(opt.id) ? '✓' : '○'}</span>
            {opt.name}
          </button>
        ))}
      </div>
    );
  }

  if (step.type === 'scale') {
    return (
      <div className="scale-container">
        {step.scale.map(item => (
          <button
            key={item.value}
            className={`scale-btn ${value === item.value ? 'selected' : ''}`}
            onClick={() => onAnswer(item.value)}
          >
            <span className="scale-value">{item.value}</span>
            <span className="scale-label">{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return null;
}

// Results View Component
function ResultsView({ results, onRestart, answers }) {
  const hasEmergency = results.some(r => r.id === 'emergency');

  return (
    <div className="results-container">
      <h1>Diagnostic Results</h1>
      
      {hasEmergency && (
        <div className="emergency-box">
          <h2>⚠️ Seek Immediate Medical Care!</h2>
          <p>The following symptoms require immediate attention:</p>
          <ul>
            {results.filter(r => r.id === 'emergency').flatMap(r => r.alerts || []).map((alert, i) => (
              <li key={i}>{alert}</li>
            ))}
          </ul>
        </div>
      )}

      {results.filter(r => r.id !== 'emergency').map((result, i) => (
        <div key={i} className="result-card">
          <h3>{result.name}</h3>
          <p className="result-code">ICHD-3 Code: {result.code}</p>
          <p className="result-confidence">
            Confidence: {result.confidence}%
          </p>
          {result.description && <p>{result.description}</p>}
          {result.criteria && <p className="result-criteria"><strong>Criteria:</strong> {result.criteria}</p>}
          <p className="result-rec">{result.recommendation}</p>
        </div>
      ))}

      {!results.length && (
        <div className="result-card">
          <h3>No Specific Diagnosis</h3>
          <p>Your symptoms don't clearly match a specific headache type.</p>
          <p>Please consult a healthcare provider for proper evaluation.</p>
        </div>
      )}

      <div className="disclaimer">
        <p><strong>Disclaimer:</strong> This is for educational purposes only. 
        Not a substitute for professional medical advice.</p>
      </div>

      <button className="btn-restart" onClick={onRestart}>
        Start New Assessment
      </button>
    </div>
  );
}