/**
 * ICHD-3 Headache Diagnostic Wizard
 * 
 * Implements diagnostic criteria from International Classification of Headache Disorders, 3rd Edition
 * Each step maps to specific ICHD-3 diagnostic criteria
 */

import { HEADACHE_CATEGORIES, RED_FLAGS, PAIN_LOCATIONS, PAIN_QUALITIES, ASSOCIATED_SYMPTOMS } from '../data/headacheData';

// ============================================
// WIZARD STEP DEFINITIONS
// Each step corresponds to ICHD-3 diagnostic criteria
// ============================================

export const WIZARD_STEPS = [
  {
    id: 'onset',
    title: 'When did your headaches begin?',
    description: 'Understanding the onset helps narrow down potential causes',
    field: 'onset',
    type: 'multiple-choice',
    options: [
      { value: 'days-7', label: 'Within the last week', code: 'acute' },
      { value: 'weeks-2', label: '2 weeks to 1 month', code: 'subacute' },
      { value: 'months-1', label: '1-3 months', code: 'subacute' },
      { value: 'months-3', label: '3-6 months', code: 'chronic' },
      { value: 'months-6', label: '6 months to 1 year', code: 'chronic' },
      { value: 'year-plus', label: 'More than 1 year', code: 'chronic' },
      { value: ' years-plus', label: 'Many years (recurrent)', code: 'recurrent' }
    ],
    ichdCriteria: 'A. Historical onset of headache'
  },
  {
    id: 'frequency',
    title: 'How often do you get headaches?',
    description: 'Frequency helps distinguish episodic from chronic patterns',
    field: 'frequency',
    type: 'multiple-choice',
    options: [
      { value: 'rarely', label: 'Rarely (once a month or less)', value: 1 },
      { value: 'few-month', label: 'A few times per month', value: 3 },
      { value: 'weekly', label: 'Weekly (about once a week)', value: 4 },
      { value: 'few-week', label: 'Several times per week', value: 6 },
      { value: 'daily', label: 'Daily (most days)', value: 15 },
      { value: 'multiple-daily', label: 'Multiple times daily', value: 30 },
      { value: 'constant', label: 'Constant (present every day)', value: 30 }
    ],
    ichdCriteria: 'Frequency: <10 days/mo (episodic) vs ≥15 days/mo (chronic)'
  },
  {
    id: 'duration',
    title: 'How long do the headaches typically last?',
    description: 'Duration is critical for classification (ICHD-3 Section B)',
    field: 'duration',
    type: 'multiple-choice',
    options: [
      { value: 'seconds', label: 'Seconds to 1 minute', code: 'ultrabrief' },
      { value: 'minutes-15', label: '1-15 minutes', code: 'brief' },
      { value: 'minutes-30', label: '15-30 minutes', code: 'brief' },
      { value: 'minutes-60', label: '30-60 minutes (1 hour)', code: 'moderate' },
      { value: 'hours-2', label: '1-2 hours', code: 'moderate' },
      { value: 'hours-4', label: '2-4 hours', code: 'moderate' },
      { value: 'hours-12', label: '4-12 hours', code: 'prolonged' },
      { value: 'hours-24', label: '12-24 hours (1 day)', code: 'prolonged' },
      { value: 'hours-72', label: '24-72 hours (1-3 days)', code: 'prolonged' },
      { value: 'days-7', label: '3-7 days', code: 'extended' },
      { value: 'continuous', label: 'Non-stop (continuous)', code: 'continuous' }
    ],
    // ICHD-3 specific durations:
    // Migraine: 4-72 hours
    // TTH: 30 minutes - 7 days
    // Cluster: 15-180 minutes
    // Paroxysmal hemicrania: 2-30 minutes
    // SUNCT/SUNA: 1-600 seconds
    ichdCriteria: 'B. Headache duration (4-72h = migraine, 30min-7d = TTH, 15-180min = cluster)'
  },
  {
    id: 'location',
    title: 'Where is the pain located?',
    description: 'Unilateral vs bilateral is a key discriminator',
    field: 'location',
    type: 'multiple-choice',
    options: [
      { value: 'unilateral-right', label: 'Right side only' },
      { value: 'unilateral-left', label: 'Left side only' },
      { value: 'unilateral-either', label: 'One side (varies)' },
      { value: 'bilateral-frontal', label: 'Both sides (forehead/temples)' },
      { value: 'bilateral-occipital', label: 'Both sides (back of head)' },
      { value: 'bilateral-diffuse', label: 'Diffuse (entire head)' },
      { value: 'vertex', label: 'Top of head' },
      { value: 'neck-ful', label: 'Neck and head' },
      { value: 'orbit-eye', label: 'Around one eye' }
    ],
    ichdCriteria: 'C. Unilateral (migraine, cluster) vs bilateral (TTH)'
  },
  {
    id: 'quality',
    title: 'How does the pain feel?',
    description: 'Pain quality helps differentiate headache types',
    field: 'quality',
    type: 'multi-select',
    options: [
      { id: 'pulsating', name: 'Pulsating/Throbbing (like a heartbeat)' },
      { id: 'pressing', name: 'Pressing/Tightening (like a band)' },
      { id: 'stabbing', name: 'Sharp/Stabbing/Jabbing' },
      { id: 'burning', name: 'Burning/Fiery' },
      { id: 'aching', name: 'Dull/Aching' },
      { id: 'electric', name: 'Electric shock-like' },
      { id: 'pressure', name: 'Pressure/Squeezing' },
      { id: 'grinding', name: 'Grinding/_crushing' }
    ],
    ichdCriteria: 'C. Pulsating (migraine) vs pressing (TTH)'
  },
  {
    id: 'intensity',
    title: 'How severe is the pain?',
    description: 'Rate the intensity on a scale',
    field: 'intensity',
    type: 'scale',
    scale: [
      { value: 1, label: 'Mild', description: 'Noticeable but not interfering with activities' },
      { value: 2, label: 'Moderate', description: 'Somewhat interfere with activities' },
      { value: 3, label: 'Moderately Severe', description: 'Difficult to do activities' },
      { value: 4, label: 'Severe', description: 'Cannot do most activities' },
      { value: 5, label: 'Very Severe', description: 'Must lie down; severe impairment' }
    ],
    ichdCriteria: 'C. Moderate to severe intensity'
  },
  {
    id: 'worsening',
    title: 'Does physical activity worsen the pain?'
    , description: 'Aggravation by routine activity is hallmark of migraine',
    field: 'worsening',
    type: 'yes-no',
    options: [
      { value: true, label: 'Yes, activity makes it worse' },
      { value: false, label: 'No, activity does not affect it' }
    ],
    ichdCriteria: 'C. Aggravation by physical activity (migraine)'
  },
  {
    id: 'nausea',
    title: 'Do you experience nausea or vomiting?'
    , description: 'GI symptoms are diagnostic for migraine',
    field: 'nausea',
    type: 'yes-no',
    options: [
      { value: true, label: 'Yes, nausea or vomiting' },
      { value: false, label: 'No' }
    ],
    ichdCriteria: 'D. Nausea and/or vomiting (migraine)'
  },
  {
    id: 'photophobia',
    title: 'Are you sensitive to light?',
    description: 'Photophobia or phonophobia alone meets migraine criterion D',
    field: 'photophobia',
    type: 'yes-no',
    options: [
      { value: true, label: 'Yes, sensitive to light' },
      { value: false, label: 'No unusual sensitivity' }
    ],
    ichdCriteria: 'D. Photophobia and/or phonophobia (migraine)'
  },
  {
    id: 'phonophobia',
    title: 'Are you sensitive to sound?',
    description: 'Sound sensitivity often accompanies light sensitivity',
    field: 'phonophobia',
    type: 'yes-no',
    options: [
      { value: true, label: 'Yes, sensitive to sounds' },
      { value: false, label: 'No unusual sensitivity' }
    ],
    ichdCriteria: 'D. Phonophobia (migraine)'
  }
];

