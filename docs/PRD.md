# Product Requirements Document (PRD): Headache Diagnostic App (ICHD-3)

## 1. Project Overview

The Headache Diagnostic App is a mobile application designed to help users identify potential headache disorders based on the International Classification of Headache Disorders, 3rd edition (ICHD-3). The app provides a comprehensive diagnostic wizard covering primary headaches, secondary headaches, and cranial neuropathies, along with a history of assessments and educational resources.

**Scope**: This app implements diagnostic criteria from ICHD-3 Parts I, II, and III, providing evidence-based classification and guidance for users experiencing headaches.

---

## 2. Target Audience

- Individuals experiencing recurrent headaches seeking a preliminary understanding of their condition
- Healthcare professionals looking for a quick reference tool based on ICHD-3
- Medical students and residents studying headache disorders
- Patients preparing for medical consultations with detailed symptom documentation

---

## 3. Core Features

### 3.1 Comprehensive Diagnostic Wizard

#### 3.1.1 Primary Headaches (Part I)

- **Migraine** (with and without aura)
  - Visual, sensory, motor, and brainstem aura symptoms
  - Photophobia, phonophobia, nausea/vomiting
  - Attack duration and frequency

- **Tension-Type Headache (TTH)**
  - Bilateral pressing/tightening quality
  - Mild to moderate intensity
  - Duration: 30 minutes to 7 days

- **Trigeminal Autonomic Cephalalgias (TACs)**
  - Cluster Headache: Episodic and chronic variants
  - Paroxysmal Hemicrania
  - SUNCT (Short-lasting Unilateral Neuralgiform Headache with Conjunctival Injection and Tearing)
  - SUNA (Short-lasting Unilateral Neuralgiform Headache with Cranial Autonomic Symptoms)
  - Hemicrania Continua

- **Other Primary Headaches**
  - Medication-overuse headache
  - Primary cough headache
  - Primary exertional headache

#### 3.1.2 Secondary Headaches (Part II)

- Headache Attributed to Trauma or Injury (Head/Neck)
- Headache Attributed to Cranial or Cervical Vascular Disorder
- Headache Attributed to Non-vascular Intracranial Disorder
- Headache Attributed to Substance or Its Withdrawal
- Headache Attributed to Infection (Intracranial and systemic)
- Headache Attributed to Disorder of Homoeostasis
- Headache Attributed to Cranium, Neck, Eyes, Ears, Nose, Sinuses, Teeth, or Mouth
- Headache Attributed to Psychiatric Disorder

#### 3.1.3 Cranial Neuropathies & Facial Pains (Part III)

- Trigeminal Neuralgia (Classical, secondary, idiopathic)
- Glossopharyngeal Neuralgia
- Occipital Neuralgia
- Post-herpetic Neuralgia

---

### 3.2 Intelligent Diagnostic Engine

- **Adaptive Questioning**: The wizard adapts based on user responses, asking relevant follow-up questions
- **Criteria Matching**: Real-time evaluation of user inputs against ICHD-3 diagnostic criteria
- **Confidence Scoring**: Provides a confidence percentage based on how well symptoms match criteria
- **Red Flag Detection**: Identifies emergency symptoms requiring immediate medical attention
- **Differential Diagnosis**: Suggests multiple possible classifications when criteria overlap

---

### 3.3 Result Display & Interpretation

- **Classification Result**: Primary diagnosis with ICHD-3 code
- **Criteria Breakdown**: Shows which diagnostic criteria were met and which were not
- **Confidence Level**: Visual indicator of diagnostic confidence
- **Recommendations**: Tailored advice based on classification
- **Emergency Alerts**: Prominent warnings if emergency red flags are detected
- **Medical Disclaimer**: Clear statement that results are for educational purposes only

---

### 3.4 Assessment History & Tracking

- **Saved Assessments**: Users can view all previous diagnostic results
- **Timeline View**: Visual timeline of assessments over time
- **Comparison**: Ability to compare results from different assessments
- **Export**: Option to export assessment results for sharing with healthcare providers
- **Deletion**: Users can delete individual assessments

