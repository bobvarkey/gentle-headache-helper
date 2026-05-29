/**
 * Diagnostic Engine v2 — Adaptive Question Flow & ICHD-3 Criteria Matching
 *
 * Strategy:
 * 1. First pass: ask universal screening questions (onset, duration, frequency, location, quality, intensity, red flags)
 * 2. Adaptive second pass: based on initial responses, ask targeted questions for the top candidates
 * 3. Score all diagnoses against ICHD-3 criteria with weighted confidence
 * 4. Report results with differential diagnosis
 */
import { ALL_DIAGNOSES, RED_FLAGS, DIAGNOSIS_MAP, EMERGENCY_DIAGNOSES } from '../data/headacheData';

// ──────────────────────────────────────────────
// QUESTION FLOW ENGINE
// ──────────────────────────────────────────────

/**
 * The universal screening phase — questions every patient should answer first
 */
export function getScreeningQuestions() {
  return [
    {
      id: 'onset',
      text: 'When did your headaches start?',
      type: 'choice',
      options: [
        { value: 'within-week', label: 'Within the last week' },
        { value: 'weeks-1', label: '1–4 weeks ago' },
        { value: 'months-1', label: '1–3 months ago' },
        { value: 'months-6', label: '3–6 months ago' },
        { value: 'year-plus', label: 'More than 6 months ago' },
        { value: 'remember-date', label: 'I remember the exact date it started (sudden onset)' },
      ],
      importance: 10,
    },
    {
      id: 'duration',
      text: 'How long does a typical headache last if untreated?',
      type: 'choice',
      options: [
        { value: 'seconds', label: 'Seconds' },
        { value: 'under-15min', label: 'Less than 15 minutes' },
        { value: '15-30min', label: '15–30 minutes' },
        { value: '30-60min', label: '30–60 minutes' },
        { value: '1-4hrs', label: '1–4 hours' },
        { value: '4-24hrs', label: '4–24 hours' },
        { value: '24-72hrs', label: '24–72 hours (1–3 days)' },
        { value: '3-7days', label: '3–7 days' },
        { value: 'over-7days', label: 'More than 7 days' },
        { value: 'continuous', label: 'Continuous (always present, never fully goes away)' },
      ],
      importance: 10,
    },
    {
      id: 'frequency',
      text: 'How often do you get these headaches?',
      type: 'choice',
      options: [
        { value: 'rarely', label: 'Rarely (< 1 per month)' },
        { value: 'few-month', label: 'A few times a month (1–14 per month)' },
        { value: 'weekly', label: 'Multiple times a week' },
        { value: 'daily', label: 'Daily' },
        { value: 'multiple-daily', label: 'Multiple times a day' },
        { value: 'continuous', label: 'Constant (always there)' },
      ],
      importance: 9,
    },
    {
      id: 'location',
      text: 'Where is the pain located?',
      type: 'choice-multi',
      options: [
        { value: 'unilateral-temporal', label: 'One side — temple area' },
        { value: 'unilateral-frontal', label: 'One side — forehead' },
        { value: 'unilateral-ocular', label: 'Around one eye' },
        { value: 'unilateral-occipital', label: 'One side — back of head' },
        { value: 'bilateral', label: 'Both sides/forehead' },
        { value: 'vertex', label: 'Top of head' },
        { value: 'diffuse', label: 'All over / both temples' },
        { value: 'neck', label: 'Back of head/neck' },
        { value: 'jaw', label: 'Jaw area / cheek' },
      ],
      importance: 8,
    },
    {
      id: 'quality',
      text: 'What does the pain feel like?',
      type: 'choice-multi',
      options: [
        { value: 'pulsating', label: 'Pulsating/throbbing' },
        { value: 'pressing', label: 'Pressing/tightening (like a band)' },
        { value: 'stabbing', label: 'Sharp/stabbing' },
        { value: 'burning', label: 'Burning' },
        { value: 'electric', label: 'Electric shock-like' },
        { value: 'dull', label: 'Dull/aching' },
        { value: 'boring', label: 'Boring/drilling' },
        { value: 'pressure', label: 'Pressure/squeezing' },
      ],
      importance: 9,
    },
    {
      id: 'intensity',
      text: 'How severe is the worst part of a typical headache?',
      type: 'choice',
      options: [
        { value: 1, label: 'Mild — I barely notice it' },
        { value: 2, label: 'Moderate — annoying but I keep going' },
        { value: 3, label: 'Severe — I have to slow down or stop' },
        { value: 4, label: 'Very severe — I must lie down' },
        { value: 5, label: 'Maximum — I can\'t do anything at all' },
      ],
      importance: 8,
    },
    {
      id: 'side_consistency',
      text: 'Is the headache always on the same side?',
      type: 'choice',
      options: [
        { value: 'always-same', label: 'Always (or almost always) the same side' },
        { value: 'sometimes-shifts', label: 'It can shift sides' },
        { value: 'bilateral', label: 'It\'s on both sides' },
        { value: 'not-sure', label: 'Not sure / varies' },
      ],
      importance: 7,
    },
    {
      id: 'onset_speed',
      text: 'How quickly does the headache reach its maximum intensity?',
      type: 'choice',
      options: [
        { value: 'seconds', label: 'Within seconds (sudden thunderclap)' },
        { value: 'minutes', label: 'Gradually over minutes' },
        { value: 'hours', label: 'Over hours' },
        { value: 'not-sure', label: 'Not sure' },
      ],
      importance: 10,
    },
    {
      id: 'physical_activity',
      text: 'Does routine physical activity (walking, stairs, bending) make the headache worse?',
      type: 'boolean',
      importance: 7,
    },
    {
      id: 'nausea_vomiting',
      text: 'Do you experience nausea or vomiting with the headache?',
      type: 'choice',
      options: [
        { value: 'nausea', label: 'Nausea only' },
        { value: 'vomiting', label: 'Nausea and vomiting' },
        { value: 'neither', label: 'No nausea or vomiting' },
      ],
      importance: 8,
    },
    {
      id: 'photophobia',
      text: 'Are you sensitive to light during the headache?',
      type: 'boolean',
      importance: 7,
    },
    {
      id: 'phonophobia',
      text: 'Are you sensitive to sound during the headache?',
      type: 'boolean',
      importance: 7,
    },
    {
      id: 'aura',
      text: 'Do you experience visual or sensory disturbances BEFORE the headache starts? (e.g., zigzag lines, blind spots, tingling)',
      type: 'boolean',
      importance: 6,
    },
    {
      id: 'autonomic',
      text: 'During the headache, do you experience any of the following on the same side as the pain?',
      type: 'choice-multi',
      options: [
        { value: 'lacrimation', label: 'Watery eye' },
        { value: 'conjunctivalInjection', label: 'Red/bloodshot eye' },
        { value: 'nasalCongestion', label: 'Stuffy nose' },
        { value: 'rhinorrhea', label: 'Runny nose' },
        { value: 'ptosis', label: 'Drooping eyelid' },
        { value: 'facialSweating', label: 'Facial sweating' },
        { value: 'none', label: 'None of these' },
      ],
      importance: 9,
    },
    {
      id: 'restlessness',
      text: 'During the headache, do you feel restless, agitated, or want to pace around?',
      type: 'boolean',
      importance: 8,
    },
    {
      id: 'age',
      text: 'How old are you? (approximate)',
      type: 'choice',
      options: [
        { value: 'under-30', label: 'Under 30' },
        { value: '30-50', label: '30–50' },
        { value: '50-65', label: '50–65' },
        { value: 'over-65', label: 'Over 65' },
      ],
      importance: 5,
    },
    {
      id: 'triggers',
      text: 'What triggers your headaches? (check all that apply)',
      type: 'choice-multi',
      options: [
        { value: 'stress', label: 'Stress' },
        { value: 'lack-of-sleep', label: 'Lack of sleep' },
        { value: 'certain-foods', label: 'Certain foods/drinks' },
        { value: 'hormonal', label: 'Hormonal changes / menstrual period' },
        { value: 'weather', label: 'Weather changes' },
        { value: 'alcohol', label: 'Alcohol' },
        { value: 'physical-exertion', label: 'Physical exertion' },
        { value: 'coughing', label: 'Coughing/sneezing/straining' },
        { value: 'neck-movement', label: 'Neck movement' },
        { value: 'touch', label: 'Light touch on face' },
        { value: 'posture', label: 'Changes in posture (better upright vs. lying)' },
        { value: 'nothing-specific', label: 'Nothing specific' },
      ],
      importance: 6,
    },
    {
      id: 'worst_headache',
      text: 'Is this the worst headache of your life, or did it start suddenly like a thunderclap?',
      type: 'boolean',
      importance: 10,
    },
    {
      id: 'neck_stiffness',
      text: 'Do you have neck stiffness or pain?',
      type: 'boolean',
      importance: 6,
    },
    {
      id: 'fever',
      text: 'Do you currently have a fever?',
      type: 'boolean',
      importance: 7,
    },
    {
      id: 'medication_frequency',
      text: 'How many days per month do you take pain medication for headaches?',
      type: 'choice',
      options: [
        { value: 'under-10', label: 'Less than 10 days/month' },
        { value: '10-14', label: '10–14 days/month' },
        { value: '15-plus', label: '15 or more days/month' },
      ],
      importance: 6,
    },
    {
      id: 'medication_type',
      text: 'What type of pain medication do you use most often?',
      type: 'choice-multi',
      options: [
        { value: 'nsaids', label: 'NSAIDs / ibuprofen / aspirin' },
        { value: 'paracetamol', label: 'Paracetamol / acetaminophen' },
        { value: 'triptans', label: 'Triptans (sumatriptan, rizatriptan, etc.)' },
        { value: 'opioids', label: 'Opioids / codeine / tramadol' },
        { value: 'combinations', label: 'Combination meds (caffeine + painkiller)' },
        { value: 'none', label: 'None / rarely' },
      ],
      importance: 5,
    },
    {
      id: 'jaw_pain',
      text: 'Do you have jaw pain, TMJ clicking, or pain when chewing?',
      type: 'boolean',
      importance: 5,
    },
    {
      id: 'jaw_claudication',
      text: 'Do you get tired jaw pain when chewing (like chewing gum)?',
      type: 'boolean',
      importance: 7,
    },
    {
      id: 'scalp_tenderness',
      text: 'Is your scalp tender to the touch?',
      type: 'boolean',
      importance: 5,
    },
    {
      id: 'vision_changes',
      text: 'Have you had any vision changes? (blurring, double vision, temporary vision loss)',
      type: 'boolean',
      importance: 7,
    },
    {
      id: 'weight_loss',
      text: 'Have you had unexplained weight loss recently?',
      type: 'boolean',
      importance: 5,
    },
    {
      id: 'syncope',
      text: 'Have you fainted or nearly fainted?',
      type: 'boolean',
      importance: 6,
    },
    {
      id: 'seizures',
      text: 'Have you had any seizures?',
      type: 'boolean',
      importance: 6,
    },
    {
      id: 'trauma',
      text: 'Have you had any recent head or neck injury?',
      type: 'boolean',
      importance: 6,
    },
    {
      id: 'cancer_history',
      text: 'Do you have a history of cancer?',
      type: 'boolean',
      importance: 6,
    },
    {
      id: 'pregnant',
      text: 'Are you currently pregnant or recently gave birth?',
      type: 'boolean',
      importance: 6,
    },
    {
      id: 'alcohol_trigger_cluster',
      text: 'Does alcohol reliably trigger a headache during active periods?',
      type: 'boolean',
      importance: 6,
    },
    {
      id: 'indomethacin_response',
      text: 'Have you ever taken indomethacin (an NSAID)? Did it stop your headaches completely?',
      type: 'choice',
      options: [
        { value: 'never-tried', label: 'Never tried' },
        { value: 'complete-response', label: 'Yes — headaches disappeared completely' },
        { value: 'partial-response', label: 'Yes — partial improvement' },
        { value: 'no-response', label: 'Yes — no benefit' },
      ],
      importance: 7,
    },
    {
      id: 'carbamazepine_response',
      text: 'Have you ever taken carbamazepine or oxcarbazepine? Did it help the pain?',
      type: 'choice',
      options: [
        { value: 'never-tried', label: 'Never tried' },
        { value: 'helped', label: 'Yes — significant relief' },
        { value: 'partial', label: 'Yes — partial relief' },
        { value: 'no-help', label: 'Yes — no benefit' },
      ],
      importance: 5,
    },
  ];
}

