/**
 * ICHD-3 Headache Classification Data — Complete
 * International Classification of Headache Disorders, 3rd Edition (beta)
 * Covers Part I (Primary), Part II (Secondary), Part III (Cranial Neuralgias)
 *
 * Each diagnosis includes:
 *  - Diagnostic criteria (A/B/C/D/E) with required/matches semantics
 *  - Key differentiating questions mapped to criteria
 *  - Expected duration ranges, frequency, laterality, quality
 *  - Variants/subtypes
 */

// ──────────────────────────────────────────────
// Utility helpers (used by criteria definitions)
// ──────────────────────────────────────────────

/** Pain laterality options mapped to ICHD-3 wording */
export const LATERALITY = {
  UNILATERAL: 'unilateral',
  BILATERAL: 'bilateral',
  STRICTLY_UNILATERAL: 'strictly unilateral',
  SIDE_LOCKED: 'side-locked unilateral',
  SIDE_SHIFTING: 'side-shifting unilateral',
  MIDLINE: 'midline',
  HEMICRANIAL: 'hemicranial',
};

/** Pain quality options */
export const QUALITY = {
  PULSATING: 'pulsating',
  PRESSING: 'pressing/tightening',
  STABBING: 'sharp/stabbing',
  BURNING: 'burning',
  ELECTRIC: 'electric shock-like',
  THROBBING: 'throbbing',
  DULL: 'dull/aching',
  BORING: 'boring',
};

/** Pain intensity */
export const INTENSITY = {
  MILD: 1,
  MODERATE: 2,
  SEVERE: 3,
  VERY_SEVERE: 4,
  MAXIMUM: 5,
};

// ──────────────────────────────────────────────
// PART I — PRIMARY HEADACHES
// ──────────────────────────────────────────────

