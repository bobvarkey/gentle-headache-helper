/**
 * ICHD-3 Full Diagnostic Criteria Database
 * Based on International Classification of Headache Disorders, 3rd Edition (ICHD-3)
 * 
 * Structure: Each headache type has:
 *   - code: ICHD-3 code
 *   - name: Full name
 *   - category: Top-level category
 *   - criteria: Lettered criteria (A, B, C, D, E...)
 *   - notes: Clinical pearls
 *   - distinguishing: Features that differentiate from similar types
 *   - redFlags: Warning signs requiring urgent evaluation
 */

export const ICHD3_CRITERIA = {
  // ============================================
  // PART I: PRIMARY HEADACHES
  // ============================================
  
  // ─── CHAPTER 1: MIGRAINE ───
  
  "1.1": {
    code: "1.1",
    name: "Migraine without Aura",
    category: "Primary — Migraine",
    prevalence: "~12% of population",
    genderRatio: "F > M (3:1)",
    criteria: {
      A: "At least 5 attacks fulfilling criteria B–D",
      B: "Headache attacks lasting 4–72 hours (untreated or unsuccessfully treated)",
      C: "Headache has at least TWO of the following four characteristics:\n  1. Unilateral location\n  2. Pulsating quality\n  3. Moderate or severe pain intensity\n  4. Aggravation by or causing avoidance of routine physical activity (e.g., walking or climbing stairs)",
      D: "During headache, at least ONE of the following:\n  1. Nausea and/or vomiting\n  2. Photophobia AND phonophobia"
    },
    notes: [
      "In children, attacks may be 2–72 hours",
      "Not better accounted for by another ICHD-3 diagnosis",
      "If patient falls asleep during migraine and wakes without it, duration is until awakening"
    ],
    distinguishing: {
      "vs TTH": "Migraine: unilateral, pulsating, nausea/vomiting, photophobia+phonophobia, worse with activity. TTH: bilateral, pressing, no nausea, not aggravated by activity.",
      "vs Cluster": "Migraine: 4–72 hr, gradual build, patient prefers rest in dark room. Cluster: 15–180 min, excruciating, restless/agitated, autonomic signs.",
      "vs MOH": "MOH requires >15 days/month medication overuse. If overuse present, diagnose MOH + probable migraine."
    },
    redFlags: ["Thunderclap onset", "New neurological deficit", "Fever with neck stiffness"]
  },
  
  "1.2": {
    code: "1.2",
    name: "Migraine with Aura",
    category: "Primary — Migraine",
    prevalence: "~1/3 of migraineurs",
    criteria: {
      A: "At least 2 attacks fulfilling criteria B and C",
      B: "One or more of the following fully reversible aura symptoms:\n  1. Visual\n  2. Sensory\n  3. Speech and/or language (each may be positive and/or negative)\n  4. Motor (hemiplegic migraine)\n  5. Brainstem\n  6. Retinal",
      C: "At least TWO of the following four characteristics:\n  1. At least one aura symptom spreads gradually over ≥5 minutes\n  2. Each individual aura symptom lasts 5–60 minutes\n  3. At least one aura symptom is unilateral\n  4. Aura is accompanied, or followed within 60 minutes, by headache"
    },
    subtypes: {
      "1.2.1": "Typical aura with headache",
      "1.2.2": "Typical aura without headache (acephalgic)",
      "1.2.3": "Typical aura with non-migraine headache",
      "1.2.4": "Familial hemiplegic migraine (FHM)",
      "1.2.5": "Sporadic hemiplegic migraine",
      "1.2.6": "Basilar-type aura"
    },
    notes: [
      "Most common aura = visual (90%): scintillations, fortification spectra, scotoma",
      "Sensory aura: cheiro-oral distribution typical (hand → face)",
      "Motor aura = weakness; speech aura = aphasia (not just difficulty speaking)",
      "Aura symptoms develop over ≥5 min; if <5 min, suspect thromboembolic TIA"
    ],
    distinguishing: {
      "vs TIA/stroke": "Aura symptoms spread gradually (>5 min), positive phenomena (scintillations, tingling), fully reversible. TIA: abrupt onset, negative phenomena (vision loss, numbness), focal deficits persist.",
      "vs epilepsy": "Migraine aura: longer duration (5–60 min), visual spread, headache follows. Epilepsy aura: brief seconds, stereotyped, abrupt termination.",
      "vs occipital lobe seizure": "Visual migraine aura = colored lights/scintillations spreading. Occipital seizure = colored circles in one hemifield, rapid onset, eye deviation."
    },
    redFlags: ["Aura >60 min or persistent", "First aura after age 50", "Aura without headache in older patient (vascular workup needed)"]
  },
  
  "1.3": {
    code: "1.3",
    name: "Chronic Migraine",
    category: "Primary — Migraine",
    prevalence: "1–2% of population",
    criteria: {
      A: "Headache (tension-type-like and/or migraine-like) on ≥15 days/month for >3 months",
      B: "On ≥8 days/month for >3 months, fulfilling criteria for migraine without aura and/or response to triptan or ergot",
      C: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Often evolves from episodic migraine; risk factors: obesity, depression, snoring, caffeine overuse, frequent acute medication use",
      "Medication overuse complicates ~50% of cases",
      "Preventive treatment is essential; CGRP monoclonal antibodies highly effective",
      "If medication overuse present, diagnose both chronic migraine AND 8.2 Medication-Overuse Headache"
    ],
    distinguishing: {
      "vs chronic TTH": "Chronic migraine: ≥8 days with migraine features or triptan response. Chronic TTH: no migraine features, no triptan response.",
      "vs NDPH": "Chronic migraine: clear evolution from episodic. NDPH: abrupt onset with distinct remembered onset day, unremitting from onset."
    },
    redFlags: ["New daily persistent headache with red flags", "Papilledema (raised ICP)", "Sudden onset after age 50"]
  },
  
  "1.4": {
    code: "1.4",
    name: "Migraine with Brainstem Aura (Basilar-type Migraine)",
    category: "Primary — Migraine",
    criteria: {
      A: "At least 2 attacks fulfilling criteria B–D",
      B: "Aura symptoms fully reversible, originating from brainstem and/or both cerebral hemispheres simultaneously, WITHOUT motor or retinal symptoms",
      C: "At least TWO of the following fully reversible aura symptoms:\n  1. Dysarthria\n  2. Vertigo\n  3. Tinnitus\n  4. Hypacusis\n  5. Diplopia\n  6. Ataxia\n  7. Decreased level of consciousness",
      D: "At least ONE of the following:\n  1. At least one aura symptom spreads gradually over ≥5 minutes\n  2. Each aura symptom lasts 5–60 minutes\n  3. At least one aura symptom is unilateral",
      E: "Headache fulfilling criteria for 1.1 Migraine without aura begins during the aura or follows aura within 60 minutes"
    },
    notes: [
      "Formerly called 'basilar artery migraine' — renamed because vascular theory unproven",
      "Most common in young women; may have dramatic presentation with syncope",
      "Must exclude posterior circulation TIA, especially first presentation after age 50",
      "Triptans contraindicated by some authorities during aura; others use cautiously"
    ],
    distinguishing: {
      "vs posterior circulation TIA": "Brainstem aura: gradual onset, younger patient, positive symptoms (vertigo, diplopia), headache follows. TIA: abrupt, negative symptoms, no headache, older/vascular risk factors.",
      "vs vestibular migraine": "Brainstem aura: multiple brainstem symptoms, fully reversible 5–60 min. Vestibular migraine: episodic vertigo as primary symptom, with migraine features during vertigo attacks."
    },
    redFlags: ["First episode after age 50", "Persistent deficits", "Vascular risk factors"]
  },
  
  "1.5": {
    code: "1.5",
    name: "Vestibular Migraine",
    category: "Primary — Migraine (Appendix)",
    criteria: {
      A: "At least 5 episodes with vestibular symptoms of moderate or severe intensity, lasting 5 minutes to 72 hours",
      B: "Current or previous history of migraine without aura or with aura",
      C: "One or more migraine features with ≥50% of vestibular episodes:\n  1. Headache with at least TWO: unilateral, pulsating, moderate-severe, aggravation by activity\n  2. Photophobia and phonophobia\n  3. Visual aura",
      D: "Not better accounted for by another vestibular or ICHD diagnosis"
    },
    notes: [
      "In Appendix of ICHD-3 (awaiting further research)",
      "Vestibular symptoms: spontaneous vertigo, positional vertigo, visually-induced vertigo, head motion-induced vertigo",
      "Duration highly variable: 5 min to 72 hr; may have prolonged dizziness between attacks",
      "Often missed; ~9% of migraineurs have vestibular symptoms"
    ],
    distinguishing: {
      "vs Ménière disease": "Vestibular migraine: no hearing loss, migraine features, normal audiometry. Ménière: fluctuating hearing loss, tinnitus, aural fullness, confirmed on audiometry.",
      "vs BPPV": "Vestibular migraine: multiple types of vertigo, migraine history, longer episodes. BPPV: positional only, brief (<1 min), characteristic nystagmus, no migraine history.",
      "vs PPPD": "Vestibular migraine: episodic attacks with clear migraine link. PPPD: chronic non-episodic dizziness (>3 months), triggered by motion/visual stimuli."
    },
    redFlags: ["New hearing loss", "Continuous vertigo >72 hr", "Focal neurological signs outside migraine aura"]
  },
  
  "1.6": {
    code: "1.6",
    name: "Abdominal Migraine",
    category: "Primary — Migraine",
    criteria: {
      A: "At least 5 attacks of abdominal pain, fulfilling criteria B–D",
      B: "Pain has ALL of the following characteristics:\n  1. Midline location, periumbilical or poorly localized\n  2. Dull or 'just sore' quality\n  3. Moderate or severe intensity",
      C: "During attacks, at least TWO of the following:\n  1. Anorexia\n  2. Nausea\n  3. Vomiting\n  4. Pallor",
      D: "Not attributed to another disorder (especially GI workup normal)"
    },
    notes: [
      "Almost exclusively in children; median age 7 years",
      "Family history of migraine typical",
      "~70% evolve into migraine with headache in adolescence",
      "Must exclude peptic disease, gallbladder, IBD, celiac, ureteric colic"
    ],
    distinguishing: {
      "vs Cyclical Vomiting Syndrome": "Abdominal migraine: pain predominant, less vomiting. CVS: vomiting predominant, no pain between episodes, both are migraine spectrum disorders.",
      "vs functional dyspepsia": "Abdominal migraine: episodic, severe, paroxysmal, family migraine history. Functional: chronic, meal-related, no paroxysmal pattern."
    },
    redFlags: ["Abnormal GI workup", "Weight loss", "GI bleeding", "Abnormal growth velocity"]
  },
  
  // ─── CHAPTER 2: TENSION-TYPE HEADACHE ───
  
  "2.1": {
    code: "2.1",
    name: "Infrequent Episodic Tension-Type Headache",
    category: "Primary — Tension-Type",
    prevalence: "~40% of population (all TTH)",
    criteria: {
      A: "At least 10 episodes of headache occurring on <1 day/month on average (<12 days/year)",
      B: "Headache lasting 30 minutes to 7 days",
      C: "At least TWO of the following characteristics:\n  1. Bilateral location\n  2. Pressing or tightening (non-pulsating) quality\n  3. Mild or moderate intensity\n  4. Not aggravated by routine physical activity (e.g., walking or climbing stairs)",
      D: "BOTH of the following:\n  1. No nausea or vomiting\n  2. No more than ONE of photophobia or phonophobia",
      E: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Most common primary headache disorder",
      "Often self-treated with OTC analgesics; under-reported in clinical settings",
      "Psychological factors (stress, anxiety, depression) strongly associated",
      "Pericranial muscle tenderness common but not required for diagnosis"
    ],
    distinguishing: {
      "vs Migraine": "TTH: bilateral, pressing, mild-moderate, no nausea, NOT worse with activity. Migraine: unilateral (often), pulsating, moderate-severe, nausea common, worse with activity.",
      "vs chronic TTH": "Infrequent episodic: <1 day/month. Chronic: ≥15 days/month for >3 months."
    },
    redFlags: ["Progressive frequency increase", "New onset after age 50", "Abnormal neurological exam"]
  },
  
  "2.2": {
    code: "2.2",
    name: "Frequent Episodic Tension-Type Headache",
    category: "Primary — Tension-Type",
    criteria: {
      A: "At least 10 episodes of headache occurring on 1–14 days/month on average for >3 months (≥12 and <180 days/year)",
      B: "Headache lasting 30 minutes to 7 days",
      C: "At least TWO of the following characteristics:\n  1. Bilateral location\n  2. Pressing or tightening (non-pulsating) quality\n  3. Mild or moderate intensity\n  4. Not aggravated by routine physical activity",
      D: "BOTH of the following:\n  1. No nausea or vomiting\n  2. No more than ONE of photophobia or phonophobia",
      E: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Risk factor for progression to chronic TTH and medication overuse headache",
      "Preventive treatment should be considered",
      "Amitriptyline 10–75 mg nightly is most evidence-based preventive",
      "Stress management and biofeedback effective"
    ],
    distinguishing: {
      "vs chronic TTH": "Frequent episodic: 1–14 days/month. Chronic: ≥15 days/month.",
      "vs migraine": "TTH: bilateral pressing, no nausea, mild-moderate. Migraine: unilateral pulsating, nausea common, moderate-severe, worse with activity."
    },
    redFlags: ["Escalating to ≥15 days/month (consider chronic TTH/MOH)", "New onset >50 years", "Changing character"]
  },
  
  "2.3": {
    code: "2.3",
    name: "Chronic Tension-Type Headache",
    category: "Primary — Tension-Type",
    prevalence: "2–3% of population",
    criteria: {
      A: "Headache occurring on ≥15 days/month on average for >3 months (≥180 days/year)",
      B: "Headache lasts hours to days, or may be continuous",
      C: "At least TWO of the following characteristics:\n  1. Bilateral location\n  2. Pressing or tightening (non-pulsating) quality\n  3. Mild or moderate intensity\n  4. Not aggravated by routine physical activity",
      D: "BOTH of the following:\n  1. No more than ONE of photophobia, phonophobia, or mild nausea\n  2. No moderate-severe nausea or vomiting",
      E: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Most common chronic headache disorder",
      "Often coexists with chronic migraine (mixed tension-migraine phenotype)",
      "Medication overuse complicates ~40% of cases",
      "Amitriptyline most evidence-based; mirtazapine and venlafaxine alternatives"
    ],
    distinguishing: {
      "vs chronic migraine": "Chronic TTH: pressing/bilateral, mild-moderate, no/mild nausea. Chronic migraine: ≥8 days with pulsating/unilateral, moderate-severe, nausea, photophobia+phonophobia.",
      "vs NDPH": "Chronic TTH: gradual evolution from episodic. NDPH: abrupt onset, clearly remembered onset day, unremitting from onset."
    },
    redFlags: ["New onset after age 50", "Papilledema", "Progressive worsening", "Medication overuse suspected"]
  },
  
  // ─── CHAPTER 3: TRIGEMINAL AUTONOMIC CEPHALALGIAS (TACs) ───
  
  "3.1": {
    code: "3.1",
    name: "Cluster Headache",
    category: "Primary — TAC",
    prevalence: "0.1% of population",
    genderRatio: "M > F (historically 4:1, now closer to 2:1)",
    criteria: {
      A: "At least 5 attacks fulfilling criteria B–D",
      B: "Severe or very severe unilateral orbital, supraorbital, and/or temporal pain lasting 15–180 minutes (when untreated)",
      C: "Either or both of the following:\n  1. At least ONE ipsilateral cranial autonomic symptom (see list below)\n  2. Sense of restlessness or agitation (or inability to remain still)",
      D: "Frequency: between every other day and 8 times/day",
      E: "Not better accounted for by another ICHD-3 diagnosis"
    },
    autonomicSymptoms: [
      "Conjunctival injection and/or lacrimation",
      "Nasal congestion and/or rhinorrhea",
      "Eyelid edema",
      "Forehead and facial sweating",
      "Forehead and facial flushing",
      "Sensation of fullness in the ear",
      "Miosis and/or ptosis"
    ],
    subtypes: {
      episodic: "At least 2 cluster periods lasting 7 days to 1 year, separated by pain-free remissions ≥1 month",
      chronic: "Cluster periods lasting >1 year without remission, or remissions <1 month"
    },
    notes: [
      "Called 'suicide headache' due to intensity; among the most severe pains known",
      "Patients are typically restless (pace, rock) during attack — opposite of migraine (prefers stillness, dark room)",
      "Strict chronobiology: attacks occur at same time daily, often wake patient from sleep 90 min after falling asleep (clock gene association)",
      "Alcohol triggers attacks during cluster period but not in remission (pathognomonic)",
      "Smoking strongly associated; cessation may reduce attacks"
    ],
    distinguishing: {
      "vs migraine": "Cluster: 15–180 min, unilateral orbital, EXCRUCIATING, autonomic signs, restless. Migraine: 4–72 hr, throbbing, nausea, photophobia, prefers stillness/darkness.",
      "vs paroxysmal hemicrania": "Cluster: 15–180 min, 1–8/day. PH: 2–30 min, >5/day, ABSOLUTELY responsive to indomethacin.",
      "vs SUNCT/SUNA": "Cluster: 15–180 min. SUNCT: 1–600 sec. Cluster has longer duration, less frequent attacks.",
      "vs trigeminal neuralgia": "Cluster: 15–180 min autonomic headache. TN: seconds, electric shock, triggerable, no autonomics."
    },
    redFlags: ["Abnormal neurological exam (suggests structural lesion)", "Atypical duration/location", "Age >50 with new onset (imaging required)"]
  },
  
  "3.2": {
    code: "3.2",
    name: "Paroxysmal Hemicrania",
    category: "Primary — TAC",
    prevalence: "Rare (~1/50,000)",
    genderRatio: "F > M (2–3:1)",
    criteria: {
      A: "At least 20 attacks fulfilling criteria B–D",
      B: "Severe unilateral orbital, supraorbital, or temporal pain lasting 2–30 minutes",
      C: "At least ONE of the following cranial autonomic symptoms ipsilateral to the pain:\n  1. Conjunctival injection and/or lacrimation\n  2. Nasal congestion and/or rhinorrhea\n  3. Eyelid edema\n  4. Forehead and facial sweating and/or flushing",
      D: "Frequency: >5 attacks/day",
      E: "Absolutely abolished by therapeutic doses of indomethacin",
      F: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Indomethacin responsiveness is DIAGNOSTIC (not just therapeutic)",
      "Dose: 150–225 mg/day (or 1–2 mg/kg/day in children); test for 2 weeks",
      "If indomethacin not tolerated, celecoxib or melatonin may help",
      "Two subtypes: episodic (remissions ≥1 month) and chronic (no remission >1 month)"
    ],
    distinguishing: {
      "vs cluster": "PH: 2–30 min, >5/day, indomethacin-responsive. Cluster: 15–180 min, 1–8/day, oxygen/triptan-responsive.",
      "vs SUNCT": "PH: 2–30 min, indomethacin-responsive. SUNCT: 1–600 sec, NOT indomethacin-responsive.",
      "vs hemicrania continua": "PH: discrete attacks 2–30 min. HC: continuous baseline pain with exacerbations."
    },
    redFlags: ["Failure to respond to indomethacin (reconsider diagnosis)", "New onset after age 50", "Changing side (rare but possible)"]
  },
  
  "3.3": {
    code: "3.3",
    name: "Short-lasting Unilateral Neuralgiform Headache Attacks (SUNCT/SUNA)",
    category: "Primary — TAC",
    prevalence: "Very rare",
    criteria: {
      A: "At least 20 attacks fulfilling criteria B–D",
      B: "Moderate or severe unilateral head pain in orbital, supraorbital, temporal, and/or other trigeminal distribution, with orbital, supraorbital, and/or temporal pain always present, lasting 1–600 seconds",
      C: "At least ONE of the following cranial autonomic symptoms ipsilateral to the pain:\n  1. Conjunctival injection and/or lacrimation\n  2. Nasal congestion and/or rhinorrhea\n  3. Eyelid edema\n  4. Forehead and facial sweating and/or flushing\n  5. Miosis and/or ptosis",
      D: "Frequency: ≥1 attack/day (typically many per day)",
      E: "Absolutely abolished by therapeutic doses of indomethacin (SUNCT: NOT responsive; SUNA: variable)",
      F: "Not better accounted for by another ICHD-3 diagnosis"
    },
    subtypes: {
      SUNCT: "With both conjunctival injection and tearing required (more restrictive, fewer cases)",
      SUNA: "With any cranial autonomic symptom (broader, more cases)"
    },
    notes: [
      "Attacks can be triggered by touching trigger zones (like trigeminal neuralgia) but have autonomic features (unlike TN)",
      "SUNCT NOT responsive to indomethacin; this distinguishes from PH and HC",
      "Preventive: lamotrigine (best evidence), gabapentin, topiramate",
      "Neuroimaging essential to exclude posterior fossa lesions (especially SUNCT)"
    ],
    distinguishing: {
      "vs trigeminal neuralgia": "SUNCT/SUNA: autonomic symptoms present, stabbing quality, multiple daily. TN: no autonomics, electric shock-like, triggerable, refractory periods.",
      "vs PH": "SUNCT: 1–600 sec, NOT indomethacin-responsive. PH: 2–30 min, indomethacin-responsive.",
      "vs cluster": "SUNCT: seconds, very frequent. Cluster: 15–180 min, less frequent, longer duration."
    },
    redFlags: ["Secondary SUNCT from pituitary tumor or posterior fossa lesion", "New onset after age 50", "Atypical features (longer attacks, no autonomics)"]
  },
  
  "3.4": {
    code: "3.4",
    name: "Hemicrania Continua",
    category: "Primary — TAC",
    prevalence: "Rare",
    genderRatio: "F > M (2:1)",
    criteria: {
      A: "Unilateral headache without side shift, fulfilling criteria B–D",
      B: "Present for >3 months with daily and continuous pain without pain-free periods",
      C: "At least ONE of the following cranial autonomic symptoms and/or restlessness or agitation during exacerbations:\n  1. Conjunctival injection and/or lacrimation\n  2. Nasal congestion and/or rhinorrhea\n  3. Eyelid edema\n  4. Forehead and facial sweating and/or flushing",
      D: "Absolutely abolished by therapeutic doses of indomethacin",
      E: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Indomethacin responsiveness is DIAGNOSTIC (like PH)",
      "Dose: 150–225 mg/day; test 2 weeks",
      "Two subtypes: continuous (remissions <1 day) and remitting (pain-free periods ≥1 day)",
      "Jabs and jolts (ice-pick pains) may occur in same area",
      "May coexist with migraine features during exacerbations"
    ],
    distinguishing: {
      "vs chronic migraine": "HC: strictly unilateral, continuous, indomethacin-responsive. Chronic migraine: may alternate sides, episodic migraine history, not indomethacin-responsive.",
      "vs chronic TTH": "HC: unilateral, autonomic features, indomethacin-responsive. TTH: bilateral, pressing, no autonomics, not indomethacin-responsive.",
      "vs NDPH": "HC: indomethacin-responsive, unilateral, autonomic. NDPH: bilateral or diffuse, not indomethacin-responsive, no autonomics."
    },
    redFlags: ["Side shift (atypical, consider secondary)", "Failure to respond to indomethacin (reconsider diagnosis)", "New onset after age 50 with structural imaging indicated"]
  },
  
  // ─── CHAPTER 4: OTHER PRIMARY HEADACHE DISORDERS ───
  
  "4.1": {
    code: "4.1",
    name: "Primary Cough Headache",
    category: "Primary — Other",
    prevalence: "Rare",
    criteria: {
      A: "At least 2 headaches fulfilling criteria B and C",
      B: "Brought on by and occurring only in association with coughing, straining, and/or Valsalva maneuver",
      C: "Sudden onset, lasting 1 second to 30 minutes",
      D: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "MUST exclude secondary causes before diagnosing primary (MRI required)",
      "Common secondary causes: Chiari malformation, CSF leak, middle cranial fossa tumor, sinus pathology",
      "Indomethacin 25–150 mg/day is treatment of choice",
      "Onset typically after age 40 (younger onset → more likely secondary)"
    ],
    distinguishing: {
      "vs secondary cough headache": "Primary: onset >40, normal neuro exam, normal MRI. Secondary: any age, may have neuro signs, MRI abnormal (Chiari, etc.).",
      "vs exertional headache": "Cough: triggered specifically by Valsalva/cough. Exertional: triggered by sustained physical exercise."
    },
    redFlags: ["Onset <40 years", "Any abnormal neurological finding", "Continuous headache between coughs"]
  },
  
  "4.2": {
    code: "4.2",
    name: "Primary Exercise Headache",
    category: "Primary — Other",
    criteria: {
      A: "At least 2 headaches fulfilling criteria B and C",
      B: "Brought on by and occurring only during or after strenuous physical exercise",
      C: "Bilateral, throbbing, lasting 5 minutes to 48 hours",
      D: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "More common in hot, high altitude, or humid conditions",
      "Can coexist with migraine (exercise may trigger migraine)",
      "Indomethacin prophylaxis (25–150 mg before exercise) effective",
      "Must exclude secondary causes (SAH, arterial dissection, pheochromocytoma)"
    ],
    distinguishing: {
      "vs secondary exertional headache": "Primary: normal neuro exam, normal imaging, consistent pattern. Secondary: first or worst headache, neuro signs, imaging may show SAH/dissection.",
      "vs cough headache": "Exertional: triggered by sustained exercise, bilateral, 5 min–48 hr. Cough: triggered by Valsalva, 1 sec–30 min."
    },
    redFlags: ["First or worst headache with exertion", "Focal neuro signs", "Duration >48 hours", "Age >40 with new onset"]
  },
  
  "4.3": {
    code: "4.3",
    name: "Primary Cold Stimulus Headache",
    category: "Primary — Other",
    criteria: {
      A: "At least 2 headaches fulfilling criteria B and C",
      B: "Brought on by and occurring only in association with external cold stimulus to the head (cold environment, cold water diving, cold stimulus over scalp)",
      C: "Resolves within 30 minutes after removal of cold stimulus",
      D: "Not better accounted for by another ICHD-3 diagnosis"
    },
    subtypes: {
      "4.3.1": "External application of cold stimulus (ice cream headache / brain freeze)",
      "4.3.2": "Headache upon immersion in cold water (diving headache)"
    },
    notes: [
      "'Ice cream headache' or 'brain freeze' — very common, brief, harmless",
      "Diving headache may be dangerous (cold shock response, aspiration risk)",
      "Prevalence higher in migraineurs",
      "Pressing tongue to roof of mouth may abort attack"
    ],
    distinguishing: {
      "vs secondary cold stimulus": "Primary: brief, reproducible with cold, no neuro signs. Secondary: consider sinus pathology, Chiari if atypical."
    },
    redFlags: ["Prolonged headache >30 min after cold removal", "Associated neuro deficits", "Sinus symptoms"]
  },
  
  "4.4": {
    code: "4.4",
    name: "Primary Stabbing Headache",
    category: "Primary — Other",
    criteria: {
      A: "Headache occurring as a single stab or a series of stabs fulfilling criterion B",
      B: "Exclusively or predominantly felt in the distribution of the first division of the trigeminal nerve (orbit, temple, parietal area)",
      C: "Stabs last for up to a few seconds and recur with irregular frequency ranging from one to many per day",
      D: "No cranial autonomic symptoms",
      E: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Also called 'ice-pick pains' or 'jabs and jolts'",
      "Very common (40% of population) but rarely bothersome enough to seek care",
      "Often associated with migraine, cluster, or HC (comorbid, not causal)",
      "Indomethacin may help if frequent; otherwise reassurance"
    ],
    distinguishing: {
      "vs SUNCT": "Stabbing headache: no autonomics, irregular frequency. SUNCT: autonomics present, very frequent, patterned attacks.",
      "vs trigeminal neuralgia": "Stabbing: orbit/temple, seconds, irregular. TN: V2/V3, triggerable, electric shock, refractory periods."
    },
    redFlags: ["New onset after age 50", "Persistent pain between stabs", "Associated neuro signs"]
  },
  
  "4.5": {
    code: "4.5",
    name: "Nummular Headache",
    category: "Primary — Other",
    criteria: {
      A: "Continuous or intermittent head pain fulfilling criterion B",
      B: "Felt exclusively in an area of the scalp with all of the following characteristics:\n  1. Sharply contoured (coin-shaped) area of fixed shape and size (1–6 cm diameter)\n  2. Round or elliptical shape",
      C: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Rare; pain localized to small, well-circumscribed area of scalp",
      "Fixed location for months to years",
      "Allodynia and hyperesthesia common in affected area",
      "May respond to local anesthetic block or botulinum toxin",
      "Consider bone lesions, metastases, shingles if atypical"
    ],
    distinguishing: {
      "vs localized secondary headache": "Nummular: fixed coin-shaped area, normal neuro exam, normal imaging. Secondary: may have palpable abnormality, imaging shows lesion."
    },
    redFlags: ["Changing size/shape", "Palpable skull lesion", "Skin changes", "New onset after age 50"]
  },
  
  "4.6": {
    code: "4.6",
    name: "Hypnic Headache",
    category: "Primary — Other",
    prevalence: "Rare; typically age >50",
    criteria: {
      A: "Recurrent headache attacks fulfilling criteria B–D",
      B: "Develop only during sleep, and causing wakening",
      C: "Occurring on ≥10 days per month for >3 months",
      D: "Lasting ≥15 minutes and up to 4 hours after waking",
      E: "No cranial autonomic symptoms or restlessness",
      F: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "'Alarm clock headache' — wakes patient from sleep at consistent time",
      "Almost exclusively in older adults (>50 years); mean age ~63",
      "Distinguishing feature: specifically sleep-related, no autonomic features",
      "Lithium carbonate (300–600 mg qHS) is treatment of choice",
      "Caffeine (cup of coffee before bed) paradoxically effective",
      "Melatonin, indomethacin, and topiramate alternatives"
    ],
    distinguishing: {
      "vs cluster": "Hypnic: sleep-only, older patient, no autonomics, 15 min–4 hr. Cluster: any time (though often nocturnal), autonomics present, 15–180 min, younger.",
      "vs migraine": "Hypnic: only during sleep, older, no nausea/photo/phonophobia. Migraine: any time, younger typical, associated symptoms.",
      "vs obstructive sleep apnea headache": "Hypnic: specific timing, no sleep apnea symptoms. OSA: morning headache, snoring, apneas, improves with CPAP."
    },
    redFlags: ["Onset <50 years (atypical, investigate secondary causes)", "Papilledema", "Focal neuro signs"]
  },
  
  "4.7": {
    code: "4.7",
    name: "New Daily Persistent Headache (NDPH)",
    category: "Primary — Other",
    prevalence: "0.03% of population",
    criteria: {
      A: "Persistent headache fulfilling criteria B and C",
      B: "Distinct and clearly remembered onset, with pain becoming continuous and unremitting within 24 hours",
      C: "Present for >3 months",
      D: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "KEY FEATURE: Patient remembers the EXACT day it started ('It was Tuesday morning...')",
      "Two forms: self-limiting (resolves without treatment over months) and refractory (persists for years)",
      "Often triggered by viral illness (EBV, COVID-19), minor trauma, or stressful event",
      "May mimic TTH or migraine phenotype; distinguish by abrupt onset history",
      "Workup essential to exclude secondary causes (venous sinus thrombosis, CSF leak, post-infectious)",
      "Treatment difficult; gabapentin, topiramate, nortriptyline, nerve blocks, IV DHE sometimes used"
    ],
    distinguishing: {
      "vs chronic migraine": "NDPH: abrupt onset, clearly remembered, often bilateral/diffuse. Chronic migraine: evolution from episodic, may have unilateral features.",
      "vs chronic TTH": "NDPH: abrupt onset remembered. Chronic TTH: gradual evolution, often from episodic TTH.",
      "vs low CSF pressure headache": "NDPH: may be orthostatic but constant. CSF leak: clearly orthostatic (worse upright, better supine), may have neck stiffness, tinnitus."
    },
    redFlags: ["Any red flag symptom (must rule out secondary)", "Venous sinus thrombosis history", "Recent infection + orthostatic component"]
  },
  
  "4.8": {
    code: "4.8",
    name: "Thunderclap Headache",
    category: "SYMPTOM — Requires urgent evaluation",
    criteria: {
      note: "Thunderclap headache is a DESCRIPTOR, not a diagnosis. It requires IMMEDIATE exclusion of secondary causes.",
      definition: "Severe headache of abrupt onset, reaching maximum intensity in <1 minute",
      causes: [
        "Subarachnoid hemorrhage (SAH) — most important to exclude",
        "Reversible cerebral vasoconstriction syndrome (RCVS)",
        "Cervical artery dissection",
        "Cerebral venous sinus thrombosis",
        "Pituitary apoplexy",
        "Spontaneous intracranial hypotension",
        "Acute hypertensive crisis",
        "Primary thunderclap headache (diagnosis of exclusion)"
      ]
    },
    notes: [
      "NEVER diagnose primary thunderclap headache until ALL secondary causes excluded",
      "Urgent CT head + lumbar puncture (if CT negative) to exclude SAH",
      "CT angiography or MR angiography to exclude RCVS, dissection, venous thrombosis",
      "Primary thunderclap headache may recur; RCVS can be triggered by SSRIs, postpartum, illicit drugs"
    ],
    redFlags: ["This IS the red flag — always investigate emergently"]
  },
  
  "4.10": {
    code: "8.2",
    name: "Medication-Overuse Headache (MOH)",
    category: "Secondary — Substance-Induced",
    prevalence: "1–2% of population",
    criteria: {
      A: "Headache occurring on ≥15 days/month in a patient with a pre-existing headache disorder",
      B: "Regular overuse for >3 months of one or more drugs taken for acute and/or symptomatic treatment of headache",
      C: "Not better accounted for by another ICHD-3 diagnosis"
    },
    overuseThresholds: {
      "Simple analgesics": ">15 days/month (aspirin, acetaminophen, NSAIDs)",
      "Triptans": ">10 days/month",
      "Opioids": ">10 days/month",
      "Combination analgesics": ">10 days/month",
      "Ergotamine": ">10 days/month",
      "Multiple drug classes": ">10 days/month (any combination)"
    },
    notes: [
      "Most common cause of chronic daily headache",
      "Paradox: medication used to treat headache perpetuates headache",
      "Withdrawal headache common when stopping overused medication",
      "After withdrawal, original headache disorder (migraine, TTH) often returns to pre-chronic frequency",
      "Preventive therapy should be initiated BEFORE or DURING withdrawal",
      "Prognosis better if overuse <5 years; worse with opioids and barbiturates"
    ],
    distinguishing: {
      "vs chronic migraine": "MOH: ≥15 days + medication overuse. Chronic migraine: ≥15 days + ≥8 migraine days. They OFTEN COEXIST — diagnose BOTH if criteria met.",
      "vs chronic TTH": "MOH: medication overuse present. Chronic TTH: no overuse, pressing/bilateral, mild-moderate."
    },
    redFlags: ["Opioid or barbiturate overuse (worse prognosis, requires supervised withdrawal)", "Psychiatric comorbidity (depression, anxiety, substance use)", "Failed prior withdrawal attempts"]
  },
  
  // ============================================
  // PART II: SECONDARY HEADACHES
  // ============================================
  
  // ─── CHAPTER 5: TRAUMA ───
  
  "5.1": {
    code: "5.1",
    name: "Acute Headache Attributed to Traumatic Injury to the Head",
    category: "Secondary — Trauma",
    criteria: {
      A: "Headache of any type fulfilling criterion C",
      B: "Traumatic injury to the head with ALL of the following:\n  1. Loss of consciousness <30 minutes\n  2. Glasgow Coma Scale (GCS) score ≥13\n  3. Symptoms and/or signs of concussion",
      C: "Headache develops within 7 days after ALL of the following:\n  1. Injury\n  2. Regaining of consciousness (if lost)\n  3. Discontinuation of medications impairing headache assessment",
      D: "Headache resolves within 3 months after injury"
    },
    notes: [
      "Part of post-concussion syndrome; may be migraine-like or TTH-like",
      "Pre-existing migraine may worsen after trauma",
      "Cognitive symptoms, dizziness, sleep disturbance, mood changes common",
      "Persistent headache >3 months → 5.2 Chronic post-traumatic headache"
    ],
    distinguishing: {
      "vs pre-existing headache": "Post-traumatic: new onset or clear worsening after injury. Pre-existing: stable pattern before trauma."
    },
    redFlags: ["GCS <13", "LOC >30 min", "Focal neuro deficit", "Seizure", "Worsening headache", "Repeated vomiting"]
  },
  
  "5.2": {
    code: "5.2",
    name: "Chronic Post-Traumatic Headache",
    category: "Secondary — Trauma",
    criteria: {
      A: "Headache fulfilling criteria for 5.1 except criterion D",
      B: "Headache persists for >3 months after injury"
    },
    notes: [
      "May persist for years; mechanism involves central sensitization",
      "Psychological factors (PTSD, litigation) may perpetuate headache",
      "Often phenotypically migraine or TTH",
      "Treatment similar to primary counterpart + address psychological factors"
    ],
    redFlags: ["Progressive worsening", "New neuro signs", "Unexplained persistent headache years after mild trauma"]
  },
  
  // ─── CHAPTER 6: VASCULAR ───
  
  "6.1": {
    code: "6.1",
    name: "Headache Attributed to Ischemic Stroke or TIA",
    category: "Secondary — Vascular",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Acute ischemic stroke or TIA has been demonstrated by appropriate investigation",
      C: "Headache develops simultaneously with or in very close temporal relation to signs of stroke/TIA, and either:\n  1. Headache improves in parallel with improvement of stroke\n  2. Headache resolves within 3 months"
    },
    notes: [
      "Headache occurs in ~25% of ischemic strokes; more common in posterior circulation",
      "Most common in cerebellar and occipital infarcts",
      "If headache persists >3 months, consider central post-stroke pain or chronic headache disorder",
      "Differentiate from sentinel headache of arterial dissection"
    ],
    distinguishing: {
      "vs migraine with aura": "Stroke headache: new onset, no prior aura history, persistent neuro deficits. Migraine aura: prior history, fully reversible, gradual spread."
    },
    redFlags: ["This IS a red flag — stroke is always emergent"]
  },
  
  "6.2": {
    code: "6.2",
    name: "Headache Attributed to Non-Traumatic Intracranial Hemorrhage",
    category: "Secondary — Vascular",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Non-traumatic intracranial hemorrhage has been demonstrated by appropriate investigation",
      C: "Headache develops simultaneously with or in very close temporal relation to signs of hemorrhage, and either:\n  1. Headache improves in parallel with improvement of hemorrhage\n  2. Headache resolves within 3 months"
    },
    subtypes: {
      "6.2.1": "Headache attributed to non-traumatic subarachnoid hemorrhage (SAH)",
      "6.2.2": "Headache attributed to non-traumatic intracerebral hemorrhage",
      "6.2.3": "Headache attributed to non-traumatic subdural hemorrhage"
    },
    notes: [
      "SAH: classically 'thunderclap' worst headache of life; may have warning 'sentinel bleed' days before",
      "CT head urgent; if negative but suspicion high → LP for xanthochromia",
      "CTA/MRA to identify aneurysm; DSA gold standard for aneurysm detection",
      "Vasospasm (days 3–14) causes recurrent ischemic deficits and worsening headache"
    ],
    distinguishing: {
      "vs primary thunderclap": "SAH: requires CT/LP exclusion. Primary thunderclap: diagnosis of exclusion after negative workup.",
      "vs meningitis": "SAH: thunderclap onset, may have neck stiffness but no fever. Meningitis: fever, gradual onset, photophobia, altered mental status."
    },
    redFlags: ["Thunderclap onset", "LOC", "Focal deficits", "Seizure", "Warning bleed history"]
  },
  
  "6.3": {
    code: "6.3",
    name: "Headache Attributed to Giant Cell Arteritis (Temporal Arteritis)",
    category: "Secondary — Vascular",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Giant cell arteritis (GCA) has been demonstrated by appropriate investigation",
      C: "Headache develops in temporal relation to onset of GCA"
    },
    notes: [
      "Age >50 (mandatory for diagnosis); median age 70",
      "New headache in older patient is GCA until proven otherwise",
      "Associated symptoms: jaw claudication, scalp tenderness, visual symptoms (amaurosis fugax, diplopia)",
      "ESR >50 mm/hr and/or CRP elevated (but may be normal in 10%)",
      "TEMPORAL ARTERY BIOPSY required for definitive diagnosis; start steroids immediately if suspected (don't wait for biopsy)",
      "Urgent treatment: high-dose prednisone (40–60 mg/day) to prevent blindness"
    ],
    distinguishing: {
      "vs TTH/migraine": "GCA: new onset >50, scalp tenderness, jaw claudication, visual symptoms, elevated inflammatory markers. Primary headaches: prior history, no inflammatory signs.",
      "vs PMR": "GCA and PMR overlap; 40–60% of GCA patients have PMR. Both: age >50, elevated ESR/CRP. GCA: headache, scalp tenderness, visual symptoms. PMR: shoulder/hip girdle stiffness, no headache."
    },
    redFlags: ["New headache in patient >50", "Visual symptoms of any kind", "Jaw claudication", "ESR >50"]
  },
  
  "6.4": {
    code: "6.4",
    name: "Headache Attributed to Reversible Cerebral Vasoconstriction Syndrome (RCVS)",
    category: "Secondary — Vascular",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "RCVS demonstrated by appropriate vascular imaging (CTA, MRA, or conventional angiography showing multifocal cerebral artery vasoconstriction)",
      C: "Headache is sudden onset ('thunderclap'), severe, and recurs during a period of 1–4 weeks"
    },
    notes: [
      "Recurrent thunderclap headaches over 1–4 weeks is classic presentation",
      "Triggers: postpartum, SSRIs/SNRIs, triptans, cannabis, cocaine, ergotamine",
      "Different from primary thunderclap: recurrent, multifocal vasoconstriction on imaging",
      "Usually self-limiting; nimodipine may help",
      "Can cause ischemic stroke (5–10%) or intracerebral hemorrhage",
      "Vasoconstriction resolves within 12 weeks (distinguishes from vasculitis)"
    ],
    distinguishing: {
      "vs primary thunderclap": "RCVS: recurrent thunderclaps, imaging shows vasoconstriction. Primary: single or non-recurrent, no vascular changes.",
      "vs CNS vasculitis": "RCVS: thunderclap headache, self-limiting, no inflammation. Vasculitis: insidious, progressive, biopsy/inflammation markers abnormal."
    },
    redFlags: ["Recurrent thunderclap", "Postpartum", "Drug triggers", "Ischemic deficits on imaging"]
  },
  
  "6.5": {
    code: "6.5",
    name: "Headache Attributed to Cervical Artery Dissection",
    category: "Secondary — Vascular",
    criteria: {
      A: "Any new headache and/or neck pain fulfilling criterion C",
      B: "Cervical artery dissection demonstrated by appropriate vascular imaging (CTA, MRA, DUS, or conventional angiography)",
      C: "Pain develops in close temporal relation to dissection"
    },
    notes: [
      "Classic triad: unilateral headache + neck pain + Horner's syndrome (ptosis, miosis, anhidrosis)",
      "Carotid dissection: anterior circulation (hemisphere) symptoms, Horner's, neck pain",
      "Vertebral dissection: posterior circulation (brainstem/cerebellum) symptoms, neck pain, occipital headache",
      "Can present with thunderclap headache (must exclude SAH)",
      "Treatment: anticoagulation vs antiplatelet controversial; endovascular stenting if refractory",
      "Association: neck trauma (even minor: chiropractic, sports), fibromuscular dysplasia, connective tissue disorders"
    ],
    distinguishing: {
      "vs migraine": "Dissection: new onset, neck pain, Horner's, vascular risk factors. Migraine: prior history, no Horner's, no neck pain typical.",
      "vs SAH": "Dissection: may have thunderclap, but also neck pain and Horner's. SAH: thunderclap, meningismus, no Horner's (unless aneurysm compresses sympathetic)."
    },
    redFlags: ["Unilateral headache + neck pain + Horner's = dissection until proven otherwise", "Post-traumatic (even minor)", "Focal neuro deficits"]
  },
  
  "6.6": {
    code: "6.6",
    name: "Headache Attributed to Cerebral Venous Thrombosis (CVT)",
    category: "Secondary — Vascular",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Cerebral venous thrombosis demonstrated by appropriate imaging (contrast-enhanced MRI/MRV, CTV, or conventional venography)",
      C: "Headache develops in close temporal relation to CVT"
    },
    notes: [
      "Most common in young women (hypercoagulable: OCP, pregnancy, puerperium)",
      "Headache often diffuse, progressive, worse with Valsalva/coughing",
      "May present as 'thunderclap' mimicking SAH",
      "Papilledema, seizures, focal deficits, altered consciousness may be present",
      "Imaging: empty delta sign on contrast CT; MRV diagnostic",
      "Treatment: anticoagulation (heparin) even if hemorrhagic infarct present"
    ],
    distinguishing: {
      "vs IIH": "CVT: may have papilledema, focal deficits, hypercoagulable state. IIH: no focal deficits, obese young woman, normal venography after thrombosis excluded.",
      "vs SAH": "CVT: may have thunderclap, but also seizures, papilledema, focal deficits. SAH: thunderclap, meningismus, no papilledema (acutely)."
    },
    redFlags: ["Young woman + headache + OCP/pregnancy/puerperium", "Papilledema", "Seizure", "Focal deficits"]
  },
  
  "6.7": {
    code: "6.7",
    name: "Headache Attributed to Unruptured Vascular Malformation",
    category: "Secondary — Vascular",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Unruptured vascular malformation (AVM, cavernoma, aneurysm, arterial ectasia) demonstrated by appropriate investigation",
      C: "Headache develops in close temporal relation to vascular malformation"
    },
    notes: [
      "Most unruptured aneurysms are asymptomatic; headache only if large or compressing structures",
      "Giant aneurysm (>25 mm) may cause mass effect headache",
      "AVM may cause headache via mass effect, steal phenomenon, or hemorrhage",
      "Cavernomas usually asymptomatic; headache if bleed causes mass effect",
      "Aneurysm may cause sentinel headache before rupture (thunderclap — treat as SAH until excluded)"
    ],
    distinguishing: {
      "vs primary headache": "Vascular malformation: new headache, may have neuro signs, imaging shows lesion. Primary: normal imaging, typical pattern."
    },
    redFlags: ["New headache with focal neuro signs", "Thunderclap (consider sentinel bleed)", "Cranial nerve palsies (especially CN III with posterior communicating aneurysm)"]
  },
  
  // ─── CHAPTER 7: NON-VASCULAR INTRACRANIAL ───
  
  "7.1": {
    code: "7.1",
    name: "Headache Attributed to Idiopathic Intracranial Hypertension (IIH)",
    category: "Secondary — Non-Vascular Intracranial",
    prevalence: "1–2/100,000 (general); 19/100,000 (obese women 20–44)",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "IIH diagnosed with ALL of the following:\n  1. Increased CSF pressure (>250 mm CSF in adults, >280 mm CSF in children)\n  2. Normal neurological examination except papilledema and possibly abducens nerve palsy\n  3. Normal neuroimaging except findings related to raised ICP (empty sella, flattening of posterior globe, venous sinus stenosis)\n  4. Normal CSF constituents",
      C: "Headache develops in close temporal relation to IIH"
    },
    notes: [
      "AKA pseudotumor cerebri; predominantly obese women of childbearing age",
      "Classic triad: daily headache + pulsatile tinnitus + papilledema",
      "Visual field defects (enlarged blind spot) are most concerning — can lead to blindness",
      "Associated symptoms: transient visual obscurations (seconds), diplopia (CN VI palsy), neck stiffness, low back pain",
      "Workup: MRI/MRV (rule out secondary causes, look for empty sella), LP (opening pressure), formal visual fields",
      "Treatment: weight loss (if obese), acetazolamide (1–4 g/day), topiramate, serial LPs, venous sinus stenting, optic nerve sheath fenestration, CSF shunt"
    ],
    distinguishing: {
      "vs chronic migraine": "IIH: papilledema, pulsatile tinnitus, daily headache, obese young woman. Chronic migraine: no papilledema, prior migraine history, no tinnitus.",
      "vs CVT": "IIH: normal neuro exam (except papilledema/CN VI), no hypercoagulable state. CVT: may have focal deficits, seizures, hypercoagulable state, MRV shows thrombosis.",
      "vs intracranial hypotension": "IIH: worse lying down, better upright. SIH: worse upright, better lying down."
    },
    redFlags: ["Papilledema", "Visual field loss", "Rapidly progressive visual symptoms", "Atypical patient (thin male, child)"]
  },
  
  "7.2": {
    code: "7.2",
    name: "Headache Attributed to Intracranial Hypotension",
    category: "Secondary — Non-Vascular Intracranial",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Intracranial hypotension demonstrated by one or more of the following:\n  1. Low CSF opening pressure (<60 mm CSF)\n  2. CSF leak demonstrated by conventional or CT myelography, or MRI with intrathecal contrast (MR cisternography)\n  3. Pachymeningeal enhancement on MRI with gadolinium",
      C: "Headache develops in close temporal relation to CSF leak or low CSF pressure"
    },
    notes: [
      "Spontaneous intracranial hypotension (SIH): most commonly from spinal CSF leak (often at thoracic spine, frequently associated with connective tissue disorder)",
      "Iatrogenic: post-LP, post-spinal surgery, post-CSF shunt overdrainage",
      "Classic: orthostatic headache (worse upright, better supine) — but can become constant over time",
      "Associated: neck stiffness, tinnitus (hypoacusia), nausea, photophobia, diplopia (CN VI palsy)",
      "MRI brain: pachymeningeal enhancement (dural thickening), sagging brainstem, enlarged pituitary, subdural collections",
      "Treatment: bed rest, caffeine, epidural blood patch (targeted if site known), fibrin sealant, surgery if refractory"
    ],
    distinguishing: {
      "vs IIH": "SIH: worse upright, better supine, pachymeningeal enhancement, neck stiffness. IIH: worse supine, papilledema, empty sella.",
      "vs NDPH": "SIH: orthostatic component, clear precipitant (LP, trauma), MRI findings. NDPH: non-orthostatic, abrupt but no CSF leak evidence.",
      "vs chronic TTH": "SIH: orthostatic, MRI abnormalities. TTH: no positional component, normal imaging."
    },
    redFlags: ["Post-LP headache not improving", "Progressive course", "Focal neuro signs", "Subdural collections on MRI"]
  },
  
  "7.3": {
    code: "7.3",
    name: "Headache Attributed to Intracranial Infection",
    category: "Secondary — Non-Vascular Intracranial",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Intracranial infection (brain abscess, subdural empyema, epidural abscess, meningitis, encephalitis) demonstrated by appropriate investigation",
      C: "Headache develops in close temporal relation to infection"
    },
    notes: [
      "Meningitis: fever + neck stiffness + headache + altered mental status",
      "Encephalitis: fever + altered mental status + seizures + focal deficits; headache may be mild or absent",
      "Brain abscess: headache + focal deficits + fever; often insidious onset",
      "Immunocompromised patients may have atypical presentations (no fever, subtle findings)",
      "Lumbar puncture essential for meningitis/encephalitis (but CT first if focal deficits/papilledema)",
      "HIV patients: consider cryptococcal meningitis, toxoplasmosis, TB",
      "Skull base osteomyelitis: clival skull base infection (often from otitis/sinusitis), presents with headache + cranial nerve palsies (VI, VII, IX, X, XI)",
      "Sphenoid sinusitis: midline or vertex headache, worse with bending forward, may cause cavernous sinus thrombosis or meningitis"
    ],
    distinguishing: {
      "vs viral illness headache": "Intracranial infection: persistent/worsening, neuro signs, fever, neck stiffness. Viral: self-limiting, no neuro signs, mild.",
      "vs SAH": "Infection: fever, meningismus, gradual onset. SAH: thunderclap, no fever (initially)."
    },
    redFlags: ["Fever + headache + neck stiffness = meningitis until proven otherwise", "Immunocompromised", "Altered mental status", "Seizure", "Focal neuro signs"]
  },
  
  "7.4": {
    code: "7.4",
    name: "Headache Attributed to Intracranial Neoplasm",
    category: "Secondary — Non-Vascular Intracranial",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Space-occupying intracranial neoplasm demonstrated by neuroimaging",
      C: "Headache develops in close temporal relation to neoplasm"
    },
    notes: [
      "Headache from brain tumor often non-specific; classic 'morning headache worse with coughing' is uncommon",
      "Tumor headache = raised ICP OR direct tissue traction; location often non-localizing",
      "Posterior fossa tumors cause headache earlier (limited space, CSF obstruction)",
      "New headache with neuro signs in adult = imaging indicated",
      "Metastases: lung, breast, melanoma, renal, colon most common",
      "Primary CNS lymphoma in immunocompromised (HIV, transplant)"
    ],
    distinguishing: {
      "vs chronic migraine": "Tumor: progressive, focal neuro signs, papilledema, abnormal imaging. Migraine: stable pattern, normal exam between attacks, no papilledema."
    },
    redFlags: ["Progressive headache", "New neuro signs", "Papilledema", "Seizure", "Personality change", "Age >50 with new headache"]
  },
  
  // ─── CHAPTER 8: SUBSTANCE-INDUCED ───
  
  "8.1": {
    code: "8.1",
    name: "Headache Attributed to Substance Use or Exposure",
    category: "Secondary — Substance",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Use of or exposure to a substance known to cause headache in most people",
      C: "Headache develops in close temporal relation to substance use or exposure"
    },
    commonSubstances: [
      "Nitroglycerin and other nitrates",
      "Phosphodiesterase inhibitors (sildenafil, tadalafil)",
      "Carbon monoxide",
      "Alcohol (hangover headache)",
      "Cocaine",
      "Cannabis",
      "Histamine",
      "Calcitonin gene-related peptide (CGRP) antagonists (paradoxical in some)",
      "Selective serotonin reuptake inhibitors (SSRIs)"
    ],
    notes: [
      "Often dose-dependent; known substance → headache = 8.1",
      "Alcohol hangover headache: bilateral, throbbing, within hours of cessation",
      "Medication withdrawal headache (e.g., caffeine) = separate category (8.4)",
      "MOH (8.2) is distinct — from CHRONIC overuse, not acute exposure"
    ],
    redFlags: ["Carbon monoxide exposure (check CO levels, move to fresh air)", "Cocaine-related thunderclap (RCVS, SAH, dissection)"]
  },
  
  "8.3": {
    code: "8.3",
    name: "Headache Attributed to Substance Withdrawal",
    category: "Secondary — Substance",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Use of a substance for >3 months with daily or near-daily exposure, followed by withdrawal",
      C: "Headache develops within hours after last use and resolves within 72 hours after re-exposure or complete withdrawal"
    },
    commonWithdrawals: [
      "Caffeine withdrawal (most common — 200 mg/day regular use → withdrawal)",
      "Opioid withdrawal",
      "Estrogen withdrawal (menstrual migraine)",
      "Alcohol withdrawal"
    ],
    notes: [
      "Caffeine withdrawal headache: bilateral, throbbing, improves within 1 hour of caffeine ingestion",
      "Estrogen withdrawal (menstrual migraine): typically 2 days before menses to day 3 of menses",
      "Alcohol withdrawal: headache + tremor + autonomic hyperactivity; can progress to delirium tremens"
    ],
    distinguishing: {
      "vs MOH": "Withdrawal: resolves within 72 hr of stopping or restarting. MOH: persists >15 days/month with ongoing overuse."
    },
    redFlags: ["Alcohol withdrawal with confusion/autonomic instability", "Opioid withdrawal in dependent patient (supervised detox needed)"]
  },
  
  // ─── CHAPTER 9: INFECTION ───
  
  "9.1": {
    code: "9.1",
    name: "Headache Attributed to Intracranial Infection",
    category: "Secondary — Infection",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Intracranial infection (meningitis, encephalitis, brain abscess, subdural empyema) demonstrated by appropriate investigation",
      C: "Headache develops in close temporal relation to infection"
    },
    notes: [
      "Meningitis: fever + neck stiffness + headache + photophobia; LP diagnostic (after CT if indicated)",
      "Encephalitis: altered mental status + fever + seizures; HSV most common sporadic cause",
      "Brain abscess: headache + focal deficits + fever; often insidious; MRI with ring enhancement",
      "Immunocompromised: atypical pathogens (cryptococcus, toxoplasma, TB, PML)",
      "Skull base osteomyelitis: clival skull base infection (often from otitis/sinusitis), presents with headache + cranial nerve palsies (VI, VII, IX, X, XI)",
      "Sphenoid sinusitis: midline or vertex headache, worse with bending forward, may cause cavernous sinus thrombosis or meningitis"
    ],
    distinguishing: {
      "vs SAH": "Infection: fever, meningismus, gradual. SAH: thunderclap, no fever."
    },
    redFlags: ["Fever + neck stiffness + headache", "Immunocompromised", "Altered consciousness", "Seizure"]
  },
  
  "9.2": {
    code: "9.2",
    name: "Headache Attributed to Systemic Infection",
    category: "Secondary — Infection",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Systemic infection (viral, bacterial, fungal, parasitic) demonstrated by appropriate investigation",
      C: "Headache develops in close temporal relation to systemic infection"
    },
    notes: [
      "Very common; most viral illnesses cause some headache",
      "Headache from cytokine release, fever, dehydration",
      "COVID-19: headache in ~50%, can persist as long COVID",
      "Malaria: headache prominent in cerebral malaria",
      "Typhoid, dengue, influenza all commonly associated with headache"
    ],
    distinguishing: {
      "vs primary headache": "Systemic infection: fever, other infection symptoms, self-limiting. Primary: no fever, recurrent pattern."
    },
    redFlags: ["Headache with fever + altered mental status (consider meningitis/encephalitis)", "Travel to endemic areas", "Immunocompromised"]
  },
  
  // ─── CHAPTER 10: HOMEOSTASIS ───
  
  "10.1": {
    code: "10.1",
    name: "Headache Attributed to Hypoxia and/or Hypercapnia",
    category: "Secondary — Homeostasis",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Arterial hypoxia (PaO2 <70 mmHg) and/or hypercapnia (PaCO2 >45 mmHg) demonstrated by appropriate investigation",
      C: "Headache develops in close temporal relation to hypoxia/hypercapnia"
    },
    causes: [
      "High altitude (>2500 m)",
      "Sleep apnea/OSA",
      "Chronic obstructive pulmonary disease (COPD)",
      "Carbon monoxide poisoning",
      "Diving (breathing gas mixtures)"
    ],
    notes: [
      "High altitude headache: bilateral, throbbing, within 24 hours of ascent; improves with descent or oxygen",
      "OSA headache: morning headache, improves within 72 hours of CPAP treatment",
      "CO poisoning: headache + dizziness + confusion + cherry-red skin (late); carboxyhemoglobin level diagnostic"
    ],
    distinguishing: {
      "vs primary morning headache": "OSA: morning headache, snoring, daytime somnolence, improves with CPAP. Primary: no OSA symptoms, no improvement with CPAP."
    },
    redFlags: ["CO poisoning (emergency)", "High altitude with altered mental status (HACE)", "OSA with severe desaturations"]
  },
  
  "10.2": {
    code: "10.2",
    name: "Headache Attributed to Arterial Hypertension",
    category: "Secondary — Homeostasis",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Blood pressure >180/120 mmHg (or diastolic >120) demonstrated by appropriate investigation",
      C: "Headache develops in close temporal relation to hypertension and resolves within 24 hours of normalization"
    },
    notes: [
      "MILD-MODERATE chronic hypertension DOES NOT cause headache (myth)",
      "Only hypertensive emergency (≥180/120 with end-organ damage) or acute severe hypertension causes headache",
      "Pheochromocytoma: episodic hypertension + headache + sweating + palpitations",
      "Pre-eclampsia/eclampsia: pregnancy + hypertension + proteinuria + headache (emergency)",
      "Headache from hypertension = Pulsatile, bilateral, worsens with Valsalva"
    ],
    distinguishing: {
      "vs primary headache": "Hypertension: BP >180/120, acute onset, resolves with BP control. Primary: BP normal or chronically elevated without acute change, no resolution with BP control alone."
    },
    redFlags: ["BP >180/120", "End-organ symptoms (chest pain, vision changes, neuro deficits)", "Pregnancy + hypertension", "Pheochromocytoma triad"]
  },
  
  // ─── CHAPTER 11: CRANIUM/NECK ───
  
  "11.1": {
    code: "11.1",
    name: "Headache Attributed to Cranial or Cervical Vascular Disorder",
    category: "Secondary — Cranium/Neck",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Cranial or cervical vascular disorder demonstrated by appropriate investigation",
      C: "Headache develops in close temporal relation to vascular disorder"
    },
    notes: [
      "Includes: carotid/vertebral artery dissection, vasculitis, aneurysm",
      "See 6.5 (dissection), 6.3 (GCA), 6.7 (unruptured malformation) for specific criteria"
    ],
    redFlags: ["New headache with vascular risk factors", "Focal neuro signs", "Neck pain + headache"]
  },
  
  "11.2": {
    code: "11.2",
    name: "Cervicogenic Headache",
    category: "Secondary — Cranium/Neck",
    prevalence: "0.4–4% of population",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Clinical and/or imaging evidence of a disorder or lesion within the cervical spine or soft tissues of the neck, known to be able to cause headache",
      C: "Evidence of causation demonstrated by at least TWO of the following:\n  1. Headache has developed in temporal relation to onset of cervical disorder\n  2. Significant improvement or resolution after diagnostic blockade of cervical structure or its nerve supply\n  3. Reduced cervical range of motion\n  4. Headache significantly aggravated by provocative maneuvers"
    },
    notes: [
      "Pain originates in neck structures (C1-C3) and referred to head via convergence in trigeminocervical nucleus",
      "Most common sources: C2-3 facet joints, C2-3 disc, atlantoaxial joint, upper cervical muscles",
      "Diagnostic criterion: headache ABOLISHED by diagnostic block of cervical structure",
      "Often unilateral, occipital → frontotemporal; precipitated by neck movement/sustained posture",
      "Distinguishing feature: mechanical provocation (neck movement, palpation) reproduces headache",
      "May coexist with migraine (both involve trigeminocervical complex)"
    ],
    distinguishing: {
      "vs migraine": "Cervicogenic: mechanical trigger, unilateral occipital, abolished by cervical block, neck stiffness. Migraine: no mechanical trigger, throbbing, nausea, photo/phonophobia.",
      "vs occipital neuralgia": "Cervicogenic: deep, non-lancinating, structural neck source. Occipital neuralgia: shock-like, along nerve distribution, tender over occipital nerve."
    },
    redFlags: ["Upper cervical instability (rheumatoid arthritis, Down syndrome, trauma)", "Myelopathy signs", "Fracture history"]
  },
  
  "11.3": {
    code: "11.3",
    name: "Headache Attributed to Temporomandibular Disorder (TMD)",
    category: "Secondary — Cranium/Neck",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Temporomandibular disorder demonstrated by clinical and/or imaging examination",
      C: "Headache develops in close temporal relation to TMD"
    },
    notes: [
      "Pain preauricular, temple, or referred to neck; worsens with jaw movement/chewing",
      "TMD includes: myofascial pain, disc displacement, degenerative joint disease, subluxation",
      "Bruxism (teeth grinding) commonly associated; sleep study may identify",
      "Treatment: bite guard, physical therapy, behavioral therapy, analgesics, botulinum toxin"
    ],
    distinguishing: {
      "vs migraine": "TMD: jaw pain/tenderness, clicking, limited opening, worse with chewing. Migraine: no jaw findings, throbbing, associated symptoms."
    },
    redFlags: ["Locked jaw", "Severe degenerative changes", "Systemic arthritis (RA, psoriatic)"]
  },
  
  // ─── CHAPTER 12: PSYCHIATRIC ───
  
  "12.1": {
    code: "12.1",
    name: "Headache Attributed to Somatization Disorder",
    category: "Secondary — Psychiatric",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Somatization disorder diagnosed according to DSM-5 or ICD-10 criteria",
      C: "Headache develops in temporal relation to somatization disorder"
    },
    notes: [
      "Headache as part of multisystem somatic complaints",
      "Multiple unexplained physical symptoms across different organ systems",
      "Psychological factors prominent; patients often highly healthcare-seeking",
      "Diagnosis requires exclusion of organic causes",
      "Treatment: CBT, multidisciplinary pain management, avoid excessive investigations"
    ],
    distinguishing: {
      "vs primary headache": "Somatization: multiple system complaints, psychological comorbidity, excessive health anxiety. Primary: isolated headache, normal exam, typical pattern."
    },
    redFlags: ["Depression with suicidal ideation", "Personality disorder complicating care", "Inappropriate medical seeking"]
  },
  
  "12.2": {
    code: "12.2",
    name: "Headache Attributed to Psychotic Disorder",
    category: "Secondary — Psychiatric",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Delusional belief that the patient has headache (despite no pain) or that headache has special meaning",
      C: "Headache develops in temporal relation to psychotic disorder"
    },
    notes: [
      "Rare; patient may believe they have headache without actually experiencing pain",
      "Or pain experience is part of delusional system (e.g., 'the government is causing my headache with satellites')",
      "Different from hypochondriasis (genuine belief of illness, not delusional)"
    ],
    redFlags: ["Psychotic symptoms", "Danger to self/others", "Refusal of medical evaluation"]
  },
  
  // ============================================
  // PART III: CRANIAL NEURALGIAS
  // ============================================
  
  // ─── CHAPTER 13: TRIGEMINAL NEURALGIA ───
  
  "13.1": {
    code: "13.1",
    name: "Classical Trigeminal Neuralgia",
    category: "Cranial Neuralgia",
    prevalence: "0.1–0.3% of population",
    criteria: {
      A: "At least 3 attacks of unilateral facial pain fulfilling criteria B and C",
      B: "Pain has ALL of the following characteristics:\n  1. Recurring in paroxysmal attacks lasting from a fraction of second to 2 minutes\n  2. Severe intensity\n  3. Electric shock-like, shooting, stabbing, or sharp in quality",
      C: "Pain is precipitated by innocuous stimuli to affected side of face (trigger zones)",
      D: "No clinically evident neurological deficit (between attacks)",
      E: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "'The suicide disease' — among the most severe pains known",
      "V2 (maxillary) and V3 (mandibular) divisions most commonly affected; V1 (ophthalmic) rare",
      "Trigger zones: corner of mouth, nasolabial fold, chin, alae nasi; light touch, talking, chewing, wind, shaving trigger attacks",
      "Refractory period (seconds to minutes) after attack during which trigger won't provoke pain",
      "Caused by neurovascular compression (NVCA) of trigeminal nerve root by artery (usually SCA or AICA)",
      "MRI with CISS/FIESTA sequence to show neurovascular compression (but not required for diagnosis)",
      "Medical treatment: carbamazepine (first line), oxcarbazepine, baclofen, lamotrigine",
      "Surgical: microvascular decompression (MVD — curative), gamma knife, radiofrequency rhizotomy, balloon compression"
    ],
    distinguishing: {
      "vs SUNCT/SUNA": "TN: no autonomic symptoms, triggerable, refractory periods. SUNCT: autonomics present, non-triggerable, no refractory period.",
      "vs dental pathology": "TN: electric shock, triggerable, normal dental exam. Dental: aching, related to specific tooth, abnormal exam/X-ray.",
      "vs cluster headache": "TN: seconds, triggerable, no autonomics. Cluster: 15–180 min, autonomics, no trigger zones."
    },
    redFlags: ["Sensory loss between attacks (suggests secondary TN, tumor, MS)", "Bilateral (suggests MS)", "Onset <40 years (suggests MS)", "Deafness or vertigo (suggests CPA tumor)"]
  },
  
  "13.2": {
    code: "13.2",
    name: "Secondary Trigeminal Neuralgia",
    category: "Cranial Neuralgia",
    criteria: {
      A: "Any new headache fulfilling criterion C",
      B: "Demonstration on MRI or other appropriate investigation of a causative lesion other than vascular compression",
      C: "Pain has characteristics of 13.1 and develops in close temporal relation to lesion"
    },
    causes: [
      "Multiple sclerosis (most common cause in young patients)",
      "Cerebellopontine angle tumor (acoustic neuroma, meningioma)",
      "Brainstem stroke",
      "Basilar impression/Chiari malformation",
      " skull base metastasis"
    ],
    notes: [
      "Secondary TN often has atypical features: sensory loss, bilateral, onset <40 years",
      "MS-related TN: bilateral in ~15%, younger onset, may have other neurological symptoms",
      "Imaging mandatory if any atypical feature present"
    ],
    redFlags: ["Any atypical feature = mandatory imaging", "MS symptoms", "Bilateral", "Onset <40"]
  },
  
  "13.3": {
    code: "13.3",
    name: "Painful Trigeminal Neuropathy",
    category: "Cranial Neuralgia",
    criteria: {
      A: "Facial pain in one or more divisions of trigeminal nerve, fulfilling criterion C",
      B: "A traumatic, inflammatory, or other identifiable event has affected the trigeminal nerve",
      C: "Pain develops in close temporal relation to event"
    },
    notes: [
      "Post-herpetic neuralgia: persistent pain after shingles in trigeminal distribution (V1 most devastating — can cause eye complications)",
      "Post-traumatic: after facial fracture, dental procedure, sinus surgery",
      "Anesthesia dolorosa: pain in anesthetic area (rare complication of destructive procedures for TN)",
      "Treatment: gabapentin, pregabalin, TCAs, topical agents, nerve blocks"
    ],
    distinguishing: {
      "vs classical TN": "Painful neuropathy: constant burning/aching, numbness, history of nerve injury. TN: paroxysmal electric shock, no numbness, no trauma history."
    },
    redFlags: ["V1 distribution with eye symptoms", "Post-herpetic with vision changes", "Worsening numbness"]
  },
  
  "13.4": {
    code: "13.4",
    name: "Glossopharyngeal Neuralgia",
    category: "Cranial Neuralgia",
    criteria: {
      A: "At least 3 attacks of unilateral pain fulfilling criteria B and C",
      B: "Pain has ALL of the following characteristics:\n  1. Recurring in paroxysmal attacks lasting from a fraction of second to 2 minutes\n  2. Severe intensity\n  3. Stabbing, shooting, or sharp in quality",
      C: "Pain is distributed in the posterior part of the tongue, tonsillar fossa, pharynx, beneath the angle of the lower jaw and/or in the ear",
      D: "Precipitated by swallowing, chewing, talking, coughing, or yawning",
      E: "No clinically evident neurological deficit"
    },
    notes: [
      "Much rarer than trigeminal neuralgia",
      "Can cause bradycardia/asystole via glossopharyngeal-vagal reflex (rare but dangerous)",
      "Same neurovascular compression etiology as TN (usually PICA or vertebral artery)",
      "Carbamazepine first-line; MVD if refractory"
    ],
    distinguishing: {
      "vs TN": "Glossopharyngeal: throat/ear pain, triggered by swallowing. TN: face pain, triggered by touch/chewing/wind."
    },
    redFlags: ["Syncope with attacks", "Bradycardia/asystole", "Cardiac workup indicated"]
  },
  
  "13.5": {
    code: "13.5",
    name: "Occipital Neuralgia",
    category: "Cranial Neuralgia",
    criteria: {
      A: "Unilateral or bilateral pain fulfilling criteria B–D",
      B: "Pain has BOTH of the following characteristics:\n  1. Continuous aching, burning and/or throbbing pain\n  2. With superimposed paroxysmal stabbing pain",
      C: "Pain is located in the distributions of the greater, lesser, and/or third occipital nerves",
      D: "Tenderness over the affected nerve branches",
      E: "Pain eased temporarily by local anesthetic block of the affected nerve"
    },
    notes: [
      "Pain from suboccipital to vertex, behind ear; may radiate to temple/forehead",
      "Often after neck trauma, whiplash, or chronic neck muscle tension",
      "Nerve blocks diagnostic AND therapeutic; pulsed radiofrequency for refractory",
      "May coexist with cervicogenic headache (overlapping mechanisms)"
    ],
    distinguishing: {
      "vs cervicogenic headache": "Occipital neuralgia: shock-like paroxysms, tender over nerve, eased by nerve block. Cervicogenic: deep, mechanical trigger, abolished by cervical block.",
      "vs migraine": "Occipital neuralgia: constant baseline with stabs, nerve tenderness. Migraine: episodic, throbbing, no nerve tenderness."
    },
    redFlags: ["Upper cervical instability", "Myelopathy signs", "Tumor at skull base/C1-C2"]
  },
  
  "13.6": {
    code: "13.6",
    name: "Supraorbital Neuralgia",
    category: "Cranial Neuralgia",
    criteria: {
      A: "Headache fulfilling criterion C",
      B: "Pain in the territory of the supraorbital nerve (forehead, medial aspect of upper eyelid)",
      C: "Tenderness over the supraorbital notch or exit point, with pain eased by local anesthetic block"
    },
    notes: [
      "Often after facial trauma, frontal sinus surgery, or tight headwear/goggles",
      "Tenderness at supraorbital notch diagnostic",
      "Treatment: nerve block, pulsed radiofrequency, surgical decompression"
    ],
    distinguishing: {
      "vs frontal sinusitis": "Supraorbital neuralgia: sharp/stabbing, nerve tenderness, block responsive. Sinusitis: pressure, nasal symptoms, worse bending forward."
    },
    redFlags: ["Sinus pathology", "Tumor at orbital apex", "Progressive numbness"]
  },
  
  "13.7": {
    code: "13.7",
    name: "Persistent Idiopathic Facial Pain (Atypical Facial Pain)",
    category: "Cranial Neuralgia",
    criteria: {
      A: "Facial and/or oral pain fulfilling criteria B and C",
      B: "Pain daily, and present for all or most of the day, for >3 months",
      C: "Pain is confined to a specific area at onset but may subsequently spread",
      D: "Pain is deep, poorly localized, and not following distribution of a peripheral nerve",
      E: "Not better accounted for by another ICHD-3 diagnosis"
    },
    notes: [
      "Formerly called 'atypical facial pain' — now preferred term is PIFP",
      "Psychological factors strongly associated (depression, anxiety, somatization)",
      "Dental causes must be thoroughly excluded (often multiple unnecessary dental procedures performed)",
      "No objective sensory loss; normal neurological examination",
      "Treatment: TCAs (amitriptyline), SNRIs, gabapentin, CBT, multidisciplinary pain management"
    ],
    distinguishing: {
      "vs TN": "PIFP: continuous, deep, poorly localized, no trigger zones, no paroxysms. TN: paroxysmal, electric shock, triggerable, well-localized.",
      "vs dental pathology": "PIFP: no dental abnormality, atypical distribution, chronic. Dental: identifiable tooth/sinus source, acute or inflammatory pattern."
    },
    redFlags: ["Dental disease requiring treatment", "Tumor at skull base", "MS presenting with facial pain"]
  },
  
  // ============================================
  // APPENDIX: PEDIATRIC CONSIDERATIONS
  // ============================================
  
  appendix: {
    pediatricModifications: {
      duration: "Migraine duration in children may be 2–72 hours (vs 4–72 in adults)",
      location: "Bilateral more common in young children; unilateral emerges in adolescence",
      photophonophobia: "May infer from behavior in young children (withdrawal, lying down)",
      aura: "More difficult to elicit; visual aura may be described as 'seeing things'",
      abdominalMigraine: "See 1.6 — common in children, evolves to migraine in adolescence"
    },
    elderlyConsiderations: {
      newOnset: "New headache after age 50 = GCA, tumor, or secondary cause until proven otherwise",
      hypnicHeadache: "See 4.6 — almost exclusively >50 years",
      thunderclap: "Any thunderclap at any age = SAH/RCVS/dissection workup",
      MOH: "More common with polypharmacy; be cautious with analgesic use"
    }
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get criteria for a specific ICHD-3 code
 */
export function getCriteriaByCode(code) {
  return ICHD3_CRITERIA[code] || null;
}

/**
 * Get all criteria for a category
 */
export function getCriteriaByCategory(category) {
  return Object.values(ICHD3_CRITERIA).filter(
    c => c.category && c.category.includes(category)
  );
}

/**
 * Get all primary headache criteria
 */
export function getPrimaryCriteria() {
  return Object.values(ICHD3_CRITERIA).filter(
    c => c.category && c.category.startsWith("Primary")
  );
}

/**
 * Get all secondary headache criteria
 */
export function getSecondaryCriteria() {
  return Object.values(ICHD3_CRITERIA).filter(
    c => c.category && c.category.startsWith("Secondary")
  );
}

/**
 * Get all red flags across all headache types
 */
export function getAllRedFlags() {
  const flags = [];
  Object.entries(ICHD3_CRITERIA).forEach(([code, data]) => {
    if (data.redFlags) {
      data.redFlags.forEach(flag => {
        flags.push({ code: data.code, name: data.name, flag });
      });
    }
  });
  return flags;
}

/**
 * Search criteria by name or code
 */
export function searchCriteria(query) {
  const lower = query.toLowerCase();
  return Object.values(ICHD3_CRITERIA).filter(
    c => (c.name && c.name.toLowerCase().includes(lower)) || 
         (c.code && c.code.toLowerCase().includes(lower))
  );
}

export default ICHD3_CRITERIA;
