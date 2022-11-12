import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowMilestonesComponent } from './yellow-milestones.component';

describe('YellowMilestonesComponent', () => {
  let component: YellowMilestonesComponent;
  let fixture: ComponentFixture<YellowMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YellowMilestonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YellowMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