const primaryHeadaches = [
  // ── 1. Migraine ─────────────────────────────
  {
    id: 'migraine',
    name: 'Migraine',
    code: '1.',
    description: 'Recurrent headache disorder manifesting in attacks lasting 4–72 hours. Typical characteristics: unilateral location, pulsating quality, moderate or severe intensity, aggravation by routine physical activity, and association with nausea and/or photophobia and phonophobia.',
    category: 'primary',
    parentId: null,
    diagnosticCriteria: {
      A: {
        text: 'At least 5 attacks fulfilling criteria B–D',
        required: true,
        rule: 'count>=5',
      },
      B: {
        text: 'Headache attacks lasting 4–72 hours (untreated or unsuccessfully treated)',
        required: true,
        rule: 'duration',
        minMinutes: 240,
        maxMinutes: 4320,
      },
      C: {
        text: 'Headache has at least two of the following four characteristics:',
        required: true,
        subCriteria: [
          { id: 'c1', text: 'Unilateral location' },
          { id: 'c2', text: 'Pulsating quality' },
          { id: 'c3', text: 'Moderate or severe pain intensity' },
          { id: 'c4', text: 'Aggravation by or causing avoidance of routine physical activity (e.g. walking, climbing stairs)' },
        ],
        minMatch: 2,
      },
      D: {
        text: 'During headache at least one of the following:',
        required: true,
        subCriteria: [
          { id: 'd1', text: 'Nausea and/or vomiting' },
          { id: 'd2', text: 'Photophobia and phonophobia' },
        ],
        minMatch: 1,
      },
      E: {
        text: 'Not better accounted for by another ICHD-3 diagnosis',
        required: true,
        rule: 'exclusion',
      },
    },
    typicalDuration: { min: 240, max: 4320, unit: 'minutes' },
    typicalFrequency: { label: '1–2 per month (can vary widely)' },
    laterality: [LATERALITY.UNILATERAL, LATERALITY.SIDE_SHIFTING],
    quality: [QUALITY.PULSATING, QUALITY.THROBBING],
    aggravating: ['routine physical activity'],
    associated: ['nausea', 'vomiting', 'photophobia', 'phonophobia', 'osmophobia'],
    variants: [
      { id: 'migraine-with-aura', name: 'Migraine with Aura', code: '1.2' },
      { id: 'migraine-without-aura', name: 'Migraine without Aura', code: '1.1' },
      { id: 'chronic-migraine', name: 'Chronic Migraine', code: '1.3', description: '≥15 headache days/month for >3 months, of which ≥8 have migraine features' },
      { id: 'migraine-aura-only', name: 'Typical Aura without Headache', code: '1.2.1' },
      { id: 'migraine-brainstem', name: 'Migraine with Brainstem Aura', code: '1.2.2' },
      { id: 'migraine-hemiplegic', name: 'Hemiplegic Migraine', code: '1.2.3' },
      { id: 'migraine-retinal', name: 'Retinal Migraine', code: '1.4' },
      { id: 'migraine-menstrual', name: 'Menstrual Migraine', code: 'A1.1' },
    ],
    // Questions that map directly to criteria
    questions: [
      { key: 'attackCount', text: 'How many headache attacks have you had?', type: 'choice', options: ['Fewer than 5', '5 or more', 'Many (20+)'] },
      { key: 'duration', text: 'How long does a typical untreated headache last?', type: 'choice', options: ['< 4 hours', '4–72 hours (half day to 3 days)', '> 72 hours'] },
      { key: 'location', text: 'Where is the pain?', type: 'choice-multi', options: ['One side of head', 'Both sides', 'Front/forehead', 'Back of head', 'Around eye', 'Top of head'] },
      { key: 'quality_pain', text: 'What does the pain feel like?', type: 'choice-multi', options: ['Pulsating/throbbing', 'Pressing/tightening', 'Sharp/stabbing', 'Dull/aching', 'Electric shock-like'] },
      { key: 'intensity', text: 'How severe is the pain?', type: 'choice', options: ['Mild — doesn\'t stop me', 'Moderate — makes me slow down', 'Severe — I need to stop', 'Very severe — I must lie down'] },
      { key: 'physicalActivity', text: 'Does routine physical activity (walking, stairs) make it worse?', type: 'boolean' },
      { key: 'nausea', text: 'Do you feel nauseous or vomit during the headache?', type: 'boolean' },
      { key: 'photophobia', text: 'Are you sensitive to light during the headache?', type: 'boolean' },
      { key: 'phonophobia', text: 'Are you sensitive to sound during the headache?', type: 'boolean' },
      { key: 'osmophobia', text: 'Are you sensitive to smells during the headache?', type: 'boolean' },
      // Aura questions
      { key: 'aura', text: 'Do you have any visual or sensory disturbances BEFORE the headache starts?', type: 'boolean' },
      { key: 'auraVisual', text: 'Describe the visual disturbance', type: 'choice-multi', options: ['Zigzag lines/scintillations', 'Blind spots', 'Flashing lights', 'Blurred vision', 'Tunnel vision'] },
      { key: 'auraSensory', text: 'Do you have tingling or numbness before the headache?', type: 'boolean' },
      { key: 'auraSpeech', text: 'Do you have difficulty speaking before the headache?', type: 'boolean' },
      { key: 'auraMotor', text: 'Do you have weakness on one side before the headache?', type: 'boolean' },
      { key: 'auraDuration', text: 'How long do the aura symptoms last?', type: 'choice', options: ['5–60 minutes', '> 60 minutes'] },
      // Chronic migraine
      { key: 'headacheDaysMonth', text: 'How many days per month do you have headache?', type: 'choice', options: ['Fewer than 15', '15 or more'] },
    ],
  },

  // ── 2. Tension-Type Headache ────────────────
  {
    id: 'tth',
    name: 'Tension-Type Headache (TTH)',
    code: '2.',
    description: 'Primary headache disorder characterized by bilateral, pressing/tightening quality, of mild to moderate intensity, typically not aggravated by routine physical activity.',
    category: 'primary',
    parentId: null,
    diagnosticCriteria: {
      A: {
        text: 'At least 10 episodes fulfilling criteria B–D',
        required: true,
        rule: 'count>=10',
      },
      B: {
        text: 'Headache lasting 30 minutes to 7 days',
        required: true,
        rule: 'duration',
        minMinutes: 30,
        maxMinutes: 10080,
      },
      C: {
        text: 'At least two of the following four characteristics:',
        required: true,
        subCriteria: [
          { id: 'c1', text: 'Bilateral location' },
          { id: 'c2', text: 'Pressing/tightening (non-pulsating) quality' },
          { id: 'c3', text: 'Mild or moderate intensity' },
          { id: 'c4', text: 'Not aggravated by routine physical activity' },
        ],
        minMatch: 2,
      },
      D: {
        text: 'Both of the following:',
        required: true,
        subCriteria: [
          { id: 'd1', text: 'No nausea or vomiting' },
          { id: 'd2', text: 'No more than one of photophobia or phonophobia' },
        ],
        minMatch: 2,
      },
      E: {
        text: 'Not better accounted for by another ICHD-3 diagnosis',
        required: true,
        rule: 'exclusion',
      },
    },
    typicalDuration: { min: 30, max: 10080, unit: 'minutes' },
    typicalFrequency: { label: 'Episodic or chronic (≥15 days/mo)' },
    laterality: [LATERALITY.BILATERAL],
    quality: [QUALITY.PRESSING, QUALITY.DULL],
    aggravating: [],
    associated: [],
    variations: ['Infrequent episodic TTH (<1/mo)', 'Frequent episodic TTH (1–14/mo)', 'Chronic TTH (≥15/mo)'],
    variants: [
      { id: 'infrequent-episodic-tth', name: 'Infrequent Episodic TTH', code: '2.1' },
      { id: 'frequent-episodic-tth', name: 'Frequent Episodic TTH', code: '2.2' },
      { id: 'chronic-tth', name: 'Chronic TTH', code: '2.3' },
    ],
    questions: [
      { key: 'attackCount', text: 'How many headache episodes have you had in total?', type: 'choice', options: ['Fewer than 10', '10 or more'] },
      { key: 'duration', text: 'How long does a typical headache last?', type: 'choice', options: ['< 30 minutes', '30 minutes to 7 days', '> 7 days (continuous)'] },
      { key: 'location', text: 'Where is the pain located?', type: 'choice-multi', options: ['Both sides of head', 'Forehead', 'Back of head', 'Top of head', 'One side'] },
      { key: 'quality_pain', text: 'What does the pain feel like?', type: 'choice-multi', options: ['Pressing/tightening (like a band)', 'Dull/aching', 'Pulsating/throbbing', 'Sharp'] },
      { key: 'intensity', text: 'How severe is the pain?', type: 'choice', options: ['Mild — barely notice', 'Moderate — annoying', 'Severe — interferes', 'Very severe'] },
      { key: 'physicalActivity', text: 'Does walking or climbing stairs make it worse?', type: 'boolean' },
      { key: 'nausea', text: 'Do you feel nauseous?', type: 'boolean' },
      { key: 'vomiting', text: 'Do you vomit?', type: 'boolean' },
      { key: 'photophobia', text: 'Are you sensitive to light?', type: 'boolean' },
      { key: 'phonophobia', text: 'Are you sensitive to sound?', type: 'boolean' },
      { key: 'headacheDaysMonth', text: 'How many days per month do you have this headache?', type: 'choice', options: ['Fewer than 1', '1–14', '15 or more'] },
    ],
  },

  // ── 3. Cluster Headache ─────────────────────
  {
    id: 'cluster-headache',
    name: 'Cluster Headache',
    code: '3.1',
    description: 'Severe or very severe strictly unilateral pain — orbital, supraorbital, temporal, or in any combination — lasting 15–180 minutes, occurring from once every other day to 8 times daily, associated with ipsilateral autonomic features.',
    category: 'primary',
    parentId: 'tac',
    diagnosticCriteria: {
      A: {
        text: 'At least 5 attacks fulfilling criteria B–D',
        required: true,
        rule: 'count>=5',
      },
      B: {
        text: 'Severe or very severe unilateral orbital, supraorbital and/or temporal pain lasting 15–180 minutes (untreated)',
        required: true,
        rule: 'duration',
        minMinutes: 15,
        maxMinutes: 180,
      },
      C: {
        text: 'Either or both of the following:',
        required: true,
        subCriteria: [
          { id: 'c1', text: 'At least one ipsilateral autonomic symptom (conjunctival injection, lacrimation, nasal congestion, rhinorrhea, forehead/facial sweating, miosis, ptosis, eyelid edema)' },
          { id: 'c2', text: 'A sense of restlessness or agitation' },
        ],
        minMatch: 1,
      },
      D: {
        text: 'Attack frequency: 1 every other day to 8 per day',
        required: true,
        rule: 'frequency',
        minDaily: 0.5,
        maxDaily: 8,
      },
      E: {
        text: 'Not better accounted for by another ICHD-3 diagnosis',
        required: true,
        rule: 'exclusion',
      },
    },
    typicalDuration: { min: 15, max: 180, unit: 'minutes' },
    typicalFrequency: { label: '1 every other day to 8/day, in cluster bouts lasting weeks to months' },
    laterality: [LATERALITY.STRICTLY_UNILATERAL, LATERALITY.SIDE_LOCKED],
    quality: [QUALITY.BORING, QUALITY.STABBING, QUALITY.BURNING],
    aggravating: ['alcohol during cluster period'],
    associated: ['conjunctival_injection', 'lacrimation', 'nasal_congestion', 'rhinorrhea', 'ptosis', 'miosis', 'eyelid_edema', 'sweating', 'restlessness'],
    variants: [
      { id: 'episodic-cluster', name: 'Episodic Cluster Headache', code: '3.1.1' },
      { id: 'chronic-cluster', name: 'Chronic Cluster Headache', code: '3.1.2' },
    ],
    questions: [
      { key: 'attackCount', text: 'How many attacks have you had?', type: 'choice', options: ['Fewer than 5', '5 or more'] },
      { key: 'duration', text: 'How long does an untreated attack last?', type: 'choice', options: ['< 15 minutes', '15–180 minutes', '> 3 hours'] },
      { key: 'location', text: 'Where exactly is the pain?', type: 'choice-multi', options: ['Around one eye', 'One temple', 'One side of forehead', 'One side only (always same side)'] },
      { key: 'intensity', text: 'How severe is the pain?', type: 'choice', options: ['Mild', 'Moderate', 'Severe — I can barely sit still', 'Very severe — I pace/rock'] },
      { key: 'quality_pain', text: 'What does the pain feel like?', type: 'choice-multi', options: ['Boring/drilling', 'Burning', 'Sharp/stabbing', 'Pulsating'] },
      { key: 'autonomic', text: 'During the attack, do you have any of these on the same side as the pain?', type: 'choice-multi', options: ['Watery/red eye', 'Stuffy/runny nose', 'Drooping eyelid', 'Facial sweating', 'Small pupil'] },
      { key: 'restlessness', text: 'Do you feel restless or pace during attacks?', type: 'boolean' },
      { key: 'frequencyDaily', text: 'How many attacks do you have per day during a bad period?', type: 'choice', options: ['Less than 1 per day', '1 per day', '2–3 per day', '4–8 per day', 'More than 8'] },
      { key: 'clusterBouts', text: 'Do attacks come in clusters (bouts lasting weeks to months, then disappear)?', type: 'boolean' },
      { key: 'alcoholTrigger', text: 'Does alcohol trigger attacks during cluster periods?', type: 'boolean' },
    ],
  },

  // ── 3.2 Paroxysmal Hemicrania ───────────────
  {
    id: 'paroxysmal-hemicrania',
    name: 'Paroxysmal Hemicrania',
    code: '3.2',
    description: 'Severe unilateral orbital, supraorbital, or temporal pain lasting 2–30 minutes, occurring many times daily, with ipsilateral autonomic features. Completely responsive to indomethacin.',
    category: 'primary',
    parentId: 'tac',
    diagnosticCriteria: {
      A: {
        text: 'At least 20 attacks fulfilling B–E',
        required: true,
        rule: 'count>=20',
      },
      B: {
        text: 'Severe unilateral orbital, supraorbital and/or temporal pain lasting 2–30 minutes',
        required: true,
        rule: 'duration',
        minMinutes: 2,
        maxMinutes: 30,
      },
      C: {
        text: 'At least one ipsilateral autonomic symptom (red/watery eye, congestion, rhinorrhea, ptosis, eyelid edema, sweating, miosis)',
        required: true,
        rule: 'autonomic',
      },
      D: {
        text: 'Attack frequency >5 per day for more than half the time',
        required: true,
        rule: 'frequency',
        minDaily: 5,
      },
      E: {
        text: 'Attacks are completely prevented by therapeutic doses of indomethacin',
        required: true,
        rule: 'indomethacin',
      },
      F: {
        text: 'Not better accounted for by another ICHD-3 diagnosis',
        required: true,
        rule: 'exclusion',
      },
    },
    typicalDuration: { min: 2, max: 30, unit: 'minutes' },
    typicalFrequency: { label: '> 5/day (often >10)' },
    questions: [
      { key: 'attackCount', text: 'Have you had many attacks?', type: 'choice', options: ['Fewer than 20', '20 or more'] },
      { key: 'duration', text: 'How long does an attack last?', type: 'choice', options: ['< 2 minutes', '2–30 minutes', '> 30 minutes'] },
      { key: 'location', text: 'Where is the pain?', type: 'choice-multi', options: ['Around one eye', 'One temple', 'One side only (same side)'] },
      { key: 'intensity', text: 'How severe?', type: 'choice', options: ['Mild', 'Moderate', 'Severe', 'Very severe'] },
      { key: 'autonomic', text: 'During the attack, do you have any of these on the same side as the pain?', type: 'choice-multi', options: ['Watery/red eye', 'Stuffy/runny nose', 'Drooping eyelid', 'Facial sweating'] },
      { key: 'frequencyDaily', text: 'How many attacks per day?', type: 'choice', options: ['1–5', '6–10', '11–20', 'More than 20'] },
      { key: 'indomethacinResponse', text: 'Have you ever taken indomethacin? Did it stop the attacks completely?', type: 'choice', options: ['Never tried', 'Yes — completely stopped', 'Yes — partially helped', 'Yes — no benefit'] },
    ],
  },

  // ── 3.4 Hemicrania Continua ──────────────────
  {
    id: 'hemicrania-continua',
    name: 'Hemicrania Continua',
    code: '3.4',
    description: 'Persistent, strictly unilateral headache with superimposed exacerbations of moderate or greater intensity, associated with cranial autonomic symptoms, and responding to indomethacin.',
    category: 'primary',
    parentId: 'tac',
    diagnosticCriteria: {
      A: {
        text: 'Headache fulfilling criteria B–D',
        required: true,
      },
      B: {
        text: 'Unilateral headache without side shift, present for >3 months',
        required: true,
        rule: 'duration>=3months',
      },
      C: {
        text: 'At least one of the following:',
        required: true,
        subCriteria: [
          { id: 'c1', text: 'At least one ipsilateral autonomic symptom during exacerbations' },
          { id: 'c2', text: 'Sense of restlessness or agitation during exacerbations' },
        ],
        minMatch: 1,
      },
      D: {
        text: 'Completely responsive to indomethacin',
        required: true,
        rule: 'indomethacin',
      },
    },
    typicalDuration: { min: null, max: null, unit: 'continuous' },
    typicalFrequency: { label: 'Continuous with exacerbations' },
    questions: [
      { key: 'continuousUnilateral', text: 'Is the headache continuous (always there) and strictly on one side?', type: 'boolean' },
      { key: 'durationMonths', text: 'How long has it been present?', type: 'choice', options: ['Less than 3 months', 'More than 3 months'] },
      { key: 'exacerbations', text: 'Does the pain have severe attacks superimposed on a continuous baseline?', type: 'boolean' },
      { key: 'autonomic', text: 'During the severe episodes, do you get any of these on the same side?', type: 'choice-multi', options: ['Watery/red eye', 'Stuffy/runny nose', 'Drooping eyelid', 'Facial sweating'] },
      { key: 'restlessness', text: 'Do you feel restless or agitated during the severe episodes?', type: 'boolean' },
      { key: 'indomethacinResponse', text: 'Have you ever taken indomethacin? Response?', type: 'choice', options: ['Never tried', 'Yes — completely stopped', 'Yes — partially helped', 'Yes — no benefit'] },
    ],
  },

  // ── SUNCT/SUNA ───────────────────────────────
  {
    id: 'sunct',
    name: 'Short-lasting Unilateral Neuralgiform headache attacks with Conjunctival injection and Tearing (SUNCT)',
    code: '3.3',
    description: 'Short-lasting (5–240 sec) unilateral neuralgiform headache attacks with ipsilateral autonomic features.',
    category: 'primary',
    parentId: 'tac',
    diagnosticCriteria: {
      A: {
        text: 'At least 20 attacks fulfilling B–D',
        required: true,
      },
      B: {
        text: 'Unilateral orbital, supraorbital, temporal or other trigeminal distribution lasting 1–600 seconds',
        required: true,
        rule: 'duration',
        minMinutes: 0.017,
        maxMinutes: 10,
      },
      C: {
        text: 'At least one ipsilateral autonomic feature',
        required: true,
        rule: 'autonomic',
      },
      D: {
        text: 'Attack frequency: at least 1 per day for > half the time',
        required: true,
        rule: 'frequency',
        minDaily: 1,
      },
    },
  },

  // ── 4. Other Primary Headaches ──────────────
  {
    id: 'other-primary',
    name: 'Other Primary Headache Disorders',
    code: '4.',
    description: 'Primary cough headache, primary exercise headache, primary headache associated with sexual activity, primary thunderclap headache, cold-stimulus headache, nummular headache, hypnic headache, new daily persistent headache (NDPH).',
    category: 'primary',
    diagnosticCriteria: {
      A: { text: 'Headache distinct from the above primary headache types', required: true },
      B: { text: 'Not attributable to another disorder', required: true },
    },
    variants: [
      { id: 'ndph', name: 'New Daily Persistent Headache', code: '4.10', description: 'Persistent headache from onset, clearly remembered date' },
      { id: 'hypnic', name: 'Hypnic Headache', code: '4.9', description: 'Headache awakening from sleep, usually after age 50' },
      { id: 'primary-cough', name: 'Primary Cough Headache', code: '4.1', description: 'Sudden onset with coughing, no intracranial abnormality' },
      { id: 'primary-exercise', name: 'Primary Exertional Headache', code: '4.2', description: 'Brought on by physical exercise' },
      { id: 'thunderclap', name: 'Primary Thunderclap Headache', code: '4.3', description: 'Sudden severe headache, no intracranial pathology' },
    ],
    questions: [
      { key: 'suddenOnset', text: 'Did the headache start suddenly and remain persistent from the first day?', type: 'boolean' },
      { key: 'trigger', text: 'What triggers your headache?', type: 'choice-multi', options: ['Coughing/sneezing', 'Physical exercise', 'Sexual activity', 'Cold stimulus', 'Wakes me from sleep', 'Nothing specific'] },
      { key: 'age', text: 'How old are you?', type: 'choice', options: ['Under 50', '50 or older'] },
    ],
  },

  // ── Vestibular Migraine (Appendix A1.6.6) ─────
  {
    id: 'vestibular-migraine',
    name: 'Vestibular Migraine',
    code: 'A1.6.6',
    description: 'Recurrent episodes of vertigo/dizziness and balance disturbance associated with migraine features. Headache may be absent during attacks.',
    category: 'primary',
    parentId: 'migraine',
    diagnosticCriteria: {
      A: {
        text: 'At least 5 episodes fulfilling criteria B–D',
        required: true,
        rule: 'count>=5',
      },
      B: {
        text: 'Current or past history of migraine with or without aura',
        required: true,
        rule: 'migraineHistory',
      },
      C: {
        text: 'At least 5 vestibular episodes of moderate-severe intensity, lasting 5 min to 72 hours',
        required: true,
        rule: 'duration',
        minMinutes: 5,
        maxMinutes: 4320,
      },
      D: {
        text: 'At least half of vestibular episodes accompanied by at least one migraine feature',
        required: true,
        rule: 'migraineFeature',
      },
      E: {
        text: 'Not better accounted for by another ICHD-3 diagnosis',
        required: true,
        rule: 'exclusion',
      },
    },
    typicalDuration: { min: 5, max: 4320, unit: 'minutes' },
    typicalFrequency: { label: 'Variable, often episodic' },
    laterality: [LATERALITY.UNILATERAL, LATERALITY.BILATERAL],
    quality: [QUALITY.PULSATING, QUALITY.PRESSING],
    associated: ['vertigo', 'dizziness', 'nausea', 'photophobia', 'phonophobia', 'visualDisturbance'],
    variants: [
      { id: 'vestibular-migraine-definite', name: 'Definite Vestibular Migraine', code: 'A1.6.6' },
      { id: 'vestibular-migraine-probable', name: 'Probable Vestibular Migraine', code: 'A1.6.6' },
    ],
    questions: [
      { key: 'migraineHistory', text: 'Do you have a history of migraine headaches?', type: 'boolean' },
      { key: 'vertigoEpisodes', text: 'How many vertigo/dizziness episodes have you had?', type: 'choice', options: ['Fewer than 5', '5 or more'] },
      { key: 'vertigoDuration', text: 'How long do dizziness episodes typically last?', type: 'choice', options: ['Less than 5 minutes', '5 min to 1 hour', '1–24 hours', '24–72 hours', 'More than 72 hours'] },
      { key: 'vertigoIntensity', text: 'How severe is the dizziness/vertigo?', type: 'choice', options: ['Mild — noticeable', 'Moderate — interferes', 'Severe — cannot continue'] },
      { key: 'headacheWithVertigo', text: 'Do you have headache with the vertigo episodes?', type: 'boolean' },
      { key: 'photophobiaVertigo', text: 'Are you sensitive to light during episodes?', type: 'boolean' },
      { key: 'phonophobiaVertigo', text: 'Are you sensitive to sound during episodes?', type: 'boolean' },
      { key: 'nauseaVertigo', text: 'Do you feel nauseous during episodes?', type: 'boolean' },
      { key: 'visualVertigo', text: 'Does visual motion make it worse?', type: 'boolean' },
      { key: 'motionTrigger', text: 'Does head motion trigger the dizziness?', type: 'boolean' },
    ],
  },

  // ── Persistent Post-Traumatic Headache ────
  {
    id: 'post-traumatic-headache',
    name: 'Persistent Post-Traumatic Headache',
    code: '5.2',
    description: 'Headache persisting for more than 3 months after head injury. May have migraine-like or tension-type features.',
    category: 'secondary',
    diagnosticCriteria: {
      A: {
        text: 'Headache of any type developing within 7 days of head trauma',
        required: true,
      },
      B: {
        text: 'Headache persists for more than 3 months after injury',
        required: true,
        rule: 'duration',
        minDays: 90,
      },
      C: {
        text: 'Headache not better explained by other causes',
        required: true,
        rule: 'exclusion',
      },
    },
    typicalDuration: { min: null, max: null, unit: 'persistent' },
    typicalFrequency: { label: 'Daily to intermittent' },
    laterality: [LATERALITY.BILATERAL, LATERALITY.UNILATERAL],
    quality: [QUALITY.PULSATING, QUALITY.PRESSING, QUALITY.DULL],
    associated: ['concentration', 'memory', 'fatigue', 'photophobia', 'phonophobia'],
    questions: [
      { key: 'headInjury', text: 'Have you had a head injury in the past?', type: 'boolean' },
      { key: 'injuryTime', text: 'How long ago was the injury?', type: 'choice', options: ['Less than 1 month', '1–3 months', 'More than 3 months'] },
      { key: 'headacheAfterInjury', text: 'Did headache start within 7 days of the injury?', type: 'boolean' },
      { key: 'headacheType', text: 'What does the headache feel like?', type: 'choice', options: ['Pulsating/throbbing', 'Pressing/tightening', 'Dull/aching', 'Mixed'] },
      { key: 'concentration', text: 'Do you have trouble concentrating?', type: 'boolean' },
      { key: 'memoryIssues', text: 'Do you have memory problems?', type: 'boolean' },
      { key: 'fatigue', text: 'Do you feel unusually tired?', type: 'boolean' },
      { key: 'lightSensitivity', text: 'Are you sensitive to light?', type: 'boolean' },
      { key: 'soundSensitivity', text: 'Are you sensitive to sound?', type: 'boolean' },
    ],
  },

  // ── COVID-19 Associated Headache ────────────
  {
    id: 'covid-headache',
    name: 'Headache Attributed to COVID-19 Infection',
    code: '9.4.4',
    description: 'New headache beginning during COVID-19 infection or persisting afterward. Often has migraine-like features.',
    category: 'secondary',
    diagnosticCriteria: {
      A: {
        text: 'COVID-19 infection confirmed by test or clinically',
        required: true,
        rule: 'covidConfirmed',
      },
      B: {
        text: 'Headache develops during infection or within 4 weeks afterward',
        required: true,
      },
      C: {
        text: 'Headache persists for more than 3 months or remains ongoing',
        required: false,
      },
      D: {
        text: 'Not better accounted for by another diagnosis',
        required: true,
        rule: 'exclusion',
      },
    },
    typicalDuration: { min: null, max: null, unit: 'variable' },
    typicalFrequency: { label: 'Often daily during acute phase' },
    laterality: [LATERALITY.BILATERAL, LATERALITY.UNILATERAL],
    quality: [QUALITY.PULSATING, QUALITY.PRESSING, QUALITY.DULL],
    associated: ['fatigue', 'anosmia', 'ageusia', 'fever', 'cognitive'],
    questions: [
      { key: 'covidInfection', text: 'Have you had COVID-19 infection?', type: 'boolean' },
      { key: 'covidTime', text: 'How long ago was the infection?', type: 'choice', options: ['Currently sick', '1–4 weeks ago', '1–3 months ago', 'More than 3 months ago'] },
      { key: 'headacheDuringCovid', text: 'Did you have headache during the COVID infection?', type: 'boolean' },
      { key: 'headacheQuality', text: 'What does/did the headache feel like?', type: 'choice-multi', options: ['Pulsating/throbbing', 'Pressing/tightening', 'Sharp/stabbing', 'Dull/aching'] },
      { key: 'lossOfSmell', text: 'Did you lose your sense of smell?', type: 'boolean' },
      { key: 'lossOfTaste', text: 'Did you lose your sense of taste?', type: 'boolean' },
      { key: 'fatigueCovid', text: 'Do you still have fatigue after COVID?', type: 'boolean' },
      { key: 'brainFog', text: 'Do you have "brain fog" or concentration problems?', type: 'boolean' },
    ],
  },

  // ── Medication-Overuse Headache ───���─��────────
  {
    id: 'medication-overuse',
    name: 'Medication-Overuse Headache (MOH)',
    code: '8.2',
    description: 'Headache occurring on ≥15 days/month in a person with a pre-existing headache disorder, developing as a consequence of regular overuse of acute or symptomatic headache medication.',
    category: 'primary',
    diagnosticCriteria: {
      A: {
        text: 'Headache on ≥15 days/month in a patient with a pre-existing headache disorder',
        required: true,
        rule: 'headacheDays>=15',
      },
      B: {
        text: 'Regular overuse for >3 months of one or more acute/symptomatic treatment drugs',
        required: true,
        rule: 'overuse',
      },
      C: {
        text: 'Not better accounted for by another ICHD-3 diagnosis',
        required: true,
      },
    },
    questions: [
      { key: 'headacheDaysMonth', text: 'How many days per month do you have headache?', type: 'choice', options: ['< 15 days', '15 or more days'] },
      { key: 'medicationUseDays', text: 'How many days per month do you take pain medication for headaches?', type: 'choice', options: ['< 10 days', '10–14 days', '15 or more days'] },
      { key: 'medicationDuration', text: 'How long have you been using pain medication this frequently?', type: 'choice', options: ['< 3 months', '> 3 months'] },
      { key: 'medicationType', text: 'What type of pain medication do you take most often?', type: 'choice-multi', options: ['Simple analgesics (paracetamol, aspirin, NSAIDs)', 'Triptans (sumatriptan, rizatriptan, etc.)', 'Opioids (codeine, tramadol)', 'Combination analgesics (caffeine + paracetamol)', 'Ergotamines'] },
      { key: 'rebound', text: 'Does the headache seem to get worse when the medication wears off?', type: 'boolean' },
      { key: 'morningHeadache', text: 'Do you often wake up with a headache?', type: 'boolean' },
    ],
  },
];

