import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurpleMilestonesComponent } from './purple-milestones.component';

describe('PurpleMilestonesComponent', () => {
  let component: PurpleMilestonesComponent;
  let fixture: ComponentFixture<PurpleMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurpleMilestonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurpleMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
