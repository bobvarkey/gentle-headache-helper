import { describe, it, expect } from 'vitest';
import { runFullDiagnosis, getScreeningQuestions } from '../utils/diagnosticEngine';

describe('Diagnostic Engine', () => {
  it('detects migraine', () => {
    const r = runFullDiagnosis({
      onset: 'year-plus',
      duration: '24-72hrs',
      frequency: 'few-month',
      location: ['unilateral-temporal'],
      quality: ['pulsating'],
      intensity: 3,
      side_consistency: 'sometimes-shifts',
      onset_speed: 'hours',
      physical_activity: true,
      nausea_vomiting: 'vomiting',
      photophobia: true,
      phonophobia: true,
      attackCount: 'Many (20+)',
    });
    expect(r.topResult?.id).toBe('migraine');
    expect(r.topResult?.confidence).toBeGreaterThanOrEqual(60);
  });

  it('detects cluster headache', () => {
    const r = runFullDiagnosis({
      duration: '15-30min',
      frequency: 'multiple-daily',
      location: ['unilateral-ocular'],
      quality: ['boring', 'burning'],
      intensity: 4,
      side_consistency: 'always-same',
      onset_speed: 'minutes',
      autonomic: ['lacrimation', 'nasalCongestion'],
      restlessness: true,
      attackCount: 'Many (20+)',
    });
    expect(r.topResult?.id).toBe('cluster-headache');
    expect(r.topResult?.confidence).toBeGreaterThanOrEqual(70);
  });

  it('flags thunderclap as emergency', () => {
    const r = runFullDiagnosis({
      onset_speed: 'seconds',
      worst_headache: true,
    });
    expect(r.hasEmergency).toBe(true);
  });

  it('detects tension-type headache', () => {
    const r = runFullDiagnosis({
      duration: '3-7days',
      frequency: 'weekly',
      location: ['bilateral'],
      quality: ['pressing'],
      intensity: 2,
      side_consistency: 'bilateral',
      onset_speed: 'hours',
      physical_activity: false,
      nausea_vomiting: 'neither',
      photophobia: false,
      phonophobia: false,
      attackCount: '10 or more',
    });
    expect(r.topResult?.id).toBe('tth');
    expect(r.topResult?.confidence).toBeGreaterThanOrEqual(60);
  });

  it('returns screening questions', () => {
    const q = getScreeningQuestions();
    expect(q.length).toBeGreaterThan(10);
    expect(q[0].id).toBe('onset');
  });
});