// ──────────────────────────────────────────────
// PART II — SECONDARY HEADACHES
// ──────────────────────────────────────────────

const secondaryHeadaches = [
  {
    id: 'thunderclap',
    name: 'Headache Attributed to Vascular Emergency',
    code: '6.2',
    description: 'Sudden severe "thunderclap" headache reaching maximum intensity in <1 minute. May indicate subarachnoid hemorrhage, cerebral venous thrombosis, arterial dissection, or reversible cerebral vasoconstriction syndrome (RCVS).',
    category: 'secondary',
    isEmergency: true,
    diagnosticCriteria: {
      A: {
        text: 'Sudden severe headache reaching maximum intensity within 1 minute',
        required: true,
        rule: 'thunderclap',
      },
      B: { text: 'Evidence of causative vascular disorder', required: false },
    },
    questions: [
      { key: 'suddenWorst', text: 'Did this headache start suddenly and become severe within seconds?', type: 'boolean' },
      { key: 'worstEver', text: 'Is this the worst headache of your life?', type: 'boolean' },
      { key: 'thunderclapTime', text: 'How long did it take to reach maximum pain?', type: 'choice', options: ['< 1 minute', '1–5 minutes', 'More than 5 minutes'] },
      { key: 'neckStiffness', text: 'Do you have neck stiffness?', type: 'boolean' },
      { key: 'syncope', text: 'Did you lose consciousness or nearly faint?', type: 'boolean' },
      { key: 'vomiting', text: 'Did you vomit?', type: 'boolean' },
    ],
  },
  {
    id: 'meningitis',
    name: 'Headache Attributed to Intracranial Infection',
    code: '9.1',
    description: 'Headache with fever, neck stiffness, and/or altered mental status. Consider meningitis, encephalitis.',
    category: 'secondary',
    isEmergency: true,
    questions: [
      { key: 'fever', text: 'Do you have a fever?', type: 'boolean' },
      { key: 'neckStiffness', text: 'Do you have neck stiffness or difficulty touching chin to chest?', type: 'boolean' },
      { key: 'rash', text: 'Do you have a rash?', type: 'boolean' },
      { key: 'alteredMental', text: 'Are you confused, drowsy, or not yourself?', type: 'boolean' },
    ],
  },
  {
    id: 'stroke',
    name: 'Headache Attributed to Cerebrovascular Event',
    code: '6.1',
    description: 'Headache occurring with acute neurological deficit. Consider stroke or TIA.',
    category: 'secondary',
    isEmergency: true,
    questions: [
      { key: 'weakness', text: 'Do you have weakness on one side of your body?', type: 'boolean' },
      { key: 'speechDifficulty', text: 'Do you have difficulty speaking or understanding speech?', type: 'boolean' },
      { key: 'facialDrop', text: 'Is one side of your face drooping?', type: 'boolean' },
      { key: 'visionLoss', text: 'Have you lost vision in one eye or part of your visual field?', type: 'boolean' },
      { key: 'suddenOnset', text: 'Did these symptoms start suddenly?', type: 'boolean' },
    ],
  },
  {
    id: 'temporal-arteritis',
    name: 'Headache Attributed to Giant Cell Arteritis',
    code: '6.5',
    description: 'Headache (often temporal) associated with scalp tenderness, jaw claudication, visual disturbance, elevated ESR/CRP. Typically age > 50.',
    category: 'secondary',
    questions: [
      { key: 'age', text: 'Are you over 50?', type: 'boolean' },
      { key: 'jawClaudication', text: 'Do you have pain in your jaw when chewing?', type: 'boolean' },
      { key: 'scalpTenderness', text: 'Is your scalp tender?', type: 'boolean' },
      { key: 'visionChanges', text: 'Have you had any vision changes (blurring, double vision)?', type: 'boolean' },
      { key: 'weightLoss', text: 'Unexplained weight loss?', type: 'boolean' },
      { key: 'morningStiffness', text: 'Do you have stiffness in shoulders/hips in the morning?', type: 'boolean' },
    ],
  },
  {
    id: 'csf-leak',
    name: 'Headache Attributed to Low CSF Pressure (Spontaneous Intracranial Hypotension)',
    code: '7.2.3',
    description: 'Orthostatic headache (worse upright, better lying flat) due to CSF leak.',
    category: 'secondary',
    questions: [
      { key: 'orthostatic', text: 'Is the headache much worse when you stand up and better when you lie down?', type: 'boolean' },
      { key: 'nauseaUpright', text: 'Do you feel nauseous or dizzy when upright?', type: 'boolean' },
      { key: 'hearingChanges', text: 'Muffled hearing or tinnitus?', type: 'boolean' },
      { key: 'neckStiffness', text: 'Do you have neck stiffness?', type: 'boolean' },
    ],
  },
  {
    id: 'iih',
    name: 'Headache Attributed to Idiopathic Intracranial Hypertension (IIH)',
    code: '7.1.1',
    description: 'Headache from increased intracranial pressure, often with papilledema, pulsatile tinnitus, and transient visual obscurations. Typically in young, overweight women.',
    category: 'secondary',
    questions: [
      { key: 'sex', text: 'What is your biological sex?', type: 'choice', options: ['Male', 'Female'] },
      { key: 'weightStatus', text: 'Would you describe your weight as:', type: 'choice', options: ['Normal/underweight', 'Overweight', 'Obese'] },
      { key: 'visionChanges', text: 'Do you have brief episodes of vision loss (blackouts lasting seconds)?', type: 'boolean' },
      { key: 'pulsatileTinnitus', text: 'Do you hear a whooshing sound in your ears in time with your heartbeat?', type: 'boolean' },
      { key: 'papilledema', text: 'Has an eye doctor told you that you have swollen optic nerves?', type: 'choice', options: ['Yes', 'No', 'I haven\'t had an eye exam'] },
      { key: 'noiseHeadache', text: 'Do loud noises make the headache worse?', type: 'boolean' },
    ],
  },
  {
    id: 'cervicogenic',
    name: 'Cervicogenic Headache',
    code: '11.2.1',
    description: 'Headache referred from cervical spine pathology.',
    category: 'secondary',
    questions: [
      { key: 'neckPain', text: 'Do you have neck pain that precedes or accompanies the headache?', type: 'boolean' },
      { key: 'neckMovement', text: 'Does certain neck positions or movements trigger the headache?', type: 'boolean' },
      { key: 'unilateralNeck', text: 'Is the pain on one side, starting from the neck to the forehead/eye?', type: 'boolean' },
      { key: 'traumaHistory', text: 'Have you had a whiplash or neck injury?', type: 'boolean' },
    ],
  },
  {
    id: 'sinusitis',
    name: 'Headache Attributed to Rhinosinusitis',
    code: '11.5',
    description: 'Frontal headache with purulent nasal discharge, congestion, fever, and tenderness over sinuses.',
    category: 'secondary',
    questions: [
      { key: 'nasalCongestion', text: 'Do you have nasal congestion or purulent discharge?', type: 'boolean' },
      { key: 'facialPain', text: 'Pain or pressure over your cheeks/forehead?', type: 'boolean' },
      { key: 'fever', text: 'Do you have a fever?', type: 'boolean' },
      { key: 'seasonal', text: 'Does this coincide with colds or allergies?', type: 'boolean' },
      { key: 'bending', text: 'Does bending forward make it worse?', type: 'boolean' },
    ],
  },
  {
    id: 'tmd',
    name: 'Headache Attributed to Temporomandibular Joint (TMJ) Disorder',
    code: '11.7',
    description: 'Headache referred from the temporomandibular joint or masticatory muscles.',
    category: 'secondary',
    questions: [
      { key: 'jawPain', text: 'Do you have jaw pain or TMJ clicking?', type: 'boolean' },
      { key: 'chewingPain', text: 'Does chewing make the headache worse?', type: 'boolean' },
      { key: 'clenching', text: 'Do you clench or grind your teeth?', type: 'boolean' },
      { key: 'temporalTenderness', text: 'Are your temples tender to touch?', type: 'boolean' },
    ],
  },
  {
    id: 'medication-overuse-secondary',
    name: 'Headache Attributed to Medication Overuse',
    code: '8.2',
    description: 'Headache on ≥15 days/month developing from regular overuse of acute headache medication.',
    category: 'secondary',
    questions: [
      { key: 'headacheDaysMonth', text: 'How many days per month do you have headache?', type: 'choice', options: ['< 15 days', '15 or more days'] },
      { key: 'medicationUseDays', text: 'How many days per month do you take painkillers?', type: 'choice', options: ['< 10', '10–14', '15 or more'] },
      { key: 'medicationDuration', text: 'For how long?', type: 'choice', options: ['< 3 months', '> 3 months'] },
    ],
  },
];

