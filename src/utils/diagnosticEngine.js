/**
 * Diagnostic Engine - Evaluates symptoms against ICHD-3 criteria
 */

import { HEADACHE_CATEGORIES, RED_FLAGS } from '../data/headacheData';

/**
 * Check if symptom responses meet diagnostic criteria
 */
export function evaluateCriteria(criteria, responses) {
  const results = {
    met: [],
    unmet: [],
    partial: 0,
    total: 0,
    percentage: 0
  };

  for (const [key, criterion] of Object.entries(criteria)) {
    const req = criterion.required;
    const matches = criterion.matches; // Can match multiple sub-criteria
    
    results.total++;
    
    if (req) {
      // Required criterion
      if (responses[key]) {
        results.met.push({ key, text: criterion.text });
        results.partial++;
      } else {
        results.unmet.push({ key, text: criterion.text });
      }
    } else {
      // Optional but supporting - give partial credit
      if (responses[key]) {
        results.met.push({ key, text: criterion.text });
        results.partial += 0.5;
      }
    }
  }

  if (results.total > 0) {
    results.percentage = Math.round((results.partial / results.total) * 100);
  }

  return results;
}

/**
 * Main diagnostic function
 */
export function diagnose(symptoms) {
  const results = [];
  const redFlags = checkRedFlags(symptoms);
  
  // Check primary headaches
  for (const category of Object.values(HEADACHE_CATEGORIES)) {
    if (category.id === 'primary') {
      for (const subtype of category.subtypes) {
        const match = evaluateHeadacheType(subtype, symptoms);
        if (match) {
          results.push(match);
        }
      }
    }
  }

  // Add secondary considerations if red flags present
  if (redFlags.length > 0) {
    const secondaryCategory = HEADACHE_CATEGORIES.secondary;
    results.unshift({
      id: 'needs-evaluation',
      name: 'Requires Medical Evaluation',
      confidence: 100,
      reason: 'Red flags detected',
      priority: 'emergency',
      recommendation: 'Please seek immediate medical attention'
    });
  }

  // Sort by confidence
  results.sort((a, b) => b.confidence - a.confidence);

  return {
    topResult: results[0] || null,
    alternatives: results.slice(1, 4),
    redFlags,
    shouldSeekCare: redFlags.some(r => r.priority === 'emergency')
  };
}

/**
 * Evaluate a specific headache type
 */
function evaluateHeadacheType(headacheType, symptoms) {
  const criteria = headacheType.criteria;
  const criteriaMatch = evaluateCriteria(criteria, symptoms);
  
  // Basic criteria matching
  let baseConfidence = criteriaMatch.percentage;
  
  // Additional weighting for key symptoms
  let bonusPoints = 0;
  
  // Duration matching
  if (symptoms.duration && headacheType.expectedDuration) {
    const durations = headacheType.expectedDuration;
    if (durations.includes(symptoms.duration)) {
      bonusPoints += 10;
    }
  }
  
  // Frequency bonus
  if (symptoms.frequency && headacheType.expectedFrequency) {
    if (symptoms.frequency >= headacheType.expectedFrequency.min && 
        symptoms.frequency <= headacheType.expectedFrequency.max) {
      bonusPoints += 10;
    }
  }

  const confidence = Math.min(100, baseConfidence + bonusPoints);
  
  if (confidence >= 50) {
    return {
      id: headacheType.id,
      name: headacheType.name,
      code: headacheType.code,
      description: headacheType.description,
      category: 'primary',
      confidence,
      criteria: criteriaMatch,
      metCriteria: criteriaMatch.met.length,
      unmetCriteria: criteriaMatch.unmet.length
    };
  }

  return null;
}

/**
 * Check for red flags
 */
export function checkRedFlags(symptoms) {
  const detected = [];

  for (const flag of RED_FLAGS) {
    const response = symptoms[flag.id];
    if (response === true || response === 'yes') {
      detected.push(flag);
    }
  }

  // Additional implicit red flags based on patterns
  if (symptoms.suddenWorst === true) {
    detected.push({
      id: 'worst-sudden',
      text: 'Sudden worst headache of life',
      priority: 'emergency',
      description: 'Could indicate subarachnoid hemorrhage or stroke'
    });
  }

  if (symptoms.progressiveWorsening === true && symptoms.durationWeeks > 4) {
    detected.push({
      id: 'progressive-worse',
      text: 'Progressively worsening headache >4 weeks',
      priority: 'warning',
      description: 'Requires imaging to rule out mass lesion'
    });
  }

  return detected;
}

/**
 * Get confidence label
 */
export function getConfidenceLabel(confidence) {
  if (confidence >= 90) return { label: 'Very High', color: 'green' };
  if (confidence >= 75) return { label: 'High', color: 'blue' };
  if (confidence >= 60) return { label: 'Moderate', color: 'yellow' };
  if (confidence >= 40) return { label: 'Low', color: 'orange' };
  return { label: 'Very Low', color: 'red' };
}

/**
 * Generate recommendation based on diagnosis
 */
export function getRecommendation(diagnosis, redFlags) {
  const recommendations = [];

  if (redFlags.length > 0) {
    recommendations.push({
      type: 'emergency',
      text: '⚠️ Seek immediate medical attention for evaluation'
    });
  }

  if (!diagnosis) {
    recommendations.push({
      type: 'general',
      text: 'Unable to determine specific classification. Please consult a healthcare provider.'
    });
    return recommendations;
  }

  // Type-specific recommendations
  switch (diagnosis.id) {
    case 'migraine':
      recommendations.push({
        type: 'lifestyle',
        text: 'Consider lifestyle modifications: regular sleep, hydration, avoiding triggers'
      });
      if (diagnosis.confidence >= 75) {
        recommendations.push({
          type: 'treatment',
          text: 'Acute: Triptans may be appropriate. Preventive: Discuss with provider.'
        });
      }
      break;
      
    case 'tth':
      recommendations.push({
        type: 'lifestyle',
        text: 'Stress management, posture correction, regular exercise'
      });
      recommendations.push({
        type: 'treatment',
        text: 'NSAIDs as needed. Consider prophylactic if frequent.'
      });
      break;
      
    case 'cluster-headache':
      recommendations.push({
        type: 'urgent',
        text: 'Consult neurologist - specific treatments available'
      });
      recommendations.push({
        type: 'treatment',
        text: 'Oxygen therapy, verapamil, or triptans may be prescribed'
      });
      break;
      
    case 'medication-overuse':
      recommendations.push({
        type: 'urgent',
        text: 'STOP overusing acute medication - may be causing rebound headaches'
      });
      recommendations.push({
        type: 'treatment',
        text: 'Discuss prevention medication with your provider'
      });
      break;
      
    default:
      recommendations.push({
        type: 'general',
        text: 'Consult a healthcare provider for proper evaluation and management'
      });
  }

  recommendations.push({
    type: 'disclaimer',
    text: 'This is for educational purposes only. Always consult a qualified healthcare provider for diagnosis and treatment.'
  });

  return recommendations;
}