// ============================================
// CONDITIONAL STEPS - Shown based on earlier answers
// ============================================

export const CONDITIONAL_STEPS = {
  // Shown if frequency suggests chronic (>15 days/month)
  chronicFrequency: {
    id: 'chronic-pattern',
    title: 'How many days per month do you have headaches?',
    field: 'daysPerMonth',
    type: 'number',
    min: 15,
    max: 30,
    condition: (answers) => answers.frequency >= 15
  },

  // Shown if pain location is orbital/periocular (suggests TACs)
  autonomicSymptoms: {
    id: 'autonomic',
    title: 'Do you notice any of these symptoms on the same side as the headache?',
    description: 'Autonomic symptoms are hallmark of Trigeminal Autonomic Cephalalgias',
    field: 'autonomicSymptoms',
    type: 'multi-select',
    condition: (answers) => answers.location?.includes('orbit') || answers.location?.includes('unilateral'),
    options: [
      { id: 'lacrimation', name: 'Watering/red eye' },
      { id: 'conjunctival-injection', name: 'Red eye (visible blood vessels)' },
      { id: 'nasal-congestion', name: 'Blocked nose' },
      { id: 'rhinorrhea', name: 'Runny nose' },
      { id: 'ptosis', name: 'Drooping eyelid' },
      { id: 'eyelid-edema', name: 'Swollen eyelid' },
      { id: 'forehead-sweat', name: 'Forehead sweating' },
      { id: 'flushing', name: 'Facial flushing' },
      { id: 'miosis', name: 'Small pupil' }
    ],
    ichdCriteria: 'C. Ipsilateral autonomic symptoms (cluster, PH, HC)'
  },

  // Shown if suggested migraine without aura - check for aura
  auraCheck: {
    id: 'aura',
    title: 'Do you ever have warning symptoms BEFORE the headache?',
    description: 'These typically appear 5-60 minutes before the headache',
    field: 'aura',
    type: 'yes-no',
    condition: (answers) => answers.quality?.includes('pulsating') && answers.nausea,
    options: [
      { value: true, label: 'Yes, sometimes before headache' },
      { value: false, label: 'No warning symptoms' }
    ],
    ichdCriteria: '1.2 Migraine with aura'
  },

  auraDetails: {
    id: 'aura-details',
    title: 'What type of warning symptoms do you experience?',
    field: 'auraSymptoms',
    type: 'multi-select',
    condition: (answers) => answers.aura === true,
    options: [
      { id: 'visual-scint', name: 'Zigzag lines/fortification spectrum' },
      { id: 'visual-scotoma', name: 'Blind spots' },
      { id: 'visual-flash', name: 'Flashing lights' },
      { id: 'visual-blur', name: 'Blurred vision' },
      { id: 'sensory-tingle', name: 'Tingling/numbness' },
      { id: 'sensory-pins', name: '"Pins and needles"' },
      { id: 'motor-weakness', name: 'Weakness' },
      { id: 'speech-difficulty', name: 'Difficulty speaking' }
    ],
    ichdCriteria: 'A. Fully reversible aura symptoms'
  },

  auraDuration: {
    id: 'aura-duration',
    title: 'How long do these warning symptoms typically last?',
    field: 'auraDuration',
    type: 'multiple-choice',
    condition: (answers) => answers.aura === true,
    options: [
      { value: 'minutes-5', label: 'Less than 5 minutes' },
      { value: 'minutes-30', label: '5-30 minutes' },
      { value: 'minutes-60', label: '30-60 minutes' },
      { value: 'hours-more', label: 'More than 60 minutes' }
    ],
    ichdCriteria: 'B. Aura duration 5-60 minutes'
  },

  // Shown if short duration (<30 min) - consider SUNCT/SUNA
  sunctCheck: {
    id: 'sunct-pattern',
    title: 'How many times per day do these headaches occur?',
    field: 'attacksPerDay',
    type: 'number',
    condition: (answers) => answers.duration === 'seconds' || answers.duration === 'minutes-15',
    options: [
      { value: '1-3', label: '1-3 times per day' },
      { value: '4-10', label: '4-10 times per day' },
      { value: '10-more', label: 'More than 10 times per day' }
    ],
    ichdCriteria: '3.3 SUNCT: 3-100 attacks/day'
  },

  // Shown if short duration + autonomic - paroxysmal hemicrania
  indomethacin: {
    id: 'indomethacin',
    title: 'Have you ever taken indomethacin (or similar NSAID) for this headache?',
    description: 'Paroxysmal hemicrania and Hemicrania Continua respond dramatically to indomethacin',
    field: 'indomethacinResponse',
    type: 'yes-no',
    condition: (answers) => answers.autonomicSymptoms?.length > 0,
    options: [
      { value: 'yes-complete', label: 'Yes, completely relief with indomethacin' },
      { value: 'yes-partial', label: 'Yes, partial relief' },
      { value: 'no', label: 'No indomethacin trial' },
      { value: 'no-relief', label: 'Tried but no relief' }
    ],
    ichdCriteria: 'E. Abolished by indomethacin (PH)'
  }
};