// ──────────────────────────────────────────────
// PART III — CRANIAL NEURALGIAS
// ──────────────────────────────────────────────

const cranialNeuralgias = [
  {
    id: 'trigeminal-neuralgia',
    name: 'Trigeminal Neuralgia (TN)',
    code: '13.1',
    description: 'Brief, electric shock-like paroxysms of pain in the trigeminal nerve distribution, triggered by innocuous stimuli.',
    category: 'cranial',
    diagnosticCriteria: {
      A: {
        text: 'Paroxysms of pain lasting from a fraction of a second to 2 minutes, involving one or more divisions of the trigeminal nerve',
        required: true,
      },
      B: {
        text: 'Pain has at least one of the following characteristics:',
        required: true,
        subCriteria: [
          { id: 'b1', text: 'Intense, sharp, superficial, or stabbing' },
          { id: 'b2', text: 'Precipitated from trigger areas or by trigger factors (e.g., washing, shaving, talking, brushing teeth)' },
        ],
        minMatch: 1,
      },
      C: {
        text: 'Attacks are stereotyped in the individual patient',
        required: true,
      },
      D: {
        text: 'No clinically evident neurological deficit',
        required: true,
      },
      E: {
        text: 'Not better accounted for by another ICHD-3 diagnosis',
        required: true,
      },
    },
    questions: [
      { key: 'painDuration', text: 'How long does each jab of pain last?', type: 'choice', options: ['Fraction of a second to 2 minutes', 'Several minutes to hours', 'Continuous'] },
      { key: 'painQuality', text: 'What does the pain feel like?', type: 'choice-multi', options: ['Electric shock-like', 'Sharp/stabbing', 'Burning', 'Throbbing'] },
      { key: 'location', text: 'Where is the pain?', type: 'choice-multi', options: ['Cheek/upper lip', 'Lower jaw/gum', 'Forehead/eye area', 'All three areas on one side'] },
      { key: 'trigger', text: 'What triggers the pain?', type: 'choice-multi', options: ['Light touch on face', 'Brushing teeth', 'Shaving', 'Washing face', 'Chewing', 'Talking', 'Cold wind', 'Nothing specific'] },
      { key: 'refractory', text: 'Is there a refractory period after an attack where you can\'t trigger another?', type: 'boolean' },
      { key: 'carbamazepine', text: 'Have you taken carbamazepine? Did it help?', type: 'choice', options: ['Never tried', 'Yes — significant relief', 'Yes — partial relief', 'Yes — no benefit'] },
    ],
  },
  {
    id: 'glossopharyngeal-neuralgia',
    name: 'Glossopharyngeal Neuralgia',
    code: '13.2',
    description: 'Pain in the posterior part of the tongue, tonsillar fossa, pharynx, angle of the mandible.',
    questions: [
      { key: 'painLocation', text: 'Where is the pain?', type: 'choice-multi', options: ['Back of the throat', 'Base of tongue', 'Angle of jaw', 'Ear'] },
      { key: 'trigger', text: 'What triggers it?', type: 'choice-multi', options: ['Swallowing', 'Coughing', 'Yawning', 'Speaking'] },
      { key: 'painDuration', text: 'How long does each paroxysm last?', type: 'choice', options: ['Seconds to 2 minutes', 'Longer'] },
      { key: 'syncope', text: 'Have you fainted during an attack?', type: 'boolean' },
    ],
  },
  {
    id: 'occipital-neuralgia',
    name: 'Occipital Neuralgia',
    code: '13.3',
    description: 'Pain in the distribution of the greater, lesser, or third occipital nerves.',
    questions: [
      { key: 'painLocation', text: 'Where is the pain?', type: 'choice-multi', options: ['Back of head (one side)', 'Back of head (both sides)', 'Behind the ear'] },
      { key: 'painQuality', text: 'What does it feel like?', type: 'choice-multi', options: ['Shooting/stabbing', 'Electric', 'Aching', 'Burning', 'Throbbing'] },
      { key: 'trigger', text: 'Does palpation of the back of the head reproduce the pain?', type: 'boolean' },
      { key: 'numbness', text: 'Is there numbness or tingling at the back of your head?', type: 'boolean' },
      { key: 'neckMovement', text: 'Is it worse with neck movement?', type: 'boolean' },
      { key: 'nerveBlock', text: 'Has a nerve block (injection) at the back of the head given relief?', type: 'choice', options: ['Never had one', 'Yes — it helped', 'Yes — no benefit'] },
    ],
  },
];

