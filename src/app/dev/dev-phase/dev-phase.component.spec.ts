import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPhaseComponent } from './dev-phase.component';

describe('DevPhaseComponent', () => {
  let component: DevPhaseComponent;
  let fixture: ComponentFixture<DevPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevPhaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty selectedPhaseId initially', () => {
    expect(component.selectedPhaseId).toBe('');
  });

  it('should return phases from service', () => {
    const phases = component.getPhases();
    expect(phases.length).toBeGreaterThan(0);
  });
});