/**
 * Given screening answers, return targeted follow-up questions for the top candidate diagnoses
 */
export function getAdaptiveQuestions(screeningAnswers) {
  const candidates = scoreAllDiagnoses(screeningAnswers);
  const topCandidates = candidates.slice(0, 3);

  // Collect questions from top candidates that haven't been answered yet
  const answeredKeys = new Set(Object.keys(screeningAnswers));
  const additionalQuestions = [];

  for (const candidate of topCandidates) {
    const dx = DIAGNOSIS_MAP[candidate.id];
    if (!dx || !dx.questions) continue;

    for (const question of dx.questions) {
      if (!answeredKeys.has(question.key)) {
        // Avoid duplicating the same question
        if (!additionalQuestions.find(q => q.key === question.key)) {
          additionalQuestions.push({
            ...question,
            forDiagnosis: candidate.id,
          });
          answeredKeys.add(question.key);
        }
      }
    }
  }

  return additionalQuestions;
}

/**
 * Determine if any emergency red flags are present
 */
export function checkRedFlags(answers) {
  const detected = [];

  // Direct red flags
  if (answers.worst_headache === true || answers.worst_headache === 'yes') {
    detected.push({ id: 'thunderclap', text: 'Sudden severe "thunderclap" headache', priority: 'emergency', snnoop: 'S' });
  }

  if (answers.onset_speed === 'seconds') {
    detected.push({ id: 'rapid-onset', text: 'Headache reaching maximum in seconds', priority: 'emergency', snnoop: 'S' });
  }

  if (answers.fever && (answers.neck_stiffness)) {
    detected.push({ id: 'meningitis-suspicion', text: 'Fever with neck stiffness — possible meningitis', priority: 'emergency', snnoop: 'S' });
  }

  if (answers.fever) {
    detected.push({ id: 'fever', text: 'Fever accompanying headache', priority: 'warning', snnoop: 'S' });
  }

  if (answers.jaw_claudication === true && answers.age && ['50-65', 'over-65'].includes(answers.age)) {
    detected.push({ id: 'temporal-arteritis-suspicion', text: 'Jaw claudication + age >50 — possible giant cell arteritis', priority: 'emergency', snnoop: '10' });
  }

  if (answers.cancer_history) {
    detected.push({ id: 'cancer-history', text: 'History of cancer with new headache', priority: 'warning', snnoop: 'N' });
  }

  if (answers.seizures) {
    detected.push({ id: 'seizures', text: 'Headache with seizures', priority: 'emergency', snnoop: 'O' });
  }

  if (answers.syncope) {
    detected.push({ id: 'syncope', text: 'Fainting with headache', priority: 'warning', snnoop: 'N' });
  }

  if (answers.pregnant) {
    detected.push({ id: 'pregnant-postpartum', text: 'New headache during pregnancy or postpartum', priority: 'warning', snnoop: '10' });
  }

  if (answers.weight_loss) {
    detected.push({ id: 'weight-loss', text: 'Unexplained weight loss', priority: 'warning', snnoop: 'S' });
  }

  if (answers.vision_changes) {
    detected.push({ id: 'vision-changes', text: 'Vision changes accompanying headache', priority: 'warning', snnoop: 'N' });
  }

  if (answers.age && ['50-65', 'over-65'].includes(answers.age)) {
    if (answers.onset === 'within-week' || answers.onset === 'weeks-1' || answers.onset === 'months-1') {
      detected.push({ id: 'new-after-50', text: 'New headache after age 50', priority: 'warning', snnoop: 'O' });
    }
  }

  if (answers.trauma) {
    detected.push({ id: 'recent-trauma', text: 'Headache after head/neck trauma', priority: 'warning', snnoop: 'T' });
  }

  // MOH suspicion
  if (answers.medication_frequency === '15-plus' && answers.duration !== 'seconds') {
    detected.push({ id: 'medication-overuse', text: 'Possible medication-overuse headache (frequent medication use)', priority: 'warning', snnoop: '10' });
  }

  return detected;
}

