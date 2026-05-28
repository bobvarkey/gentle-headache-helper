/**
 * Main App - Headache Diagnostic Application
 * Based on ICHD-3 Classification
 */

import './App.css';
import { useState } from 'react';
import DiagnosticWizard from './screens/DiagnosticWizard';
import { DiagnosticProvider } from './context/DiagnosticContext';

function App() {
  const [view, setView] = useState('welcome');
  
  return (
    <DiagnosticProvider>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="logo-container">
            <span className="logo-icon">🧠</span>
            <div>
              <h1 className="logo-title">Headache Diagnostic</h1>
              <p className="logo-subtitle">Based on ICHD-3 Criteria</p>
            </div>
          </div>
        </header>
        
        {/* Disclaimer Banner */}
        <div className="disclaimer-banner">
          ⚕️ Educational tool only. Not medical advice. 
        </div>
        
        {/* Main Content */}
        <main className="main-content">
          {view === 'welcome' && (
            <WelcomeScreen onStart={() => setView('wizard')} />
          )}
          {view === 'wizard' && <DiagnosticWizard />}
          {view === 'history' && <HistoryScreen onBack={() => setView('welcome')} />}
        </main>
        
        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <button className="nav-button" onClick={() => setView('welcome')}>
            🏠 Home
          </button>
          <button className="nav-button" onClick={() => setView('wizard')}>
            ➕ New Assessment
          </button>
          <button className="nav-button" onClick={() => setView('history')}>
            📋 History
          </button>
        </nav>
      </div>
    </DiagnosticProvider>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-container">
      <div className="feature-card">
        <h2>Welcome to Headache Diagnostic</h2>
        <p className="feature-desc">
          This app helps identify potential headache disorders based on the 
          International Classification of Headache Disorders, 3rd Edition (ICHD-3).
        </p>
        
        <h3>What it covers:</h3>
        <ul className="coverage-list">
          <li>Primary Headaches (Migraine, Tension-Type, Cluster)</li>
          <li>Secondary Headaches</li>
          <li>Cranial Neuralgias</li>
          <li>Red Flag Detection</li>
        </ul>
        
        <button className="start-button" onClick={onStart}>
          Start Diagnostic Assessment →
        </button>
      </div>
      
      <div className="info-card">
        <h3>How it works:</h3>
        <ol className="how-it-works">
          <li>Answer questions about your headache symptoms</li>
          <li>Get evaluated against ICHD-3 diagnostic criteria</li>
          <li>Receive a preliminary classification with confidence score</li>
          <li>Get recommendations and know when to seek care</li>
        </ol>
      </div>
    </div>
  );
}

function HistoryScreen({ onBack }) {
  return (
    <div className="history-container">
      <button className="back-button" onClick={onBack}>
        ← Back to Home
      </button>
      <h2>Assessment History</h2>
      <div className="empty-history">
        <p>📋 No assessments yet</p>
        <p className="empty-hint">Complete your first diagnostic assessment.</p>
      </div>
    </div>
  );
}

export default App;