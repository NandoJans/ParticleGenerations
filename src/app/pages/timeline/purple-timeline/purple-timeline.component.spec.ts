import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurpleTimelineComponent } from './purple-timeline.component';

describe('PurpleTimelineComponent', () => {
  let component: PurpleTimelineComponent;
  let fixture: ComponentFixture<PurpleTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurpleTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurpleTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