// ──────────────────────────────────────────────
// RED FLAGS (SNNOOP10 — the expanded list)
// ──────────────────────────────────────────────

export const RED_FLAGS = [
  // Thunderclap / SAH
  { id: 'thunderclap', text: 'Sudden severe headache reaching max intensity within seconds (thunderclap)', priority: 'emergency', snnoop: 'S' },
  { id: 'worstEver', text: 'First or worst headache of life', priority: 'emergency', snnoop: 'S' },
  // Systemic
  { id: 'feverNeckStiff', text: 'Fever, neck stiffness, or rash', priority: 'emergency', snnoop: 'S' },
  { id: 'weightLoss', text: 'Unexplained weight loss', priority: 'warning', snnoop: 'S' },
  { id: 'cancerHistory', text: 'History of cancer with new headache', priority: 'warning', snnoop: 'N' },
  { id: 'immunosuppression', text: 'Immunocompromised (HIV, transplant, steroids)', priority: 'warning', snnoop: 'N' },
  // Neurological
  { id: 'neurologicalDeficit', text: 'New focal neurological deficit (weakness, numbness, speech, vision)', priority: 'emergency', snnoop: 'N' },
  { id: 'alteredConsciousness', text: 'Altered consciousness, confusion, or seizure', priority: 'emergency', snnoop: 'O' },
  { id: 'cognitiveChange', text: 'Cognitive decline or personality change', priority: 'warning', snnoop: 'O' },
  { id: 'gaitDisturbance', text: 'Difficulty walking or balance problems', priority: 'warning', snnoop: 'O' },
  // Onset
  { id: 'newAfter50', text: 'First or new type of headache after age 50', priority: 'warning', snnoop: 'O' },
  { id: 'rapidOnset', text: 'Rapidly increasing headache frequency or severity', priority: 'warning', snnoop: 'O' },
  // Progression
  { id: 'progressiveWorsening', text: 'Progressively worsening headache over weeks', priority: 'warning', snnoop: 'P' },
  { id: 'postural', text: 'Headache that changes with posture (worse upright, better lying)', priority: 'warning', snnoop: 'P' },
  // Precipitated
  { id: 'valsalva', text: 'Headache triggered by coughing, straining, or bending', priority: 'warning', snnoop: 'P' },
  // Associated
  { id: 'pregnantPostpartum', text: 'New headache during pregnancy or postpartum', priority: 'warning', snnoop: '10' },
  { id: 'papilledema', text: 'Papilledema (swollen optic nerve) seen on exam', priority: 'warning', snnoop: '10' },
  { id: 'previousHeadache', text: 'Previous headache but recent change in pattern', priority: 'warning', snnoop: '10' },
  { id: 'jawClaudication', text: 'Jaw claudication (pain chewing) or scalp tenderness', priority: 'warning', snnoop: '10' },
  { id: 'vascularRisk', text: 'Multiple vascular risk factors (HTN, DM, smoking, etc.)', priority: 'warning', snnoop: '10' },
];

