# Headache Diagnostic App - Technical Documentation

## 1. Overview

The Headache Diagnostic App is a comprehensive mobile application implementing the International Classification of Headache Disorders, 3rd edition (ICHD-3). The app guides users through an adaptive diagnostic wizard to classify their headache symptoms and provides educational resources based on official ICHD-3 criteria.

## 2. Technical Architecture

### 2.1 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Vite + React 18 | Web/Desktop app with PWA capability |
| Language | JavaScript (ES6+) | Cross-platform web development |
| Styling | Tailwind CSS | Utility-first styling |
| Routing | TanStack Router | Page-based routing |
| State Management | React Context + useReducer | Diagnostic wizard state and history |
| Data Persistence | localStorage | Browser local storage |
| Build System | Vite | Fast bundling and HMR |

### 2.2 Project Structure

```
gentle-headache-helper/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context for state (diag)
│   ├── data/              # ICHD-3 classification data
│   ├── hooks/             # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   ├── routes/           # Route components
│   ├── utils/            # Diagnostic engine
│   └── ...
├── docs/                 # Documentation
└── vite.config.ts        # Vite configuration
```

## 3. Diagnostic Engine

### 3.1 Core Logic

The diagnostic engine implements a rule-based classification system that evaluates user responses against ICHD-3 diagnostic criteria:

- **Processes Symptoms**: Collects user input through adaptive questioning
- **Evaluates Criteria**: Matches symptoms against diagnostic criteria for each headache type
- **Scores Confidence**: Calculates confidence percentage based on criteria fulfillment
- **Detects Red Flags**: Identifies emergency symptoms requiring immediate medical attention
- **Generates Results**: Produces detailed classification with recommendations

### 3.2 Classification Coverage

#### Part I: Primary Headaches

| Category | Code | Coverage |
|----------|------|----------|
| Migraine | 1 | Without aura (1.1), with aura (1.2), chronic (1.5.1) |
| Tension-Type Headache | 2 | Infrequent (2.1), frequent (2.2), chronic (2.3) |
| Trigeminal Autonomic Cephalalgias | 3 | Cluster (3.1), paroxysmal hemicrania (3.2), SUNCT (3.3.1), SUNA (3.3.2), HC (3.4) |
| Other Primary Headaches | 4 | Medication-overuse (4.10), primary cough (4.2), exertional (4.3) |

#### Part II: Secondary Headaches

| Category | Code | Coverage |
|----------|------|----------|
| Trauma/Injury | 5 | Head/neck trauma, acute and persistent |
| Vascular Disorder | 6 | Stroke, aneurysm, temporal arteritis |
| Non-vascular Intracranial | 7 | IIH, CSF leak, brain tumor |
| Substance/Withdrawal | 8 | MOH, alcohol, carbon monoxide |
| Infection | 9 | Meningitis, systemic infection |
| Homoeostasis Disorder | 10 | Hypoxia, sleep apnea, dialysis |
| Cranial Structure Disorder | 11 | Sinusitis, TMJ, dental, eye, ear |
| Psychiatric Disorder | 12 | Depression, anxiety, somatization |

#### Part III: Cranial Neuropathies & Facial Pains

| Category | Code | Coverage |
|----------|------|----------|
| Trigeminal Neuralgia | 13.1 | Classical, secondary, idiopathic |
| Glossopharyngeal Neuralgia | 13.2 | Idiopathic and secondary |
| Occipital Neuralgia | 13.3 | Greater and lesser occipital nerves |
| Post-herpetic Neuralgia | 13.4 | Following herpes zoster infection |

### 3.3 Diagnostic Result Interface

```javascript
interface DiagnosticResult {
  category: string;   // e.g., "Migraine without Aura"
  code: string;       // ICHD-3 code (e.g., "1.1")
  confidence: number; // 0-100 confidence score
  metCriteria: string[];   // Criteria that were met
  unmetCriteria: string[];  // Criteria that were not met
  recommendations: string[]; // Tailored recommendations
  redFlags: string[];       // Emergency symptoms detected
}
```

## 4. User Interface

### 4.1 Screen Hierarchy

- **Home Tab**: Dashboard with quick access to new diagnosis and recent results
- **New Assessment**: Multi-step questionnaire with progress tracking
- **History Tab**: List of all past assessments
- **Results Screen**: Detailed classification and recommendations

### 4.2 Design System

**Color Palette**
- Primary: `#0a7ea4` (Medical blue)
- Background: `#ffffff` (Light) / `#151718` (Dark)
- Surface: `#f5f5f5` (Light) / `#1e2022` (Dark)
- Success: `#22C55E` (Green)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)

**Typography**
- Heading: 24-32px, bold
- Subheading: 18-20px, semibold
- Body: 14-16px, regular
- Caption: 12px, regular

### 4.3 Components

- **Onboarding**: Welcome message and medical disclaimer
- **Dashboard**: Introduction to app features
- **Diagnostic Wizard**: Multi-step questionnaire with progress tracking
- **Results**: Classification with confidence score and recommendations
- **History**: Timeline of all past assessments
- **Glossary**: Searchable medical terminology

## 5. User Flows

### 5.1 First-Time User
1. **Onboarding**: Welcome message and medical disclaimer
2. **Main Dashboard**: Introduction to app features
3. **Start Diagnostic**: User initiates new assessment

