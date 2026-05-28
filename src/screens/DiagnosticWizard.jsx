/**
 * Headache Diagnostic Wizard - Simplified Version
 * Fixed syntax errors
 */

import { useState } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { diagnose, getRecommendation, getConfidenceLabel } from '../utils/diagnosticEngine';
import { 
  PAIN_LOCATIONS, 
  PAIN_QUALITIES, 
  ASSOCIATED_SYMPTOMS,
  DURATION_OPTIONS, 
  FREQUENCY_OPTIONS, 
  RED_FLAGS,
  HEADACHE_CATEGORIES
} from '../data/headacheData';

export default function DiagnosticWizard() {
  const { state, setSymptom, setDiagnosis, reset } = useDiagnostic();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { id: 'onset', title: 'When did headaches start?' },
    { id: 'frequency', title: 'How often?' },
    { id: 'duration', title: 'How long?' },
    { id: 'location', title: 'Where is pain?' },
    { id: 'quality', title: 'Pain quality?' },
    { id: 'intensity', title: 'Severity?' },
    { id: 'associated', title: 'Other symptoms?' },
    { id: 'redflags', title: 'Concerning symptoms?' },
    { id: 'results', title: 'Results' }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const result = diagnose(state.symptoms);
      setDiagnosis(result);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  
  return (
    <div className="wizard-container">
      {/* Progress */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
        </div>
        <p className="progress-text">Step {currentStep + 1} of {steps.length}</p>
      </div>
      
      {/* Questions */}
      <div className="question-container">
        {currentStep === 0 && <OnsetStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 1 && <FrequencyStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 2 && <DurationStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 3 && <LocationStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 4 && <QualityStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 5 && <IntensityStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 6 && <AssociatedStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 7 && <RedFlagsStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 8 && (
          <ResultsStep 
            diagnosis={state.diagnosis?.topResult} 
            redFlags={state.diagnosis?.redFlags}
            onRestart={reset}
          />
        )}
      </div>
      
      {/* Navigation */}
      {currentStep < steps.length - 1 && (
        <div className="nav-buttons">
          {currentStep > 0 && (
            <button className="back-btn" onClick={handleBack}>Back</button>
          )}
          <button className="next-btn" onClick={handleNext}>
            {currentStep === steps.length - 2 ? 'Get Results' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}

// Step Components
function OnsetStep({ onChange, values }) {
  return (
    <div className="question-step">
      <h2 className="question-title">When did headaches start?</h2>
      <select 
        className="input-select"
        value={values.onset || ''}
        onChange={(e) => onChange('onset', e.target.value)}
      >
        <option value="">Select...</option>
        <option value="days-7">Within the last week</option>
        <option value="weeks-2">2 weeks to 1 month</option>
        <option value="months-1">1-3 months</option>
        <option value="months-3">3-6 months</option>
        <option value="months-6">6 months to 1 year</option>
        <option value="year-plus">More than 1 year</option>
      </select>
    </div>
  );
}

function FrequencyStep({ onChange, values }) {
  return (
    <div className="question-step">
      <h2 className="question-title">How often do headaches occur?</h2>
      <div className="option-grid">
        {FREQUENCY_OPTIONS.map(opt => (
          <label key={opt.id} className="option-label">
            <input
              type="radio"
              name="frequency"
              checked={values.frequency === opt.value}
              onChange={() => onChange('frequency', opt.value)}
            />
            <span>{opt.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function DurationStep({ onChange, values }) {
  return (
    <div className="question-step">
      <h2 className="question-title">How long do headaches last?</h2>
      <div className="option-grid">
        {DURATION_OPTIONS.slice(0, 6).map(opt => (
          <label key={opt.id} className="option-label">
            <input
              type="radio"
              name="duration"
              checked={values.duration === opt.id}
              onChange={() => onChange('duration', opt.id)}
            />
            <span>{opt.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function LocationStep({ onChange, values }) {
  return (
    <div className="question-step">
      <h2 className="question-title">Where is the pain located?</h2>
      <div className="option-grid">
        {PAIN_LOCATIONS.slice(0, 8).map(loc => (
          <label key={loc.id} className="option-label">
            <input
              type="radio"
              name="location"
              checked={values.location === loc.id}
              onChange={() => onChange('location', loc.id)}
            />
            <span>{loc.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function QualityStep({ onChange, values }) {
  return (
    <div className="question-step">
      <h2 className="question-title">What does the pain feel like?</h2>
      <div className="option-grid">
        {PAIN_QUALITIES.map(qual => (
          <label key={qual.id} className="option-label">
            <input
              type="checkbox"
              checked={values[`quality-${qual.id}`] === true}
              onChange={() => onChange(`quality-${qual.id}`, !values[`quality-${qual.id}`])}
            />
            <span>{qual.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function IntensityStep({ onChange, values }) {
  return (
    <div className="question-step">
      <h2 className="question-title">How severe is the pain?</h2>
      <div className="scale-container">
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            className={`scale-button ${values.intensity === val ? 'active' : ''}`}
            onClick={() => onChange('intensity', val)}
          >
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{val}</span>
            <span style={{ fontSize: '11px' }}>
              {val === 1 && 'Mild'}
              {val === 2 && 'Moderate'}
              {val === 3 && 'Severe'}
              {val === 4 && 'Very Severe'}
              {val === 5 && 'Max'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AssociatedStep({ onChange, values }) {
  return (
    <div className="question-step">
      <h2 className="question-title">Any associated symptoms?</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Select all that apply:</p>
      <div className="option-grid">
        {ASSOCIATED_SYMPTOMS.slice(0, 12).map(sym => (
          <label key={sym.id} className="option-label">
            <input
              type="checkbox"
              checked={values[sym.id] === true}
              onChange={() => onChange(sym.id, !values[sym.id])}
            />
            <span>{sym.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function RedFlagsStep({ onChange, values }) {
  return (
    <div className="question-step">
      <h2 className="question-title">Any concerning symptoms?</h2>
      <p style={{ 
        backgroundColor: '#FFF3CD', 
        border: '1px solid #FFECB5', 
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '16px',
        fontSize: '14px',
        color: '#856404'
      }}>
        ⚠️ These symptoms require prompt medical attention
      </p>
      <div className="option-grid">
        {RED_FLAGS.map(flag => (
          <label key={flag.id} className="option-label">
            <input
              type="checkbox"
              checked={values[flag.id] === true}
              onChange={() => onChange(flag.id, !values[flag.id])}
            />
            <span>{flag.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ResultsStep({ diagnosis, redFlags, onRestart }) {
  const conf = diagnosis ? getConfidenceLabel(diagnosis.confidence) : { label: 'N/A', color: 'gray' };
  const recommendations = diagnosis ? getRecommendation(diagnosis, redFlags || []) : [];
  
  return (
    <div className="results-container">
      <h2 className="results-title">Diagnostic Results</h2>
      
      {redFlags && redFlags.length > 0 && (
        <div className="emergency-box">
          <h3>⚠️ Emergency Symptoms Detected</h3>
          {redFlags.map((flag, i) => (
            <p key={i}>{flag.text}</p>
          ))}
        </div>
      )}
      
      <div className="result-card">
        <h3>{diagnosis?.name || 'No specific diagnosis'}</h3>
        <p style={{ color: '#666', marginTop: '4px' }}>
          {diagnosis?.description || 'Unable to determine classification with current information'}
        </p>
        <div className="confidence-badge">
          <span>{conf.label}</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {diagnosis?.confidence || 0}%
          </span>
        </div>
      </div>
      
      {recommendations.map((rec, i) => (
        <div key={i} className="recommendation">
          {rec.text}
        </div>
      ))}
      
      <p className="disclaimer-text">
        ⚕️ This tool is for educational purposes only. 
        Verify results with a qualified healthcare provider.
      </p>
      
      <button className="restart-btn" onClick={onRestart}>
        Start New Assessment
      </button>
    </div>
  );
}