// ──────────────────────────────────────────────
// QUESTION BANK — all possible questions
// ──────────────────────────────────────────────

export const ALL_QUESTIONS = (() => {
  const map = new Map();
  const allDiagnoses = [...primaryHeadaches, ...secondaryHeadaches, ...cranialNeuralgias];
  for (const dx of allDiagnoses) {
    if (dx.questions) {
      for (const q of dx.questions) {
        if (!map.has(q.key)) {
          map.set(q.key, q);
        }
      }
    }
  }
  return Array.from(map.values());
})();

// ──────────────────────────────────────────────
// EXPORT — all diagnoses as a flat array
// ──────────────────────────────────────────────

export const ALL_DIAGNOSES = [
  ...primaryHeadaches,
  ...secondaryHeadaches,
  ...cranialNeuralgias,
];

// Convenience lookups
export const DIAGNOSIS_MAP = Object.fromEntries(
  ALL_DIAGNOSES.map(d => [d.id, d])
);

export const EMERGENCY_DIAGNOSES = ALL_DIAGNOSES.filter(d => d.isEmergency);

// Grouped by category for UI
export const HEADACHE_CATEGORIES = {
  primary: {
    id: 'primary',
    name: 'Primary Headaches',
    description: 'Headaches that are the disorder itself, not caused by another condition',
    subtypes: primaryHeadaches,
  },
  secondary: {
    id: 'secondary',
    name: 'Secondary Headaches',
    description: 'Headaches caused by an underlying medical condition',
    subtypes: secondaryHeadaches,
  },
  cranial: {
    id: 'cranial',
    name: 'Cranial Neuralgias & Facial Pain',
    description: 'Painful cranial neuropathies and other facial pains',
    subtypes: cranialNeuralgias,
  },
};