// ──────────────────────────────────────────────
// DIAGNOSTIC SCORING ENGINE
// ──────────────────────────────────────────────

/**
 * Score every diagnosis in the ICHD-3 against patient answers.
 * Returns sorted array of { id, name, code, description, confidence, criteriaMet, criteriaTotal, matchDetails }
 */
export function scoreAllDiagnoses(answers) {
  const results = ALL_DIAGNOSES.map(dx => scoreDiagnosis(dx, answers));
  return results
    .filter(r => r.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);
}

/**
 * Score a single diagnosis against patient answers
 */
function scoreDiagnosis(dx, answers) {
  const criteria = dx.diagnosticCriteria;
  if (!criteria) return { id: dx.id, name: dx.name, code: dx.code, confidence: 0, criteriaMet: 0, criteriaTotal: 0 };

  const matchDetails = {};
  let totalWeight = 0;
  let earnedWeight = 0;

  for (const [key, criterion] of Object.entries(criteria)) {
    const weight = criterion.required ? 25 : 10;
    totalWeight += weight;

    const result = evaluateCriterion(key, criterion, dx, answers);
    matchDetails[key] = result;

    if (result.met) {
      earnedWeight += weight * result.confidence; // partial credit
    }
  }

  const confidence = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  return {
    id: dx.id,
    name: dx.name,
    code: dx.code,
    description: dx.description || '',
    category: dx.category || '',
    confidence,
    criteriaMet: Object.values(matchDetails).filter(m => m.met).length,
    criteriaTotal: Object.keys(criteria).length,
    matchDetails,
    isEmergency: dx.isEmergency || false,
    variants: dx.variants,
  };
}

