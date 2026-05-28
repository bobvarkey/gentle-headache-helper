/**
 * ICHD-3 Headache Classification Data - Detailed
 * 
 * Comprehensive headache types based on International Classification of Headache Disorders, 3rd Edition
 * Each entry includes: diagnostic criteria, clinical features, and navigation triggers
 */

export const HEADACHE_TYPES = {
  // ============================================
  // PART I: PRIMARY HEADACHES
  // ============================================
  
  primary: {
    name: 'Primary Headaches',
    description: 'Headaches that are the disease itself, not symptomatic of another condition',
    
    // CHAPTER 1: Migraine
    migraine: {
      id: 'migraine',
      name: 'Migraine',
      code: '1',
      description: 'A chronic neurological disease characterized by recurrent headaches',
      prevalence: '~12% of population',
      genderRatio: 'F>M (3:1)',
      
      subtypes: {
        '1.1': {
          name: 'Migraine without Aura',
          description: 'Most common migraine type; recurrent headache attacks lasting 4-72 hours',
          
          diagnosticCriteria: {
            A: 'At least 5 attacks fulfilling criteria B-D',
            B: 'Headache attacks lasting 4-72 hours (untreated or unsuccessfully treated)',
            C: 'At least two of: unilateral location, pulsating quality, moderate or severe pain, aggravation by physical activity',
            D: 'At least one of: nausea and/or vomiting, OR photophobia and phonophobia'
          },
          
          clinicalFeatures: {
            pain: {
              location: 'Often unilateral (one side), but can be bilateral',
              quality: 'Pulsating/throbbing',
              intensity: 'Moderate to severe',
              worsening: 'Worsened by routine physical activity'
            },
            associated: ['Nausea', 'Vomiting', 'Photophobia', 'Phonophobia'],
            duration: '4-72 hours untreated',
            frequency: '1-14 days per month'
          },
          
          treatment: {
            acute: ['NSAIDs (ibuprofen, naproxen)', 'Triptans (sumatriptan, rizatriptan)', 'Anti-emetics'],
            preventive: ['Beta-blockers', 'CGRP monoclonal antibodies', 'Topiramate', ' lifestyle modification']
          },
          
          triggers: ['Stress', 'Hormonal changes', 'Certain foods', 'Weather changes', 'Sleep changes', 'Dehydration']
        },
        
        '1.2': {
          name: 'Migraine with Aura',
          description: 'Migraine preceded or accompanied by reversible focal neurological symptoms',
          
          diagnosticCriteria: {
            A: 'At least 2 attacks fulfilling criteria B and C',
            B: 'Aura symptoms fully reversible',
            C: 'At least two of: aura entirely one-sided, gradual development >4 min, aura symptoms last 5-60 min'
          },
          
          auraTypes: {
            visual: ['Scintillation', 'Scotoma', 'Fortification spectrum', 'Visual loss'],
            sensory: ['Tingling', 'Numbness', 'Pins and needles'],
            motor: ['Weakness', ' paralysis'],
            brainstem: ['Dysarthria', 'Ataxia', 'Vertigo', 'Tinnitus']
          },
          
          clinicalFeatures: {
            auraDuration: '5-60 minutes typical',
            sequence: 'Aura → Headache (or without headache)',
            visualAura: 'Most common (90%+)'
          },
          
          treatment: {
            acute: ['Triptans', 'NSAIDs'],
            panic: ['Avoid triptans during aura with motor weakness'],
            preventive: ['Similar to migraine without aura']
          }
        },
        
        '1.3': {
          name: 'Chronic Migraine',
          description: 'Headache ≥15 days/month for >3 months',
          
          diagnosticCriteria: {
            A: 'Headache (migraine or tension-type) ≥15 days/month',
            B: 'For ≥3 months, fulfilling criteria for migraine without aura ≥8 days/month'
          },
          
          riskFactors: ['Medication overuse', 'Depression', 'Anxiety', 'Obesity', 'Sleep disorders'],
          
          treatment: {
            acute: 'Limit to ≤10 days/month',
            preventive: 'Essential - CGRP monoclonal antibodies effective'
          }
        },
        
        '1.4': {
          name: 'Probable Migraine',
          description: 'Missing one criterion for migraine',
          
          diagnosticCriteria: 'Meets all but one criterion for migraine without aura'
        }
      }
    },
    
    // CHAPTER 2: Tension-Type Headache
    tth: {
      id: 'tth',
      name: 'Tension-Type Headache (TTH)',
      code: '2',
      description: 'Most common primary headache; bilateral pressing/tightening quality',
      prevalence: '~40% of population',
      
      subtypes: {
        '2.1': {
          name: 'Infrequent Episodic TTH',
          description: '<1 day/month',
          
          diagnosticCriteria: {
            A: '≥10 episodes, <1 day/month',
            B: '30 min - 7 days',
            C: 'Bilateral, pressing/tightening, mild-moderate',
            D: 'No nausea, may have photophobia or phonophobia'
          }
        },
        
        '2.2': {
          name: 'Frequent Episodic TTH',
          description: '1-14 days/month',
          
          diagnosticCriteria: 'Same as infrequent but 1-14 days/month'
        },
        
        '2.3': {
          name: 'Chronic TTH',
          description: '≥15 days/month',
          
          diagnosticCriteria: '≥15 days/month for >3 months',
          
          clinicalFeatures: {
            pain: {
              location: 'Bilateral',
              quality: 'Pressing/tightening (band-like)',
              intensity: 'Mild to moderate'
            },
            associated: ['Photophobia OR phonophobia', 'No significant nausea'],
            aggravated: 'Not worsened by routine activity'
          },
          
          treatment: {
            acute: ['NSAIDs', 'Acetaminophen'],
            preventive: ['TCAs (amitriptyline)', 'Lifestyle modification']
          }
        }
      },
      
      clinicalFeatures: {
        pain: {
          quality: 'Pressing, tightening, non-pulsating',
          intensity: 'Usually mild to moderate',
          location: 'Bilateral (both sides)',
          worsening: 'NOT aggravated by physical activity'
        },
        associated: ['None or mildphotophobia/phonophobia', 'No nausea/vomiting']
      }
    },
    
    // CHAPTER 3: Trigeminal Autonomic Cephalalgias (TACs)
    tac: {
      id: 'tac',
      name: 'Trigeminal Autonomic Cephalalgias',
      code: '3',
      description: 'Unilateral headache with prominent cranial autonomic symptoms',
      
      subtypes: {
        '3.1': {
          name: 'Cluster Headache',
          description: 'Most severe headache; daily attacks for weeks/months',
          nickname: 'Suicide headache',
          
          diagnosticCriteria: {
            A: '≥5 attacks',
            B: 'Severe unilateral orbital pain, 15-180 min',
            C: 'Ipsilateral autonomic symptoms',
            D: 'Daily to multiple daily attacks'
          },
          
          clinicalFeatures: {
            pain: {
              location: 'Strictly unilateral (always same side)',
              quality: 'Excruciating, burning, stabbing',
              intensity: 'Severe to very severe'
            },
            autonomic: ['Red eye (ipsilateral)', 'Lacrimation', 'Nasal congestion', 'Ptosis', 'Eyelid edema', 'Facial sweating'],
            pattern: 'Strict chronophagy (same time daily)',
            seasonality: 'May occur in seasons'
          },
          
          treatment: {
            acute: ['100% oxygen', 'Sumatriptan injection', 'Zolmitriptan nasal spray'],
            transitional: ['Corticosteroids', 'Greater occipital nerve block'],
            preventive: ['Verapamil', 'Lithium', 'Galcanezumab']
          },
          
          variants: {
            episodic: 'Attack-free periods ≥3 months',
            chronic: 'Remissions <3 months'
          }
        },
        
        '3.2': {
          name: 'Paroxysmal Hemicrania',
          description: 'Short attacks, multiple daily, indomethacin-responsive',
          
          diagnosticCriteria: {
            A: '≥20 attacks',
            B: 'Severe unilateral, 2-30 min',
            C: 'Ipsilateral autonomic symptoms',
            D: '>5 attacks daily',
            E: 'Absolutely abolished by indomethacin'
          },
          
          clinicalFeatures: {
            frequency: 'Often 10-20+ attacks/day',
            response: 'Dramatic response to indomethacin (diagnostic)',
            autonomy: 'Prominent autonomic symptoms'
          },
          
          treatment: {
            acute: 'Indomethacin ( DOC)',
            alternative: 'Other NSAIDs if indomethacin not tolerated'
          }
        },
        
        '3.3': {
          name: 'SUNCT/SUNA',
          code: '3.3',
          description: 'Short-lasting unilateral neuralgiform headaches',
          
          subtypes: {
            '3.3.1': 'SUNCT (with conjunctival injection and tearing)',
            '3.3.2': 'SUNA (with cranial autonomic symptoms)'
          },
          
          diagnosticCriteria: {
            A: '≥20 attacks',
            B: 'Moderate-severe, 1-600 sec',
            C: 'Unilateral, orbital/superior temporal',
            D: '≥3 daily',
            E: 'Not relieved by indomethacin'
          },
          
          clinicalFeatures: {
            pain: 'Electric shock-like, stabbing',
            duration: 'Very brief (seconds)',
            frequency: '3-100+ attacks/day',
            autonomic: 'Prominent lacrimation/red eye'
          },
          
          treatment: {
            acute: 'Limited options',
            preventive: ['Lamotrigine', ' Gabapentin', 'Neuromodulation']
          }
        },
        
        '3.4': {
          name: 'Hemicrania Continua',
          description: 'Continuous unilateral headache, indomethacin-responsive',
          
          diagnosticCriteria: {
            A: 'Continuous unilateral pain',
            B: 'Absence of pain-free periods',
            C: 'Ipsilateral autonomic symptoms (or allodynia)',
            D: 'Completely abolished by indomethacin'
          },
          
          clinicalFeatures: {
            pain: 'Continuous, moderate',
            sideEffects: 'Always same side',
            exacerbations: 'Discrete exacerbations with autonomic features'
          },
          
          treatment: {
            drug: 'Indomethacin (definitive)',
            alternative: 'Celebrex, other NSAIDs'
          }
        }
      }
    },
    
    // CHAPTER 4: Other Primary Headaches
    other: {
      id: 'other-primary',
      name: 'Other Primary Headaches',
      code: '4',
      
      subtypes: {
        '4.1': {
          name: 'Primary Cough Headache',
          description: 'Headache brought on by coughing',
          diagnosticCriteria: 'Sudden onset, brief (<1 min), triggered by coughing',
          treatment: 'Indomethacin'
        },
        
        '4.2': {
          name: 'Primary Exertional Headache',
          description: 'Headache brought on by physical exercise',
          diagnosticCriteria: 'Bilateral, throbbing, during or after exertion',
          treatment: 'Indomethacin prophylactic'
        },
        
        '4.3': {
          name: 'Primary Cold Stimulus Headache',
          description: 'Ice cream headache - cold stimulus',
          treatment: 'Avoid cold foods'
        },
        
        '4.10': {
          name: 'Medication-Overuse Headache',
          code: '8.2',
          description: 'Caused by frequent analgesic use',
          
          diagnosticCriteria: {
            A: 'Headache ≥15 days/month',
            B: 'Regular overuse >3 months',
            C: 'Developed or worsened during overuse'
          },
          
          riskMedications: ['Simple analgesics >15 days/mo', 'Triptans >10 days/mo', 'Opioids >10 days/mo'],
          
          treatment: {
            withdraw: 'Withdraw medication (under supervision)',
            bridge: 'Bridge therapy during withdrawal',
            preventive: 'Start preventive if indicated'
          }
        }
      }
    }
  },
  
  // ============================================
  // PART II: SECONDARY HEADACHES
  // ============================================
  
  secondary: {
    name: 'Secondary Headaches',
    description: 'Headaches caused by underlying medical conditions',
    
    trauma: {
      id: 'trauma',
      name: 'Headache Attributed to Trauma',
      code: '5',
      
      subtypes: {
        '5.1': ' Acute post-traumatic headache',
        '5.2': 'Chronic post-traumatic headache'
      },
      
      diagnosticCriteria: 'Headache within 7 days of head injury, persisting',
      features: ['May have whiplash', 'Can be migraine or TTH-like']
    },
    
    vascular: {
      id: 'vascular',
      name: 'Headache Attributed to Vascular Disorder',
      code: '6',
      
      subtypes: {
        stroke: 'Ischemic stroke (6.1)',
        hemorrhage: 'Intracranial hemorrhage (6.2)',
        arteritis: 'Giant cell arteritis (6.3)',
        aneurysm: 'Unruptured vascular malformation (6.7)'
      },
      
      features: ['New onset', 'Sudden/worst ever', 'Neurological deficits', 'Age >50']
    },
    
    nonVascular: {
      id: 'nonVascular',
      name: 'Non-vascular Intracranial Disorder',
      code: '7',
      
      subtypes: {
        iih: 'Idiopathic intracranial hypertension (7.1)',
        lowPressure: 'Intracranial hypotension (7.2)',
        infection: 'Intracranial infection (7.3)',
        tumor: 'Brain tumor (7.4)'
      }
    },
    
    substance: {
      id: 'substance',
      name: 'Headache Attributed to Substance',
      code: '8',
      
      moh: {
        name: 'Medication-Overuse Headache',
        code: '8.2',
        triggers: ['Simple analgesics', 'Triptans', 'Opioids', 'Combination analgesics'],
        management: ' medication withdrawal'
      }
    },
    
    infection: {
      id: 'infection',
      name: 'Headache Attributed to Infection',
      code: '9',
      
      subtypes: ['Meningitis (9.1)', 'Encephalitis (9.2)', 'Systemic infection (9.3)'],
      
      redFlags: ['Fever', 'Neck stiffness', 'Altered consciousness']
    },
    
    psychiatric: {
      id: 'psychiatric',
      name: 'Psychiatric Disorder',
      code: '12',
      
      subtypes: ['Depression (12.1)', 'Anxiety (12.2)', 'Somatization (12.3)'],
      
      note: 'Usually co-existing, rarely cause isolated headache'
    }
  },
  
  // ============================================
  // PART III: CRANIAL NEURALGIAS
  // ============================================
  
  cranial: {
    id: 'cranial',
    name: 'Cranial Neuralgias',
    description: 'Painful cranial neuropathies and facial pains',
    
    trigeminal: {
      id: 'trigeminal',
      name: 'Trigeminal Neuralgia',
      code: '13.1',
      description: 'Brief electric shock-like pains in trigeminal distribution',
      
      diagnosticCriteria: {
        A: 'Paroxysmal attacks, fraction of second to 2 min',
        B: 'Triggered from trigger zones OR characteristic quality',
        C: 'Not better explained by another disorder'
      },
      
      clinicalFeatures: {
        pain: 'Electric shock-like, lightning brief',
        triggers: ['Touch', 'Chewing', 'Speaking', 'Cold'],
        location: 'V2 or V3 most common'
      },
      
      treatment: {
        firstLine: 'Carbamazepine/Oxcarbazepine',
        procedures: ['Radiofrequency rhizotomy', 'Gamma knife', 'MVD']
      }
    },
    
    glossopharyngeal: {
      id: 'glossopharyngeal',
      name: 'Glossopharyngeal Neuralgia',
      code: '13.2',
      description: 'Pain in tonsillar region, triggered by swallowing',
      treatment: 'Carbamazepine, surgical if refractory'
    },
    
    occipital: {
      id: 'occipital',
      name: 'Occipital Neuralgia',
      code: '13.3',
      description: 'Pain along greater occipital nerve',
      clinicalFeatures: 'Pain from neck to vertex',
      treatment: ' nerve blocks, medications'
    }
  }
};