// ============================================
// SECONDARY HEADACHE SCREENING
// ============================================

export const SECONDARY_SCREENING = [
  {
    id: 'trauma',
    title: 'Have you had any recent head or neck injury?',
    field: 'recentTrauma',
    type: 'yes-no',
    description: 'Including falls, accidents, or whiplash',
    options: [
      { value: true, label: 'Yes, within the past 3 months' },
      { value: false, label: 'No recent injury' }
    ],
    ichdCode: '5.'
  },
  {
    id: 'fever-infection',
    title: 'Do you currently have fever or signs of infection?',
    field: 'feverInfection',
    type: 'yes-no',
    description: 'Including recent illness',
    options: [
      { value: true, label: 'Yes, currently ill' },
      { value: false, label: 'No fever or infection' }
    ],
    ichdCode: '9.'
  },
  {
    id: 'medication-overuse',
    title: 'How often do you use pain medication?',
    description: 'Frequent use can cause Medication-Overuse Headache',
    field: 'medicationUse',
    type: 'multiple-choice',
    options: [
      { value: 'rarely', label: 'Rarely or never' },
      { value: 'few-week', label: 'A few times per week' },
      { value: 'daily', label: 'Daily' },
      { value: 'multiple-daily', label: 'Multiple times daily' }
    ],
    ichdCode: '8.2 MOH'
  },
  {
    id: 'medication-types',
    title: 'What medications do you use for headaches?',
    field: 'medicationTypes',
    type: 'multi-select',
    condition: (answers) => answers.medicationUse === 'few-week' || answers.medicationUse === 'daily',
    options: [
      { id: 'otc-analgesic', name: 'Paracetamol/Acetaminophen' },
      { id: 'ibuprofen', name: 'Ibuprofen/NSAIDs' },
      { id: 'aspirin', name: 'Aspirin' },
      { id: 'codeine', name: 'Codeine combinations' },
      { id: 'triptan', name: 'Triptans (sumatriptan, rizatriptan, etc.)' },
      { id: 'ergot', name: 'Ergotamine' },
      { id: 'opioid', name: 'Strong opioids' },
      { id: 'combination', name: 'Combination analgesics' }
    ],
    ichdCode: '8.2'
  }
];

