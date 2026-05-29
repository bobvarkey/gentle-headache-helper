/**
 * Diagnostic Context v2 — adaptive, multi-phase state management
 *
 * Phases:
 *   screening   → universal questions for all patients
 *   adaptive    → targeted follow-ups based on top candidate diagnoses
 *   results     → final diagnosis display
 *
 * Each question can be answered and carries importance weight.
 * The engine re-scores after each phase using all accumulated answers.
 */

import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { runFullDiagnosis, getScreeningQuestions, getAdaptiveQuestions } from '../utils/diagnosticEngine';

const DiagnosticContext = createContext(null);

const PHASES = ['screening', 'adaptive', 'results'];

const initialState = {
  phase: 'screening',          // screening → adaptive → results
  answers: {},                 // all answers accumulated
  screeningIndex: 0,           // current question index in screening phase
  adaptiveIndex: 0,            // current question index in adaptive phase
  screeningQuestions: [],      // cached screening question list
  adaptiveQuestions: [],       // computed after screening completes

  // Results
  diagnosis: null,             // { topResult, alternatives, redFlags, scoredDiagnoses, ... }
  recommendations: [],

  // UI state
  startedAt: null,
  completedAt: null,
  isComplete: false,
  isProcessing: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT': {
      return {
        ...initialState,
        screeningQuestions: action.payload.questions,
        startedAt: new Date().toISOString(),
      };
    }

    case 'ANSWER_SCREENING': {
      const newAnswers = { ...state.answers, ...action.payload };
      return { ...state, answers: newAnswers };
    }

    case 'NEXT_SCREENING': {
      const nextIdx = state.screeningIndex + 1;
      if (nextIdx >= state.screeningQuestions.length) {
        // Transition to adaptive phase
        const adaptiveQ = getAdaptiveQuestions(state.answers);
        return {
          ...state,
          screeningIndex: state.screeningQuestions.length,
          phase: adaptiveQ.length > 0 ? 'adaptive' : 'results',
          adaptiveQuestions: adaptiveQ,
          adaptiveIndex: 0,
          isProcessing: true,
        };
      }
      return { ...state, screeningIndex: nextIdx };
    }

    case 'PREV_SCREENING': {
      return {
        ...state,
        screeningIndex: Math.max(0, state.screeningIndex - 1),
      };
    }

    case 'ANSWER_ADAPTIVE': {
      const newAnswers = { ...state.answers, ...action.payload };
      return { ...state, answers: newAnswers };
    }

    case 'NEXT_ADAPTIVE': {
      const nextIdx = state.adaptiveIndex + 1;
      if (nextIdx >= state.adaptiveQuestions.length) {
        return {
          ...state,
          adaptiveIndex: state.adaptiveQuestions.length,
          phase: 'results',
          isProcessing: true,
        };
      }
      return { ...state, adaptiveIndex: nextIdx };
    }

    case 'PREV_ADAPTIVE': {
      return {
        ...state,
        adaptiveIndex: Math.max(0, state.adaptiveIndex - 1),
      };
    }

    case 'COMPUTE_RESULTS': {
      const diagnosis = runFullDiagnosis(state.answers);
      const recommendations = diagnosis.topResult
        ? [] // computed in component
        : [];
      return {
        ...state,
        diagnosis,
        isComplete: true,
        completedAt: new Date().toISOString(),
        isProcessing: false,
      };
    }

    case 'RESET': {
      return { ...initialState, startedAt: new Date().toISOString() };
    }

    default:
      return state;
  }
}

export function DiagnosticProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    startedAt: new Date().toISOString(),
  });

  const init = useCallback(() => {
    dispatch({ type: 'INIT', payload: { questions: getScreeningQuestions() } });
  }, []);

  const answerScreening = useCallback((key, value) => {
    dispatch({ type: 'ANSWER_SCREENING', payload: { [key]: value } });
  }, []);

  const nextScreening = useCallback(() => {
    dispatch({ type: 'NEXT_SCREENING' });
  }, []);

  const prevScreening = useCallback(() => {
    dispatch({ type: 'PREV_SCREENING' });
  }, []);

  const answerAdaptive = useCallback((key, value) => {
    dispatch({ type: 'ANSWER_ADAPTIVE', payload: { [key]: value } });
  }, []);

  const nextAdaptive = useCallback(() => {
    dispatch({ type: 'NEXT_ADAPTIVE' });
  }, []);

  const prevAdaptive = useCallback(() => {
    dispatch({ type: 'PREV_ADAPTIVE' });
  }, []);

  const computeResults = useCallback(() => {
    dispatch({ type: 'COMPUTE_RESULTS' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo(() => ({
    state,
    dispatch,
    init,
    answerScreening,
    nextScreening,
    prevScreening,
    answerAdaptive,
    nextAdaptive,
    prevAdaptive,
    computeResults,
    reset,
  }), [state, init, answerScreening, nextScreening, prevScreening,
      answerAdaptive, nextAdaptive, prevAdaptive, computeResults, reset]);

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
