/**
 * ICHD-3 Diagnostic Decision Engine
 * 
 * Takes user answers and generates differential diagnoses based on ICHD-3 criteria
 * Each headache type is matched against the user's responses
 */

import { HEADACHE_TYPES, RED_FLAGS } from '../data/headacheData';

/**
 * Main diagnostic function - processes all answers and returns differential diagnoses
 */
export function diagnose(answers) {
  const differentials = [];
  const redFlagAlerts = [];
  
  // ==========================================
  // STEP 1: CHECK RED FLAGS FIRST (CRITICAL)
  // ==========================================
  
  const redFlagAnswers = [
    { id: 'thunderclap', value: answers.thunderclap },
    { id: 'fever-neck', value: answers.fever_neck },
    { id: 'neuro-deficit', value: answers.neuro_deficit },
    { id: 'altered-consciousness', value: answers.altered_consciousness },
    { id: 'new-after-50', value: answers.new_after_50 },
    { id: 'progressive-worsening', value: answers.progressive_worsening },
    { id: 'pregnant-postpartum', value: answers.pregnant_postpartum },
    { id: 'immune-compromised', value: answers.immune_compromised }
  ];
  
  for (const flag of redFlagAnswers) {
    if (flag.value === true || flag.value === 'yes') {
      const flagData = RED_FLAGS.find(f => f.id === flag.id);
      if (flagData) {
        redFlagAlerts.push(flagData);
      }
    }
  }
  
  // If emergency red flags, STOP and return emergency
  if (redFlagAlerts.some(f => f.priority === 'emergency')) {
    return {
      type: 'EMERGENCY',
      alerts: redFlagAlerts,
      differentials: [{
        id: 'emergency',
        name: 'Seek Immediate Medical Attention',
        code: 'EMERGENCY',
        confidence: 100,
        description: 'One or more emergency symptoms detected that require immediate medical care.',
        recommendation: 'Go to emergency department or call emergency services now.',
        priority: 'emergency'
      }]
    };
  }
  
  // ==========================================
  // STEP 2: CHECK SECONDARY CAUSES
  // ==========================================
  
  // Post-traumatic headache
  if (answers.recentTrauma === true) {
    differentials.push(createDiagnosis('post_trauma', 'Post-Traumatic Headache', '5.1', 80,
      'Headache beginning within 7 days of head/neck injury',
      'Evaluate for more serious intracranial injury if warranted'
    ));
  }
  
  // Infection-related headache
  if (answers.feverInfection === true || answers.fever === true) {
    differentials.push(createDiagnosis('infection', 'Headache Attributed to Infection', '9.', 75,
      'Headache occurring with systemic or intracranial infection',
      'Seek medical care for evaluation of underlying infection'
    ));
  }
  
  // Medication-overuse headache
  if (answers.medicationUse === 'daily' || answers.medicationUse === 'multiple_daily') {
    const mogScore = calculateMOScore(answers);
    if (mogScore >= 2) {
      differentials.push(createDiagnosis('moh', 'Medication-Overuse Headache', '8.2', mogScore * 20,
        'Regular overuse of acute medications causing worsening headaches',
        'Gradually reduce/stop medication under medical supervision'
      ));
    }
  }
  
  // ==========================================
  // STEP 3: CHECK PRIMARY HEADACHES
  // ==========================================
  
  const migScore = calculateMigraineScore(answers);
  const tthScore = calculateTTHScore(answers);
  const clusterScore = calculateClusterScore(answers);
  const phScore = calculatePHScore(answers);
  const sunctScore = calculateSUNCTScore(answers);
  const hcScore = calculateHCScore(answers);
  const tnScore = calculateTrigeminalNeuralgiaScore(answers);
  
  // Migraine WITH AURA (1.2)
  if (answers.aura === true) {
    let auraCorrect = false;
    if (answers.auraDuration === 'minutes_30' || answers.auraDuration === 'minutes_60') {
      auraCorrect = true;
    }
    
    if (auraCorrect && (answers.auraVisual || answers.auraSensory || answers.auraMotor)) {
      differentials.push(createDiagnosis('migraine_aura', 'Migraine with Aura', '1.2', 85,
        'Headache preceded by fully reversible visual/sensory/motor symptoms',
        'Standard migraine abortive treatment. Avoid triptans during motor aura.'
      ));
    }
  }
  
  // Migraine WITHOUT AURA (1.1)
  if (migScore >= 4) {
    differentials.push(createDiagnosis('migraine', 'Migraine without Aura', '1.1', Math.min(95, migScore * 15),
      'A.≥5 attacks B.4-72h C.≥2 of unilateral/pulsating/mod/worsen D.nausea OR photophobia',
       'Triptans, NSAIDs | Preventive: CGRP monoclonal antibodies, topiramate'
    ));
  }
  
  // Chronic Migraine (1.3)
  if (migScore >= 4 && (answers.daysPerMonth >= 15 || answers.frequency === 'daily')) {
    differentials.push(createDiagnosis('chronic_migraine', 'Chronic Migraine', '1.3', 75,
      'Headache ≥15 days/mo for >3 months with migraine features ≥8 days',
      'CGRP monoclonal antibodies effective. Limit acute meds to ≤10 days/mo.'
    ));
  }
  
  // Tension-Type Headache (2.)
  if (tthScore >= 3 && migScore < 4) {
    let tthType = 'episodic';
    if (answers.daysPerMonth >= 15 || answers.frequency === 'daily') {
      tthType = 'chronic';
    }
    
    const code = tthType === 'chronic' ? '2.3' : '2.1';
    const name = tthType === 'chronic' ? 'Chronic Tension-Type Headache' : 'Episodic Tension-Type Headache';
    
    differentials.push(createDiagnosis('tth', name, code, Math.min(90, tthScore * 18),
      'A.≥10 episodes B.30min-7d C.bilateral/pressing/mild D.no significant nausea',
      'NSAIDs, stress management, amitriptyline if chronic'
    ));
  }
  
  // Cluster Headache (3.1)
  if (clusterScore >= 3) {
    differentials.push(createDiagnosis('cluster', 'Cluster Headache', '3.1', Math.min(95, clusterScore * 20),
      'A.≥5 attacks B.15-180min C.autonomic symptoms D.daily-multiple',
      '100% oxygen 12-15 L/min, sumatriptan sc, verapamil preventive'
    ));
  }
  
  // Paroxysmal Hemicrania (3.2)
  if (phScore >= 3 || answers.indomethacinResponse === 'yes_complete') {
    differentials.push(createDiagnosis('ph', 'Paroxysmal Hemicrania', '3.2', 90,
      'A.≥20 attacks B.2-30min C.autonomic D.>5/day E.Ind responsive',
      'Indomethacin 25-50mg 3x daily - diagnostic and therapeutic'
    ));
  }
  
  // Hemicrania Continua (3.4)
  if (hcScore >= 2) {
    differentials.push(createDiagnosis('hc', 'Hemicrania Continua', '3.4', 85,
      'Continuous unilateral headache with autonomic features',
      'Indomethacin is definitive treatment'
    ));
  }
  
  // SUNCT/SUNA (3.3)
  if (sunctScore >= 2) {
    differentials.push(createDiagnosis('sunct', 'SUNCT/SUNA', '3.3', 70,
      'A.≥20 B.1-600sec C.neuralgiform D.≥3/day',
      'Lamotrigine, gabapentin. Limited acute options.'
    ));
  }
  
  // Trigeminal Neuralgia (13.1)
  if (tnScore >= 2) {
    differentials.push(createDiagnosis('tn', 'Trigeminal Neuralgia', '13.1', 65,
      'A.Paroxysmal B.Trigger zones C.Not explained otherwise',
      'Oxcarbazepine first-line. Surgical options if refractory.'
    ));
  }
  
  // Sort by confidence
  differentials.sort((a, b) => b.confidence - a.confidence);
  
  return {
    type: differentials.length > 0 ? 'DIFFERENTIAL' : 'UNCERTAIN',
    alerts: redFlagAlerts,
    differentials
  };
}

