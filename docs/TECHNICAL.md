# Headache Diagnostic App - Technical Documentation

## 1. Overview

The Headache Diagnostic App is a comprehensive mobile application implementing the International Classification of Headache Disorders, 3rd edition (ICHD-3). The app guides users through an adaptive diagnostic wizard to classify their headache symptoms and provides educational resources based on official ICHD-3 criteria.

## 2. Technical Architecture

### 2.1 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Vite + React 18 | Web/Desktop app with PWA capability |
| Language | JavaScript (ES6+) | Cross-platform web development |
| Styling | Vanilla CSS + Tailwind | Utility-first styling |
| Routing | TanStack Router | Page-based routing with TypeScript |
| State Management | React Context + useReducer | Diagnostic wizard state and history |
| Data Persistence | localStorage | Browser local storage |
| Build System | Vite | Fast bundling and HMR |

### 2.2 Project Structure

```
gentle-headache-helper/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context for state (diag)
│   ├── data/              # ICHD-3 classification data ✨
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and helpers
│   ├── routes/            # Route components
│   ├── utils/             # Diagnostic engine ✨
│   ├── App.jsx           # Root component
│   └── index.jsx         # Entry point
├── docs/                  # Documentation
└── vite.config.ts       # Vite configuration
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
| Trigeminal Autonomic Cephalalgias | 3 | Cluster (3.1), paroxysmal hemicrania (3.2), SUNCT (3.3.1), SUNA (3.3.2), Hemicrania Continua (3.4) |
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

### 3.3 Diagnostic Criteria Matching

The engine evaluates symptoms using a weighted scoring system:

```javascript
interface DiagnosticResult {
  category: string;   // e.g., "Migraine without Aura"
  code: string;       // ICHD-3 code (e.g., "1.1")
  confidence: number; // 0-100 confidence score
  metCriteria: string[];    // Criteria that were met
  unmetCriteria: string[];   // Criteria that were not met
  recommendations: string[];   // Tailored recommendations
  redFlags: string[];        // Emergency symptoms detected
}
```

## 4. User Interface

### 4.1 Screen Hierarchy

The app follows a tab-based navigation pattern with modal screens for diagnostic flow:

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

**Typography** (System fonts)
- Heading: 24-32px, bold
- Subheading: 18-20px, semibold
- Body: 14-16px, regular
- Caption: 12px, regular

### 4.3 Accessibility

- Text Contrast: Minimum 4.5:1 ratio for normal text
- Touch Targets: Minimum 44x44 points for interactive elements
- Keyboard Navigation: Full keyboard support
- Focus Indicators: Visible focus states

## 5. Data Management

### 5.1 State Management

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

### 5.2 Local Storage

Assessment history is persisted using localStorage:

- Key: `headache_app_assessments`
- Format: JSON array of Assessment objects
- Retention: Indefinite (user can delete manually)

### 5.3 Privacy & Security

- **No Cloud Sync**: All data stored locally on device
- **No User Accounts**: No personal identification required
- **No Tracking**: No analytics or telemetry
- **Educational Only**: Not a medical device

## 6. Diagnostic Wizard Flow

### 6.1 Question Types

| Type | Description | Example |
|------|-------------|---------|
| yes-no | Binary choice | "Do you experience nausea?" |
| multiple-choice | Select one option | "Where is your pain located?" |
| slider | Numeric scale | "Pain intensity (1-5)" |
| multi-select | Select multiple options | "Which symptoms apply?" |

### 6.2 Flow Steps

1. **Onset**: When did headaches start?
2. **Frequency**: How often do they occur?
3. **Duration**: How long do they last?
4. **Location**: Where is the pain?
5. **Quality**: What does the pain feel like?
6. **Intensity**: How severe is the pain?
7. **Associated Symptoms**: Other symptoms?
8. **Red Flags**: Concerning symptoms?

## 7. Medical Content

### 7.1 Included Glossary

- **Aura**: Visual, sensory, or motor symptoms preceding headache
- **Photophobia/Phonophobia**: Sensitivity to light/sound
- **Allodynia**: Pain from normally non-painful stimuli
- **Pulsating/Pressing**: Pain quality descriptors
- **Autonomic symptoms**: Lacrimation, ptosis, nasal congestion

### 7.2 Red Flags (Requires Immediate Attention)

- Sudden severe "thunderclap" headache
- Fever, neck stiffness, or rash
- New neurological symptoms
- Altered consciousness
- Progressive worsening >4 weeks

## 8. Medical Disclaimer

> This application is for educational and informational purposes only. It does not provide medical advice, diagnosis, or treatment. The results are not a substitute for professional medical evaluation. Always consult with a qualified healthcare provider for proper diagnosis and management.

## 9. Deployment

### Development
```bash
bun install
bun run dev      # Start dev server
bun run build     # Production build
```

### Platform Requirements
- Web: Modern browsers (Chrome, Safari, Firefox, Edge)
- Progressive Web App capability for mobile

## 10. References

- ICHD-3: https://ichd-3.org/
- International Headache Society: https://www.ihs-headache.org/

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-28