/**
 * Evaluate a single criterion against answers
 */
function evaluateCriterion(criterionKey, criterion, dx, answers) {
  // If sub-criteria exist, check them
  if (criterion.subCriteria) {
    let metCount = 0;
    const subResults = criterion.subCriteria.map(sub => {
      const met = evaluateSubCriterion(sub, dx, answers);
      if (met) metCount++;
      return { id: sub.id, text: sub.text, met };
    });
    const minMatch = criterion.minMatch || 1;
    return {
      text: criterion.text,
      required: criterion.required,
      met: metCount >= minMatch,
      confidence: metCount >= minMatch ? 1 : metCount / minMatch,
      subCriteria: subResults,
      metCount,
      minMatch,
    };
  }

  // Direct rule check
  if (criterion.rule === 'exclusion') {
    // We assume exclusion holds unless a better diagnosis is found
    return { text: criterion.text, required: criterion.required, met: true, confidence: 1 };
  }

  // Duration rule
  if (criterion.rule === 'duration') {
    const durationValue = normalizeDuration(answers.duration);
    if (durationValue === null) return { text: criterion.text, required: criterion.required, met: false, confidence: 0 };

    let met = false;
    let confidence = 0;

    if (criterion.minMinutes !== null && criterion.maxMinutes !== null) {
      met = durationValue >= criterion.minMinutes && durationValue <= criterion.maxMinutes;
      // Partial credit for slightly outside range
      if (!met) {
        if (durationValue < criterion.minMinutes && durationValue >= criterion.minMinutes * 0.5) confidence = 0.3;
        else if (durationValue > criterion.maxMinutes && durationValue <= criterion.maxMinutes * 2) confidence = 0.3;
      } else {
        confidence = 1;
      }
    }

    return { text: criterion.text, required: criterion.required, met, confidence, durationValue };
  }

  // Frequency rule
  if (criterion.rule?.startsWith('frequency') || criterionKey === 'D' && criterion.rule === 'frequency') {
    const freqValue = normalizeFrequency(answers.frequency);
    if (freqValue === null) return { text: criterion.text, required: criterion.required, met: false, confidence: 0 };

    const minDaily = criterion.minDaily || 0;
    const maxDaily = criterion.maxDaily || Infinity;
    const met = freqValue >= minDaily && freqValue <= maxDaily;
    return { text: criterion.text, required: criterion.required, met, confidence: met ? 1 : 0, frequencyValue: freqValue };
  }

  // Count rule
  if (criterion.rule === 'count>=5') {
    const result = evaluateCount(answers.attackCount, 5);
    return { text: criterion.text, required: criterion.required, ...result };
  }

  if (criterion.rule === 'count>=10') {
    const result = evaluateCount(answers.attackCount, 10);
    return { text: criterion.text, required: criterion.required, ...result };
  }

  if (criterion.rule === 'count>=20') {
    const result = evaluateCount(answers.attackCount, 20);
    return { text: criterion.text, required: criterion.required, ...result };
  }

  // Headache days rule
  if (criterion.rule === 'headacheDays>=15') {
    let met = false;
    if (answers.headacheDaysMonth === '15 or more' || answers.frequency === 'daily' || answers.frequency === 'continuous') {
      met = true;
    } else if (answers.medication_frequency === '15-plus') {
      met = true;
    }
    return { text: criterion.text, required: criterion.required, met, confidence: met ? 1 : 0 };
  }

  // Overuse rule
  if (criterion.rule === 'overuse') {
    const met = answers.medication_frequency === '15-plus';
    const confidence = met ? 1 : (answers.medication_frequency === '10-14' ? 0.5 : 0);
    return { text: criterion.text, required: criterion.required, met, confidence };
  }

  // Autonomic rule
  if (criterion.rule === 'autonomic') {
    const hasAutonomic = answers.autonomic && Array.isArray(answers.autonomic) &&
      !answers.autonomic.includes('none') && answers.autonomic.length > 0;
    return { text: criterion.text, required: criterion.required, met: !!hasAutonomic, confidence: hasAutonomic ? 1 : 0 };
  }

  // Thunderclap rule
  if (criterion.rule === 'thunderclap') {
    const met = answers.onset_speed === 'seconds' || answers.worst_headache === true;
    return { text: criterion.text, required: criterion.required, met, confidence: met ? 1 : (answers.onset_speed === 'minutes' ? 0.3 : 0) };
  }

  // Indomethacin rule
  if (criterion.rule === 'indomethacin') {
    const response = answers.indomethacin_response;
    const met = response === 'complete-response';
    const confidence = response === 'complete-response' ? 1 : (response === 'partial-response' ? 0.4 : 0);
    return { text: criterion.text, required: criterion.required, met, confidence };
  }

  // Duration >= 3 months
  if (criterion.rule === 'duration>=3months') {
    const met = answers.onset && !['within-week', 'weeks-1', 'months-1'].includes(answers.onset);
    return { text: criterion.text, required: criterion.required, met, confidence: met ? 1 : 0 };
  }

  // Fallback: check if a key-matching answer exists
  return { text: criterion.text, required: criterion.required, met: false, confidence: 0 };
}