// Re-export individual groups for backward compat
export { primaryHeadaches, secondaryHeadaches, cranialNeuralgias };

// ──────────────────────────────────────────────
// DATA ENUMS (shared)
// ──────────────────────────────────────────────

export const PAIN_LOCATIONS = [
  { id: 'unilateral-temporal', name: 'One side — temple' },
  { id: 'unilateral-frontal', name: 'One side — forehead' },
  { id: 'unilateral-ocular', name: 'Around one eye' },
  { id: 'unilateral-occipital', name: 'One side — back of head' },
  { id: 'bilateral-temporal', name: 'Both temples' },
  { id: 'bilateral-frontal', name: 'Forehead (both sides)' },
  { id: 'bilateral-occipital', name: 'Back of head (both sides)' },
  { id: 'vertex', name: 'Top of head' },
  { id: 'diffuse', name: 'Throughout head' },
  { id: 'neck', name: 'Neck pain' },
];

export const PAIN_QUALITIES = [
  { id: 'pulsating', name: 'Pulsating/Throbbing' },
  { id: 'pressing', name: 'Pressing/Tightening' },
  { id: 'stabbing', name: 'Sharp/Stabbing' },
  { id: 'burning', name: 'Burning' },
  { id: 'aching', name: 'Dull/Aching' },
  { id: 'electric', name: 'Electric shock-like' },
  { id: 'boring', name: 'Boring/Drilling' },
  { id: 'pressure', name: 'Pressure/Squeezing' },
];

