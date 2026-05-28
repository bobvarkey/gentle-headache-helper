/**
 * Diagnostic Context - State management for wizard
 */

import { createContext, useContext, useReducer, useEffect } from 'react';

const DiagnosticContext = createContext(null);

const initialState = {
  // Progress
  currentStep: 0,
  totalSteps: 8,
  
  // Responses
  symptoms: {},
  
  // Results
  diagnosis: null,
  alternatives: [],
  redFlags: [],
  confidence: 0,
  
  // Meta
  startedAt: null,
  completedAt: null,
  isComplete: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
      
    case 'SET_SYMPTOM':
      return {
        ...state,
        symptoms: { ...state.symptoms, [action.payload.key]: action.payload.value }
      };
      
    case 'SET_SYMPTOMS':
      return { ...state, symptoms: { ...state.symptoms, ...action.payload } };
      
    case 'SET_DIAGNOSIS':
      return {
        ...state,
        diagnosis: action.payload.diagnosis,
        alternatives: action.payload.alternatives || [],
        redFlags: action.payload.redFlags || [],
        confidence: action.payload.confidence || 0,
        isComplete: true,
        completedAt: new Date().toISOString()
      };
      
    case 'RESET':
      return { ...initialState, startedAt: new Date().toISOString() };
      
    default:
      return state;
  }
}

export function DiagnosticProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    startedAt: new Date().toISOString()
  });

  const value = {
    state,
    dispatch,
    setStep: (step) => dispatch({ type: 'SET_STEP', payload: step }),
    setSymptom: (key, value) => dispatch({ type: 'SET_SYMPTOM', payload: { key, value } }),
    setSymptoms: (symptoms) => dispatch({ type: 'SET_SYMPTOMS', payload: symptoms }),
    setDiagnosis: (diagnosis) => dispatch({ type: 'SET_DIAGNOSIS', payload: diagnosis }),
    reset: () => dispatch({ type: 'RESET' })
  };

  return (
    <DiagnosticContext.Provider value={value}>
      {children}
    </DiagnosticContext.Provider>
  );
}

export function useDiagnostic() {
  const context = useContext(DiagnosticContext);
  if (!context) {
    throw new Error('useDiagnostic must be used within DiagnosticProvider');
  }
  return context;
}

export default DiagnosticContext;