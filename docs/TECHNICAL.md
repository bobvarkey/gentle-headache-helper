# Headache Diagnostic App - Technical Documentation

## 1. Overview

The Headache Diagnostic App is a comprehensive mobile application implementing the International Classification of Headache Disorders, 3rd edition (ICHD-3). The app guides users through an adaptive diagnostic wizard to classify their headache symptoms and provides educational resources based on official ICHD-3 criteria.

## 2. Technical Architecture

### 2.1 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | Expo / React Native 0.81 | Cross-platform iOS and Android development |
| Language | TypeScript 5.9 | Type-safe development with static analysis |
| Styling | NativeWind 4 (Tailwind CSS) | Utility-first styling for React Native |
| Navigation | Expo Router 6 | File-based routing and deep linking |
| State Management | React Context + useReducer | Diagnostic wizard state and history |
| Data Persistence | AsyncStorage | Local storage of assessment history |
| Build System | Metro Bundler | React Native module bundling |
| Testing | Vitest | Unit and integration testing |

### 2.2 Project Structure

```
headache-eval/
├── app/
│   ├── _layout.tsx         # Root layout with providers
│   ├── (tabs)/
│   │   ├── _layout.tsx    # Tab navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── history.tsx    # Assessment history
│   │   └── results.tsx    # Result display
│   ├── onboarding.tsx      # Onboarding screen
│   └── diagnostic.tsx     # Diagnostic wizard
├── lib/
│   ├── diagnostic-engine.ts # Core classification logic
│   ├── diagnostic-context.tsx # State management
│   ├── wizard-steps.ts    # Question definitions
│   ├── glossary.ts       # Medical terminology
│   ├── tacs.ts         # TAC classifications
│   ├── secondary-headaches.ts # Secondary headache types
│   └── types.ts        # TypeScript interfaces
├── components/
│   ├── screen-container.tsx # SafeArea wrapper
│   └── ui/
│       └── icon-symbol.tsx # Icon mapping
├── assets/
│   └── images/         # App icons and splash
└── theme.config.js     # Color palette
```

## 3. Diagnostic Engine

### 3.1 Core Logic

The diagnostic engine implements a rule-based classification system that evaluates user responses against ICHD-3 diagnostic criteria. The engine:

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
| Trigeminal Autonomic Cephalalgias | 3 | Cluster (3.1), paroxysmal hemicrania (3.2), SUNCT (3.3.1), SUNA (3.3.2), hemicrania continua (4.8) |
| Other Primary Headaches | 4 | Medication-overuse headache (4.1), primary cough headache (4.2), primary exertional headache (4.3) |

#### Part II: Secondary Headaches

| Category | Code | Coverage |
|----------|------|----------|
| Trauma/Injury | 5 | Head/neck trauma, acute and persistent |
| Vascular Disorder | 6 | Arterial dissection, aneurysm, arteritis |
| Non-vascular Intracranial | 7 | Increased/decreased ICP, brain tumor, structural disorders |
| Substance/Withdrawal | 8 | Medication-overuse, substance exposure, withdrawal |
| Infection | 9 | Intracranial (meningitis, encephalitis), systemic |
| Homoeostasis Disorder | 10 | Hypoxia, hypercapnia, sleep apnea, dialysis |
| Cranial Structure Disorder | 11 | Sinusitis, TMJ, dental, eye strain, ear disorders |
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

```typescript
interface DiagnosticResult {
  category: string;      // e.g., "Migraine without Aura"
  code: string;          // ICHD-3 code (e.g., "1.1")
  confidence: number;    // 0-1 confidence score
  metCriteria: string[];  // Criteria that were met
  unmetCriteria: string[]; // Criteria that were not met
  recommendations: string[]; // Tailored recommendations
  redFlags: string[];    // Emergency symptoms detected
}
```

## 4. User Interface

### 4.1 Screen Hierarchy

The app follows a tab-based navigation pattern with modal screens for diagnostic flow:

- **Tab Navigation (Bottom Tabs)**
  - Home: Dashboard with quick access to new diagnosis and recent results
  - History: List of all past assessments
  - Settings: (Future) App preferences and settings

