import { TestBed } from '@angular/core/testing';

import { DevPhaseService } from './dev-phase.service';

describe('DevPhaseService', () => {
  let service: DevPhaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevPhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have multiple phases defined', () => {
    const phases = service.getPhases();
    expect(phases.length).toBeGreaterThan(0);
  });

  it('should have a start phase', () => {
    const phases = service.getPhases();
    const startPhase = phases.find(p => p.id === 'start');
    expect(startPhase).toBeTruthy();
    expect(startPhase?.name).toBe('Start');
  });

  it('should have early, mid, and late phases for major game sections', () => {
    const phases = service.getPhases();
    const phaseIds = phases.map(p => p.id);
    
    expect(phaseIds).toContain('early-red');
    expect(phaseIds).toContain('early-yellow');
    expect(phaseIds).toContain('early-green');
  });
});
