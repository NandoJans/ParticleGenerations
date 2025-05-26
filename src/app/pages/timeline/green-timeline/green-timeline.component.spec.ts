import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenTimelineComponent } from './green-timeline.component';

describe('GreenTimelineComponent', () => {
  let component: GreenTimelineComponent;
  let fixture: ComponentFixture<GreenTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
