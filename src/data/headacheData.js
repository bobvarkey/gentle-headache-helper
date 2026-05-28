/**
 * ICHD-3 Headache Classification Data
 * Based on International Classification of Headache Disorders, 3rd Edition
 */

export const HEADACHE_CATEGORIES = {
  primary: {
    id: 'primary',
    name: 'Primary Headaches',
    description: 'Headaches that are not caused by an underlying medical condition',
    subtypes: [
      {
        id: 'migraine',
        name: 'Migraine',
        code: '1',
        description: 'Recurrent headache disorder manifesting as attacks lasting 4-72 hours',
        ichtCode: '1.',
        criteria: {
         A: { text: 'At least 5 attacks fulfilling criteria B-D', required: true },
          B: { text: 'Headache attacks lasting 4-72 hours (untreated or unsuccessfully treated)', required: true },
          C: { text: 'At least two of: unilateral location, pulsating quality, moderate pain intensity, aggravation by routine physical activity', required: true, matches: 2 },
          D: { text: 'At least one of: nausea and/or vomiting, photophobia and phonophobia', required: true }
        },
        variants: [
          {
            id: 'migraine-with-aura',
            name: 'Migraine with Aura',
            code: '1.2',
            additionalQuestions: [
              { id: 'aura-visual', text: 'Did you experience visual disturbances before the headache? (zigzag lines, blind spots, flashes)', type: 'boolean' },
              { id: 'aura-sensory', text: 'Did you experience tingling or numbness?', type: 'boolean' },
              { id: 'aura-motor', text: 'Did you experience any weakness or difficulty moving?', type: 'boolean' },
              { id: 'aura-duration', text: 'How long did the aura symptoms last?', options: ['5-60 minutes', '>60 minutes'] }
            ]
          },
          {
            id: 'chronic-migraine',
            name: 'Chronic Migraine',
            code: '1.3',
            description: 'Headache occurring ≥15 days/month for >3 months'
          }
        ]
      },
      {
        id: 'tth',
        name: 'Tension-Type Headache (TTH)',
        code: '2',
        description: 'Bilateral pressing/tightening quality, mild to moderate intensity',
        criteria: {
          A: { text: 'At least 10 episodes fulfilling criteria B-D', required: true },
          B: { text: 'Headache lasting 30 minutes to 7 days', required: true },
          C: { text: 'At least two of: bilateral location, pressing/tightening quality, mild or moderate intensity, not aggravated by routine physical activity', required: true, matches: 2 },
          D: { text: 'No nausea or vomiting (photophobia or phonophobia may be present)', required: false }
        },
        variants: [
          { id: 'episodic-tt', name: 'Episodic TTH', code: '2.1' },
          { id: 'chronic-tt', name: 'Chronic TTH', code: '2.3', description: '≥15 days/month for >3 months' }
        ]
      },
      {
        id: 'tac',
        name: 'Trigeminal Autonomic Cephalalgias (TACs)',
        code: '3',
        description: 'Unilateral headache with prominent autonomic symptoms',
        subtypes: [
          {
            id: 'cluster-headache',
            name: 'Cluster Headache',
            code: '3.1',
            criteria: {
              A: { text: 'At least 5 attacks fulfilling criteria B-D', required: true },
              B: { text: 'Severe or very severe unilateral orbital, supraorbital and/or temporal pain lasting 15-180 minutes', required: true },
              C: { text: 'Either or both of: conjunctival injection and/or lacrimation, nasal congestion and/or rhinorrhea, eyelid edema, forehead and facial sweating, miosis and/or ptosis', required: true },
              D: { text: 'Attacks occur daily to multiple daily, periods lasting weeks to months', required: true }
            },
            variants: [
              { id: 'episodic-cluster', name: 'Episodic Cluster Headache', code: '3.1.1' },
              { id: 'chronic-cluster', name: 'Chronic Cluster Headache', code: '3.1.2' }
            ]
          },
          {
            id: 'paroxysmal-hemicrania',
            name: 'Paroxysmal Hemicrania',
            code: '3.2',
            criteria: {
              A: { text: 'At least 20 attacks fulfilling criteria B-E', required: true },
              B: { text: 'Severe unilateral orbital, supraorbital and/or temporal pain lasting 2-30 minutes', required: true },
              C: { text: 'At least one of: conjunctival injection and/or lacrimation, nasal congestion and/or rhinorrhea, forehead and facial sweating, miosis and/or ptosis', required: true },
              D: { text: 'Attacks occur >5 times daily', required: true },
              E: { text: 'Attacks completely abolished by indomethacin', required: true }
            }
          },
          {
            id: 'hemicrania-continua',
            name: 'Hemicrania Continua',
            code: '3.4',
            description: 'Continuous unilateral headache responsive to indomethacin'
          }
        ]
      },
      {
        id: 'medication-overuse',
        name: 'Medication-Overuse Headache',
        code: '8.2',
        description: 'Headache developing from regular overuse of acute medication',
        triggers: ['Simple analgesics', 'Opioids', 'Triptans', 'Ergotamines', 'Combination analgesics'],
        criteria: {
          A: { text: ' headache present on ≥15 days/month', required: true },
          B: { text: 'Regular overuse of one or more drugs for acute treatment for >3 months', required: true },
          C: { text: 'Development or worsening of headache during medication overuse', required: true }
        }
      }
    ]
  },
  secondary: {
    id: 'secondary',
    name: 'Secondary Headaches',
    description: 'Headaches caused by an underlying medical condition',
    subtypes: [
      {
        id: 'trauma',
        name: 'Headache Attributed to Trauma',
        code: '5',
        description: 'Headache following head/neck injury',
        acute: '5.1', chronic: '5.2'
      },
      {
        id: 'vascular',
        name: 'Headache Attributed to Vascular Disorder',
        code: '6',
        description: 'Headache due to stroke, TIA, hemorrhage, or vascular malformation',
        subtypes: ['Ischemic stroke', 'Intracranial hemorrhage', 'Temporal arteritis', 'Venous thrombosis']
      },
      {
        id: 'intracranial',
        name: 'Headache Attributed to Non-vascular Intracranial Disorder',
        code: '7',
        description: 'Due to increased ICP, low ICP, intracranial infection, etc.',
        subtypes: ['Idiopathic intracranial hypertension', 'CSF leak', 'Meningitis', 'Brain tumor']
      },
      {
        id: 'substance',
        name: 'Headache Attributed to Substance',
        code: '8',
        description: ' Medication-induced or substance withdrawal',
        subtypes: ['Medication-overuse headache', 'Carbon monoxide', 'Alcohol hangover']
      },
      {
        id: 'infection',
        name: 'Headache Attributed to Infection',
        code: '9',
        description: 'Systemic or intracranial infection',
        subtypes: ['Meningitis', 'Encephalitis', 'Systemic infection', 'COVID-19 related']
      }
    ]
  },
  cranial: {
    id: 'cranial',
    name: 'Cranial Neuralgias',
    description: 'Painful cranial neuropathies and facial pains',
    subtypes: [
      {
        id: 'trigeminal-neuralgia',
        name: 'Trigeminal Neuralgia',
        code: '13.1',
        description: 'Brief electric shock-like pains in trigeminal distribution',
        criteria: {
          A: { text: 'Paroxysmal attacks of pain lasting from fraction of second to 2 minutes', required: true },
          B: { text: 'Pain has at least one of: triggered from trigger zones, characteristic quality', required: true },
          C: { text: 'Attacks are not better accounted for by another ICHD-3 diagnosis', required: true }
        }
      },
      {
        id: 'glossopharyngeal',
        name: 'Glossopharyngeal Neuralgia',
        code: '13.2',
        description: 'Pain in the tonsillar region/angle of mandible'
      },
      {
        id: 'occipital-neuralgia',
        name: 'Occipital Neuralgia',
        code: '13.3',
        description: 'Pain along greater occipital nerve distribution'
      }
    ]
  }
};

