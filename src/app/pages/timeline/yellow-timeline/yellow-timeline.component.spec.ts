import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowTimelineComponent } from './yellow-timeline.component';

describe('YellowTimelineComponent', () => {
  let component: YellowTimelineComponent;
  let fixture: ComponentFixture<YellowTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