// ==========================================
// SCORING FUNCTIONS
// ==========================================

function calculateMigraineScore(a) {
  let score = 0;
  
  // Duration: 4-72 hours
  const dur = a.duration;
  if (dur === 'hours_4' || dur === 'hours_12' || dur === 'hours_24') score += 2;
  if (dur === 'hours_72') score += 1;
  
  // Unilateral
  if (a.location?.includes('unilateral') || a.location === 'orbit') score += 2;
  
  // Pulsating
  if (a.quality?.includes('pulsating')) score += 2;
  
  // Moderate-severe intensity
  if (a.intensity >= 3) score += 2;
  
  // Worse with activity
  if (a.worsening === true) score += 2;
  
  // Nausea or vomiting
  if (a.nausea === true || a.vomiting === true) score += 2;
  
  // Photophobia OR phonophobia
  if (a.photophobia === true || a.phonophobia === true) score += 2;
  
  return score;
}

function calculateTTHScore(a) {
  let score = 0;
  
  // Bilateral location
  if (a.location?.includes('bilateral')) score += 2;
  
  // Pressing quality (NOT pulsating)
  if (a.quality?.includes('pressing') && !a.quality?.includes('pulsating')) score += 2;
  
  // Mild-moderate intensity
  if (a.intensity <= 2) score += 2;
  
  // NOT aggravated by activity
  if (a.worsening === false) score += 1;
  
  // NO significant nausea
  if (a.nausea !== true && a.vomiting !== true) score += 2;
  
  // NO vomiting
  if (a.vomiting !== true) score += 1;
  
  return score;
}