/**
 * Evaluate sub-criterion against answers using semantic matching
 */
function evaluateSubCriterion(subCriterion, dx, answers) {
  const subText = subCriterion.text.toLowerCase();

  // Location matching
  if (subText.includes('unilateral location') || subText.includes('unilateral')) {
    if (!answers.location) return false;
    if (Array.isArray(answers.location)) return answers.location.some(l => l.startsWith('unilateral'));
    return typeof answers.location === 'string' && answers.location.startsWith('unilateral');
  }

  if (subText.includes('bilateral location') || subText.includes('bilateral')) {
    if (!answers.location) return false;
    if (Array.isArray(answers.location)) return answers.location.includes('bilateral') || answers.location.includes('diffuse');
    return answers.location === 'bilateral' || answers.location === 'diffuse';
  }

  // Quality matching
  if (subText.includes('pulsating quality') || subText.includes('pulsating')) {
    if (!answers.quality) return false;
    if (Array.isArray(answers.quality)) return answers.quality.includes('pulsating');
    return answers.quality === 'pulsating';
  }

  if (subText.includes('pressing') || subText.includes('tightening')) {
    if (!answers.quality) return false;
    if (Array.isArray(answers.quality)) return answers.quality.includes('pressing');
    return answers.quality === 'pressing';
  }

  if (subText.includes('stabbing') || subText.includes('superficial')) {
    if (!answers.quality) return false;
    if (Array.isArray(answers.quality)) return answers.quality.includes('stabbing') || answers.quality.includes('electric');
    return answers.quality === 'stabbing' || answers.quality === 'electric';
  }

  // Intensity matching
  if (subText.includes('moderate or severe') || subText.includes('severe pain intensity')) {
    const intensity = typeof answers.intensity === 'number' ? answers.intensity : parseInt(answers.intensity);
    return intensity >= 3;
  }

  if (subText.includes('mild or moderate intensity')) {
    const intensity = typeof answers.intensity === 'number' ? answers.intensity : parseInt(answers.intensity);
    return intensity <= 3;
  }

  if (subText.includes('mild') && subText.includes('moderate') && !subText.includes('severe')) {
    const intensity = typeof answers.intensity === 'number' ? answers.intensity : parseInt(answers.intensity);
    return intensity <= 3;
  }

  // Physical activity
  if (subText.includes('aggravation by') || subText.includes('aggravated by') || subText.includes('avoidance of routine physical activity')) {
    if (answers.physical_activity === undefined) return false;
    return answers.physical_activity === true;
  }

  if (subText.includes('not aggravated by') || subText.includes('not aggravated by routine physical activity')) {
    if (answers.physical_activity === undefined) return false;
    return answers.physical_activity === false;
  }

  // Nausea/vomiting
  if (subText.includes('nausea') || subText.includes('vomiting')) {
    if (!answers.nausea_vomiting) return false;
    return answers.nausea_vomiting !== 'neither';
  }

  if (subText.includes('no nausea or vomiting')) {
    return answers.nausea_vomiting === 'neither';
  }

  // Photophobia/phonophobia
  if (subText.includes('photophobia and phonophobia')) {
    return answers.photophobia === true && answers.phonophobia === true;
  }

  if (subText.includes('photophobia or phonophobia')) {
    return answers.photophobia === true || answers.phonophobia === true;
  }

  if (subText.includes('no more than one of photophobia or phonophobia')) {
    if (answers.photophobia === true && answers.phonophobia === true) return false;
    return true;
  }

  // Autonomic features
  if (subText.includes('autonomic symptom') || subText.includes('conjunctival injection') || subText.includes('lacrimation')) {
    if (!answers.autonomic || !Array.isArray(answers.autonomic)) return false;
    return answers.autonomic.length > 0 && !answers.autonomic.includes('none');
  }

  // Restlessness
  if (subText.includes('restlessness') || subText.includes('agitation')) {
    return answers.restlessness === true;
  }

  // Trigger zones
  if (subText.includes('trigger') && (subText.includes('washing') || subText.includes('shaving') || subText.includes('talking') || subText.includes('teeth'))) {
    if (!answers.triggers || !Array.isArray(answers.triggers)) return false;
    return answers.triggers.includes('touch');
  }

  // Refractory period
  if (subText.includes('refractory')) {
    return answers.refractory === true;
  }

  return false;
}