### 5.2 Diagnostic Assessment Flow
1. Initial Questions: Frequency, duration, and onset of headaches
2. Pain Characteristics: Location, quality (pulsating/pressing), intensity
3. Associated Symptoms: Nausea, vomiting, photophobia, phonophobia
4. Aura Symptoms (if applicable): Visual, sensory, motor disturbances
5. Autonomic Symptoms (if applicable): Eye symptoms, sweating, nasal symptoms
6. Contextual Factors: Triggers, timing, recent trauma, infections, medications
7. Result Screen: Classification with confidence score and recommendations

### 5.3 Post-Assessment
1. View Results: Detailed breakdown of classification and criteria
2. Save Assessment: Automatically saved with timestamp
3. Share or Export: Option to export for healthcare provider
4. New Assessment: Start another diagnostic or return to dashboard

### 5.4 History & Reference
1. View History: Browse all past assessments
2. Compare Results: View trends over time
3. Access Glossary: Look up medical terms

## 6. Key Design Principles

### 6.1 Medical Accuracy
- All diagnostic criteria directly from ICHD-3 official classification
- Regular updates to reflect new evidence and criteria changes
- Consultation with medical experts in headache disorders

### 6.2 User Experience
- Clear, non-technical language while maintaining medical accuracy
- Progressive disclosure: Show only relevant questions based on answers
- Visual feedback: Progress indicators, confidence scores, color-coded results
- Accessibility: Large text, high contrast, keyboard navigation

### 6.3 Safety & Responsibility
- Prominent emergency warnings for red flag symptoms
- Clear medical disclaimer on every result
- Encouragement to seek professional medical evaluation
- No prescription recommendations or specific medication advice

## 7. Success Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Diagnostic Accuracy | >85% alignment with ICHD-3 | Ensures clinical validity |
| User Completion Rate | >80% complete full wizard | Indicates usability |
| Assessment Saved | 100% of completed assessments | Enables history tracking |
| Emergency Detection | 100% of red flag symptoms flagged | Ensures safety |
| Time to Result | <5 minutes average | Ensures reasonable UX |

## 8. Scope Limitations

### Out of Scope (Future Enhancements)
- Real-time telemedicine consultations
- Prescription management or medication recommendations
- Integration with electronic health records (EHR)
- Wearable device integration
- Predictive analytics or machine learning
- Multi-language support (initial release: English only)

### Assumptions
- Users have basic understanding of their symptoms
- App is used for educational and preliminary assessment only
- Healthcare provider consultation is always recommended

## 9. Compliance & Regulatory

- **Medical Disclaimer**: Prominently displayed throughout app
- **Privacy**: No collection of personally identifiable health information
- **Data Storage**: All data stored locally on device
- **Accessibility**: WCAG 2.1 AA compliance

## 10. Data Management

### 10.1 State Management

```javascript
interface DiagnosticState {
  wizardState: {
    currentStep: number;
    answers: Record<string, any>;
    result: DiagnosticResult | null;
  };
  assessmentHistory: Assessment[];
}
```

### 10.2 Assessment Records

```javascript
interface Assessment {
  id: string;
  createdAt: Date;
  result: DiagnosticResult;
  symptoms: Record<string, any>;
}
```

### 10.3 Local Storage

- **Key**: `headache_app_assessments`
- **Format**: JSON array of Assessment objects

## 11. Glossary

### Symptom Terms
- **Aura**: Visual, sensory, or motor symptoms preceding headache
- **Photophobia**: Sensitivity to light
- **Phonophobia**: Sensitivity to sound
- **Allodynia**: Pain from normally non-painful stimuli
- **Pulsating**: Throbbing pain quality
- **Pressing/Tightening**: Pressure-like pain quality
- **Unilateral**: One-sided pain
- **Bilateral**: Both sides

### Autonomic Symptoms
- **Lacrimation**: Eye watering
- **Miosis**: Pupil constriction
- **Ptosis**: Eyelid drooping
- **Conjunctival Injection**: Red eye
- **Nasal Congestion**: Blocked nose
- **Rhinorrhea**: Runny nose
- **Facial Sweating**: Sweating on face

### Temporal Classifications
- **Chronic**: Occurring ≥15 days/month
- **Episodic**: Occurring <15 days/month
- **Acute**: Single episode
- **Persistent**: Ongoing symptoms

## 12. Red Flags

These symptoms require immediate medical attention:

- Sudden severe "thunderclap" headache
- Fever, neck stiffness, or rash
- First headache after age 50
- New neurological symptoms (weakness, speech difficulty)
- Altered consciousness or confusion
- Progressive worsening >4 weeks
- History of cancer with new headache
- New headache during pregnancy/postpartum

## 13. Deployment

```bash
# Install dependencies
bun install

# Development
bun run dev

# Production build
bun run build
```

**Platform Requirements**: Modern browsers (Chrome, Safari, Firefox, Edge)

## 14. Future Enhancements

- Backend Sync: Cross-device assessment synchronization
- Advanced Analytics: Trend detection and pattern analysis
- Wearable Integration: Heart rate and activity tracking
- Multi-language Support: Localization for international users
- Healthcare Provider Integration: Secure sharing with doctors

---

## 15. References

- ICHD-3: https://ichd-3.org/
- International Headache Society: https://www.ihs-headache.org/

---

**Disclaimer**: This application is for educational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.

---

*Document Version: 1.0*  
*Last Updated: 2026-05-28*