export const ASSOCIATED_SYMPTOMS = [
  { id: 'nausea', name: 'Nausea', category: 'gi' },
  { id: 'vomiting', name: 'Vomiting', category: 'gi' },
  { id: 'photophobia', name: 'Light sensitivity (Photophobia)', category: 'sensory' },
  { id: 'phonophobia', name: 'Sound sensitivity (Phonophobia)', category: 'sensory' },
  { id: 'osmophobia', name: 'Smell sensitivity', category: 'sensory' },
  { id: 'vertigo', name: 'Dizziness/Vertigo', category: 'neurologic' },
  { id: 'allodynia', name: 'Scalp tenderness (pain from gentle touch)', category: 'sensory' },
  { id: 'visualDisturbance', name: 'Visual disturbance', category: 'aura' },
  { id: 'sensoryChanges', name: 'Tingling/Numbness', category: 'aura' },
  { id: 'speechDifficulty', name: 'Speech difficulty', category: 'aura' },
  { id: 'weakness', name: 'Weakness', category: 'aura' },
  // Autonomic
  { id: 'lacrimation', name: 'Eye watering', category: 'autonomic' },
  { id: 'conjunctivalInjection', name: 'Red eye', category: 'autonomic' },
  { id: 'nasalCongestion', name: 'Nasal congestion', category: 'autonomic' },
  { id: 'rhinorrhea', name: 'Runny nose', category: 'autonomic' },
  { id: 'ptosis', name: 'Drooping eyelid', category: 'autonomic' },
  { id: 'facialSweating', name: 'Facial sweating', category: 'autonomic' },
  { id: 'miosis', name: 'Small pupil', category: 'autonomic' },
  { id: 'restlessness', name: 'Restlessness/Agitation', category: 'autonomic' },
];

export const DURATION_OPTIONS = [
  { id: 'seconds', name: 'Seconds' },
  { id: 'minutes-15', name: 'Less than 15 minutes' },
  { id: 'minutes-30', name: '15–30 minutes' },
  { id: 'minutes-60', name: '30–60 minutes (1 hr)' },
  { id: 'hours-2', name: '1–2 hours' },
  { id: 'hours-4', name: '2–4 hours' },
  { id: 'hours-12', name: '4–12 hours' },
  { id: 'hours-24', name: '12–24 hours' },
  { id: 'hours-72', name: '24–72 hours (1–3 days)' },
  { id: 'days-7', name: '3–7 days' },
  { id: 'week-plus', name: 'More than 7 days' },
  { id: 'continuous', name: 'Continuous (always present)' },
];

export const FREQUENCY_OPTIONS = [
  { id: 'rarely', name: 'Rarely (once a month or less)', value: 1 },
  { id: 'few-month', name: 'A few times per month', value: 3 },
  { id: 'weekly', name: 'Weekly', value: 4 },
  { id: 'few-week', name: 'Several times per week', value: 6 },
  { id: 'daily', name: 'Daily', value: 15 },
  { id: 'multiple-daily', name: 'Multiple times daily', value: 30 },
  { id: 'continuous', name: 'Constant (always present)', value: 30 },
];

export const INTENSITY_SCALE = [
  { value: 1, label: 'Mild', description: 'Noticeable but doesn\'t interfere' },
  { value: 2, label: 'Moderate', description: 'Interferes but can continue' },
  { value: 3, label: 'Severe', description: 'Cannot continue routine activity' },
  { value: 4, label: 'Very Severe', description: 'Must lie down, can barely function' },
  { value: 5, label: 'Maximum', description: 'Requires complete rest' },
];
