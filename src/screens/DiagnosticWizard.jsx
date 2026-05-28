/**
 * Headache Diagnostic Wizard
 */

import { useState } from 'react';
import { useDiagnostic } from '../context/DiagnosticContext';
import { diagnose, getRecommendation, getConfidenceLabel } from '../utils/diagnosticEngine';
import { 
  PAIN_LOCATIONS, PAIN_QUALITIES, ASSOCIATED_SYMPTOMS,
  DURATION_OPTIONS, FREQUENCY_OPTIONS, RED_FLAGS 
} from '../data/headacheData';

export default function DiagnosticWizard() {
  const { state, setSymptom, setDiagnosis, reset } = useDiagnostic();
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { id: 'onset', title: 'When did headaches start?' },
    { id: 'frequency', title: 'How often do headaches occur?' },
    { id: 'duration', title: 'How long do headaches last?' },
    { id: 'location', title: 'Where is the pain located?' },
    { id: 'quality', title: 'What does the pain feel like?' },
    { id: 'intensity', title: 'How severe is the pain?' },
    { id: 'associated', title: 'Any associated symptoms?' },
    { id: 'red-flags', title: 'Any concerning symptoms?' },
    { id: 'results', title: 'Results' }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate diagnosis
      const result = diagnose(state.symptoms);
      setDiagnosis(result);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div style={styles.container}>
      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${((currentStep + 1) / steps.length) * 100}%`
            }} 
          />
        </div>
        <p style={styles.progressText}>
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
      
      {/* Question Cards */}
      <div style={styles.questionContainer}>
        {currentStep === 0 && <OnsetStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 1 && <FrequencyStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 2 && <DurationStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 3 && <LocationStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 4 && <QualityStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 5 && <IntensityStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 6 && <AssociatedStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === 7 && <RedFlagsStep onChange={setSymptom} values={state.symptoms} />}
        {currentStep === steps.length - 1 && (
          <ResultsStep 
            diagnosis={state.diagnosis} 
            alternatives={state.alternatives} 
            redFlags={state.redFlags}
            onRestart={reset}
          />
        )}
      </div>
      
      {/* Navigation */}
      {currentStep < steps.length - 1 && (
        <div style={styles.navButtons}>
          {currentStep > 0 && (
            <button style={styles.backButton} onClick={handleBack}>
              Back
            </button>
          )}
          <button style={styles.nextButton} onClick={handleNext}>
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
    <div style={styles.step}>
      <h2 style={styles.questionTitle}>{steps[0].title}</h2>
      <select 
        style={styles.select}
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
        <option value="years-plus">Many years</option>
      </select>
    </div>
  );
}

function FrequencyStep({ onChange, values }) {
  return (
    <div style={styles.step}>
      <h2 style={styles.questionTitle}>{steps[1].title}</h2>
      {FREQUENCY_OPTIONS.map(opt => (
        <label key={opt.id} style={styles.optionLabel}>
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
  );
}

function DurationStep({ onChange, values }) {
  return (
    <div style={styles.step}>
      <h2 style={styles.questionTitle}>{steps[2].title}</h2>
      {DURATION_OPTIONS.map(opt => (
        <label key={opt.id} style={styles.optionLabel}>
          <input
            type="radio"
            name="duration"
            value={opt.id}
            checked={values.duration === opt.id}
            onChange={() => onChange('duration', opt.id)}
          />
          <span>{opt.name}</span>
        </label>
      ))}
    </div>
  );
}

function LocationStep({ onChange, values }) {
  return (
    <div style={styles.step}>
      <h2 style={styles.questionTitle}>{steps[3].title}</h2>
      <div style={styles.grid2}>
        {PAIN_LOCATIONS.map(loc => (
          <label key={loc.id} style={styles.optionLabel}>
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
    <div style={styles.step}>
      <h2 style={styles.questionTitle}>{steps[4].title}</h2>
      <div style={styles.grid2}>
        {PAIN_QUALITIES.map(qual => (
          <label key={qual.id} style={styles.optionLabel}>
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
    <div style={styles.step}>
      <h2 style={styles.questionTitle}>{steps[5].title}</h2>
      <div style={styles.scale}>
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            style={{
              ...styles.scaleButton,
              backgroundColor: values.intensity === val ? '#007AFF' : '#E5E5EA',
              color: values.intensity === val ? '#fff' : '#000'
            }}
            onClick={() => onChange('intensity', val)}
          >
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{val}</span>
            <span style={{ fontSize: '11px' }}>
              {val === 1 && 'Mild'}
              {val === 2 && 'Moderate'}
              {val === 3 && 'Severe'}
              {val === 4 && 'Very Severe'}
              {val === 5 && 'Maximum'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AssociatedStep({ onChange, values }) {
  const handleToggle = (id) => {
    onChange(id, !values[id]);
  };
  
  return (
    <div style={styles.step}>
      <h2 style={styles.questionTitle}>{steps[6].title}</h2>
      <p style={styles.subtitle}>Select all that apply:</p>
      {ASSOCIATED_SYMPTOMS.slice(0, 10).map(symptom => (
        <label key={symptom.id} style={styles.optionLabel}>
          <input
            type="checkbox"
            checked={values[symptom.id] === true}
            onChange={() => handleToggle(symptom.id)}
          />
          <span>{symptom.name}</span>
        </label>
      ))}
    </div>
  );
}

function RedFlagsStep({ onChange, values }) {
  const handleToggle = (id) => {
    onChange(id, !values[id]);
  };
  
  return (
    <div style={styles.step}>
      <h2 style={styles.questionTitle}>{steps[7].title}</h2>
      <p style={styles.warningBox}>
        ⚠️ These symptoms require prompt medical attention
      </p>
      {RED_FLAGS.map(flag => (
        <label key={flag.id} style={styles.optionLabel}>
          <input
            type="checkbox"
            checked={values[flag.id] === true}
            onChange={() => handleToggle(flag.id)}
          />
          <span>{flag.text}</span>
        </label>
      ))}
    </div>
  );
}

function ResultsStep({ diagnosis, alternatives, redFlags, onRestart }) {
  const recommendations = diagnosis ? getRecommendation(diagnosis, redFlags) : [];
  const conf = diagnosis ? getConfidenceLabel(diagnosis.confidence) : { label: 'N/A', color: 'gray' };
  
  return (
    <div style={styles.results}>
      <h2 style={styles.resultsTitle}>Diagnostic Results</h2>
      
      {/* Red Flags Warning */}
      {redFlags && redFlags.length > 0 && (
        <div style={styles.emergencyBox}>
          <h3>⚠️ Emergency Symptoms Detected</h3>
          {redFlags.map((flag, i) => (
            <p key={i}>{flag.text}</p>
          ))}
        </div>
      )}
      
      {/* Main Result */}
      <div style={styles.resultCard}>
        <h3>{diagnosis?.name || 'No specific diagnosis'}</h3>
        <p style={{ color: '#666', marginTop: '4px' }}>
          {diagnosis?.description || 'Unable to determine classification'}
        </p>
        <div style={styles.confidenceBadge}>
          <span style={styles.confidenceLabel}>{conf.label}</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {diagnosis?.confidence || 0}%
          </span>
        </div>
      </div>
      
      {/* Recommendations */}
      {recommendations.map((rec, i) => (
        <div 
          key={i} 
          style={{
            ...styles.recommendation,
            borderLeft: rec.type === 'emergency' ? '4px solid red' :
                     rec.type === 'urgent' ? '4px solid orange' :
                     '4px solid #007AFF'
          }}
        >
          {rec.text}
        </div>
      ))}
      
      {/* Disclaimer */}
      <p style={styles.disclaimer}>
        ⚕️ This tool is for educational purposes only. 
        Results should be verified by a qualified healthcare provider.
      </p>
      
      <button style={styles.restartButton} onClick={onRestart}>
        Start New Assessment
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  progressContainer: {
    marginBottom: '24px'
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#E5E5EA',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    transition: 'width 0.3s ease'
  },
  progressText: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    marginTop: '8px'
  },
  questionContainer: {
    minHeight: '300px'
  },
  step: {
    padding: '16px 0'
  },
  questionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '12px'
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #C7C7CC'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  optionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#F2F2F7',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  scale: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px'
  },
  scaleButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '16px 8px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer'
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    border: '1px solid #FFECB5',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
    fontSize: '14px',
    color: '#856404'
  },
  results: {
    padding: '16px 0'
  },
  resultsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  emergencyBox: {
    backgroundColor: '#FFEBEE',
    border: '1px solid #FFCDD2',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px'
  },
  resultCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px'
  },
  confidenceBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px'
  },
  confidenceLabel: {
    backgroundColor: '#007AFF',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600'
  },
  recommendation: {
    padding: '12px 16px',
    backgroundColor: '#F2F2F7',
    borderRadius: '8px',
    marginBottom: '8px',
    fontSize: '14px'
  },
  disclaimer: {
    fontSize: '12px',
    color: '#8E8E93',
    marginTop: '16px',
    textAlign: 'center'
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginTop: '24px',
    paddingBottom: '32px'
  },
  backButton: {
    padding: '14px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #C7C7CC',
    backgroundColor: '#fff',
    cursor: 'pointer'
  },
  nextButton: {
    flex: 1,
    padding: '14px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007AFF',
    color: '#fff',
    fontWeight: '600',
    cursor: 'pointer'
  },
  restartButton: {
    width: '100%',
    padding: '14px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#34C759',
    color: '#fff',
    fontWeight: '600',
    marginTop: '24px',
    cursor: 'pointer'
  }
};

const steps = [
  { id: 'onset', title: 'When did headaches start?' },
  { id: 'frequency', title: 'How often do headaches occur?' },
  { id: 'duration', title: 'How long do headaches last?' },
  { id: 'location', title: 'Where is the pain located?' },
  { id: 'quality', title: 'What does the pain feel like?' },
  { id: 'intensity', title: 'How severe is the pain?' },
  { id: 'associated', title: 'Any associated symptoms?' },
  { id: 'red-flags', title: 'Any concerning symptoms?' }
];