import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatorSectionComponent } from './automator-section.component';

describe('AutomatorSectionComponent', () => {
  let component: AutomatorSectionComponent;
  let fixture: ComponentFixture<AutomatorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomatorSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomatorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