---

### 3.5 Educational Content

#### 3.5.1 ICHD-3 Reference Library

- **Glossary**: Comprehensive definitions of medical terms
  - Aura, photophobia, phonophobia, allodynia, pulsating, pressing, unilateral
  - Autonomic symptoms: lacrimation, miosis, ptosis, conjunctival injection
  - Temporal classifications: chronic, episodic, acute, persistent

#### 3.5.2 Headache Information

- Condition Summaries: Detailed descriptions of each headache type
- Symptom Explanations: What specific symptoms mean and why they matter
- Treatment Overview: General information about common treatment approaches
- When to Seek Help: Guidance on emergency symptoms and when to contact healthcare providers

#### 3.5.3 Medical Disclaimer

- Clear statement that the app is for educational purposes only
- Emphasis that diagnosis must be confirmed by a qualified healthcare provider
- Encouragement to seek professional medical evaluation

---

## 4. Technical Requirements

### 4.1 Architecture
- **Framework**: Vite + React 18 (Web with PWA capability)
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Database**: localStorage for history
- **Language**: JavaScript/TypeScript

### 4.2 Data Structure
- **Diagnostic Engine**: Rule-based system matching symptoms to ICHD-3 criteria
- **Wizard Steps**: Modular question definitions with conditional logic
- **Assessment Records**: Structured storage of user responses and results

### 4.3 Performance & Accessibility
- **Responsive Design**: Optimized for mobile and desktop
- **Accessibility**: WCAG 2.1 AA compliance
- **Offline Support**: Full functionality without internet connection

---

## 5. User Flow

### 5.1 First-Time User
1. Onboarding Screen: Welcome message and medical disclaimer
2. Main Dashboard: Introduction to app features
3. Start Diagnostic: User initiates new assessment

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

---

## 6. Key Design Principles

### 6.1 Medical Accuracy
- All diagnostic criteria directly from ICHD-3 official classification
- Regular updates to reflect new evidence and criteria changes
- Consultation with medical experts in headache disorders

### 6.2 User Experience
- Clear, non-technical language while maintaining medical accuracy
- Progressive disclosure: Show only relevant questions based on answers
- Visual feedback: Progress indicators, confidence scores, color-coded results

### 6.3 Safety & Responsibility
- Prominent emergency warnings for red flag symptoms
- Clear medical disclaimer on every result
- Encouragement to seek professional medical evaluation
- No prescription recommendations or specific medication advice

---

## 7. Success Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| Diagnostic Accuracy | >85% alignment with ICHD-3 | Ensures clinical validity |
| User Completion Rate | >80% complete full wizard | Indicates usability |
| Assessment Saved | 100% of completed assessments | Enables history tracking |
| Emergency Detection | 100% of red flag symptoms flagged | Ensures safety |
| Time to Result | <5 minutes average | Ensures reasonable UX |

---

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

---

## 9. Compliance & Regulatory

- **Medical Disclaimer**: Prominently displayed throughout app
- **Privacy**: No collection of personally identifiable health information
- **Data Storage**: All data stored locally on device
- **Accessibility**: WCAG 2.1 AA compliance

---

## 10. Timeline & Milestones

| Phase | Deliverables | Duration |
|-------|--------------|----------|
| Phase 1 | Core diagnostic engine, primary headaches | Week 1-2 |
| Phase 2 | Secondary headaches, TACs, UI screens | Week 2-3 |
| Phase 3 | History tracking, glossary, refinement | Week 3-4 |
| Phase 4 | Testing, documentation, deployment | Week 4-5 |

---

## 11. Future Enhancements

- Integration with headache tracking wearables
- Personalized treatment recommendations based on classification
- Community features for peer support
- Integration with healthcare provider systems
- Advanced analytics and trend detection
- Multi-language support
- Backend sync for cross-device access

---

## 12. References

- ICHD-3: https://ichd-3.org/
- International Headache Society: https://www.ihs-headache.org/

---

**Disclaimer**: This application is for educational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.

---

*Document Version: 1.0*  
*Last Updated: 2026-05-28*