// ============================================
// RED FLAGS - Require urgent evaluation
// ============================================

export const RED_FLAGS = [
  {
    id: 'thunderclap',
    text: 'Sudden severe "thunderclap" headache (worst of my life)',
    priority: 'emergency',
    description: 'Could indicate subarachnoid hemorrhage',
    ichdCode: '6.2'
  },
  {
    id: 'fever-neck',
    text: 'Fever, neck stiffness, or rash',
    priority: 'emergency',
    description: 'Could indicate meningitis',
    ichdCode: '9.1'
  },
  {
    id: 'neuro-deficit',
    text: 'New neurological symptoms (weakness, speech difficulty, vision changes)',
    priority: 'emergency',
    description: 'Could indicate stroke',
    ichdCode: '6.'
  },
  {
    id: 'altered-consciousness',
    text: 'Altered consciousness, confusion, or seizures',
    priority: 'emergency',
    description: 'Requires immediate evaluation'
  },
  {
    id: 'new-after-50',
    text: 'First or worst headache after age 50',
    priority: 'warning',
    description: 'Requires further investigation (temporal arteritis?)'
  },
  {
    id: 'progressive-worsening',
    text: 'Progressively worsening headache over weeks-months',
    priority: 'warning',
    description: 'Requires neuroimaging'
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
  },
  {
    id: 'immune-compromised',
    text: 'Immunocompromised (HIV, chemotherapy, transplant)',
    priority: 'warning',
    description: 'Higher risk of serious secondary causes'
  }
];

