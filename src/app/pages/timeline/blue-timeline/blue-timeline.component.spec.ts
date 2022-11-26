import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueTimelineComponent } from './blue-timeline.component';

describe('BlueTimelineComponent', () => {
  let component: BlueTimelineComponent;
  let fixture: ComponentFixture<BlueTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