// Red flags requiring immediate medical attention
export const RED_FLAGS = [
  {
    id: 'sudden-severe',
    text: 'Sudden severe "thunderclap" headache',
    priority: 'emergency',
    description: 'Could indicate subarachnoid hemorrhage'
  },
  {
    id: 'fever-neck-stiff',
    text: 'Fever, neck stiffness, or rash',
    priority: 'emergency',
    description: 'Could indicate meningitis'
  },
  {
    id: 'new-after-50',
    text: 'First headache after age 50',
    priority: 'warning',
    description: 'Requires further investigation'
  },
  {
    id: 'neurological-deficit',
    text: 'New neurological symptoms (weakness, speech difficulty)',
    priority: 'emergency',
    description: 'Could indicate stroke'
  },
  {
    id: 'altered-consciousness',
    text: 'Altered consciousness or confusion',
    priority: 'emergency',
    description: 'Requires immediate evaluation'
  },
  {
    id: 'cognitive-change',
    text: 'Cognitive changes or memory problems',
    priority: 'warning',
    description: 'Requires further investigation'
  },
  {
    id: 'weight-loss',
    text: 'Unexplained weight loss',
    priority: 'warning',
    description: 'Requires further investigation'
  },
  {
    id: 'cancer-history',
    text: 'History of cancer with new headache',
    priority: 'warning',
    description: 'Requires metastasis workup'
  },
  {
    id: 'pregnant-postpartum',
    text: 'New headache during pregnancy or postpartum',
    priority: 'warning',
    description: 'Requires careful evaluation'
  }
];