function calculateClusterScore(a) {
  let score = 0;
  
  // Strictly unilateral
  if (a.location === 'orbit' || a.location === 'unilateral_any') score += 2;
  
  // Short duration (15-180 min)
  const dur = a.duration;
  if (dur === 'minutes_30' || dur === 'hours_2' || dur === 'hours_4') score += 2;
  
  // Severe intensity
  if (a.intensity >= 4) score += 2;
  
  // Autonomic symptoms
  if (a.autonomicSymptoms?.length > 0) score += 3;
  
  // Multiple daily
  if (a.frequency === 'multiple_daily' || a.attacksPerDay >= 5) score += 2;
  
  // Same time pattern
  if (a.pattern === 'same_time') score += 1;
  
  return score;
}

function calculatePHScore(a) {
  let score = 0;
  
  // Unilateral
  if (a.location?.includes('unilateral')) score += 2;
  
  // Very short duration (2-30 min)
  const dur = a.duration;
  if (dur === 'minutes_15' || dur === 'minutes_30') score += 2;
  
  // Autonomic symptoms
  if (a.autonomicSymptoms?.length > 0) score += 2;
  
  // Multiple daily (>5/day)
  if (a.attacksPerDay > 5 || a.frequency === 'multiple_daily') score += 2;
  
  // Indomethacin response
  if (a.indomethacinResponse === 'yes_complete') score += 5;
  
  return score;
}

function calculateSUNCTScore(a) {
  let score = 0;
  
  // Very brief (seconds)
  if (a.duration === 'seconds') score += 3;
  if (a.duration === 'minutes_15') score += 1;
  
  // Neuralgiform pain
  if (a.quality?.includes('electric') || a.quality?.includes('stabbing')) score += 2;
  
  // Multiple daily (3+/day)
  if (a.attacksPerDay >= 3) score += 2;
  
  // Autonomic symptoms
  if (a.autonomicSymptoms?.length > 0) score += 2;
  
  return score;
}

function calculateHCScore(a) {
  let score = 0;
  
  // Continuous
  if (a.duration === 'continuous') score += 3;
  
  // Unilateral
  if (a.location?.includes('unilateral')) score += 2;
  
  // Autonomic symptoms
  if (a.autonomicSymptoms?.length > 0) score += 2;
  
  // Indomethacin response
  if (a.indomethacinResponse === 'yes_complete') score += 5;
  
  return score;
}

function calculateTrigeminalNeuralgiaScore(a) {
  let score = 0;
  
  // Electric/shock pain
  if (a.quality?.includes('electric')) score += 3;
  if (a.quality?.includes('stabbing')) score += 2;
  
  // Brief duration (<2 min)
  const dur = a.duration;
  if (dur === 'seconds' || dur === 'minutes_15') score += 2;
  
  // Triggered by touch/eating/speaking
  if (a.triggered === true) score += 2;
  
  // Face/jaw location (V2/V3 distribution)
  if (a.location === 'jaw' || a.location === 'face') score += 2;
  
  return score;
}