// ============================================
// QUESTION FLOW GUIDANCE
// Each key helps navigate which questions to ask
// ============================================

export const QUESTION_FLOW = {
  // Entry questions for ALL patients
  essential: ['onset', 'frequency', 'duration', 'location', 'quality', 'intensity'],
  
  // Questions asked based on initial answers
  conditional: {
    ifUnilateral: ['autonomicSymptoms', 'worsening'],
    ifBilateral: ['nausea', 'photophobia'],
    ifFrequent: ['medicationUse'],
    ifAura: ['auraSymptoms', 'auraDuration'],
    ifShortDuration: ['indomethacin'],
    ifAutonomic: ['indomethacinTrial']
  },
  
  // Screening for secondary causes
  secondary: ['recentTrauma', 'feverInfection', 'medicationOveruse'],
  
  // ALWAYS screen for red flags
  safety: ['thunderclap', 'fever-neck', 'neuro-deficit', 'altered-consciousness']
};

// ============================================
// RECOMMENDED QUESTIONNAIRE SEQUENCE
// ============================================

export function getRecommendedQuestions(answers) {
  const questions = [];
  
  // Phase 1: Essential questions (for everyone)
  questions.push(...['onset', 'frequency', 'duration', 'location', 'quality', 'intensity']);
  
  // Phase 2: Based on essential responses
  if (answers.location?.includes('unilateral')) {
    questions.push('worsening', 'autonomicSymptoms');
  }
  
  if (answers.quality?.includes('pulsating') || answers.intensity >= 3) {
    questions.push('nausea', 'photophobia', 'phonophobia');
  }
  
  // Phase 3: Conditional questions
  if (answers.frequency >= 10) {
    questions.push('medicationUse');
  }
  
  if (answers.autonomicSymptoms?.length > 0) {
    questions.push('indomethacin');
  }
  
  // Phase 4: Always screen safety
  questions.push(...QUESTION_FLOW.safety);
  
  return questions;
}