// ============================================
// RED FLAG SCREENING
// ============================================

export const RED_FLAG_SCREENING = RED_FLAGS.map(flag => ({
  id: flag.id,
  title: flag.text,
  field: flag.id,
  type: 'yes-no',
  description: flag.description,
  priority: flag.priority,
  options: [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ],
  ichdCriteria: 'Red flag'
}));

// ============================================
// DIAGNOSTIC DECISION TREE
// Maps answers to ICHD-3 diagnoses
// ============================================

export function diagnose(answers) {
  const results = [];
  
  // 1. Check RED FLAGS first - if any emergency, stop and warn
  const emergencyFlags = RED_FLAG_SCREENING
    .filter(f => answers[f.field] === true && f.priority === 'emergency')
    .map(f => f.title);
  
  if (emergencyFlags.length > 0) {
    results.push({
      id: 'emergency',
      name: 'Requires Immediate Medical Attention',
      code: 'RED FLAG',
      confidence: 100,
      recommendation: 'Seek emergency medical care immediately',
      alerts: emergencyFlags
    });
    return results;
  }

  // 2. Secondary headache screening
  if (answers.recentTrauma) {
    results.push({
      id: 'post-traumatic',
      name: 'Post-Traumatic Headache',
      code: '5.1/5.2',
      confidence: 85,
      description: 'Headache attributed to head/neck trauma',
      recommendation: 'Consult healthcare provider for evaluation'
    });
  }
  
  if (answers.feverInfection) {
    results.push({
      id: 'infection',
      name: 'Headache Attributed to Infection',
      code: '9.',
      confidence: 80,
      description: 'Headache attributed to systemic infection',
      recommendation: 'Seek medical care for underlying infection'
    });
  }

  // 3. Medication-overuse headache
  if ((answers.medicationUse === 'daily' || answers.medicationUse === 'multiple-daily') && 
      (answers.frequency === 'daily' || answers.frequency === 'multiple-daily')) {
    results.push({
      id: 'moh',
      name: 'Medication-Overuse Headache',
      code: '8.2',
      confidence: 75,
      description: 'Headache caused by regular analgesic overuse',
      recommendation: 'Reduce/stop medication use under medical supervision'
    });
  }

  // 4. PRIMARY HEADACHES - Apply ICHD-3 criteria

  // MIGRAINE with aura (1.2)
  if (answers.aura === true && answers.auraSymptoms?.length > 0 &&
      answers.auraDuration !== 'hours-more') {
    results.push({
      id: 'migraine-aura',
      name: 'Migraine with Aura',
      code: '1.2',
      confidence: 85,
      description: 'Migraine with visual/sensory aura symptoms',
      criteria: 'A. ≥2 aura episodes, B. Fully reversible',
      recommendation: 'Standard migraine treatment'
    });
  }
  // MIGRAINE without aura (1.1)
  else if (answers.nausea && (answers.photophobia || answers.phonophobia) &&
           answers.duration !== 'seconds' && answers.duration !== 'minutes-15' &&
           answers.duration !== 'minutes-30' &&
           (answers.location?.includes('unilateral') || answers.location?.includes('orbit'))) {
    let score = 0;
    if (answers.nausea) score++; // Criterion D met
    if (answers.photophobia || answers.phonophobia) score++; // Criterion D met
    if (answers.location?.includes('unilateral')) score++; // Criterion C
    if (answers.quality?.includes('pulsating')) score++; // Criterion C
    if (answers.intensity >= 3) score++; // Criterion C
    if (answers.worsening) score++; // Criterion C
    
    if (score >= 4) {
      results.push({
        id: 'migraine',
        name: 'Migraine without Aura',
        code: '1.1',
        confidence: Math.min(95, score * 15),
        description: 'Recurrent attacks lasting 4-72 hours',
        criteria: 'A. ≥5 attacks, B. 4-72h, C. ≥2 of unilateral/pulsating/moderate/worsening, D. nausea OR photophobia',
        recommendation: 'Acute: triptans, NSAIDs. Preventive: lifestyle changes'
      });
    }
  }

  // TENSION-TYPE HEADACHE (2.)
  if (!answers.nausea && !answers.vomiting &&
      (answers.quality?.includes('pressing') || answers.quality?.includes('压力') || answers.quality?.includes('aching')) &&
      answers.intensity <= 2 &&
      (answers.location?.includes('bilateral') || answers.location?.includes('both'))) {
    results.push({
      id: 'tth',
      name: 'Tension-Type Headache',
      code: '2.',
      confidence: 70,
      description: 'Bilateral pressing/tightening quality, mild-moderate intensity',
      criteria: 'A. ≥10 episodes, B. 30min-7d, C. bilateral/pressing/mild, D. no nausea/vomiting',
      recommendation: 'NSAIDs, stress management, regular sleep'
    });
  }

  // CLUSTER HEADACHE (3.1)
  if (answers.autonomicSymptoms?.length > 0 &&
      answers.location?.includes('orbit') &&
      answers.duration !== 'seconds' &&
      answers.duration !== 'minutes-15' &&
      answers.duration !== 'minutes-30' &&
      answers.intensity >= 4) {
    results.push({
      id: 'cluster',
      name: 'Cluster Headache',
      code: '3.1',
      confidence: 80,
      description: 'Severe unilateral orbital pain with autonomic symptoms',
      criteria: 'A. ≥5 attacks, B. 15-180min, C. autonomic symptoms, D. daily-multiple',
      recommendation: 'Oxygen, triptans, verapamil - consult neurologist'
    });
  }

  // PAROXYSMAL HEMICRANIA (3.2) - indomethacin responsive
  if (answers.indomethacinResponse === 'yes-complete') {
    results.push({
      id: 'paroxysmal-hemicrania',
      name: 'Paroxysmal Hemicrania',
      code: '3.2',
      confidence: 95,
      description: 'Short-lived unilateral pain with autonomic symptoms, indomethacin-responsive',
      criteria: 'A. ≥20 attacks, B. 2-30min, C. autonomic, D. >5/day, E. Indomethacin responsive',
      recommendation: 'Indomethacin - consult neurologist'
    });
  }

  // HEMICRANIA CONTÍNHUA (3.4)
  if (answers.duration === 'continuous' && answers.autonomicSymptoms?.length > 0) {
    results.push({
      id: 'hemicrania-continua',
      name: 'Hemicrania Continua',
      code: '3.4',
      confidence: 85,
      description: 'Continuous unilateral headache with autonomic features, indomethacin-responsive',
      recommendation: 'Indomethacin - consult neurologist'
    });
  }

  // SUNCT/SUNA (3.3)
  if (answers.duration === 'seconds' && 
      (answers.sunctPattern === '4-10' || answers.sunctPattern === '10-more') &&
      answers.autonomicSymptoms?.length > 0) {
    results.push({
      id: 'sunct',
      name: 'SUNCT',
      code: '3.3.1',
      confidence: 75,
      description: 'Brief neuralgiform pain with autonomic symptoms',
      recommendation: 'Consult neurologist - specific treatments available'
    });
  }

  // TRIGEMINAL NEURALGIA (13.1)
  if (answers.quality?.includes('electric') || answers.quality?.includes('stabbing')) {
    results.push({
      id: 'trigeminal-neuralgia',
      name: 'Trigeminal Neuralgia',
      code: '13.1',
      confidence: 65,
      description: 'Brief electric shock-like pains in face',
      recommendation: 'Carbamazepine, consult neurologist'
    });
  }

  return results;
}