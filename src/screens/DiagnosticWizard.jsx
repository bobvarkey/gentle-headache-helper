/**
 * Headache Diagnostic Wizard v2 — Adaptive, Multi-Phase
 *
 * Phase 1: Screening — universal questions for all patients
 * Phase 2: Adaptive — targeted follow-ups based on top candidate diagnoses
 * Phase 3: Results — comprehensive differential diagnosis display
 */

import { useEffect, useCallback, useState } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import {
  getConfidenceLabel,
  getRecommendation,
} from '../utils/diagnosticEngine';

export default function DiagnosticWizard() {
  const {
    state,
    init,
    answerScreening,
    nextScreening,
    prevScreening,
    answerAdaptive,
    nextAdaptive,
    prevAdaptive,
    computeResults,
    reset,
  } = useDiagnostic();

  // Initialize on mount
  useEffect(() => {
    if (state.screeningQuestions.length === 0 && !state.startedAt) {
      init();
    }
  }, []);

  const handleRestart = useCallback(() => {
    reset();
    setTimeout(() => init(), 0);
  }, [reset, init]);

  // Determine total steps for progress bar
  const totalSteps = state.screeningQuestions.length + state.adaptiveQuestions.length;
  const currentIdx = state.phase === 'screening'
    ? state.screeningIndex
    : state.phase === 'adaptive'
      ? state.screeningQuestions.length + state.adaptiveIndex
      : totalSteps;
  const progressPct = totalSteps > 0 ? ((currentIdx) / totalSteps) * 100 : 0;

  // =====================================
  // RENDER
  // =====================================

  return (
    <div className="wizard-container">
      {/* Progress bar */}
      {state.phase !== 'results' && (
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(progressPct, 100)}%` }}
            />
          </div>
          <p className="progress-text">
            {state.phase === 'screening' && `Screening question ${state.screeningIndex + 1} of ${state.screeningQuestions.length}`}
            {state.phase === 'adaptive' && `Follow-up ${state.adaptiveIndex + 1} of ${state.adaptiveQuestions.length}`}
          </p>
        </div>
      )}

      {/* Phase indicator */}
      {state.phase !== 'results' && (
        <div className="phase-indicator">
          <span className={`phase-badge ${state.phase === 'screening' ? 'active' : ''}`}>
            📋 Screening
          </span>
          {state.phase === 'adaptive' && (
            <span className="phase-badge active adaptive">
              🎯 Follow-up
            </span>
          )}
          <span className={`phase-badge ${state.phase === 'results' ? 'active' : ''}`}>
            📊 Results
          </span>
        </div>
      )}

      {/* ============ SCREENING PHASE ============ */}
      {state.phase === 'screening' && (
        <ScreeningPhase
          questions={state.screeningQuestions}
          index={state.screeningIndex}
          answers={state.answers}
          onAnswer={answerScreening}
          onNext={nextScreening}
          onPrev={prevScreening}
        />
      )}

      {/* ============ ADAPTIVE PHASE ============ */}
      {state.phase === 'adaptive' && (
        <AdaptivePhase
          questions={state.adaptiveQuestions}
          index={state.adaptiveIndex}
          answers={state.answers}
          onAnswer={answerAdaptive}
          onNext={nextAdaptive}
          onPrev={prevAdaptive}
          onDone={computeResults}
        />
      )}

      {/* ============ RESULTS ============ */}
      {state.phase === 'results' && !state.diagnosis && (
        <ProcessingOverlay computeResults={computeResults} />
      )}

      {state.phase === 'results' && state.diagnosis && (
        <ResultsPhase
          diagnosis={state.diagnosis}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════
// PROCESSING OVERLAY
// ══════════════════════════════════════════════

function ProcessingOverlay({ computeResults }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) {
      setDone(true);
      computeResults();
    }
  }, [done, computeResults]);

  return (
    <div className="processing-container">
      <div className="pulse-loader"></div>
      <h3>Analyzing your responses...</h3>
      <p>Running ICHD-3 diagnostic criteria against your answers</p>
    </div>
  );
}

// ══════════════════════════════════════════════
// SCREENING PHASE
// ══════════════════════════════════════════════

function ScreeningPhase({ questions, index, answers, onAnswer, onNext, onPrev }) {
  const question = questions[index];
  if (!question) {
    return <div className="question-step"><p>No more questions — analysing...</p></div>;
  }

  return (
    <div className="question-step">
      <h2 className="question-title">{question.text}</h2>
      <QuestionInput
        question={question}
        value={answers[question.id]}
        onChange={(val) => onAnswer(question.id, val)}
      />
      <div className="nav-buttons">
        {index > 0 && (
          <button className="back-btn" onClick={onPrev}>← Back</button>
        )}
        <button
          className="next-btn"
          onClick={onNext}
        >
          {index < questions.length - 1 ? 'Next →' : 'Analyze →'}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// ADAPTIVE PHASE
// ══════════════════════════════════════════════

function AdaptivePhase({ questions, index, answers, onAnswer, onNext, onPrev, onDone }) {
  const question = questions[index];
  if (!question) {
    return <div className="question-step"><p>Loading follow-up questions...</p></div>;
  }

  return (
    <div className="question-step adaptive-step">
      <div className="adaptive-badge">
        🎯 Targeted question
      </div>
      <h2 className="question-title">{question.text}</h2>
      <QuestionInput
        question={question}
        value={answers[question.key]}
        onChange={(val) => onAnswer(question.key, val)}
      />
      <div className="nav-buttons">
        {index > 0 && (
          <button className="back-btn" onClick={onPrev}>← Back</button>
        )}
        <button
          className="next-btn"
          onClick={index < questions.length - 1 ? onNext : onDone}
        >
          {index < questions.length - 1 ? 'Next →' : 'Get Results'}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// QUESTION INPUT — renders the right input type
// ══════════════════════════════════════════════

function QuestionInput({ question, value, onChange }) {
  switch (question.type) {
    case 'boolean':
      return (
        <div className="boolean-group">
          <button
            className={`toggle-btn ${value === true ? 'active-yes' : ''}`}
            onClick={() => onChange(true)}
          >
            ✅ Yes
          </button>
          <button
            className={`toggle-btn ${value === false ? 'active-no' : ''}`}
            onClick={() => onChange(false)}
          >
            ❌ No
          </button>
        </div>
      );

    case 'choice':
      return (
        <div className="choice-group">
          {question.options.map((opt, i) => {
            const label = typeof opt === 'string' ? opt : opt.label;
            const val = typeof opt === 'string' ? opt : opt.value;
            return (
              <label key={i} className={`choice-card ${value === val ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={question.id || question.key}
                  checked={value === val}
                  onChange={() => onChange(val)}
                  className="hidden-radio"
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      );

    case 'choice-multi':
      return (
        <div className="multi-choice-group">
          {question.options.map((opt, i) => {
            const label = typeof opt === 'string' ? opt : opt.label;
            const val = typeof opt === 'string' ? opt : opt.value;
            const selected = Array.isArray(value) && value.includes(val);
            return (
              <label key={i} className={`choice-card ${selected ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => {
                    const current = Array.isArray(value) ? [...value] : [];
                    const updated = selected
                      ? current.filter(v => v !== val)
                      : [...current, val];
                    onChange(updated);
                  }}
                  className="hidden-checkbox"
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      );

    default:
      return <p className="error-text">Unknown question type: {question.type}</p>;
  }
}

// ══════════════════════════════════════════════
// RESULTS PHASE
// ══════════════════════════════════════════════

function ResultsPhase({ diagnosis, onRestart }) {
  const { topResult, alternatives, redFlags, hasEmergency, hasWarning, scoredDiagnoses } = diagnosis;

  const topConf = topResult ? getConfidenceLabel(topResult.confidence) : null;
  const recommendations = topResult ? getRecommendation(topResult, redFlags) : [];

  // Emergency override — if red flags are present, show them above everything
  const criticalRedFlags = redFlags.filter(r => r.priority === 'emergency');
  const warningRedFlags = redFlags.filter(r => r.priority === 'warning');

  // Top alternative diagnoses (excluding the topResult)
  const differential = alternatives.filter(a => a !== topResult);

  return (
    <div className="results-container animate-fade-in">

      {/* ═══ EMERGENCY OVERRIDE ═══ */}
      {hasEmergency && (
        <div className="emergency-banner">
          <div className="emergency-icon">🚨</div>
          <h2>Potential Medical Emergency Detected</h2>
          <p className="emergency-text">
            Your responses indicate symptoms that require <strong>immediate medical evaluation</strong>.
          </p>
          <ul className="emergency-list">
            {criticalRedFlags.map((flag, i) => (
              <li key={i}>{flag.text}</li>
            ))}
          </ul>
          <div className="emergency-action">
            <strong>Please go to the nearest Emergency Department or call emergency services immediately.</strong>
          </div>
        </div>
      )}

      {/* ═══ WARNING RED FLAGS ═══ */}
      {!hasEmergency && warningRedFlags.length > 0 && (
        <div className="warning-banner">
          <div className="warning-icon">⚠️</div>
          <h3>Symptoms Requiring Further Evaluation</h3>
          <ul className="warning-list">
            {warningRedFlags.map((flag, i) => (
              <li key={i}>{flag.text}</li>
            ))}
          </ul>
          <p className="warning-text">Please schedule an appointment with your healthcare provider.</p>
        </div>
      )}

      {/* ═══ PRIMARY DIAGNOSIS ═══ */}
      <div className="diagnosis-header">
        <h2 className="results-title">Assessment Results</h2>
      </div>

      {topResult && topResult.confidence >= 25 ? (
        <div className="diagnosis-card">
          <div className="diagnosis-code">{topResult.code}</div>
          <h3 className="diagnosis-name">{topResult.name}</h3>
          {topResult.description && (
            <p className="diagnosis-desc">{topResult.description}</p>
          )}

          {/* Confidence gauge */}
          <div className="confidence-section">
            <div className="confidence-label" style={{ color: topConf?.color }}>
              {topConf?.icon} {topConf?.label} Confidence
            </div>
            <div className="confidence-gauge">
              <div
                className="gauge-fill"
                style={{
                  width: `${topResult.confidence}%`,
                  backgroundColor: topConf?.color,
                }}
              />
            </div>
            <div className="confidence-percent" style={{ color: topConf?.color }}>
              {topResult.confidence}%
            </div>
          </div>

          {/* Criteria breakdown */}
          <div className="criteria-summary">
            <strong>ICHD-3 Criteria Met:</strong> {topResult.criteriaMet} / {topResult.criteriaTotal}
          </div>

          {/* Match details */}
          {topResult.matchDetails && (
            <div className="match-details">
              {Object.entries(topResult.matchDetails).map(([key, detail]) => (
                <div key={key} className={`match-item ${detail.met ? 'met' : 'unmet'}`}>
                  <span className="match-icon">{detail.met ? '✅' : '❌'}</span>
                  <span className="match-text">{detail.text}</span>
                  {detail.subCriteria && (
                    <div className="sub-match-list">
                      {detail.subCriteria.map((sub, i) => (
                        <span key={i} className={`sub-match ${sub.met ? 'sub-met' : 'sub-unmet'}`}>
                          {sub.met ? '✓' : '✗'} {sub.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="diagnosis-card inconclusive">
          <h3>Inconclusive</h3>
          <p>Could not confidently identify a specific headache type from the provided information.</p>
          <p className="hint-text">This may be because the symptom pattern doesn't clearly match any ICHD-3 diagnosis, or answers were inconsistent.</p>
        </div>
      )}

      {/* ═══ DIFFERENTIAL DIAGNOSIS ═══ */}
      {differential.length > 0 && (
        <div className="differential-section">
          <h3 className="section-title">Other Possibilities (Differential Diagnosis)</h3>
          {differential.map((dx, i) => {
            const conf = getConfidenceLabel(dx.confidence);
            return (
              <div key={i} className="differential-card">
                <div className="diff-header">
                  <span className="diff-name">{dx.code && `${dx.code} `}{dx.name}</span>
                  <span className="diff-conf" style={{ color: conf.color }}>
                    {conf.label} ({dx.confidence}%)
                  </span>
                </div>
                {dx.description && <p className="diff-desc">{dx.description}</p>}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ ALL SCORED DIAGNOSES ═══ */}
      {scoredDiagnoses && scoredDiagnoses.length > 0 && (
        <div className="all-scored-section">
          <h3 className="section-title">All ICHD-3 Matches</h3>
          <div className="scored-grid">
            {scoredDiagnoses.slice(0, 10).map((dx, i) => (
              <div key={i} className="scored-row">
                <span className="scored-rank">#{i + 1}</span>
                <span className="scored-name">{dx.name}</span>
                <span className="scored-pct">{dx.confidence}%</span>
                <div className="scored-bar">
                  <div
                    className="scored-fill"
                    style={{
                      width: `${dx.confidence}%`,
                      backgroundColor: getConfidenceLabel(dx.confidence).color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ RECOMMENDATIONS ═══ */}
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h3 className="section-title">Recommendations</h3>
          {recommendations.map((rec, i) => (
            <div key={i} className={`recommendation-card rec-${rec.type}`}>
              <p>{rec.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* ═══ RED FLAGS SUMMARY ═══ */}
      {redFlags.length > 0 && (
        <div className="red-flags-summary">
          <h3 className="section-title">📋 Red Flags Detected</h3>
          {redFlags.map((flag, i) => (
            <div key={i} className={`red-flag-item ${flag.priority}`}>
              <span className={`flag-badge ${flag.priority}`}>
                {flag.priority === 'emergency' ? '🚨' : '⚠️'}
              </span>
              <span className="flag-text">{flag.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* ═══ WHAT WAS ANALYZED ═══ */}
      <div className="data-summary">
        <h3 className="section-title">Data Analyzed</h3>
        <p className="summary-text">
          {Object.keys(diagnosis.scoredDiagnoses?.[0]?.matchDetails || {}).length} ICHD-3 diagnostic criteria evaluated across{' '}
          {scoredDiagnoses?.length || 0} headache classifications.
        </p>
        <p className="summary-text">
          Based on {Object.keys(diagnosis).length} symptom responses.
        </p>
      </div>

      {/* ═══ DISCLAIMER ═══ */}
      <div className="disclaimer-box">
        <p>
          ⚕️ <strong>Important:</strong> This tool is for <strong>educational and informational purposes only</strong>.
          It is not a substitute for professional medical advice, diagnosis, or treatment.
          Always seek the advice of your physician or other qualified health provider with any
          questions you may have regarding a medical condition.
        </p>
      </div>

      {/* ═══ RESTART ═══ */}
      <button className="restart-btn" onClick={onRestart}>
        Start New Assessment
      </button>
    </div>
  );
}