- **Modal Screens**
  - Onboarding: First-time user introduction and disclaimer
  - Diagnostic Wizard: Multi-step questionnaire with progress tracking
  - Results: Detailed classification and recommendations

### 4.2 Design System

- **Color Palette**
  - Primary: `#0a7ea4` (Medical blue)
  - Background: `#ffffff` (Light) / `#151718` (Dark)
  - Surface: `#f5f5f5` (Light) / `#1e2022` (Dark)
  - Foreground: `#11181C` (Light) / `#ECEDEE` (Dark)
  - Success: `#22C55E` (Green)
  - Warning: `#F59E0B` (Amber)
  - Error: `#EF4444` (Red)

- **Typography**
  - Heading: 32px, bold (text-4xl)
  - Subheading: 24px, semibold (text-2xl)
  - Body: 16px, regular (text-base)
  - Small: 14px, regular (text-sm)

- **Spacing & Layout**
  - Padding: 16px (p-4), 24px (p-6)
  - Gap: 8px (gap-2), 16px (gap-4)
  - Border Radius: 8px (rounded-lg), 12px (rounded-xl)

### 4.3 Accessibility

The app follows WCAG 2.1 AA accessibility standards:

- Text Contrast: Minimum 4.5:1 ratio for normal text
- Touch Targets: Minimum 44x44 points for interactive elements
- Text Sizing: Supports system font scaling up to 200%
- Color Independence: Information not conveyed by color alone
- Keyboard Navigation: Full keyboard support on all platforms

## 5. Data Management

### 5.1 State Management

```typescript
interface DiagnosticState {
  wizardState: {
    currentStep: number;
    answers: Record<string, any>;
    result: DiagnosticResult | null;
  };
  assessmentHistory: Assessment[];
}

interface Assessment {
  id: string;
  createdAt: Date;
  result: DiagnosticResult;
  symptoms: Record<string, any>;
}
```

### 5.2 Local Storage

Assessment history is persisted using AsyncStorage:

- **Storage Key**: `headache_app_assessments`
- **Data Format**: JSON array of Assessment objects
- **Retention**: Indefinite (user can delete manually)
- **Sync**: Optional backend sync for cross-device access

### 5.3 Privacy & Security

- No Cloud Sync (default): All data stored locally on device
- No User Accounts (default): No personal identification required
- No Tracking: No analytics or telemetry
- Encrypted Storage: Uses device-level encryption for sensitive data

## 6. Diagnostic Wizard Flow

### 6.1 Question Types

| Type | Description | Example |
|------|-------------|---------|
| yes-no | Binary choice | "Do you experience nausea?" |
| multiple-choice | Select one option | "Where is your pain located?" |
| slider | Numeric scale | "Pain intensity (0-10)" |
| multi-select | Select multiple options | "Which symptoms do you experience?" |

### 6.2 Conditional Logic

Questions are conditionally displayed based on previous answers:

```typescript
interface WizardStep {
  id: string;
  title: string;
  description: string;
  questionType: "yes-no" | "multiple-choice" | "slider" | "multi-select";
  field: string;
  options?: Option[];
  conditional?: (answers: Record<string, any>) => boolean;
  tooltip?: string;
}
```

### 6.3 Adaptive Questioning

The wizard adapts its flow based on user responses:

1. Initial Assessment: Frequency, duration, onset
2. Pain Characteristics: Location, quality, intensity
3. Associated Symptoms: Nausea, photophobia, phonophobia
4. Aura Symptoms (if applicable): Visual, sensory, motor
5. Autonomic Symptoms (if applicable): Eye, nasal, sweating
6. Contextual Factors: Triggers, recent events, medications

## 7. Medical Content

### 7.1 Glossary

The app includes a comprehensive glossary of medical terms used in diagnosis:

- **Symptom Terms**: Aura, photophobia, phonophobia, allodynia, hyperalgesia, scintillation, scotoma, fortification spectrum, prodrome, postdrome, premonitory symptoms

