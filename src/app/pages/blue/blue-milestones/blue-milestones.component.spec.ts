import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueMilestonesComponent } from './blue-milestones.component';

describe('BlueMilestonesComponent', () => {
  let component: BlueMilestonesComponent;
  let fixture: ComponentFixture<BlueMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueMilestonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