/**
 * Evaluate count-based criteria
 */
function evaluateCount(answer, threshold) {
  if (!answer) return { met: false, confidence: 0 };
  if (answer === '5 or more' || answer === 'Many (20+)' || answer === '10 or more' || answer === '20 or more') return { met: true, confidence: 1 };
  if (answer === 'Fewer than 5' || answer === 'Fewer than 10' || answer === 'Fewer than 20') return { met: false, confidence: 0 };
  return { met: false, confidence: 0 };
}

/**
 * Normalize duration answer to minutes
 */
function normalizeDuration(durationAnswer) {
  if (!durationAnswer) return null;
  const map = {
    'seconds': 0.5,
    'under-15min': 7,
    '15-30min': 22,
    '30-60min': 45,
    '1-4hrs': 150,
    '4-24hrs': 840,
    '24-72hrs': 2880,
    '3-7days': 7200,
    'over-7days': 12000,
    'continuous': 43200,
  };
  return map[durationAnswer] ?? null;
}

/**
 * Normalize frequency answer to attacks/day
 */
function normalizeFrequency(freqAnswer) {
  if (!freqAnswer) return null;
  const map = {
    'rarely': 0.03,
    'few-month': 0.1,
    'weekly': 4 / 7,
    'daily': 1,
    'multiple-daily': 3,
    'continuous': 1,
  };
  return map[freqAnswer] ?? null;
}