- **Characteristic Terms**: Pulsating, pressing/tightening, unilateral, bilateral, lancinating, stabbing, electric shock-like

- **Diagnostic Terms**: Chronic, episodic, acute, persistent, attack of headache, cluster period, remission period

- **Autonomic Symptoms**: Lacrimation, miosis, ptosis, conjunctival injection, nasal congestion, rhinorrhoea, sweating, flushing

### 7.2 Educational Resources

Each headache classification includes:

- Description: What the condition is and how common it is
- Diagnostic Criteria: Full ICHD-3 criteria
- Symptoms: Typical presentation
- Triggers: Common triggers (if applicable)
- Treatment Overview: General information about treatment approaches
- When to Seek Help: Red flags and emergency symptoms

## 8. Error Handling & Validation

### 8.1 Input Validation

- Required Fields: All questions must be answered before proceeding
- Range Validation: Numeric inputs validated against expected ranges
- Option Validation: Selected options must be from defined list

### 8.2 Error States

- Network Errors: Graceful handling (app works offline)
- Storage Errors: Fallback to in-memory storage
- Invalid Data: Clear error messages with recovery options

## 9. Testing

### 9.1 Test Coverage

- Unit Tests: Diagnostic engine logic and criteria matching
- Integration Tests: Wizard flow and state management
- UI Tests: Screen rendering and interaction

### 9.2 Test Framework

The app uses Vitest for testing:

```bash
npm run test      # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## 10. Performance Optimization

### 10.1 Bundle Size

- Target: <5MB (uncompressed)
- Optimization: Tree-shaking, code splitting, lazy loading

### 10.2 Runtime Performance

- FlatList: Used for history list instead of ScrollView
- Memoization: useMemo for expensive calculations
- Debouncing: Input debouncing for search/filter

### 10.3 Memory Management

- Cleanup: Proper cleanup of event listeners and subscriptions
- Image Optimization: Compressed images and appropriate sizing
- State Cleanup: Diagnostic state reset after assessment completion

## 11. Deployment

### 11.1 Build Process

```bash
# Development
npm run dev

# Production
npm run build
eas build --platform ios
eas build --platform android
```

### 11.2 Platform Requirements

- iOS: 14.0 or later
- Android: API level 24 (Android 7.0) or later
- Web: Modern browsers (Chrome, Safari, Firefox)

### 11.3 Distribution

- iOS: Apple App Store
- Android: Google Play Store
- Web: Progressive Web App (optional)

## 12. Maintenance & Updates

### 12.1 Version Management

- Semantic Versioning: MAJOR.MINOR.PATCH
- ICHD-3 Updates: Tracked separately from app updates
- Changelog: Maintained in CHANGELOG.md

### 12.2 Bug Fixes & Enhancements

- Bug Reports: Tracked in issue system
- Feature Requests: Community feedback considered
- Regular Updates: Monthly updates with improvements

## 13. Legal & Compliance

### 13.1 Medical Disclaimer

The app displays a prominent disclaimer stating:

> This application is for educational and informational purposes only. It does not provide medical advice, diagnosis, or treatment. The results are not a substitute for professional medical evaluation. Always consult with a qualified healthcare provider for proper diagnosis and management of your headaches.

### 13.2 Data Privacy

- GDPR Compliance: No personal data collection
- HIPAA Considerations: Not a medical device; educational only
- Terms of Service: Clear terms regarding app usage

## 14. Future Enhancements

- Backend Sync: Cross-device assessment synchronization
- Advanced Analytics: Trend detection and pattern analysis
- Wearable Integration: Heart rate and activity tracking
- Multi-language Support: Localization for international users
- Healthcare Provider Integration: Secure sharing with doctors
- Medication Tracking: Integration with medication management
- Predictive Analytics: Machine learning for pattern recognition

## 15. References

- ICHD-3: https://ichd-3.org/
- International Headache Society: https://www.ihs-headache.org/
- WHO Fascicle on Headache: https://ichd-3.org/who-fascicle-on-headache/

---

**Disclaimer**: This application is for educational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment of headaches.

---

*Document Version: 1.0*  
*Last Updated: 2026-05-28*