// Common headache locations
export const PAIN_LOCATIONS = [
  { id: 'unilateral-temporal', name: 'One side (temple)' },
  { id: 'unilateral-frontal', name: 'One side (forehead)' },
  { id: 'unilateral-ocular', name: 'One eye' },
  { id: 'unilateral-occipital', name: 'One side (back of head)' },
  { id: 'bilateral-temporal', name: 'Both temples' },
  { id: 'bilateral-frontal', name: 'Forehead' },
  { id: 'bilateral-occipital', name: 'Back of head' },
  { id: 'vertex', name: 'Top of head' },
  { id: 'diffuse', name: 'Throughout head' },
  { id: 'neck', name: 'Neck pain' }
];

// Pain quality descriptors
export const PAIN_QUALITIES = [
  { id: 'pulsating', name: 'Pulsating/Throbbing', category: 'vascular' },
  { id: 'pressing', name: 'Pressing/Tightening', category: 'tension' },
  { id: 'stabbing', name: 'Sharp/Stabbing', category: 'neuralgic' },
  { id: 'burning', name: 'Burning', category: 'neuropathic' },
  { id: 'aching', name: 'Dull/Aching', category: 'tension' },
  { id: 'electric', name: 'Electric shock-like', category: 'neuralgic' },
  { id: 'pressure', name: 'Pressure/Squeezing', category: 'tension' }
];

// Associated symptoms
export const ASSOCIATED_SYMPTOMS = [
  { id: 'nausea', name: 'Nausea', category: 'gi' },
  { id: 'vomiting', name: 'Vomiting', category: 'gi' },
  { id: 'photophobia', name: 'Sensitivity to light (Photophobia)', category: 'sensory' },
  { id: 'phonophobia', name: 'Sensitivity to sound (Phonophobia)', category: 'sensory' },
  { id: 'osmophobia', name: 'Sensitivity to odors', category: 'sensory' },
  { id: 'allodynia', name: 'Skin pain from gentle touch (Allodynia)', category: 'sensory' },
  { id: 'vertigo', name: 'Dizziness/Vertigo', category: 'neurologic' },
  { id: 'visual-disturbance', name: 'Visual disturbance', category: 'aura' },
  { id: 'sensory-changes', name: 'Tingling/Numbness', category: 'aura' },
  { id: 'speech-difficulty', name: 'Speech difficulty', category: 'aura' },
  { id: 'weakness', name: 'Weakness', category: 'aura' },
  // Autonomic
  { id: 'lacrimation', name: 'Eye watering', category: 'autonomic' },
  { id: 'conjunctival-injection', name: 'Red eye', category: 'autonomic' },
  { id: 'nasal-congestion', name: 'Nasal congestion', category: 'autonomic' },
  { id: 'rhinorrhea', name: 'Runny nose', category: 'autonomic' },
  { id: 'ptosis', name: 'Drooping eyelid', category: 'autonomic' },
  { id: 'sweating', name: 'Facial sweating', category: 'autonomic' },
  { id: 'miosis', name: 'Small pupil', category: 'autonomic' }
];

// Duration options adapted from ICHD-3
export const DURATION_OPTIONS = [
  { id: 'minutes-15', name: 'Less than 15 minutes', max: 15 },
  { id: 'minutes-30', name: '15-30 minutes', max: 30 },
  { id: 'minutes-60', name: '30-60 minutes (1 hour)', max: 60 },
  { id: 'hours-2', name: '1-2 hours', max: 120 },
  { id: 'hours-4', name: '2-4 hours', max: 240 },
  { id: 'hours-12', name: '4-12 hours', max: 720 },
  { id: 'hours-24', name: '12-24 hours', max: 1440 },
  { id: 'hours-72', name: '24-72 hours (1-3 days)', max: 4320 },
  { id: 'days-7', name: '3-7 days', max: 10080 },
  { id: 'week-plus', name: 'More than 7 days', max: null }
];

// Frequency options
export const FREQUENCY_OPTIONS = [
  { id: 'rarely', name: 'Rarely (once a month or less)', value: 1 },
  { id: 'few-month', name: 'A few times per month', value: 3 },
  { id: 'weekly', name: 'Weekly', value: 4 },
  { id: 'few-week', name: 'Several times per week', value: 6 },
  { id: 'daily', name: 'Daily', value: 15 },
  { id: 'multiple-daily', name: 'Multiple times daily', value: 30 },
  { id: 'continuous', name: 'Constant/Daily', value: 30 }
];

// Intensity scale
export const INTENSITY_SCALE = [
  { value: 1, label: 'Mild', description: 'Noticeable but not interfering' },
  { value: 2, label: 'Moderate', description: 'Somewhat interfering' },
  { value: 3, label: 'Severe', description: 'Interfering with activity' },
  { value: 4, label: 'Very Severe', description: 'Cannot do any activity' },
  { value: 5, label: 'Maximum', description: 'Requires rest/bed rest' }
];