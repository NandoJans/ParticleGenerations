import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedTimelineComponent } from './red-timeline.component';

describe('RedTimelineComponent', () => {
  let component: RedTimelineComponent;
  let fixture: ComponentFixture<RedTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