function calculateMOScore(a) {
  let score = 0;
  
  // Frequent medication use
  if (a.medicationUse === 'daily') score += 2;
  if (a.medicationUse === 'multiple_daily') score += 3;
  if (a.medicationUse === 'few_week') score += 1;
  
  // Using triptans or combination analgesics
  if (a.medicationTypes?.includes('triptan')) score += 2;
  if (a.medicationTypes?.includes('combination')) score += 2;
  if (a.medicationTypes?.includes('codeine')) score += 2;
  
  // Chronic headache
  if (a.frequency === 'daily' || a.frequency === 'multiple_daily') score += 2;
  
  return score;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function createDiagnosis(id, name, code, confidence, description, recommendation) {
  return {
    id,
    name,
    code,
    confidence,
    description,
    recommendation,
    category: getCategory(code)
  };
}

function getCategory(code) {
  if (code.startsWith('1')) return 'migraine';
  if (code.startsWith('2')) return 'tth';
  if (code.startsWith('3')) return 'tac';
  if (code.startsWith('5')) return 'traumatic';
  if (code.startsWith('6')) return 'vascular';
  if (code.startsWith('8')) return 'substance';
  if (code.startsWith('9')) return 'infection';
  if (code.startsWith('13')) return 'neuralgia';
  return 'other';
}

// ==========================================
// RESULT DISPLAY HELPERS
// ==========================================

export function formatDifferentialResults(results) {
  if (!results || results.type === 'EMERGENCY') {
    return formatEmergencyResults(results);
  }
  
  if (results.differentials.length === 0) {
    return {
      title: 'No Clear Diagnosis',
      content: 'Your symptoms do not match a specific headache type.',
      recommendations: 'Consult a healthcare provider for proper evaluation.',
      primaryMessage: 'See your doctor for evaluation'
    };
  }
  
  const formatted = {
    title: 'Possible Diagnoses',
    subtitle: 'Ranked by confidence',
    differentials: results.differentials.map(d => ({
      name: d.name,
      code: d.code,
      confidence: d.confidence,
      description: d.description,
      recommendation: d.recommendation,
      priority: d.confidence > 70 ? 'high' : d.confidence > 50 ? 'medium' : 'low'
    }))
  };
  
  // Add warnings if warning red flags present
  if (results.alerts?.some(a => a.priority === 'warning')) {
    formatted.warnings = results.alerts
      .filter(a => a.priority === 'warning')
      .map(a => a.text);
  }
  
  return formatted;
}

function formatEmergencyResults(results) {
  return {
    title: '⚠️ SEEK IMMEDIATE MEDICAL CARE',
    subtitle: 'Emergency symptoms detected',
    priority: 'emergency',
    content: 'Your responses indicate symptoms that require immediate medical attention.',
    alerts: results?.alerts?.map(a => ({
      symptom: a.text,
      concern: a.description
    })) || [],
    recommendation: 'Call emergency services or go to your nearest emergency department now.',
    primaryMessage: 'GET MEDICAL HELP NOW'
  };
}

export function getNextQuestion(currentAnswers) {
  // Return the next logical question based on current answers
  const answered = Object.keys(currentAnswers);
  
  if (!answered.includes('onset')) return 'onset';
  if (!answered.includes('frequency')) return 'frequency';
  if (!answered.includes('duration')) return 'duration';
  if (!answered.includes('location')) return 'location';
  if (!answered.includes('quality')) return 'quality';
  if (!answered.includes('intensity')) return 'intensity';
  
  // Conditional questions
  const loc = currentAnswers.location;
  if ((loc?.includes('unilateral') || loc === 'orbit') && !answered.includes('worsening')) {
    return 'worsening';
  }
  if (loc?.includes('unilateral') && !answered.includes('autonomicSymptoms')) {
    return 'autonomicSymptoms';
  }
  
  // Migraine screening
  if ((currentAnswers.quality?.includes('pulsating') || currentAnswers.intensity >= 3) && 
      !answered.includes('nausea')) {
    return 'nausea';
  }
  if (currentAnswers.nausea && !answered.includes('photophobia')) {
    return 'photophobia';
  }
  
  // Frequency-related
  if ((currentAnswers.frequency === 'daily' || currentAnswers.frequency === 'multiple_daily') &&
      !answered.includes('medicationUse')) {
    return 'medicationUse';
  }
  
  // Autonomic-related
  if ((currentAnswers.autonomicSymptoms?.length > 0) && !answered.includes('indomethacinResponse')) {
    return 'indomethacinResponse';
  }
  
  // Safety questions (always last)
  if (!answered.includes('thunderclap')) return 'thunderclap';
  if (!answered.includes('fever_neck')) return 'fever_neck';
  
  return null; // All questions answered
}