// ──────────────────────────────────────────────
// RESULTS & RECOMMENDATIONS
// ──────────────────────────────────────────────

export function getConfidenceLabel(confidence) {
  if (confidence >= 90) return { label: 'Very High', color: '#34C759', icon: '🟢' };
  if (confidence >= 75) return { label: 'High', color: '#007AFF', icon: '🔵' };
  if (confidence >= 55) return { label: 'Moderate', color: '#FF9500', icon: '🟡' };
  if (confidence >= 35) return { label: 'Low', color: '#FF3B30', icon: '🟠' };
  return { label: 'Very Low', color: '#8E8E93', icon: '⚪' };
}

export function getRecommendation(diagnosis, redFlags) {
  const recommendations = [];

  if (redFlags.some(r => r.priority === 'emergency')) {
    recommendations.push({
      type: 'emergency',
      text: '🚨 SEEK IMMEDIATE MEDICAL ATTENTION — Go to the nearest emergency department.',
      priority: 'critical',
    });
  }

  if (redFlags.some(r => r.priority === 'warning')) {
    recommendations.push({
      type: 'urgent',
      text: '⚠️ Schedule an appointment with your doctor within the next few days. Some of your symptoms require further evaluation.',
      priority: 'high',
    });
  }

  if (!diagnosis) {
    recommendations.push({
      type: 'general',
      text: 'Could not identify a specific headache type. Please consult a healthcare provider for evaluation.',
      priority: 'medium',
    });
    return recommendations;
  }

  // Type-specific recommendations
  const recMap = {
    'migraine': [
      { type: 'info', text: 'Migraine is a neurological disorder with effective treatments available.', priority: 'medium' },
      { type: 'lifestyle', text: '🛏️ Regular sleep schedule, meal routine, hydration, and avoiding known triggers can help.', priority: 'medium' },
      { type: 'treatment', text: '💊 Acute treatment: NSAIDs or triptans at onset. If ≥4 attacks/month, discuss prevention with your doctor.', priority: 'high' },
    ],
    'tth': [
      { type: 'lifestyle', text: '🧘 Stress management, posture correction, regular exercise, and sleep hygiene are first-line.', priority: 'medium' },
      { type: 'treatment', text: '💊 Over-the-counter analgesics (NSAIDs, paracetamol) as needed — but avoid overuse.', priority: 'medium' },
    ],
    'cluster-headache': [
      { type: 'urgent', text: '🩺 Consult a neurologist — cluster headache requires specific treatments not available OTC.', priority: 'high' },
      { type: 'treatment', text: '💨 Acute: High-flow oxygen, injectable triptans. Prevention: Verapamil, steroids, or lithium.', priority: 'high' },
      { type: 'info', text: 'Avoid alcohol during active cluster bouts — it can trigger attacks within minutes.', priority: 'medium' },
    ],
    'paroxysmal-hemicrania': [
      { type: 'urgent', text: '🩺 Consult a neurologist — paroxysmal hemicrania is completely treatable with indomethacin.', priority: 'high' },
      { type: 'info', text: 'A therapeutic trial of indomethacin is both diagnostic and therapeutic for this condition.', priority: 'medium' },
    ],
    'hemicrania-continua': [
      { type: 'urgent', text: '🩺 Consult a neurologist — hemicrania continua responds completely to indomethacin.', priority: 'high' },
    ],
    'trigeminal-neuralgia': [
      { type: 'urgent', text: '🩺 Consult a neurologist — trigeminal neuralgia has specific medical (carbamazepine) and surgical options.', priority: 'high' },
      { type: 'info', text: 'Avoid triggering activities (shaving, washing, brushing) until treated.', priority: 'medium' },
    ],
    'medication-overuse': [
      { type: 'urgent', text: '🛑 Stop overusing acute medication — this may be making your headaches worse (rebound).', priority: 'high' },
      { type: 'treatment', text: '💊 Work with your doctor on a withdrawal plan and start preventive medication.', priority: 'high' },
    ],
    'occipital-neuralgia': [
      { type: 'info', text: 'Nerve blocks and physical therapy are often effective. Consider seeing a neurologist or pain specialist.', priority: 'medium' },
    ],
    'thunderclap': [
      { type: 'emergency', text: '🚨 GO TO THE EMERGENCY ROOM IMMEDIATELY — thunderclap headache requires urgent evaluation.', priority: 'critical' },
    ],
    'temporal-arteritis': [
      { type: 'emergency', text: '🚨 SEE A DOCTOR URGENTLY — giant cell arteritis can cause blindness if untreated.', priority: 'critical' },
    ],
    'meningitis': [
      { type: 'emergency', text: '🚨 GO TO THE EMERGENCY ROOM IMMEDIATELY — possible meningitis requires urgent treatment.', priority: 'critical' },
    ],
    'stroke': [
      { type: 'emergency', text: '🚨 CALL EMERGENCY SERVICES — possible stroke requires immediate evaluation.', priority: 'critical' },
    ],
    'csf-leak': [
      { type: 'info', text: 'See a neurologist. Spontaneous CSF leaks are treatable with blood patches or surgery.', priority: 'high' },
    ],
    'iih': [
      { type: 'urgent', text: '🩺 See an ophthalmologist and neurologist — IIH can threaten vision.', priority: 'high' },
      { type: 'info', text: 'Weight loss is the most effective long-term treatment. Medications (acetazolamide) can help.', priority: 'medium' },
    ],
    'cervicogenic': [
      { type: 'info', text: 'Physical therapy, posture correction, and treating the neck issue usually resolves the headache.', priority: 'medium' },
    ],
    'sinusitis': [
      { type: 'info', text: 'Treat the underlying sinus infection (antibiotics if bacterial, decongestants, nasal irrigation).', priority: 'medium' },
    ],
    'tmd': [
      { type: 'info', text: 'Dental splint, physical therapy, avoiding hard/chewy foods, and stress management can help.', priority: 'medium' },
    ],
  };

  if (recMap[diagnosis.id]) {
    recommendations.push(...recMap[diagnosis.id]);
  } else {
    recommendations.push({
      type: 'general',
      text: 'Consult a healthcare provider for proper evaluation and management.',
      priority: 'medium',
    });
  }

  recommendations.push({
    type: 'disclaimer',
    text: '⚕️ This assessment is for educational purposes only. Always consult a qualified healthcare provider for diagnosis and treatment.',
    priority: 'info',
  });

  return recommendations;
}

/**
 * Full diagnostic pipeline: screening + adaptive questions + final diagnosis
 */
export function runFullDiagnosis(allAnswers) {
  // Step 1: Check red flags
  const redFlags = checkRedFlags(allAnswers);

  // Step 2: Score all diagnoses
  const scoredDiagnoses = scoreAllDiagnoses(allAnswers);

  // Step 3: Determine if any emergency diagnosis is strongly indicated
  const emergencyCandidates = scoredDiagnoses.filter(d => d.isEmergency && d.confidence >= 60);

  // Step 4: Get top result
  const topResult = scoredDiagnoses[0] || null;
  const alternatives = scoredDiagnoses.slice(1, 5);

  return {
    topResult,
    alternatives,
    redFlags,
    scoredDiagnoses,
    emergencyCandidates,
    hasEmergency: redFlags.some(r => r.priority === 'emergency') || emergencyCandidates.length > 0,
    hasWarning: redFlags.some(r => r.priority === 'warning'),
    totalScored: scoredDiagnoses.length,
  };
}
